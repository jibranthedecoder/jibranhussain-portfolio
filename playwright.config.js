// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

module.exports = defineConfig({
  testDir: './qa/tests',
  timeout: 30_000,
  retries: 0,
  fullyParallel: true,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'qa/playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: BASE_URL,
    screenshot: 'only-on-failure',
    trace: 'off',
  },

  projects: [
    {
      name: 'desktop-chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'mobile-iphone',
      use: {
        ...devices['iPhone 12'],
      },
    },
    {
      name: 'mobile-android',
      use: {
        ...devices['Pixel 5'],
      },
    },
  ],

  // Screenshots and links tests only need one browser
  grep: undefined,
});
