(function () {
  if (document.body?.dataset.page !== 'projects') return;

  const aliases = {
    twincat: 'twincat beckhoff plc st structured text automation',
    beckhoff: 'twincat beckhoff plc st structured text automation',
    siemens: 'siemens tia portal plc fbd graph automation simit plcsim wincc s7 1500',
    tia: 'siemens tia portal plc fbd graph automation simit plcsim wincc s7 1500',
    graph: 'siemens graph sequence plc automation batch process',
    simit: 'simit plcsim siemens simulation validation virtual commissioning',
    wincc: 'wincc hmi siemens operator panel visualization',
    webots: 'webots robotics robot python simulation thymio epuck e puck maze line dead reckoning',
    robotics: 'webots robotics robot python simulation thymio epuck e puck maze line dead reckoning',
    robot: 'webots robotics robot python simulation line following maze dead reckoning',
    excel: 'excel spreadsheet worksheet calculation calculator data analysis csv charts report reporting',
    spreadsheet: 'excel spreadsheet worksheet calculation calculator data analysis csv charts',
    data: 'data analysis csv spreadsheet excel sorting ranking validation results',
    election: 'election elections seat allocation dhondt d hondt vote votes candidate candidates party parties comparative figure ranking excel csv',
    elections: 'election elections seat allocation dhondt d hondt vote votes candidate candidates party parties comparative figure ranking excel csv',
    seat: 'seat allocation election dhondt d hondt comparative figure ranking selected elected',
    allocation: 'seat allocation election dhondt d hondt comparative figure ranking selected elected',
    dhondt: 'dhondt d hondt election seat allocation comparative figure party total candidate rank',
    hondt: 'dhondt d hondt election seat allocation comparative figure party total candidate rank',
    votes: 'vote votes election candidate party total ranking comparative figure',
    candidate: 'candidate candidates election vote votes party ranking elected',
    csv: 'csv data raw processed spreadsheet excel results',
    calculator: 'calculator calculation excel spreadsheet break even critical point interactive',
    python: 'python webots robotics tools simulation',
    fbd: 'fbd plc logic interlocks permissives siemens tia automation',
    st: 'st structured text twincat beckhoff codesys openplc plc',
    cpp: 'c++ cpp c programming',
    'c++': 'c++ cpp c programming',
    built: 'built build active valmis rakennettu case study',
    build: 'built build active in progress aktiivinen rakennus kesken',
    roadmap: 'roadmap suunnitteilla planned future',
  };

  const githubLinksBySlug = {};

  const preferredOrder = [
    'webots-robotics',
    'siemens-tia',
    'electrical-design',
    'python-tools',
    'codesys-openplc',
    'twincat-beckhoff',
    'excel-tools',
    'excel-spreadsheets',
    'excel',
    'other',
  ];

  let activeFilter = 'all';
  let selectedEcosystem = currentEcosystemFromUrl();

  function normalize(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/d['’`´]?hondt/g, 'dhondt')
      .replace(/\+/g, ' plus ')
      .replace(/[^a-z0-9åäö]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function isFinnish() {
    try {
      if (window.localStorage.getItem('jh-language') === 'fi') return true;
    } catch (error) {}
    const langToggle = document.getElementById('langToggle');
    return Boolean(langToggle && langToggle.textContent.trim().toUpperCase() === 'EN');
  }

  function currentQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || params.get('search') || '';
  }

  function currentEcosystemFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('ecosystem') || params.get('software') || '';
  }

  function allProjects() {
    return Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  }

  function projectHasPublicEvidence(project) {
    return Boolean(project && (project.github || githubLinksBySlug[project.slug] || project.status === 'build' || project.status === 'live'));
  }

  function projects() {
    return allProjects().filter(projectHasPublicEvidence);
  }

  function ecosystems() {
    return Array.isArray(window.PORTFOLIO_ECOSYSTEMS) ? window.PORTFOLIO_ECOSYSTEMS : [];
  }

  function ecosystemId(project) {
    if (!project?.ecosystem) return 'other';
    return project.ecosystem;
  }

  function ecosystemData(id) {
    return ecosystems().find((ecosystem) => ecosystem.id === id) || null;
  }

  function fallbackEcosystemTitle(id) {
    const titles = {
      'excel-tools': 'Excel / Data Analysis Tools',
      'excel-spreadsheets': 'Excel / Spreadsheets',
      excel: 'Excel / Spreadsheets',
      other: isFinnish() ? 'Muut' : 'Other',
    };
    return titles[id] || id.replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function projectBlob(project) {
    const ecosystem = ecosystemData(ecosystemId(project));
    const pieces = [
      project.slug,
      project.title,
      project.category,
      project.ecosystem,
      project.status,
      project.statusLabel,
      project.summary,
      project.intro,
      project.problem,
      project.overview,
      project.visual,
      project.why,
      project.github,
      project.system,
      ...(project.languages || []),
      ecosystem?.id,
      ecosystem?.title,
      ecosystem?.description,
      ...(project.technologies || []),
      ...(project.skills || []),
      ...(project.outcomes || []),
      ...(project.nextSteps || []),
      ...(project.evidence || []),
    ];
    return normalize(pieces.filter(Boolean).join(' '));
  }

  function expandedTerms(rawQuery) {
    const normalized = normalize(rawQuery);
    if (!normalized) return [];

    const baseTerms = normalized.split(' ').filter(Boolean);
    const expanded = [normalized, ...baseTerms];

    baseTerms.forEach((term) => {
      if (aliases[term]) expanded.push(...normalize(aliases[term]).split(' '));
    });

    Object.entries(aliases).forEach(([key, value]) => {
      if (normalized.includes(normalize(key))) expanded.push(...normalize(value).split(' '));
    });

    return Array.from(new Set(expanded.filter(Boolean)));
  }

  function projectMatchesSearch(project, query) {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return true;

    const blob = projectBlob(project);
    const directTerms = normalizedQuery.split(' ').filter(Boolean);
    if (directTerms.every((term) => blob.includes(term))) return true;

    const expanded = expandedTerms(query);
    return expanded.some((term) => blob.includes(term));
  }

  function projectMatchesFilter(project) {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'build') return project.status === 'build' || project.status === 'live';
    if (activeFilter === 'roadmap') return project.status === 'roadmap';
    return true;
  }

  function filteredProjects() {
    const input = document.getElementById('projectSearch');
    const query = input?.value.trim() || '';
    return projects().filter((project) => projectMatchesFilter(project) && projectMatchesSearch(project, query));
  }

  function groupedProjects() {
    const groups = new Map();
    filteredProjects().forEach((project) => {
      const key = ecosystemId(project);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(project);
    });

    return Array.from(groups.entries()).sort(([a], [b]) => {
      const aIndex = preferredOrder.indexOf(a);
      const bIndex = preferredOrder.indexOf(b);
      if (aIndex !== -1 || bIndex !== -1) return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
      return ecosystemTitle(a).localeCompare(ecosystemTitle(b));
    });
  }

  function statusLabel(project) {
    if (project.statusLabel) return project.statusLabel;
    if (project.status === 'roadmap') return isFinnish() ? 'Suunnitteilla' : 'Roadmap';
    if (project.status === 'live') return isFinnish() ? 'Julkaistu' : 'Live';
    if (project.status === 'build') return isFinnish() ? 'Rakennettu' : 'Built';
    return isFinnish() ? 'Rakennettu' : 'Built';
  }

  function caseStudyText() {
    return isFinnish() ? 'Avaa case study' : 'Open case study';
  }

  function githubText() {
    return isFinnish() ? 'GitHub-repository' : 'GitHub repository';
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function projectCard(project) {
    const github = project.github || githubLinksBySlug[project.slug] || '';
    const caseUrl = `/projects/${project.slug}/`;
    const tags = (project.technologies || []).slice(0, 6);

    return `
      <article class="project-card" data-project-slug="${escapeHtml(project.slug)}">
        <div class="project-card-top">
          <span class="status-badge">${escapeHtml(statusLabel(project))}</span>
          <span class="project-category">${escapeHtml(project.category || '')}</span>
        </div>
        <h3>${escapeHtml(project.title || project.slug)}</h3>
        <p class="project-summary">${escapeHtml(project.summary || project.intro || '')}</p>
        ${tags.length ? `<ul class="pill-list">${tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>` : ''}
        <div class="project-links project-card-actions-top">
          <a class="button button-primary" href="${caseUrl}">${caseStudyText()}</a>
          ${github ? `<a class="button button-secondary project-github-link" href="${escapeHtml(github)}" target="_blank" rel="noopener">${githubText()}</a>` : ''}
        </div>
      </article>
    `;
  }

  function ecosystemTitle(id) {
    return ecosystemData(id)?.title || fallbackEcosystemTitle(id);
  }

  function ecosystemDescription(id, count) {
    const description = ecosystemData(id)?.description;
    if (description) return description;
    return `${count} ${isFinnish() ? 'projektia' : count === 1 ? 'project' : 'projects'}`;
  }

  function categoryCard(ecosystemIdValue, grouped) {
    const builtCount = grouped.filter((project) => project.status === 'build' || project.status === 'live').length;
    const roadmapCount = grouped.filter((project) => project.status === 'roadmap').length;
    const countLabel = isFinnish()
      ? `${grouped.length} projektia`
      : `${grouped.length} ${grouped.length === 1 ? 'project' : 'projects'}`;
    const meta = [
      builtCount ? `${builtCount} ${isFinnish() ? 'rakennettu/kesken' : 'built/in progress'}` : '',
      roadmapCount ? `${roadmapCount} ${isFinnish() ? 'suunnitteilla' : 'roadmap'}` : '',
    ].filter(Boolean).join(' · ');

    return `
      <article class="project-category-card" data-ecosystem-card="${escapeHtml(ecosystemIdValue)}">
        <button class="project-category-button" type="button" data-ecosystem-select="${escapeHtml(ecosystemIdValue)}">
          <span class="project-category-kicker">${escapeHtml(countLabel)}</span>
          <strong>${escapeHtml(ecosystemTitle(ecosystemIdValue))}</strong>
          <span>${escapeHtml(ecosystemDescription(ecosystemIdValue, grouped.length))}</span>
          ${meta ? `<small>${escapeHtml(meta)}</small>` : ''}
        </button>
      </article>
    `;
  }

  function overviewHeading(totalCount) {
    return `
      <div class="project-ecosystem-heading project-category-intro">
        <h2>${isFinnish() ? 'Valitse ohjelmisto tai järjestelmä.' : 'Choose a software or system.'}</h2>
        <p class="panel-copy">${isFinnish()
          ? `Näytetään ensin kategoriat, jotta sivu pysyy kevyempänä. Yhteensä ${totalCount} projektia.`
          : `Categories load first so the page stays lighter. ${totalCount} projects available.`}</p>
      </div>
    `;
  }

  function projectsHeading(ecosystemIdValue, count) {
    return `
      <div class="project-ecosystem-heading project-selected-heading">
        <button class="button button-secondary" type="button" data-ecosystem-back>${isFinnish() ? 'Takaisin kategorioihin' : 'Back to categories'}</button>
        <div>
          <h2>${escapeHtml(ecosystemTitle(ecosystemIdValue))}</h2>
          <p class="panel-copy">${escapeHtml(ecosystemDescription(ecosystemIdValue, count))}</p>
        </div>
      </div>
    `;
  }

  function emptyText(query) {
    if (query) return isFinnish() ? 'Hakua vastaavia julkaistuja projekteja ei löytynyt.' : 'No published projects match this search.';
    return isFinnish() ? 'Julkaistuja projekteja lisätään pian.' : 'Published projects will be added soon.';
  }

  function updateUrl() {
    const input = document.getElementById('projectSearch');
    const url = new URL(window.location.href);
    const query = input?.value.trim() || '';

    if (query) url.searchParams.set('q', query);
    else {
      url.searchParams.delete('q');
      url.searchParams.delete('search');
    }

    if (selectedEcosystem) url.searchParams.set('ecosystem', selectedEcosystem);
    else {
      url.searchParams.delete('ecosystem');
      url.searchParams.delete('software');
    }

    window.history.replaceState({}, '', url);
  }

  function render() {
    const grid = document.getElementById('projectsGrid');
    const empty = document.getElementById('projectsEmpty');
    if (!grid) return;

    const groups = groupedProjects();
    const totalCount = groups.reduce((sum, [, grouped]) => sum + grouped.length, 0);
    const selectedGroup = selectedEcosystem ? groups.find(([id]) => id === selectedEcosystem) : null;

    if (selectedGroup) {
      const [ecosystemIdValue, grouped] = selectedGroup;
      grid.innerHTML = `
        <section class="project-ecosystem-section project-selected-section">
          ${projectsHeading(ecosystemIdValue, grouped.length)}
          <div class="project-grid-section">
            ${grouped.map(projectCard).join('')}
          </div>
        </section>
      `;
    } else {
      grid.innerHTML = `
        <section class="project-category-overview">
          ${overviewHeading(totalCount)}
          <div class="project-category-grid">
            ${groups.map(([ecosystemIdValue, grouped]) => categoryCard(ecosystemIdValue, grouped)).join('')}
          </div>
        </section>
      `;
    }

    grid.querySelectorAll('[data-ecosystem-select]').forEach((button) => {
      button.addEventListener('click', () => {
        selectedEcosystem = button.getAttribute('data-ecosystem-select') || '';
        updateUrl();
        render();
        document.getElementById('projectsGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    grid.querySelector('[data-ecosystem-back]')?.addEventListener('click', () => {
      selectedEcosystem = '';
      updateUrl();
      render();
    });

    if (empty) {
      empty.textContent = emptyText(document.getElementById('projectSearch')?.value.trim() || '');
      empty.hidden = totalCount > 0;
    }
  }

  function bind() {
    const input = document.getElementById('projectSearch');
    if (!input || input.dataset.fixedSearchBound === 'true') return;

    input.dataset.fixedSearchBound = 'true';

    const queryFromUrl = currentQuery().trim();
    if (queryFromUrl) input.value = queryFromUrl;

    input.addEventListener('input', () => {
      selectedEcosystem = '';
      updateUrl();
      render();
    });

    input.addEventListener('search', () => {
      selectedEcosystem = '';
      updateUrl();
      render();
    });

    document.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        activeFilter = chip.getAttribute('data-filter') || 'all';
        selectedEcosystem = '';
        document.querySelectorAll('.filter-chip').forEach((item) => item.classList.toggle('is-active', item === chip));
        updateUrl();
        render();
      });
    });
  }

  function schedule() {
    bind();
    render();
  }

  function startWhenDataReady() {
    if (window.PORTFOLIO_DATA_READY) {
      schedule();
      return;
    }
    window.addEventListener('portfolio:data-ready', schedule, { once: true });
  }

  startWhenDataReady();
  document.getElementById('langToggle')?.addEventListener('click', () => window.setTimeout(render, 120));
}());
