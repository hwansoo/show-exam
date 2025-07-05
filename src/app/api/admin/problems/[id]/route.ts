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

// PUT - Update problem
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyAdminToken(request)
    
    const resolvedParams = await params
    const problemId = resolvedParams.id
    const body = await request.json()
    const { question, type, options, correct_answer, correct_answers, score, explanation } = body

    if (!question || !type || score === undefined) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 })
    }

    // Check if the problem exists
    const { data: existingProblem, error: findError } = await supabaseAdmin
      .from('problems')
      .select('id')
      .eq('id', problemId)
      .single()

    if (findError || !existingProblem) {
      return NextResponse.json({ error: '문제를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Prepare the update data
    const updateData = {
      question,
      type,
      options: (type === 'single_choice' || type === 'multiple_choice') ? JSON.stringify(options) : null,
      correct_answer: JSON.stringify(correct_answer),
      score: Number(score),
      explanation: explanation || null,
      updated_at: new Date().toISOString()
    }

    // Update the problem
    const { data: updatedProblem, error: updateError } = await supabaseAdmin
      .from('problems')
      .update(updateData)
      .eq('id', problemId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating problem:', updateError)
      return NextResponse.json({ error: '문제 수정에 실패했습니다.' }, { status: 500 })
    }

    // Format the response to match the expected format
    const formattedProblem = {
      id: updatedProblem.id,
      question: updatedProblem.question,
      type: updatedProblem.type,
      options: updatedProblem.options ? JSON.parse(updatedProblem.options) : undefined,
      correct_answer: JSON.parse(updatedProblem.correct_answer),
      correct_answers: type === 'multiple_choice' ? correct_answers : undefined,
      score: updatedProblem.score,
      explanation: updatedProblem.explanation
    }

    return NextResponse.json({ 
      success: true,
      problem: formattedProblem,
      message: '문제가 성공적으로 수정되었습니다.'
    })
  } catch (error) {
    console.error('Error updating problem:', error)
    
    // Check if it's an auth error
    if (error instanceof Error && error.message.includes('token')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    return NextResponse.json({ error: 'Server error occurred' }, { status: 500 })
  }
}

// DELETE - Delete problem
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyAdminToken(request)
    
    const resolvedParams = await params
    const problemId = resolvedParams.id

    // Check if the problem exists
    const { data: existingProblem, error: findError } = await supabaseAdmin
      .from('problems')
      .select('id')
      .eq('id', problemId)
      .single()

    if (findError || !existingProblem) {
      return NextResponse.json({ error: '문제를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Delete the problem
    const { error: deleteError } = await supabaseAdmin
      .from('problems')
      .delete()
      .eq('id', problemId)

    if (deleteError) {
      console.error('Error deleting problem:', deleteError)
      return NextResponse.json({ error: '문제 삭제에 실패했습니다.' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      message: '문제가 성공적으로 삭제되었습니다.'
    })
  } catch (error) {
    console.error('Error deleting problem:', error)
    
    // Check if it's an auth error
    if (error instanceof Error && error.message.includes('token')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    return NextResponse.json({ error: 'Server error occurred' }, { status: 500 })
  }
}