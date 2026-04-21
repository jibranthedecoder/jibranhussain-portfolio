(function () {
  const languageStorageKey = "jh-language";
  const content = document.getElementById("cvContent");
  const langToggle = document.getElementById("cvLangToggle");
  const labels = {
    en: {
      toggle: "FI",
      back: "Back to Site",
      download: "Download English CV (PDF)",
      contact: "Contact",
      actions: "CV actions",
      details: "Contact details",
      location: "Location",
      email: "Email",
      website: "Website",
      updated: "Updated",
      loading: "Loading CV...",
      error: "CV could not be loaded. Please use the contact page instead.",
    },
    fi: {
      toggle: "EN",
      back: "Takaisin sivustolle",
      download: "Lataa englanninkielinen CV (PDF)",
      contact: "Yhteys",
      actions: "CV-toiminnot",
      details: "Yhteystiedot",
      location: "Sijainti",
      email: "Sähköposti",
      website: "Verkkosivu",
      updated: "Päivitetty",
      loading: "Ladataan CV:tä...",
      error: "CV:tä ei voitu ladata. Käytä yhteyssivua.",
    },
  };
  let currentLang = localStorage.getItem(languageStorageKey) === "fi" ? "fi" : "en";

  function t(key) {
    return labels[currentLang][key] || labels.en[key] || "";
  }

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

  function applyChrome() {
    document.documentElement.lang = currentLang;
    const actions = document.querySelector(".cv-actions");
    const meta = document.querySelector(".cv-meta");
    if (actions) actions.setAttribute("aria-label", t("actions"));
    if (meta) meta.setAttribute("aria-label", t("details"));
    if (langToggle) {
      langToggle.textContent = t("toggle");
      langToggle.setAttribute("aria-pressed", String(currentLang === "fi"));
    }
    setText("cvBackLink", t("back"));
    setText("cvDownloadLink", t("download"));
    setText("cvContactLink", t("contact"));
    setText("cvLocationLabel", t("location"));
    setText("cvEmailLabel", t("email"));
    setText("cvWebsiteLabel", t("website"));
    setText("cvUpdatedLabel", t("updated"));
  }

  async function loadCv() {
    applyChrome();
    content.innerHTML = `<p class="panel-copy">${escapeHtml(t("loading"))}</p>`;
    try {
      const sourcePath = currentLang === "fi" ? "/cv/public.fi.md" : "/cv/public.en.md";
      const response = await fetch(sourcePath, { cache: "no-store" });
      if (!response.ok) throw new Error("CV source could not be loaded.");

      const markdown = await response.text();
      const parsed = parseMarkdown(markdown);
      applyFrontmatter(parsed.frontmatter);
      content.innerHTML = renderBody(parsed.body);
    } catch (error) {
      content.innerHTML = `<p class="panel-copy">${escapeHtml(t("error"))}</p>`;
    }
  }

  langToggle?.addEventListener("click", function () {
    currentLang = currentLang === "fi" ? "en" : "fi";
    localStorage.setItem(languageStorageKey, currentLang);
    loadCv();
  });

  loadCv();
})();
