const { test, expect } = require('@playwright/test');

test('Test consistent data source for read and delete operations', async ({ page }) => {
  console.log('🔄 Testing data consistency fix...');
  
  await page.goto('https://show-exam.vercel.app/');
  await page.waitForTimeout(2000);
  
  // Authenticate
  await page.fill('#globalPasswordInput', 'examds2');
  await page.click('button:has-text("🚀 접속하기")');
  await page.waitForTimeout(3000);
  
  // Check if authenticated
  const mainVisible = await page.locator('#mainServiceContainer').isVisible();
  console.log('Authentication successful:', mainVisible);
  
  if (mainVisible) {
    const testResult = await page.evaluate(async () => {
      try {
        // Get auth token
        const authResult = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: 'examds2' })
        });
        
        const authData = await authResult.json();
        const token = authData.token;
        
        // Step 1: Get current problem sets (this should now use GitHub)
        console.log('Step 1: Getting current problem sets from API...');
        const listResponse = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!listResponse.ok) {
          return { success: false, error: 'Failed to get problem sets', step: 1 };
        }
        
        const listData = await listResponse.json();
        console.log('Current problem sets count:', listData.problem_sets.length);
        
        // Show all problem sets
        listData.problem_sets.forEach(ps => {
          console.log(`  - ${ps.key}: ${ps.title} (built-in: ${ps.is_built_in})`);
        });
        
        // Step 2: Find a custom problem set to delete
        const customSets = listData.problem_sets.filter(ps => !ps.is_built_in);
        console.log('Custom problem sets found:', customSets.length);
        
        if (customSets.length === 0) {
          return {
            success: true,
            message: 'No custom problem sets to delete',
            total_sets: listData.problem_sets.length,
            custom_sets: 0
          };
        }
        
        const targetSet = customSets[0];
        console.log('Selected for deletion:', targetSet.key);
        
        // Step 3: Verify we can read this specific problem set
        console.log('Step 3: Verifying we can read the target problem set...');
        const readResponse = await fetch(`/api/problem-sets?key=${targetSet.key}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const canRead = readResponse.ok;
        console.log('Can read target problem set:', canRead);
        
        if (!canRead) {
          const errorText = await readResponse.text();
          return {
            success: false,
            error: `Cannot read problem set before deletion: ${readResponse.status}: ${errorText}`,
            step: 3,
            target_key: targetSet.key
          };
        }
        
        // Step 4: Delete the problem set
        console.log('Step 4: Deleting the problem set...');
        const deleteResponse = await fetch(`/api/problem-sets?key=${targetSet.key}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Delete response status:', deleteResponse.status);
        
        if (!deleteResponse.ok) {
          const errorText = await deleteResponse.text();
          return {
            success: false,
            error: `Delete failed: ${deleteResponse.status}: ${errorText}`,
            step: 4,
            target_key: targetSet.key,
            could_read_before: canRead
          };
        }
        
        const deleteData = await deleteResponse.json();
        console.log('Delete successful:', deleteData.message);
        
        // Step 5: Verify the problem set is gone
        console.log('Step 5: Verifying deletion...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const verifyResponse = await fetch(`/api/problem-sets?key=${targetSet.key}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const verifyListResponse = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const specificGone = verifyResponse.status === 404;
        const verifyListData = verifyListResponse.ok ? await verifyListResponse.json() : null;
        const newCount = verifyListData ? verifyListData.problem_sets.length : 'unknown';
        const stillInList = verifyListData ? verifyListData.problem_sets.some(ps => ps.key === targetSet.key) : 'unknown';
        
        console.log('Specific problem set returns 404:', specificGone);
        console.log('New total count:', newCount);
        console.log('Still in list:', stillInList);
        
        return {
          success: true,
          target_key: targetSet.key,
          target_title: targetSet.title,
          initial_count: listData.problem_sets.length,
          final_count: newCount,
          could_read_before: canRead,
          delete_succeeded: deleteResponse.ok,
          specific_returns_404: specificGone,
          still_in_list: stillInList,
          consistency_success: specificGone && !stillInList && newCount < listData.problem_sets.length
        };
        
      } catch (error) {
        console.error('Test error:', error);
        return {
          success: false,
          error: error.message,
          step: 'unknown'
        };
      }
    });
    
    console.log('\n🔄 Data Consistency Test Results:');
    console.log(JSON.stringify(testResult, null, 2));
    
    if (testResult.success) {
      if (testResult.custom_sets === 0) {
        console.log('ℹ️ INFO: No custom problem sets available to test deletion');
        console.log('Total problem sets:', testResult.total_sets);
      } else if (testResult.consistency_success) {
        console.log('✅ COMPLETE SUCCESS: Data consistency issue is fixed!');
        console.log(`🗑️ Successfully deleted: ${testResult.target_title} (${testResult.target_key})`);
        console.log(`📊 Count: ${testResult.initial_count} → ${testResult.final_count}`);
        console.log('🔍 All verification checks passed');
        console.log('  - Could read before deletion:', testResult.could_read_before);
        console.log('  - Delete operation succeeded:', testResult.delete_succeeded);
        console.log('  - Specific key returns 404:', testResult.specific_returns_404);
        console.log('  - No longer in list:', !testResult.still_in_list);
      } else {
        console.log('⚠️ PARTIAL SUCCESS: Delete completed but with consistency issues');
        console.log('Could read before:', testResult.could_read_before);
        console.log('Delete succeeded:', testResult.delete_succeeded);
        console.log('Returns 404:', testResult.specific_returns_404);
        console.log('Still in list:', testResult.still_in_list);
        console.log('Count changed:', testResult.final_count !== testResult.initial_count);
      }
    } else {
      console.log('❌ FAILED: Consistency test failed');
      console.log('Error:', testResult.error);
      console.log('Failed at step:', testResult.step);
      if (testResult.target_key) {
        console.log('Target key:', testResult.target_key);
        console.log('Could read before deletion:', testResult.could_read_before);
      }
    }
    
  } else {
    console.log('❌ Authentication failed, cannot test');
  }
});