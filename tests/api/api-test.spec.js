const { test, expect } = require('@playwright/test');

const PRODUCTION_URL = 'https://show-exam.vercel.app/';
const DEFAULT_PASSWORD = 'exam2024';

test.describe('API Direct Tests', () => {
  test('test auth API endpoint directly', async ({ request }) => {
    console.log('Testing auth API directly...');
    
    // Test with correct password
    const response = await request.post(`${PRODUCTION_URL}api/auth`, {
      data: {
        password: DEFAULT_PASSWORD
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Response status: ${response.status()}`);
    const responseBody = await response.json();
    console.log('Response body:', JSON.stringify(responseBody, null, 2));
    
    if (response.ok()) {
      console.log('✅ Auth API working correctly');
      expect(responseBody.success).toBe(true);
      expect(responseBody.token).toBeTruthy();
    } else {
      console.log('❌ Auth API failing');
      console.log('Response text:', await response.text());
    }
  });
  
  test('test auth API with wrong password', async ({ request }) => {
    console.log('Testing auth API with wrong password...');
    
    const response = await request.post(`${PRODUCTION_URL}api/auth`, {
      data: {
        password: 'wrongpassword'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Response status: ${response.status()}`);
    const responseBody = await response.json();
    console.log('Response body:', JSON.stringify(responseBody, null, 2));
    
    expect(response.status()).toBe(401);
    expect(responseBody.success).toBe(false);
  });
  
  test('test what the frontend is actually sending', async ({ page }) => {
    // Intercept the request to see what's being sent
    let interceptedRequest = null;
    
    await page.route('**/api/auth', route => {
      interceptedRequest = {
        url: route.request().url(),
        method: route.request().method(),
        headers: route.request().headers(),
        postData: route.request().postData()
      };
      console.log('Intercepted request:', JSON.stringify(interceptedRequest, null, 2));
      
      // Continue with the request
      route.continue();
    });
    
    await page.goto(PRODUCTION_URL);
    await page.fill('#globalPasswordInput', DEFAULT_PASSWORD);
    await page.click('button:has-text("접속하기")');
    
    // Wait for the request to be made
    await page.waitForTimeout(2000);
    
    if (interceptedRequest) {
      console.log('Frontend sent:', interceptedRequest);
    } else {
      console.log('No request was intercepted');
    }
  });
});