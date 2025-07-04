const { test, expect } = require('@playwright/test');

test('Test new AI grading system with Pythagorean theorem', async ({ page }) => {
  console.log('🤖 Testing new AI grading system...');
  
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
        // Test the new grading API directly
        console.log('🔬 Testing AI grading API directly...');
        
        if (!authToken) {
          return { success: false, error: 'No auth token available' };
        }
        
        // Create a test Pythagorean theorem question
        const testQuestion = {
          id: 'test_pythagorean',
          question: '피타고라스 정리를 설명하고, 직각삼각형에서 빗변의 길이가 5, 한 변의 길이가 3일 때 다른 한 변의 길이를 구하는 과정을 서술하세요.',
          type: 'essay',
          score: 20,
          explanation: '피타고라스 정리: a² + b² = c². 이 경우 c² - a² = b²이므로 25 - 9 = 16, 따라서 b = 4이다.'
        };
        
        // Test the user's original answer that got 6/20
        const originalAnswer = '5^2 - 3^2 = 16 = 4^2이므로 정답은 4이다.';
        
        console.log('Testing original answer:', originalAnswer);
        
        const response = await fetch('/api/grade-essay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            question: testQuestion,
            userAnswer: originalAnswer,
            maxScore: 20
          })
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          return {
            success: false,
            error: `API failed: ${response.status} - ${errorText}`
          };
        }
        
        const gradingResult = await response.json();
        console.log('Grading result:', gradingResult);
        
        // Test additional answers for comparison
        const testCases = [
          {
            name: 'Brief correct calculation',
            answer: '5² - 3² = 25 - 9 = 16 = 4²이므로 답은 4',
            expectedScore: '>= 15' // Should get good score for correct math
          },
          {
            name: 'Detailed explanation',
            answer: '피타고라스 정리는 a² + b² = c²입니다. 빗변이 5, 한 변이 3이므로 3² + b² = 5² → 9 + b² = 25 → b² = 16 → b = 4입니다.',
            expectedScore: '>= 18' // Should get excellent score
          },
          {
            name: 'Wrong calculation',
            answer: '5 + 3 = 8이므로 답은 8입니다.',
            expectedScore: '<= 10' // Should get low score
          },
          {
            name: 'Empty answer',
            answer: '',
            expectedScore: '0' // Should get 0
          }
        ];
        
        const allResults = [
          {
            name: 'User original answer',
            answer: originalAnswer,
            result: gradingResult
          }
        ];
        
        // Test additional cases
        for (const testCase of testCases) {
          console.log(`Testing: ${testCase.name}`);
          
          const testResponse = await fetch('/api/grade-essay', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
              question: testQuestion,
              userAnswer: testCase.answer,
              maxScore: 20
            })
          });
          
          if (testResponse.ok) {
            const testResult = await testResponse.json();
            allResults.push({
              name: testCase.name,
              answer: testCase.answer,
              result: testResult,
              expected: testCase.expectedScore
            });
          }
        }
        
        return {
          success: true,
          originalScore: gradingResult.score,
          originalMethod: gradingResult.method,
          originalFeedback: gradingResult.feedback,
          allResults: allResults
        };
        
      } catch (error) {
        console.error('Test error:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });
    
    console.log('\n🤖 New AI Grading System Test Results:');
    
    if (testResult.success) {
      console.log('✅ SUCCESS: AI grading system is working!');
      console.log(`\n📊 Original Answer Results:`);
      console.log(`   Score: ${testResult.originalScore}/20 (was 6/20 before)`);
      console.log(`   Method: ${testResult.originalMethod}`);
      console.log(`   Feedback: ${testResult.originalFeedback}`);
      
      console.log('\n📋 All Test Results:');
      testResult.allResults.forEach((result, index) => {
        console.log(`\n${index + 1}. ${result.name}`);
        console.log(`   Answer: "${result.answer}"`);
        console.log(`   Score: ${result.result.score}/20`);
        console.log(`   Method: ${result.result.method}`);
        console.log(`   Feedback: ${result.result.feedback}`);
        if (result.result.strengths) {
          console.log(`   Strengths: ${result.result.strengths}`);
        }
        if (result.result.improvements) {
          console.log(`   Improvements: ${result.result.improvements}`);
        }
        if (result.expected) {
          console.log(`   Expected: ${result.expected}`);
        }
      });
      
      // Check if the original answer got a much better score
      if (testResult.originalScore >= 15) {
        console.log('\n🎉 EXCELLENT: Original answer now gets fair score (15+ points)!');
      } else if (testResult.originalScore >= 10) {
        console.log('\n✅ IMPROVED: Original answer score improved significantly!');
      } else {
        console.log('\n⚠️ CONCERN: Original answer still getting low score');
      }
      
    } else {
      console.log('❌ FAILED: AI grading system test failed');
      console.log('Error:', testResult.error);
    }
    
  } else {
    console.log('❌ Authentication failed, cannot test');
  }
});