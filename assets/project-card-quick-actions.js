(function () {
  const githubLinksBySlug = {
    'line-following-robot': 'https://github.com/jibranthedecoder/webots-line-following-robot',
    'dead-reckoning-navigation': 'https://github.com/jibranthedecoder/webots-dead-reckoning-navigation',
    'maze-solving-robot': 'https://github.com/jibranthedecoder/webots-maze-solving-robot',
  };

  function slugFromCard(card) {
    const caseLink = card.querySelector('a[href^="/projects/"]');
    if (caseLink) {
      const match = caseLink.getAttribute('href').match(/\/projects\/([^/]+)\/?/);
      if (match) return match[1];
    }

    const title = card.querySelector('h3')?.textContent || '';
    return title
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function isFinnish() {
    try {
      if (window.localStorage.getItem('jh-language') === 'fi') return true;
    } catch (error) {}

    const langToggle = document.getElementById('langToggle');
    return Boolean(langToggle && langToggle.textContent.trim().toUpperCase() === 'EN');
  }

  function normalizeCaseStudyButton(link) {
    if (!link) return;
    link.textContent = isFinnish() ? 'Avaa case study' : 'Open case study';
    link.classList.add('button', 'button-primary');
  }

  function normalizeGithubButton(link, slug) {
    const githubUrl = githubLinksBySlug[slug];

    if (!link) {
      if (!githubUrl) return null;
      const created = document.createElement('a');
      created.className = 'button button-secondary project-github-link';
      created.target = '_blank';
      created.rel = 'noopener';
      link = created;
    }

    if (!githubUrl) {
      link.remove();
      return null;
    }

    link.href = githubUrl;
    link.textContent = isFinnish() ? 'GitHub-repository' : 'GitHub repository';
    link.classList.add('button', 'button-secondary', 'project-github-link');
    link.target = '_blank';
    link.rel = 'noopener';
    return link;
  }

  function getSummary(card) {
    return card.querySelector('.project-summary') ||
      Array.from(card.querySelectorAll('p')).find((p) => !p.classList.contains('eyebrow') && !p.classList.contains('project-category')) ||
      card.querySelector('h3');
  }

  function cleanupCard(card) {
    const actions = card.querySelector('.project-links');
    if (!actions) return;

    const slug = slugFromCard(card);
    actions.classList.add('project-card-actions-top');

    const links = Array.from(actions.querySelectorAll('a, button'));
    const caseStudyLink = links.find((link) => {
      const text = link.textContent.toLowerCase();
      const href = link.getAttribute('href') || '';
      return href.startsWith('/projects/') || text.includes('case') || text.includes('project') || text.includes('projekti');
    });
    const githubLink = links.find((link) => link.textContent.toLowerCase().includes('github'));

    normalizeCaseStudyButton(caseStudyLink);
    normalizeGithubButton(githubLink, slug);

    const summary = getSummary(card);
    if (summary && actions.previousElementSibling !== summary) {
      summary.insertAdjacentElement('afterend', actions);
    }

    card.querySelectorAll('.project-toggle').forEach((toggle) => toggle.remove());
    card.querySelectorAll('.project-problem, .project-details, .project-expanded, .project-more, .project-extra').forEach((detail) => {
      detail.setAttribute('hidden', '');
      detail.setAttribute('aria-hidden', 'true');
    });
  }

  function cleanupCards() {
    document.querySelectorAll('.project-card').forEach(cleanupCard);
  }

  function scheduleCleanup() {
    window.setTimeout(cleanupCards, 0);
    window.setTimeout(cleanupCards, 80);
    window.setTimeout(cleanupCards, 250);
  }

  scheduleCleanup();

  const langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', scheduleCleanup);

  const grid = document.getElementById('projectsGrid');
  if (grid) {
    new MutationObserver(scheduleCleanup).observe(grid, { childList: true, subtree: true });
  }
}());
