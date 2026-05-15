(function () {
  if (document.body?.dataset.page !== 'project-detail') return;

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

  function slugFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('slug') || params.get('project') || '';
  }

  function projects() {
    return Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  }

  function ecosystems() {
    return Array.isArray(window.PORTFOLIO_ECOSYSTEMS) ? window.PORTFOLIO_ECOSYSTEMS : [];
  }

  function ecosystemTitle(project) {
    const item = ecosystems().find((ecosystem) => ecosystem.id === project.ecosystem);
    return item?.title || String(project.ecosystem || '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function pillList(items) {
    if (!Array.isArray(items) || !items.length) return '';
    return `<ul class="pill-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  }

  function textCard(kicker, title, text) {
    if (!text) return '';
    return `<article class="project-card"><p class="eyebrow">${escapeHtml(kicker)}</p><h2 class="section-title">${escapeHtml(title)}</h2><p class="panel-copy">${escapeHtml(text)}</p></article>`;
  }

  function bulletSection(kicker, title, items) {
    if (!Array.isArray(items) || !items.length) return '';
    return `<section class="section-shell"><div class="section-heading"><p class="eyebrow">${escapeHtml(kicker)}</p><h2 class="section-title">${escapeHtml(title)}</h2></div><div class="timeline">${items.map((item) => `<article class="timeline-item"><p>${escapeHtml(item)}</p></article>`).join('')}</div></section>`;
  }

  function statsFor(project) {
    if (project.slug === 'chemical-process-automation-system') {
      return [
        ['PLC', 'S7-1500'],
        ['Sequence', 'GRAPH'],
        ['HMI', 'WinCC'],
        ['Simulation', 'SIMIT'],
      ];
    }
    const technologies = Array.isArray(project.technologies) ? project.technologies : [];
    return technologies.slice(0, 4).map((item, index) => [`Focus ${index + 1}`, item]);
  }

  function visualEvidence(project) {
    const stats = statsFor(project);
    const isSiemens = project.slug === 'chemical-process-automation-system';
    const visualTitle = isSiemens ? 'Siemens process automation evidence' : (project.visual || 'Project evidence');
    const visualCopy = isSiemens
      ? 'GRAPH sequence control, SIMIT simulation, TIA Selection Tool hardware planning, WinCC HMI, PID Compact, and TIA Portal program structure are documented as the evidence package for this case study.'
      : (project.visual || project.overview || project.summary || 'Project evidence package.');

    return `<aside class="project-card detail-visual"><p class="eyebrow">Visual evidence</p><h2 class="section-title">${escapeHtml(visualTitle)}</h2><p class="panel-copy">${escapeHtml(visualCopy)}</p><div class="project-grid-section">${stats.map(([label, value]) => `<div class="plain-block"><p class="micro-label">${escapeHtml(label)}</p><strong>${escapeHtml(value)}</strong></div>`).join('')}</div>${project.github ? `<div class="hero-actions"><a class="button button-primary" href="${escapeHtml(project.github)}" target="_blank" rel="noopener">Open repository</a></div>` : ''}</aside>`;
  }

  function evidencePackage(project) {
    const evidence = Array.isArray(project.evidence) ? project.evidence : [];
    const technologies = Array.isArray(project.technologies) ? project.technologies : [];
    return `<article class="project-card"><p class="eyebrow">Evidence package</p><h2 class="section-title">Project files and technical proof.</h2><p class="panel-copy">${escapeHtml(project.visual || 'Repository, documentation, implementation notes, and validation evidence are connected to this case study.')}</p>${pillList([...evidence, ...technologies.slice(0, 6)])}</article>`;
  }

  function renderMissing(target, slug) {
    target.innerHTML = `<section class="page-shell page-intro"><div class="page-intro-copy reveal"><p class="eyebrow">${isFinnish() ? 'Projektia ei löytynyt' : 'Project not found'}</p><h1>${isFinnish() ? 'Tätä projektia ei löytynyt rekisteristä.' : 'This project was not found in the registry.'}</h1><p class="hero-lead">${escapeHtml(slug || 'missing-slug')}</p><div class="hero-actions"><a class="button button-primary" href="/projects/">${isFinnish() ? 'Takaisin projekteihin' : 'Back to projects'}</a></div></div></section>`;
  }

  function renderProject(target, project) {
    const tech = Array.isArray(project.technologies) ? project.technologies : [];
    const skills = Array.isArray(project.skills) ? project.skills : [];
    const outcomes = Array.isArray(project.outcomes) ? project.outcomes : [];
    const nextSteps = Array.isArray(project.nextSteps) ? project.nextSteps : [];
    const languages = Array.isArray(project.languages) ? project.languages.filter((item) => ['FBD', 'ST', 'Python', 'C++'].includes(item)) : [];

    document.title = `${project.title} | Projects | Jibran Hussain`;

    target.innerHTML = `
      <section class="page-shell hero-layout">
        <div class="hero-copy reveal">
          <p class="eyebrow">Project case study</p>
          <h1>${escapeHtml(project.title)}</h1>
          <p class="hero-lead">${escapeHtml(project.summary || project.intro || '')}</p>
          <div class="project-card-top"><span class="status-badge">${escapeHtml(project.statusLabel || project.status || 'Project')}</span><span class="project-category">${escapeHtml(project.category || ecosystemTitle(project))}</span></div>
          <div class="hero-actions"><a class="button button-secondary" href="/projects/?ecosystem=${encodeURIComponent(project.ecosystem || '')}">Back to Projects</a>${project.github ? `<a class="button button-primary" href="${escapeHtml(project.github)}" target="_blank" rel="noopener">GitHub repository</a>` : ''}</div>
          ${evidencePackage(project)}
        </div>
        <div class="hero-panel reveal">${visualEvidence(project)}</div>
      </section>

      <section class="section-shell"><div class="project-grid-section">
        ${textCard('Overview', 'How the system works.', project.overview || project.intro)}
        ${textCard('Engineering problem', 'Problem this project solves.', project.problem)}
        ${textCard('Engineering value', 'Why this project matters.', project.why)}
        <article class="project-card"><p class="eyebrow">Technologies</p><h2 class="section-title">Tools and systems used.</h2>${pillList(tech)}</article>
        <article class="project-card"><p class="eyebrow">Skills demonstrated</p><h2 class="section-title">What this project proves.</h2>${pillList(skills)}</article>
        ${languages.length ? `<article class="project-card"><p class="eyebrow">Programming languages</p><h2 class="section-title">Implementation languages.</h2>${pillList(languages)}</article>` : ''}
      </div></section>

      ${bulletSection('Project outcomes', 'Evidence the case study is designed to show.', outcomes)}
      ${bulletSection('Next improvements', 'What will be strengthened next.', nextSteps)}
    `;
  }

  function render() {
    const target = document.getElementById('projectDetail');
    if (!target) return;
    const slug = slugFromUrl();
    const project = projects().find((item) => item.slug === slug);
    if (!project) renderMissing(target, slug);
    else renderProject(target, project);
  }

  if (window.PORTFOLIO_DATA_READY) render();
  else window.addEventListener('portfolio:data-ready', render, { once: true });
  document.getElementById('langToggle')?.addEventListener('click', () => window.setTimeout(render, 120));
}());
