#!/usr/bin/env node
/**
 * Generate assets/Jibran-Hussain-CV-EN.pdf from cv/public.en.md
 *
 * Uses Playwright + Chromium to render HTML/CSS → PDF.
 * This produces professional, typographically correct output
 * that matches the approved manual CV reference.
 *
 * Run:     node tools/gen-cv-pdf.js
 * Prereq:  npm install  (Playwright already installed for QA)
 */

'use strict';

const path = require('path');
const fs   = require('fs');

const REPO   = path.join(__dirname, '..');
const SOURCE = path.join(REPO, 'cv', 'public.en.md');
const OUTPUT = path.join(REPO, 'assets', 'Jibran-Hussain-CV-EN.pdf');
const TMP    = path.join(REPO, 'assets', '_cv-render.html');

// ---------------------------------------------------------------------------
// Markdown parser
// ---------------------------------------------------------------------------

function parseFrontmatter(raw) {
  const m = raw.trim().match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
  if (!m) return { fm: {}, body: raw.trim() };
  const fm = {};
  for (const line of m[1].split('\n')) {
    const sep = line.indexOf(':');
    if (sep < 1) continue;
    const k = line.slice(0, sep).trim();
    const v = line.slice(sep + 1).trim();
    if (k) fm[k] = v;
  }
  return { fm, body: m[2].trim() };
}

function parseBody(text) {
  const flat = [];
  let bullets = null;
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) {
      if (bullets) { flat.push({ type: 'bullets', items: bullets }); bullets = null; }
      continue;
    }
    if (line.startsWith('## ')) {
      if (bullets) { flat.push({ type: 'bullets', items: bullets }); bullets = null; }
      flat.push({ type: 'h2', text: line.slice(3).trim() });
    } else if (line.startsWith('- ')) {
      if (!bullets) bullets = [];
      bullets.push(line.slice(2).trim());
    } else {
      if (bullets) { flat.push({ type: 'bullets', items: bullets }); bullets = null; }
      flat.push({ type: 'para', text: line });
    }
  }
  if (bullets) flat.push({ type: 'bullets', items: bullets });

  // Group into sections: [ { title, content[] }, ... ]
  const sections = [];
  let cur = null;
  for (const node of flat) {
    if (node.type === 'h2') {
      if (cur) sections.push(cur);
      cur = { title: node.text, content: [] };
    } else if (cur) {
      cur.content.push(node);
    }
  }
  if (cur) sections.push(cur);
  return sections;
}

// ---------------------------------------------------------------------------
// HTML / markup helpers
// ---------------------------------------------------------------------------

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function inlineMarkup(text) {
  let s = esc(text);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const h = href.trim();
    if (!/^(https?:\/\/|mailto:)/.test(h)) return esc(label);
    return `<a href="${esc(h)}">${esc(label)}</a>`;
  });
  return s;
}

