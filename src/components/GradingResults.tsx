'use client'

import { useState, useEffect, useCallback } from 'react'
import { ProblemSet, Answer, Problem } from '@/types'
import MathRenderer from './MathRenderer'

interface GradingResultsProps {
  exam: ProblemSet
  answers: Record<string | number, Answer>
  onGoBack: () => void
  onRetakeExam: () => void
}

interface QuestionResult {
  question: Problem
  userAnswer: Answer | undefined
  isCorrect: boolean
  score: number
  maxScore: number
  explanation?: string
  reasoning?: string
  strengths?: string
  improvements?: string
  gradedBy?: string
}

export default function GradingResults({ exam, answers, onGoBack, onRetakeExam }: GradingResultsProps) {
  const [results, setResults] = useState<QuestionResult[]>([])
  const [totalScore, setTotalScore] = useState(0)
  const [maxTotalScore, setMaxTotalScore] = useState(0)
  const [isGrading, setIsGrading] = useState(true)

  const gradeExam = useCallback(async () => {
    const tempResults: QuestionResult[] = []
    let tempTotalScore = 0
    let tempMaxTotalScore = 0

    for (const question of exam.problems) {
      const userAnswer = answers[question.id]
      let isCorrect = false
      let score = 0
      const maxScore = question.score
      let reasoning = ''
      let strengths = ''
      let improvements = ''
      let gradedBy = 'auto'

      tempMaxTotalScore += maxScore

      if (userAnswer) {
        // Use LLM grading for short_answer and essay questions
        if (question.type === 'short_answer' || question.type === 'essay') {
          try {
            const response = await fetch('/api/grade-essay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                question: question.question,
                answer: userAnswer.value,
                correctAnswer: question.correct_answer?.toString() || '',
                explanation: question.explanation || '',
                maxScore,
                type: question.type
              })
            })

            const result = await response.json()
            if (result.success) {
              score = result.score
              isCorrect = score >= maxScore * 0.7 // Consider 70%+ as correct
              reasoning = result.reasoning || result.feedback
              strengths = result.strengths || ''
              improvements = result.improvements || ''
              gradedBy = result.gradedBy || 'LLM'
            }
          } catch (error) {
            console.error('LLM grading error:', error)
            // Fall back to simple grading
            if (question.type === 'short_answer') {
              const userAnswerText = userAnswer.value.trim().toLowerCase()
              const correctAnswerText = question.correct_answer?.toString().trim().toLowerCase()
              if (userAnswerText === correctAnswerText) {
                isCorrect = true
                score = maxScore
              }
            }
          }
        } else {
          // Use existing logic for other question types
          switch (question.type) {
            case 'single_choice':
              if (userAnswer.value === question.correct_answer?.toString()) {
                isCorrect = true
                score = maxScore
              }
              break

            case 'multiple_choice':
              if (question.correct_answers) {
                const userAnswers = userAnswer.value.split(',').map(Number).sort()
                const correctAnswers = [...question.correct_answers].sort()
                if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)) {
                  isCorrect = true
                  score = maxScore
                }
              }
              break

            case 'true_false':
              if (userAnswer.value === question.correct_answer?.toString()) {
                isCorrect = true
                score = maxScore
              }
              break
          }
        }
      }

      tempTotalScore += score

      tempResults.push({
        question,
        userAnswer,
        isCorrect,
        score,
        maxScore,
        explanation: question.explanation,
        reasoning,
        strengths,
        improvements,
        gradedBy
      })
    }

    setResults(tempResults)
    setTotalScore(tempTotalScore)
    setMaxTotalScore(tempMaxTotalScore)
    setIsGrading(false)
  }, [exam.problems, answers])

  useEffect(() => {
    gradeExam()
  }, [gradeExam])

  if (isGrading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-2xl backdrop-blur-sm max-w-4xl mx-auto">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">답안 채점 중...</h2>
          <p className="text-gray-600">AI가 귀하의 답안을 분석하고 있습니다.</p>
        </div>
      </div>
    )
  }

  const percentage = Math.round((totalScore / maxTotalScore) * 100)

  const getGrade = (percentage: number): { grade: string, color: string } => {
    if (percentage >= 90) return { grade: 'A', color: 'text-green-600' }
    if (percentage >= 80) return { grade: 'B', color: 'text-blue-600' }
    if (percentage >= 70) return { grade: 'C', color: 'text-yellow-600' }
    if (percentage >= 60) return { grade: 'D', color: 'text-orange-600' }
    return { grade: 'F', color: 'text-red-600' }
  }

  const { grade, color } = getGrade(percentage)

  const formatUserAnswer = (question: Problem, answer: Answer | undefined): string => {
    if (!answer) return '답변 없음'

    switch (question.type) {
      case 'single_choice':
        const optionIndex = parseInt(answer.value)
        return question.options?.[optionIndex] || '잘못된 선택'

      case 'multiple_choice':
        const selectedIndices = answer.value.split(',').map(Number)
        return selectedIndices.map(idx => question.options?.[idx] || '잘못된 선택').join(', ')

      case 'true_false':
        return answer.value === 'true' ? '참 (True)' : '거짓 (False)'

      case 'short_answer':
      case 'essay':
        return answer.value

      default:
        return answer.value
    }
  }

  const formatCorrectAnswer = (question: Problem): string => {
    switch (question.type) {
      case 'single_choice':
        if (typeof question.correct_answer === 'number' && question.options) {
          return question.options[question.correct_answer]
        }
        return question.correct_answer?.toString() || '정답 정보 없음'

      case 'multiple_choice':
        if (question.correct_answers && question.options) {
          return question.correct_answers.map(idx => question.options![idx]).join(', ')
        }
        return '정답 정보 없음'

      case 'true_false':
        return question.correct_answer === true ? '참 (True)' : '거짓 (False)'

      case 'short_answer':
        return question.correct_answer?.toString() || '정답 정보 없음'

      case 'essay':
        return '모범 답안은 해설을 참고하세요'

      default:
        return '정답 정보 없음'
    }
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl backdrop-blur-sm max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">📊 시험 결과</h2>
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{totalScore}</div>
              <div className="text-sm text-gray-600">획득 점수</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{maxTotalScore}</div>
              <div className="text-sm text-gray-600">총점</div>
            </div>
            <div>
              <div className={`text-3xl font-bold ${color}`}>{grade}</div>
              <div className="text-sm text-gray-600">{percentage}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="space-y-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800">📝 문제별 결과</h3>
        
        {results.map((result, index) => (
          <div 
            key={result.question.id}
            className={`border rounded-xl p-6 ${result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-gray-800">
                문제 {index + 1}
              </h4>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  result.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {result.isCorrect ? '✓ 정답' : '✗ 오답'}
                </span>
                <span className="text-sm text-gray-600">
                  {result.score}/{result.maxScore}점
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-800 font-medium mb-2">
                <MathRenderer text={result.question.question} />
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">당신의 답:</p>
                <p className={`${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  <MathRenderer text={formatUserAnswer(result.question, result.userAnswer)} />
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">정답:</p>
                <p className="text-green-700">
                  <MathRenderer text={formatCorrectAnswer(result.question)} />
                </p>
              </div>
            </div>

            {/* Score Explanation for Short Answer and Essay */}
            {(result.question.type === 'short_answer' || result.question.type === 'essay') && (
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-semibold text-amber-800">📊 점수 설명:</p>
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                    {result.score}/{result.maxScore}점
                  </span>
                </div>
                <p className="text-amber-700 text-sm font-medium">
                  {result.score === result.maxScore 
                    ? `완벽한 답변입니다! 만점 ${result.maxScore}점을 획득했습니다.`
                    : result.score >= result.maxScore * 0.8
                    ? `우수한 답변입니다! ${result.maxScore}점 만점 중 ${result.score}점을 획득했습니다.`
                    : result.score >= result.maxScore * 0.6
                    ? `적절한 답변입니다. ${result.maxScore}점 만점 중 ${result.score}점을 획득했습니다.`
                    : result.score >= result.maxScore * 0.4
                    ? `기본적인 답변입니다. ${result.maxScore}점 만점 중 ${result.score}점을 획득했습니다.`
                    : `답변이 부족합니다. ${result.maxScore}점 만점 중 ${result.score}점을 획득했습니다.`}
                </p>
              </div>
            )}

            {/* LLM Reasoning and Feedback */}
            {result.reasoning && (
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-semibold text-purple-800">🤖 AI 채점 분석:</p>
                  {result.gradedBy === 'LLM' && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      LLM 채점
                    </span>
                  )}
                </div>
                <p className="text-purple-700 text-sm mb-2">
                  <MathRenderer text={result.reasoning} />
                </p>
                
                {result.strengths && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-green-800">✅ 잘한 점:</p>
                    <p className="text-green-700 text-xs">
                      <MathRenderer text={result.strengths} />
                    </p>
                  </div>
                )}
                
                {result.improvements && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-orange-800">💡 개선할 점:</p>
                    <p className="text-orange-700 text-xs">
                      <MathRenderer text={result.improvements} />
                    </p>
                  </div>
                )}
              </div>
            )}

            {result.explanation && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-sm font-semibold text-blue-800 mb-1">📚 문제 해설:</p>
                <p className="text-blue-700 text-sm">
                  <MathRenderer text={result.explanation} />
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRetakeExam}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          🔄 다시 시험보기
        </button>
        <button
          onClick={onGoBack}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
        >
          📚 문제집 선택으로 돌아가기
        </button>
      </div>
    </div>
  )
}