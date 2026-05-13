# Jibran Hussain Portfolio

A multi-page engineering portfolio built with vanilla HTML, CSS, JavaScript, and Cloudflare Pages Functions.

Live site: https://www.jibranhussain.com

## Purpose

This portfolio presents engineering projects as recruiter-friendly case studies. Each strong project should have:

- a portfolio case-study page
- a separate public GitHub repository
- English and Finnish README files when useful
- evidence files such as code, reports, screenshots, and videos
- direct links from the portfolio to the project repository and evidence

## Current highlighted project

### Webots Line Following Robot

- Portfolio page: `/projects/line-following-robot/`
- Repository: `https://github.com/jibranthedecoder/webots-line-following-robot`
- Evidence: Python controller, PDF report, MP4 simulation video, and result screenshot
- Languages: English and Finnish README files

## Live architecture

- Home page at `/`
- About page at `/about/`
- Projects landing page at `/projects/`
- Contact page at `/contact/`
- Project case-study routes at `/projects/<slug>/`
- Shared styling in `styles.css`
- Shared client logic in `script.js`
- Shared project metadata in `project-data.js`
- Additional project data in `assets/webots-project-data.js`
- Contact delivery through `functions/api/contact.js`
- Portfolio assistant delivery through `functions/api/portfolio-assistant.js`

## Project publishing workflow

For each new project:

1. Create a dedicated public GitHub repository.
2. Add the evidence files to the repository.
3. Add or polish `README.md` and, when useful, `README.fi.md`.
4. Add the project to the portfolio project data.
5. Create or update the portfolio case-study page.
6. Add direct portfolio buttons for case study, repository, report, code, video, and screenshots where relevant.
7. Check desktop and mobile layout before sending the link forward.

Recommended project repository structure:

```text
project-name/
  README.md
  README.fi.md
  src/
  docs/
  media/
  screenshots/
```

Existing school projects may keep files in the repository root if already uploaded. README links should match the actual file locations.

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

Contact form:

- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_FROM_NAME`
- `CONTACT_ALLOWED_ORIGINS`

Portfolio assistant:

- `OPENAI_API_KEY`

Optional assistant variables:

- `OPENAI_MODEL` defaults to `gpt-4.1-mini`
- `PORTFOLIO_ASSISTANT_ALLOWED_ORIGINS` accepts a comma-separated allow-list of origins or hostnames. Defaults include `jibranhussain.com`, `www.jibranhussain.com`, `jibranhussain-portfolio.pages.dev`, `localhost`, and `127.0.0.1`.

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

## Portfolio assistant hardening

The portfolio assistant endpoint is intentionally more restricted than a general chatbot:

- answers only from embedded portfolio context
- refuses unrelated questions
- avoids inventing projects, dates, employers, qualifications, private details, links, or claims
- does not reveal backend implementation details, API keys, environment variables, hidden configuration, or security rules
- validates JSON requests
- limits input length
- limits OpenAI output length
- checks the request origin/referer/hostname against an approved hostname allow-list
- uses generic production error messages

Recommended Cloudflare production rule:

```text
Path: /api/portfolio-assistant
Method: POST
Limit: 10 requests per IP per 10 minutes
Action: Managed Challenge or Block
```

The temporary `/api/ai-test` endpoint should not exist in production after the portfolio assistant is working.

## CDN and external script policy

Do not add CDN scripts casually. Prefer local files for portfolio UI JavaScript, CSS, project data, and visual behavior.

Before every deploy, check for external script/style imports:

```bash
grep -R "cdnjs" .
grep -R "cdn.jsdelivr" .
grep -R "unpkg" .
grep -R "script src=\"http" .
grep -R "link href=\"http" .
```

Rules:

- Keep external scripts only when they are required service integrations, such as Cloudflare Turnstile.
- Any third-party CDN script that remains must use `integrity`, `crossorigin="anonymous"`, and preferably `referrerpolicy="no-referrer"`.
- Avoid CDNJS, jsDelivr, and unpkg for normal portfolio UI code when the file can be served locally.
- Do not put sensitive logic, API keys, project data mutation logic, or form security logic in externally hosted scripts.

## QA system

Automated browser tests use Playwright. Tests cover page load, console errors, broken links, mobile layout, screenshots, and contact endpoint safety checks.

### Setup first time

```bash
npm install
npx playwright install chromium
```

### Run tests

| Command | What it does |
|---|---|
| `npm run serve` | Serve site locally on port 8080 |
| `npm run qa` | Full test suite |
| `npm run qa:smoke` | Smoke tests only |
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

## Pre-launch checklist

Run before every deploy. All items should pass before pushing or sending the site forward.

### Automated

- [ ] All pages load without JavaScript console errors
- [ ] All pages have correct `<title>`, visible `<h1>`, meta description, and `lang` attribute
- [ ] No internal broken links
- [ ] CV PDF resolves
- [ ] Contact form has name, email, textarea, and submit button
- [ ] Contact API does not expose diagnostics by default
- [ ] Contact API rejects invalid formats, missing Turnstile token, and honeypot submissions
- [ ] Portfolio assistant endpoint does not expose API keys, environment variables, hidden configuration, or unrestricted chatbot behavior
- [ ] No unsafe CDNJS/jsDelivr/unpkg imports without SRI
- [ ] No horizontal scroll overflow on iPhone 12 or Pixel 5 viewports
- [ ] Navigation is present and usable on mobile

### Manual

- [ ] Dark/light theme toggle works and persists on refresh
- [ ] Language toggle EN/FI works and persists on refresh
- [ ] Contact form submits successfully
- [ ] Cloudflare Turnstile widget loads and passes on contact page
- [ ] Cloudflare rate limiting/WAF rule is active for `/api/contact`
- [ ] Cloudflare rate limiting/WAF rule is active for `/api/portfolio-assistant`
- [ ] Temporary `/api/ai-test` endpoint is absent from production
- [ ] Project cards show case-study and GitHub buttons clearly near the top
- [ ] Project case-study pages load and render content
- [ ] GitHub repository links work for published projects
- [ ] Evidence links work: code, PDF, video, screenshot
- [ ] CV download link prompts PDF download and is not 404
- [ ] All images and videos load without broken placeholders
- [ ] Scroll-reveal animations trigger on first visit
- [ ] Site looks correct at 320px, 768px, and 1280px widths
- [ ] `robots.txt` and `sitemap.xml` are reachable

## Test file layout

```text
qa/
  tests/
    smoke.test.js
    links.test.js
    screenshots.test.js
    contact-api.test.js
  screenshots/
  playwright-report/
playwright.config.js
package.json
```