/** "Category: rest…" → "<strong>Category:</strong> rest…" */
function autoBoldLabel(text) {
  const m = text.match(/^([^:<.(]{2,50}):\s+(.+)/s);
  if (m) return `<strong>${esc(m[1])}:</strong> ${inlineMarkup(m[2])}`;
  return inlineMarkup(text);
}

// ---------------------------------------------------------------------------
// Build HTML document
// ---------------------------------------------------------------------------

function buildHtml(fm, sections) {
  const name     = fm.name    ?? '';
  const title    = fm.title   ?? '';
  const location = fm.location ?? '';
  const email    = (fm.email ?? '').replace(/^\[([^\]]+)\].*$/, '$1');
  const website  = (fm.website  ?? '').replace(/^https?:\/\/(www\.)?/, '');
  const linkedin = (fm.linkedin ?? '').replace(/^https?:\/\/(www\.)?/, '');
  const updated  = fm.updated ?? '';

  const contactItems = [
    { label: 'Location', value: location },
    { label: 'Email',    value: email    },
    { label: 'Website',  value: website  },
    { label: 'LinkedIn', value: linkedin },
    { label: 'Updated',  value: updated  },
  ].filter(r => r.value)
   .map(r => `
    <div class="ci">
      <span class="ci-label">${esc(r.label)}</span>
      <span class="ci-value">${esc(r.value)}</span>
    </div>`).join('');

  const bodyHtml = sections.map(sec => {
    const contentHtml = sec.content.map(node => {
      if (node.type === 'para') {
        return `<p>${inlineMarkup(node.text)}</p>`;
      }
      if (node.type === 'bullets') {
        const items = node.items
          .map(item => `<li>${autoBoldLabel(item)}</li>`)
          .join('\n          ');
        return `<ul>${items}</ul>`;
      }
      return '';
    }).join('\n');

    return `
  <section class="cv-section">
    <h2>${esc(sec.title)}</h2>
    <div class="section-rule"></div>
    ${contentHtml}
  </section>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width">
<style>
/* ── Reset ──────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── Page ───────────────────────────────────────────────────── */
@page { size: A4; margin: 0; }

html { background: #fff; }

body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 9.6pt;
  line-height: 1.45;
  color: #333;
  background: #fff;
  padding: 14mm 16mm;
  width: 210mm;
  min-height: 297mm;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ── Name ───────────────────────────────────────────────────── */
.cv-name {
  font-size: 27pt;
  font-weight: 800;
  letter-spacing: -0.4pt;
  color: #111;
  line-height: 1.0;
  margin-bottom: 4pt;
}

/* ── Subtitle ───────────────────────────────────────────────── */
.cv-subtitle {
  font-size: 11pt;
  font-weight: 700;
  color: #555;
  letter-spacing: 0.01em;
  margin-bottom: 9pt;
}

/* ── Dividers ───────────────────────────────────────────────── */
.rule-heavy {
  border: none;
  border-top: 0.65pt solid #ccc;
  margin-bottom: 7pt;
}
.rule-heavy.below-contact {
  margin-top: 7pt;
  margin-bottom: 0;
}

/* ── Contact grid ───────────────────────────────────────────── */
.cv-contact {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5pt 24pt;
}

.ci { display: flex; flex-direction: column; }

.ci-label {
  font-size: 6.8pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: #aaa;
  margin-bottom: 1.5pt;
}

.ci-value {
  font-size: 8.8pt;
  color: #333;
  line-height: 1.3;
}

/* ── Sections ───────────────────────────────────────────────── */
.cv-section {
  margin-top: 13pt;
  page-break-inside: avoid;
}

.cv-section h2 {
  font-size: 12.5pt;
  font-weight: 800;
  color: #1a2128;
  letter-spacing: 0.01em;
  margin-bottom: 3.5pt;
}

.section-rule {
  border-top: 0.3pt solid #ccc;
  margin-bottom: 6pt;
}

/* ── Paragraphs ─────────────────────────────────────────────── */
.cv-section p {
  font-size: 9.6pt;
  color: #444;
  line-height: 1.55;
}

/* ── Bullet lists ───────────────────────────────────────────── */
.cv-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cv-section li {
  font-size: 9.6pt;
  color: #444;
  line-height: 1.5;
  padding-left: 10pt;
  position: relative;
  margin-bottom: 3.5pt;
  page-break-inside: avoid;
}

.cv-section li:last-child { margin-bottom: 0; }

.cv-section li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: #bbb;
  font-weight: 300;
}

.cv-section li strong {
  color: #1a1a1a;
  font-weight: 700;
}

/* ── Links ──────────────────────────────────────────────────── */
a { color: #1a5276; text-decoration: none; }
</style>
</head>
<body>

<h1 class="cv-name">${esc(name)}</h1>
<p class="cv-subtitle">${esc(title)}</p>
<hr class="rule-heavy">
<div class="cv-contact">${contactItems}
</div>
<hr class="rule-heavy below-contact">
${bodyHtml}

</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error(`Source not found: ${SOURCE}`);
    process.exit(1);
  }

  const { chromium } = require('playwright');

  const raw = fs.readFileSync(SOURCE, 'utf8');
  const { fm, body } = parseFrontmatter(raw);
  const sections = parseBody(body);
  const html = buildHtml(fm, sections);

  fs.mkdirSync(path.dirname(TMP), { recursive: true });
  fs.writeFileSync(TMP, html, 'utf8');

  const browser = await chromium.launch();
  const page    = await browser.newPage();

  const fileUrl = 'file:///' + TMP.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(150);

  await page.pdf({
    path:            OUTPUT,
    format:          'A4',
    printBackground: true,
    margin:          { top: '0', bottom: '0', left: '0', right: '0' },
  });

  await browser.close();
  fs.unlinkSync(TMP);

  const kb = Math.round(fs.statSync(OUTPUT).size / 1024);
  console.log(`OK  assets/Jibran-Hussain-CV-EN.pdf  (${kb} KB)`);
}

main().catch(err => { console.error(err.message); process.exit(1); });
