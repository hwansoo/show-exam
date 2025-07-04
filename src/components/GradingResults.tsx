'use client'

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
}

export default function GradingResults({ exam, answers, onGoBack, onRetakeExam }: GradingResultsProps) {
  const gradeExam = (): { results: QuestionResult[], totalScore: number, maxTotalScore: number } => {
    const results: QuestionResult[] = []
    let totalScore = 0
    let maxTotalScore = 0

    exam.problems.forEach(question => {
      const userAnswer = answers[question.id]
      let isCorrect = false
      let score = 0
      const maxScore = question.score

      maxTotalScore += maxScore

      if (userAnswer) {
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

          case 'short_answer':
            // Simple string comparison (case-insensitive, trimmed)
            const userAnswerText = userAnswer.value.trim().toLowerCase()
            const correctAnswerText = question.correct_answer?.toString().trim().toLowerCase()
            if (userAnswerText === correctAnswerText) {
              isCorrect = true
              score = maxScore
            }
            break

          case 'essay':
            // Simple essay grading based on length and content
            const answerLength = userAnswer.value.trim().length
            if (answerLength < 10) {
              score = 0
            } else if (answerLength < 50) {
              score = Math.floor(maxScore * 0.3)
            } else if (answerLength < 100) {
              score = Math.floor(maxScore * 0.6)
            } else if (answerLength < 200) {
              score = Math.floor(maxScore * 0.8)
              isCorrect = true
            } else {
              score = maxScore
              isCorrect = true
            }
            
            // Bonus for mathematical expressions
            if (userAnswer.value.includes('$') || userAnswer.value.match(/[=+\-*/()]/)) {
              score = Math.min(maxScore, score + Math.floor(maxScore * 0.1))
            }
            break
        }
      }

      totalScore += score

      results.push({
        question,
        userAnswer,
        isCorrect,
        score,
        maxScore,
        explanation: question.explanation
      })
    })

    return { results, totalScore, maxTotalScore }
  }

  const { results, totalScore, maxTotalScore } = gradeExam()
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

            {result.explanation && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-sm font-semibold text-blue-800 mb-1">💡 해설:</p>
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