(function () {
  if (document.body?.dataset.page !== 'home') return;

  const translations = {
    en: {
      languagesEyebrow: 'Technical footprint',
      languagesTitle: 'Programming language share in published portfolio projects.',
      systemsTitle: 'System and tool share in published portfolio projects.',
      projects: 'projects',
      ofPortfolio: 'of published work',
      shortcutEyebrow: 'System shortcuts',
      shortcutTitle: 'Jump directly into a project system.',
      shortcutCopy: 'Each card opens the project page with the search already filled for that system.',
      open: 'Open filtered projects',
    },
    fi: {
      languagesEyebrow: 'Tekninen jalanjälki',
      languagesTitle: 'Ohjelmointikielten osuus julkaistuissa portfolio-projekteissa.',
      systemsTitle: 'Järjestelmien ja työkalujen osuus julkaistuissa portfolio-projekteissa.',
      projects: 'projektia',
      ofPortfolio: 'julkaistuista töistä',
      shortcutEyebrow: 'Järjestelmäpikavalinnat',
      shortcutTitle: 'Siirry suoraan projektijärjestelmään.',
      shortcutCopy: 'Kortti avaa projektisivun niin, että haku on valmiiksi täytetty kyseisellä järjestelmällä.',
      open: 'Avaa suodatetut projektit',
    },
  };

  const allowedLanguages = new Set(['FBD', 'ST', 'Python', 'C++']);
  const languageAliases = {
    'structured text': 'ST',
    st: 'ST',
    fbd: 'FBD',
    python: 'Python',
    'c++': 'C++',
    cpp: 'C++',
  };

  const languageOrder = ['FBD', 'ST', 'Python', 'C++'];
  const visibleSystemOrder = ['TwinCAT', 'Siemens', 'Webots', 'Excel'];

  function isFinnish() {
    try {
      if (window.localStorage.getItem('jh-language') === 'fi') return true;
    } catch (error) {}
    const langToggle = document.getElementById('langToggle');
    return Boolean(langToggle && langToggle.textContent.trim().toUpperCase() === 'EN');
  }

  function normalizeKey(value) {
    return String(value || '').trim().toLowerCase();
  }

  function projects() {
    const all = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
    return all.filter((project) => Boolean(project && project.github));
  }

  function projectLanguages(project) {
    const explicit = project.languages || project.programmingLanguages || project.language || project.programmingLanguage;
    const values = Array.isArray(explicit) ? explicit : explicit ? [explicit] : [];
    return Array.from(new Set(values
      .map((item) => languageAliases[normalizeKey(item)] || String(item || '').trim())
      .filter((item) => allowedLanguages.has(item))));
  }

  function projectSystem(project) {
    if (project.system && visibleSystemOrder.includes(project.system)) return project.system;
    const ecosystem = String(project.ecosystem || '').toLowerCase();
    if (ecosystem.includes('twincat') || ecosystem.includes('beckhoff')) return 'TwinCAT';
    if (ecosystem.includes('siemens') || ecosystem.includes('tia')) return 'Siemens';
    if (ecosystem.includes('webots')) return 'Webots';
    if (ecosystem.includes('excel')) return 'Excel';
    return '';
  }

  function systemForShortcut(project) {
    if (project.system) return project.system;
    return projectSystem(project) || String(project.ecosystem || 'Other').replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function rowsFromProjects(kind) {
    const data = projects();
    const total = Math.max(1, data.length);
    const map = new Map();

    data.forEach((project) => {
      const keys = kind === 'language' ? projectLanguages(project) : [projectSystem(project)].filter(Boolean);
      Array.from(new Set(keys)).forEach((key) => map.set(key, (map.get(key) || 0) + 1));
    });

    const order = kind === 'language' ? languageOrder : visibleSystemOrder;
    return order
      .map((key) => {
        const count = map.get(key) || 0;
        const percent = Math.round((count / total) * 100);
        return { key, query: key, count, percent, fill: Math.max(count > 0 ? 8 : 0, percent) };
      })
      .filter((row) => row.count > 0);
  }

  function shortcutRows() {
    const data = projects();
    const total = Math.max(1, data.length);
    const map = new Map();
    data.forEach((project) => {
      const key = systemForShortcut(project);
      if (!key) return;
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([key, count]) => ({ key, query: key, count, percent: Math.round((count / total) * 100) }))
      .sort((a, b) => a.key.localeCompare(b.key));
  }

  function projectSearchUrl(query) {
    return `/projects/?q=${encodeURIComponent(query)}`;
  }

  function renderCapabilityRows(target, rows, t) {
    if (!target) return;
    target.innerHTML = rows.map((row) => `
      <a class="capability-row" href="${projectSearchUrl(row.query)}" aria-label="${row.key}: ${row.percent}%">
        <div class="capability-row-top"><span class="capability-name">${row.key}</span><span class="capability-percent">${row.percent}%</span></div>
        <div class="capability-bar" aria-hidden="true"><span class="capability-bar-fill" style="--fill:${row.fill}%"></span></div>
        <div class="capability-row-meta">${row.count} ${t.projects} · ${row.percent}% ${t.ofPortfolio}</div>
      </a>
    `).join('');
  }

  function renderShortcuts(target, rows, t) {
    if (!target) return;
    target.innerHTML = rows.map((row) => `
      <a class="system-shortcut-card" href="${projectSearchUrl(row.query)}">
        <div class="system-shortcut-header"><div><p class="eyebrow">${row.key}</p><h3>${row.key}</h3></div><span class="system-shortcut-count">${row.count}</span></div>
        <p>${row.count} ${t.projects} · ${row.percent}% · ${t.open}</p>
      </a>
    `).join('');
  }

  function setText(selector, value) {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  }

  function render() {
    const lang = isFinnish() ? 'fi' : 'en';
    const t = translations[lang];
    setText('[data-home-capability-eyebrow]', t.languagesEyebrow);
    setText('[data-home-languages-title]', t.languagesTitle);
    setText('[data-home-systems-title]', t.systemsTitle);
    setText('[data-home-shortcut-eyebrow]', t.shortcutEyebrow);
    setText('[data-home-shortcut-title]', t.shortcutTitle);
    setText('[data-home-shortcut-copy]', t.shortcutCopy);
    setText('[data-home-language-total]', '%');
    setText('[data-home-system-total]', '%');
    renderCapabilityRows(document.querySelector('[data-home-language-bars]'), rowsFromProjects('language'), t);
    renderCapabilityRows(document.querySelector('[data-home-system-bars]'), rowsFromProjects('system'), t);
    renderShortcuts(document.querySelector('[data-home-system-shortcuts]'), shortcutRows(), t);
  }

  function schedule() {
    window.setTimeout(render, 0);
    window.setTimeout(render, 120);
  }

  if (window.PORTFOLIO_DATA_READY) schedule();
  else window.addEventListener('portfolio:data-ready', schedule, { once: true });
  document.getElementById('langToggle')?.addEventListener('click', schedule);
}());
