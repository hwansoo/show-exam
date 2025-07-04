import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

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

// Load data from JSON file (placeholder for future use)
// function loadData() {
//   const dataPath = path.join(process.cwd(), 'data', 'index.json')
//   const data = fs.readFileSync(dataPath, 'utf8')
//   return JSON.parse(data)
// }

// Placeholder functions for future implementation
// function loadProblemSet(filename: string) {
//   const filePath = path.join(process.cwd(), 'data', filename)
//   const data = fs.readFileSync(filePath, 'utf8')
//   return JSON.parse(data)
// }

// function saveProblemSet(filename: string, data: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
//   const filePath = path.join(process.cwd(), 'data', filename)
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
// }

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

    const indexData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'index.json'), 'utf-8'))
    
    // Find the problem set containing this problem
    let foundProblemSet = null
    let problemSetData = null
    
    for (const problemSet of indexData.problem_sets) {
      const filePath = path.join(process.cwd(), 'data', problemSet.file)
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        const problemIndex = data.problems?.findIndex((p: any) => p.id === problemId) // eslint-disable-line @typescript-eslint/no-explicit-any
        if (problemIndex !== -1) {
          foundProblemSet = problemSet
          problemSetData = data
          break
        }
      }
    }
    
    if (!foundProblemSet || !problemSetData) {
      return NextResponse.json({ error: '문제를 찾을 수 없습니다.' }, { status: 404 })
    }
    
    // Find and update the problem
    const problemIndex = problemSetData.problems.findIndex((p: any) => p.id === problemId) // eslint-disable-line @typescript-eslint/no-explicit-any
    if (problemIndex === -1) {
      return NextResponse.json({ error: '문제를 찾을 수 없습니다.' }, { status: 404 })
    }
    
    const updatedProblem = {
      id: problemId,
      question,
      type,
      options: (type === 'single_choice' || type === 'multiple_choice') ? options : undefined,
      correct_answer,
      correct_answers: type === 'multiple_choice' ? correct_answers : undefined,
      score: Number(score),
      explanation: explanation || undefined
    }
    
    problemSetData.problems[problemIndex] = updatedProblem
    
    // Save the updated problem set
    fs.writeFileSync(path.join(process.cwd(), 'data', foundProblemSet.file), JSON.stringify(problemSetData, null, 2))

    return NextResponse.json({ 
      success: true,
      problem: updatedProblem,
      message: '문제가 성공적으로 수정되었습니다.'
    })
  } catch (error) {
    console.error('Error updating problem:', error)
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

    const indexData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'index.json'), 'utf-8'))
    
    // Find the problem set containing this problem
    let foundProblemSet = null
    let problemSetData = null
    
    for (const problemSet of indexData.problem_sets) {
      const filePath = path.join(process.cwd(), 'data', problemSet.file)
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        const problemIndex = data.problems?.findIndex((p: any) => p.id === problemId) // eslint-disable-line @typescript-eslint/no-explicit-any
        if (problemIndex !== -1) {
          foundProblemSet = problemSet
          problemSetData = data
          break
        }
      }
    }
    
    if (!foundProblemSet || !problemSetData) {
      return NextResponse.json({ error: '문제를 찾을 수 없습니다.' }, { status: 404 })
    }
    
    // Find and remove the problem
    const problemIndex = problemSetData.problems.findIndex((p: any) => p.id === problemId) // eslint-disable-line @typescript-eslint/no-explicit-any
    if (problemIndex === -1) {
      return NextResponse.json({ error: '문제를 찾을 수 없습니다.' }, { status: 404 })
    }
    
    problemSetData.problems.splice(problemIndex, 1)
    
    // Save the updated problem set
    fs.writeFileSync(path.join(process.cwd(), 'data', foundProblemSet.file), JSON.stringify(problemSetData, null, 2))

    return NextResponse.json({ 
      success: true,
      message: '문제가 성공적으로 삭제되었습니다.'
    })
  } catch (error) {
    console.error('Error deleting problem:', error)
    return NextResponse.json({ error: 'Server error occurred' }, { status: 500 })
  }
}