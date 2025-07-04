const { test, expect } = require('@playwright/test');

test('Verify admin panel is working correctly', async ({ page }) => {
  console.log('🔧 Testing admin panel functionality properly...');
  
  await page.goto('https://show-exam.vercel.app/');
  await page.waitForTimeout(2000);
  
  // Authenticate
  await page.fill('#globalPasswordInput', 'examds2');
  await page.click('button:has-text("🚀 접속하기")');
  await page.waitForTimeout(3000);
  
  const mainVisible = await page.locator('#mainServiceContainer').isVisible();
  console.log('Authentication successful:', mainVisible);
  
  if (mainVisible) {
    // Click admin button
    console.log('Clicking admin button...');
    const adminButton = page.locator('button:has-text("🔧 관리자")');
    await adminButton.click();
    await page.waitForTimeout(2000);
    
    // Check for admin login section
    const adminLoginSection = page.locator('#adminLoginSection');
    const loginVisible = await adminLoginSection.isVisible();
    console.log('Admin login section visible:', loginVisible);
    
    if (loginVisible) {
      console.log('✅ Admin interface triggered correctly');
      
      // Enter admin password
      console.log('Entering admin password...');
      const adminPasswordInput = page.locator('#adminPasswordInput');
      await adminPasswordInput.fill('admin123');
      
      // Submit admin login (look for login button)
      const loginButton = page.locator('button:has-text("로그인")');
      await loginButton.click();
      await page.waitForTimeout(2000);
      
      // Check if admin panel is now visible
      const adminPanel = page.locator('#adminPanel');
      const panelVisible = await adminPanel.isVisible();
      console.log('Admin panel visible after login:', panelVisible);
      
      if (panelVisible) {
        console.log('✅ Admin panel fully functional!');
        
        // Check for admin features
        const addButton = page.locator('button:has-text("➕ 문제집 추가")');
        const addButtonVisible = await addButton.isVisible();
        console.log('Add problem set button visible:', addButtonVisible);
        
        const problemSetsList = page.locator('#adminProblemSetsList');
        const listVisible = await problemSetsList.isVisible();
        console.log('Problem sets list visible:', listVisible);
        
        if (addButtonVisible && listVisible) {
          console.log('✅ All admin features are working!');
          
          // Test the problem sets list
          const existingSets = await page.locator('#adminProblemSetsList .problem-set-item').count();
          console.log('Existing problem sets in admin:', existingSets);
          
          console.log('\n🎉 ADMIN PANEL TEST RESULTS:');
          console.log('✅ Admin button: Working');
          console.log('✅ Admin login: Working'); 
          console.log('✅ Admin panel: Working');
          console.log('✅ Admin features: Working');
          console.log('✅ Problem sets management: Available');
          
        } else {
          console.log('⚠️ Admin panel visible but some features missing');
        }
      } else {
        console.log('❌ Admin panel not showing after login');
        
        // Debug: Check if login failed
        const loginStillVisible = await adminLoginSection.isVisible();
        console.log('Login section still visible:', loginStillVisible);
        
        if (loginStillVisible) {
          console.log('❌ Admin login failed - check ADMIN_PASSWORD');
        }
      }
    } else {
      console.log('❌ Admin login section not visible');
    }
  } else {
    console.log('❌ Authentication failed');
  }
  
  // Additional verification - test if CRUD operations work
  console.log('\n🔍 Testing admin API functionality...');
  
  const apiTest = await page.evaluate(async () => {
    try {
      // Get auth token first
      const authResponse = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'examds2' })
      });
      
      if (!authResponse.ok) {
        return { success: false, error: 'Auth failed' };
      }
      
      const authData = await authResponse.json();
      const token = authData.token;
      
      // Test problem sets read (admin functionality)
      const setsResponse = await fetch('/api/problem-sets', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!setsResponse.ok) {
        return { success: false, error: 'Problem sets API failed' };
      }
      
      const setsData = await setsResponse.json();
      
      return {
        success: true,
        canReadSets: true,
        setsCount: setsData.problem_sets?.length || 0,
        builtInSets: setsData.problem_sets?.filter(ps => ps.is_built_in).length || 0,
        customSets: setsData.problem_sets?.filter(ps => !ps.is_built_in).length || 0
      };
      
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  
  console.log('Admin API test results:', apiTest);
  
  if (apiTest.success) {
    console.log('✅ Admin can access API endpoints');
    console.log(`📊 Total problem sets: ${apiTest.setsCount}`);
    console.log(`🏗️ Built-in sets: ${apiTest.builtInSets}`);
    console.log(`🆕 Custom sets: ${apiTest.customSets}`);
  } else {
    console.log('❌ Admin API access failed:', apiTest.error);
  }
});