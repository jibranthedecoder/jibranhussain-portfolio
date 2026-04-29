/* eslint-disable no-console */
/**
 * Build output for Cloudflare Pages.
 *
 * Copies only the static site files into `dist/` so the deploy does not include
 * dev artifacts like `.tools/`, `node_modules/`, Playwright outputs, etc.
 */

const fs = require("fs/promises");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const COPY_DIRS = ["about", "assets", "contact", "cv", "projects", "docs"];
const COPY_FILES = [
  ".nojekyll",
  "_headers",
  "404.html",
  "index.html",
  "robots.txt",
  "sitemap.xml",
  "project-data.js",
  "script.js",
  "styles.css",
];

async function ensureEmptyDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

async function copyFileIfExists(relPath) {
  const src = path.join(ROOT, relPath);
  const dest = path.join(DIST, relPath);
  try {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
  } catch (err) {
    if (err && (err.code === "ENOENT" || err.code === "ENOTDIR")) return;
    throw err;
  }
}

async function copyDir(relDir) {
  const src = path.join(ROOT, relDir);
  const dest = path.join(DIST, relDir);
  await fs.cp(src, dest, {
    recursive: true,
    force: true,
    // Avoid copying hidden VCS metadata if it exists inside asset dirs.
    filter: (source) => {
      const base = path.basename(source);
      if (base === ".DS_Store") return false;
      if (base === ".git") return false;
      return true;
    },
  });
}

async function main() {
  await ensureEmptyDir(DIST);

  await Promise.all(COPY_FILES.map(copyFileIfExists));
  for (const dir of COPY_DIRS) {
    await copyDir(dir);
  }

  console.log(`Pages build complete: ${path.relative(ROOT, DIST)}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
