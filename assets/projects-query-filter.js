(function () {
  if (document.body?.dataset.page !== 'projects') return;

  const aliases = {
    twincat: 'twincat beckhoff plc st structured text automation',
    beckhoff: 'twincat beckhoff plc st structured text automation',
    siemens: 'siemens tia portal plc fbd automation',
    tia: 'siemens tia portal plc fbd automation',
    webots: 'webots robotics robot python simulation thymio epuck e puck maze line dead reckoning',
    robotics: 'webots robotics robot python simulation thymio epuck e puck maze line dead reckoning',
    excel: 'excel spreadsheet reporting calculation data',
    python: 'python webots robotics tools simulation',
    fbd: 'fbd plc logic interlocks permissives siemens tia automation',
    st: 'st structured text twincat beckhoff codesys openplc plc',
    cpp: 'c++ cpp c programming',
    'c++': 'c++ cpp c programming',
    built: 'built build active valmis rakennettu case study',
    build: 'built build active in progress aktiivinen rakennus kesken',
    roadmap: 'roadmap suunnitteilla planned future',
  };

  const githubLinksBySlug = {
    'line-following-robot': 'https://github.com/jibranthedecoder/webots-line-following-robot',
    'dead-reckoning-navigation': 'https://github.com/jibranthedecoder/webots-dead-reckoning-navigation',
    'maze-solving-robot': 'https://github.com/jibranthedecoder/webots-maze-solving-robot',
  };

  let activeFilter = 'all';

  function normalize(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
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
    return params.get('q') || params.get('search') || params.get('ecosystem') || '';
  }

  function allProjects() {
    return Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  }

  function projectHasPublicEvidence(project) {
    return Boolean(project && (project.github || githubLinksBySlug[project.slug]));
  }

  function projects() {
    return allProjects().filter(projectHasPublicEvidence);
  }

  function ecosystems() {
    return Array.isArray(window.PORTFOLIO_ECOSYSTEMS) ? window.PORTFOLIO_ECOSYSTEMS : [];
  }

  function ecosystemData(id) {
    return ecosystems().find((ecosystem) => ecosystem.id === id) || null;
  }

  function projectBlob(project) {
    const ecosystem = ecosystemData(project.ecosystem);
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
      ecosystem?.title,
      ecosystem?.description,
      ...(project.technologies || []),
      ...(project.skills || []),
      ...(project.outcomes || []),
      ...(project.nextSteps || []),
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

  function statusLabel(project) {
    if (project.statusLabel) return project.statusLabel;
    if (project.status === 'roadmap') return isFinnish() ? 'Suunnitteilla' : 'Roadmap';
    if (project.status === 'live') return isFinnish() ? 'Julkaistu' : 'Live';
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
      .replace(/"/g, '&quot;')
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

  function ecosystemHeading(ecosystemId, groupedProjects) {
    const ecosystem = ecosystemData(ecosystemId);
    const title = ecosystem?.title || ecosystemId || (isFinnish() ? 'Muut projektit' : 'Other projects');
    const description = ecosystem?.description || `${groupedProjects.length} ${isFinnish() ? 'projektia' : 'projects'}`;

    return `
      <div class="project-ecosystem-heading">
        <h2>${escapeHtml(title)}</h2>
        <p class="panel-copy">${escapeHtml(description)}</p>
      </div>
    `;
  }

  function emptyText(query) {
    if (query) return isFinnish() ? 'Hakua vastaavia julkaistuja projekteja ei löytynyt.' : 'No published projects match this search.';
    return isFinnish() ? 'Julkaistuja projekteja lisätään pian.' : 'Published projects will be added soon.';
  }

  function render() {
    const grid = document.getElementById('projectsGrid');
    const input = document.getElementById('projectSearch');
    const empty = document.getElementById('projectsEmpty');
    if (!grid || !input) return;

    const query = input.value.trim();
    const filtered = projects().filter((project) => projectMatchesFilter(project) && projectMatchesSearch(project, query));

    const groups = new Map();
    filtered.forEach((project) => {
      const key = project.ecosystem || 'other';
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(project);
    });

    grid.innerHTML = Array.from(groups.entries()).map(([ecosystemId, groupedProjects]) => `
      <section class="project-ecosystem-section">
        ${ecosystemHeading(ecosystemId, groupedProjects)}
        <div class="project-grid-section">
          ${groupedProjects.map(projectCard).join('')}
        </div>
      </section>
    `).join('');

    if (empty) {
      empty.textContent = emptyText(query);
      empty.hidden = filtered.length > 0;
    }
  }

  function updateUrlFromInput() {
    const input = document.getElementById('projectSearch');
    if (!input) return;

    const query = input.value.trim();
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
      url.searchParams.delete('search');
      url.searchParams.delete('ecosystem');
    }
    window.history.replaceState({}, '', url);
  }

  function bind() {
    const input = document.getElementById('projectSearch');
    if (!input || input.dataset.fixedSearchBound === 'true') return;

    input.dataset.fixedSearchBound = 'true';

    const queryFromUrl = currentQuery().trim();
    if (queryFromUrl) input.value = queryFromUrl;

    input.addEventListener('input', () => {
      updateUrlFromInput();
      window.setTimeout(render, 0);
    });

    document.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        activeFilter = chip.getAttribute('data-filter') || 'all';
        document.querySelectorAll('.filter-chip').forEach((item) => item.classList.toggle('is-active', item === chip));
        window.setTimeout(render, 0);
      });
    });
  }

  function schedule() {
    bind();
    window.setTimeout(render, 0);
    window.setTimeout(render, 150);
    window.setTimeout(render, 600);
  }

  schedule();
  window.addEventListener('load', schedule);
  document.getElementById('langToggle')?.addEventListener('click', () => window.setTimeout(render, 120));
}());
