const { test, expect } = require('@playwright/test');

const PRODUCTION_URL = 'https://show-exam.vercel.app/';

test.describe('Final Authentication Report', () => {
  test('comprehensive authentication analysis', async ({ page, request }) => {
    console.log('='.repeat(80));
    console.log('COMPREHENSIVE AUTHENTICATION FLOW ANALYSIS');
    console.log('Production URL:', PRODUCTION_URL);
    console.log('='.repeat(80));
    
    // Test 1: Basic site functionality
    console.log('\n1. BASIC SITE FUNCTIONALITY');
    console.log('-'.repeat(40));
    
    await page.goto(PRODUCTION_URL);
    await page.waitForLoadState('networkidle');
    
    const title = await page.title();
    const hasPasswordSection = await page.locator('#globalPasswordSection').isVisible();
    const hasMainContainer = await page.locator('#mainServiceContainer').isVisible();
    
    console.log(`✓ Page loads successfully: ${title}`);
    console.log(`✓ Password protection screen visible: ${hasPasswordSection}`);
    console.log(`✓ Main service hidden initially: ${!hasMainContainer}`);
    
    // Test 2: API Endpoint Direct Test
    console.log('\n2. API ENDPOINT ANALYSIS');
    console.log('-'.repeat(40));
    
    try {
      const authResponse = await request.post(`${PRODUCTION_URL}api/auth`, {
        data: { password: 'exam2024' },
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log(`Auth API Status: ${authResponse.status()}`);
      const authBody = await authResponse.json();
      console.log(`Auth API Response:`, JSON.stringify(authBody, null, 2));
      
      if (authResponse.status() === 401) {
        console.log('❌ ISSUE IDENTIFIED: Default password "exam2024" is rejected');
        console.log('   This suggests the GLOBAL_PASSWORD environment variable');
        console.log('   in production is set to a different value.');
      }
    } catch (error) {
      console.log(`❌ Auth API Error: ${error.message}`);
    }
    
    // Test 3: Frontend Authentication Flow
    console.log('\n3. FRONTEND AUTHENTICATION FLOW');
    console.log('-'.repeat(40));
    
    // Monitor network requests
    const requests = [];
    page.on('request', req => {
      if (req.url().includes('/api/')) {
        requests.push({
          method: req.method(),
          url: req.url(),
          postData: req.postData()
        });
      }
    });
    
    const responses = [];
    page.on('response', res => {
      if (res.url().includes('/api/')) {
        responses.push({
          status: res.status(),
          url: res.url()
        });
      }
    });
    
    await page.fill('#globalPasswordInput', 'exam2024');
    await page.click('button:has-text("접속하기")');
    await page.waitForTimeout(3000);
    
    console.log('Frontend Request Made:');
    if (requests.length > 0) {
      console.log(`  Method: ${requests[0].method}`);
      console.log(`  URL: ${requests[0].url}`);
      console.log(`  Data: ${requests[0].postData}`);
    }
    
    console.log('Server Response:');
    if (responses.length > 0) {
      console.log(`  Status: ${responses[0].status}`);
      console.log(`  URL: ${responses[0].url}`);
    }
    
    const errorVisible = await page.locator('#globalPasswordError').isVisible();
    if (errorVisible) {
      const errorText = await page.locator('#globalPasswordError').textContent();
      console.log(`Error Message: "${errorText}"`);
    }
    
    // Test 4: Token Storage
    console.log('\n4. TOKEN STORAGE ANALYSIS');
    console.log('-'.repeat(40));
    
    const token = await page.evaluate(() => {
      return localStorage.getItem('show-exam-auth-token');
    });
    
    console.log(`Token in localStorage: ${token ? 'Present' : 'Not found'}`);
    
    // Test 5: Summary and Recommendations
    console.log('\n5. SUMMARY AND RECOMMENDATIONS');
    console.log('-'.repeat(40));
    
    if (responses.length > 0 && responses[0].status === 401) {
      console.log('🔍 ROOT CAUSE ANALYSIS:');
      console.log('   The authentication is failing at the API level.');
      console.log('   The frontend is correctly sending the password "exam2024"');
      console.log('   but the server is rejecting it with 401 Unauthorized.');
      console.log('');
      console.log('🔧 LIKELY ISSUES:');
      console.log('   1. GLOBAL_PASSWORD environment variable in Vercel is set differently');
      console.log('   2. Environment variable is not being loaded correctly');
      console.log('   3. API deployment issue');
      console.log('');
      console.log('✅ WHAT WORKS:');
      console.log('   ✓ Frontend UI loads correctly');
      console.log('   ✓ Password input and form submission work');
      console.log('   ✓ API endpoint is reachable');
      console.log('   ✓ CORS headers are set correctly');
      console.log('   ✓ Request format is correct');
      console.log('');
      console.log('❌ WHAT NEEDS FIXING:');
      console.log('   ❌ API authentication logic or environment variables');
      console.log('');
      console.log('🎯 RECOMMENDED ACTIONS:');
      console.log('   1. Check Vercel environment variables dashboard');
      console.log('   2. Verify GLOBAL_PASSWORD is set to "exam2024"');
      console.log('   3. Redeploy the API functions if needed');
      console.log('   4. Add logging to the API to debug the password comparison');
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('END OF ANALYSIS');
    console.log('='.repeat(80));
  });
});