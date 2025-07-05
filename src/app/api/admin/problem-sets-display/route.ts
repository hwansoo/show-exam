import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
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

// Fallback to file-based storage for admin
async function getAdminDataFromFiles() {
  console.log('Admin using file-based storage fallback...')
  
  const dataDir = path.join(process.cwd(), 'data')
  const indexPath = path.join(dataDir, 'index.json')
  
  if (!fs.existsSync(indexPath)) {
    return []
  }
  
  const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
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
  
  return problemSets
}

// GET - Fetch all problem sets with their problems for admin display
export async function GET(request: Request) {
  try {
    verifyAdminToken(request)
    
    // First try Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const { data: problemSets, error: setsError } = await supabaseAdmin
          .from('problem_sets')
          .select(`
            id,
            key,
            title,
            description,
            category,
            difficulty,
            is_built_in,
            created_at,
            updated_at,
            problems (
              id,
              question,
              type,
              options,
              correct_answer,
              score,
              explanation,
              order_index
            )
          `)
          .order('created_at', { ascending: true })
        
        // If Supabase works, use it
        if (!setsError && problemSets) {
          console.log('Admin using Supabase storage')
          
          const formattedProblemSets = problemSets.map((set) => ({
            id: set.key, // Use key as ID for compatibility
            name: set.title,
            description: set.description || '',
            problems: set.problems
              ?.sort((a, b) => a.order_index - b.order_index)
              ?.map((problem) => ({
                id: problem.id,
                question: problem.question,
                type: problem.type,
                options: problem.options ? JSON.parse(problem.options) : undefined,
                correct_answer: problem.correct_answer ? JSON.parse(problem.correct_answer) : undefined,
                score: problem.score,
                explanation: problem.explanation
              })) || [],
            totalScore: set.problems?.reduce((sum, p) => sum + (p.score || 0), 0) || 0
          }))
          
          return NextResponse.json({ problem_sets: formattedProblemSets })
        }
        
        // If Supabase has errors, fall back to files
        throw new Error('Supabase error: ' + (setsError?.message || 'Unknown error'))
        
      } catch (supabaseError) {
        console.log('Admin Supabase failed, falling back to files:', supabaseError)
      }
    }
    
    // Fallback to file-based storage
    const fileBasedData = await getAdminDataFromFiles()
    return NextResponse.json({ problem_sets: fileBasedData })
    
  } catch (error) {
    console.error('Error loading problem sets for admin:', error)
    
    // Check if it's an auth error
    if (error instanceof Error && error.message.includes('token')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // For other errors, try to return file data if possible
    try {
      const fileBasedData = await getAdminDataFromFiles()
      return NextResponse.json({ problem_sets: fileBasedData })
    } catch {
      return NextResponse.json({ error: 'Failed to load problem sets' }, { status: 500 })
    }
  }
}