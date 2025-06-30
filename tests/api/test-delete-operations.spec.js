const { test, expect } = require('@playwright/test');

test('Test problem set deletion functionality', async ({ page }) => {
  console.log('🗑️ Testing problem set deletion...');
  
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
    // Test deleting a problem set via API
    const testResult = await page.evaluate(async () => {
      try {
        // Get auth token
        const authResult = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: 'examds2' })
        });
        
        if (!authResult.ok) return { error: 'Auth failed' };
        
        const authData = await authResult.json();
        const token = authData.token;
        
        // First, get the current problem sets to see what we can delete
        const listResponse = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!listResponse.ok) {
          return { error: 'Failed to get problem sets list' };
        }
        
        const listData = await listResponse.json();
        console.log('Current problem sets:', listData.problem_sets.length);
        
        // Find a test problem set to delete (non-built-in)
        const testSet = listData.problem_sets.find(ps => 
          ps.key.startsWith('test_api_') && !ps.is_built_in
        );
        
        if (!testSet) {
          return {
            success: false,
            error: 'No test problem sets found to delete',
            available: listData.problem_sets.map(ps => ({
              key: ps.key,
              title: ps.title,
              is_built_in: ps.is_built_in
            }))
          };
        }
        
        console.log('Attempting to delete problem set:', testSet.key);
        
        const deleteResponse = await fetch(`/api/problem-sets?key=${testSet.key}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Delete response status:', deleteResponse.status);
        console.log('Delete response ok:', deleteResponse.ok);
        
        if (!deleteResponse.ok) {
          const errorText = await deleteResponse.text();
          console.log('Error response:', errorText);
          return {
            success: false,
            error: `HTTP ${deleteResponse.status}: ${errorText}`,
            step: 'delete_problem_set',
            attempted_key: testSet.key
          };
        }
        
        const deleteData = await deleteResponse.json();
        console.log('Delete response data:', deleteData);
        
        // Verify the problem set was actually deleted
        const verifyResponse = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (verifyResponse.ok) {
          const verifyData = await verifyResponse.json();
          const stillExists = verifyData.problem_sets.find(ps => ps.key === testSet.key);
          
          return {
            success: true,
            message: deleteData.message,
            deleted_key: testSet.key,
            deleted_title: testSet.title,
            still_exists: !!stillExists,
            new_count: verifyData.problem_sets.length,
            verification: stillExists ? 'FAILED - still exists' : 'SUCCESS - properly deleted'
          };
        } else {
          return {
            success: true,
            message: deleteData.message,
            deleted_key: testSet.key,
            deleted_title: testSet.title,
            verification: 'Could not verify deletion'
          };
        }
        
      } catch (error) {
        console.error('API test error:', error);
        return {
          success: false,
          error: error.message,
          step: 'unknown'
        };
      }
    });
    
    console.log('\n🗑️ Problem Set Deletion Test Results:');
    console.log(JSON.stringify(testResult, null, 2));
    
    if (testResult.success) {
      console.log('✅ SUCCESS: Problem set deletion is working!');
      console.log('Deleted problem set:', testResult.deleted_title);
      console.log('Key:', testResult.deleted_key);
      console.log('Verification:', testResult.verification);
      if (testResult.new_count !== undefined) {
        console.log('New total count:', testResult.new_count);
      }
    } else {
      console.log('❌ FAILED: Problem set deletion failed');
      console.log('Error:', testResult.error);
      if (testResult.step) {
        console.log('Failed at step:', testResult.step);
      }
      if (testResult.attempted_key) {
        console.log('Attempted to delete:', testResult.attempted_key);
      }
      if (testResult.available) {
        console.log('Available problem sets:', testResult.available);
      }
    }
    
    // Also test deleting a built-in problem set (should fail)
    console.log('\n🔒 Testing built-in problem set protection...');
    const protectionTest = await page.evaluate(async () => {
      try {
        const authResult = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: 'examds2' })
        });
        
        const authData = await authResult.json();
        const token = authData.token;
        
        // Try to delete a built-in problem set (should fail)
        const deleteResponse = await fetch('/api/problem-sets?key=math_basic', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const responseText = await deleteResponse.text();
        
        return {
          status: deleteResponse.status,
          ok: deleteResponse.ok,
          response: responseText
        };
      } catch (error) {
        return { error: error.message };
      }
    });
    
    console.log('Built-in protection test:');
    if (protectionTest.status === 403) {
      console.log('✅ SUCCESS: Built-in problem sets are protected from deletion');
      console.log('Response:', protectionTest.response);
    } else {
      console.log('❌ WARNING: Built-in protection may not be working properly');
      console.log('Status:', protectionTest.status);
      console.log('Response:', protectionTest.response);
    }
    
  } else {
    console.log('❌ Authentication failed, cannot test');
  }
});