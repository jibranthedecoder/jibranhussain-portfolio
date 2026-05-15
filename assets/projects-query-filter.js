(function () {
  if (document.body?.dataset.page !== 'projects') return;

  const preferredOrder = [
    'webots-robotics',
    'siemens-tia',
    'electrical-design',
    'python-tools',
    'codesys-openplc',
    'twincat-beckhoff',
    'excel-tools',
    'other',
  ];

  let activeFilter = 'all';
  let selectedEcosystem = currentEcosystemFromUrl();

  function isFinnish() {
    try {
      if (window.localStorage.getItem('jh-language') === 'fi') return true;
    } catch (error) {}
    const langToggle = document.getElementById('langToggle');
    return Boolean(langToggle && langToggle.textContent.trim().toUpperCase() === 'EN');
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

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

  function ecosystems() {
    return Array.isArray(window.PORTFOLIO_ECOSYSTEMS) ? window.PORTFOLIO_ECOSYSTEMS : [];
  }

  function ecosystemId(project) {
    return project?.ecosystem || 'other';
  }

  function ecosystemData(id) {
    return ecosystems().find((item) => item.id === id) || null;
  }

  function ecosystemTitle(id) {
    const fallback = id === 'other'
      ? (isFinnish() ? 'Muut' : 'Other')
      : String(id || 'Other').replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    return ecosystemData(id)?.title || fallback;
  }

  function ecosystemDescription(id, count) {
    const description = ecosystemData(id)?.description;
    if (description) return description;
    return `${count} ${isFinnish() ? 'projektia' : count === 1 ? 'project' : 'projects'}`;
  }

  function statusLabel(project) {
    if (project.statusLabel) return project.statusLabel;
    if (project.status === 'roadmap') return isFinnish() ? 'Suunnitteilla' : 'Roadmap';
    if (project.status === 'live') return isFinnish() ? 'Julkaistu' : 'Live';
    if (project.status === 'build') return isFinnish() ? 'Rakennettu' : 'Built';
    return isFinnish() ? 'Projekti' : 'Project';
  }

  function projectBlob(project) {
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
      ...(project.technologies || []),
      ...(project.skills || []),
      ...(project.outcomes || []),
      ...(project.nextSteps || []),
      ...(project.evidence || []),
      ecosystemTitle(ecosystemId(project)),
    ];
    return normalize(pieces.filter(Boolean).join(' '));
  }

  function projectMatchesSearch(project, query) {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return true;
    const blob = projectBlob(project);
    return normalizedQuery.split(' ').filter(Boolean).every((term) => blob.includes(term));
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
    return allProjects().filter((project) => {
      if (selectedEcosystem && ecosystemId(project) !== selectedEcosystem) return false;
      return projectMatchesFilter(project) && projectMatchesSearch(project, query);
    });
  }

  function groupedProjects() {
    const groups = new Map();
    filteredProjects().forEach((project) => {
      const id = ecosystemId(project);
      if (!groups.has(id)) groups.set(id, []);
      groups.get(id).push(project);
    });

    return Array.from(groups.entries()).sort(([a], [b]) => {
      const ai = preferredOrder.indexOf(a);
      const bi = preferredOrder.indexOf(b);
      if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      return ecosystemTitle(a).localeCompare(ecosystemTitle(b));
    });
  }

  function projectDetailUrl(project) {
    return `/projects/project/?slug=${encodeURIComponent(project.slug)}`;
  }

  function projectCard(project) {
    const github = project.github || '';
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
          <a class="button button-primary" href="${projectDetailUrl(project)}">${isFinnish() ? 'Avaa case study' : 'Open case study'}</a>
          ${github ? `<a class="button button-secondary project-github-link" href="${escapeHtml(github)}" target="_blank" rel="noopener">GitHub</a>` : ''}
        </div>
      </article>
    `;
  }

  function overviewHeading(totalCount) {
    return `
      <div class="project-ecosystem-heading project-category-intro">
        <h2>${isFinnish() ? 'Valitse ohjelmisto tai järjestelmä.' : 'Choose a software or system.'}</h2>
        <p class="panel-copy">${isFinnish()
          ? `Yhteensä ${totalCount} projektia.`
          : `${totalCount} projects available.`}</p>
      </div>
    `;
  }

  function categoryCard(id, items) {
    const builtCount = items.filter((project) => project.status === 'build' || project.status === 'live').length;
    const roadmapCount = items.filter((project) => project.status === 'roadmap').length;
    const meta = [
      builtCount ? `${builtCount} ${isFinnish() ? 'rakennettu' : 'built'}` : '',
      roadmapCount ? `${roadmapCount} ${isFinnish() ? 'suunnitteilla' : 'roadmap'}` : '',
    ].filter(Boolean).join(' · ');

    return `
      <article class="project-category-card" data-ecosystem-card="${escapeHtml(id)}">
        <button class="project-category-button" type="button" data-ecosystem-select="${escapeHtml(id)}">
          <span class="project-category-kicker">${items.length} ${isFinnish() ? 'projektia' : items.length === 1 ? 'project' : 'projects'}</span>
          <strong>${escapeHtml(ecosystemTitle(id))}</strong>
          <span>${escapeHtml(ecosystemDescription(id, items.length))}</span>
          ${meta ? `<small>${escapeHtml(meta)}</small>` : ''}
        </button>
      </article>
    `;
  }

  function projectsHeading(id, count) {
    return `
      <div class="project-ecosystem-heading project-selected-heading">
        <button class="button button-secondary" type="button" data-ecosystem-back>${isFinnish() ? 'Takaisin kategorioihin' : 'Back to categories'}</button>
        <div>
          <h2>${escapeHtml(ecosystemTitle(id))}</h2>
          <p class="panel-copy">${escapeHtml(ecosystemDescription(id, count))}</p>
        </div>
      </div>
    `;
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
    const totalCount = groups.reduce((sum, [, items]) => sum + items.length, 0);

    if (selectedEcosystem) {
      const items = filteredProjects();
      grid.innerHTML = `
        <section class="project-ecosystem-section project-selected-section">
          ${projectsHeading(selectedEcosystem, items.length)}
          <div class="project-grid-section">${items.map(projectCard).join('')}</div>
        </section>
      `;
    } else {
      grid.innerHTML = `
        <section class="project-category-overview">
          ${overviewHeading(totalCount)}
          <div class="project-category-grid">${groups.map(([id, items]) => categoryCard(id, items)).join('')}</div>
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
      empty.textContent = isFinnish() ? 'Hakua vastaavia projekteja ei löytynyt.' : 'No projects match this search.';
      empty.hidden = totalCount > 0;
    }
  }

  function bind() {
    const input = document.getElementById('projectSearch');
    if (!input || input.dataset.registrySearchBound === 'true') return;
    input.dataset.registrySearchBound = 'true';

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

  function start() {
    bind();
    render();
  }

  if (window.PORTFOLIO_DATA_READY) start();
  else window.addEventListener('portfolio:data-ready', start, { once: true });

  document.getElementById('langToggle')?.addEventListener('click', () => window.setTimeout(render, 120));
}());
