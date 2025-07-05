/**
 * Data Migration Script
 * This script migrates existing JSON files to Supabase database
 */

import { supabaseAdmin } from '../src/lib/supabase'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

interface JsonProblemSet {
  key: string
  file: string
  title: string
  description: string
  category: string
  difficulty: string
  created_at: string
  updated_at: string
  is_built_in: boolean
}

interface JsonProblem {
  id?: string | number
  question: string
  type: string
  options?: string[]
  correct_answer?: any
  correct_answers?: number[]
  score: number
  explanation?: string
}

interface JsonProblemSetFile {
  title: string
  description?: string
  questions?: JsonProblem[]
  problems?: JsonProblem[]
}

async function migrateData() {
  console.log('🚀 Starting data migration from JSON files to Supabase...')
  
  try {
    // Read the index.json file
    const indexPath = path.join(process.cwd(), 'data', 'index.json')
    const indexContent = fs.readFileSync(indexPath, 'utf8')
    const indexData = JSON.parse(indexContent)
    
    console.log(`📊 Found ${indexData.problem_sets.length} problem sets to migrate`)
    
    let migratedSets = 0
    let migratedProblems = 0
    
    // Migrate each problem set
    for (const problemSetMeta of indexData.problem_sets) {
      console.log(`📝 Migrating problem set: ${problemSetMeta.title}`)
      
      // Read the problem set file
      const problemSetPath = path.join(process.cwd(), 'data', problemSetMeta.file)
      
      if (!fs.existsSync(problemSetPath)) {
        console.warn(`⚠️  File not found: ${problemSetMeta.file}, skipping...`)
        continue
      }
      
      const problemSetContent = fs.readFileSync(problemSetPath, 'utf8')
      const problemSetData: JsonProblemSetFile = JSON.parse(problemSetContent)
      
      // Create problem set in Supabase
      const problemSetId = uuidv4()
      
      const { error: setError } = await supabaseAdmin
        .from('problem_sets')
        .insert({
          id: problemSetId,
          key: problemSetMeta.key,
          title: problemSetMeta.title,
          description: problemSetMeta.description || problemSetData.description || '',
          category: problemSetMeta.category,
          difficulty: problemSetMeta.difficulty,
          is_built_in: problemSetMeta.is_built_in,
          created_at: problemSetMeta.created_at,
          updated_at: problemSetMeta.updated_at
        })
      
      if (setError) {
        console.error(`❌ Error inserting problem set ${problemSetMeta.title}:`, setError)
        continue
      }
      
      migratedSets++
      console.log(`  ✅ Problem set inserted with ID: ${problemSetId}`)
      
      // Migrate problems for this set
      const problems = problemSetData.questions || problemSetData.problems || []
      
      for (let i = 0; i < problems.length; i++) {
        const problem = problems[i]
        
        // Normalize the problem data
        const normalizedProblem = {
          id: uuidv4(),
          problem_set_id: problemSetId,
          question: problem.question,
          type: problem.type,
          options: problem.options ? JSON.stringify(problem.options) : null,
          correct_answer: JSON.stringify(
            problem.type === 'multiple_choice' 
              ? problem.correct_answers 
              : problem.correct_answer
          ),
          score: problem.score || 1,
          explanation: problem.explanation || null,
          order_index: i
        }
        
        const { error: problemError } = await supabaseAdmin
          .from('problems')
          .insert(normalizedProblem)
        
        if (problemError) {
          console.error(`❌ Error inserting problem ${i + 1} for set ${problemSetMeta.title}:`, problemError)
          continue
        }
        
        migratedProblems++
      }
      
      console.log(`  ✅ Migrated ${problems.length} problems`)
    }
    
    console.log('🎉 Migration completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`  - Problem sets migrated: ${migratedSets}`)
    console.log(`  - Problems migrated: ${migratedProblems}`)
    
    // Verify migration
    console.log('🔍 Verifying migration...')
    
    const { data: problemSets, error: psError } = await supabaseAdmin
      .from('problem_sets')
      .select('id, title')
    
    const { data: problemsData, error: pError } = await supabaseAdmin
      .from('problems')
      .select('id, problem_set_id')
    
    if (psError) {
      console.error('❌ Error verifying problem sets:', psError)
    } else {
      console.log(`✅ Verified ${problemSets?.length || 0} problem sets in database`)
    }
    
    if (pError) {
      console.error('❌ Error verifying problems:', pError)
    } else {
      console.log(`✅ Verified ${problemsData?.length || 0} problems in database`)
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }
}

// Function to clear existing data (for testing purposes)
async function clearExistingData() {
  console.log('🧹 Clearing existing data...')
  
  const { error: problemsError } = await supabaseAdmin
    .from('problems')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
  
  if (problemsError) {
    console.error('❌ Error clearing problems:', problemsError)
  }
  
  const { error: setsError } = await supabaseAdmin
    .from('problem_sets')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
  
  if (setsError) {
    console.error('❌ Error clearing problem sets:', setsError)
  }
  
  console.log('✅ Existing data cleared')
}

// Run the migration if this script is executed directly
if (require.main === module) {
  const args = process.argv.slice(2)
  const shouldClear = args.includes('--clear')
  
  async function run() {
    if (shouldClear) {
      await clearExistingData()
    }
    await migrateData()
  }
  
  run()
    .then(() => {
      console.log('✅ Migration completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Migration failed:', error)
      process.exit(1)
    })
}

export { migrateData, clearExistingData }