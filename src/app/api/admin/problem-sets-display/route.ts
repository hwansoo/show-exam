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

// GET - Fetch all problem sets with their problems for admin display
export async function GET(request: Request) {
  try {
    verifyAdminToken(request)
    
    const dataDir = path.join(process.cwd(), 'data')
    const indexPath = path.join(dataDir, 'index.json')
    
    if (!fs.existsSync(indexPath)) {
      return NextResponse.json({ error: 'Index file not found' }, { status: 404 })
    }
    
    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
    
    // Access the problem_sets array from the index data
    const problemSetsList = indexData.problem_sets || []
    
    const problemSets = problemSetsList.map((item: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      const filePath = path.join(dataDir, item.file)
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        return {
          id: item.key,
          name: data.title || item.title,
          description: data.description || item.description,
          problems: data.problems || data.questions,
          totalScore: (data.problems || data.questions)?.reduce((sum: number, p: any) => sum + (p.score || 0), 0) || 0 // eslint-disable-line @typescript-eslint/no-explicit-any
        }
      }
      return null
    }).filter(Boolean)
    
    return NextResponse.json({ problem_sets: problemSets })
  } catch (error) {
    console.error('Error loading problem sets for admin:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}