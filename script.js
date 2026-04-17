const root = document.documentElement;
const navContainer = document.querySelector('.primary-nav');
const contentRoot = document.getElementById('main-content');
const footerEl = document.getElementById('footer');
const themeToggle = document.getElementById('theme-toggle');
const localTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const sectionTitles = {
  hero: 'Home',
  about: 'About',
  skills: 'Skills',
  tech_stack: 'Tech stack',
  services: 'Services',
  projects: 'Projects',
  featured_projects: 'Featured projects',
  experience: 'Experience',
  education: 'Education',
  certifications: 'Certifications',
  achievements: 'Achievements',
  testimonials: 'Testimonials',
  blog: 'Articles',
  faq: 'FAQ',
  gallery: 'Gallery',
  timeline: 'Timeline',
  languages: 'Languages',
  tools: 'Tools',
  interests: 'Interests',
  contact: 'Contact'
};

function safeText(value) {
  return String(value || '').trim();
}

function parseToggle(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (normalized === '') return true;
  if (['false', '0', 'no', 'hide', 'hidden', 'off'].includes(normalized)) return false;
  return true;
}

function isSectionVisible(sectionData) {
  if (!sectionData) return false;
  if (Array.isArray(sectionData)) {
    if (sectionData._meta?.visible !== undefined) {
      return parseToggle(sectionData._meta.visible);
    }
    if (sectionData._meta?.hide !== undefined) {
      return !parseToggle(sectionData._meta.hide);
    }
    if (sectionData._meta?.hidden !== undefined) {
      return !parseToggle(sectionData._meta.hidden);
    }
    return true;
  }
  if (typeof sectionData === 'object') {
    if (sectionData.visible !== undefined) {
      return parseToggle(sectionData.visible);
    }
    if (sectionData.hide !== undefined) {
      return !parseToggle(sectionData.hide);
    }
    if (sectionData.hidden !== undefined) {
      return !parseToggle(sectionData.hidden);
    }
  }
  return true;
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '');
}

function parseContent(raw) {
  const lines = raw.split(/\r?\n/);
  const data = {};
  let currentSection = null;
  let currentObject = null;

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, '  ');
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('<!--')) continue;

    if (trimmed.startsWith('#')) {
      currentSection = trimmed.replace(/^#+\s*/, '').trim().toLowerCase().replace(/\s+/g, '_');
      currentObject = null;
      if (!data[currentSection]) {
        data[currentSection] = {};
      }
      continue;
    }

    const listItemMatch = line.match(/^\s*-\s*(.*)$/);
    if (listItemMatch && currentSection) {
      const currentValue = listItemMatch[1].trim();
      if (!Array.isArray(data[currentSection])) {
        const existingValue = data[currentSection];
        const arrayData = [];
        if (existingValue && typeof existingValue === 'object' && !Array.isArray(existingValue) && Object.keys(existingValue).length) {
          Object.defineProperty(arrayData, '_meta', {
            value: { ...existingValue },
            enumerable: false,
            writable: true
          });
        }
        data[currentSection] = arrayData;
      }

      const inlineObjectMatch = currentValue.match(/^([^:]+):\s*(.*)$/);
      if (inlineObjectMatch) {
        const key = inlineObjectMatch[1].trim();
        const value = inlineObjectMatch[2].trim();
        currentObject = { [key]: value };
        data[currentSection].push(currentObject);
      } else {
        currentObject = null;
        data[currentSection].push(currentValue);
      }
      continue;
    }

    const indentedObjectMatch = line.match(/^\s{2,}([^:]+):\s*(.*)$/);
    if (indentedObjectMatch && currentObject) {
      const key = indentedObjectMatch[1].trim();
      const value = indentedObjectMatch[2].trim();
      currentObject[key] = value;
      continue;
    }

    const pairMatch = line.match(/^([^:]+):\s*(.*)$/);
    if (pairMatch && currentSection) {
      const key = pairMatch[1].trim();
      const value = pairMatch[2].trim();
      if (Array.isArray(data[currentSection])) {
        if (!data[currentSection]._meta) {
          Object.defineProperty(data[currentSection], '_meta', {
            value: {},
            enumerable: false,
            writable: true
          });
        }
        data[currentSection]._meta[key] = value;
      } else {
        data[currentSection][key] = value;
      }
      currentObject = null;
    }
  }

  return data;
}

