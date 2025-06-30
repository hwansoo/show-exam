const { test, expect } = require('@playwright/test');

const PRODUCTION_URL = 'https://show-exam.vercel.app/';
const DEFAULT_PASSWORD = 'exam2024';

test.describe('Authentication Debug Tests', () => {
  test('debug authentication flow step by step', async ({ page }) => {
    // Enable console logging
    page.on('console', msg => {
      console.log(`CONSOLE ${msg.type()}: ${msg.text()}`);
    });
    
    // Monitor network requests
    page.on('request', request => {
      if (request.url().includes('/api/')) {
        console.log(`REQUEST: ${request.method()} ${request.url()}`);
      }
    });
    
    page.on('response', response => {
      if (response.url().includes('/api/')) {
        console.log(`RESPONSE: ${response.status()} ${response.url()}`);
      }
    });
    
    console.log('1. Navigating to production URL...');
    await page.goto(PRODUCTION_URL);
    
    console.log('2. Checking initial state...');
    const passwordSectionVisible = await page.locator('#globalPasswordSection').isVisible();
    const mainServiceVisible = await page.locator('#mainServiceContainer').isVisible();
    console.log(`Password section visible: ${passwordSectionVisible}`);
    console.log(`Main service visible: ${mainServiceVisible}`);
    
    console.log('3. Filling password...');
    await page.fill('#globalPasswordInput', DEFAULT_PASSWORD);
    
    console.log('4. Clicking login button...');
    await page.click('button:has-text("접속하기")');
    
    // Wait a bit and check for changes
    await page.waitForTimeout(3000);
    
    console.log('5. Checking state after authentication attempt...');
    const passwordSectionAfter = await page.locator('#globalPasswordSection').isVisible();
    const mainServiceAfter = await page.locator('#mainServiceContainer').isVisible();
    const errorVisible = await page.locator('#globalPasswordError').isVisible();
    
    console.log(`Password section visible after: ${passwordSectionAfter}`);
    console.log(`Main service visible after: ${mainServiceAfter}`);
    console.log(`Error visible: ${errorVisible}`);
    
    if (errorVisible) {
      const errorText = await page.locator('#globalPasswordError').textContent();
      console.log(`Error text: "${errorText}"`);
    }
    
    // Check localStorage
    const token = await page.evaluate(() => {
      return localStorage.getItem('show-exam-auth-token');
    });
    console.log(`Token in localStorage: ${token ? 'exists' : 'not found'}`);
    
    // Check if the problem might be with class detection
    const passwordSectionClasses = await page.locator('#globalPasswordSection').getAttribute('class');
    const mainServiceClasses = await page.locator('#mainServiceContainer').getAttribute('class');
    console.log(`Password section classes: "${passwordSectionClasses}"`);
    console.log(`Main service classes: "${mainServiceClasses}"`);
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });
    console.log('Screenshot saved as debug-screenshot.png');
  });
  
  test('test with wrong password to see error handling', async ({ page }) => {
    page.on('console', msg => {
      console.log(`CONSOLE ${msg.type()}: ${msg.text()}`);
    });
    
    await page.goto(PRODUCTION_URL);
    
    console.log('Testing with wrong password...');
    await page.fill('#globalPasswordInput', 'wrongpassword');
    await page.click('button:has-text("접속하기")');
    
    await page.waitForTimeout(2000);
    
    const errorVisible = await page.locator('#globalPasswordError').isVisible();
    if (errorVisible) {
      const errorText = await page.locator('#globalPasswordError').textContent();
      console.log(`Error message: "${errorText}"`);
    }
  });
});