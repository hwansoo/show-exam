import { NextResponse } from 'next/server'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { question, answer, correctAnswer, explanation, maxScore, type } = body
    
    if (!question || !answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 })
    }

    // If OpenAI API key is available, use LLM grading
    if (OPENAI_API_KEY && (type === 'short_answer' || type === 'essay')) {
      try {
        const llmResult = await gradWithLLM(question, answer, correctAnswer, explanation, maxScore, type)
        return NextResponse.json(llmResult)
      } catch (llmError) {
        console.warn('LLM grading failed, falling back to simple grading:', llmError)
        // Fall back to simple grading if LLM fails
      }
    }

    // Fallback simple grading
    const result = gradeSimple(question, answer, maxScore, type)
    
    return NextResponse.json({ 
      success: true,
      score: result.score,
      maxScore,
      feedback: result.feedback,
      reasoning: result.reasoning,
      gradedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error grading essay:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function gradWithLLM(question: string, answer: string, correctAnswer: string, explanation: string, maxScore: number, type: string) {
  const prompt = `당신은 교육 전문가이자 채점자입니다. 다음 문제의 학생 답안을 채점해주세요.

**문제 유형**: ${type === 'short_answer' ? '단답형' : '서술형'}
**배점**: ${maxScore}점
**문제**: ${question}
**정답 또는 모범답안**: ${correctAnswer || '명시되지 않음'}
**해설**: ${explanation || '해설 없음'}
**학생 답안**: ${answer}

다음 기준으로 채점해주세요:
1. 정확성: 답안이 정답과 얼마나 일치하는가
2. 완성도: 답안이 얼마나 완전한가
3. 이해도: 개념에 대한 이해를 보여주는가
4. 논리성: 설명이 논리적으로 구성되어 있는가 (서술형의 경우)

**중요**: "reasoning" 필드에는 반드시 학생이 왜 이 점수를 받았는지 구체적으로 설명해주세요. 
예: "정답의 핵심 개념을 정확히 파악했으나, 설명이 불완전하여 3점 중 2점을 부여합니다."

응답은 반드시 다음 JSON 형식으로 해주세요:
{
  "score": 점수 (0부터 ${maxScore}까지의 정수),
  "feedback": "학생에게 주는 구체적인 피드백 (한국어)",
  "reasoning": "왜 이 점수를 받았는지에 대한 구체적인 설명 (한국어, 필수)",
  "strengths": "잘한 점들 (한국어)",
  "improvements": "개선할 점들 (한국어)"
}`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: '당신은 한국의 교육 전문가이자 공정한 채점자입니다. 학생들의 답안을 정확하고 건설적으로 평가합니다.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.3
    })
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`)
  }

  const data = await response.json()
  const content = data.choices[0].message.content

  try {
    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }
    
    const gradingResult = JSON.parse(jsonMatch[0])
    
    return {
      success: true,
      score: Math.min(Math.max(0, gradingResult.score), maxScore),
      maxScore,
      feedback: gradingResult.feedback,
      reasoning: gradingResult.reasoning,
      strengths: gradingResult.strengths,
      improvements: gradingResult.improvements,
      gradedAt: new Date().toISOString(),
      gradedBy: 'LLM'
    }
  } catch (parseError) {
    console.error('Error parsing LLM response:', parseError)
    throw new Error('Failed to parse LLM response')
  }
}

function gradeSimple(question: string, answer: string, maxScore: number, type: string): { score: number, feedback: string, reasoning: string } {
  const answerLength = answer.trim().length
  
  let score = 0
  let feedback = ''
  let reasoning = ''
  
  if (type === 'short_answer') {
    if (answerLength < 3) {
      score = 0
      feedback = '답안이 너무 짧습니다. 더 구체적인 답변이 필요합니다.'
      reasoning = `답안 길이가 ${answerLength}자로 매우 짧아 내용 평가가 어려워 ${maxScore}점 중 0점을 부여합니다.`
    } else if (answerLength < 10) {
      score = Math.floor(maxScore * 0.4)
      feedback = '기본적인 답변이 있지만 더 자세한 설명이 필요합니다.'
      reasoning = `답안 길이가 ${answerLength}자로 간단한 답변이지만 충분한 설명이 부족하여 ${maxScore}점 중 ${score}점을 부여합니다.`
    } else if (answerLength < 30) {
      score = Math.floor(maxScore * 0.7)
      feedback = '적절한 답변입니다. 조금 더 구체적이면 좋겠습니다.'
      reasoning = `답안 길이가 ${answerLength}자로 적절하며 기본 내용을 포함하고 있어 ${maxScore}점 중 ${score}점을 부여합니다.`
    } else {
      score = maxScore
      feedback = '상세하고 좋은 답변입니다.'
      reasoning = `답안 길이가 ${answerLength}자로 충분히 상세하며 완전한 설명을 제공하여 만점 ${maxScore}점을 부여합니다.`
    }
  } else { // essay
    if (answerLength < 10) {
      score = 0
      feedback = '답안이 너무 짧습니다. 더 자세한 설명이 필요합니다.'
      reasoning = `답안 길이가 ${answerLength}자로 서술형 답안으로는 내용이 부족하여 ${maxScore}점 중 0점을 부여합니다.`
    } else if (answerLength < 50) {
      score = Math.floor(maxScore * 0.3)
      feedback = '기본적인 답변이 있지만, 더 구체적인 설명과 예시가 필요합니다.'
      reasoning = `답안 길이가 ${answerLength}자로 기본 내용은 있으나 논리적 전개와 세부 설명이 부족하여 ${maxScore}점 중 ${score}점을 부여합니다.`
    } else if (answerLength < 100) {
      score = Math.floor(maxScore * 0.6)
      feedback = '적절한 길이의 답변입니다. 논리적 구성과 세부 설명을 보완하면 더 좋겠습니다.'
      reasoning = `답안 길이가 ${answerLength}자로 중간 수준의 답변으로 기본 요구사항을 충족하여 ${maxScore}점 중 ${score}점을 부여합니다.`
    } else if (answerLength < 200) {
      score = Math.floor(maxScore * 0.8)
      feedback = '잘 작성된 답변입니다. 핵심 내용을 잘 다루고 있습니다.'
      reasoning = `답안 길이가 ${answerLength}자로 충분한 내용과 설명이 포함된 양질의 답변이어서 ${maxScore}점 중 ${score}점을 부여합니다.`
    } else {
      score = maxScore
      feedback = '매우 상세하고 체계적인 답변입니다. 훌륭합니다!'
      reasoning = `답안 길이가 ${answerLength}자로 매우 상세하고 논리적인 완성도 높은 답변이어서 만점 ${maxScore}점을 부여합니다.`
    }
  }
  
  // Bonus points for mathematical expressions or formulas
  if (answer.includes('$') || answer.match(/[=+\-*/()]/)) {
    const bonus = Math.floor(maxScore * 0.1)
    score = Math.min(maxScore, score + bonus)
    feedback += ' 수식이나 공식을 활용한 점이 좋습니다.'
    reasoning += ` 수식을 활용한 점을 인정하여 ${bonus}점을 추가로 부여해 최종 ${score}점입니다.`
  }
  
  return { score, feedback, reasoning }
}