'use client'

import { useState } from 'react'
import QuestionCard from './QuestionCard'
import { ProblemSet, Answer } from '@/types'

interface ExamViewProps {
  exam: ProblemSet
  onGoBack: () => void
}

export default function ExamView({ exam, onGoBack }: ExamViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string | number, Answer>>({})
  const [showResults, setShowResults] = useState(false)

  const questions = exam.problems || []
  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = (questionId: string | number, answer: Answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const submitExam = async () => {
    try {
      const response = await fetch('/api/grade-essay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examId: exam.id,
          answers
        })
      })
      
      const results = await response.json()
      console.log('Grading results:', results)
      setShowResults(true)
    } catch (error) {
      console.error('Error submitting exam:', error)
    }
  }

  if (showResults) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">시험 결과</h2>
        <div className="text-center py-8">
          <p className="text-lg text-gray-600 mb-6">시험이 제출되었습니다.</p>
          <button
            onClick={onGoBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{exam.name}</h2>
        <button
          onClick={onGoBack}
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← 돌아가기
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            문제 {currentQuestionIndex + 1} / {questions.length}
          </span>
          <span className="text-sm text-gray-600">
            {currentQuestion?.score || 0}점
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          answer={answers[currentQuestion.id]}
          onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
        />
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 rounded-lg font-semibold transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed
                   bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          이전 문제
        </button>

        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={submitExam}
            className="px-6 py-3 rounded-lg font-semibold transition-colors
                     bg-green-600 hover:bg-green-700 text-white"
          >
            시험 제출
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-6 py-3 rounded-lg font-semibold transition-colors
                     bg-blue-600 hover:bg-blue-700 text-white"
          >
            다음 문제
          </button>
        )}
      </div>
    </div>
  )
}