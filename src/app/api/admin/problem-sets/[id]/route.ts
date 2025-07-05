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


// PUT - Update problem set
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyAdminToken(request)
    
    const resolvedParams = await params
    const setKey = resolvedParams.id
    const body = await request.json()
    const { title, description, problems = [], questions = [] } = body
    
    // Support both 'problems' and 'questions' field names for flexibility
    const problemsList = problems.length > 0 ? problems : questions

    if (!title) {
      return NextResponse.json({ error: '제목은 필수 입력 항목입니다.' }, { status: 400 })
    }

    // Find the problem set by key
    const { data: problemSet, error: findError } = await supabaseAdmin
      .from('problem_sets')
      .select('id, key, title, description')
      .eq('key', setKey)
      .single()

    if (findError || !problemSet) {
      return NextResponse.json({ error: '문제 세트를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Update the problem set
    const { error: updateError } = await supabaseAdmin
      .from('problem_sets')
      .update({
        title,
        description: description || ''
      })
      .eq('id', problemSet.id)

    if (updateError) {
      console.error('Error updating problem set:', updateError)
      return NextResponse.json({ error: 'Failed to update problem set' }, { status: 500 })
    }

    // Delete existing problems for this set
    const { error: deleteProblemsError } = await supabaseAdmin
      .from('problems')
      .delete()
      .eq('problem_set_id', problemSet.id)

    if (deleteProblemsError) {
      console.error('Error deleting existing problems:', deleteProblemsError)
      // Continue anyway - we'll try to add new problems
    }

    // Insert new problems
    const processedProblems = []
    
    for (let index = 0; index < problemsList.length; index++) {
      const problem = problemsList[index]
      
      const problemData = {
        problem_set_id: problemSet.id,
        question: problem.question,
        type: problem.type,
        options: (problem.type === 'single_choice' || problem.type === 'multiple_choice') 
          ? JSON.stringify(problem.options) 
          : null,
        correct_answer: JSON.stringify(
          problem.type === 'multiple_choice' 
            ? (problem.correct_answers || problem.correct_answer)
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

      if (!problemError && insertedProblem) {
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
    }

    return NextResponse.json({ 
      success: true, 
      problemSet: {
        id: setKey,
        name: title,
        description: description || '',
        problems: processedProblems,
        totalScore: processedProblems.reduce((total, problem) => total + (problem.score || 0), 0)
      },
      message: '문제 세트가 성공적으로 수정되었습니다.'
    })
  } catch (error) {
    console.error('Error updating problem set:', error)
    return NextResponse.json({ error: 'Server error occurred' }, { status: 500 })
  }
}

// DELETE - Delete problem set
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyAdminToken(request)
    
    const resolvedParams = await params
    const setKey = resolvedParams.id
    
    // Find the problem set by key
    const { data: problemSet, error: findError } = await supabaseAdmin
      .from('problem_sets')
      .select('id, title')
      .eq('key', setKey)
      .single()

    if (findError || !problemSet) {
      return NextResponse.json({ error: '문제 세트를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Delete the problem set (this will cascade delete all associated problems)
    const { error: deleteError } = await supabaseAdmin
      .from('problem_sets')
      .delete()
      .eq('id', problemSet.id)

    if (deleteError) {
      console.error('Error deleting problem set:', deleteError)
      return NextResponse.json({ error: 'Failed to delete problem set' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      message: `문제 세트 "${problemSet.title}"이(가) 성공적으로 삭제되었습니다.`
    })
  } catch (error) {
    console.error('Error deleting problem set:', error)
    return NextResponse.json({ error: 'Server error occurred' }, { status: 500 })
  }
}