function applyTheme(data) {
  const theme = data.basic_info?.theme || data.seo?.theme || localTheme || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? ' Light' : ' Dark';
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
      themeToggle.textContent = nextTheme === 'dark' ? ' Light' : ' Dark';
    });
  }

  if (data.colors) {
    Object.entries(data.colors).forEach(([key, value]) => {
      if (!value) return;
      const variable = `--color-${key.replace(/_/g, '-')}`;
      root.style.setProperty(variable, value);
    });
  }
}

function applySeo(data) {
  if (data.title) {
    document.title = data.title;
  }
  if (data.description) {
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', data.description);
  }
}

function buildNav(items) {
  if (!navContainer) return;
  navContainer.innerHTML = items
    .map(item => `<a href="#${item.id}">${item.label}</a>`)
    .join('');
}

function createSection(id, label, html) {
  const section = document.createElement('section');
  section.id = id;
  section.className = 'section-block';
  section.innerHTML = `
    <div class="section-header">
      <p class="section-label">${label}</p>
    </div>
    <div class="section-body">${html}</div>
  `;
  return section;
}

function createList(items) {
  if (!items || !items.length) return '';
  const rows = items.map(item => `<li>${safeText(item)}</li>`).join('');
  return `<ul class="list-grid">${rows}</ul>`;
}

function createPills(items) {
  if (!items || !items.length) return '';
  return `<div class="pill-grid">${items.map(item => `<span class="pill">${safeText(item)}</span>`).join('')}</div>`;
}

function renderHero(data) {
  const info = data.basic_info || {};
  const name = safeText(info.name || 'Your Name');
  const headline = safeText(info.headline || 'Electrical & Automation Engineering student');
  const summary = safeText(data.about?.text || info.tagline || 'I learn through practical maintenance and automation work while building technical experience.');
  const ctaText = safeText(info.cta_text || 'Contact me');
  const ctaLink = safeText(info.cta_link || `mailto:${info.email || 'contact@example.com'}`);
  const resume = safeText(info.resume);
  const details = [safeText(info.location), safeText(info.email)].filter(Boolean).join('  ');

  if (name) {
    const brand = document.getElementById('brand-name');
    if (brand) brand.textContent = name;
  }

  const buttons = [`<a class="button button-primary" href="${ctaLink}">${ctaText}</a>`];
  if (resume) buttons.push(`<a class="button button-secondary" href="${resume}" target="_blank" rel="noopener">Resume</a>`);

  return createSection('hero', sectionTitles.hero, `
    <div class="hero-grid">
      <div>
        <p class="hero-eyebrow">${safeText(info.subtitle || 'Engineering Portfolio')}</p>
        <h1 class="hero-title">${headline}</h1>
        <p class="hero-intro">${summary}</p>
        <div class="hero-actions">${buttons.join('')}</div>
        ${details ? `<p class="hero-meta">${details}</p>` : ''}
      </div>
      <div class="hero-card hero-image">
        <img src="assets/profile.png" alt="${name}" loading="lazy">
      </div>
    </div>
  `);
}

function renderAbout(data) {
  const aboutText = safeText(data.about?.text || data.about?.summary || data.about?.bio);
  if (!aboutText) return null;
  return createSection('about', sectionTitles.about, `<p>${aboutText}</p>`);
}

function renderSimpleList(id, list) {
  if (!list || !list.length) return null;
  return createSection(id, sectionTitles[id], createPills(list));
}

