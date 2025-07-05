/**
 * Complete Migration Script
 * This script sets up the database schema and migrates data
 */

import { setupDatabase } from './setup-database'
import { migrateData, clearExistingData } from './migrate-data'

async function runFullMigration() {
  console.log('🚀 Starting complete migration process...')
  console.log('================================')
  
  try {
    // Step 1: Setup database schema
    console.log('\n📋 Step 1: Setting up database schema...')
    await setupDatabase()
    
    // Step 2: Clear existing data (if any)
    console.log('\n🧹 Step 2: Clearing any existing data...')
    await clearExistingData()
    
    // Step 3: Migrate data from JSON files
    console.log('\n📦 Step 3: Migrating data from JSON files...')
    await migrateData()
    
    console.log('\n🎉 Complete migration finished successfully!')
    console.log('================================')
    console.log('✅ Your application is now ready to use Supabase!')
    
  } catch (error) {
    console.error('\n❌ Migration process failed:', error)
    console.log('================================')
    console.log('Please check the error above and try again.')
    throw error
  }
}

// Run the full migration if this script is executed directly
if (require.main === module) {
  runFullMigration()
    .then(() => {
      console.log('✅ Full migration completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Full migration failed:', error)
      process.exit(1)
    })
}

export { runFullMigration }