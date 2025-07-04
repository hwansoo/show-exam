import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { question, answer, maxScore } = body
    
    if (!question || !answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 })
    }
    
    // Simple AI-like grading logic for essays
    // In production, you would use OpenAI API or similar
    const gradeEssay = (question: string, answer: string, maxScore: number = 20): { score: number, feedback: string } => {
      const answerLength = answer.trim().length
      
      let score = 0
      let feedback = ''
      
      if (answerLength < 10) {
        score = 0
        feedback = '답안이 너무 짧습니다. 더 자세한 설명이 필요합니다.'
      } else if (answerLength < 50) {
        score = Math.floor(maxScore * 0.3)
        feedback = '기본적인 답변이 있지만, 더 구체적인 설명과 예시가 필요합니다.'
      } else if (answerLength < 100) {
        score = Math.floor(maxScore * 0.6)
        feedback = '적절한 길이의 답변입니다. 논리적 구성과 세부 설명을 보완하면 더 좋겠습니다.'
      } else if (answerLength < 200) {
        score = Math.floor(maxScore * 0.8)
        feedback = '잘 작성된 답변입니다. 핵심 내용을 잘 다루고 있습니다.'
      } else {
        score = maxScore
        feedback = '매우 상세하고 체계적인 답변입니다. 훌륭합니다!'
      }
      
      // Bonus points for mathematical expressions or formulas
      if (answer.includes('$') || answer.match(/[=+\-*/()]/)) {
        score = Math.min(maxScore, score + Math.floor(maxScore * 0.1))
        feedback += ' 수식이나 공식을 활용한 점이 좋습니다.'
      }
      
      return { score, feedback }
    }
    
    const result = gradeEssay(question, answer, maxScore)
    
    return NextResponse.json({ 
      success: true,
      score: result.score,
      maxScore,
      feedback: result.feedback,
      gradedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error grading essay:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}