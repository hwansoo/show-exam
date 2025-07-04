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
function loadIndexData() {
  const dataPath = path.join(process.cwd(), 'data', 'index.json')
  const data = fs.readFileSync(dataPath, 'utf8')
  return JSON.parse(data)
}

// Save data to JSON file
function saveIndexData(data: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const dataPath = path.join(process.cwd(), 'data', 'index.json')
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

// Load problem set data from file
function loadProblemSetData(filename: string) {
  const filePath = path.join(process.cwd(), 'data', filename)
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

// Save problem set data to file
function saveProblemSetData(filename: string, data: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const filePath = path.join(process.cwd(), 'data', filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// Generate unique filename for problem set
function generateFilename(title: string): string {
  const sanitized = title.toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '')
  const timestamp = Date.now()
  return `${sanitized}_${timestamp}.json`
}

// POST - Create new problem set
export async function POST(request: Request) {
  try {
    verifyAdminToken(request)
    
    const body = await request.json()
    const { title, description, problems = [] } = body

    if (!title || !description) {
      return NextResponse.json({ error: '제목과 설명은 필수 입력 항목입니다.' }, { status: 400 })
    }

    const indexData = loadIndexData()
    
    // Generate unique key and filename
    const newKey = `set_${Date.now()}`
    const filename = generateFilename(title)
    
    // Process problems if any
    const processedProblems = problems.map((problem: any, index: number) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      id: `${newKey}_${index}`,
      question: problem.question,
      type: problem.type,
      options: (problem.type === 'single_choice' || problem.type === 'multiple_choice') ? problem.options : undefined,
      correct_answer: problem.correct_answer,
      correct_answers: problem.type === 'multiple_choice' ? problem.correct_answers : undefined,
      score: problem.score || 0,
      explanation: problem.explanation || undefined
    }))
    
    // Create new problem set data
    const newProblemSetData = {
      title,
      description,
      problems: processedProblems
    }
    
    // Save problem set file
    const problemSetPath = path.join(process.cwd(), 'data', filename)
    saveProblemSetData(filename, newProblemSetData)
    
    // Add to index
    const newProblemSetIndex = {
      key: newKey,
      title,
      description,
      file: filename
    }
    
    indexData.problem_sets.push(newProblemSetIndex)
    saveIndexData(indexData)

    return NextResponse.json({ 
      success: true,
      problemSet: {
        id: newKey,
        name: title,
        description,
        problems: processedProblems,
        totalScore: processedProblems.reduce((total: number, problem: any) => total + (problem.score || 0), 0) // eslint-disable-line @typescript-eslint/no-explicit-any
      },
      message: '문제 세트가 성공적으로 생성되었습니다.'
    })
  } catch (error) {
    console.error('Error creating problem set:', error)
    return NextResponse.json({ error: 'Server error occurred' }, { status: 500 })
  }
}