export interface ProblemSet {
  id: string
  name: string
  description: string
  problems: Problem[]
  totalScore: number
  createdAt?: string
}

export interface Problem {
  id: string
  question: string
  description?: string
  type: 'multiple_choice' | 'text'
  options?: Option[]
  subQuestions?: SubQuestion[]
  score: number
}

export interface Option {
  id: string
  text: string
}

export interface SubQuestion {
  id: string
  question: string
  type: 'multiple_choice' | 'text'
  options?: Option[]
}

export interface Answer {
  type: 'multiple_choice' | 'text'
  value: string
}

export interface ExamSubmission {
  examId: string
  answers: Record<string, Answer>
}