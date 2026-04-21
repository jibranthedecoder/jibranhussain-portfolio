// @ts-check
/**
 * Smoke tests — run against every page on desktop + mobile viewports.
 * Checks: page load, title, h1 presence, no JS console errors, basic a11y,
 * language toggle, FI direct-load persistence, theme toggle, reduced motion.
 *
 * Run:  npx playwright test qa/tests/smoke.test.js
 */

const { test, expect } = require('@playwright/test');

/** Pages to smoke-test. Paths relative to baseURL. */
const PAGES = [
  { path: '/',          title: /Jibran Hussain/i, h1: /Jibran/i,        hasNav: true,  hasChrome: true  },
  { path: '/about/',    title: /About/i,          h1: /./,              hasNav: true,  hasChrome: true  },
  { path: '/projects/', title: /Projects/i,       h1: /Projects/i,      hasNav: true,  hasChrome: true  },
  { path: '/contact/',  title: /Contact/i,        h1: /./,              hasNav: true,  hasChrome: true  },
  { path: '/cv/',       title: /CV/i,             h1: /Jibran/i,        hasNav: false, hasChrome: false },
];

/** Console message severities that count as failures. */
const ERROR_TYPES = new Set(['error']);

for (const { path, title, h1, hasNav, hasChrome } of PAGES) {
  test.describe(`Page: ${path}`, () => {
    test('loads without JS console errors', async ({ page }) => {
      const consoleErrors = /** @type {string[]} */ ([]);
      page.on('console', (msg) => {
        if (ERROR_TYPES.has(msg.type())) {
          consoleErrors.push(`[${msg.type()}] ${msg.text()}`);
        }
      });
      page.on('pageerror', (err) => {
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

    test('supports reduced motion without hiding core content', async ({ browser }) => {
      const context = await browser.newContext({ reducedMotion: 'reduce' });
      const page = await context.newPage();
      await page.goto(path);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1').first()).toBeVisible();
      await context.close();
    });

    test('FI direct-load persists and renders cleanly', async ({ page }) => {
      test.skip(!hasChrome, 'page does not use shared site chrome');
      await page.goto(path);
      await page.evaluate(() => localStorage.setItem('jh-language', 'fi'));
      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('lang', 'fi');
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.includes('�'), `Replacement character found on ${path}`).toBeFalsy();
      expect(/\?[a-zåäö]/i.test(bodyText), `Potential mojibake fragment found on ${path}`).toBeFalsy();
    });

    test('theme toggle switches theme mode', async ({ page }) => {
      test.skip(!hasChrome, 'page does not use shared site chrome');
      await page.goto(path);
      const themeToggle = page.locator('#themeToggle');
      await expect(themeToggle).toHaveCount(1);
      const before = await page.locator('html').getAttribute('data-theme');
      await themeToggle.click();
      const after = await page.locator('html').getAttribute('data-theme');
      expect(after, `Theme did not change on ${path}`).not.toBe(before);
    });

    test('language toggle switches to Finnish', async ({ page }) => {
      test.skip(!hasChrome, 'page does not use shared site chrome');
      await page.goto(path);
      const langToggle = page.locator('#langToggle');
      await expect(langToggle).toHaveCount(1);
      await langToggle.click();
      await expect(page.locator('html')).toHaveAttribute('lang', 'fi');
    });

    test('has nav or menu when expected', async ({ page }) => {
      await page.goto(path);
      const navCount = await page.locator('nav').count();
      if (hasNav) expect(navCount, `No <nav> on ${path}`).toBeGreaterThanOrEqual(1);
      else expect(navCount).toBeGreaterThanOrEqual(0);
    });
  });
}

// ---------------------------------------------------------------------------
// Mobile-specific layout checks
// ---------------------------------------------------------------------------

test.describe('Mobile layout', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile only');

  for (const { path, hasNav } of PAGES) {
    test(`${path} — no horizontal scroll on mobile`, async ({ page }) => {
      await page.goto(path);
      const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = page.viewportSize()?.width ?? 375;
      expect(
        bodyScrollWidth,
        `Horizontal overflow on ${path} (scrollWidth ${bodyScrollWidth} > viewport ${viewportWidth})`
      ).toBeLessThanOrEqual(viewportWidth + 2);
    });

    test(`${path} — nav or menu is accessible on mobile`, async ({ page }) => {
      if (!hasNav) return;
      await page.goto(path);
      const navCount = await page.locator('nav').count();
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

  test('CV PDF asset is reachable', async ({ request }) => {
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
