(function () {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const ecosystems = window.PORTFOLIO_ECOSYSTEMS || [];
  const root = document.documentElement;

  const currentYear = document.getElementById('currentYear');
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  const navLinks = Array.from(document.querySelectorAll('.primary-nav a'));

  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  const readableToggle = document.getElementById('readableToggle');

  const privacyBanner = document.getElementById('privacyBanner');
  const privacyDetails = document.getElementById('privacyDetails');
  const privacyAccept = document.getElementById('privacyAccept');
  const privacyModal = document.getElementById('privacyModal');
  const privacyModalTitle = document.getElementById('privacyModalTitle');
  const privacyClose = document.getElementById('privacyClose');
  const privacyModalBody = Array.from(document.querySelectorAll('.modal-body p'));

  const i18nTextEntries = Array.from(document.querySelectorAll('[data-i18n]'))
    .map((node) => ({ node, key: node.getAttribute('data-i18n') }))
    .filter((entry) => entry.key);
  const i18nAttrEntries = [
    ...Array.from(document.querySelectorAll('[data-i18n-placeholder]')).map((node) => ({
      node,
      attr: 'placeholder',
      key: node.getAttribute('data-i18n-placeholder'),
    })),
    ...Array.from(document.querySelectorAll('[data-i18n-aria-label]')).map((node) => ({
      node,
      attr: 'aria-label',
      key: node.getAttribute('data-i18n-aria-label'),
    })),
    ...Array.from(document.querySelectorAll('[data-i18n-title]')).map((node) => ({
      node,
      attr: 'title',
      key: node.getAttribute('data-i18n-title'),
    })),
    ...Array.from(document.querySelectorAll('[data-i18n-alt]')).map((node) => ({
      node,
      attr: 'alt',
      key: node.getAttribute('data-i18n-alt'),
    })),
  ].filter((entry) => entry.key);

  const projectsGrid = document.getElementById('projectsGrid');
  const projectSearch = document.getElementById('projectSearch');
  const filterChips = Array.from(document.querySelectorAll('.filter-chip'));
  const projectsEmpty = document.getElementById('projectsEmpty');
  const detailRoot = document.querySelector('[data-project-slug]');

  const contactForm = document.getElementById('contactForm');
  const contactSubmitButton = document.getElementById('contactSubmitButton');
  const contactFormStatus = document.getElementById('contactFormStatus');
  const contactTurnstile = document.getElementById('contactTurnstile');
  const turnstileScript = document.getElementById('turnstileScript');

  const themeStorageKey = 'jh-theme';
  const readableStorageKey = 'jh-readable';
  const languageStorageKey = 'jh-language';
  const privacyStorageKey = 'jh-privacy';

  let activeFilter = 'all';
  let turnstileWidgetId = null;
  let turnstileToken = '';
  let projectSearchTimer = null;
  let currentLang = 'en';

  const copy = {
    en: {
      brandRole: 'Electrical & Automation Engineering',
      navHome: 'Home',
      navAbout: 'About',
      navProjects: 'Projects',
      navContact: 'Contact',
      theme: 'Theme',
      lang: 'FI',
      dyslexic: 'Dyslexic',
      homeEyebrow: 'Portfolio',
      homeTitle: 'Jibran Hussain',
      homeTagline: 'Learning, building, and growing in engineering.',
      homeLead: 'I started from practical work and moved toward engineering studies because I wanted to understand systems more deeply. Today I study Electrical & Automation Engineering and keep building skills for the future.',
      homeAboutCta: 'About Me',
      homeProjectsCta: 'Projects',
      homeContactCta: 'Contact',
      selectedWorkEyebrow: 'Selected work',
      selectedWorkTitle: 'Projects I’m building.',
      selectedWorkCta: 'All Projects',
      aboutEyebrow: 'About',
      aboutTitle: 'I like understanding how things work.',
      aboutLead: 'My background is in maintenance, where I learned that small details matter and problems rarely fix themselves. Now I study Electrical & Automation Engineering in Finland and want to build a stronger future in technical work.',
      backgroundEyebrow: 'Background',
      backgroundTitle: 'Who I am.',
      backgroundLead: 'I’m calm by nature and I like useful work. I prefer learning real skills, solving actual problems, and getting better step by step instead of talking big.',
      backgroundCardLabel: 'Background',
      backgroundCardCopy: 'Started from hands-on work, tools, faults, repairs, and everyday responsibility.',
      focusCardLabel: 'Focus',
      focusCardCopy: 'Automation, electrical systems, control logic, and becoming better every year.',
      workStyleCardLabel: 'Work style',
      workStyleCardCopy: 'Show up, think clearly, do the job properly, keep learning.',
      skillsEyebrow: 'Skills',
      skillsTitle: 'Things I’m good at.',
      coreStrengthsTitle: 'Core strengths',
      workApproachTitle: 'Work approach',
      programmingEyebrow: 'Programming',
      programmingTitle: 'Tools I use and study.',
      experienceEyebrow: 'Experience',
      experienceTitle: 'Hands-on roles and practical training.',
      educationEyebrow: 'Education',
      educationTitle: 'Formal training in automation and electrical systems.',
      toolsEyebrow: 'Tools & Tech',
      toolsTitle: 'Software and systems I use.',
      projectsEyebrow: 'Projects',
      projectsTitle: 'Projects where I test and learn.',
      projectsLead: 'This is where I document what I build and study. Each project is a step toward understanding systems better, not just completing tasks.',
      projectsEvolving: 'This portfolio is actively evolving. More completed automation projects and technical documentation are being added over the coming days.',
      projectsSearchLabel: 'Search projects',
      projectsSearchPlaceholder: 'Search by system, skill, or project name',
      projectsFilterAria: 'Project filters',
      projectsFilterAll: 'All',
      projectsFilterBuild: 'Active Builds',
      projectsFilterRoadmap: 'Roadmap',
      projectsEmpty: 'No projects match the current search or filter.',
      contactEyebrow: 'Contact',
      contactHeroTitle: 'Available for Roles & Engineering Opportunities',
      contactLead: 'If you have a role, internship, project, or a good technical opportunity, feel free to contact me. I’m always open to meaningful conversations and new directions.',
      contactAvailability: 'Open to internships, junior engineering roles, and automation opportunities in Finland / EU.',
      directContactEyebrow: 'Direct contact',
      directContactTitle: 'Contact',
      contactEmailLabel: 'Email',
      contactLocationLabel: 'Location',
      contactLocationValue: 'Finland',
      contactProfilesLabel: 'Profiles',
      contactFormName: 'Name',
      contactFormEmail: 'Email',
      contactFormSubject: 'Subject',
      contactFormMessage: 'Message',
      contactFormNamePlaceholder: 'Your name',
      contactFormEmailPlaceholder: 'Your email',
      contactFormSubjectPlaceholder: 'Reason for contact',
      contactFormPlaceholder: 'Tell me about the role, project, or opportunity.',
      contactFormNote: 'Replies are typically reviewed within a few business days. Clear messages are appreciated.',
      contactSubmit: 'Send message',
      contactEmailInstead: 'Email instead',
      footerCopy: 'Thanks for visiting my portfolio.',
      privacyBanner: 'We store only minimal local preferences and may use privacy-friendly analytics to improve the experience.',
      privacyDetails: 'Details',
      privacyAccept: 'Accept',
      privacyTitle: 'Privacy policy',
      privacyBodyOne: 'This site stores only essential local preferences, such as language and readable mode. No tracking cookies are used without permission.',
      privacyBodyTwo: 'You can change preferences anytime from your browser. This experience is built to be privacy-friendly and non-intrusive.',
      switchLight: 'Switch to light mode',
      switchDark: 'Switch to dark mode',
      goHome: 'Go to home',
      toggleNavigation: 'Toggle navigation',
      primaryNavigation: 'Primary navigation',
      footerNavigation: 'Footer navigation',
      skipToMain: 'Skip to main content',
      privacyClose: 'Close privacy details',
      viewCv: 'View CV',
      updatedApril2026: 'Updated April 2026',
      footerOpportunity: 'Open to internships, junior engineering roles, and technical opportunities.',
      footerContactMe: 'Contact me',
      viewProject: 'View Project',
      projectActiveBuildStatus: 'ACTIVE BUILD',
      projectCaseStudyBuildStatus: 'CASE STUDY BUILD',
      projectConveyorCategory: 'MATERIAL HANDLING AUTOMATION',
      projectMccCategory: 'ELECTRICAL POWER AND DRIVES',
      projectSmartConveyorTitle: 'Smart Conveyor System',
      projectMotorControlTitle: 'Motor Control Study',
      selectedConveyorSummary: 'A control logic project built around sensors, sequence control, fault handling, and safe machine behavior.',
      selectedMotorSummary: 'A practical project focused on starters, protection, signals, and how motors are controlled in real systems.',
      skillFindingFaults: 'Finding faults',
      skillMaintenanceTasks: 'Maintenance tasks',
      skillPlcBasics: 'PLC basics',
      skillElectricalWork: 'Electrical work',
      approachReliable: 'Reliable attitude',
      approachCommunication: 'Clear communication',
      approachSafety: 'Safety first',
      approachLearning: 'Willing to learn',
      cppBasics: 'C++ basics',
      experienceMaintenanceRole: 'Maintenance Technician, ARE Oy',
      experienceMaintenanceCopy: 'Supported preventive maintenance, troubleshooting, and inspections on electrical and automation equipment.',
      experienceInternRole: 'Intern, ARE Oy',
      experienceInternCopy: 'Assisted maintenance operations and gained exposure to industrial electrical systems, control panels, and automation diagnostics.',
      experienceStudentRole: 'Student roles',
      experienceStudentCopy: 'Worked in construction and maintenance teams while learning disciplined routines, teamwork, and technical responsibility.',
      educationDegree: "Bachelor's Degree Programme in Electrical and Automation Engineering",
      educationSchool: 'HAMK University of Applied Sciences, 2025-2027 expected.',
      educationCopy: 'Focused on electrical systems, automation, PLC programming, measurements, and technical development for practical engineering workflows.',
      hvacSystems: 'HVAC systems',
      projectCaseStudy: 'Project case study',
      projectProblem: 'Engineering problem',
      projectSeeDetails: 'See case-study view',
      projectHideDetails: 'Hide details',
      githubPublishingNext: 'GitHub publishing next',
      statusLive: 'Live',
      statusBuild: 'Active build',
      statusRoadmap: 'Roadmap',
      contactSending: 'Sending...',
    },
    fi: {
      brandRole: 'Sähkö- ja automaatiotekniikka',
      navHome: 'Etusivu',
      navAbout: 'Tietoa',
      navProjects: 'Projektit',
      navContact: 'Yhteys',
      theme: 'Teema',
      lang: 'EN',
      dyslexic: 'Lukutila',
      homeEyebrow: 'Portfolio',
      homeTitle: 'Jibran Hussain',
      homeTagline: 'Opin, rakennan ja kehityn insinöörityössä.',
      homeLead: 'Lähdin käytännön työstä insinööriopintoihin, koska halusin ymmärtää järjestelmiä syvemmin. Nyt opiskelen sähkö- ja automaatiotekniikkaa ja rakennan taitojani tulevaisuutta varten.',
      homeAboutCta: 'Tietoa minusta',
      homeProjectsCta: 'Projektit',
      homeContactCta: 'Yhteys',
      selectedWorkEyebrow: 'Valitut työt',
      selectedWorkTitle: 'Projektit, joita rakennan.',
      selectedWorkCta: 'Kaikki projektit',
      aboutEyebrow: 'Tietoa',
      aboutTitle: 'Pidän siitä, että ymmärrän, miten asiat toimivat.',
      aboutLead: 'Taustani on kunnossapidossa, jossa opin, että pienillä yksityiskohdilla on väliä ja ongelmat eivät yleensä korjaannu itsestään. Nyt opiskelen sähkö- ja automaatiotekniikkaa Suomessa ja haluan rakentaa vahvemman tulevaisuuden teknisessä työssä.',
      backgroundEyebrow: 'Tausta',
      backgroundTitle: 'Kuka olen.',
      backgroundLead: 'Olen luonteeltani rauhallinen ja pidän hyödyllisestä työstä. Mieluummin opin oikeita taitoja, ratkaisen todellisia ongelmia ja kehityn askel kerrallaan kuin puhun suuria.',
      backgroundCardLabel: 'Tausta',
      backgroundCardCopy: 'Lähdin liikkeelle käytännön työstä, työkaluista, vioista, korjauksista ja päivittäisestä vastuusta.',
      focusCardLabel: 'Fokus',
      focusCardCopy: 'Automaatio, sähköjärjestelmät, ohjauslogiikka ja jatkuva kehittyminen.',
      workStyleCardLabel: 'Työtapa',
      workStyleCardCopy: 'Tule paikalle, ajattele selkeästi, tee työ kunnolla ja jatka oppimista.',
      skillsEyebrow: 'Taidot',
      skillsTitle: 'Asiat, joissa olen hyvä.',
      coreStrengthsTitle: 'Ydinvahvuudet',
      workApproachTitle: 'Työtapa',
      programmingEyebrow: 'Ohjelmointi',
      programmingTitle: 'Työkalut, joita käytän ja opiskelen.',
      experienceEyebrow: 'Kokemus',
      experienceTitle: 'Käytännön roolit ja harjoittelu.',
      educationEyebrow: 'Koulutus',
      educationTitle: 'Muodollinen koulutus automaatiosta ja sähköjärjestelmistä.',
      toolsEyebrow: 'Työkalut ja teknologia',
      toolsTitle: 'Ohjelmistot ja järjestelmät, joita käytän.',
      projectsEyebrow: 'Projektit',
      projectsTitle: 'Projektit, joissa testaan ja opin.',
      projectsLead: 'Tänne dokumentoin, mitä rakennan ja opiskelen. Jokainen projekti on askel kohti parempaa järjestelmien ymmärtämistä, ei vain tehtävien suorittamista.',
      projectsEvolving: 'Portfolio kehittyy aktiivisesti. Lisää valmiita automaatioprojekteja ja teknistä dokumentaatiota lisätään vähitellen.',
      projectsSearchLabel: 'Hae projekteja',
      projectsSearchPlaceholder: 'Hae järjestelmän, taidon tai projektin nimellä',
      projectsFilterAria: 'Projektisuodattimet',
      projectsFilterAll: 'Kaikki',
      projectsFilterBuild: 'Aktiiviset',
      projectsFilterRoadmap: 'Suunnitteilla',
      projectsEmpty: 'Yksikään projekti ei vastaa hakua tai suodatinta.',
      contactEyebrow: 'Yhteys',
      contactHeroTitle: 'Avoin rooleille ja teknisille mahdollisuuksille',
      contactLead: 'Jos sinulla on rooli, harjoittelu, projekti tai hyvä tekninen mahdollisuus, ota rohkeasti yhteyttä. Olen avoin merkityksellisille keskusteluille ja uusille suunnille.',
      contactAvailability: 'Avoin harjoitteluille, junioritason insinöörirooleille ja automaatiomahdollisuuksille Suomessa / EU:ssa.',
      directContactEyebrow: 'Suora yhteys',
      directContactTitle: 'Yhteys',
      contactEmailLabel: 'Sähköposti',
      contactLocationLabel: 'Sijainti',
      contactLocationValue: 'Suomi',
      contactProfilesLabel: 'Profiilit',
      contactFormName: 'Nimi',
      contactFormEmail: 'Sähköposti',
      contactFormSubject: 'Aihe',
      contactFormMessage: 'Viesti',
      contactFormNamePlaceholder: 'Nimesi',
      contactFormEmailPlaceholder: 'Sähköpostisi',
      contactFormSubjectPlaceholder: 'Yhteydenoton syy',
      contactFormPlaceholder: 'Kerro roolista, projektista tai mahdollisuudesta.',
      contactFormNote: 'Vastaukset tarkistetaan yleensä muutaman arkipäivän kuluessa. Selkeät viestit ovat arvostettuja.',
      contactSubmit: 'Lähetä viesti',
      contactEmailInstead: 'Lähetä sähköpostia',
      footerCopy: 'Kiitos kun vierailit portfoliossani.',
      privacyBanner: 'Tallennamme vain minimaaliset paikalliset asetukset ja voimme käyttää tietosuojaystävällistä analytiikkaa käyttökokemuksen parantamiseen.',
      privacyDetails: 'Lisätiedot',
      privacyAccept: 'Hyväksy',
      privacyTitle: 'Tietosuojakäytäntö',
      privacyBodyOne: 'Tämä sivusto tallentaa vain välttämättömät paikalliset asetukset, kuten kielen ja lukutilan. Seurantaevästeitä ei käytetä ilman lupaa.',
      privacyBodyTwo: 'Voit muuttaa asetuksia milloin tahansa selaimessa. Kokemus on suunniteltu tietosuojaystävälliseksi ja huomaamattomaksi.',
      switchLight: 'Vaihda vaaleaan tilaan',
      switchDark: 'Vaihda tummaan tilaan',
      goHome: 'Siirry etusivulle',
      toggleNavigation: 'Avaa tai sulje valikko',
      primaryNavigation: 'Päänavigaatio',
      footerNavigation: 'Alatunnisteen navigaatio',
      skipToMain: 'Siirry pääsisältöön',
      privacyClose: 'Sulje tietosuojatiedot',
      viewCv: 'Avaa CV',
      updatedApril2026: 'Päivitetty huhtikuussa 2026',
      footerOpportunity: 'Avoin harjoitteluille, junioritason insinöörirooleille ja teknisille mahdollisuuksille.',
      footerContactMe: 'Ota yhteyttä',
      viewProject: 'Avaa projekti',
      projectActiveBuildStatus: 'AKTIIVINEN RAKENNUS',
      projectCaseStudyBuildStatus: 'CASE STUDY -RAKENNUS',
      projectConveyorCategory: 'MATERIAALINKÄSITTELYN AUTOMAATIO',
      projectMccCategory: 'SÄHKÖTEHO JA KÄYTÖT',
      projectSmartConveyorTitle: 'Älykäs kuljetinjärjestelmä',
      projectMotorControlTitle: 'Moottorinohjauksen tutkimus',
      selectedConveyorSummary: 'Ohjauslogiikkaprojekti antureista, sekvenssiohjauksesta, vikojen käsittelystä ja turvallisesta konekäyttäytymisestä.',
      selectedMotorSummary: 'Käytännön projekti käynnistimistä, suojauksista, signaaleista ja siitä, miten moottoreita ohjataan oikeissa järjestelmissä.',
      skillFindingFaults: 'Vianhaku',
      skillMaintenanceTasks: 'Kunnossapitotyöt',
      skillPlcBasics: 'PLC-perusteet',
      skillElectricalWork: 'Sähkötyöt',
      approachReliable: 'Luotettava asenne',
      approachCommunication: 'Selkeä viestintä',
      approachSafety: 'Turvallisuus ensin',
      approachLearning: 'Halukas oppimaan',
      cppBasics: 'C++-perusteet',
      experienceMaintenanceRole: 'Kunnossapitoasentaja, ARE Oy',
      experienceMaintenanceCopy: 'Tuin ennakoivaa kunnossapitoa, vianhakua ja tarkastuksia sähkö- ja automaatiolaitteissa.',
      experienceInternRole: 'Harjoittelija, ARE Oy',
      experienceInternCopy: 'Avustin kunnossapitotöissä ja sain kokemusta teollisista sähköjärjestelmistä, ohjauskeskuksista ja automaation diagnostiikasta.',
      experienceStudentRole: 'Opiskelijaroolit',
      experienceStudentCopy: 'Työskentelin rakennus- ja kunnossapitotiimeissä ja opin kurinalaisia rutiineja, tiimityötä ja teknistä vastuuta.',
      educationDegree: 'Sähkö- ja automaatiotekniikan insinöörikoulutus',
      educationSchool: 'HAMK Hämeen ammattikorkeakoulu, arvioitu valmistuminen 2025-2027.',
      educationCopy: 'Painotus sähköjärjestelmissä, automaatiossa, PLC-ohjelmoinnissa, mittauksissa ja käytännön insinöörityön kehittämisessä.',
      hvacSystems: 'LVI-järjestelmät',
      projectCaseStudy: 'Projektin case study',
      projectProblem: 'Insinööriongelma',
      projectSeeDetails: 'Avaa case study',
      projectHideDetails: 'Piilota tiedot',
      githubPublishingNext: 'GitHub-julkaisu seuraavaksi',
      statusLive: 'Julkaistu',
      statusBuild: 'Aktiivinen rakennus',
      statusRoadmap: 'Suunnitteilla',
      contactSending: 'Lähetetään...',
    },
  };

  function t(key) {
    return copy[currentLang]?.[key] || copy.en[key] || '';
  }

  function applyStaticTranslations() {
    i18nTextEntries.forEach(({ node, key }) => {
      const value = t(key);
      if (value) node.textContent = value;
    });

    i18nAttrEntries.forEach(({ node, attr, key }) => {
      const value = t(key);
      if (value) node.setAttribute(attr, value);
    });
  }

  function setYear() {
    if (currentYear) currentYear.textContent = String(new Date().getFullYear());
  }

  function iconSvg(name) {
    const icons = {
      dyslexic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19V7.5A2.5 2.5 0 0 1 7.5 5H12"></path><path d="M5 14h7"></path><path d="M15 19V5"></path><path d="M15 12h4a2 2 0 0 0 0-4h-4"></path></svg>',
      sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"></circle><path d="M12 2.5v2.2"></path><path d="M12 19.3v2.2"></path><path d="m4.93 4.93 1.56 1.56"></path><path d="m17.51 17.51 1.56 1.56"></path><path d="M2.5 12h2.2"></path><path d="M19.3 12h2.2"></path><path d="m4.93 19.07 1.56-1.56"></path><path d="m17.51 6.49 1.56-1.56"></path></svg>',
      moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A7.5 7.5 0 1 1 9.5 4a6 6 0 1 0 10.5 10.5Z"></path></svg>',
    };
    return icons[name] || '';
  }

  function setButtonIcon(button, iconName) {
    const iconNode = button?.querySelector('.control-icon');
    if (iconNode) iconNode.innerHTML = iconSvg(iconName);
  }

  function setButtonText(button, text) {
    const labelNode = button?.querySelector('.control-button-text');
    if (labelNode) labelNode.textContent = text;
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(themeStorageKey, theme);
    if (themeToggle) {
      setButtonText(themeToggle, t('theme'));
      setButtonIcon(themeToggle, theme === 'dark' ? 'sun' : 'moon');
      themeToggle.setAttribute('aria-label', theme === 'dark' ? t('switchLight') : t('switchDark'));
    }
  }

  function initTheme() {
    if (!themeToggle) return;
    const storedTheme = localStorage.getItem(themeStorageKey);
    applyTheme(storedTheme || 'light');
    themeToggle.addEventListener('click', () => {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  function applyReadableMode(enabled) {
    root.classList.toggle('readable-mode', enabled);
    readableToggle?.setAttribute('aria-pressed', String(enabled));
    if (readableToggle) {
      setButtonText(readableToggle, t('dyslexic'));
      setButtonIcon(readableToggle, 'dyslexic');
    }
    localStorage.setItem(readableStorageKey, String(enabled));
  }

  function initReadableMode() {
    if (!readableToggle) return;
    applyReadableMode(localStorage.getItem(readableStorageKey) === 'true');
    readableToggle.addEventListener('click', () => {
      applyReadableMode(!root.classList.contains('readable-mode'));
    });
  }

  function applyLanguage(language) {
    currentLang = language === 'fi' ? 'fi' : 'en';
    localStorage.setItem(languageStorageKey, currentLang);
    document.documentElement.lang = currentLang;

    if (langToggle) {
      langToggle.textContent = t('lang');
      langToggle.setAttribute('aria-pressed', String(currentLang === 'fi'));
    }

    const bannerText = privacyBanner?.querySelector('p');
    if (bannerText) bannerText.textContent = t('privacyBanner');
    if (privacyDetails) privacyDetails.textContent = t('privacyDetails');
    if (privacyAccept) privacyAccept.textContent = t('privacyAccept');
    if (privacyModalTitle) privacyModalTitle.textContent = t('privacyTitle');
    if (privacyModalBody[0]) privacyModalBody[0].textContent = t('privacyBodyOne');
    if (privacyModalBody[1]) privacyModalBody[1].textContent = t('privacyBodyTwo');

    applyStaticTranslations();
    applyTheme(root.getAttribute('data-theme') || 'light');
    applyReadableMode(root.classList.contains('readable-mode'));
    updateRenderedProjects();
    populateProjectDetail();
  }

  function initLanguage() {
    currentLang = localStorage.getItem(languageStorageKey) === 'fi' ? 'fi' : 'en';
    applyLanguage(currentLang);
    langToggle?.addEventListener('click', () => {
      applyLanguage(currentLang === 'en' ? 'fi' : 'en');
    });
  }

  function initNav() {
    if (!navToggle || !primaryNav) return;

    function closeMenu({ restoreFocus = false } = {}) {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      if (restoreFocus) navToggle.focus();
    }

    function openMenu() {
      primaryNav.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
    }

    navToggle.addEventListener('click', () => {
      if (primaryNav.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    document.addEventListener('click', (event) => {
      if (!primaryNav.classList.contains('is-open')) return;
      if (primaryNav.contains(event.target) || navToggle.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (!primaryNav.classList.contains('is-open')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => closeMenu());
    });
  }

  function initReveal() {
    const nodes = Array.from(document.querySelectorAll('.reveal'));
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    nodes.forEach((node) => observer.observe(node));
  }

  function openPrivacyModal() {
    if (!privacyModal) return;
    privacyModal.hidden = false;
    privacyModal.setAttribute('aria-hidden', 'false');
  }

  function closePrivacyModal() {
    if (!privacyModal) return;
    privacyModal.hidden = true;
    privacyModal.setAttribute('aria-hidden', 'true');
  }

  function initPrivacy() {
    if (!privacyBanner || !privacyModal) return;
    const accepted = localStorage.getItem(privacyStorageKey) === 'true';
    privacyBanner.hidden = accepted;

    privacyDetails?.addEventListener('click', openPrivacyModal);
    privacyClose?.addEventListener('click', closePrivacyModal);
    privacyAccept?.addEventListener('click', () => {
      localStorage.setItem(privacyStorageKey, 'true');
      privacyBanner.hidden = true;
      closePrivacyModal();
    });

    privacyModal.addEventListener('click', (event) => {
      if (event.target === privacyModal) closePrivacyModal();
    });
  }

  function getStatusMeta(status) {
    if (status === 'live') return { label: t('statusLive'), className: 'status-live' };
    if (status === 'build') return { label: t('statusBuild'), className: 'status-build' };
    return { label: t('statusRoadmap'), className: 'status-roadmap' };
  }

  function createProjectCard(project) {
    const status = getStatusMeta(project.status);
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.dataset.slug = project.slug;
    card.dataset.status = project.status;
    card.dataset.search = [
      project.title,
      project.category,
      project.summary,
      project.problem,
      Array.isArray(project.technologies) ? project.technologies.join(' ') : '',
      Array.isArray(project.skills) ? project.skills.join(' ') : '',
    ].join(' ').toLowerCase();

    card.innerHTML = `
      <div class="project-card-top">
        <span class="status-badge ${status.className}" data-project-card-status>${status.label}</span>
        <span class="project-category" data-project-card-category>${project.category}</span>
      </div>
      <h3 data-project-card-title>${project.title}</h3>
      <p class="project-summary" data-project-card-summary>${project.summary}</p>
      <div class="project-problem">
        <p class="micro-label" data-project-problem-label>${t('projectProblem')}</p>
        <p class="panel-copy" data-project-card-problem>${project.problem}</p>
      </div>
      <button class="project-toggle" type="button" aria-expanded="false">${t('projectSeeDetails')}</button>
      <div class="project-details" hidden>
        <ul class="pill-list" data-project-card-technologies>${(project.technologies || []).map((item) => `<li>${item}</li>`).join('')}</ul>
        <p class="project-why" data-project-card-why>${project.why || ''}</p>
        <div class="project-links">
          <a class="button button-primary" href="/projects/${project.slug}/">${t('projectCaseStudy')}</a>
          ${project.github ? `<a class="button button-secondary" href="${project.github}" target="_blank" rel="noopener">GitHub</a>` : `<span class="button button-tertiary">${t('githubPublishingNext')}</span>`}
        </div>
      </div>
    `;

    return card;
  }

  function applyProjectFilters() {
  if (!projectsGrid) return;

  const query = String(projectSearch?.value || '').trim().toLowerCase();
  const cards = Array.from(projectsGrid.querySelectorAll('.project-card'));
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesFilter = activeFilter === 'all' || card.dataset.status === activeFilter;
    const matchesQuery = !query || card.dataset.search.includes(query);
    const show = matchesFilter && matchesQuery;

    card.hidden = !show;
    if (show) visibleCount += 1;
  });

  const sections = Array.from(projectsGrid.querySelectorAll('.project-ecosystem-section'));

  sections.forEach((section) => {
    const visibleCards = Array.from(section.querySelectorAll('.project-card')).filter(
      (card) => !card.hidden
    ).length;

    section.hidden = visibleCards === 0;
  });

  if (projectsEmpty) projectsEmpty.hidden = visibleCount !== 0;
}

  function updateRenderedProjects() {
    if (!projectsGrid) return;
    Array.from(projectsGrid.querySelectorAll('.project-card')).forEach((card) => {
      const project = projects.find((item) => item.slug === card.dataset.slug);
      if (!project) return;
      const status = getStatusMeta(project.status);
      const statusNode = card.querySelector('[data-project-card-status]');
      const problemLabel = card.querySelector('[data-project-problem-label]');
      const toggle = card.querySelector('.project-toggle');
      const details = card.querySelector('.project-details');
      const primaryButton = card.querySelector('.project-links .button-primary');
      const pending = card.querySelector('.project-links .button-tertiary');
      if (statusNode) statusNode.textContent = status.label;
      if (problemLabel) problemLabel.textContent = t('projectProblem');
      if (toggle) toggle.textContent = details?.hidden === false ? t('projectHideDetails') : t('projectSeeDetails');
      if (primaryButton) primaryButton.textContent = t('projectCaseStudy');
      if (pending) pending.textContent = t('githubPublishingNext');
    });
    applyProjectFilters();
  }

  function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';
    projects.forEach((project) => projectsGrid.appendChild(createProjectCard(project)));
    initReveal();
    applyProjectFilters();
  }

  function initProjectsPage() {
    if (!projectsGrid) return;

    renderProjects();

    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        activeFilter = chip.dataset.filter || 'all';
        filterChips.forEach((button) => button.classList.toggle('is-active', button === chip));
        applyProjectFilters();
      });
    });

    projectSearch?.addEventListener('input', () => {
      if (projectSearchTimer !== null) window.clearTimeout(projectSearchTimer);
      projectSearchTimer = window.setTimeout(() => {
        applyProjectFilters();
        projectSearchTimer = null;
      }, 150);
    });

    projectsGrid.addEventListener('click', (event) => {
      const toggle = event.target.closest('.project-toggle');
      if (!toggle) return;
      const card = toggle.closest('.project-card');
      const details = card?.querySelector('.project-details');
      if (!card || !details) return;
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      toggle.textContent = isExpanded ? t('projectSeeDetails') : t('projectHideDetails');
      details.hidden = isExpanded;
    });
  }

  function populateProjectDetail() {
    if (!detailRoot) return;
    const slug = detailRoot.getAttribute('data-project-slug');
    const project = projects.find((item) => item.slug === slug);
    if (!project) return;

    const status = getStatusMeta(project.status);
    const title = detailRoot.querySelector('[data-project-title]');
    const intro = detailRoot.querySelector('[data-project-intro]');
    const summary = detailRoot.querySelector('[data-project-summary]');
    const problem = detailRoot.querySelector('[data-project-problem]');
    const why = detailRoot.querySelector('[data-project-why]');
    const visual = detailRoot.querySelector('[data-project-visual]');
    const category = detailRoot.querySelector('[data-project-category]');
    const statusNode = detailRoot.querySelector('[data-project-status]');
    const technologies = detailRoot.querySelector('[data-project-technologies]');
    const skills = detailRoot.querySelector('[data-project-skills]');
    const outcomes = detailRoot.querySelector('[data-project-outcomes]');
    const nextSteps = detailRoot.querySelector('[data-project-next-steps]');
    const githubButton = detailRoot.querySelector('[data-project-github]');
    const githubPending = detailRoot.querySelector('[data-project-github-pending]');

    document.title = `${project.title} | ${t('navProjects')} | Jibran Hussain`;
    if (title) title.textContent = project.title;
    if (intro) intro.textContent = project.intro || '';
    if (summary) summary.textContent = project.overview || '';
    if (problem) problem.textContent = project.problem || '';
    if (why) why.textContent = project.why || '';
    if (visual) visual.textContent = project.visual || '';
    if (category) category.textContent = project.category || '';
    if (statusNode) {
      statusNode.textContent = status.label;
      statusNode.className = statusNode.className.replace(/status-(live|build|roadmap)/g, '').trim();
      statusNode.classList.add(status.className);
    }
    if (technologies) technologies.innerHTML = (project.technologies || []).map((item) => `<li>${item}</li>`).join('');
    if (skills) skills.innerHTML = (project.skills || []).map((item) => `<li>${item}</li>`).join('');
    if (outcomes) outcomes.innerHTML = (project.outcomes || []).map((item) => `<li>${item}</li>`).join('');
    if (nextSteps) nextSteps.innerHTML = (project.nextSteps || []).map((item) => `<li>${item}</li>`).join('');

    if (githubPending) {
      githubPending.textContent = t('githubPublishingNext');
    } else if (githubButton && !project.github) {
      const pending = document.createElement('span');
      pending.className = 'button button-tertiary';
      pending.dataset.projectGithubPending = '';
      pending.textContent = t('githubPublishingNext');
      githubButton.replaceWith(pending);
    } else if (githubButton && project.github) {
      githubButton.href = project.github;
    }
  }

  function setFormStatus(message = '', type = '') {
    if (!contactFormStatus) return;
    contactFormStatus.textContent = message;
    contactFormStatus.classList.remove('is-success', 'is-error');
    if (type === 'success') contactFormStatus.classList.add('is-success');
    if (type === 'error') contactFormStatus.classList.add('is-error');
  }

  function setFormSubmitting(isSubmitting) {
    if (!contactSubmitButton) return;
    contactSubmitButton.disabled = isSubmitting;
    contactSubmitButton.textContent = isSubmitting ? t('contactSending') : t('contactSubmit');
  }

  function waitForTurnstileApi(timeoutMs = 12000) {
    return new Promise((resolve, reject) => {
      const startedAt = Date.now();
      let pollTimer = null;

      function cleanup() {
        if (pollTimer !== null) window.clearTimeout(pollTimer);
        turnstileScript?.removeEventListener('error', onScriptError);
      }

      function onScriptError() {
        cleanup();
        reject(new Error('Spam protection could not be loaded. Please refresh and try again.'));
      }

      function check() {
        if (window.turnstile && typeof window.turnstile.render === 'function') {
          cleanup();
          resolve(window.turnstile);
          return;
        }
        if (Date.now() - startedAt >= timeoutMs) {
          cleanup();
          reject(new Error('Spam protection could not be loaded. Please refresh and try again.'));
          return;
        }
        pollTimer = window.setTimeout(check, 150);
      }

      turnstileScript?.addEventListener('error', onScriptError, { once: true });
      check();
    });
  }

  async function renderTurnstile() {
    if (!contactTurnstile) return;
    const siteKey = contactTurnstile.dataset.sitekey;
    if (!siteKey) return;

    contactTurnstile.textContent = '';
    const turnstile = await waitForTurnstileApi();
    contactTurnstile.textContent = '';

    if (turnstileWidgetId !== null) {
      turnstile.remove(turnstileWidgetId);
      turnstileWidgetId = null;
    }

    turnstileWidgetId = turnstile.render(contactTurnstile, {
      sitekey: siteKey,
      theme: 'auto',
      size: 'flexible',
      appearance: 'interaction-only',
      callback(token) {
        turnstileToken = token;
        if (contactFormStatus?.classList.contains('is-error')) setFormStatus('');
      },
      'expired-callback'() {
        turnstileToken = '';
        setFormStatus('Spam protection expired. Please complete the check again.', 'error');
      },
      'error-callback'() {
        turnstileToken = '';
        setFormStatus('Spam protection could not be loaded. Please refresh and try again.', 'error');
      },
    });
  }

  function resetTurnstileWidget() {
    turnstileToken = '';
    if (window.turnstile && turnstileWidgetId !== null) {
      window.turnstile.reset(turnstileWidgetId);
    }
  }

  async function submitContactForm(event) {
    event.preventDefault();
    if (!contactForm || !contactForm.reportValidity()) return;
    if (!turnstileToken) {
      setFormStatus('Please complete the spam protection check before sending.', 'error');
      return;
    }

    setFormSubmitting(true);
    setFormStatus('');

    try {
      const formData = new FormData(contactForm);
      const payload = {
        name: String(formData.get('name') || '').trim(),
        email: String(formData.get('email') || '').trim().toLowerCase(),
        subject: String(formData.get('subject') || '').trim(),
        message: String(formData.get('message') || '').trim(),
        turnstileToken,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.message || 'Message could not be sent right now.');

      contactForm.reset();
      resetTurnstileWidget();
      setFormStatus(data?.message || 'Message sent successfully. Thank you for reaching out.', 'success');
    } catch (error) {
      resetTurnstileWidget();
      setFormStatus(error instanceof Error ? error.message : 'Message could not be sent right now.', 'error');
    } finally {
      setFormSubmitting(false);
    }
  }

  function initContactForm() {
    if (!contactForm) return;
    renderTurnstile().catch((error) => {
      setFormStatus(error.message || 'Spam protection could not be loaded. Please refresh and try again.', 'error');
    });
    contactForm.addEventListener('submit', submitContactForm);
  }

  function init() {
    setYear();
    initLanguage();
    initTheme();
    initReadableMode();
    initPrivacy();
    initNav();
    initReveal();
    initProjectsPage();
    populateProjectDetail();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
