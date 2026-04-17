# Markdown-driven portfolio template

This repository is now a reusable portfolio website system where the layout is fixed and the content is driven entirely from `content.md`.

## What is included

- `index.html` — page template and structure
- `styles.css` — responsive design, dark mode, and polished section styles
- `script.js` — content loader, markdown parser, rendering logic, theme toggle
- `content.md` — single editable content file for the whole site
- `assets/` — asset folder for images

## How to edit content

Open `content.md` and update the values inside each section.

Example fields:

```md
# Basic Info
name: Your Name
headline: Electrical & Automation Engineering student
location: Finland
email: contact@example.com
linkedin: https://www.linkedin.com/in/example
github: https://github.com/example
resume: resume.pdf
cta_text: Contact me
cta_link: mailto:contact@example.com
```

Use lists for skills, services, languages, and more:

```md
# Skills
- PLC programming
- Electrical maintenance
- Control systems
```

Add structured content with objects for projects, experience, certifications, and FAQ:

```md
# Projects
- title: Control panel support
  description: Assisted with documentation and automation testing.
  link: https://example.com
```

## How to add new projects

1. Open `content.md`
2. Find the `# Projects` section
3. Add a new `- title:` block with `description:` and optional `link:`.

Example:

```md
- title: New maintenance project
  description: Supported a site visit with electrical checks and controls review.
  link: https://example.com
```

## Run locally

Because the site loads `content.md`, run a local server instead of opening the file directly.

### Python

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Commit all files to your repository.
2. Push to the `main` branch.
3. In GitHub repository settings, enable Pages for the `main` branch and root folder.
4. Visit the provided GitHub Pages URL.

## Customize colors and fonts

### Colors
You can set custom color variables inside `content.md` under the `# Colors` section.

Example:

```md
# Colors
primary_color: #2563eb
accent_color: #1d4ed8
background_color: #eef4fb
text_color: #0f172a
```

### Fonts
Edit the Google Fonts import in `index.html` and update font families in `styles.css`.

## Notes

- If a section has no content, it is hidden automatically.
- Add or remove sections in `content.md`; the template renders only what is available.
- Use `assets/` for images and update the paths in `content.md` if required.
