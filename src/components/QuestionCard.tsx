'use client'

import { useState } from 'react'
import { Problem, Answer } from '@/types'

interface QuestionCardProps {
  question: Problem
  answer: Answer | undefined
  onAnswer: (answer: Answer) => void
}

export default function QuestionCard({ question, answer, onAnswer }: QuestionCardProps) {
  const [textAnswer, setTextAnswer] = useState(answer?.value || '')

  const handleSingleChoice = (optionIndex: number) => {
    onAnswer({ type: 'multiple_choice', value: optionIndex.toString() })
  }

  const handleMultipleChoice = (optionIndex: number) => {
    const currentAnswers = answer?.value ? answer.value.split(',').map(Number) : []
    let newAnswers: number[]
    
    if (currentAnswers.includes(optionIndex)) {
      newAnswers = currentAnswers.filter(i => i !== optionIndex)
    } else {
      newAnswers = [...currentAnswers, optionIndex]
    }
    
    onAnswer({ type: 'multiple_choice', value: newAnswers.join(',') })
  }

  const handleTrueFalse = (value: boolean) => {
    onAnswer({ type: 'multiple_choice', value: value.toString() })
  }

  const handleTextAnswer = (text: string) => {
    setTextAnswer(text)
    onAnswer({ type: 'text', value: text })
  }

  const renderQuestion = (q: Problem) => (
    <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {q.question}
        </h3>
        {q.description && (
          <p className="text-gray-600 mb-4">{q.description}</p>
        )}
      </div>

      {/* Single Choice */}
      {q.type === 'single_choice' && q.options && (
        <div className="space-y-3">
          {q.options.map((option, index: number) => (
            <label
              key={index}
              className="flex items-center p-3 rounded-lg border hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name={`question-${q.id}`}
                value={index}
                checked={answer?.value === index.toString()}
                onChange={() => handleSingleChoice(index)}
                className="mr-3 text-blue-600"
              />
              <span className="text-gray-800">{option}</span>
            </label>
          ))}
        </div>
      )}

      {/* Multiple Choice */}
      {q.type === 'multiple_choice' && q.options && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 mb-2">여러 개를 선택할 수 있습니다.</p>
          {q.options.map((option, index: number) => {
            const selectedAnswers = answer?.value ? answer.value.split(',').map(Number) : []
            return (
              <label
                key={index}
                className="flex items-center p-3 rounded-lg border hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedAnswers.includes(index)}
                  onChange={() => handleMultipleChoice(index)}
                  className="mr-3 text-blue-600"
                />
                <span className="text-gray-800">{option}</span>
              </label>
            )
          })}
        </div>
      )}

      {/* True/False */}
      {q.type === 'true_false' && (
        <div className="space-y-3">
          <label className="flex items-center p-3 rounded-lg border hover:bg-gray-100 cursor-pointer transition-colors">
            <input
              type="radio"
              name={`question-${q.id}`}
              checked={answer?.value === 'true'}
              onChange={() => handleTrueFalse(true)}
              className="mr-3 text-blue-600"
            />
            <span className="text-gray-800">참 (True)</span>
          </label>
          <label className="flex items-center p-3 rounded-lg border hover:bg-gray-100 cursor-pointer transition-colors">
            <input
              type="radio"
              name={`question-${q.id}`}
              checked={answer?.value === 'false'}
              onChange={() => handleTrueFalse(false)}
              className="mr-3 text-blue-600"
            />
            <span className="text-gray-800">거짓 (False)</span>
          </label>
        </div>
      )}

      {/* Short Answer and Essay */}
      {(q.type === 'short_answer' || q.type === 'essay') && (
        <textarea
          value={textAnswer}
          onChange={(e) => handleTextAnswer(e.target.value)}
          placeholder="답안을 입력하세요..."
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-vertical min-h-[120px]"
        />
      )}
    </div>
  )

  return (
    <div>
      {renderQuestion(question)}
      
      {/* Compound Questions */}
      {question.type === 'compound' && question.subQuestions && (
        <div className="mt-6 space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">세부 문제</h4>
          {question.subQuestions.map((subQ, index: number) => (
            <div key={index} className="ml-4">
              {renderQuestion({ ...subQ, id: `${question.id}-${index}`, score: subQ.score || 0 })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}