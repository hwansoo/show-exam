'use client'

import { useState, useEffect } from 'react'
import { ProblemSet } from '@/types'
import ProblemManager from './ProblemManager'

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'problems' | 'analytics'>('problems')
  const [examSets, setExamSets] = useState<ProblemSet[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchExamSets()
  }, [])

  const fetchExamSets = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/problem-sets-display', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      })
      const data = await response.json()
      setExamSets(data.problem_sets || [])
    } catch (error) {
      console.error('Error fetching exam sets:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    onLogout()
  }

  const refreshData = () => {
    fetchExamSets()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">데이터 로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                🛠️ 관리자 대시보드
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">관리자 모드</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="bg-white rounded-lg shadow-sm p-1 flex space-x-1">
          <button
            onClick={() => setActiveTab('problems')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'problems'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            📝 문제 관리
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            📊 분석
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {activeTab === 'problems' && (
          <ProblemManager 
            examSets={examSets} 
            onRefresh={refreshData}
          />
        )}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 사용 통계</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">총 문제 세트</h3>
                <p className="text-3xl font-bold text-blue-600">{examSets.length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">총 문제 수</h3>
                <p className="text-3xl font-bold text-green-600">
                  {examSets.reduce((total, set) => total + (set.problems?.length || 0), 0)}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">총 점수</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {examSets.reduce((total, set) => total + (set.totalScore || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}