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

// Load data from JSON file
function loadData() {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'index.json')
  const data = fs.readFileSync(dataPath, 'utf8')
  return JSON.parse(data)
}

// Save data to JSON file
function saveData(data: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const dataPath = path.join(process.cwd(), 'public', 'data', 'index.json')
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
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

    if (!question || !type || !score) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 })
    }

    const data = loadData()
    
    // Find the problem in any problem set
    let foundProblemSetIndex = -1
    let foundProblemIndex = -1
    
    for (let i = 0; i < data.problem_sets.length; i++) {
      const problems = data.problem_sets[i].problems || []
      const problemIndex = problems.findIndex((p: any) => p.id.toString() === problemId) // eslint-disable-line @typescript-eslint/no-explicit-any
      if (problemIndex !== -1) {
        foundProblemSetIndex = i
        foundProblemIndex = problemIndex
        break
      }
    }

    if (foundProblemSetIndex === -1 || foundProblemIndex === -1) {
      return NextResponse.json({ error: '문제를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Update the problem
    const updatedProblem = {
      id: problemId,
      question,
      type,
      options: (type === 'single_choice' || type === 'multiple_choice') ? options : undefined,
      correct_answer,
      correct_answers: type === 'multiple_choice' ? correct_answers : undefined,
      score,
      explanation: explanation || undefined
    }

    data.problem_sets[foundProblemSetIndex].problems[foundProblemIndex] = updatedProblem

    // Update total score
    data.problem_sets[foundProblemSetIndex].totalScore = 
      data.problem_sets[foundProblemSetIndex].problems.reduce((total: number, problem: any) => total + problem.score, 0) // eslint-disable-line @typescript-eslint/no-explicit-any

    saveData(data)

    return NextResponse.json({ 
      success: true, 
      problem: updatedProblem,
      message: '문제가 성공적으로 수정되었습니다.'
    })
  } catch {
    console.error("API error occurred")
    return NextResponse.json({ error: "Server error occurred" }, { status: 401 })
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
    const data = loadData()
    
    // Find the problem in any problem set
    let foundProblemSetIndex = -1
    let foundProblemIndex = -1
    
    for (let i = 0; i < data.problem_sets.length; i++) {
      const problems = data.problem_sets[i].problems || []
      const problemIndex = problems.findIndex((p: any) => p.id.toString() === problemId) // eslint-disable-line @typescript-eslint/no-explicit-any
      if (problemIndex !== -1) {
        foundProblemSetIndex = i
        foundProblemIndex = problemIndex
        break
      }
    }

    if (foundProblemSetIndex === -1 || foundProblemIndex === -1) {
      return NextResponse.json({ error: '문제를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Remove the problem
    data.problem_sets[foundProblemSetIndex].problems.splice(foundProblemIndex, 1)

    // Update total score
    data.problem_sets[foundProblemSetIndex].totalScore = 
      data.problem_sets[foundProblemSetIndex].problems.reduce((total: number, problem: any) => total + problem.score, 0) // eslint-disable-line @typescript-eslint/no-explicit-any

    saveData(data)

    return NextResponse.json({ 
      success: true,
      message: '문제가 성공적으로 삭제되었습니다.'
    })
  } catch {
    console.error("API error occurred")
    return NextResponse.json({ error: "Server error occurred" }, { status: 401 })
  }
}