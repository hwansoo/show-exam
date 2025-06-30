const { test, expect } = require('@playwright/test');

test('Quick authentication test on main domain', async ({ page }) => {
  console.log('🚀 Testing authentication on main domain...');
  
  // Try the main domain
  await page.goto('https://show-exam.vercel.app/');
  
  await page.waitForTimeout(2000);
  
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
    
    console.log('After authentication:');
    console.log('Main container visible:', mainVisible);
    console.log('Password section visible:', passwordVisible);
    console.log('Error message:', errorMessage);
    
    // Take screenshot
    await page.screenshot({ path: 'quick-test-result.png', fullPage: true });
    
    if (mainVisible) {
      console.log('✅ SUCCESS: Authentication working!');
    } else {
      console.log('❌ FAILED: Authentication not working');
      console.log('Will try to debug API response...');
      
      // Check network requests
      page.on('response', response => {
        if (response.url().includes('/api/auth')) {
          console.log('Auth API response status:', response.status());
        }
      });
    }
  } else {
    console.log('❌ Password input not found');
  }
});