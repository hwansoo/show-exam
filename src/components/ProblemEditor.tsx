'use client'

import { useState, useEffect } from 'react'
import { Problem, ProblemSet } from '@/types'
import MathRenderer from './MathRenderer'

interface ProblemEditorProps {
  problem: Problem | null
  problemSet: ProblemSet | null
  isCreatingSet: boolean
  onSave: () => void
  onCancel: () => void
}

export default function ProblemEditor({ 
  problem, 
  problemSet, 
  isCreatingSet, 
  onSave, 
  onCancel 
}: ProblemEditorProps) {
  const [formData, setFormData] = useState({
    // Problem Set fields
    setName: '',
    setDescription: '',
    
    // Problem fields
    question: '',
    type: 'single_choice' as Problem['type'],
    options: ['', '', '', ''],
    correct_answer: '',
    correct_answers: [] as number[],
    score: 1,
    explanation: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (isCreatingSet) {
      // Reset form for new problem set
      setFormData({
        setName: '',
        setDescription: '',
        question: '',
        type: 'single_choice',
        options: ['', '', '', ''],
        correct_answer: '',
        correct_answers: [],
        score: 1,
        explanation: ''
      })
    } else if (problem) {
      // Edit existing problem
      setFormData({
        setName: problemSet?.name || '',
        setDescription: problemSet?.description || '',
        question: problem.question,
        type: problem.type,
        options: problem.options || ['', '', '', ''],
        correct_answer: problem.correct_answer?.toString() || '',
        correct_answers: problem.correct_answers || [],
        score: problem.score,
        explanation: problem.explanation || ''
      })
    } else if (problemSet) {
      // Create new problem in existing set
      setFormData({
        setName: problemSet.name,
        setDescription: problemSet.description,
        question: '',
        type: 'single_choice',
        options: ['', '', '', ''],
        correct_answer: '',
        correct_answers: [],
        score: 1,
        explanation: ''
      })
    }
  }, [problem, problemSet, isCreatingSet])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const endpoint = isCreatingSet 
        ? '/api/admin/problem-sets'
        : problem 
        ? `/api/admin/problems/${problem.id}`
        : '/api/admin/problems'

      const method = isCreatingSet 
        ? 'POST'
        : problem 
        ? 'PUT'
        : 'POST'

      const payload = isCreatingSet ? {
        name: formData.setName,
        description: formData.setDescription,
        problems: [{
          question: formData.question,
          type: formData.type,
          options: formData.type === 'single_choice' || formData.type === 'multiple_choice' ? formData.options.filter(opt => opt.trim()) : undefined,
          correct_answer: getCorrectAnswer(),
          correct_answers: formData.type === 'multiple_choice' ? formData.correct_answers : undefined,
          score: formData.score,
          explanation: formData.explanation
        }]
      } : {
        problemSetKey: problemSet?.id,
        question: formData.question,
        type: formData.type,
        options: formData.type === 'single_choice' || formData.type === 'multiple_choice' ? formData.options.filter(opt => opt.trim()) : undefined,
        correct_answer: getCorrectAnswer(),
        correct_answers: formData.type === 'multiple_choice' ? formData.correct_answers : undefined,
        score: formData.score,
        explanation: formData.explanation
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        onSave()
      } else {
        const errorData = await response.json()
        alert(`저장 실패: ${errorData.error || '알 수 없는 오류'}`)
      }
    } catch (error) {
      console.error('Error saving:', error)
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const getCorrectAnswer = () => {
    switch (formData.type) {
      case 'single_choice':
        return parseInt(formData.correct_answer)
      case 'true_false':
        return formData.correct_answer === 'true'
      case 'short_answer':
      case 'essay':
        return formData.correct_answer
      default:
        return formData.correct_answer
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, '']
    })
  }

  const removeOption = (index: number) => {
    const newOptions = formData.options.filter((_, i) => i !== index)
    setFormData({ ...formData, options: newOptions })
  }

  const handleMultipleChoiceChange = (index: number, checked: boolean) => {
    const newCorrectAnswers = checked
      ? [...formData.correct_answers, index]
      : formData.correct_answers.filter(i => i !== index)
    setFormData({ ...formData, correct_answers: newCorrectAnswers })
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isCreatingSet ? '📚 새 문제 세트 만들기' : problem ? '✏️ 문제 수정' : '➕ 새 문제 만들기'}
        </h2>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {showPreview ? '편집 모드' : '미리보기'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            취소
          </button>
        </div>
      </div>

      {showPreview ? (
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">미리보기</h3>
          <div className="space-y-4">
            {isCreatingSet && (
              <div>
                <h4 className="font-medium text-gray-800">문제 세트: {formData.setName}</h4>
                <p className="text-gray-600 text-sm">{formData.setDescription}</p>
              </div>
            )}
            <div>
              <h4 className="font-medium text-gray-800 mb-2">문제 ({formData.score}점)</h4>
              <p className="text-gray-800 mb-4">
                <MathRenderer text={formData.question} />
              </p>
              
              {(formData.type === 'single_choice' || formData.type === 'multiple_choice') && (
                <div className="space-y-2">
                  {formData.options.filter(opt => opt.trim()).map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type={formData.type === 'single_choice' ? 'radio' : 'checkbox'}
                        disabled
                        checked={
                          formData.type === 'single_choice' 
                            ? parseInt(formData.correct_answer) === index
                            : formData.correct_answers.includes(index)
                        }
                      />
                      <span><MathRenderer text={option} /></span>
                    </div>
                  ))}
                </div>
              )}
              
              {formData.type === 'true_false' && (
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="radio" disabled checked={formData.correct_answer === 'true'} />
                    <span>참 (True)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" disabled checked={formData.correct_answer === 'false'} />
                    <span>거짓 (False)</span>
                  </label>
                </div>
              )}
              
              {(formData.type === 'short_answer' || formData.type === 'essay') && (
                <div>
                  <input
                    type="text"
                    placeholder={formData.type === 'short_answer' ? '단답형 답안' : '서술형 답안'}
                    className="w-full p-2 border rounded"
                    disabled
                  />
                </div>
              )}
              
              {formData.explanation && (
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <h5 className="font-medium text-blue-800 mb-1">해설</h5>
                  <p className="text-blue-700 text-sm">
                    <MathRenderer text={formData.explanation} />
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Problem Set Fields (only when creating new set) */}
          {isCreatingSet && (
            <div className="bg-blue-50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-blue-800">문제 세트 정보</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  문제 세트 이름 *
                </label>
                <input
                  type="text"
                  value={formData.setName}
                  onChange={(e) => setFormData({ ...formData, setName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="예: 수학 기초 문제"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  문제 세트 설명
                </label>
                <textarea
                  value={formData.setDescription}
                  onChange={(e) => setFormData({ ...formData, setDescription: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
                  placeholder="문제 세트에 대한 간단한 설명"
                />
              </div>
            </div>
          )}

          {/* Problem Fields */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">문제 정보</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                문제 유형 *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Problem['type'] })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="single_choice">객관식 (단일 선택)</option>
                <option value="multiple_choice">객관식 (다중 선택)</option>
                <option value="true_false">참/거짓</option>
                <option value="short_answer">단답형</option>
                <option value="essay">서술형</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                문제 *
              </label>
              <textarea
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                placeholder="문제를 입력하세요. LaTeX 수식은 $수식$ 형태로 작성하세요."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                배점 *
              </label>
              <input
                type="number"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                required
              />
            </div>

            {/* Options for single_choice and multiple_choice */}
            {(formData.type === 'single_choice' || formData.type === 'multiple_choice') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  선택지 *
                </label>
                <div className="space-y-2">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`선택지 ${index + 1}`}
                      />
                      {formData.type === 'single_choice' && (
                        <input
                          type="radio"
                          name="correct_answer"
                          value={index}
                          checked={parseInt(formData.correct_answer) === index}
                          onChange={(e) => setFormData({ ...formData, correct_answer: e.target.value })}
                          className="text-blue-600"
                        />
                      )}
                      {formData.type === 'multiple_choice' && (
                        <input
                          type="checkbox"
                          checked={formData.correct_answers.includes(index)}
                          onChange={(e) => handleMultipleChoiceChange(index, e.target.checked)}
                          className="text-blue-600"
                        />
                      )}
                      {formData.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addOption}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + 선택지 추가
                  </button>
                </div>
              </div>
            )}

            {/* True/False options */}
            {formData.type === 'true_false' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  정답 *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="correct_answer"
                      value="true"
                      checked={formData.correct_answer === 'true'}
                      onChange={(e) => setFormData({ ...formData, correct_answer: e.target.value })}
                      className="text-blue-600"
                    />
                    <span>참 (True)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="correct_answer"
                      value="false"
                      checked={formData.correct_answer === 'false'}
                      onChange={(e) => setFormData({ ...formData, correct_answer: e.target.value })}
                      className="text-blue-600"
                    />
                    <span>거짓 (False)</span>
                  </label>
                </div>
              </div>
            )}

            {/* Short answer and essay correct answer */}
            {(formData.type === 'short_answer' || formData.type === 'essay') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.type === 'short_answer' ? '정답' : '모범 답안'}
                </label>
                <textarea
                  value={formData.correct_answer}
                  onChange={(e) => setFormData({ ...formData, correct_answer: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
                  placeholder={formData.type === 'short_answer' ? '정답을 입력하세요' : '모범 답안을 입력하세요'}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                해설
              </label>
              <textarea
                value={formData.explanation}
                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                placeholder="문제에 대한 해설을 입력하세요"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              {isLoading ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}