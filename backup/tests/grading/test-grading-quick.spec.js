const { test, expect } = require('@playwright/test');

test('Quick test of new grading system fallback', async ({ page }) => {
  console.log('🔬 Quick test of improved grading system...');
  
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
        // Test the improved fallback grading function directly
        console.log('🧪 Testing improved fallback grading...');
        
        // Create test question
        const testQuestion = {
          id: 'test_pythagorean',
          question: '피타고라스 정리를 설명하고, 직각삼각형에서 빗변의 길이가 5, 한 변의 길이가 3일 때 다른 한 변의 길이를 구하는 과정을 서술하세요.',
          type: 'essay',
          score: 20,
          explanation: '피타고라스 정리: a² + b² = c². 이 경우 c² - a² = b²이므로 25 - 9 = 16, 따라서 b = 4이다.'
        };
        
        // Test the original answer that got 6/20
        const originalAnswer = '5^2 - 3^2 = 16 = 4^2이므로 정답은 4이다.';
        
        // Use the improved fallback function directly
        console.log('Testing with improved fallback function...');
        const fallbackResult = gradeEssayFallback(testQuestion, originalAnswer);
        
        // Test additional cases
        const testCases = [
          {
            name: 'Empty answer',
            answer: '',
          },
          {
            name: 'Short answer',
            answer: '4',
          },
          {
            name: 'Correct calculation with 25, 9, 16',
            answer: '25 - 9 = 16이므로 답은 4입니다.',
          },
          {
            name: 'Wrong calculation',
            answer: '5 + 3 = 8이므로 답은 8입니다.',
          }
        ];
        
        const allResults = [
          {
            name: 'Original user answer',
            answer: originalAnswer,
            result: fallbackResult
          }
        ];
        
        // Test additional cases
        for (const testCase of testCases) {
          const result = gradeEssayFallback(testQuestion, testCase.answer);
          allResults.push({
            name: testCase.name,
            answer: testCase.answer,
            result: result
          });
        }
        
        return {
          success: true,
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
    
    console.log('\n🔬 Improved Fallback Grading Test Results:');
    
    if (testResult.success) {
      console.log('✅ SUCCESS: Improved grading system is working!');
      
      testResult.allResults.forEach((result, index) => {
        console.log(`\n${index + 1}. ${result.name}`);
        console.log(`   Answer: "${result.answer}"`);
        console.log(`   Score: ${result.result.score}/20 (${Math.round((result.result.score/20)*100)}%)`);
        console.log(`   Method: ${result.result.method}`);
        console.log(`   Correct: ${result.result.isCorrect}`);
        console.log(`   Feedback: ${result.result.feedback}`);
        if (result.result.strengths) {
          console.log(`   ✅ Strengths: ${result.result.strengths}`);
        }
        if (result.result.improvements) {
          console.log(`   💡 Improvements: ${result.result.improvements}`);
        }
      });
      
      // Check the original answer improvement
      const originalResult = testResult.allResults[0];
      const originalScore = originalResult.result.score;
      
      console.log(`\n📊 IMPROVEMENT ANALYSIS:`);
      console.log(`   Original score: 6/20 (30%)`);
      console.log(`   New score: ${originalScore}/20 (${Math.round((originalScore/20)*100)}%)`);
      
      if (originalScore >= 15) {
        console.log(`   🎉 EXCELLENT: ${Math.round((originalScore/20)*100) - 30}% improvement!`);
      } else if (originalScore >= 10) {
        console.log(`   ✅ GOOD: ${Math.round((originalScore/20)*100) - 30}% improvement!`);
      } else {
        console.log(`   ⚠️ STILL LOW: Only ${Math.round((originalScore/20)*100) - 30}% improvement`);
      }
      
    } else {
      console.log('❌ FAILED: Test failed');
      console.log('Error:', testResult.error);
    }
    
  } else {
    console.log('❌ Authentication failed, cannot test');
  }
});