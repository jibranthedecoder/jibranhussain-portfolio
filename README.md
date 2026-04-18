# Jibran Hussain Portfolio

A responsive personal portfolio website for Electrical and Automation Engineering student Jibran Hussain.

The site is built with vanilla HTML, CSS, JavaScript, and Cloudflare Pages Functions. It includes polished styling, responsive layout, dark/light theming, accessibility-focused enhancements, and a production-ready contact form backend.

## Project structure

- `index.html` - main portfolio page structure and content
- `styles.css` - responsive styling, theme support, and readable mode design
- `script.js` - interactivity, theme management, language switching, speech synthesis, privacy preferences, and contact form handling
- `functions/api/contact.js` - Cloudflare Pages Function for validation, Turnstile verification, and message delivery
- `wrangler.toml` - Cloudflare local development and Pages configuration
- `assets/` - image assets used in the site

## Key features

- Responsive hero, about, skills, experience, education, tools, and contact sections
- Dark/light mode toggle with local preference persistence
- Automatic browser language detection with Finnish and English support
- Manual language switch buttons that override auto-detection
- Read aloud feature using the browser SpeechSynthesis API
- Dyslexia-friendly mode with larger spacing and Open-Dyslexic font support
- Minimal privacy banner and modal with consent persistence in `localStorage`
- Cloudflare Turnstile protected contact form with server-side validation
- Accessible navigation, ARIA labels, and keyboard-friendly controls

## Running locally

Open the project using a local server for best browser compatibility.

### Python

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

Note: the contact form itself requires Cloudflare Pages Functions, so Turnstile verification and email delivery will only work locally when you use `wrangler pages dev .`.

### Cloudflare Pages local dev

```bash
wrangler pages dev .
```

## Cloudflare contact form setup

Set these Cloudflare Pages environment variables for both preview and production:

- `TURNSTILE_SECRET_KEY` - Turnstile secret key used only in the backend function
- `CONTACT_TO_EMAIL` - destination inbox, for example `contact@jibranhussain.com`
- `CONTACT_FROM_EMAIL` - verified sender address for worker mail delivery
- `CONTACT_FROM_NAME` - optional display name for outgoing mail
- `CONTACT_ALLOWED_ORIGINS` - optional comma-separated extra origins or hostnames beyond the built-in allowlist

Recommended flow:

1. Create a Turnstile widget in Cloudflare and allow your production domain.
2. Use the site key `0x4AAAAAAC_WnzOWpDebVPCC` in the frontend and add only `TURNSTILE_SECRET_KEY` in Cloudflare Pages environment settings.
3. Set the contact email variables.
4. Deploy the site to Cloudflare Pages.
5. Submit the contact form once from the deployed site and confirm delivery.

## Deploying

1. Commit all files to your repository.
2. Push to the `main` branch.
3. Connect the repository to Cloudflare Pages.
4. Use the project root as the build output directory.
5. Add the environment variables listed above.
6. Visit the published Pages URL.

## Editing content

Update the content directly in `index.html` for this portfolio project. The page is currently built as a stable site template rather than a content-driven markdown system.

## Notes

- The site keeps user preferences for theme, language, dyslexia mode, and privacy consent in `localStorage`.
- The read aloud feature uses browser support for `speechSynthesis`; if unsupported, it disables cleanly.
- The contact form frontend renders Turnstile directly with the public site key, while the backend uses `TURNSTILE_SECRET_KEY` to verify tokens before sending mail.
- The design preserves the existing layout and navigation while improving usability and accessibility.
