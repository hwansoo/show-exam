import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const indexPath = path.join(dataDir, 'index.json')
    
    if (!fs.existsSync(indexPath)) {
      return NextResponse.json({ error: 'Index file not found' }, { status: 404 })
    }
    
    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
    
    // Access the problem_sets array from the index data
    const problemSetsList = indexData.problem_sets || []
    
    const problemSets = problemSetsList.map((item: { key: string; title: string; description: string; file: string }) => {
      const filePath = path.join(dataDir, item.file)
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        return {
          id: item.key,
          name: data.title || item.title,
          description: data.description || item.description,
          problems: data.problems || data.questions,
          totalScore: (data.problems || data.questions)?.reduce((sum: number, p: { score?: number }) => sum + (p.score || 0), 0) || 0
        }
      }
      return null
    }).filter(Boolean)
    
    return NextResponse.json(problemSets)
  } catch (error) {
    console.error('Error loading problem sets:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, problems } = body
    
    if (!name || !problems) {
      return NextResponse.json({ error: 'Name and problems are required' }, { status: 400 })
    }
    
    const dataDir = path.join(process.cwd(), 'data')
    const indexPath = path.join(dataDir, 'index.json')
    
    const id = Date.now().toString()
    const filename = `${name.toLowerCase().replace(/\s+/g, '_')}_${id}.json`
    
    const newProblemSet = {
      title: name,
      description,
      questions: problems,
      createdAt: new Date().toISOString()
    }
    
    fs.writeFileSync(
      path.join(dataDir, filename),
      JSON.stringify(newProblemSet, null, 2)
    )
    
    interface ProblemSetIndex {
      key: string;
      file: string;
      title: string;
      description: string;
      category: string;
      difficulty: string;
      created_at: string;
      updated_at: string;
      is_built_in: boolean;
    }
    
    let indexData: { version: string; problem_sets: ProblemSetIndex[] } = { version: "1.0.0", problem_sets: [] }
    if (fs.existsSync(indexPath)) {
      indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
    }
    
    indexData.problem_sets.push({
      key: id,
      file: filename,
      title: name,
      description,
      category: "custom",
      difficulty: "unknown",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_built_in: false
    })
    
    fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2))
    
    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('Error creating problem set:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}