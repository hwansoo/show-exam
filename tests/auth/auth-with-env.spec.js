const { test, expect } = require('@playwright/test');

// Get environment variables
const GLOBAL_PASSWORD = process.env.GLOBAL_PASSWORD || 'examds2';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

console.log('🔧 Environment variables loaded:');
console.log('GLOBAL_PASSWORD:', GLOBAL_PASSWORD);
console.log('ADMIN_PASSWORD:', ADMIN_PASSWORD);

test.describe('Authentication with Local Environment Variables', () => {
  const PRODUCTION_URL = 'https://show-exam.vercel.app/';

  test('should authenticate with correct global password from .env', async ({ page }) => {
    console.log('🚀 Testing authentication with password:', GLOBAL_PASSWORD);
    
    await page.goto(PRODUCTION_URL);
    
    // Wait for the global password input to appear
    await expect(page.locator('#globalPasswordInput')).toBeVisible({ timeout: 10000 });
    
    // Enter the password from environment variable
    await page.fill('#globalPasswordInput', GLOBAL_PASSWORD);
    
    // Click the login button
    await page.click('button:has-text("🚀 접속하기")');
    
    // Wait for authentication to complete
    await page.waitForTimeout(3000);
    
    // Check if we successfully authenticated
    const mainContainer = page.locator('#mainServiceContainer');
    const passwordSection = page.locator('#globalPasswordSection');
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'auth-test-result.png', fullPage: true });
    
    // Check if main container is visible (success) or error message appears
    const isMainVisible = await mainContainer.isVisible();
    const isPasswordVisible = await passwordSection.isVisible();
    
    console.log('📊 Authentication result:');
    console.log('Main container visible:', isMainVisible);
    console.log('Password section visible:', isPasswordVisible);
    
    if (isMainVisible && !isPasswordVisible) {
      console.log('✅ Authentication successful!');
      expect(isMainVisible).toBe(true);
      expect(isPasswordVisible).toBe(false);
    } else {
      console.log('❌ Authentication failed');
      
      // Check for error messages
      const errorMessage = await page.locator('#globalPasswordError').textContent();
      console.log('Error message:', errorMessage);
      
      // Check console logs for more details
      const logs = [];
      page.on('console', msg => logs.push(msg.text()));
      
      console.log('Console logs:', logs);
      
      // Still assert what we expect, but with context
      expect(isMainVisible, `Authentication failed with password "${GLOBAL_PASSWORD}". Error: ${errorMessage}`).toBe(true);
    }
  });

  test('should test token persistence after page refresh', async ({ page }) => {
    console.log('🔄 Testing token persistence...');
    
    await page.goto(PRODUCTION_URL);
    
    // First authenticate
    await expect(page.locator('#globalPasswordInput')).toBeVisible({ timeout: 10000 });
    await page.fill('#globalPasswordInput', GLOBAL_PASSWORD);
    await page.click('button:has-text("🚀 접속하기")');
    await page.waitForTimeout(3000);
    
    // Check if authentication succeeded
    const isAuthenticated = await page.locator('#mainServiceContainer').isVisible();
    
    if (isAuthenticated) {
      console.log('✅ Initial authentication successful');
      
      // Refresh the page
      await page.reload();
      await page.waitForTimeout(2000);
      
      // Check if we're still authenticated (token persistence)
      const stillAuthenticated = await page.locator('#mainServiceContainer').isVisible();
      const needsReauth = await page.locator('#globalPasswordSection').isVisible();
      
      console.log('After refresh - Main container visible:', stillAuthenticated);
      console.log('After refresh - Password section visible:', needsReauth);
      
      expect(stillAuthenticated).toBe(true);
      expect(needsReauth).toBe(false);
    } else {
      test.skip('Skipping token persistence test - initial auth failed');
    }
  });

  test('should test API endpoints with token', async ({ page }) => {
    console.log('🔗 Testing API endpoints...');
    
    await page.goto(PRODUCTION_URL);
    
    // Authenticate first
    await expect(page.locator('#globalPasswordInput')).toBeVisible({ timeout: 10000 });
    await page.fill('#globalPasswordInput', GLOBAL_PASSWORD);
    await page.click('button:has-text("🚀 접속하기")');
    await page.waitForTimeout(3000);
    
    const isAuthenticated = await page.locator('#mainServiceContainer').isVisible();
    
    if (isAuthenticated) {
      console.log('✅ Authentication successful, testing API...');
      
      // Test direct API call
      const response = await page.evaluate(async () => {
        try {
          const authToken = localStorage.getItem('show-exam-auth-token');
          console.log('Token from localStorage:', authToken ? 'exists' : 'missing');
          
          const apiResponse = await fetch('/api/problem-sets', {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          });
          
          const data = await apiResponse.json();
          return {
            status: apiResponse.status,
            success: apiResponse.ok,
            data: data,
            hasToken: !!authToken
          };
        } catch (error) {
          return {
            error: error.message,
            hasToken: !!localStorage.getItem('show-exam-auth-token')
          };
        }
      });
      
      console.log('📡 API test result:', JSON.stringify(response, null, 2));
      
      expect(response.hasToken).toBe(true);
      expect(response.success).toBe(true);
      expect(response.status).toBe(200);
    } else {
      test.skip('Skipping API test - authentication failed');
    }
  });

  test('should reject wrong password', async ({ page }) => {
    console.log('🚫 Testing wrong password rejection...');
    
    await page.goto(PRODUCTION_URL);
    
    await expect(page.locator('#globalPasswordInput')).toBeVisible({ timeout: 10000 });
    
    // Try with wrong password
    await page.fill('#globalPasswordInput', 'wrongpassword123');
    await page.click('button:has-text("🚀 접속하기")');
    await page.waitForTimeout(2000);
    
    // Should still be on password screen
    const isPasswordVisible = await page.locator('#globalPasswordSection').isVisible();
    const isMainVisible = await page.locator('#mainServiceContainer').isVisible();
    const errorMessage = await page.locator('#globalPasswordError').textContent();
    
    console.log('Password section still visible:', isPasswordVisible);
    console.log('Main container visible:', isMainVisible);
    console.log('Error message:', errorMessage);
    
    expect(isPasswordVisible).toBe(true);
    expect(isMainVisible).toBe(false);
    expect(errorMessage).toContain('올바르지 않습니다');
  });
});