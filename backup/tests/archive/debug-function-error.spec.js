const { test, expect } = require('@playwright/test');

test('Debug function invocation error', async ({ page }) => {
  console.log('🔍 Debugging function invocation error...');
  
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
    // Test a simple API call first
    const debugResult = await page.evaluate(async () => {
      try {
        // Get auth token
        const authResult = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: 'examds2' })
        });
        
        if (!authResult.ok) {
          return { step: 'auth', error: `Auth failed: ${authResult.status}` };
        }
        
        const authData = await authResult.json();
        const token = authData.token;
        
        console.log('Auth successful, testing problem-sets GET...');
        
        // Test GET request to problem-sets
        const getResponse = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('GET response status:', getResponse.status);
        console.log('GET response ok:', getResponse.ok);
        
        if (!getResponse.ok) {
          const errorText = await getResponse.text();
          console.log('GET error response:', errorText);
          return {
            step: 'get_problem_sets',
            error: `HTTP ${getResponse.status}: ${errorText}`
          };
        }
        
        const getData = await getResponse.json();
        console.log('GET data received, problem sets count:', getData.problem_sets?.length);
        
        return {
          step: 'get_success',
          problemSetsCount: getData.problem_sets?.length || 0,
          message: 'GET request successful'
        };
        
      } catch (error) {
        console.error('Debug test error:', error);
        return {
          step: 'exception',
          error: error.message
        };
      }
    });
    
    console.log('\n🔍 Debug Results:');
    console.log(JSON.stringify(debugResult, null, 2));
    
    // If GET works, try POST with minimal data
    if (debugResult.step === 'get_success') {
      console.log('\n📝 Testing POST with minimal data...');
      
      const postResult = await page.evaluate(async () => {
        try {
          // Get auth token again
          const authResult = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: 'examds2' })
          });
          
          const authData = await authResult.json();
          const token = authData.token;
          
          // Very simple test problem set
          const testProblemSet = {
            title: "Debug Test",
            description: "Debug test description",
            questions: [
              {
                id: 1,
                type: "single_choice",
                question: "Test question?",
                options: ["A", "B"],
                correct_answer: 0,
                score: 10,
                explanation: "Test explanation"
              }
            ]
          };
          
          console.log('Sending POST request...');
          
          const postResponse = await fetch('/api/problem-sets', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              key: 'debug_test_' + Date.now(),
              data: testProblemSet
            })
          });
          
          console.log('POST response status:', postResponse.status);
          console.log('POST response ok:', postResponse.ok);
          
          const responseText = await postResponse.text();
          console.log('POST response body:', responseText);
          
          return {
            status: postResponse.status,
            ok: postResponse.ok,
            response: responseText
          };
          
        } catch (error) {
          console.error('POST test error:', error);
          return {
            error: error.message
          };
        }
      });
      
      console.log('\n📝 POST Results:');
      console.log(JSON.stringify(postResult, null, 2));
    }
  } else {
    console.log('❌ Authentication failed, cannot test');
  }
});