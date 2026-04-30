(function () {
  if (document.body?.dataset.page !== 'home') return;

  const languageGroups = [
    { key: 'FBD', terms: ['FBD', 'PLC logic', 'Interlocks', 'Permissives', 'State logic', 'Sequencing', 'Safety awareness'] },
    { key: 'ST', terms: ['ST', 'Structured Text', 'TwinCAT', 'CODESYS', 'OpenPLC', 'PLC'] },
    { key: 'Python', terms: ['Python', 'Python Tools', 'Webots'] },
    { key: 'C++', terms: ['C++', 'Cpp', 'C/C++'] },
  ];

  const systemGroups = [
    { key: 'TwinCAT', ecosystem: 'twincat-beckhoff', terms: ['TwinCAT', 'Beckhoff'] },
    { key: 'Siemens', ecosystem: 'siemens-tia', terms: ['Siemens', 'TIA'] },
    { key: 'Webots', ecosystem: 'webots-robotics', terms: ['Webots', 'Robotics', 'Robot'] },
    { key: 'Excel', ecosystem: 'excel-tools', terms: ['Excel', 'Spreadsheet'] },
  ];

  const translations = {
    en: {
      languagesEyebrow: 'Technical footprint',
      languagesTitle: 'Programming languages used across the portfolio.',
      systemsTitle: 'Systems and tools used across the portfolio.',
      count: 'projects',
      shortcutEyebrow: 'System shortcuts',
      shortcutTitle: 'Jump directly into a project system.',
      shortcutCopy: 'Fast links to the project areas recruiters usually want to scan first.',
      open: 'Open projects',
    },
    fi: {
      languagesEyebrow: 'Tekninen jalanjälki',
      languagesTitle: 'Ohjelmointikielet, joita portfolio-projekteissa käytetään.',
      systemsTitle: 'Järjestelmät ja työkalut, joita portfolio-projekteissa käytetään.',
      count: 'projektia',
      shortcutEyebrow: 'Järjestelmäpikavalinnat',
      shortcutTitle: 'Siirry suoraan projektijärjestelmään.',
      shortcutCopy: 'Nopeat linkit projektialueisiin, joita rekrytoija todennäköisesti katsoo ensin.',
      open: 'Avaa projektit',
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
      project.summary,
      project.intro,
      ...(project.technologies || []),
      ...(project.skills || []),
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
    const rows = groups.map((group) => ({ ...group, count: countFor(group) }));
    const max = Math.max(1, ...rows.map((row) => row.count));
    return rows.map((row) => ({ ...row, fill: Math.max(8, Math.round((row.count / max) * 100)) }));
  }

  function renderCapabilityRows(target, rows, label) {
    if (!target) return;
    target.innerHTML = rows.map((row) => `
      <div class="capability-row">
        <div class="capability-row-top">
          <span>${row.key}</span>
          <span class="capability-count">${row.count} ${label}</span>
        </div>
        <div class="capability-bar" aria-hidden="true"><span class="capability-bar-fill" style="--fill:${row.fill}%"></span></div>
      </div>
    `).join('');
  }

  function renderShortcuts(target, rows, label, openLabel) {
    if (!target) return;
    target.innerHTML = rows.map((row) => `
      <a class="system-shortcut-card" href="/projects/?ecosystem=${encodeURIComponent(row.ecosystem || row.key.toLowerCase())}">
        <div class="system-shortcut-header">
          <div>
            <p class="eyebrow">${row.key}</p>
            <h3>${row.key}</h3>
          </div>
          <span class="system-shortcut-count">${row.count}</span>
        </div>
        <p>${row.count} ${label} · ${openLabel}</p>
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

    const totalLanguageHits = languageRows.reduce((sum, row) => sum + row.count, 0);
    const totalSystemHits = systemRows.reduce((sum, row) => sum + row.count, 0);
    setText('[data-home-language-total]', String(totalLanguageHits));
    setText('[data-home-system-total]', String(totalSystemHits));

    renderCapabilityRows(document.querySelector('[data-home-language-bars]'), languageRows, t.count);
    renderCapabilityRows(document.querySelector('[data-home-system-bars]'), systemRows, t.count);
    renderShortcuts(document.querySelector('[data-home-system-shortcuts]'), systemRows, t.count, t.open);
  }

  function schedule() {
    window.setTimeout(render, 0);
    window.setTimeout(render, 120);
    window.setTimeout(render, 500);
  }

  schedule();
  document.getElementById('langToggle')?.addEventListener('click', schedule);
}());
