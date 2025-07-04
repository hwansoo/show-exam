'use client'

import { useState, useEffect } from 'react'
import ExamSelector from '@/components/ExamSelector'
import ExamView from '@/components/ExamView'
import AuthForm from '@/components/AuthForm'
import { ProblemSet } from '@/types'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentExam, setCurrentExam] = useState<ProblemSet | null>(null)
  const [examSets, setExamSets] = useState<ProblemSet[]>([])

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('show-exam-auth-token')
    if (token) {
      setIsAuthenticated(true)
      loadExamSets()
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
      setExamSets(data)
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
