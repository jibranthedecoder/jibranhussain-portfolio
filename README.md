# Jibran Hussain Portfolio

A multi-page portfolio built with vanilla HTML, CSS, JavaScript, and Cloudflare Pages Functions.

## Live architecture

- Home page at `/`
- About page at `/about/`
- Projects landing page at `/projects/`
- Contact page at `/contact/`
- Project case-study routes at `/projects/<slug>/`
- Shared styling in `styles.css`
- Shared client logic in `script.js`
- Shared project metadata in `project-data.js`
- Contact delivery through `functions/api/contact.js`

## Local preview

Static preview:

```powershell
python -m http.server 8000
```

Cloudflare Pages Functions preview:

```powershell
wrangler pages dev .
```

## Required environment variables

- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_FROM_NAME`
- `CONTACT_ALLOWED_ORIGINS`

Optional debugging variable:

- `DEBUG_CONTACT_ENDPOINT=true` exposes contact endpoint diagnostics. Keep this unset or false in production.

## Contact endpoint hardening

The contact endpoint is protected with:

- Cloudflare Turnstile verification
- approved-hostname checking
- JSON-only request validation
- server-side field length validation
- honeypot field rejection
- excessive-link rejection
- generic production error messages that do not expose secret configuration

Recommended Cloudflare production rule:

```text
Path: /api/contact
Method: POST
Limit: 5 requests per IP per 10 minutes
Action: Managed Challenge or Block
```

---

## QA system

Automated browser tests using [Playwright](https://playwright.dev/).  
Tests cover: page load, console errors, broken links, mobile layout, screenshots, and contact endpoint safety checks.

### Setup (first time)

```bash
npm install
npx playwright install chromium
```

### Run tests

| Command | What it does |
|---|---|
| `npm run serve` | Serve site locally on port 8080 |
| `npm run qa` | Full test suite (smoke + links + screenshots + contact API checks) |
| `npm run qa:smoke` | Smoke tests only (fast, all viewports) |
| `npm run qa:links` | Broken link checker |
| `npm run qa:screenshots` | Capture screenshots to `qa/screenshots/` |
| `npm run qa:report` | Open last HTML report in browser |

Test against the live site instead of localhost:

```bash
BASE_URL=https://www.jibranhussain.com npm run qa:smoke
```

Run contact API checks against Cloudflare Pages Functions preview:

```bash
wrangler pages dev .
BASE_URL=http://localhost:8788 npx playwright test qa/tests/contact-api.test.js --project=desktop-chrome
```

### Pre-launch checklist

Run before every deploy. All items must be **PASS** before pushing to main.

**Automated (run `npm run qa`)**

- [ ] All pages load without JS console errors (`/`, `/about/`, `/projects/`, `/contact/`, `/cv/`)
- [ ] All pages have correct `<title>`, visible `<h1>`, `<meta name="description">`, `lang` attribute
- [ ] No internal broken links on any page
- [ ] CV PDF resolves (`/assets/Jibran-Hussain-CV-EN.pdf` returns 200)
- [ ] Contact form has name, email, textarea, and submit button
- [ ] Contact API does not expose diagnostics by default
- [ ] Contact API rejects invalid formats, missing Turnstile token, and honeypot submissions
- [ ] No horizontal scroll overflow on iPhone 12 or Pixel 5 viewports
- [ ] Navigation present and accessible on mobile

**Manual (spot-check before deploy)**

- [ ] Dark/light theme toggle works and persists on refresh
- [ ] Language toggle (EN/FI) works and persists on refresh
- [ ] Contact form submits successfully (check Resend dashboard for delivery)
- [ ] Cloudflare Turnstile widget loads and passes on contact page
- [ ] Cloudflare rate limiting/WAF rule is active for `/api/contact`
- [ ] Project case-study pages load and render content
- [ ] CV download link prompts PDF download (not 404)
- [ ] All images load (no broken image icons)
- [ ] Scroll-reveal animations trigger on first visit
- [ ] Site looks correct at 320px, 768px, 1280px widths
- [ ] `robots.txt` and `sitemap.xml` are reachable

### Test file layout

```
qa/
  tests/
    smoke.test.js         # page load, console errors, a11y basics, mobile layout
    links.test.js         # broken internal link checker
    screenshots.test.js   # full-page screenshots (desktop + mobile)
    contact-api.test.js   # contact endpoint hardening checks
  screenshots/            # output — gitignored
  playwright-report/      # HTML report — gitignored
playwright.config.js
package.json
```
