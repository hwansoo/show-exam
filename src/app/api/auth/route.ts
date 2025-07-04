import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    
    const globalPassword = process.env.GLOBAL_PASSWORD || 'exam2024'
    
    if (password === globalPassword) {
      // Create JWT token
      const token = jwt.sign(
        { authenticated: true, timestamp: Date.now() },
        process.env.JWT_SECRET || 'default-secret',
        { expiresIn: '24h' }
      )
      
      return NextResponse.json({ 
        success: true, 
        token,
        message: 'Authentication successful'
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid password' 
      }, { status: 401 })
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}