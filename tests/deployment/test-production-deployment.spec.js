const { test, expect } = require('@playwright/test');

test('Comprehensive production deployment test', async ({ page }) => {
  console.log('🚀 Testing production deployment and functionality...');
  
  const testResults = {
    deployment: false,
    authentication: false,
    problemSets: false,
    aiGrading: false,
    adminPanel: false,
    api: false
  };
  
  try {
    // Test 1: Deployment Access
    console.log('\n1️⃣ Testing deployment access...');
    
    await page.goto('https://show-exam.vercel.app/');
    await page.waitForTimeout(3000);
    
    // Check if the page loads
    const title = await page.title();
    console.log('Page title:', title);
    
    const hasMainContent = await page.locator('body').isVisible();
    console.log('Main content loaded:', hasMainContent);
    
    if (hasMainContent) {
      testResults.deployment = true;
      console.log('✅ Deployment: PASS');
    } else {
      console.log('❌ Deployment: FAIL');
    }
    
    // Test 2: Authentication System
    console.log('\n2️⃣ Testing authentication system...');
    
    // Check if global password protection is active
    const passwordInput = page.locator('#globalPasswordInput');
    const passwordVisible = await passwordInput.isVisible();
    console.log('Password protection active:', passwordVisible);
    
    if (passwordVisible) {
      // Test authentication
      await passwordInput.fill('examds2');
      await page.click('button:has-text("🚀 접속하기")');
      await page.waitForTimeout(3000);
      
      const mainService = await page.locator('#mainServiceContainer').isVisible();
      console.log('Authentication successful:', mainService);
      
      if (mainService) {
        testResults.authentication = true;
        console.log('✅ Authentication: PASS');
      } else {
        console.log('❌ Authentication: FAIL');
      }
    } else {
      console.log('❌ Authentication: No password protection found');
    }
    
    // Test 3: Problem Sets Loading
    console.log('\n3️⃣ Testing problem sets loading...');
    
    if (testResults.authentication) {
      await page.waitForTimeout(2000);
      
      const examCards = await page.locator('.exam-card').count();
      console.log('Problem sets found:', examCards);
      
      if (examCards > 0) {
        testResults.problemSets = true;
        console.log('✅ Problem Sets: PASS');
        
        // Test taking an exam
        console.log('\n📝 Testing exam functionality...');
        const firstExam = page.locator('.exam-card').first();
        await firstExam.click();
        await page.waitForTimeout(2000);
        
        const examContainer = await page.locator('#examContainer').isVisible();
        console.log('Exam interface loaded:', examContainer);
        
        if (examContainer) {
          console.log('✅ Exam Interface: PASS');
        }
      } else {
        console.log('❌ Problem Sets: FAIL - No exam cards found');
      }
    }
    
    // Test 4: API Endpoints
    console.log('\n4️⃣ Testing API endpoints...');
    
    if (testResults.authentication) {
      const apiTest = await page.evaluate(async () => {
        try {
          // Test auth API
          const authResponse = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: 'examds2' })
          });
          
          if (!authResponse.ok) {
            return { success: false, error: 'Auth API failed', status: authResponse.status };
          }
          
          const authData = await authResponse.json();
          const token = authData.token;
          
          // Test problem-sets API
          const setsResponse = await fetch('/api/problem-sets', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (!setsResponse.ok) {
            return { success: false, error: 'Problem-sets API failed', status: setsResponse.status };
          }
          
          const setsData = await setsResponse.json();
          
          // Test grading API
          const gradingResponse = await fetch('/api/grade-essay', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              question: {
                id: 'test',
                question: 'Test question',
                type: 'essay',
                score: 10,
                explanation: 'Test explanation'
              },
              userAnswer: 'Test answer',
              maxScore: 10
            })
          });
          
          const gradingWorking = gradingResponse.ok;
          
          return {
            success: true,
            auth: authResponse.ok,
            problemSets: setsResponse.ok,
            problemSetsCount: setsData.problem_sets?.length || 0,
            grading: gradingWorking
          };
          
        } catch (error) {
          return { success: false, error: error.message };
        }
      });
      
      console.log('API Test Results:', apiTest);
      
      if (apiTest.success) {
        testResults.api = true;
        console.log('✅ API Endpoints: PASS');
        
        if (apiTest.grading) {
          testResults.aiGrading = true;
          console.log('✅ AI Grading API: PASS');
        } else {
          console.log('⚠️ AI Grading API: Available but may need OpenAI key');
        }
      } else {
        console.log('❌ API Endpoints: FAIL -', apiTest.error);
      }
    }
    
    // Test 5: Admin Panel
    console.log('\n5️⃣ Testing admin panel...');
    
    if (testResults.authentication) {
      // Look for admin button
      const adminButton = page.locator('button:has-text("🔧 관리자")');
      const adminVisible = await adminButton.isVisible();
      console.log('Admin button visible:', adminVisible);
      
      if (adminVisible) {
        await adminButton.click();
        await page.waitForTimeout(1000);
        
        // Check for admin modal or panel
        const adminModal = await page.locator('.admin-modal, #adminModal, .modal').isVisible();
        console.log('Admin panel opened:', adminModal);
        
        if (adminModal) {
          testResults.adminPanel = true;
          console.log('✅ Admin Panel: PASS');
        } else {
          console.log('❌ Admin Panel: Interface not found');
        }
      } else {
        console.log('❌ Admin Panel: Button not found');
      }
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
  
  // Final Summary
  console.log('\n📊 DEPLOYMENT TEST SUMMARY:');
  console.log('================================');
  
  const passedTests = Object.values(testResults).filter(Boolean).length;
  const totalTests = Object.keys(testResults).length;
  
  Object.entries(testResults).forEach(([test, passed]) => {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    const testName = test.charAt(0).toUpperCase() + test.slice(1);
    console.log(`${testName.padEnd(15)}: ${status}`);
  });
  
  console.log('================================');
  console.log(`Overall Score: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 EXCELLENT: All systems working perfectly!');
  } else if (passedTests >= totalTests * 0.8) {
    console.log('✅ GOOD: Core functionality working, minor issues');
  } else if (passedTests >= totalTests * 0.6) {
    console.log('⚠️ PARTIAL: Basic functionality working, needs attention');
  } else {
    console.log('❌ CRITICAL: Major issues detected, deployment problematic');
  }
  
  // Specific recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  if (!testResults.deployment) {
    console.log('- Check Vercel deployment status and domain configuration');
  }
  if (!testResults.authentication) {
    console.log('- Verify GLOBAL_PASSWORD environment variable in Vercel');
  }
  if (!testResults.problemSets) {
    console.log('- Check data files and index.json structure');
  }
  if (!testResults.api) {
    console.log('- Verify API endpoints and JWT configuration');
  }
  if (!testResults.aiGrading) {
    console.log('- Add OPENAI_API_KEY environment variable for full AI functionality');
  }
  if (!testResults.adminPanel) {
    console.log('- Check admin interface and ADMIN_PASSWORD configuration');
  }
  
  if (passedTests === totalTests) {
    console.log('✨ No issues found - deployment is production ready!');
  }
});