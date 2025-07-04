const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

test('Create and delete problem set sequentially', async ({ page }) => {
  console.log('🔄 Creating and deleting problem set sequentially...');
  
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
        
        // Step 1: Get initial count
        const initialResponse = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const initialData = await initialResponse.json();
        const initialCount = initialData.problem_sets.length;
        console.log('Initial problem sets count:', initialCount);
        
        // Step 2: Create a new problem set
        const testProblemSet = {
          title: "Delete Test Problem Set",
          description: "A problem set created specifically for deletion testing",
          questions: [
            {
              id: 1,
              type: "single_choice",
              question: "This is a test question for deletion?",
              options: ["Yes", "No"],
              correct_answer: 0,
              score: 10,
              explanation: "This is for testing deletion"
            }
          ]
        };
        
        const createKey = 'delete_test_' + Date.now();
        console.log('Creating problem set with key:', createKey);
        
        const createResponse = await fetch('/api/problem-sets', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            key: createKey,
            data: testProblemSet
          })
        });
        
        if (!createResponse.ok) {
          const errorText = await createResponse.text();
          return {
            success: false,
            error: `Create failed: ${createResponse.status}: ${errorText}`,
            step: 'create'
          };
        }
        
        const createData = await createResponse.json();
        console.log('Problem set created:', createData.message);
        
        // Step 3: Verify it was created
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        
        const verifyCreateResponse = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const verifyCreateData = await verifyCreateResponse.json();
        const afterCreateCount = verifyCreateData.problem_sets.length;
        const createdSet = verifyCreateData.problem_sets.find(ps => ps.key === createKey);
        
        console.log('After create count:', afterCreateCount);
        console.log('Created set found:', !!createdSet);
        
        if (!createdSet) {
          return {
            success: false,
            error: 'Problem set was not found after creation',
            step: 'verify_create',
            expected_key: createKey
          };
        }
        
        // Step 4: Delete the problem set
        console.log('Deleting problem set:', createKey);
        
        const deleteResponse = await fetch(`/api/problem-sets?key=${createKey}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!deleteResponse.ok) {
          const errorText = await deleteResponse.text();
          return {
            success: false,
            error: `Delete failed: ${deleteResponse.status}: ${errorText}`,
            step: 'delete',
            created_key: createKey
          };
        }
        
        const deleteData = await deleteResponse.json();
        console.log('Delete response:', deleteData.message);
        
        // Step 5: Verify it was deleted
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        
        const verifyDeleteResponse = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const verifyDeleteData = await verifyDeleteResponse.json();
        const afterDeleteCount = verifyDeleteData.problem_sets.length;
        const deletedSetStillExists = verifyDeleteData.problem_sets.find(ps => ps.key === createKey);
        
        console.log('After delete count:', afterDeleteCount);
        console.log('Deleted set still exists:', !!deletedSetStillExists);
        
        return {
          success: true,
          initial_count: initialCount,
          after_create_count: afterCreateCount,
          after_delete_count: afterDeleteCount,
          created_key: createKey,
          deleted_set_still_exists: !!deletedSetStillExists,
          create_successful: afterCreateCount > initialCount,
          delete_successful: !deletedSetStillExists && afterDeleteCount === initialCount,
          overall_success: !deletedSetStillExists && afterDeleteCount === initialCount
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
    
    console.log('\n🔄 Sequential Create/Delete Test Results:');
    console.log(JSON.stringify(testResult, null, 2));
    
    if (testResult.success) {
      if (testResult.overall_success) {
        console.log('✅ COMPLETE SUCCESS: Create and delete cycle worked perfectly!');
        console.log(`📊 Counts: ${testResult.initial_count} → ${testResult.after_create_count} → ${testResult.after_delete_count}`);
        console.log('🗑️ Problem set was properly deleted and removed from index');
      } else {
        console.log('⚠️ PARTIAL SUCCESS: Operations completed but with issues');
        console.log(`📊 Counts: ${testResult.initial_count} → ${testResult.after_create_count} → ${testResult.after_delete_count}`);
        console.log('Create successful:', testResult.create_successful);
        console.log('Delete successful:', testResult.delete_successful);
        console.log('Still exists after delete:', testResult.deleted_set_still_exists);
      }
    } else {
      console.log('❌ FAILED: Sequential test failed');
      console.log('Error:', testResult.error);
      console.log('Failed at step:', testResult.step);
    }
    
  } else {
    console.log('❌ Authentication failed, cannot test');
  }
});