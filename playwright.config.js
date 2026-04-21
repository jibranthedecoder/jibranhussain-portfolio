// @ts-check
/// <reference types="node" />
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
        defaultBrowserType: 'chromium',   // only chromium installed; WebKit emulation via UA+viewport
      },
    },
    {
      name: 'mobile-android',
      use: {
        ...devices['Pixel 5'],
        defaultBrowserType: 'chromium',
      },
    },
  ],

  // Screenshots and links tests only need one browser
  grep: undefined,
});
