(function () {
  if (document.body?.dataset.page !== 'home') return;

  const translations = {
    en: {
      languagesEyebrow: 'Technical footprint',
      languagesTitle: 'PLC and programming language share in published portfolio projects.',
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
      languagesTitle: 'PLC- ja ohjelmointikielten osuus julkaistuissa portfolio-projekteissa.',
      systemsTitle: 'Järjestelmien ja työkalujen osuus julkaistuissa portfolio-projekteissa.',
      projects: 'projektia',
      ofPortfolio: 'julkaistuista töistä',
      shortcutEyebrow: 'Järjestelmäpikavalinnat',
      shortcutTitle: 'Siirry suoraan projektijärjestelmään.',
      shortcutCopy: 'Kortti avaa projektisivun niin, että haku on valmiiksi täytetty kyseisellä järjestelmällä.',
      open: 'Avaa suodatetut projektit',
    },
  };

  const languageAliases = {
    'structured text': 'ST',
    st: 'ST',
    fbd: 'FBD',
    graph: 'GRAPH',
    python: 'Python',
    'c++': 'C++',
    cpp: 'C++',
  };

  const allowedLanguages = new Set(['FBD', 'GRAPH', 'ST', 'Python', 'C++']);
  const languageOrder = ['FBD', 'GRAPH', 'ST', 'Python', 'C++'];
  const systemOrder = ['Siemens', 'TwinCAT', 'Webots', 'Excel', 'CODESYS', 'OpenPLC'];

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

  function prettyName(value) {
    return String(value || '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
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
    const explicit = project.system || project.tool || project.platform;
    if (explicit) return prettyName(explicit);

    const ecosystem = String(project.ecosystem || 'Other').toLowerCase();
    if (ecosystem.includes('twincat') || ecosystem.includes('beckhoff')) return 'TwinCAT';
    if (ecosystem.includes('siemens') || ecosystem.includes('tia')) return 'Siemens';
    if (ecosystem.includes('webots')) return 'Webots';
    if (ecosystem.includes('excel') || ecosystem.includes('spreadsheet')) return 'Excel';
    if (ecosystem.includes('codesys')) return 'CODESYS';
    if (ecosystem.includes('openplc')) return 'OpenPLC';
    return prettyName(project.ecosystem || 'Other');
  }

  function rowsFromProjects(kind) {
    const data = projects();
    const total = Math.max(1, data.length);
    const map = new Map();

    data.forEach((project) => {
      const keys = kind === 'language' ? projectLanguages(project) : [projectSystem(project)];
      Array.from(new Set(keys)).forEach((key) => {
        if (!key) return;
        map.set(key, (map.get(key) || 0) + 1);
      });
    });

    const order = kind === 'language' ? languageOrder : systemOrder;
    return Array.from(map.entries())
      .map(([key, count]) => {
        const percent = Math.round((count / total) * 100);
        return { key, query: key, count, percent, fill: Math.max(count > 0 ? 8 : 0, percent) };
      })
      .sort((a, b) => {
        const ai = order.indexOf(a.key);
        const bi = order.indexOf(b.key);
        if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
        return a.key.localeCompare(b.key);
      });
  }

  function projectSearchUrl(query) {
    return `/projects/?q=${encodeURIComponent(query)}`;
  }

  function renderCapabilityRows(target, rows, t) {
    if (!target) return;
    target.innerHTML = rows.map((row) => `
      <a class="capability-row" href="${projectSearchUrl(row.query || row.key)}" aria-label="${row.key}: ${row.percent}%">
        <div class="capability-row-top"><span class="capability-name">${row.key}</span><span class="capability-percent">${row.percent}%</span></div>
        <div class="capability-bar" aria-hidden="true"><span class="capability-bar-fill" style="--fill:${row.fill}%"></span></div>
        <div class="capability-row-meta">${row.count} ${t.projects} · ${row.percent}% ${t.ofPortfolio}</div>
      </a>
    `).join('');
  }

  function renderShortcuts(target, rows, t) {
    if (!target) return;
    target.innerHTML = rows.map((row) => `
      <a class="system-shortcut-card" href="${projectSearchUrl(row.query || row.key)}">
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
    const languageRows = rowsFromProjects('language');
    const systemRows = rowsFromProjects('system');

    setText('[data-home-capability-eyebrow]', t.languagesEyebrow);
    setText('[data-home-languages-title]', t.languagesTitle);
    setText('[data-home-systems-title]', t.systemsTitle);
    setText('[data-home-shortcut-eyebrow]', t.shortcutEyebrow);
    setText('[data-home-shortcut-title]', t.shortcutTitle);
    setText('[data-home-shortcut-copy]', t.shortcutCopy);
    setText('[data-home-language-total]', '%');
    setText('[data-home-system-total]', '%');

    renderCapabilityRows(document.querySelector('[data-home-language-bars]'), languageRows, t);
    renderCapabilityRows(document.querySelector('[data-home-system-bars]'), systemRows, t);
    renderShortcuts(document.querySelector('[data-home-system-shortcuts]'), systemRows, t);
  }

  function schedule() {
    window.setTimeout(render, 0);
    window.setTimeout(render, 120);
    window.setTimeout(render, 500);
  }

  schedule();
  document.getElementById('langToggle')?.addEventListener('click', schedule);
}());
