import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

// Check if we have valid Supabase configuration
const hasValidSupabaseConfig = supabaseUrl !== 'https://placeholder.supabase.co' && 
                               supabaseAnonKey !== 'placeholder-key' &&
                               supabaseUrl.includes('supabase.co')

// Client-side Supabase client (public access)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (admin access) - only use in API routes
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Utility functions
export const isSupabaseConfigured = () => hasValidSupabaseConfig

export async function testSupabaseConnection() {
  if (!hasValidSupabaseConfig) {
    return { connected: false, error: 'Supabase not configured' }
  }
  
  try {
    const { data, error } = await supabase
      .from('problem_sets')
      .select('id')
      .limit(1)
    
    if (error && error.message.includes('relation "problem_sets" does not exist')) {
      return { connected: false, error: 'Database tables not created' }
    }
    
    if (error) {
      return { connected: false, error: error.message }
    }
    
    return { connected: true, hasData: data && data.length > 0 }
  } catch (error) {
    return { connected: false, error: String(error) }
  }
}

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