function renderProjects(data, key = 'projects') {
  if (!data[key] || !data[key].length) return null;
  const cards = data[key]
    .map(item => {
      const title = safeText(item.title || item.name);
      const description = safeText(item.description || item.summary);
      const link = safeText(item.link);
      return `
        <article class="card project-card">
          <div>
            <h3>${title}</h3>
            <p>${description}</p>
          </div>
          ${link ? `<a class="link-small" href="${link}" target="_blank" rel="noopener">View</a>` : ''}
        </article>
      `;
    })
    .join('');
  return createSection(key, sectionTitles[key], `<div class="card-grid">${cards}</div>`);
}

function renderRecords(key, data, fields) {
  if (!data[key] || !data[key].length) return null;
  const cards = data[key]
    .map(item => {
      const title = safeText(item[fields.title] || '');
      const subtitle = safeText(item[fields.subtitle] || '');
      const period = safeText(item[fields.period] || '');
      const details = safeText(item[fields.details] || '');
      return `
        <article class="card">
          <div class="card-header">
            <h3>${title}</h3>
            ${subtitle ? `<p class="card-subtitle">${subtitle}</p>` : ''}
          </div>
          ${period ? `<p class="card-meta">${period}</p>` : ''}
          ${details ? `<p>${details}</p>` : ''}
        </article>
      `;
    })
    .join('');
  return createSection(key, sectionTitles[key], `<div class="card-grid">${cards}</div>`);
}

function renderAchievements(data) {
  if (!data.achievements || !data.achievements.length) return null;
  return createSection('achievements', sectionTitles.achievements, createList(data.achievements));
}

function renderTestimonials(data) {
  if (!data.testimonials || !data.testimonials.length) return null;
  const cards = data.testimonials
    .map(item => `
      <article class="card quote-card">
        <p class="quote">${safeText(item.quote)}</p>
        <p class="quote-author">${safeText(item.name)}${item.role ? `  ${safeText(item.role)}` : ''}</p>
      </article>
    `)
    .join('');
  return createSection('testimonials', sectionTitles.testimonials, `<div class="testimonial-grid">${cards}</div>`);
}

function renderBlog(data) {
  if (!data.blog || !data.blog.length) return null;
  const cards = data.blog
    .map(item => `
      <article class="card blog-card">
        <h3>${safeText(item.title)}</h3>
        <p>${safeText(item.summary || item.description)}</p>
        ${item.link ? `<a class="link-small" href="${item.link}" target="_blank" rel="noopener">Read article</a>` : ''}
      </article>
    `)
    .join('');
  return createSection('blog', sectionTitles.blog, `<div class="card-grid">${cards}</div>`);
}

function renderFaq(data) {
  if (!data.faq || !data.faq.length) return null;
  const cards = data.faq
    .map(item => `
      <article class="faq-card">
        <h3>${safeText(item.question)}</h3>
        <p>${safeText(item.answer)}</p>
      </article>
    `)
    .join('');
  return createSection('faq', sectionTitles.faq, `<div class="faq-grid">${cards}</div>`);
}

function renderGallery(data) {
  if (!data.gallery || !data.gallery.length) return null;
  const cards = data.gallery
    .map(item => `
      <article class="gallery-item">
        ${item.image ? `<img src="${item.image}" alt="${safeText(item.title || item.description || 'Gallery image')}">` : ''}
        ${item.title ? `<p>${safeText(item.title)}</p>` : ''}
      </article>
    `)
    .join('');
  return createSection('gallery', sectionTitles.gallery, `<div class="gallery-grid">${cards}</div>`);
}

function renderTimeline(data) {
  if (!data.timeline || !data.timeline.length) return null;
  const cards = data.timeline
    .map(item => `
      <article class="timeline-item">
        <span class="timeline-date">${safeText(item.year || item.period)}</span>
        <h3>${safeText(item.title || item.event)}</h3>
        <p>${safeText(item.description)}</p>
      </article>
    `)
    .join('');
  return createSection('timeline', sectionTitles.timeline, `<div class="timeline-list">${cards}</div>`);
}

