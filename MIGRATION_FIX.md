# 🔧 Migration Fix - JSON Escaping Issue

## Problem
The original `data-inserts.sql` had JSON escaping issues causing this error:
```
ERROR: 22P02: invalid input syntax for type json
LINE 98: '"[\\"2\\",\\"4\\",\\"8\\",\\"16\\"]"',
```

## Solution  
Created `clean-data-inserts.sql` with proper PostgreSQL syntax:

### ✅ Fixed JSON Handling
- **Before**: `'"[\\"2\\",\\"4\\",\\"8\\",\\"16\\"]"'` (double-escaped)
- **After**: `$JSON$["2","4","8","16"]$JSON$::jsonb` (clean JSONB)

### ✅ Fixed String Escaping  
- **Before**: `'Math with ''quotes'' and \\ backslashes'` (complex escaping)
- **After**: `$STR$Math with 'quotes' and \ backslashes$STR$` (dollar-quoted strings)

## Instructions

### Step 1: Delete Previous Data (if any)
```sql
-- Run this in Supabase SQL Editor to clean up
DELETE FROM problems;
DELETE FROM problem_sets;
```

### Step 2: Use the Fixed Migration
Instead of `data-inserts.sql`, use `clean-data-inserts.sql`:

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `clean-data-inserts.sql`
3. Click **Run**

### Step 3: Verify Success
```sql
-- Check migration results
SELECT 
  ps.title as problem_set,
  COUNT(p.id) as problem_count,
  SUM(p.score) as total_score
FROM problem_sets ps
LEFT JOIN problems p ON ps.id = p.problem_set_id
GROUP BY ps.id, ps.title
ORDER BY ps.created_at;
```

## Expected Results
- ✅ 7 problem sets migrated
- ✅ All problems with proper JSON data
- ✅ No JSON parsing errors
- ✅ Delete functionality working

## Files to Use
- ✅ `manual-migration.sql` (database setup - unchanged)
- ✅ `clean-data-inserts.sql` (data migration - fixed)
- ❌ ~~`data-inserts.sql`~~ (has JSON escaping issues)

The migration should now complete successfully! 🎉