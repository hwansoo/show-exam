import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '@/lib/supabase'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Verify admin token
function verifyAdminToken(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header')
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any // eslint-disable-line @typescript-eslint/no-explicit-any
    if (decoded.role !== 'admin') {
      throw new Error('Invalid admin token')
    }
    return decoded
  } catch {
    throw new Error('Invalid token')
  }
}

// GET - Fetch all problem sets with their problems for admin display
export async function GET(request: Request) {
  try {
    verifyAdminToken(request)
    
    // Fetch problem sets with their problems from Supabase
    const { data: problemSets, error: setsError } = await supabaseAdmin
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
    
    return NextResponse.json({ problem_sets: formattedProblemSets })
  } catch (error) {
    console.error('Error loading problem sets for admin:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}