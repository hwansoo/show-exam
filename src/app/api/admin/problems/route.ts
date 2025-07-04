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
interface ProblemData {
  problem_sets: Array<{
    id: string
    name: string
    description: string
    problems: Array<{
      id: string
      question: string
      type: string
      options?: string[]
      correct_answer: string | number | boolean
      correct_answers?: number[]
      score: number
      explanation?: string
    }>
    totalScore: number
  }>
}

function loadData(): ProblemData {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'index.json')
  const data = fs.readFileSync(dataPath, 'utf8')
  return JSON.parse(data)
}

// Save data to JSON file
function saveData(data: ProblemData) {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'index.json')
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

// POST - Create new problem
export async function POST(request: Request) {
  try {
    verifyAdminToken(request)
    
    const body = await request.json()
    const { problemSetId, question, type, options, correct_answer, correct_answers, score, explanation } = body

    if (!problemSetId || !question || !type || !score) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 })
    }

    const data = loadData()
    
    // Find the problem set
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const problemSetIndex = data.problem_sets.findIndex((set: any) => set.id === problemSetId)
    if (problemSetIndex === -1) {
      return NextResponse.json({ error: '문제 세트를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Generate new problem ID
    const newId = Date.now().toString()
    
    const newProblem = {
      id: newId,
      question,
      type,
      options: (type === 'single_choice' || type === 'multiple_choice') ? options : undefined,
      correct_answer,
      correct_answers: type === 'multiple_choice' ? correct_answers : undefined,
      score,
      explanation: explanation || undefined
    }

    // Add problem to the set
    if (!data.problem_sets[problemSetIndex].problems) {
      data.problem_sets[problemSetIndex].problems = []
    }
    data.problem_sets[problemSetIndex].problems.push(newProblem)

    // Update total score
    data.problem_sets[problemSetIndex].totalScore = 
      data.problem_sets[problemSetIndex].problems.reduce((total: number, problem: any) => total + problem.score, 0) // eslint-disable-line @typescript-eslint/no-explicit-any

    saveData(data)

    return NextResponse.json({ 
      success: true, 
      problem: newProblem,
      message: '문제가 성공적으로 생성되었습니다.'
    })
  } catch {
    console.error("API error occurred")
    return NextResponse.json({ error: "Server error occurred" }, { status: 401 })
  }
}