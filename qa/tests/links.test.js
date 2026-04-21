// @ts-check
/**
 * Broken link checker — crawls every page and verifies all hrefs return < 400.
 * Runs in desktop-chrome only (skip mobile via playwright.config project filter).
 *
 * Run:  npx playwright test qa/tests/links.test.js --project=desktop-chrome
 */

const { test, expect } = require('@playwright/test');

const PAGES = ['/', '/about/', '/projects/', '/contact/', '/cv/'];

/** Schemes we can't HEAD-check (mailto:, tel:, javascript:) */
const SKIP_SCHEMES = /^(mailto:|tel:|javascript:|#)/i;

/**
 * Return all unique href values from a page, normalised to absolute URLs.
 * @param {import('@playwright/test').Page} page
 * @param {string} baseURL
 */
async function collectLinks(page, baseURL) {
  const hrefs = await page.$$eval('a[href]',
    /** @param {HTMLAnchorElement[]} els */
    els => els.map(el => el.getAttribute('href') ?? '').filter(Boolean)
  );

  const links = new Set();
  for (const href of hrefs) {
    if (SKIP_SCHEMES.test(href)) continue;
    try {
      const url = new URL(href, baseURL);
      // Only check same-origin + protocol-relative; skip third-party
      if (url.origin === new URL(baseURL).origin) {
        links.add(url.pathname + url.search);
      }
    } catch {
      // malformed href — record as-is for reporting
      links.add(href);
    }
  }
  return links;
}

for (const pagePath of PAGES) {
  test.describe(`Links on ${pagePath}`, () => {
    // Only run link checks on desktop — no value running twice
    test.skip(({ isMobile }) => isMobile, 'link check: desktop only');

    test(`all internal links on ${pagePath} return < 400`, async ({ page, request, baseURL }) => {
      await page.goto(pagePath);
      const links = await collectLinks(page, baseURL ?? 'http://localhost:8080');

      const broken = [];
      for (const href of links) {
        let status;
        try {
          const res = await request.head(href, { timeout: 10_000 });
          status = res.status();
        } catch {
          status = 0;   // network error
        }
        if (status >= 400 || status === 0) {
          broken.push(`  ${status}  ${href}`);
        }
      }

      expect(
        broken,
        `Broken links on ${pagePath}:\n${broken.join('\n')}`
      ).toHaveLength(0);
    });
  });
}

// ---------------------------------------------------------------------------
// CV PDF specifically — explicit HEAD check (desktop only)
// ---------------------------------------------------------------------------

test.describe('CV PDF asset', () => {
  test.skip(({ isMobile }) => isMobile, 'asset check: desktop only');

  test('HEAD /assets/Jibran-Hussain-CV-EN.pdf returns < 400', async ({ request }) => {
    const res = await request.head('/assets/Jibran-Hussain-CV-EN.pdf');
    expect(res.status(), 'CV PDF is 404 — commit assets/Jibran-Hussain-CV-EN.pdf').toBeLessThan(400);
  });
});
