const { test, expect } = require('@playwright/test');

test('Test latest deployment URL', async ({ page }) => {
  console.log('🚀 Testing latest deployment URL...');
  
  // Test the latest deployment URL
  const latestUrl = 'https://show-exam-o56oa3id2-hwansoos-projects.vercel.app';
  
  await page.goto(latestUrl);
  await page.waitForTimeout(2000);
  
  console.log('Testing URL:', latestUrl);
  
  // Check if password input exists
  const passwordInput = page.locator('#globalPasswordInput');
  const isVisible = await passwordInput.isVisible();
  
  console.log('Password input visible:', isVisible);
  
  if (isVisible) {
    // Try with the password from .env
    await page.fill('#globalPasswordInput', 'examds2');
    await page.click('button:has-text("🚀 접속하기")');
    
    await page.waitForTimeout(3000);
    
    // Check results
    const mainVisible = await page.locator('#mainServiceContainer').isVisible();
    const passwordVisible = await page.locator('#globalPasswordSection').isVisible();
    const errorMessage = await page.locator('#globalPasswordError').textContent();
    
    console.log('After authentication with "examds2":');
    console.log('Main container visible:', mainVisible);
    console.log('Password section visible:', passwordVisible);
    console.log('Error message:', errorMessage);
    
    // Take screenshot
    await page.screenshot({ path: 'latest-deployment-test.png', fullPage: true });
    
    if (!mainVisible) {
      console.log('🔄 Trying with old password "exam2024"...');
      
      // Clear and try with old password
      await page.fill('#globalPasswordInput', 'exam2024');
      await page.click('button:has-text("🚀 접속하기")');
      await page.waitForTimeout(3000);
      
      const mainVisible2 = await page.locator('#mainServiceContainer').isVisible();
      const errorMessage2 = await page.locator('#globalPasswordError').textContent();
      
      console.log('After authentication with "exam2024":');
      console.log('Main container visible:', mainVisible2);
      console.log('Error message:', errorMessage2);
      
      if (mainVisible2) {
        console.log('⚠️  WARNING: Still using old password!');
      } else {
        console.log('❌ Neither password works - checking environment setup');
      }
    } else {
      console.log('✅ SUCCESS: New password "examds2" working!');
    }
  }
});