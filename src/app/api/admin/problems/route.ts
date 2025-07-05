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

// POST - Create new problem
export async function POST(request: Request) {
  try {
    verifyAdminToken(request)
    
    const body = await request.json()
    const { problemSetKey, question, type, options, correct_answer, correct_answers, score, explanation } = body

    if (!problemSetKey || !question || !type || score === undefined) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 })
    }

    // Find the problem set by key
    const { data: problemSet, error: setError } = await supabaseAdmin
      .from('problem_sets')
      .select('id')
      .eq('key', problemSetKey)
      .single()

    if (setError || !problemSet) {
      return NextResponse.json({ error: '문제 세트를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Get the current highest order_index for this problem set
    const { data: lastProblem } = await supabaseAdmin
      .from('problems')
      .select('order_index')
      .eq('problem_set_id', problemSet.id)
      .order('order_index', { ascending: false })
      .limit(1)

    const nextOrderIndex = lastProblem && lastProblem.length > 0 ? lastProblem[0].order_index + 1 : 0

    // Prepare the problem data
    const newProblem = {
      id: uuidv4(),
      problem_set_id: problemSet.id,
      question,
      type,
      options: (type === 'single_choice' || type === 'multiple_choice') ? JSON.stringify(options) : null,
      correct_answer: JSON.stringify(correct_answer),
      score: Number(score),
      explanation: explanation || null,
      order_index: nextOrderIndex
    }

    // Insert the new problem
    const { data: createdProblem, error: insertError } = await supabaseAdmin
      .from('problems')
      .insert(newProblem)
      .select()
      .single()

    if (insertError) {
      console.error('Error creating problem:', insertError)
      return NextResponse.json({ error: '문제 생성에 실패했습니다.' }, { status: 500 })
    }

    // Format the response to match the expected format
    const formattedProblem = {
      id: createdProblem.id,
      question: createdProblem.question,
      type: createdProblem.type,
      options: createdProblem.options ? JSON.parse(createdProblem.options) : undefined,
      correct_answer: JSON.parse(createdProblem.correct_answer),
      correct_answers: type === 'multiple_choice' ? correct_answers : undefined,
      score: createdProblem.score,
      explanation: createdProblem.explanation
    }

    return NextResponse.json({ 
      success: true, 
      problem: formattedProblem,
      message: '문제가 성공적으로 생성되었습니다.'
    })
  } catch (error) {
    console.error('Error creating problem:', error)
    
    // Check if it's an auth error
    if (error instanceof Error && error.message.includes('token')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    return NextResponse.json({ error: 'Server error occurred' }, { status: 500 })
  }
}