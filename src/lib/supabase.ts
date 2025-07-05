import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client (public access)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (admin access) - only use in API routes
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      problem_sets: {
        Row: {
          id: string
          key: string
          title: string
          description: string | null
          category: string
          difficulty: string
          is_built_in: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          title: string
          description?: string | null
          category?: string
          difficulty?: string
          is_built_in?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          title?: string
          description?: string | null
          category?: string
          difficulty?: string
          is_built_in?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      problems: {
        Row: {
          id: string
          problem_set_id: string
          question: string
          type: string
          options: unknown | null
          correct_answer: unknown | null
          score: number
          explanation: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          problem_set_id: string
          question: string
          type: string
          options?: unknown | null
          correct_answer?: unknown | null
          score?: number
          explanation?: string | null
          order_index: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          problem_set_id?: string
          question?: string
          type?: string
          options?: unknown | null
          correct_answer?: unknown | null
          score?: number
          explanation?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}