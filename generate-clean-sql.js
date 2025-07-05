/**
 * Generate clean SQL with proper PostgreSQL JSON syntax
 * Run with: node generate-clean-sql.js > clean-data-inserts.sql
 */

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

function escapeString(str) {
  if (!str) return 'NULL';
  return "$STR$" + str + "$STR$";
}

function formatJson(obj) {
  if (!obj) return 'NULL';
  return "$JSON$" + JSON.stringify(obj) + "$JSON$::jsonb";
}

function generateCleanSQL() {
  console.log('-- Clean Data migration SQL with proper JSON handling');
  console.log('-- Run this AFTER running manual-migration.sql');
  console.log('');
  
  try {
    // Read the index.json file
    const indexPath = path.join(__dirname, 'data', 'index.json');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const indexData = JSON.parse(indexContent);
    
    console.log(`-- Found ${indexData.problem_sets.length} problem sets to migrate`);
    console.log('');
    
    const problemSetIds = new Map();
    
    // Generate problem set INSERT statements
    console.log('-- Insert problem sets');
    for (const problemSetMeta of indexData.problem_sets) {
      const problemSetId = uuidv4();
      problemSetIds.set(problemSetMeta.key, problemSetId);
      
      // Read the problem set file to get description if needed
      const problemSetPath = path.join(__dirname, 'data', problemSetMeta.file);
      let additionalDescription = '';
      
      if (fs.existsSync(problemSetPath)) {
        try {
          const problemSetContent = fs.readFileSync(problemSetPath, 'utf8');
          const problemSetData = JSON.parse(problemSetContent);
          if (problemSetData.description && !problemSetMeta.description) {
            additionalDescription = problemSetData.description;
          }
        } catch (error) {
          console.log(`-- Warning: Could not read ${problemSetMeta.file}`);
        }
      }
      
      const description = problemSetMeta.description || additionalDescription || '';
      
      console.log(`INSERT INTO problem_sets (id, key, title, description, category, difficulty, is_built_in, created_at, updated_at) VALUES (`);
      console.log(`  '${problemSetId}',`);
      console.log(`  ${escapeString(problemSetMeta.key)},`);
      console.log(`  ${escapeString(problemSetMeta.title)},`);
      console.log(`  ${escapeString(description)},`);
      console.log(`  ${escapeString(problemSetMeta.category)},`);
      console.log(`  ${escapeString(problemSetMeta.difficulty)},`);
      console.log(`  ${problemSetMeta.is_built_in},`);
      console.log(`  ${escapeString(problemSetMeta.created_at)},`);
      console.log(`  ${escapeString(problemSetMeta.updated_at)}`);
      console.log(`);`);
      console.log('');
    }
    
    // Generate problems INSERT statements
    console.log('-- Insert problems');
    for (const problemSetMeta of indexData.problem_sets) {
      const problemSetId = problemSetIds.get(problemSetMeta.key);
      
      // Read the problem set file
      const problemSetPath = path.join(__dirname, 'data', problemSetMeta.file);
      
      if (!fs.existsSync(problemSetPath)) {
        console.log(`-- Warning: File not found: ${problemSetMeta.file}, skipping problems...`);
        continue;
      }
      
      try {
        const problemSetContent = fs.readFileSync(problemSetPath, 'utf8');
        const problemSetData = JSON.parse(problemSetContent);
        
        const problems = problemSetData.questions || problemSetData.problems || [];
        
        console.log(`-- Problems for ${problemSetMeta.title} (${problems.length} problems)`);
        
        for (let i = 0; i < problems.length; i++) {
          const problem = problems[i];
          const problemId = uuidv4();
          
          const options = problem.options || null;
          const correctAnswer = problem.type === 'multiple_choice' 
            ? problem.correct_answers || null
            : problem.correct_answer;
          
          console.log(`INSERT INTO problems (id, problem_set_id, question, type, options, correct_answer, score, explanation, order_index) VALUES (`);
          console.log(`  '${problemId}',`);
          console.log(`  '${problemSetId}',`);
          console.log(`  ${escapeString(problem.question)},`);
          console.log(`  ${escapeString(problem.type)},`);
          console.log(`  ${formatJson(options)},`);
          console.log(`  ${formatJson(correctAnswer)},`);
          console.log(`  ${problem.score || 1},`);
          console.log(`  ${escapeString(problem.explanation || '')},`);
          console.log(`  ${i}`);
          console.log(`);`);
          console.log('');
        }
      } catch (error) {
        console.log(`-- Error reading ${problemSetMeta.file}: ${error.message}`);
      }
    }
    
    console.log('-- Migration completed');
    console.log(`SELECT 'Data migration completed successfully' as status;`);
    
  } catch (error) {
    console.error('Error generating SQL:', error);
    process.exit(1);
  }
}

// Run the generator
generateCleanSQL();