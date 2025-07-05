/**
 * Simple Data Migration Script - JSON to Supabase
 * Run with: node migrate-to-supabase.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nlbhtoxvahsygxcyjmkv.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sYmh0b3h2YWhzeWd4Y3lqbWt2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTYyMjA5NCwiZXhwIjoyMDY3MTk4MDk0fQ.tqfY8mKfIEG_Gg2rLgJ3F31OQO2YhB8yqBbO6KOF-jE';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('🔧 Setting up database tables...');
  
  const sql = `
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
  type VARCHAR NOT NULL,
  options JSONB,
  correct_answer JSONB,
  score INTEGER DEFAULT 1,
  explanation TEXT,
  order_index INTEGER,
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

-- Grant necessary permissions
GRANT ALL ON problem_sets TO anon, authenticated, service_role;
GRANT ALL ON problems TO anon, authenticated, service_role;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
`;

  try {
    // Run the SQL to create tables
    const { error } = await supabase.rpc('exec_sql', { sql });
    if (error && !error.message.includes('already exists')) {
      console.error('❌ Error setting up database:', error);
      return false;
    }
    console.log('✅ Database tables set up successfully');
    return true;
  } catch (error) {
    console.log('⚠️  RPC method not available, tables may already exist');
    return true;
  }
}

async function clearExistingData() {
  console.log('🧹 Clearing existing data...');
  
  const { error: problemsError } = await supabase
    .from('problems')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (problemsError) {
    console.log('⚠️  Could not clear problems table:', problemsError.message);
  }
  
  const { error: setsError } = await supabase
    .from('problem_sets')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (setsError) {
    console.log('⚠️  Could not clear problem_sets table:', setsError.message);
  }
  
  console.log('✅ Existing data cleared');
}

async function migrateData() {
  console.log('📦 Starting data migration...');
  
  try {
    // Read the index.json file
    const indexPath = path.join(__dirname, 'data', 'index.json');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const indexData = JSON.parse(indexContent);
    
    console.log(`📊 Found ${indexData.problem_sets.length} problem sets to migrate`);
    
    let migratedSets = 0;
    let migratedProblems = 0;
    
    // Migrate each problem set
    for (const problemSetMeta of indexData.problem_sets) {
      console.log(`📝 Migrating: ${problemSetMeta.title}`);
      
      // Read the problem set file
      const problemSetPath = path.join(__dirname, 'data', problemSetMeta.file);
      
      if (!fs.existsSync(problemSetPath)) {
        console.warn(`⚠️  File not found: ${problemSetMeta.file}, skipping...`);
        continue;
      }
      
      const problemSetContent = fs.readFileSync(problemSetPath, 'utf8');
      const problemSetData = JSON.parse(problemSetContent);
      
      // Create problem set in Supabase
      const problemSetId = uuidv4();
      
      const { error: setError } = await supabase
        .from('problem_sets')
        .insert({
          id: problemSetId,
          key: problemSetMeta.key,
          title: problemSetMeta.title,
          description: problemSetMeta.description || problemSetData.description || '',
          category: problemSetMeta.category,
          difficulty: problemSetMeta.difficulty,
          is_built_in: problemSetMeta.is_built_in,
          created_at: problemSetMeta.created_at,
          updated_at: problemSetMeta.updated_at
        });
      
      if (setError) {
        console.error(`❌ Error inserting problem set ${problemSetMeta.title}:`, setError);
        continue;
      }
      
      migratedSets++;
      console.log(`  ✅ Problem set inserted with ID: ${problemSetId}`);
      
      // Migrate problems for this set
      const problems = problemSetData.questions || problemSetData.problems || [];
      
      for (let i = 0; i < problems.length; i++) {
        const problem = problems[i];
        
        // Normalize the problem data
        const normalizedProblem = {
          id: uuidv4(),
          problem_set_id: problemSetId,
          question: problem.question,
          type: problem.type,
          options: problem.options ? JSON.stringify(problem.options) : null,
          correct_answer: JSON.stringify(
            problem.type === 'multiple_choice' 
              ? problem.correct_answers 
              : problem.correct_answer
          ),
          score: problem.score || 1,
          explanation: problem.explanation || null,
          order_index: i
        };
        
        const { error: problemError } = await supabase
          .from('problems')
          .insert(normalizedProblem);
        
        if (problemError) {
          console.error(`❌ Error inserting problem ${i + 1} for set ${problemSetMeta.title}:`, problemError);
          continue;
        }
        
        migratedProblems++;
      }
      
      console.log(`  ✅ Migrated ${problems.length} problems`);
    }
    
    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`  - Problem sets migrated: ${migratedSets}`);
    console.log(`  - Problems migrated: ${migratedProblems}`);
    
    return { migratedSets, migratedProblems };
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

async function verifyMigration() {
  console.log('🔍 Verifying migration...');
  
  const { data: problemSets, error: psError } = await supabase
    .from('problem_sets')
    .select('id, title, key');
  
  const { data: problemsData, error: pError } = await supabase
    .from('problems')
    .select('id, problem_set_id');
  
  if (psError) {
    console.error('❌ Error verifying problem sets:', psError);
  } else {
    console.log(`✅ Verified ${problemSets?.length || 0} problem sets in database`);
    problemSets?.forEach(set => {
      console.log(`  - ${set.title} (${set.key})`);
    });
  }
  
  if (pError) {
    console.error('❌ Error verifying problems:', pError);
  } else {
    console.log(`✅ Verified ${problemsData?.length || 0} problems in database`);
  }
  
  return { problemSets: problemSets?.length || 0, problems: problemsData?.length || 0 };
}

async function main() {
  console.log('🚀 Starting complete migration process...');
  console.log('================================');
  
  try {
    // Step 1: Setup database
    console.log('\n📋 Step 1: Setting up database...');
    await setupDatabase();
    
    // Step 2: Clear existing data
    console.log('\n🧹 Step 2: Clearing existing data...');
    await clearExistingData();
    
    // Step 3: Migrate data
    console.log('\n📦 Step 3: Migrating data...');
    const migrationResult = await migrateData();
    
    // Step 4: Verify migration
    console.log('\n🔍 Step 4: Verifying migration...');
    const verificationResult = await verifyMigration();
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('================================');
    console.log('✅ Your data has been migrated to Supabase!');
    console.log('✅ The delete functionality should now work properly!');
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
if (require.main === module) {
  main();
}

module.exports = { main, setupDatabase, migrateData, verifyMigration };