function renderContact(data, socialLinks) {
  const text = safeText(data.contact?.text || data.about?.cta || 'I am available for internships, practical roles, and learning projects.');
  const email = safeText(data.basic_info?.email);
  const button = email ? `<a class="button button-primary" href="mailto:${email}">Email</a>` : '';
  const socials = socialLinks && socialLinks.length
    ? `<div class="pill-grid">${socialLinks.map(item => `<a class="pill" href="${item.link}" target="_blank" rel="noopener">${safeText(item.platform)}</a>`).join('')}</div>`
    : '';
  return createSection('contact', sectionTitles.contact, `<div class="contact-panel"><p>${text}</p><div class="hero-actions">${button}</div>${socials}</div>`);
}

function renderFooter(name) {
  if (!footerEl) return;
  footerEl.innerHTML = `
    <p> ${new Date().getFullYear()} ${safeText(name || 'Your Name')}</p>
    <p>Markdown-driven portfolio template.</p>
  `;
}

function renderContent(data) {
  const sections = [];
  const navItems = [];

  if (isSectionVisible(data.basic_info)) {
    const hero = renderHero(data);
    if (hero) {
      sections.push(hero);
      navItems.push({ id: 'hero', label: 'Home' });
    }
  }

  const renderers = [
    { key: 'about', fn: renderAbout },
    { key: 'skills', fn: data => renderSimpleList('skills', data.skills) },
    { key: 'tech_stack', fn: data => renderSimpleList('tech_stack', data.tech_stack) },
    { key: 'services', fn: data => renderSimpleList('services', data.services) },
    { key: 'projects', fn: data => renderProjects(data, 'projects') },
    { key: 'featured_projects', fn: data => renderProjects(data, 'featured_projects') },
    { key: 'experience', fn: data => renderRecords('experience', data, { title: 'role', subtitle: 'company', period: 'period', details: 'description' }) },
    { key: 'education', fn: data => renderRecords('education', data, { title: 'degree', subtitle: 'institution', period: 'period', details: 'description' }) },
    { key: 'certifications', fn: data => renderRecords('certifications', data, { title: 'title', subtitle: 'issuer', period: 'year', details: 'description' }) },
    { key: 'achievements', fn: renderAchievements },
    { key: 'testimonials', fn: renderTestimonials },
    { key: 'blog', fn: renderBlog },
    { key: 'faq', fn: renderFaq },
    { key: 'gallery', fn: renderGallery },
    { key: 'timeline', fn: renderTimeline },
    { key: 'languages', fn: data => renderSimpleList('languages', data.languages) },
    { key: 'tools', fn: data => renderSimpleList('tools', data.tools) },
    { key: 'interests', fn: data => renderSimpleList('interests', data.interests) }
  ];

  renderers.forEach(renderer => {
    if (!isSectionVisible(data[renderer.key])) return;
    const section = renderer.fn(data);
    if (!section) return;
    sections.push(section);
    navItems.push({ id: section.id, label: sectionTitles[section.id] || section.id });
  });

  if (isSectionVisible(data.contact)) {
    const contact = renderContact(data, data.social_links || []);
    if (contact) {
      sections.push(contact);
      navItems.push({ id: 'contact', label: sectionTitles.contact });
    }
  }

  contentRoot.innerHTML = '';
  sections.forEach(section => contentRoot.appendChild(section));
  buildNav(navItems);
  renderFooter(data.basic_info?.name);
}

async function loadContent() {
  try {
    const response = await fetch('content.md', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('content.md not found');
    }
    const text = await response.text();
    const data = parseContent(text);
    applySeo(data.seo || {});
    applyTheme(data);
    renderContent(data);
  } catch (error) {
    contentRoot.innerHTML = `<div class="error-message"><p>Unable to load content.md. Please run a local server and ensure the file is available.</p></div>`;
    console.error(error);
  }
}

loadContent();