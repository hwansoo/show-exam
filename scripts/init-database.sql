-- Supabase Database Schema for Problem Sets and Problems
-- Run this script in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Problem Sets table
CREATE TABLE IF NOT EXISTS problem_sets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR UNIQUE NOT NULL,
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR DEFAULT 'custom',
  difficulty VARCHAR DEFAULT 'unknown',
  is_built_in BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Problems table
CREATE TABLE IF NOT EXISTS problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  problem_set_id UUID REFERENCES problem_sets(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  type VARCHAR NOT NULL, -- 'single_choice', 'multiple_choice', 'true_false', 'short_answer', 'essay'
  options JSONB, -- Array of options for choice questions
  correct_answer JSONB, -- Flexible storage for different answer types
  score INTEGER DEFAULT 1,
  explanation TEXT,
  order_index INTEGER, -- For maintaining question order
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_problems_problem_set_id ON problems(problem_set_id);
CREATE INDEX IF NOT EXISTS idx_problems_order ON problems(problem_set_id, order_index);
CREATE INDEX IF NOT EXISTS idx_problem_sets_category ON problem_sets(category);
CREATE INDEX IF NOT EXISTS idx_problem_sets_key ON problem_sets(key);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
DROP TRIGGER IF EXISTS update_problem_sets_updated_at ON problem_sets;
CREATE TRIGGER update_problem_sets_updated_at 
    BEFORE UPDATE ON problem_sets 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_problems_updated_at ON problems;
CREATE TRIGGER update_problems_updated_at 
    BEFORE UPDATE ON problems 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE problem_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can read problem sets" ON problem_sets;
DROP POLICY IF EXISTS "Public can read problems" ON problems;

-- Public read access policies
CREATE POLICY "Public can read problem sets" 
ON problem_sets FOR SELECT 
USING (true);

CREATE POLICY "Public can read problems" 
ON problems FOR SELECT 
USING (true);

-- Service role can do everything (for admin operations)
-- Note: Service role bypasses RLS automatically

-- Grant necessary permissions
GRANT ALL ON problem_sets TO anon, authenticated, service_role;
GRANT ALL ON problems TO anon, authenticated, service_role;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;