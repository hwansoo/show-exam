import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import fs from 'fs'
import path from 'path'

// Fallback to file-based storage if Supabase is not available
async function getFromFileStorage() {
  console.log('Using file-based storage fallback...')
  
  const dataDir = path.join(process.cwd(), 'data')
  const indexPath = path.join(dataDir, 'index.json')
  
  if (!fs.existsSync(indexPath)) {
    return []
  }
  
  const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
  const problemSetsList = indexData.problem_sets || []
  
  const problemSets = problemSetsList.map((item: { key: string; title: string; description: string; file: string }) => {
    const filePath = path.join(dataDir, item.file)
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      return {
        id: item.key,
        name: data.title || item.title,
        description: data.description || item.description,
        problems: data.problems || data.questions,
        totalScore: (data.problems || data.questions)?.reduce((sum: number, p: { score?: number }) => sum + (p.score || 0), 0) || 0
      }
    }
    return null
  }).filter(Boolean)
  
  return problemSets
}

export async function GET() {
  try {
    // First try Supabase
    try {
      const { data: problemSets, error: setsError } = await supabase
        .from('problem_sets')
        .select(`
          id,
          key,
          title,
          description,
          category,
          difficulty,
          is_built_in,
          created_at,
          updated_at,
          problems (
            id,
            question,
            type,
            options,
            correct_answer,
            score,
            explanation,
            order_index
          )
        `)
        .order('created_at', { ascending: true })
      
      // If Supabase works and has data, use it
      if (!setsError && problemSets && problemSets.length >= 0) {
        console.log('Using Supabase storage')
        
        // Transform data to match the expected format
        const formattedProblemSets = problemSets.map((set) => ({
          id: set.key, // Use key as ID for compatibility
          name: set.title,
          description: set.description || '',
          problems: set.problems
            ?.sort((a, b) => a.order_index - b.order_index)
            ?.map((problem) => ({
              id: problem.id,
              question: problem.question,
              type: problem.type,
              options: problem.options ? JSON.parse(problem.options) : undefined,
              correct_answer: problem.correct_answer ? JSON.parse(problem.correct_answer) : undefined,
              score: problem.score,
              explanation: problem.explanation
            })) || [],
          totalScore: set.problems?.reduce((sum, p) => sum + (p.score || 0), 0) || 0
        }))
        
        return NextResponse.json(formattedProblemSets)
      }
      
      // If Supabase returns error or no data, fall back to files
      throw new Error('Supabase not available or no data')
      
    } catch (supabaseError) {
      console.log('Supabase not available, falling back to file storage:', supabaseError)
      
      // Fallback to file-based storage
      const fileBasedData = await getFromFileStorage()
      return NextResponse.json(fileBasedData)
    }
    
  } catch (error) {
    console.error('Error loading problem sets:', error)
    
    // Last resort: return empty array to keep app working
    return NextResponse.json([])
  }
}

export async function POST() {
  try {
    return NextResponse.json({ error: 'Use admin API for creating problem sets' }, { status: 403 })
  } catch (error) {
    console.error('Error in POST /api/problem-sets:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}