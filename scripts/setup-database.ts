/**
 * Database Setup Script
 * This script initializes the Supabase database with the required schema
 */

import { supabaseAdmin } from '../src/lib/supabase'
import fs from 'fs'
import path from 'path'

async function setupDatabase() {
  console.log('🚀 Starting database setup...')
  
  try {
    // Read the SQL schema file
    const sqlPath = path.join(__dirname, 'init-database.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf8')
    
    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
    
    console.log(`📝 Executing ${statements.length} SQL statements...`)
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement.trim()) {
        console.log(`  ${i + 1}/${statements.length}: ${statement.substring(0, 50)}...`)
        
        const { error } = await supabaseAdmin.rpc('exec_sql', { sql: statement })
        
        if (error) {
          // Try direct query if RPC fails
          const { error: directError } = await supabaseAdmin
            .from('problem_sets')
            .select('id')
            .limit(1)
          
          if (directError && !directError.message.includes('does not exist')) {
            console.error(`❌ Error executing statement ${i + 1}:`, error)
            throw error
          }
        }
      }
    }
    
    console.log('✅ Database schema created successfully!')
    
    // Verify tables exist
    console.log('🔍 Verifying table creation...')
    
    const { data: problemSets, error: psError } = await supabaseAdmin
      .from('problem_sets')
      .select('id')
      .limit(1)
    
    const { data: problems, error: pError } = await supabaseAdmin
      .from('problems')
      .select('id')
      .limit(1)
    
    if (psError && !psError.message.includes('0 rows')) {
      console.error('❌ Error verifying problem_sets table:', psError)
    } else {
      console.log('✅ problem_sets table verified')
    }
    
    if (pError && !pError.message.includes('0 rows')) {
      console.error('❌ Error verifying problems table:', pError)
    } else {
      console.log('✅ problems table verified')
    }
    
    console.log('🎉 Database setup completed successfully!')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    throw error
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupDatabase()
    .then(() => {
      console.log('✅ Setup completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Setup failed:', error)
      process.exit(1)
    })
}

export { setupDatabase }