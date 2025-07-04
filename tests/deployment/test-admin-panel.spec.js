const { test, expect } = require('@playwright/test');

test('Test admin panel functionality', async ({ page }) => {
  console.log('🔧 Testing admin panel functionality...');
  
  await page.goto('https://show-exam.vercel.app/');
  await page.waitForTimeout(2000);
  
  // Authenticate
  await page.fill('#globalPasswordInput', 'examds2');
  await page.click('button:has-text("🚀 접속하기")');
  await page.waitForTimeout(3000);
  
  const mainVisible = await page.locator('#mainServiceContainer').isVisible();
  console.log('Authentication successful:', mainVisible);
  
  if (mainVisible) {
    // Look for admin button
    console.log('Looking for admin button...');
    const adminButton = page.locator('button:has-text("🔧 관리자")');
    const adminVisible = await adminButton.isVisible();
    console.log('Admin button visible:', adminVisible);
    
    if (adminVisible) {
      // Click admin button
      await adminButton.click();
      await page.waitForTimeout(2000);
      
      // Check all possible admin interface selectors
      const possibleSelectors = [
        '.admin-modal',
        '#adminModal', 
        '.modal',
        '[class*="admin"]',
        '[id*="admin"]',
        '.admin-panel',
        '.admin-container'
      ];
      
      console.log('Checking for admin interface...');
      let adminFound = false;
      
      for (const selector of possibleSelectors) {
        const element = page.locator(selector);
        const visible = await element.isVisible();
        console.log(`${selector}: ${visible}`);
        if (visible) {
          adminFound = true;
          break;
        }
      }
      
      if (!adminFound) {
        // Check if there's a password prompt
        const passwordPrompt = await page.locator('input[type="password"]').isVisible();
        console.log('Password prompt visible:', passwordPrompt);
        
        if (passwordPrompt) {
          console.log('Found admin password prompt');
          await page.fill('input[type="password"]', 'admin123');
          await page.keyboard.press('Enter');
          await page.waitForTimeout(2000);
          
          // Check again for admin interface
          for (const selector of possibleSelectors) {
            const element = page.locator(selector);
            const visible = await element.isVisible();
            if (visible) {
              console.log(`✅ Admin interface found: ${selector}`);
              adminFound = true;
              break;
            }
          }
        }
      }
      
      // Check page content for any admin-related elements
      const pageContent = await page.content();
      const hasAdminContent = pageContent.includes('관리') || pageContent.includes('admin') || pageContent.includes('문제집 관리');
      console.log('Has admin-related content:', hasAdminContent);
      
      // Take a screenshot for debugging
      await page.screenshot({ path: 'admin-debug.png' });
      console.log('Screenshot saved: admin-debug.png');
      
      if (adminFound) {
        console.log('✅ Admin panel working correctly');
      } else {
        console.log('❌ Admin panel not found - checking implementation...');
        
        // Check if admin functionality exists in JavaScript
        const jsCheck = await page.evaluate(() => {
          return {
            hasShowAdminPanel: typeof showAdminPanel === 'function',
            hasAdminFunctions: typeof deleteProblemSet === 'function',
            adminElements: document.querySelectorAll('[id*="admin"], [class*="admin"]').length
          };
        });
        
        console.log('JavaScript check:', jsCheck);
      }
    } else {
      console.log('❌ Admin button not found');
      
      // Debug: Check what buttons are available
      const allButtons = await page.locator('button').count();
      console.log('Total buttons found:', allButtons);
      
      for (let i = 0; i < Math.min(allButtons, 10); i++) {
        const buttonText = await page.locator('button').nth(i).textContent();
        console.log(`Button ${i + 1}: "${buttonText}"`);
      }
    }
  } else {
    console.log('❌ Authentication failed');
  }
});