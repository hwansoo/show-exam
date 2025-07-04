'use client'

import { useState } from 'react'

interface AuthFormProps {
  onAuthenticated: () => void
}

export default function AuthForm({ onAuthenticated }: AuthFormProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!password) {
      setError('비밀번호를 입력하세요')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password })
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('show-exam-auth-token', data.token)
        onAuthenticated()
      } else {
        setError('비밀번호가 올바르지 않습니다')
      }
    } catch {
      setError('연결 오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as React.FormEvent)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl backdrop-blur-sm max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🔐 서비스 접속</h2>
        <p className="text-gray-600">이 서비스는 비밀번호로 보호되고 있습니다.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="접속 비밀번호를 입력하세요"
            className="w-full p-4 border-2 border-gray-300 rounded-lg text-center focus:border-blue-500 focus:outline-none"
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
                   text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '확인 중...' : '🚀 접속하기'}
        </button>
        
        {error && (
          <div className="text-red-600 text-center text-sm mt-2">
            ❌ {error}
          </div>
        )}
      </form>
    </div>
  )
}