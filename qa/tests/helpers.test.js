// @ts-check
const { test, expect } = require('@playwright/test');

const pages = ['/', '/about/', '/projects/', '/contact/'];
const helperScripts = [
  '/assets/theme-persistence.js',
  '/assets/readable-mode.js',
  '/assets/finnish-copy-polish.js',
];

test.describe('Injected helper scripts', () => {
  test.skip(({ isMobile }) => isMobile, 'helper injection check: desktop only');

  for (const pagePath of pages) {
    test(`${pagePath} includes runtime helper scripts`, async ({ page }) => {
      await page.goto(pagePath, { waitUntil: 'domcontentloaded' });

      for (const scriptPath of helperScripts) {
        const count = await page.locator(`script[src="${scriptPath}"]`).count();
        expect(count, `${scriptPath} should be present exactly once on ${pagePath}`).toBe(1);
      }
    });
  }
});
