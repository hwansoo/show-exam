const { test, expect } = require('@playwright/test');

const PRODUCTION_URL = 'https://show-exam.vercel.app/';

test.describe('Browser Inspection Tests', () => {
  test('inspect the live site and network activity', async ({ page }) => {
    // Enable detailed logging
    page.on('console', msg => {
      console.log(`CONSOLE [${msg.type()}]: ${msg.text()}`);
    });
    
    page.on('pageerror', error => {
      console.log(`PAGE ERROR: ${error.message}`);
    });
    
    page.on('request', request => {
      console.log(`→ REQUEST: ${request.method()} ${request.url()}`);
      if (request.postData()) {
        console.log(`   POST DATA: ${request.postData()}`);
      }
    });
    
    page.on('response', response => {
      console.log(`← RESPONSE: ${response.status()} ${response.url()}`);
    });
    
    console.log('Loading the production site...');
    await page.goto(PRODUCTION_URL);
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    console.log('Page loaded. Taking screenshot...');
    await page.screenshot({ path: 'live-site-initial.png', fullPage: true });
    
    // Check if the page structure is as expected
    const hasPasswordSection = await page.locator('#globalPasswordSection').isVisible();
    const hasMainContainer = await page.locator('#mainServiceContainer').isVisible();
    
    console.log(`Has password section: ${hasPasswordSection}`);
    console.log(`Has main container: ${hasMainContainer}`);
    
    if (hasPasswordSection) {
      console.log('Attempting authentication...');
      await page.fill('#globalPasswordInput', 'exam2024');
      
      console.log('Clicking submit button...');
      await page.click('button:has-text("접속하기")');
      
      // Wait for response
      await page.waitForTimeout(5000);
      
      console.log('Taking screenshot after auth attempt...');
      await page.screenshot({ path: 'live-site-after-auth.png', fullPage: true });
      
      // Check final state
      const errorVisible = await page.locator('#globalPasswordError').isVisible();
      if (errorVisible) {
        const errorText = await page.locator('#globalPasswordError').textContent();
        console.log(`Error shown: "${errorText}"`);
      }
    }
    
    console.log('Checking for any JavaScript errors in the console...');
    // The console messages are already logged above
  });
  
  test('check if site is working without authentication', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Check if there's any content that suggests the site is working
    const pageTitle = await page.title();
    console.log(`Page title: "${pageTitle}"`);
    
    const pageContent = await page.textContent('body');
    console.log(`Page contains "시험 문제": ${pageContent.includes('시험 문제')}`);
    console.log(`Page contains "접속하기": ${pageContent.includes('접속하기')}`);
    
    // Check if there are any obvious error messages
    const hasError = pageContent.includes('error') || pageContent.includes('Error') || pageContent.includes('오류');
    console.log(`Page has error indicators: ${hasError}`);
  });
});