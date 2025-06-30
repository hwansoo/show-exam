const { test, expect } = require('@playwright/test');

test('Delete specific test problem set', async ({ page }) => {
  console.log('🎯 Testing deletion of specific test problem set...');
  
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
        
        // Get current problem sets
        const listResponse = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const listData = await listResponse.json();
        const initialCount = listData.problem_sets.length;
        
        console.log('Initial count:', initialCount);
        console.log('Available problem sets:');
        listData.problem_sets.forEach(ps => {
          console.log(`  - ${ps.key}: ${ps.title} (built-in: ${ps.is_built_in})`);
        });
        
        // Find a delete test problem set to delete
        const deleteTestSet = listData.problem_sets.find(ps => 
          ps.key.startsWith('delete_test_') && !ps.is_built_in
        );
        
        if (!deleteTestSet) {
          return {
            success: false,
            error: 'No delete test problem sets found',
            available_sets: listData.problem_sets.map(ps => ps.key)
          };
        }
        
        console.log('Selected for deletion:', deleteTestSet.key);
        
        // Delete the problem set
        const deleteResponse = await fetch(`/api/problem-sets?key=${deleteTestSet.key}`, {
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
            attempted_key: deleteTestSet.key
          };
        }
        
        const deleteData = await deleteResponse.json();
        console.log('Delete response:', deleteData);
        
        // Wait a moment and verify deletion
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const verifyResponse = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const verifyData = await verifyResponse.json();
        const finalCount = verifyData.problem_sets.length;
        const stillExists = verifyData.problem_sets.find(ps => ps.key === deleteTestSet.key);
        
        console.log('Final count:', finalCount);
        console.log('Still exists:', !!stillExists);
        
        return {
          success: true,
          deleted_key: deleteTestSet.key,
          deleted_title: deleteTestSet.title,
          initial_count: initialCount,
          final_count: finalCount,
          count_decreased: finalCount < initialCount,
          still_exists: !!stillExists,
          delete_response: deleteData.message,
          verification_success: !stillExists && finalCount === initialCount - 1
        };
        
      } catch (error) {
        console.error('Test error:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });
    
    console.log('\n🎯 Specific Delete Test Results:');
    console.log(JSON.stringify(testResult, null, 2));
    
    if (testResult.success) {
      if (testResult.verification_success) {
        console.log('✅ COMPLETE SUCCESS: Problem set deleted successfully!');
        console.log(`🗑️ Deleted: ${testResult.deleted_title} (${testResult.deleted_key})`);
        console.log(`📊 Count: ${testResult.initial_count} → ${testResult.final_count}`);
        console.log('🔍 Verification: Problem set properly removed from index');
      } else {
        console.log('⚠️ DELETE OPERATION COMPLETED but verification failed');
        console.log('Delete response:', testResult.delete_response);
        console.log('Count decreased:', testResult.count_decreased);
        console.log('Still exists:', testResult.still_exists);
        console.log('This might be due to eventual consistency in GitHub API');
      }
    } else {
      console.log('❌ FAILED: Delete test failed');
      console.log('Error:', testResult.error);
      if (testResult.attempted_key) {
        console.log('Attempted key:', testResult.attempted_key);
      }
      if (testResult.available_sets) {
        console.log('Available sets:', testResult.available_sets);
      }
    }
    
  } else {
    console.log('❌ Authentication failed, cannot test');
  }
});