const { test, expect } = require('@playwright/test');

test('Simple authentication success test', async ({ page }) => {
  console.log('🎯 Testing authentication success...');
  
  await page.goto('https://show-exam.vercel.app/');
  await page.waitForTimeout(2000);
  
  // Authenticate
  await page.fill('#globalPasswordInput', 'examds2');
  await page.click('button:has-text("🚀 접속하기")');
  await page.waitForTimeout(3000);
  
  // Check success
  const mainVisible = await page.locator('#mainServiceContainer').isVisible();
  const passwordVisible = await page.locator('#globalPasswordSection').isVisible();
  
  console.log('✅ SUCCESS METRICS:');
  console.log('Main container visible:', mainVisible);
  console.log('Password section hidden:', !passwordVisible);
  
  if (mainVisible && !passwordVisible) {
    console.log('🎉 AUTHENTICATION FULLY WORKING!');
    
    // Check localStorage
    const tokenInfo = await page.evaluate(() => {
      const token = localStorage.getItem('show-exam-auth-token');
      return {
        hasToken: !!token,
        tokenLength: token ? token.length : 0,
        tokenPreview: token ? token.substring(0, 20) + '...' : 'none'
      };
    });
    
    console.log('📱 Token storage info:', JSON.stringify(tokenInfo, null, 2));
    
    // Take final success screenshot
    await page.screenshot({ path: 'authentication-success.png', fullPage: true });
    
    expect(mainVisible).toBe(true);
    expect(passwordVisible).toBe(false);
  } else {
    console.log('❌ Authentication failed');
    expect(mainVisible).toBe(true);
  }
});