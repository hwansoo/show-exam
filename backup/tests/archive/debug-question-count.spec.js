const { test, expect } = require('@playwright/test');

test('Debug question count in problem sets', async ({ page }) => {
  console.log('🔍 Debugging question count...');
  
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
    // Check what problem sets are available
    const problemSets = await page.evaluate(() => {
      const examButtons = document.querySelectorAll('.exam-option');
      return Array.from(examButtons).map(button => ({
        text: button.textContent.trim(),
        key: button.getAttribute('onclick')
      }));
    });
    
    console.log('📚 Available problem sets:', problemSets);
    
    // Test each problem set
    for (let i = 0; i < problemSets.length; i++) {
      console.log(`\n--- Testing problem set ${i + 1} ---`);
      
      // Click on the problem set
      await page.click(`.exam-option:nth-child(${i + 1})`);
      await page.waitForTimeout(2000);
      
      // Check question count display
      const questionInfo = await page.evaluate(() => {
        const questionElements = document.querySelectorAll('.question-container');
        const totalElement = document.querySelector('.total-questions');
        const currentElement = document.querySelector('.current-question');
        
        return {
          displayedQuestions: questionElements.length,
          totalFromUI: totalElement ? totalElement.textContent : 'not found',
          currentFromUI: currentElement ? currentElement.textContent : 'not found',
          questionTypes: Array.from(questionElements).map(q => {
            const isCompound = q.querySelector('.sub-questions');
            const subQuestions = q.querySelectorAll('.sub-question');
            return {
              isCompound: !!isCompound,
              subQuestionCount: subQuestions.length,
              text: q.querySelector('.question-text')?.textContent?.substring(0, 50) + '...'
            };
          })
        };
      });
      
      console.log('📊 Question analysis:', JSON.stringify(questionInfo, null, 2));
      
      // Go back to exam selection
      const backButton = await page.locator('button:has-text("목록으로")');
      if (await backButton.isVisible()) {
        await backButton.click();
        await page.waitForTimeout(1000);
      }
    }
    
    // Also check the raw data
    const rawData = await page.evaluate(async () => {
      try {
        // Get auth token
        const token = localStorage.getItem('show-exam-auth-token');
        if (!token) return { error: 'No auth token' };
        
        // Fetch problem sets
        const response = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) return { error: `HTTP ${response.status}` };
        
        const data = await response.json();
        
        // Get detailed data for each problem set
        const details = {};
        for (const ps of data.problem_sets) {
          const detailResponse = await fetch(`/api/problem-sets?key=${ps.key}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (detailResponse.ok) {
            const detailData = await detailResponse.json();
            details[ps.key] = {
              title: detailData.title,
              questionCount: detailData.questions.length,
              questions: detailData.questions.map(q => ({
                id: q.id,
                type: q.type,
                subQuestionCount: q.type === 'compound' ? q.sub_questions?.length || 0 : 0,
                question: q.question.substring(0, 50) + '...'
              }))
            };
          }
        }
        
        return { problemSets: data.problem_sets, details };
      } catch (error) {
        return { error: error.message };
      }
    });
    
    console.log('\n📊 Raw API data:', JSON.stringify(rawData, null, 2));
    
  } else {
    console.log('❌ Authentication failed, cannot test');
  }
});