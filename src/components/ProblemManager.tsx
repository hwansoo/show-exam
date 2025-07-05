'use client'

import { useState } from 'react'
import { ProblemSet } from '@/types'
import MathRenderer from './MathRenderer'

interface ProblemManagerProps {
  examSets: ProblemSet[]
  onRefresh: () => void
}

export default function ProblemManager({ examSets, onRefresh }: ProblemManagerProps) {
  const [selectedSet, setSelectedSet] = useState<ProblemSet | null>(null)
  const [showJsonEditor, setShowJsonEditor] = useState(false)
  const [jsonContent, setJsonContent] = useState('')
  const [isCreatingSet, setIsCreatingSet] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateNewSet = () => {
    const templateJson = {
      title: "새 문제 세트",
      description: "문제 세트 설명",
      problems: [
        {
          question: "문제를 입력하세요",
          type: "single_choice",
          options: ["선택지 1", "선택지 2", "선택지 3", "선택지 4"],
          correct_answer: 0,
          score: 1,
          explanation: "해설을 입력하세요"
        }
      ]
    }
    setJsonContent(JSON.stringify(templateJson, null, 2))
    setIsCreatingSet(true)
    setShowJsonEditor(true)
  }

  const handleEditSet = (problemSet: ProblemSet) => {
    setSelectedSet(problemSet)
    const editJson = {
      title: problemSet.name,
      description: problemSet.description || "",
      problems: problemSet.problems || []
    }
    setJsonContent(JSON.stringify(editJson, null, 2))
    setIsCreatingSet(false)
    setShowJsonEditor(true)
  }

  const handleSaveJson = async () => {
    setIsLoading(true)
    try {
      const parsedJson = JSON.parse(jsonContent)
      
      const endpoint = isCreatingSet 
        ? '/api/admin/problem-sets'
        : `/api/admin/problem-sets/${selectedSet?.id}`
        
      const method = isCreatingSet ? 'POST' : 'PUT'
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(parsedJson)
      })

      if (response.ok) {
        setShowJsonEditor(false)
        setIsCreatingSet(false)
        setJsonContent('')
        onRefresh()
        alert('저장되었습니다.')
      } else {
        const errorData = await response.json()
        alert(`저장 실패: ${errorData.error || '알 수 없는 오류'}`)
      }
    } catch (error) {
      console.error('Error parsing JSON or saving:', error)
      alert('JSON 형식이 올바르지 않거나 저장 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelJson = () => {
    setShowJsonEditor(false)
    setIsCreatingSet(false)
    setJsonContent('')
  }

  const handleDeleteSet = async (setId: string | number) => {
    if (!confirm('정말로 이 문제 세트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return
    }

    try {
      const adminToken = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/problem-sets/${setId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      })

      const result = await response.json()
      if (result.success) {
        alert(result.message)
        setSelectedSet(null)
        onRefresh()
      } else {
        alert(result.error || '문제 세트 삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error('Error deleting problem set:', error)
      alert('문제 세트 삭제 중 오류가 발생했습니다.')
    }
  }

  if (showJsonEditor) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isCreatingSet ? '📚 새 문제 세트 만들기' : '✏️ 문제 세트 수정'}
          </h2>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleCancelJson}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              취소
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              문제 세트 JSON
            </label>
            <p className="text-xs text-gray-500 mb-2">
              아래 텍스트 영역에서 JSON 형식으로 문제 세트를 편집하세요. 
              문제 타입: single_choice, multiple_choice, true_false, short_answer, essay
            </p>
            <textarea
              value={jsonContent}
              onChange={(e) => setJsonContent(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="JSON 형식으로 문제 세트를 입력하세요..."
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancelJson}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSaveJson}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              {isLoading ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Sets List */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">📚 문제 세트</h2>
            <button
              onClick={handleCreateNewSet}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              + 새 문제 세트
            </button>
          </div>

        <div className="space-y-4">
          {examSets.map((set) => (
            <div
              key={set.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedSet?.id === set.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedSet(set)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    <MathRenderer text={set.name} />
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <MathRenderer text={set.description} />
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{set.problems?.length || 0}개 문제</span>
                    <span>{set.totalScore || 0}점</span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditSet(set)
                    }}
                    className="text-blue-500 hover:text-blue-700 p-1 transition-colors"
                    title="문제 세트 수정"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteSet(set.id)
                    }}
                    className="text-red-500 hover:text-red-700 p-1 transition-colors"
                    title="문제 세트 삭제"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {examSets.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">문제 세트가 없습니다.</p>
              <button
                onClick={handleCreateNewSet}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                첫 번째 문제 세트 만들기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Problems List */}
      <div className="bg-white rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedSet ? `📝 ${selectedSet.name} 문제들` : '📝 문제 목록'}
          </h2>
        </div>

        {selectedSet ? (
          <div className="space-y-4">
            {selectedSet.problems?.map((problem, index) => (
              <div
                key={problem.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        문제 {index + 1}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {problem.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {problem.score}점
                      </span>
                    </div>
                    <p className="text-gray-800 mb-2 line-clamp-2">
                      <MathRenderer text={problem.question} />
                    </p>
                    {problem.options && (
                      <div className="text-xs text-gray-600">
                        선택지 {problem.options.length}개
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: {problem.id}
                  </div>
                </div>
              </div>
            ))}
            
            {(!selectedSet.problems || selectedSet.problems.length === 0) && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">이 문제 세트에는 문제가 없습니다.</p>
                <p className="text-gray-400 text-sm">문제 세트를 수정하여 문제를 추가하세요.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              왼쪽에서 문제 세트를 선택하세요.
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}