const { test, expect } = require('@playwright/test');

test('Test problem sets API functionality', async ({ page }) => {
  console.log('🔧 Testing problem sets API...');
  
  await page.goto('https://show-exam.vercel.app/');
  await page.waitForTimeout(2000);
  
  // First authenticate
  await page.fill('#globalPasswordInput', 'examds2');
  await page.click('button:has-text("🚀 접속하기")');
  await page.waitForTimeout(3000);
  
  // Check if authentication was successful
  const mainVisible = await page.locator('#mainServiceContainer').isVisible();
  console.log('Authentication successful:', mainVisible);
  
  if (mainVisible) {
    // Test API calls from within the authenticated context
    const apiTest = await page.evaluate(async () => {
      try {
        // Test getting problem sets list
        const listResponse = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('show-exam-auth-token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Problem sets list response status:', listResponse.status);
        
        if (!listResponse.ok) {
          const errorText = await listResponse.text();
          return {
            success: false,
            error: `HTTP ${listResponse.status}: ${errorText}`,
            step: 'list_problem_sets'
          };
        }
        
        const listData = await listResponse.json();
        console.log('Problem sets list:', listData);
        
        // Test creating a new problem set
        const testProblemSet = {
          title: "Test Problem Set",
          description: "A test problem set for API testing",
          questions: [
            {
              id: 1,
              type: "single_choice",
              question: "What is 2 + 2?",
              options: ["3", "4", "5", "6"],
              correct_answer: 1,
              score: 10
            }
          ]
        };
        
        const createResponse = await fetch('/api/problem-sets', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('show-exam-auth-token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            key: 'test_api_' + Date.now(),
            data: testProblemSet
          })
        });
        
        console.log('Create response status:', createResponse.status);
        
        if (!createResponse.ok) {
          const errorText = await createResponse.text();
          return {
            success: false,
            error: `HTTP ${createResponse.status}: ${errorText}`,
            step: 'create_problem_set',
            listData: listData
          };
        }
        
        const createData = await createResponse.json();
        console.log('Create response:', createData);
        
        return {
          success: true,
          listData: listData,
          createData: createData
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
    
    console.log('📊 API Test Results:', JSON.stringify(apiTest, null, 2));
    
    if (apiTest.success) {
      console.log('✅ API functionality working!');
    } else {
      console.log('❌ API functionality failed:', apiTest.error);
      console.log('Failed at step:', apiTest.step);
    }
  } else {
    console.log('❌ Authentication failed, cannot test API');
  }
});