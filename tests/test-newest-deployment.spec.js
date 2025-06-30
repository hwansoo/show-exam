const { test, expect } = require('@playwright/test');

test('Test newest deployment with correct env vars', async ({ page }) => {
  console.log('🚀 Testing newest deployment...');
  
  // Test the newest deployment URL
  const newestUrl = 'https://show-exam-5ufwds5tw-hwansoos-projects.vercel.app';
  
  console.log('Testing URL:', newestUrl);
  
  await page.goto(newestUrl);
  await page.waitForTimeout(3000);
  
  // Check if password input exists
  const passwordInput = page.locator('#globalPasswordInput');
  const isVisible = await passwordInput.isVisible();
  
  console.log('Password input visible:', isVisible);
  
  if (isVisible) {
    console.log('✅ App loaded correctly');
    
    // Test API directly first
    const apiResponse = await page.evaluate(async () => {
      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password: 'examds2' })
        });
        
        const data = await response.json();
        return {
          status: response.status,
          success: response.ok,
          data: data
        };
      } catch (error) {
        return { error: error.message };
      }
    });
    
    console.log('API test with "examds2":', JSON.stringify(apiResponse, null, 2));
    
    if (apiResponse.success) {
      console.log('🎉 SUCCESS: Environment variables updated!');
      
      // Now test the full flow
      await page.fill('#globalPasswordInput', 'examds2');
      await page.click('button:has-text("🚀 접속하기")');
      
      await page.waitForTimeout(3000);
      
      const mainVisible = await page.locator('#mainServiceContainer').isVisible();
      const passwordVisible = await page.locator('#globalPasswordSection').isVisible();
      
      console.log('After full authentication:');
      console.log('Main container visible:', mainVisible);
      console.log('Password section visible:', passwordVisible);
      
      if (mainVisible) {
        console.log('🎯 COMPLETE SUCCESS: Full authentication flow working!');
        
        // Take success screenshot
        await page.screenshot({ path: 'success-auth-flow.png', fullPage: true });
      }
    } else {
      console.log('❌ Environment variables still not updated');
    }
  } else {
    console.log('❌ App not loading correctly');
    
    // Take screenshot to see what's happening
    await page.screenshot({ path: 'newest-deployment-debug.png', fullPage: true });
    
    const title = await page.title();
    const bodyText = await page.locator('body').textContent();
    
    console.log('Page title:', title);
    console.log('Body text (first 200 chars):', bodyText.substring(0, 200));
  }
});