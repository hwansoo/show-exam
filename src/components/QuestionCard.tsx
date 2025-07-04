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

  const handleMultipleChoice = (optionId: string) => {
    onAnswer({ type: 'multiple_choice', value: optionId })
  }

  const handleTextAnswer = (text: string) => {
    setTextAnswer(text)
    onAnswer({ type: 'text', value: text })
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {question.question}
        </h3>
        {question.description && (
          <p className="text-gray-600 mb-4">{question.description}</p>
        )}
      </div>

      {question.type === 'multiple_choice' && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index: number) => (
            <label
              key={index}
              className="flex items-center p-3 rounded-lg border hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={typeof option === 'string' ? index.toString() : option.id}
                checked={answer?.value === (typeof option === 'string' ? index.toString() : option.id)}
                onChange={() => handleMultipleChoice(typeof option === 'string' ? index.toString() : option.id)}
                className="mr-3 text-blue-600"
              />
              <span className="text-gray-800">{typeof option === 'string' ? option : option.text}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'text' && (
        <textarea
          value={textAnswer}
          onChange={(e) => handleTextAnswer(e.target.value)}
          placeholder="답안을 입력하세요..."
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-vertical min-h-[120px]"
        />
      )}

      {question.subQuestions && question.subQuestions.length > 0 && (
        <div className="mt-6 ml-4 border-l-2 border-gray-300 pl-4">
          <h4 className="font-semibold text-gray-700 mb-3">세부 문제</h4>
          {question.subQuestions.map((subQ, index: number) => (
            <div key={index} className="mb-4">
              <p className="text-gray-700 mb-2">{subQ.question}</p>
              {subQ.type === 'text' && (
                <textarea
                  placeholder="답안을 입력하세요..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-vertical min-h-[80px]"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}