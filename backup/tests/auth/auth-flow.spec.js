const { test, expect } = require('@playwright/test');

const PRODUCTION_URL = 'https://show-exam.vercel.app/';
const DEFAULT_PASSWORD = 'exam2024';
const INVALID_PASSWORD = 'wrongpassword';

test.describe('Authentication Flow Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage and cookies before each test
    await page.goto(PRODUCTION_URL);
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    
    // Reload the page to ensure clean state
    await page.reload();
  });

  test('should show global password protection screen on initial load', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Check that global password section is visible
    await expect(page.locator('#globalPasswordSection')).toBeVisible();
    
    // Check that main service is hidden
    await expect(page.locator('#mainServiceContainer')).toHaveClass(/hidden/);
    
    // Verify password input elements are present
    await expect(page.locator('#globalPasswordInput')).toBeVisible();
    await expect(page.locator('button:has-text("접속하기")')).toBeVisible();
    
    // Check page title and header
    await expect(page).toHaveTitle(/시험 문제 연습 서비스/);
    await expect(page.locator('h1')).toContainText('시험 문제 연습 서비스');
  });

  test('should reject invalid password', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Enter invalid password
    await page.fill('#globalPasswordInput', INVALID_PASSWORD);
    await page.click('button:has-text("접속하기")');
    
    // Wait for error message to appear
    await expect(page.locator('#globalPasswordError')).toBeVisible();
    await expect(page.locator('#globalPasswordError')).toContainText('비밀번호가 올바르지 않습니다');
    
    // Verify main service is still hidden
    await expect(page.locator('#mainServiceContainer')).toHaveClass(/hidden/);
    
    // Check that password input is cleared or still visible for retry
    await expect(page.locator('#globalPasswordSection')).toBeVisible();
  });

  test('should accept valid password and show main service', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Monitor console for errors
    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });
    
    // Enter correct password
    await page.fill('#globalPasswordInput', DEFAULT_PASSWORD);
    await page.click('button:has-text("접속하기")');
    
    // Wait for authentication to complete and main service to load
    await expect(page.locator('#globalPasswordSection')).toHaveClass(/hidden/);
    await expect(page.locator('#mainServiceContainer')).toBeVisible();
    
    // Check that main service components are visible
    await expect(page.locator('#examSelector')).toBeVisible();
    await expect(page.locator('.exam-grid')).toBeVisible();
    
    // Verify API key section is visible
    await expect(page.locator('#apiKeySection')).toBeVisible();
    
    // Check for problem sets loading
    await page.waitForTimeout(2000); // Give time for API calls to complete
    
    // Verify no authentication-related console errors
    const authErrors = consoleMessages.filter(msg => 
      msg.includes('auth') || msg.includes('token') || msg.includes('401') || msg.includes('403')
    );
    expect(authErrors).toHaveLength(0);
  });

  test('should store authentication token in localStorage', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Authenticate
    await page.fill('#globalPasswordInput', DEFAULT_PASSWORD);
    await page.click('button:has-text("접속하기")');
    
    // Wait for authentication to complete
    await expect(page.locator('#mainServiceContainer')).toBeVisible();
    
    // Check that token is stored in localStorage
    const token = await page.evaluate(() => {
      return localStorage.getItem('show-exam-auth-token');
    });
    
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  test('should persist authentication across page refreshes', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Authenticate
    await page.fill('#globalPasswordInput', DEFAULT_PASSWORD);
    await page.click('button:has-text("접속하기")');
    
    // Wait for authentication to complete
    await expect(page.locator('#mainServiceContainer')).toBeVisible();
    
    // Refresh the page
    await page.reload();
    
    // Should automatically be authenticated and show main service
    await expect(page.locator('#globalPasswordSection')).toHaveClass(/hidden/);
    await expect(page.locator('#mainServiceContainer')).toBeVisible();
    
    // Should not show password input again
    await expect(page.locator('#globalPasswordInput')).not.toBeVisible();
  });

  test('should handle token expiration gracefully', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Authenticate first
    await page.fill('#globalPasswordInput', DEFAULT_PASSWORD);
    await page.click('button:has-text("접속하기")');
    await expect(page.locator('#mainServiceContainer')).toBeVisible();
    
    // Simulate expired token by setting an invalid token
    await page.evaluate(() => {
      localStorage.setItem('show-exam-auth-token', 'invalid-expired-token');
    });
    
    // Reload the page to trigger token validation
    await page.reload();
    
    // Should redirect back to login screen
    await expect(page.locator('#globalPasswordSection')).toBeVisible();
    await expect(page.locator('#mainServiceContainer')).toHaveClass(/hidden/);
  });

  test('should handle network errors during authentication', async ({ page }) => {
    // Block auth API requests to simulate network error
    await page.route('**/api/auth', route => {
      route.abort('failed');
    });
    
    await page.goto(PRODUCTION_URL);
    
    // Monitor console for network errors
    const consoleMessages = [];
    page.on('console', msg => {
      consoleMessages.push(msg.text());
    });
    
    // Try to authenticate
    await page.fill('#globalPasswordInput', DEFAULT_PASSWORD);
    await page.click('button:has-text("접속하기")');
    
    // Should show error message
    await expect(page.locator('#globalPasswordError')).toBeVisible();
    await expect(page.locator('#globalPasswordError')).toContainText('인증 중 오류가 발생했습니다');
    
    // Should remain on login screen
    await expect(page.locator('#globalPasswordSection')).toBeVisible();
    await expect(page.locator('#mainServiceContainer')).toHaveClass(/hidden/);
  });

  test('should load problem sets after successful authentication', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Authenticate
    await page.fill('#globalPasswordInput', DEFAULT_PASSWORD);
    await page.click('button:has-text("접속하기")');
    
    // Wait for main service to load
    await expect(page.locator('#mainServiceContainer')).toBeVisible();
    
    // Wait for problem sets to load
    await page.waitForTimeout(3000);
    
    // Check that exam cards are present
    const examCards = page.locator('.exam-card');
    await expect(examCards).toHaveCount(await examCards.count());
    
    // Verify at least some built-in problem sets are available
    await expect(page.locator('.exam-card')).toHaveCountGreaterThan(0);
  });

  test('should support keyboard navigation (Enter key)', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Focus on password input and use Enter key
    await page.fill('#globalPasswordInput', DEFAULT_PASSWORD);
    await page.press('#globalPasswordInput', 'Enter');
    
    // Should authenticate successfully
    await expect(page.locator('#globalPasswordSection')).toHaveClass(/hidden/);
    await expect(page.locator('#mainServiceContainer')).toBeVisible();
  });

  test('should validate JWT token structure', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Authenticate
    await page.fill('#globalPasswordInput', DEFAULT_PASSWORD);
    await page.click('button:has-text("접속하기")');
    
    // Wait for authentication
    await expect(page.locator('#mainServiceContainer')).toBeVisible();
    
    // Get the stored token
    const token = await page.evaluate(() => {
      return localStorage.getItem('show-exam-auth-token');
    });
    
    // Basic JWT structure validation (should have 3 parts separated by dots)
    expect(token).toBeTruthy();
    const tokenParts = token.split('.');
    expect(tokenParts).toHaveLength(3);
    
    // Each part should be base64 encoded (basic check)
    tokenParts.forEach(part => {
      expect(part).toMatch(/^[A-Za-z0-9_-]+$/);
    });
  });

  test('should handle empty password input', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Try to submit without entering password
    await page.click('button:has-text("접속하기")');
    
    // Should show appropriate error message
    await expect(page.locator('#globalPasswordError')).toBeVisible();
    await expect(page.locator('#globalPasswordError')).toContainText('비밀번호를 입력해주세요');
    
    // Should remain on login screen
    await expect(page.locator('#globalPasswordSection')).toBeVisible();
    await expect(page.locator('#mainServiceContainer')).toHaveClass(/hidden/);
  });

  test('should clear token on logout/reset', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Authenticate
    await page.fill('#globalPasswordInput', DEFAULT_PASSWORD);
    await page.click('button:has-text("접속하기")');
    await expect(page.locator('#mainServiceContainer')).toBeVisible();
    
    // Verify token exists
    let token = await page.evaluate(() => {
      return localStorage.getItem('show-exam-auth-token');
    });
    expect(token).toBeTruthy();
    
    // Simulate token clearing (as would happen on 401 response)
    await page.evaluate(() => {
      localStorage.removeItem('show-exam-auth-token');
    });
    
    // Reload page
    await page.reload();
    
    // Should redirect to login
    await expect(page.locator('#globalPasswordSection')).toBeVisible();
    await expect(page.locator('#mainServiceContainer')).toHaveClass(/hidden/);
    
    // Verify token is cleared
    token = await page.evaluate(() => {
      return localStorage.getItem('show-exam-auth-token');
    });
    expect(token).toBeNull();
  });

  test('should handle concurrent authentication attempts', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Fill password but don't submit yet
    await page.fill('#globalPasswordInput', DEFAULT_PASSWORD);
    
    // Submit multiple times quickly
    await Promise.all([
      page.click('button:has-text("접속하기")'),
      page.click('button:has-text("접속하기")'),
      page.click('button:has-text("접속하기")')
    ]);
    
    // Should still authenticate successfully
    await expect(page.locator('#mainServiceContainer')).toBeVisible();
    
    // Should have valid token
    const token = await page.evaluate(() => {
      return localStorage.getItem('show-exam-auth-token');
    });
    expect(token).toBeTruthy();
  });

  test('should verify API endpoints are accessible after authentication', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    
    // Monitor network requests
    const requests = [];
    page.on('request', request => {
      if (request.url().includes('/api/')) {
        requests.push({
          url: request.url(),
          method: request.method(),
          headers: request.headers()
        });
      }
    });
    
    const responses = [];
    page.on('response', response => {
      if (response.url().includes('/api/')) {
        responses.push({
          url: response.url(),
          status: response.status(),
          ok: response.ok()
        });
      }
    });
    
    // Authenticate
    await page.fill('#globalPasswordInput', DEFAULT_PASSWORD);
    await page.click('button:has-text("접속하기")');
    await expect(page.locator('#mainServiceContainer')).toBeVisible();
    
    // Wait for API calls to complete
    await page.waitForTimeout(3000);
    
    // Verify authentication request was made
    const authRequests = requests.filter(req => req.url.includes('/api/auth'));
    expect(authRequests.length).toBeGreaterThan(0);
    
    // Verify successful responses
    const authResponses = responses.filter(res => res.url.includes('/api/auth'));
    expect(authResponses.length).toBeGreaterThan(0);
    expect(authResponses[0].ok).toBe(true);
    
    // Check that subsequent API calls include authorization header
    const authorizedRequests = requests.filter(req => 
      req.url.includes('/api/') && 
      !req.url.includes('/api/auth') && 
      req.headers.authorization
    );
    
    if (authorizedRequests.length > 0) {
      expect(authorizedRequests[0].headers.authorization).toMatch(/Bearer .+/);
    }
  });
});