(function () {
  const sourcePath = "/cv/public.en.md";
  const content = document.getElementById("cvContent");
  const printButton = document.getElementById("printCv");

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function linkify(value) {
    const escaped = escapeHtml(value);
    return escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, label, href) {
      const safeHref = String(href).trim();
      if (!/^(https:\/\/|mailto:)/.test(safeHref)) return label;
      return `<a href="${escapeHtml(safeHref)}">${label}</a>`;
    });
  }

  function parseMarkdown(markdown) {
    const frontmatter = {};
    let body = markdown.trim();
    const match = body.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);

    if (match) {
      match[1].split(/\r?\n/).forEach(function (line) {
        const separator = line.indexOf(":");
        if (separator === -1) return;
        const key = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim();
        if (key) frontmatter[key] = value;
      });
      body = match[2].trim();
    }

    return { frontmatter, body };
  }

  function renderBody(markdown) {
    const lines = markdown.split(/\r?\n/);
    const html = [];
    let paragraph = [];
    let listOpen = false;

    function flushParagraph() {
      if (!paragraph.length) return;
      html.push(`<p>${linkify(paragraph.join(" "))}</p>`);
      paragraph = [];
    }

    function closeList() {
      if (!listOpen) return;
      html.push("</ul>");
      listOpen = false;
    }

    lines.forEach(function (line) {
      const trimmed = line.trim();

      if (!trimmed) {
        flushParagraph();
        closeList();
        return;
      }

      if (trimmed.startsWith("## ")) {
        flushParagraph();
        closeList();
        html.push(`<h2>${escapeHtml(trimmed.slice(3))}</h2>`);
        return;
      }

      if (trimmed.startsWith("- ")) {
        flushParagraph();
        if (!listOpen) {
          html.push("<ul>");
          listOpen = true;
        }
        html.push(`<li>${linkify(trimmed.slice(2))}</li>`);
        return;
      }

      paragraph.push(trimmed);
    });

    flushParagraph();
    closeList();
    return html.join("");
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node && value) node.textContent = value;
  }

  function setLink(id, href, label) {
    const node = document.getElementById(id);
    if (!node || !href) return;
    node.innerHTML = `<a href="${escapeHtml(href)}">${escapeHtml(label || href)}</a>`;
  }

  function applyFrontmatter(data) {
    setText("cvName", data.name);
    setText("cvTitle", data.title);
    setText("cvLocation", data.location);
    setText("cvUpdated", data.updated);
    setLink("cvWebsite", data.website, data.website?.replace(/^https:\/\/(www\.)?/, ""));
    setLink("cvLinkedin", data.linkedin, data.linkedin?.replace(/^https:\/\/(www\.)?/, ""));

    const emailMatch = String(data.email || "").match(/\[([^\]]+)\]\((mailto:[^)]+)\)/);
    if (emailMatch) setLink("cvEmail", emailMatch[2], emailMatch[1]);
  }

  async function loadCv() {
    try {
      const response = await fetch(sourcePath, { cache: "no-store" });
      if (!response.ok) throw new Error("CV source could not be loaded.");

      const markdown = await response.text();
      const parsed = parseMarkdown(markdown);
      applyFrontmatter(parsed.frontmatter);
      content.innerHTML = renderBody(parsed.body);
    } catch (error) {
      content.innerHTML = '<p class="panel-copy">CV could not be loaded. Please use the contact page instead.</p>';
    }
  }

  printButton?.addEventListener("click", function () {
    window.print();
  });

  loadCv();
})();
