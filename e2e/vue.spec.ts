import { test, expect } from '@playwright/test';

test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  const element = page.locator('h1');
  const text = await element.textContent();

  expect(text).toContain('Vite + Vue');
});
