const { test, expect } = require('@playwright/test');

test('Debug API data vs expected data', async ({ page }) => {
  console.log('🔍 Comparing API data with expected data...');
  
  await page.goto('https://show-exam.vercel.app/');
  await page.waitForTimeout(2000);
  
  // Authenticate
  await page.fill('#globalPasswordInput', 'examds2');
  await page.click('button:has-text("🚀 접속하기")');
  await page.waitForTimeout(3000);
  
  // Get API data
  const apiData = await page.evaluate(async () => {
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
      
      console.log('Got token:', !!token);
      
      // Get problem sets list
      const listResult = await fetch('/api/problem-sets', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!listResult.ok) {
        const errorText = await listResult.text();
        return { error: `List failed: ${listResult.status} - ${errorText}` };
      }
      
      const listData = await listResult.json();
      console.log('Problem sets list:', listData);
      
      // Get detailed data for math_basic
      const mathResult = await fetch('/api/problem-sets?key=math_basic', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!mathResult.ok) {
        const errorText = await mathResult.text();
        return { error: `Math data failed: ${mathResult.status} - ${errorText}` };
      }
      
      const mathData = await mathResult.json();
      
      // Get detailed data for physics_basic
      const physicsResult = await fetch('/api/problem-sets?key=physics_basic', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!physicsResult.ok) {
        const errorText = await physicsResult.text();
        return { error: `Physics data failed: ${physicsResult.status} - ${errorText}` };
      }
      
      const physicsData = await physicsResult.json();
      
      return {
        success: true,
        listData: listData,
        mathData: {
          title: mathData.title,
          questionCount: mathData.questions.length,
          questions: mathData.questions.map(q => ({
            id: q.id,
            type: q.type,
            question: q.question.substring(0, 50) + '...'
          })),
          fullData: mathData // Include full data for comparison
        },
        physicsData: {
          title: physicsData.title,
          questionCount: physicsData.questions.length,
          questions: physicsData.questions.map(q => ({
            id: q.id,
            type: q.type,
            question: q.question.substring(0, 50) + '...',
            subQuestionCount: q.type === 'compound' ? (q.sub_questions?.length || 0) : 0
          })),
          fullData: physicsData // Include full data for comparison
        }
      };
    } catch (error) {
      return { error: error.message };
    }
  });
  
  console.log('\n📊 API Response Analysis:');
  console.log('Success:', apiData.success);
  
  if (apiData.error) {
    console.log('❌ Error:', apiData.error);
  } else {
    console.log('\n📚 Problem Sets List:');
    console.log(JSON.stringify(apiData.listData, null, 2));
    
    console.log('\n🔢 Math Basic Data:');
    console.log('Question count:', apiData.mathData.questionCount);
    console.log('Questions:', JSON.stringify(apiData.mathData.questions, null, 2));
    
    console.log('\n⚛️ Physics Basic Data:');
    console.log('Question count:', apiData.physicsData.questionCount);
    console.log('Questions:', JSON.stringify(apiData.physicsData.questions, null, 2));
    
    // Compare with expected data
    const expectedMathQuestions = 5; // Based on local file
    const expectedPhysicsQuestions = 2; // Based on local file
    
    console.log('\n🔍 Data Comparison:');
    console.log(`Math: Expected ${expectedMathQuestions}, Got ${apiData.mathData.questionCount}`);
    console.log(`Physics: Expected ${expectedPhysicsQuestions}, Got ${apiData.physicsData.questionCount}`);
    
    if (apiData.mathData.questionCount !== expectedMathQuestions) {
      console.log('❌ Math question count mismatch!');
      console.log('Missing questions 4 and 5 (short_answer and essay types)');
    }
    
    if (apiData.physicsData.questionCount !== expectedPhysicsQuestions) {
      console.log('❌ Physics question count mismatch!');
    }
    
    // Log the full math data to see exactly what's missing
    console.log('\n📋 Full Math Data from API:');
    console.log(JSON.stringify(apiData.mathData.fullData, null, 2));
  }
});