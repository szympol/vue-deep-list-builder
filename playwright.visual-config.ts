import { devices, PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';

// import { projects } from './playwright.config';
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

dotenv.config();

const config: PlaywrightTestConfig = {
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 10,
  reporter: [
    [process.env.CI ? 'dot' : 'list'],
    ['html', { open: 'never', outputFolder: 'e2e/report-visual' }],
    ['junit', { outputFile: 'visual.junit.xml' }],
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:4173',
    ignoreHTTPSErrors: true,
  },
  projects,
};

export default config;
