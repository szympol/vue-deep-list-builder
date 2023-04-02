import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const projects = [
  {
    name: 'chrome',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'edge',
    use: { ...devices['Desktop Edge'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
  {
    name: 'iphone',
    use: { ...devices['iPhone 8'] },
  },
  {
    name: 'samsung',
    use: { ...devices['Galaxy S8'] },
  },
  {
    name: 'tablet',
    use: { ...devices['iPad Mini'] },
  },
];

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 10,
  reporter: [
    [process.env.CI ? 'dot' : 'list'],
    ['html', { open: 'never', outputFolder: 'e2e/report' }],
    ['junit', { outputFile: 'e2e/report/e2e.junit.xml' }],
  ],
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects,
  webServer: {
    command: process.env.CI ? 'vite preview --port 5173' : 'vite dev',
    port: 5173,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    ignoreHTTPSErrors: true,
  },
};

export default config;
