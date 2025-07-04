const { test, expect } = require('@playwright/test');

test('Debug deployment status', async ({ page }) => {
  console.log('🔍 Debugging deployment...');
  
  const urls = [
    'https://show-exam.vercel.app/',
    'https://show-exam-o56oa3id2-hwansoos-projects.vercel.app'
  ];
  
  for (const url of urls) {
    console.log(`\n--- Testing ${url} ---`);
    
    try {
      await page.goto(url);
      await page.waitForTimeout(3000);
      
      // Check what's visible
      const title = await page.title();
      const passwordSection = await page.locator('#globalPasswordSection').isVisible();
      const mainSection = await page.locator('#mainServiceContainer').isVisible();
      const bodyContent = await page.locator('body').textContent();
      
      console.log('Title:', title);
      console.log('Password section visible:', passwordSection);
      console.log('Main section visible:', mainSection);
      console.log('Body contains "시험 문제":', bodyContent.includes('시험 문제'));
      console.log('Body contains "접속하기":', bodyContent.includes('접속하기'));
      
      // Take screenshot
      const filename = url.includes('vercel.app/') ? 'main-domain.png' : 'deployment-domain.png';
      await page.screenshot({ path: filename, fullPage: true });
      
      // Test API directly
      const apiResponse = await page.evaluate(async (testUrl) => {
        try {
          const response = await fetch(testUrl.replace('https://', 'https://') + 'api/auth', {
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
      }, url);
      
      console.log('API test result:', JSON.stringify(apiResponse, null, 2));
      
    } catch (error) {
      console.log('Error testing', url, ':', error.message);
    }
  }
});