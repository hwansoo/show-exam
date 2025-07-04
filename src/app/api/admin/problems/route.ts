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
  const dataPath = path.join(process.cwd(), 'data', 'index.json')
  const data = fs.readFileSync(dataPath, 'utf8')
  return JSON.parse(data)
}

function loadProblemSet(filename: string) {
  const filePath = path.join(process.cwd(), 'data', filename)
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

function saveProblemSet(filename: string, data: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const filePath = path.join(process.cwd(), 'data', filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// Save data to JSON file (placeholder for future use)
// function saveData(data: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
//   const dataPath = path.join(process.cwd(), 'data', 'index.json')
//   fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
// }

// POST - Create new problem
export async function POST(request: Request) {
  try {
    verifyAdminToken(request)
    
    const body = await request.json()
    const { problemSetKey, question, type, options, correct_answer, correct_answers, score, explanation } = body

    if (!problemSetKey || !question || !type || !score) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 })
    }

    const indexData = loadData()
    
    // Find the problem set
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const problemSet = indexData.problem_sets.find((set: any) => set.key === problemSetKey)
    if (!problemSet) {
      return NextResponse.json({ error: '문제 세트를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Load the actual problem set data
    const problemSetData = loadProblemSet(problemSet.file)
    
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
    if (!problemSetData.problems) {
      problemSetData.problems = []
    }
    problemSetData.problems.push(newProblem)

    // Save the updated problem set
    saveProblemSet(problemSet.file, problemSetData)

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