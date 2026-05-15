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

  function list(title, items) {
    if (!Array.isArray(items) || !items.length) return '';
    return `
      <section class="project-card">
        <h2 class="section-title">${escapeHtml(title)}</h2>
        <ul class="pill-list">
          ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </section>
    `;
  }

  function bullets(title, items) {
    if (!Array.isArray(items) || !items.length) return '';
    return `
      <section class="project-card">
        <h2 class="section-title">${escapeHtml(title)}</h2>
        <ul class="project-detail-list">
          ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </section>
    `;
  }

  function block(title, text) {
    if (!text) return '';
    return `
      <section class="project-card">
        <h2 class="section-title">${escapeHtml(title)}</h2>
        <p class="panel-copy">${escapeHtml(text)}</p>
      </section>
    `;
  }

  function renderMissing(target, slug) {
    target.innerHTML = `
      <section class="page-shell page-intro">
        <div class="page-intro-copy reveal">
          <p class="eyebrow">${isFinnish() ? 'Projektia ei löytynyt' : 'Project not found'}</p>
          <h1>${isFinnish() ? 'Tätä projektia ei löytynyt rekisteristä.' : 'This project was not found in the registry.'}</h1>
          <p class="hero-lead">${escapeHtml(slug || 'missing-slug')}</p>
          <div class="hero-actions"><a class="button button-primary" href="/projects/">${isFinnish() ? 'Takaisin projekteihin' : 'Back to projects'}</a></div>
        </div>
      </section>
    `;
  }

  function renderProject(target, project) {
    const tech = Array.isArray(project.technologies) ? project.technologies : [];
    const skills = Array.isArray(project.skills) ? project.skills : [];
    const outcomes = Array.isArray(project.outcomes) ? project.outcomes : [];
    const nextSteps = Array.isArray(project.nextSteps) ? project.nextSteps : [];
    const evidence = Array.isArray(project.evidence) ? project.evidence : [];
    const languages = Array.isArray(project.languages) ? project.languages : [];

    document.title = `${project.title} | Projects | Jibran Hussain`;

    target.innerHTML = `
      <section class="page-shell page-intro">
        <div class="page-intro-copy reveal">
          <p class="eyebrow">${escapeHtml(ecosystemTitle(project))}</p>
          <h1>${escapeHtml(project.title)}</h1>
          <p class="hero-lead">${escapeHtml(project.summary || project.intro || '')}</p>
          <div class="hero-actions">
            <a class="button button-secondary" href="/projects/?ecosystem=${encodeURIComponent(project.ecosystem || '')}">${isFinnish() ? 'Takaisin kategoriaan' : 'Back to category'}</a>
            ${project.github ? `<a class="button button-primary" href="${escapeHtml(project.github)}" target="_blank" rel="noopener">GitHub</a>` : ''}
          </div>
        </div>
      </section>

      <section class="section-shell project-detail-layout">
        ${block(isFinnish() ? 'Ongelma' : 'Problem', project.problem)}
        ${block(isFinnish() ? 'Ratkaisu / toteutus' : 'Solution / implementation', project.overview)}
        ${block(isFinnish() ? 'Miksi tämä projekti on tärkeä' : 'Why this project matters', project.why)}
        ${block(isFinnish() ? 'Visuaalinen näyttö' : 'Visual evidence', project.visual)}
        ${list(isFinnish() ? 'Teknologiat' : 'Technologies', tech)}
        ${list(isFinnish() ? 'Kielet' : 'Languages', languages)}
        ${bullets(isFinnish() ? 'Osaaminen' : 'Skills demonstrated', skills)}
        ${bullets(isFinnish() ? 'Tulokset' : 'Outcomes', outcomes)}
        ${bullets(isFinnish() ? 'Näyttö / dokumentit' : 'Evidence / documents', evidence)}
        ${bullets(isFinnish() ? 'Seuraavat parannukset' : 'Next improvements', nextSteps)}
      </section>
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

  function startWhenDataReady() {
    if (window.PORTFOLIO_DATA_READY) {
      render();
      return;
    }
    window.addEventListener('portfolio:data-ready', render, { once: true });
  }

  startWhenDataReady();
  document.getElementById('langToggle')?.addEventListener('click', () => window.setTimeout(render, 120));
}());
