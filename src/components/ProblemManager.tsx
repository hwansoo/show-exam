'use client'

import { useState } from 'react'
import { ProblemSet, Problem } from '@/types'
import ProblemEditor from './ProblemEditor'
import MathRenderer from './MathRenderer'

interface ProblemManagerProps {
  examSets: ProblemSet[]
  onRefresh: () => void
}

export default function ProblemManager({ examSets, onRefresh }: ProblemManagerProps) {
  const [selectedSet, setSelectedSet] = useState<ProblemSet | null>(null)
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [isCreatingSet, setIsCreatingSet] = useState(false)

  const handleCreateNewSet = () => {
    setIsCreatingSet(true)
    setShowEditor(true)
  }

  // Placeholder functions for future implementation
  // const handleEditProblem = (problem: Problem) => { ... }
  // const handleCreateProblem = () => { ... }
  // const handleDeleteProblem = async (problemId: string | number) => { ... }
  // const handleDeleteSet = async (setId: string | number) => { ... }

  const handleEditorSave = () => {
    setShowEditor(false)
    setEditingProblem(null)
    setIsCreatingSet(false)
    onRefresh()
  }

  const handleEditorCancel = () => {
    setShowEditor(false)
    setEditingProblem(null)
    setIsCreatingSet(false)
  }

  if (showEditor) {
    return (
      <ProblemEditor
        problem={editingProblem}
        problemSet={selectedSet}
        isCreatingSet={isCreatingSet}
        onSave={handleEditorSave}
        onCancel={handleEditorCancel}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Temporary Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-blue-600">ℹ️</span>
          <h3 className="font-semibold text-blue-800">문제 관리 기능</h3>
        </div>
        <p className="text-blue-700 text-sm">
          현재 기존 문제 세트를 조회할 수 있습니다. 문제 추가/수정/삭제 기능은 곧 추가될 예정입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Sets List */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">📚 문제 세트</h2>
            <button
              onClick={() => alert('문제 세트 생성 기능은 곧 추가될 예정입니다.')}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-not-allowed"
              disabled
            >
              + 새 문제 세트 (준비 중)
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
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    alert('삭제 기능은 곧 추가될 예정입니다.')
                  }}
                  className="text-gray-400 p-1 cursor-not-allowed"
                  title="문제 세트 삭제 (준비 중)"
                  disabled
                >
                  🗑️
                </button>
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
          {selectedSet && (
            <button
              onClick={() => alert('문제 추가 기능은 곧 추가될 예정입니다.')}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-not-allowed"
              disabled
            >
              + 새 문제 (준비 중)
            </button>
          )}
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
                  <div className="flex space-x-2">
                    <button
                      onClick={() => alert('문제 수정 기능은 곧 추가될 예정입니다.')}
                      className="text-gray-400 p-1 cursor-not-allowed"
                      title="문제 수정 (준비 중)"
                      disabled
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => alert('문제 삭제 기능은 곧 추가될 예정입니다.')}
                      className="text-gray-400 p-1 cursor-not-allowed"
                      title="문제 삭제 (준비 중)"
                      disabled
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {(!selectedSet.problems || selectedSet.problems.length === 0) && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">이 문제 세트에는 문제가 없습니다.</p>
                <button
                  onClick={() => alert('문제 추가 기능은 곧 추가될 예정입니다.')}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-not-allowed"
                  disabled
                >
                  첫 번째 문제 만들기 (준비 중)
                </button>
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