// @ts-check
/**
 * Screenshot capture — saves reference images to qa/screenshots/.
 * Not a pass/fail test; used for visual review before and after changes.
 *
 * Run:  npx playwright test qa/tests/screenshots.test.js --project=desktop-chrome
 *  or:  npx playwright test qa/tests/screenshots.test.js   (all viewports)
 *
 * Output: qa/screenshots/{page}-{viewport}.png
 */

const { test } = require('@playwright/test');
const path = require('path');
const fs   = require('fs');

const PAGES = [
  { path: '/',          slug: 'home'     },
  { path: '/about/',    slug: 'about'    },
  { path: '/projects/', slug: 'projects' },
  { path: '/contact/',  slug: 'contact'  },
  { path: '/cv/',       slug: 'cv'       },
];

const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots');

test.beforeAll(() => {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
});

for (const { path: pagePath, slug } of PAGES) {
  test(`screenshot: ${slug}`, async ({ page, isMobile }, testInfo) => {
    const viewport = isMobile ? 'mobile' : 'desktop';
    const filename = `${slug}-${viewport}.png`;
    const outPath  = path.join(SCREENSHOT_DIR, filename);

    await page.goto(pagePath, { waitUntil: 'networkidle' });

    // Wait for any reveal animations to settle
    await page.waitForTimeout(400);

    await page.screenshot({
      path: outPath,
      fullPage: true,
    });

    // Attach to Playwright HTML report for easy review
    await testInfo.attach(filename, {
      path: outPath,
      contentType: 'image/png',
    });

    console.log(`  Saved: qa/screenshots/${filename}`);
  });
}
