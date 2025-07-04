export interface ProblemSet {
  id: string
  name: string
  description: string
  problems: Problem[]
  totalScore: number
  createdAt?: string
}

export interface Problem {
  id: string | number
  question: string
  description?: string
  type: 'single_choice' | 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'compound' | 'text'
  options?: string[]
  subQuestions?: SubQuestion[]
  score: number
  correct_answer?: number | boolean | string
  correct_answers?: number[]
  explanation?: string
}

export interface Option {
  id: string
  text: string
}

export interface SubQuestion {
  id: string
  question: string
  type: 'single_choice' | 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'text'
  options?: string[]
  score?: number
  correct_answer?: number | boolean | string
  correct_answers?: number[]
  explanation?: string
}

export interface Answer {
  type: 'multiple_choice' | 'text'
  value: string
}

export interface ExamSubmission {
  examId: string
  answers: Record<string, Answer>
}