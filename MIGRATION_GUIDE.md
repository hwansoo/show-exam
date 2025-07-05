# Complete Migration Guide: JSON Files → Supabase

## 🚀 Quick Start Migration

### Step 1: Setup Database Tables
1. Go to your Supabase Dashboard: https://app.supabase.com
2. Navigate to: **SQL Editor**
3. Copy and paste the contents of `manual-migration.sql`
4. Click **Run** to create all tables, indexes, and security policies

### Step 2: Insert Your Data
1. In the same SQL Editor
2. Copy and paste the contents of `data-inserts.sql`
3. Click **Run** to migrate all your existing problem sets and problems

### Step 3: Verify Migration
Run this query to check your data:
```sql
-- Check migration results
SELECT 
  ps.title as problem_set,
  ps.category,
  ps.difficulty,
  COUNT(p.id) as problem_count,
  SUM(p.score) as total_score
FROM problem_sets ps
LEFT JOIN problems p ON ps.id = p.problem_set_id
GROUP BY ps.id, ps.title, ps.category, ps.difficulty
ORDER BY ps.created_at;
```

## 📊 What Will Be Migrated

Based on your current JSON files, the following will be migrated:

### Problem Sets (7 total):
1. **기초 수학** (mathematics, beginner) - Built-in
2. **기초 물리학** (physics, beginner) - Built-in  
3. **디지털 영상처리 1-2장 개념 이해 문제** (custom) - 30 problems
4. **DIP - L3 Geometric Operations** (custom) - 25 problems
5. **DIP - L5 Human Visual System and Colors** (custom) - 30 problems
6. **Test Problem Set API** (custom) 
7. **Debug Test** (custom)

### Data Preserved:
- ✅ All problem set metadata (titles, descriptions, categories)
- ✅ All problems with questions, options, correct answers
- ✅ Problem types (single_choice, multiple_choice, etc.)
- ✅ Scores and explanations
- ✅ Creation/update timestamps
- ✅ Built-in vs custom problem set flags

## 🔧 Technical Changes

### Database Schema:
```sql
problem_sets (
  id UUID PRIMARY KEY,
  key VARCHAR UNIQUE,
  title VARCHAR,
  description TEXT,
  category VARCHAR,
  difficulty VARCHAR,
  is_built_in BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

problems (
  id UUID PRIMARY KEY,
  problem_set_id UUID REFERENCES problem_sets(id),
  question TEXT,
  type VARCHAR,
  options JSONB,
  correct_answer JSONB,
  score INTEGER,
  explanation TEXT,
  order_index INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Security:
- ✅ Row Level Security (RLS) enabled
- ✅ Public read access for all users
- ✅ Admin write access via service role
- ✅ Automatic timestamp updates

## 🧪 Testing the Migration

After running the migration, test these features:

### Admin Dashboard:
1. Login to admin panel
2. Verify all problem sets appear
3. Test creating a new problem set
4. Test editing an existing problem set  
5. **Test deleting a problem set** (this should now work!)

### Public Interface:
1. Visit the main exam page
2. Verify all problem sets are listed
3. Start an exam and verify problems load correctly
4. Test different problem types (multiple choice, true/false, etc.)

## 🎯 Benefits After Migration

### Fixed Issues:
- ✅ **Delete functionality now works** (no more server errors)
- ✅ **Concurrent access** - Multiple admins can work simultaneously
- ✅ **Data integrity** - ACID transactions prevent corruption

### Performance Improvements:
- ✅ **Faster loading** - Database queries vs file I/O
- ✅ **Better scaling** - Handles thousands of problem sets
- ✅ **Automatic backups** - Supabase handles data protection

### Developer Experience:
- ✅ **Real-time updates** - Changes appear immediately
- ✅ **Query capabilities** - Search and filter problem sets
- ✅ **API improvements** - Better error handling and validation

## 🔄 Rollback Plan (If Needed)

If something goes wrong, you can always rollback:
1. Your original JSON files are still in the `/data` folder
2. Simply revert the code changes to use file-based storage
3. The application will continue working with JSON files

## 📁 Files Generated

- `manual-migration.sql` - Database schema setup
- `data-inserts.sql` - Your data migration (generated from JSON)
- `migrate-to-supabase.js` - Automated migration script (requires valid API keys)
- `generate-data-sql.js` - SQL generator from JSON files

## ⚠️ Important Notes

1. **Run migrations in order**: First `manual-migration.sql`, then `data-inserts.sql`
2. **Backup first**: Your JSON files serve as backup
3. **Test thoroughly**: Verify all functionality works before going live
4. **Service role key**: Update `.env.local` with your actual Supabase service role key for future automated operations

## 🎉 Success Indicators

After migration, you should see:
- ✅ Problem sets loading in admin dashboard
- ✅ Delete buttons working without errors
- ✅ New problem sets can be created via JSON editor
- ✅ Public exam interface shows all problem sets
- ✅ All existing problems and answers preserved

Ready to migrate? Start with Step 1! 🚀