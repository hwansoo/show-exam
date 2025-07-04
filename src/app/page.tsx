'use client'

import { useState, useEffect } from 'react'
import ExamSelector from '@/components/ExamSelector'
import ExamView from '@/components/ExamView'
import AuthForm from '@/components/AuthForm'
import AdminAuth from '@/components/AdminAuth'
import AdminDashboard from '@/components/AdminDashboard'
import { ProblemSet } from '@/types'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [currentExam, setCurrentExam] = useState<ProblemSet | null>(null)
  const [examSets, setExamSets] = useState<ProblemSet[]>([])

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('show-exam-auth-token')
    const adminToken = localStorage.getItem('adminToken')
    
    if (token) {
      setIsAuthenticated(true)
      loadExamSets()
    }
    
    if (adminToken) {
      setIsAdminAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadExamSets()
    }
  }, [isAuthenticated])

  const loadExamSets = async () => {
    try {
      const response = await fetch('/api/problem-sets')
      const data = await response.json()
      setExamSets(data.problem_sets || data)
    } catch (error) {
      console.error('Error loading exam sets:', error)
    }
  }

  const selectExam = (exam: ProblemSet) => {
    setCurrentExam(exam)
  }

  const goBack = () => {
    setCurrentExam(null)
  }

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
  }

  const handleAdminAuthenticated = () => {
    setIsAdminAuthenticated(true)
    setIsAdminMode(true)
  }

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false)
    setIsAdminMode(false)
    localStorage.removeItem('adminToken')
  }

  const toggleAdminMode = () => {
    if (isAdminAuthenticated) {
      setIsAdminMode(!isAdminMode)
      setCurrentExam(null)
    } else {
      setIsAdminMode(true)
    }
  }

  // If in admin mode
  if (isAdminMode) {
    if (!isAdminAuthenticated) {
      return <AdminAuth onAuthenticated={handleAdminAuthenticated} />
    }
    return <AdminDashboard onLogout={handleAdminLogout} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
            📚 시험 문제 연습 서비스
          </h1>
          <p className="text-xl opacity-90">
            다양한 유형의 문제를 풀고 실력을 향상시켜보세요!
          </p>
          
          {/* Admin Mode Toggle */}
          <div className="mt-4">
            <button
              onClick={toggleAdminMode}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
            >
              🛠️ 관리자 모드
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          <AuthForm onAuthenticated={handleAuthenticated} />
        ) : currentExam ? (
          <ExamView exam={currentExam} onGoBack={goBack} />
        ) : (
          <ExamSelector examSets={examSets} onSelectExam={selectExam} />
        )}
      </div>
    </main>
  )
}
