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
