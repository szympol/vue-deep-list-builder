import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe.parallel('visual regression testing', () => {
  test(`snapshot test`, async ({ page }) => {
    await page.goto('http://localhost:4173', {
      waitUntil: 'networkidle',
    });

    expect(
      await page.screenshot({
        fullPage: true,
        animations: 'disabled',
      }),
    ).toMatchSnapshot('vue-deep-list.builder.png', {
      threshold: 0.01,
    });
  });
});
