(function () {
  if (document.body?.dataset.page !== 'projects') return;

  const aliases = {
    twincat: 'twincat beckhoff plc st structured text automation',
    beckhoff: 'twincat beckhoff plc st structured text automation',
    siemens: 'siemens tia portal plc fbd automation',
    tia: 'siemens tia portal plc fbd automation',
    webots: 'webots robotics robot python simulation thymio epuck e-puck maze line dead reckoning',
    robotics: 'webots robotics robot python simulation thymio epuck e-puck maze line dead reckoning',
    excel: 'excel spreadsheet reporting calculation data',
    python: 'python webots robotics dashboard tools simulation',
    fbd: 'fbd plc logic interlocks permissives siemens tia automation',
    st: 'st structured text twincat beckhoff codesys openplc plc',
    cpp: 'c++ cpp c programming',
    'c++': 'c++ cpp c programming',
    built: 'built build active valmis rakennettu case-study',
    build: 'built build active in progress aktiivinen rakennus kesken',
    roadmap: 'roadmap suunnitteilla planned future',
  };

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

  function currentQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || params.get('search') || params.get('ecosystem') || '';
  }

  function projects() {
    return Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  }

  function ecosystems() {
    return Array.isArray(window.PORTFOLIO_ECOSYSTEMS) ? window.PORTFOLIO_ECOSYSTEMS : [];
  }

  function slugFromCard(card) {
    const link = card.querySelector('a[href^="/projects/"]');
    const href = link?.getAttribute('href') || '';
    const match = href.match(/\/projects\/([^/]+)\/?/);
    if (match) return match[1];

    return normalize(card.querySelector('h3')?.textContent || '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function projectData(slug) {
    return projects().find((project) => project.slug === slug) || null;
  }

  function ecosystemData(id) {
    return ecosystems().find((ecosystem) => ecosystem.id === id) || null;
  }

  function searchBlob(card) {
    const slug = slugFromCard(card);
    const project = projectData(slug);
    const ecosystem = ecosystemData(project?.ecosystem);

    const pieces = [
      card.textContent,
      slug,
      project?.slug,
      project?.title,
      project?.category,
      project?.ecosystem,
      project?.status,
      project?.statusLabel,
      project?.summary,
      project?.intro,
      project?.problem,
      project?.overview,
      project?.visual,
      ecosystem?.title,
      ecosystem?.description,
      ...(project?.technologies || []),
      ...(project?.skills || []),
      ...(project?.outcomes || []),
      ...(project?.nextSteps || []),
    ];

    return normalize(pieces.filter(Boolean).join(' '));
  }

  function expandedQueryTerms(rawQuery) {
    const normalized = normalize(rawQuery);
    if (!normalized) return [];

    const baseTerms = normalized.split(' ').filter(Boolean);
    const expanded = [normalized, ...baseTerms];

    baseTerms.forEach((term) => {
      if (aliases[term]) expanded.push(...normalize(aliases[term]).split(' '));
    });

    Object.entries(aliases).forEach(([key, value]) => {
      if (normalized.includes(normalize(key))) {
        expanded.push(...normalize(value).split(' '));
      }
    });

    return Array.from(new Set(expanded.filter(Boolean)));
  }

  function matches(card, rawQuery) {
    const normalizedQuery = normalize(rawQuery);
    if (!normalizedQuery) return true;

    const blob = searchBlob(card);
    const directTerms = normalizedQuery.split(' ').filter(Boolean);
    if (directTerms.every((term) => blob.includes(term))) return true;

    const expanded = expandedQueryTerms(rawQuery);
    return expanded.some((term) => blob.includes(term));
  }

  function setQueryFromUrl() {
    const query = currentQuery().trim();
    if (!query) return;

    const input = document.getElementById('projectSearch');
    if (!input) return;

    if (input.value !== query) {
      input.value = query;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const allChip = document.querySelector('[data-filter="all"]');
    if (allChip && !allChip.classList.contains('is-active')) allChip.click();
  }

  function applyDomFilter() {
    const input = document.getElementById('projectSearch');
    const grid = document.getElementById('projectsGrid');
    if (!input || !grid) return;

    const query = input.value.trim();
    const cards = Array.from(grid.querySelectorAll('.project-card'));
    let visibleCards = 0;

    cards.forEach((card) => {
      const show = matches(card, query);
      card.hidden = !show;
      card.setAttribute('aria-hidden', show ? 'false' : 'true');
      if (show) visibleCards += 1;
    });

    grid.querySelectorAll('.project-ecosystem-section').forEach((section) => {
      const sectionCards = Array.from(section.querySelectorAll('.project-card'));
      const anyVisible = sectionCards.some((card) => !card.hidden);
      section.hidden = !anyVisible;
      section.setAttribute('aria-hidden', anyVisible ? 'false' : 'true');
    });

    const empty = document.getElementById('projectsEmpty');
    if (empty) empty.hidden = visibleCards > 0;
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
    const grid = document.getElementById('projectsGrid');
    if (!input || !grid || input.dataset.queryFilterBound === 'true') return;

    input.dataset.queryFilterBound = 'true';
    input.addEventListener('input', () => {
      updateUrlFromInput();
      window.setTimeout(applyDomFilter, 0);
      window.setTimeout(applyDomFilter, 80);
    });

    document.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        window.setTimeout(applyDomFilter, 0);
        window.setTimeout(applyDomFilter, 120);
      });
    });

    new MutationObserver(() => {
      window.setTimeout(applyDomFilter, 0);
      window.setTimeout(applyDomFilter, 80);
    }).observe(grid, { childList: true, subtree: true });
  }

  function schedule() {
    bind();
    setQueryFromUrl();
    window.setTimeout(applyDomFilter, 0);
    window.setTimeout(applyDomFilter, 120);
    window.setTimeout(applyDomFilter, 500);
    window.setTimeout(applyDomFilter, 1000);
  }

  schedule();
  window.addEventListener('load', schedule);
}());
