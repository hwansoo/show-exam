const { test, expect } = require('@playwright/test');

test('Debug UI state and problem set loading', async ({ page }) => {
  console.log('🔍 Debugging UI state...');
  
  await page.goto('https://show-exam.vercel.app/');
  await page.waitForTimeout(2000);
  
  // Authenticate
  await page.fill('#globalPasswordInput', 'examds2');
  await page.click('button:has-text("🚀 접속하기")');
  await page.waitForTimeout(3000);
  
  // Take screenshot
  await page.screenshot({ path: 'ui-after-auth.png', fullPage: true });
  
  // Check detailed UI state
  const uiState = await page.evaluate(() => {
    // Check if main container is visible
    const mainContainer = document.getElementById('mainServiceContainer');
    const passwordSection = document.getElementById('globalPasswordSection');
    
    // Check for exam selection UI
    const examSection = document.querySelector('.exam-selection');
    const examOptions = document.querySelectorAll('.exam-option');
    
    // Check for any error messages
    const errorElements = document.querySelectorAll('[class*="error"], .error-message');
    
    // Check API loading state
    const loadingElements = document.querySelectorAll('[class*="loading"], .loading');
    
    // Check console log for any errors
    const examListText = document.querySelector('h2')?.textContent;
    
    return {
      mainContainerVisible: mainContainer ? mainContainer.style.display !== 'none' : false,
      passwordSectionVisible: passwordSection ? passwordSection.style.display !== 'none' : false,
      examSectionExists: !!examSection,
      examOptionsCount: examOptions.length,
      examOptionsText: Array.from(examOptions).map(opt => opt.textContent.trim()),
      errorCount: errorElements.length,
      loadingCount: loadingElements.length,
      examListHeader: examListText,
      bodyText: document.body.textContent.substring(0, 500)
    };
  });
  
  console.log('📊 UI State:', JSON.stringify(uiState, null, 2));
  
  // Check JavaScript console for errors
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`${msg.type()}: ${msg.text()}`);
  });
  
  // Wait a bit more and check console
  await page.waitForTimeout(2000);
  console.log('📝 Console logs:', consoleLogs);
  
  // Try to manually trigger problem set loading
  const manualLoad = await page.evaluate(async () => {
    try {
      // Check if loadExamList function exists
      if (typeof loadExamList === 'function') {
        console.log('Manually calling loadExamList...');
        await loadExamList();
        return { success: true, message: 'loadExamList called' };
      } else {
        return { success: false, message: 'loadExamList function not found' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  });
  
  console.log('🔧 Manual load result:', manualLoad);
  
  // Check UI after manual load
  await page.waitForTimeout(2000);
  
  const uiAfterManualLoad = await page.evaluate(() => {
    const examOptions = document.querySelectorAll('.exam-option');
    return {
      examOptionsCount: examOptions.length,
      examOptionsText: Array.from(examOptions).map(opt => opt.textContent.trim())
    };
  });
  
  console.log('📊 UI After Manual Load:', uiAfterManualLoad);
  
  // Take final screenshot
  await page.screenshot({ path: 'ui-after-manual-load.png', fullPage: true });
});