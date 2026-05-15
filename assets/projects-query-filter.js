(function () {
  if (document.body?.dataset.page !== 'projects') return;

  const preferredOrder = ['webots-robotics', 'siemens-tia', 'twincat-beckhoff', 'excel-tools', 'other'];
  const languageFilters = ['FBD', 'ST', 'Python', 'C++'];
  const systemFilters = ['TwinCAT', 'Siemens', 'Webots', 'Excel'];

  let activeFilter = 'all';
  let activeLanguage = '';
  let activeSystem = '';
  let selectedEcosystem = currentEcosystemFromUrl();

  function isFinnish() {
    try { if (window.localStorage.getItem('jh-language') === 'fi') return true; } catch (error) {}
    const langToggle = document.getElementById('langToggle');
    return Boolean(langToggle && langToggle.textContent.trim().toUpperCase() === 'EN');
  }

  function escapeHtml(value) {
    return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function normalize(value) {
    return String(value || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/d['’`´]?hondt/g, 'dhondt').replace(/\+/g, ' plus ').replace(/[^a-z0-9åäö]+/g, ' ').replace(/\s+/g, ' ').trim();
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

  function projectSystem(project) {
    if (project.system && systemFilters.includes(project.system)) return project.system;
    const ecosystem = String(project.ecosystem || '').toLowerCase();
    if (ecosystem.includes('twincat') || ecosystem.includes('beckhoff')) return 'TwinCAT';
    if (ecosystem.includes('siemens') || ecosystem.includes('tia')) return 'Siemens';
    if (ecosystem.includes('webots')) return 'Webots';
    if (ecosystem.includes('excel')) return 'Excel';
    return '';
  }

  function projectLanguages(project) {
    const values = Array.isArray(project.languages) ? project.languages : [];
    return values.filter((language) => languageFilters.includes(language));
  }

  function ecosystemTitle(id) {
    const fallback = id === 'other' ? (isFinnish() ? 'Muut' : 'Other') : String(id || 'Other').replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
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
      project.slug, project.title, project.category, project.ecosystem, project.status, project.statusLabel,
      project.summary, project.intro, project.problem, project.overview, project.visual, project.why,
      project.github, project.system, projectSystem(project), ...projectLanguages(project), ...(project.technologies || []),
      ...(project.skills || []), ...(project.outcomes || []), ...(project.nextSteps || []), ...(project.evidence || []), ecosystemTitle(ecosystemId(project)),
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
    if (activeFilter === 'build' && project.status !== 'build' && project.status !== 'live') return false;
    if (activeFilter === 'roadmap' && project.status !== 'roadmap') return false;
    if (activeLanguage && !projectLanguages(project).includes(activeLanguage)) return false;
    if (activeSystem && projectSystem(project) !== activeSystem) return false;
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
    if (project.slug === 'chemical-process-automation-system') return '/projects/chemical-process-automation-system/';
    return `/projects/project/?slug=${encodeURIComponent(project.slug)}`;
  }

  function projectCard(project) {
    const github = project.github || '';
    const tags = Array.from(new Set([projectSystem(project), ...projectLanguages(project), ...(project.technologies || [])])).filter(Boolean).slice(0, 7);
    return `
      <article class="project-card" data-project-slug="${escapeHtml(project.slug)}">
        <div class="project-card-top"><span class="status-badge">${escapeHtml(statusLabel(project))}</span><span class="project-category">${escapeHtml(project.category || '')}</span></div>
        <h3>${escapeHtml(project.title || project.slug)}</h3>
        <p class="project-summary">${escapeHtml(project.summary || project.intro || '')}</p>
        ${tags.length ? `<ul class="pill-list">${tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>` : ''}
        <div class="project-links project-card-actions-top"><a class="button button-primary" href="${projectDetailUrl(project)}">${isFinnish() ? 'Avaa case study' : 'Open case study'}</a>${github ? `<a class="button button-secondary project-github-link" href="${escapeHtml(github)}" target="_blank" rel="noopener">GitHub</a>` : ''}</div>
      </article>
    `;
  }

  function overviewHeading(totalCount) {
    return `<div class="project-ecosystem-heading project-category-intro"><h2>${isFinnish() ? 'Projektit järjestelmittäin.' : 'Projects by system.'}</h2><p class="panel-copy">${isFinnish() ? `${totalCount} projektia näkyvissä.` : `${totalCount} projects available.`}</p></div>`;
  }

  function categoryCard(id, items) {
    const builtCount = items.filter((project) => project.status === 'build' || project.status === 'live').length;
    const roadmapCount = items.filter((project) => project.status === 'roadmap').length;
    const meta = [builtCount ? `${builtCount} ${isFinnish() ? 'rakennettu' : 'built'}` : '', roadmapCount ? `${roadmapCount} ${isFinnish() ? 'suunnitteilla' : 'roadmap'}` : ''].filter(Boolean).join(' · ');
    return `<article class="project-category-card" data-ecosystem-card="${escapeHtml(id)}"><button class="project-category-button" type="button" data-ecosystem-select="${escapeHtml(id)}"><span class="project-category-kicker">${items.length} ${isFinnish() ? 'projektia' : items.length === 1 ? 'project' : 'projects'}</span><strong>${escapeHtml(ecosystemTitle(id))}</strong><span>${escapeHtml(ecosystemDescription(id, items.length))}</span>${meta ? `<small>${escapeHtml(meta)}</small>` : ''}</button></article>`;
  }

  function projectsHeading(id, count) {
    return `<div class="project-ecosystem-heading project-selected-heading"><button class="button button-secondary" type="button" data-ecosystem-back>${isFinnish() ? 'Takaisin kategorioihin' : 'Back to categories'}</button><div><h2>${escapeHtml(ecosystemTitle(id))}</h2><p class="panel-copy">${escapeHtml(ecosystemDescription(id, count))}</p></div></div>`;
  }

  function ensureFacetFilters() {
    const toolbar = document.querySelector('.project-toolbar');
    if (!toolbar || document.querySelector('[data-project-facet-filters]')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'project-facet-filters filter-group';
    wrapper.setAttribute('data-project-facet-filters', 'true');
    wrapper.innerHTML = `
      <span class="micro-label">${isFinnish() ? 'Ohjelmointikieli' : 'Programming language'}</span>
      ${languageFilters.map((language) => `<button class="filter-chip" type="button" data-language-filter="${escapeHtml(language)}">${escapeHtml(language)}</button>`).join('')}
      <span class="micro-label">${isFinnish() ? 'Järjestelmä' : 'System'}</span>
      ${systemFilters.map((system) => `<button class="filter-chip" type="button" data-system-filter="${escapeHtml(system)}">${escapeHtml(system)}</button>`).join('')}
    `;
    toolbar.appendChild(wrapper);
  }

  function updateFacetButtons() {
    document.querySelectorAll('[data-language-filter]').forEach((button) => button.classList.toggle('is-active', button.getAttribute('data-language-filter') === activeLanguage));
    document.querySelectorAll('[data-system-filter]').forEach((button) => button.classList.toggle('is-active', button.getAttribute('data-system-filter') === activeSystem));
  }

  function updateUrl() {
    const input = document.getElementById('projectSearch');
    const url = new URL(window.location.href);
    const query = input?.value.trim() || '';
    if (query) url.searchParams.set('q', query); else { url.searchParams.delete('q'); url.searchParams.delete('search'); }
    if (selectedEcosystem) url.searchParams.set('ecosystem', selectedEcosystem); else { url.searchParams.delete('ecosystem'); url.searchParams.delete('software'); }
    if (activeLanguage) url.searchParams.set('language', activeLanguage); else url.searchParams.delete('language');
    if (activeSystem) url.searchParams.set('system', activeSystem); else url.searchParams.delete('system');
    window.history.replaceState({}, '', url);
  }

  function readFacetParams() {
    const params = new URLSearchParams(window.location.search);
    const language = params.get('language') || '';
    const system = params.get('system') || '';
    activeLanguage = languageFilters.includes(language) ? language : '';
    activeSystem = systemFilters.includes(system) ? system : '';
  }

  function render() {
    const grid = document.getElementById('projectsGrid');
    const empty = document.getElementById('projectsEmpty');
    if (!grid) return;
    const groups = groupedProjects();
    const totalCount = groups.reduce((sum, [, items]) => sum + items.length, 0);
    if (selectedEcosystem) {
      const items = filteredProjects();
      grid.innerHTML = `<section class="project-ecosystem-section project-selected-section">${projectsHeading(selectedEcosystem, items.length)}<div class="project-grid-section">${items.map(projectCard).join('')}</div></section>`;
    } else {
      grid.innerHTML = `<section class="project-category-overview">${overviewHeading(totalCount)}<div class="project-category-grid">${groups.map(([id, items]) => categoryCard(id, items)).join('')}</div></section>`;
    }
    grid.querySelectorAll('[data-ecosystem-select]').forEach((button) => button.addEventListener('click', () => { selectedEcosystem = button.getAttribute('data-ecosystem-select') || ''; updateUrl(); render(); document.getElementById('projectsGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
    grid.querySelector('[data-ecosystem-back]')?.addEventListener('click', () => { selectedEcosystem = ''; updateUrl(); render(); });
    updateFacetButtons();
    if (empty) { empty.textContent = isFinnish() ? 'Hakua vastaavia projekteja ei löytynyt.' : 'No projects match this search.'; empty.hidden = totalCount > 0; }
  }

  function bind() {
    ensureFacetFilters();
    readFacetParams();
    const input = document.getElementById('projectSearch');
    if (input && input.dataset.registrySearchBound !== 'true') {
      input.dataset.registrySearchBound = 'true';
      const queryFromUrl = currentQuery().trim();
      if (queryFromUrl) input.value = queryFromUrl;
      input.addEventListener('input', () => { selectedEcosystem = ''; updateUrl(); render(); });
      input.addEventListener('search', () => { selectedEcosystem = ''; updateUrl(); render(); });
    }
    document.querySelectorAll('.filter-chip[data-filter]').forEach((chip) => {
      if (chip.dataset.statusFilterBound === 'true') return;
      chip.dataset.statusFilterBound = 'true';
      chip.addEventListener('click', () => { activeFilter = chip.getAttribute('data-filter') || 'all'; selectedEcosystem = ''; document.querySelectorAll('.filter-chip[data-filter]').forEach((item) => item.classList.toggle('is-active', item === chip)); updateUrl(); render(); });
    });
    document.querySelectorAll('[data-language-filter]').forEach((chip) => {
      if (chip.dataset.languageFilterBound === 'true') return;
      chip.dataset.languageFilterBound = 'true';
      chip.addEventListener('click', () => { const value = chip.getAttribute('data-language-filter') || ''; activeLanguage = activeLanguage === value ? '' : value; selectedEcosystem = ''; updateUrl(); render(); });
    });
    document.querySelectorAll('[data-system-filter]').forEach((chip) => {
      if (chip.dataset.systemFilterBound === 'true') return;
      chip.dataset.systemFilterBound = 'true';
      chip.addEventListener('click', () => { const value = chip.getAttribute('data-system-filter') || ''; activeSystem = activeSystem === value ? '' : value; selectedEcosystem = ''; updateUrl(); render(); });
    });
    updateFacetButtons();
  }

  function start() { bind(); render(); }
  if (window.PORTFOLIO_DATA_READY) start(); else window.addEventListener('portfolio:data-ready', start, { once: true });
  document.getElementById('langToggle')?.addEventListener('click', () => window.setTimeout(() => { ensureFacetFilters(); render(); }, 120));
}());