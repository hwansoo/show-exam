import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
// import fs from 'fs'
// import path from 'path'

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

// PUT - Update problem (placeholder implementation)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyAdminToken(request)
    
    const resolvedParams = await params
    const problemId = resolvedParams.id

    // Placeholder - editing functionality to be implemented
    return NextResponse.json({ 
      success: false,
      message: '문제 수정 기능은 곧 추가될 예정입니다.',
      problemId
    })
  } catch {
    console.error("API error occurred")
    return NextResponse.json({ error: "Server error occurred" }, { status: 401 })
  }
}

// DELETE - Delete problem (placeholder implementation)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyAdminToken(request)
    
    const resolvedParams = await params
    const problemId = resolvedParams.id

    // Placeholder - deletion functionality to be implemented
    return NextResponse.json({ 
      success: false,
      message: '문제 삭제 기능은 곧 추가될 예정입니다.',
      problemId
    })
  } catch {
    console.error("API error occurred")
    return NextResponse.json({ error: "Server error occurred" }, { status: 401 })
  }
}