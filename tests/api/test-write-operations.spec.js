const { test, expect } = require('@playwright/test');

test('Test problem set creation functionality', async ({ page }) => {
  console.log('🔧 Testing problem set creation...');
  
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
    // Test creating a problem set via API
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
        
        // Create test problem set
        const testProblemSet = {
          title: "Test Problem Set API",
          description: "A test problem set created via API",
          questions: [
            {
              id: 1,
              type: "single_choice",
              question: "What is 2 + 2?",
              options: ["3", "4", "5", "6"],
              correct_answer: 1,
              score: 10,
              explanation: "2 + 2 = 4"
            },
            {
              id: 2,
              type: "true_false",
              question: "The Earth is round.",
              correct_answer: true,
              score: 10,
              explanation: "The Earth is approximately spherical."
            }
          ]
        };
        
        console.log('Attempting to create problem set...');
        
        const createResponse = await fetch('/api/problem-sets', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            key: 'test_api_' + Date.now(),
            data: testProblemSet
          })
        });
        
        console.log('Create response status:', createResponse.status);
        console.log('Create response ok:', createResponse.ok);
        
        if (!createResponse.ok) {
          const errorText = await createResponse.text();
          console.log('Error response:', errorText);
          return {
            success: false,
            error: `HTTP ${createResponse.status}: ${errorText}`,
            step: 'create_problem_set'
          };
        }
        
        const createData = await createResponse.json();
        console.log('Create response data:', createData);
        
        return {
          success: true,
          message: createData.message,
          key: createData.key,
          title: createData.title
        };
        
      } catch (error) {
        console.error('API test error:', error);
        return {
          success: false,
          error: error.message,
          step: 'unknown'
        };
      }
    });
    
    console.log('\n📊 Problem Set Creation Test Results:');
    console.log(JSON.stringify(testResult, null, 2));
    
    if (testResult.success) {
      console.log('✅ SUCCESS: Problem set creation is working!');
      console.log('Created problem set:', testResult.title);
      console.log('Key:', testResult.key);
    } else {
      console.log('❌ FAILED: Problem set creation failed');
      console.log('Error:', testResult.error);
      console.log('Failed at step:', testResult.step);
      
      // Check if it's a GitHub API configuration issue
      if (testResult.error.includes('GitHub integration not configured')) {
        console.log('💡 This appears to be a GitHub API configuration issue');
      } else if (testResult.error.includes('403') || testResult.error.includes('401')) {
        console.log('💡 This appears to be a GitHub API permissions issue');
      }
    }
    
    // Also test if we can still read problem sets
    const readTest = await page.evaluate(async () => {
      try {
        const authResult = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: 'examds2' })
        });
        
        const authData = await authResult.json();
        const token = authData.token;
        
        const listResponse = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!listResponse.ok) {
          const errorText = await listResponse.text();
          return { success: false, error: errorText };
        }
        
        const listData = await listResponse.json();
        return {
          success: true,
          count: listData.problem_sets?.length || 0,
          sets: listData.problem_sets?.map(ps => ps.title) || []
        };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });
    
    console.log('\n📚 Read Operations Test:');
    if (readTest.success) {
      console.log('✅ Read operations still working');
      console.log('Problem sets count:', readTest.count);
      console.log('Available sets:', readTest.sets);
    } else {
      console.log('❌ Read operations failed:', readTest.error);
    }
    
  } else {
    console.log('❌ Authentication failed, cannot test');
  }
});