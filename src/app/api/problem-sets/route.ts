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
    
    const problemSets = indexData.map((item: { id: string; name: string; description: string; file: string }) => {
      const filePath = path.join(dataDir, item.file)
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        return {
          id: item.id,
          name: data.name || item.name,
          description: data.description || item.description,
          problems: data.problems,
          totalScore: data.problems?.reduce((sum: number, p: { score?: number }) => sum + (p.score || 0), 0) || 0
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
      id,
      name,
      description,
      problems,
      createdAt: new Date().toISOString()
    }
    
    fs.writeFileSync(
      path.join(dataDir, filename),
      JSON.stringify(newProblemSet, null, 2)
    )
    
    let index = []
    if (fs.existsSync(indexPath)) {
      index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
    }
    
    index.push({
      id,
      name,
      description,
      file: filename,
      createdAt: new Date().toISOString()
    })
    
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2))
    
    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('Error creating problem set:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}