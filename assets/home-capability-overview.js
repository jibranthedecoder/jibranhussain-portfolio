(function () {
  if (document.body?.dataset.page !== 'home') return;

  const languageGroups = [
    { key: 'FBD', query: 'FBD', terms: ['FBD', 'Function Block', 'PLC logic', 'Interlocks', 'Permissives', 'State logic', 'Sequencing', 'Safety awareness'] },
    { key: 'ST', query: 'ST Structured Text', terms: ['ST', 'Structured Text', 'TwinCAT', 'CODESYS', 'OpenPLC', 'PLC'] },
    { key: 'Python', query: 'Python', terms: ['Python', 'Python Tools', 'Webots'] },
    { key: 'C++', query: 'C++', terms: ['C++', 'Cpp', 'C/C++'] },
  ];

  const systemGroups = [
    { key: 'TwinCAT', query: 'TwinCAT Beckhoff', ecosystem: 'twincat-beckhoff', terms: ['TwinCAT', 'Beckhoff'] },
    { key: 'Siemens', query: 'Siemens TIA', ecosystem: 'siemens-tia', terms: ['Siemens', 'TIA'] },
    { key: 'Webots', query: 'Webots robotics', ecosystem: 'webots-robotics', terms: ['Webots', 'Robotics', 'Robot'] },
    { key: 'Excel', query: 'Excel', ecosystem: 'excel-tools', terms: ['Excel', 'Spreadsheet'] },
  ];

  const translations = {
    en: {
      languagesEyebrow: 'Technical footprint',
      languagesTitle: 'Programming language share in portfolio projects.',
      systemsTitle: 'System and tool share in portfolio projects.',
      projects: 'projects',
      ofPortfolio: 'of portfolio',
      shortcutEyebrow: 'System shortcuts',
      shortcutTitle: 'Jump directly into a project system.',
      shortcutCopy: 'Each card opens the project page with the search already filled for that system.',
      open: 'Open filtered projects',
    },
    fi: {
      languagesEyebrow: 'Tekninen jalanjälki',
      languagesTitle: 'Ohjelmointikielten osuus portfolio-projekteissa.',
      systemsTitle: 'Järjestelmien ja työkalujen osuus portfolio-projekteissa.',
      projects: 'projektia',
      ofPortfolio: 'portfoliosta',
      shortcutEyebrow: 'Järjestelmäpikavalinnat',
      shortcutTitle: 'Siirry suoraan projektijärjestelmään.',
      shortcutCopy: 'Kortti avaa projektisivun niin, että haku on valmiiksi täytetty kyseisellä järjestelmällä.',
      open: 'Avaa suodatetut projektit',
    },
  };

  function isFinnish() {
    try {
      if (window.localStorage.getItem('jh-language') === 'fi') return true;
    } catch (error) {}
    const langToggle = document.getElementById('langToggle');
    return Boolean(langToggle && langToggle.textContent.trim().toUpperCase() === 'EN');
  }

  function projects() {
    return Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  }

  function searchable(project) {
    return [
      project.title,
      project.category,
      project.ecosystem,
      project.status,
      project.statusLabel,
      project.summary,
      project.intro,
      project.problem,
      project.overview,
      ...(project.technologies || []),
      ...(project.skills || []),
      ...(project.outcomes || []),
    ].join(' ').toLowerCase();
  }

  function countFor(group) {
    const data = projects();
    const exact = group.ecosystem ? data.filter((project) => project.ecosystem === group.ecosystem).length : 0;
    const termCount = data.filter((project) => {
      const haystack = searchable(project);
      return group.terms.some((term) => haystack.includes(term.toLowerCase()));
    }).length;
    return Math.max(exact, termCount);
  }

  function counts(groups) {
    const data = projects();
    const total = Math.max(1, data.length);
    return groups.map((group) => {
      const count = countFor(group);
      const percent = Math.round((count / total) * 100);
      return { ...group, count, percent, fill: Math.max(count > 0 ? 8 : 0, percent) };
    });
  }

  function projectSearchUrl(query) {
    return `/projects/?q=${encodeURIComponent(query)}`;
  }

  function renderCapabilityRows(target, rows, t) {
    if (!target) return;
    target.innerHTML = rows.map((row) => `
      <a class="capability-row" href="${projectSearchUrl(row.query || row.key)}" aria-label="${row.key}: ${row.percent}%">
        <div class="capability-row-top">
          <span class="capability-name">${row.key}</span>
          <span class="capability-percent">${row.percent}%</span>
        </div>
        <div class="capability-bar" aria-hidden="true"><span class="capability-bar-fill" style="--fill:${row.fill}%"></span></div>
        <div class="capability-row-meta">${row.count} ${t.projects} · ${row.percent}% ${t.ofPortfolio}</div>
      </a>
    `).join('');
  }

  function renderShortcuts(target, rows, t) {
    if (!target) return;
    target.innerHTML = rows.map((row) => `
      <a class="system-shortcut-card" href="${projectSearchUrl(row.query || row.key)}">
        <div class="system-shortcut-header">
          <div>
            <p class="eyebrow">${row.key}</p>
            <h3>${row.key}</h3>
          </div>
          <span class="system-shortcut-count">${row.count}</span>
        </div>
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
    const languageRows = counts(languageGroups);
    const systemRows = counts(systemGroups);

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
