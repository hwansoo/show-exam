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
    const { name, description } = body

    if (!name) {
      return NextResponse.json({ error: '문제 세트 이름이 필요합니다.' }, { status: 400 })
    }

    const data = loadData()
    
    // Find the problem set
    const setIndex = data.problem_sets.findIndex((set: any) => set.id.toString() === setId) // eslint-disable-line @typescript-eslint/no-explicit-any
    if (setIndex === -1) {
      return NextResponse.json({ error: '문제 세트를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Update the problem set
    data.problem_sets[setIndex].name = name
    data.problem_sets[setIndex].description = description || ''

    saveData(data)

    return NextResponse.json({ 
      success: true, 
      problemSet: data.problem_sets[setIndex],
      message: '문제 세트가 성공적으로 수정되었습니다.'
    })
  } catch {
    console.error("API error occurred")
    return NextResponse.json({ error: "Server error occurred" }, { status: 401 })
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
    const data = loadData()
    
    // Find the problem set
    const setIndex = data.problem_sets.findIndex((set: any) => set.id.toString() === setId) // eslint-disable-line @typescript-eslint/no-explicit-any
    if (setIndex === -1) {
      return NextResponse.json({ error: '문제 세트를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Remove the problem set
    data.problem_sets.splice(setIndex, 1)
    saveData(data)

    return NextResponse.json({ 
      success: true,
      message: '문제 세트가 성공적으로 삭제되었습니다.'
    })
  } catch {
    console.error("API error occurred")
    return NextResponse.json({ error: "Server error occurred" }, { status: 401 })
  }
}