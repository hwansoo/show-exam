import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Fetch problem sets with their problems from Supabase
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
    
    if (setsError) {
      console.error('Error fetching problem sets:', setsError)
      return NextResponse.json({ error: 'Failed to fetch problem sets' }, { status: 500 })
    }
    
    // Transform data to match the expected format
    const formattedProblemSets = problemSets?.map((set) => ({
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
    })) || []
    
    return NextResponse.json(formattedProblemSets)
  } catch (error) {
    console.error('Error loading problem sets:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
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