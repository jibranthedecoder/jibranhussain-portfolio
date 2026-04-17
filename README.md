# Jibran Hussain Portfolio

A responsive personal portfolio website for Electrical & Automation Engineering student **Jibran Hussain**.

The site is built with vanilla HTML, CSS, and JavaScript and includes polished styling, responsive layout, dark/light theming, and accessibility-first enhancements.

## Project structure

- `index.html` — main portfolio page structure and content
- `styles.css` — responsive styling, theme support, and readable mode design
- `script.js` — interactivity, theme management, language switching, speech synthesis, and privacy preferences
- `assets/` — image assets used in the site

## Key features

- Responsive hero, about, skills, experience, education, tools, and contact sections
- Dark/light mode toggle with local preference persistence
- Automatic browser language detection with Finnish and English support
- Manual language switch buttons that override auto-detection
- Read aloud feature using the browser SpeechSynthesis API
- Readable / dyslexia-friendly mode with larger spacing and Lexend font support
- Minimal privacy banner and modal with consent persistence in `localStorage`
- Accessible navigation, ARIA labels, and keyboard-friendly controls

## Running locally

Open the project using a local server for best browser compatibility.

### Python

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deploying

1. Commit all files to your repository.
2. Push to the `main` branch.
3. Enable GitHub Pages for the `main` branch and root folder.
4. Visit the published Pages URL.

## Editing content

Update the content directly in `index.html` for this portfolio project. The page is currently built as a stable site template rather than a content-driven markdown system.

## Notes

- The site keeps user preferences for theme, language, readable mode, and privacy consent in `localStorage`.
- The read aloud feature uses browser support for `speechSynthesis`; if unsupported, it disables cleanly.
- The design preserves the existing layout and navigation while improving usability and accessibility.
