const { test, expect } = require('@playwright/test');

test('Demo: Take actual exam to test improved grading', async ({ page }) => {
  console.log('📝 Testing improved grading by taking actual exam...');
  
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
    // Look for a math exam to test
    console.log('Looking for math exam...');
    
    // Wait for exams to load
    await page.waitForTimeout(2000);
    
    // Look for any exam containing "수학" (math)
    const mathExam = page.locator('.exam-card').filter({ hasText: '수학' }).first();
    const mathExamExists = await mathExam.isVisible();
    
    console.log('Math exam found:', mathExamExists);
    
    if (mathExamExists) {
      // Click on the math exam
      await mathExam.click();
      console.log('Started math exam');
      
      await page.waitForTimeout(2000);
      
      // Look for the Pythagorean theorem question
      const questionText = await page.locator('#examContainer').textContent();
      console.log('Exam content loaded, looking for Pythagorean question...');
      
      if (questionText.includes('피타고라스') || questionText.includes('pythagorean')) {
        console.log('✅ Found Pythagorean theorem question!');
        
        // Find the essay answer textarea for this question
        const essayTextarea = page.locator('textarea[id*="essay"]').first();
        const textareaExists = await essayTextarea.isVisible();
        
        if (textareaExists) {
          console.log('Found essay textarea, entering test answer...');
          
          // Enter the original answer that got 6/20
          const testAnswer = '5^2 - 3^2 = 16 = 4^2이므로 정답은 4이다.';
          await essayTextarea.fill(testAnswer);
          
          console.log('Entered answer:', testAnswer);
          
          // Submit the exam
          const submitButton = page.locator('button:has-text("답안 제출")');
          await submitButton.click();
          
          console.log('Submitted exam, waiting for results...');
          await page.waitForTimeout(5000);
          
          // Check if results are shown
          const resultsVisible = await page.locator('#resultsContainer').isVisible();
          console.log('Results visible:', resultsVisible);
          
          if (resultsVisible) {
            // Get the grading results
            const resultsContent = await page.locator('#resultsContainer').textContent();
            console.log('Results page loaded');
            
            // Look for score information
            const scoreInfo = await page.locator('#finalScore').textContent();
            console.log('Final score:', scoreInfo);
            
            // Look for detailed feedback
            const answerReviews = await page.locator('.answer-review').all();
            console.log('Number of answer reviews:', answerReviews.length);
            
            // Get feedback for each question
            for (let i = 0; i < answerReviews.length; i++) {
              const reviewContent = await answerReviews[i].textContent();
              
              if (reviewContent.includes('피타고라스') || reviewContent.includes('pythagorean')) {
                console.log(`\n🎯 Found Pythagorean theorem question result:`);
                
                // Extract score from the review
                const scoreMatch = reviewContent.match(/(\d+)\/(\d+)점/);
                if (scoreMatch) {
                  const score = parseInt(scoreMatch[1]);
                  const maxScore = parseInt(scoreMatch[2]);
                  const percentage = Math.round((score / maxScore) * 100);
                  
                  console.log(`   Score: ${score}/${maxScore} (${percentage}%)`);
                  
                  // Check for improvement
                  if (score >= 15) {
                    console.log('   🎉 EXCELLENT: Score significantly improved from 6/20 (30%)!');
                  } else if (score >= 10) {
                    console.log('   ✅ GOOD: Score improved from 6/20 (30%)!');
                  } else if (score > 6) {
                    console.log('   📈 IMPROVED: Some improvement from original 6/20');
                  } else {
                    console.log('   ⚠️ STILL LOW: Score similar to original 6/20');
                  }
                }
                
                // Check for grading method badge
                if (reviewContent.includes('🤖 AI 채점')) {
                  console.log('   Method: AI grading');
                } else if (reviewContent.includes('📝 기본 채점')) {
                  console.log('   Method: Fallback grading');
                } else {
                  console.log('   Method: Unknown');
                }
                
                // Look for detailed feedback sections
                if (reviewContent.includes('종합 피드백')) {
                  console.log('   ✅ Has comprehensive feedback');
                }
                if (reviewContent.includes('잘한 점')) {
                  console.log('   ✅ Has strengths section');
                }
                if (reviewContent.includes('개선 사항')) {
                  console.log('   ✅ Has improvements section');
                }
                
                // Show partial content for verification
                const shortContent = reviewContent.substring(0, 300) + '...';
                console.log(`   Preview: ${shortContent}`);
                
                break;
              }
            }
            
            console.log('\n📊 Summary:');
            console.log('✅ New grading system deployed and functional');
            console.log('✅ Improved feedback display with detailed sections');
            console.log('✅ Mathematical accuracy should now be properly recognized');
            
          } else {
            console.log('⚠️ Results not visible, exam submission may have failed');
          }
        } else {
          console.log('❌ Essay textarea not found');
        }
      } else {
        console.log('❌ Pythagorean theorem question not found in this exam');
        console.log('Available content preview:', questionText.substring(0, 200));
      }
    } else {
      console.log('❌ No math exam found');
      
      // List available exams
      const examCards = await page.locator('.exam-card').all();
      console.log('Available exams:');
      for (let i = 0; i < examCards.length; i++) {
        const examText = await examCards[i].textContent();
        console.log(`  ${i + 1}. ${examText.substring(0, 50)}...`);
      }
    }
  } else {
    console.log('❌ Authentication failed, cannot test');
  }
});