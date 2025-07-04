import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2024'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: '잘못된 비밀번호입니다.' }, { status: 401 })
    }

    const token = jwt.sign(
      { role: 'admin', timestamp: Date.now() },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    return NextResponse.json({ 
      success: true, 
      token,
      message: '관리자 인증 성공'
    })
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}