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

// PUT - Update problem set
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyAdminToken(request)
    
    const resolvedParams = await params
    const setId = resolvedParams.id
    const body = await request.json()
    const { title, description } = body

    if (!title || !description) {
      return NextResponse.json({ error: '제목과 설명은 필수 입력 항목입니다.' }, { status: 400 })
    }

    const indexData = loadIndexData()
    
    // Find the problem set
    const setIndex = indexData.problem_sets.findIndex((set: any) => set.key === setId) // eslint-disable-line @typescript-eslint/no-explicit-any
    if (setIndex === -1) {
      return NextResponse.json({ error: '문제 세트를 찾을 수 없습니다.' }, { status: 404 })
    }

    const problemSetIndex = indexData.problem_sets[setIndex]
    
    // Load the problem set data
    const problemSetData = loadProblemSetData(problemSetIndex.file)
    
    // Update the problem set data
    problemSetData.title = title
    problemSetData.description = description
    
    // Update the index entry
    indexData.problem_sets[setIndex].title = title
    indexData.problem_sets[setIndex].description = description

    // Save both files
    saveProblemSetData(problemSetIndex.file, problemSetData)
    saveIndexData(indexData)

    return NextResponse.json({ 
      success: true, 
      problemSet: {
        id: setId,
        name: title,
        description,
        problems: problemSetData.problems || [],
        totalScore: (problemSetData.problems || []).reduce((total: number, problem: any) => total + (problem.score || 0), 0) // eslint-disable-line @typescript-eslint/no-explicit-any
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
    const setId = resolvedParams.id
    const indexData = loadIndexData()
    
    // Find the problem set
    const setIndex = indexData.problem_sets.findIndex((set: any) => set.key === setId) // eslint-disable-line @typescript-eslint/no-explicit-any
    if (setIndex === -1) {
      return NextResponse.json({ error: '문제 세트를 찾을 수 없습니다.' }, { status: 404 })
    }

    const problemSetIndex = indexData.problem_sets[setIndex]
    
    // Delete the problem set file
    const filePath = path.join(process.cwd(), 'data', problemSetIndex.file)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    // Remove from index
    indexData.problem_sets.splice(setIndex, 1)
    saveIndexData(indexData)

    return NextResponse.json({ 
      success: true,
      message: '문제 세트가 성공적으로 삭제되었습니다.'
    })
  } catch (error) {
    console.error('Error deleting problem set:', error)
    return NextResponse.json({ error: 'Server error occurred' }, { status: 500 })
  }
}