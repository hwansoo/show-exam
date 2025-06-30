const { test, expect } = require('@playwright/test');

const PRODUCTION_URL = 'https://show-exam.vercel.app/';

test.describe('Environment Tests', () => {
  test('check what config endpoint returns', async ({ request }) => {
    console.log('Testing config endpoint...');
    
    try {
      const response = await request.get(`${PRODUCTION_URL}api/config`);
      console.log(`Config response status: ${response.status()}`);
      
      if (response.ok()) {
        const responseBody = await response.json();
        console.log('Config response:', JSON.stringify(responseBody, null, 2));
      } else {
        const responseText = await response.text();
        console.log('Config error response:', responseText);
      }
    } catch (error) {
      console.log('Config endpoint error:', error);
    }
  });
  
  test('test different password possibilities', async ({ request }) => {
    const possiblePasswords = [
      'exam2024',
      'EXAM2024', 
      'Exam2024',
      'exam',
      'test',
      'password',
      'admin',
      '', // empty password
    ];
    
    for (const password of possiblePasswords) {
      console.log(`Testing password: "${password}"`);
      
      try {
        const response = await request.post(`${PRODUCTION_URL}api/auth`, {
          data: { password },
          headers: { 'Content-Type': 'application/json' }
        });
        
        const responseBody = await response.json();
        console.log(`Password "${password}": Status ${response.status()}, Success: ${responseBody.success}`);
        
        if (responseBody.success) {
          console.log('✅ FOUND WORKING PASSWORD:', password);
          return; // Exit early if we find a working password
        }
      } catch (error) {
        console.log(`Password "${password}": Error -`, error.message);
      }
    }
    
    console.log('❌ No working password found from common options');
  });
  
  test('check problem-sets endpoint availability', async ({ request }) => {
    console.log('Testing problem-sets endpoint without auth...');
    
    try {
      const response = await request.get(`${PRODUCTION_URL}api/problem-sets`);
      console.log(`Problem-sets response status: ${response.status()}`);
      
      if (response.ok()) {
        const responseBody = await response.json();
        console.log('Problem-sets available without auth');
      } else {
        const responseText = await response.text();
        console.log('Problem-sets requires auth:', responseText);
      }
    } catch (error) {
      console.log('Problem-sets endpoint error:', error);
    }
  });
});