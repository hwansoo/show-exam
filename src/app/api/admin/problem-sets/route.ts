import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

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

// Generate unique key for problem set
function generateKey(title: string): string {
  const sanitized = title.toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '')
  const timestamp = Date.now()
  return `${sanitized}_${timestamp}`
}

// POST - Create new problem set
export async function POST(request: Request) {
  try {
    verifyAdminToken(request)
    
    const body = await request.json()
    const { title, description, problems = [] } = body

    if (!title) {
      return NextResponse.json({ error: '제목은 필수 입력 항목입니다.' }, { status: 400 })
    }

    // Generate unique key and ID
    const problemSetId = uuidv4()
    const newKey = generateKey(title)
    
    // Create problem set in Supabase
    const { data: problemSet, error: setError } = await supabaseAdmin
      .from('problem_sets')
      .insert({
        id: problemSetId,
        key: newKey,
        title,
        description: description || '',
        category: 'custom',
        difficulty: 'unknown',
        is_built_in: false
      })
      .select()
      .single()

    if (setError) {
      console.error('Error creating problem set:', setError)
      return NextResponse.json({ error: 'Failed to create problem set' }, { status: 500 })
    }

    // Process and insert problems if any
    const processedProblems = []
    
    for (let index = 0; index < problems.length; index++) {
      const problem = problems[index]
      
      const problemData = {
        id: uuidv4(),
        problem_set_id: problemSetId,
        question: problem.question,
        type: problem.type,
        options: (problem.type === 'single_choice' || problem.type === 'multiple_choice') 
          ? JSON.stringify(problem.options) 
          : null,
        correct_answer: JSON.stringify(
          problem.type === 'multiple_choice' 
            ? problem.correct_answers 
            : problem.correct_answer
        ),
        score: problem.score || 1,
        explanation: problem.explanation || null,
        order_index: index
      }

      const { data: insertedProblem, error: problemError } = await supabaseAdmin
        .from('problems')
        .insert(problemData)
        .select()
        .single()

      if (problemError) {
        console.error('Error creating problem:', problemError)
        // Continue with other problems instead of failing completely
        continue
      }

      processedProblems.push({
        id: insertedProblem.id,
        question: insertedProblem.question,
        type: insertedProblem.type,
        options: insertedProblem.options ? JSON.parse(insertedProblem.options) : undefined,
        correct_answer: insertedProblem.correct_answer ? JSON.parse(insertedProblem.correct_answer) : undefined,
        score: insertedProblem.score,
        explanation: insertedProblem.explanation
      })
    }

    return NextResponse.json({ 
      success: true,
      problemSet: {
        id: problemSet.key,
        name: problemSet.title,
        description: problemSet.description,
        problems: processedProblems,
        totalScore: processedProblems.reduce((total, problem) => total + (problem.score || 0), 0)
      },
      message: '문제 세트가 성공적으로 생성되었습니다.'
    })
  } catch (error) {
    console.error('Error creating problem set:', error)
    return NextResponse.json({ error: 'Server error occurred' }, { status: 500 })
  }
}