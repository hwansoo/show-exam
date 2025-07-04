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

// POST - Create new problem set
export async function POST(request: Request) {
  try {
    verifyAdminToken(request)
    
    const body = await request.json()
    const { name, description, problems = [] } = body

    if (!name) {
      return NextResponse.json({ error: '문제 세트 이름이 필요합니다.' }, { status: 400 })
    }

    const data = loadData()
    
    // Generate new problem set ID
    const newId = Date.now().toString()
    
    // Process problems if any
    const processedProblems = problems.map((problem: any, index: number) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      id: `${newId}_${index}`,
      question: problem.question,
      type: problem.type,
      options: (problem.type === 'single_choice' || problem.type === 'multiple_choice') ? problem.options : undefined,
      correct_answer: problem.correct_answer,
      correct_answers: problem.type === 'multiple_choice' ? problem.correct_answers : undefined,
      score: problem.score,
      explanation: problem.explanation || undefined
    }))

    const totalScore = processedProblems.reduce((total: number, problem: any) => total + problem.score, 0) // eslint-disable-line @typescript-eslint/no-explicit-any

    const newProblemSet = {
      id: newId,
      name,
      description: description || '',
      problems: processedProblems,
      totalScore
    }

    data.problem_sets.push(newProblemSet)
    saveData(data)

    return NextResponse.json({ 
      success: true, 
      problemSet: newProblemSet,
      message: '문제 세트가 성공적으로 생성되었습니다.'
    })
  } catch {
    console.error("API error occurred")
    return NextResponse.json({ error: "Server error occurred" }, { status: 401 })
  }
}