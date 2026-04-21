// @ts-check
/**
 * Smoke tests — run against every page on desktop + mobile viewports.
 * Checks: page load, title, h1 presence, no JS console errors, basic a11y.
 *
 * Run:  npx playwright test qa/tests/smoke.test.js
 */

const { test, expect } = require('@playwright/test');

/** Pages to smoke-test. Paths relative to baseURL. */
const PAGES = [
  { path: '/',          title: /Jibran Hussain/i,   h1: /Jibran/i },
  { path: '/about/',    title: /About/i,             h1: /About/i  },
  { path: '/projects/', title: /Projects/i,          h1: /Projects/i },
  { path: '/contact/',  title: /Contact/i,            h1: /Contact/i  },
  { path: '/cv/',       title: /CV/i,                h1: /Jibran/i   },
];

/** Console message severities that count as failures. */
const ERROR_TYPES = new Set(['error']);

for (const { path, title, h1 } of PAGES) {
  test.describe(`Page: ${path}`, () => {

    /** Collect console errors during page load. */
    test('loads without JS console errors', async ({ page }) => {
      const consoleErrors = [];
      page.on('console', msg => {
        if (ERROR_TYPES.has(msg.type())) {
          consoleErrors.push(`[${msg.type()}] ${msg.text()}`);
        }
      });
      page.on('pageerror', err => {
        consoleErrors.push(`[pageerror] ${err.message}`);
      });

      const response = await page.goto(path);

      expect(response?.status(), `${path} returned non-2xx`).toBeLessThan(400);
      expect(consoleErrors, `Console errors on ${path}:\n${consoleErrors.join('\n')}`).toHaveLength(0);
    });

    test('has correct <title>', async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(title);
    });

    test('has visible <h1>', async ({ page }) => {
      await page.goto(path);
      const h1El = page.locator('h1').first();
      await expect(h1El).toBeVisible();
      await expect(h1El).toHaveText(h1);
    });

    test('has <meta name="description">', async ({ page }) => {
      await page.goto(path);
      const meta = page.locator('meta[name="description"]');
      await expect(meta).toHaveCount(1);
      const content = await meta.getAttribute('content');
      expect(content?.length, `Empty description on ${path}`).toBeGreaterThan(20);
    });

    test('has lang attribute on <html>', async ({ page }) => {
      await page.goto(path);
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang, `Missing lang on ${path}`).toBeTruthy();
    });

    test('has a visible skip-link or main landmark', async ({ page }) => {
      await page.goto(path);
      const main = page.locator('main');
      await expect(main).toHaveCount(1);
    });

    test('has canonical link tag', async ({ page }) => {
      await page.goto(path);
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
    });

  });
}

// ---------------------------------------------------------------------------
// Mobile-specific layout checks
// ---------------------------------------------------------------------------

test.describe('Mobile layout', () => {
  // Only run these in mobile projects
  test.skip(({ browserName, isMobile }) => !isMobile, 'mobile only');

  for (const { path } of PAGES) {
    test(`${path} — no horizontal scroll on mobile`, async ({ page }) => {
      await page.goto(path);
      const bodyScrollWidth   = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth     = page.viewportSize()?.width ?? 375;
      expect(
        bodyScrollWidth,
        `Horizontal overflow on ${path} (scrollWidth ${bodyScrollWidth} > viewport ${viewportWidth})`
      ).toBeLessThanOrEqual(viewportWidth + 2);   // 2px tolerance for rounding
    });

    test(`${path} — nav or menu is accessible on mobile`, async ({ page }) => {
      await page.goto(path);
      // Either a nav element or a hamburger button must exist
      const nav     = page.locator('nav');
      const navCount = await nav.count();
      expect(navCount, `No <nav> on mobile ${path}`).toBeGreaterThanOrEqual(1);
    });
  }
});

// ---------------------------------------------------------------------------
// CV-specific checks
// ---------------------------------------------------------------------------

test.describe('CV page', () => {
  test('CV download button links to PDF', async ({ page }) => {
    await page.goto('/cv/');
    const pdfLink = page.locator('a[href*=".pdf"]');
    await expect(pdfLink).toHaveCount(1);
    const href = await pdfLink.getAttribute('href');
    expect(href).toContain('/assets/Jibran-Hussain-CV-EN.pdf');
  });

  test('CV PDF asset is reachable', async ({ page, request }) => {
    const response = await request.head('/assets/Jibran-Hussain-CV-EN.pdf');
    expect(response.status(), 'PDF returned 404 — regenerate and commit it').toBeLessThan(400);
  });
});

// ---------------------------------------------------------------------------
// Contact page functional checks
// ---------------------------------------------------------------------------

test.describe('Contact page', () => {
  test('contact form has required fields', async ({ page }) => {
    await page.goto('/contact/');
    await expect(page.locator('form')).toHaveCount(1);
    await expect(page.locator('input[name="name"], input[id="name"]')).toHaveCount(1);
    await expect(page.locator('input[name="email"], input[id="email"]')).toHaveCount(1);
    await expect(page.locator('textarea')).toHaveCount(1);
    await expect(page.locator('button[type="submit"]')).toHaveCount(1);
  });
});
