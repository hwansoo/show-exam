const { test, expect } = require('@playwright/test');

test('Verify created problem sets are visible', async ({ page }) => {
  console.log('🔍 Verifying created problem sets...');
  
  await page.goto('https://show-exam.vercel.app/');
  await page.waitForTimeout(2000);
  
  // Authenticate
  await page.fill('#globalPasswordInput', 'examds2');
  await page.click('button:has-text("🚀 접속하기")');
  await page.waitForTimeout(3000);
  
  // Check if authenticated
  const mainVisible = await page.locator('#mainServiceContainer').isVisible();
  console.log('Authentication successful:', mainVisible);
  
  if (mainVisible) {
    // Get the updated problem sets list
    const result = await page.evaluate(async () => {
      try {
        // Get auth token
        const authResult = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: 'examds2' })
        });
        
        const authData = await authResult.json();
        const token = authData.token;
        
        // Get problem sets list
        const listResponse = await fetch('/api/problem-sets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!listResponse.ok) {
          const errorText = await listResponse.text();
          return { success: false, error: errorText };
        }
        
        const listData = await listResponse.json();
        
        // Look for our test problem sets
        const testSets = listData.problem_sets.filter(ps => 
          ps.key.startsWith('test_api_') && ps.title === 'Test Problem Set API'
        );
        
        return {
          success: true,
          totalSets: listData.problem_sets.length,
          testSets: testSets.map(ps => ({
            key: ps.key,
            title: ps.title,
            description: ps.description,
            created_at: ps.created_at,
            is_built_in: ps.is_built_in
          })),
          allSets: listData.problem_sets.map(ps => ({
            key: ps.key,
            title: ps.title,
            is_built_in: ps.is_built_in
          }))
        };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });
    
    console.log('\n📊 Problem Sets Verification:');
    if (result.success) {
      console.log('✅ Total problem sets:', result.totalSets);
      console.log('✅ Test problem sets found:', result.testSets.length);
      
      console.log('\n📝 All Problem Sets:');
      result.allSets.forEach((set, index) => {
        const icon = set.is_built_in ? '🏗️' : '🆕';
        console.log(`  ${index + 1}. ${icon} ${set.title} (${set.key})`);
      });
      
      if (result.testSets.length > 0) {
        console.log('\n🎉 Created Test Problem Sets:');
        result.testSets.forEach((set, index) => {
          console.log(`  ${index + 1}. Key: ${set.key}`);
          console.log(`     Title: ${set.title}`);
          console.log(`     Description: ${set.description}`);
          console.log(`     Created: ${set.created_at}`);
          console.log(`     Built-in: ${set.is_built_in}`);
          console.log('');
        });
      }
    } else {
      console.log('❌ Failed to verify:', result.error);
    }
  } else {
    console.log('❌ Authentication failed');
  }
});