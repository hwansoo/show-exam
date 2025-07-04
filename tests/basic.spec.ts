import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  
  // Check if the main heading is present
  await expect(page.locator('h1')).toContainText('시험 문제 연습 서비스');
  
  // Check if the description is present
  await expect(page.locator('p')).toContainText('다양한 문제를 통해 실력을 향상시키세요');
  
  // Check if the exam selector is present
  await expect(page.locator('h2')).toContainText('문제 세트 선택');
});