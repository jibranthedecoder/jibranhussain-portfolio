(function () {
  const root = document.documentElement;
  const currentYear = document.getElementById('currentYear');
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  const readableToggle = document.getElementById('readableToggle');
  const privacyBanner = document.getElementById('privacyBanner');
  const privacyAccept = document.getElementById('privacyAccept');
  const privacyDetails = document.getElementById('privacyDetails');
  const privacyModal = document.getElementById('privacyModal');
  const privacyClose = document.getElementById('privacyClose');

  const themeStorageKey = 'jh-theme';
  const readableStorageKey = 'jh-readable';
  const languageStorageKey = 'jh-language';
  const privacyStorageKey = 'jh-privacy';

  const copy = {
    en: {
      brandRole: 'Electrical & Automation Engineering', navHome: 'Home', navAbout: 'About', navProjects: 'Projects', navContact: 'Contact',
      theme: 'Theme', dyslexic: 'Dyslexic', readAloud: 'Read aloud', pauseReading: 'Pause reading', goHome: 'Go to home', toggleNavigation: 'Toggle navigation', primaryNavigation: 'Primary navigation', footerNavigation: 'Footer navigation', skipToMain: 'Skip to main content', privacyClose: 'Close privacy details',
      aboutEyebrow: 'About', aboutTitle: 'I like understanding how things work.', aboutLead: 'My background is in maintenance, where I learned that small details matter and problems rarely fix themselves. Now I study Electrical & Automation Engineering in Finland and want to build a stronger future in technical work.',
      viewCv: 'View CV', updatedApril2026: 'Updated April 2026', backgroundEyebrow: 'Background', backgroundTitle: 'Who I am.', backgroundLead: 'I’m calm by nature and I like useful work. I prefer learning real skills, solving actual problems, and getting better step by step instead of talking big.',
      backgroundCardLabel: 'Background', backgroundCardCopy: 'Started from hands-on work, tools, faults, repairs, and everyday responsibility.', focusCardLabel: 'Focus', focusCardCopy: 'Automation, electrical systems, control logic, and becoming better every year.', workStyleCardLabel: 'Work style', workStyleCardCopy: 'Show up, think clearly, do the job properly, keep learning.',
      skillsEyebrow: 'Skills', skillsTitle: 'Things I’m good at.', coreStrengthsTitle: 'Core strengths', workApproachTitle: 'Work approach', skillFindingFaults: 'Finding faults', skillMaintenanceTasks: 'Maintenance tasks', skillPlcBasics: 'PLC basics', skillElectricalWork: 'Electrical work', approachReliable: 'Reliable attitude', approachCommunication: 'Clear communication', approachSafety: 'Safety first', approachLearning: 'Willing to learn',
      programmingEyebrow: 'Programming', programmingTitle: 'Tools I use and study.', cppBasics: 'C++ basics', experienceEyebrow: 'Experience', experienceTitle: 'Hands-on roles and practical training.', experienceMaintenanceRole: 'Maintenance Technician, ARE Oy', experienceMaintenanceCopy: 'Supported preventive maintenance, troubleshooting, and inspections on electrical and automation equipment.', experienceInternRole: 'Intern, ARE Oy', experienceInternCopy: 'Assisted maintenance operations and gained exposure to industrial electrical systems, control panels, and automation diagnostics.', experienceStudentRole: 'Student roles', experienceStudentCopy: 'Worked in construction and maintenance teams while learning disciplined routines, teamwork, and technical responsibility.',
      educationEyebrow: 'Education', educationTitle: 'Formal training in automation and electrical systems.', educationDegree: "Bachelor's Degree Programme in Electrical and Automation Engineering", educationSchool: 'HAMK University of Applied Sciences, 2025-2027 expected.', educationCopy: 'Focused on electrical systems, automation, PLC programming, measurements, and technical development for practical engineering workflows.', toolsEyebrow: 'Tools & Tech', toolsTitle: 'Software and systems I use.', hvacSystems: 'HVAC systems',
      footerCopy: 'Thanks for visiting my portfolio.', footerOpportunity: 'Open to internships, junior engineering roles, and technical opportunities.', footerContactMe: 'Contact me',
      privacyBanner: 'We store only minimal local preferences and may use privacy-friendly analytics to improve the experience.', privacyDetails: 'Details', privacyAccept: 'Accept', privacyTitle: 'Privacy policy', privacyBodyOne: 'This site stores only essential local preferences, such as language and readable mode. No tracking cookies are used without permission.', privacyBodyTwo: 'You can change preferences anytime from your browser. This experience is built to be privacy-friendly and non-intrusive.'
    },
    fi: {
      brandRole: 'Sähkö- ja automaatiotekniikka', navHome: 'Etusivu', navAbout: 'Tietoa', navProjects: 'Projektit', navContact: 'Yhteys',
      theme: 'Teema', dyslexic: 'Lukutila', readAloud: 'Lue ääneen', pauseReading: 'Keskeytä lukeminen', goHome: 'Siirry etusivulle', toggleNavigation: 'Avaa tai sulje valikko', primaryNavigation: 'Päänavigaatio', footerNavigation: 'Alatunnisteen navigaatio', skipToMain: 'Siirry pääsisältöön', privacyClose: 'Sulje tietosuojatiedot',
      aboutEyebrow: 'Tietoa', aboutTitle: 'Pidän siitä, että ymmärrän miten asiat toimivat.', aboutLead: 'Lähtökohtani on kunnossapidossa, jossa opin, että pienillä yksityiskohdilla on väliä ja ongelmat eivät yleensä korjaannu itsestään. Nyt opiskelen sähkö- ja automaatiotekniikkaa Suomessa ja haluan rakentaa vahvemman tulevaisuuden teknisessä työssä.',
      viewCv: 'Avaa CV', updatedApril2026: 'Päivitetty huhtikuussa 2026', backgroundEyebrow: 'Tausta', backgroundTitle: 'Kuka olen.', backgroundLead: 'Olen luonteeltani rauhallinen ja pidän hyödyllisestä työstä. Mieluummin opin oikeita taitoja, ratkaisen todellisia ongelmia ja kehityn askel kerrallaan kuin puhun suuria.',
      backgroundCardLabel: 'Tausta', backgroundCardCopy: 'Lähdin liikkeelle käytännön työstä, työkaluista, vioista, korjauksista ja päivittäisestä vastuusta.', focusCardLabel: 'Fokus', focusCardCopy: 'Automaatio, sähköjärjestelmät, ohjauslogiikka ja jatkuva kehittyminen vuosi vuodelta.', workStyleCardLabel: 'Työtapa', workStyleCardCopy: 'Tule paikalle, ajattele selkeästi, tee työt kunnolla, jatka oppimista.',
      skillsEyebrow: 'Taidot', skillsTitle: 'Asiat joissa olen hyvä.', coreStrengthsTitle: 'Ydinvahvuudet', workApproachTitle: 'Työtapa', skillFindingFaults: 'Vikojen löytäminen', skillMaintenanceTasks: 'Kunnossapitotehtävät', skillPlcBasics: 'PLC-perusteet', skillElectricalWork: 'Sähkötyöt', approachReliable: 'Luotettava asenne', approachCommunication: 'Selkeä viestintä', approachSafety: 'Turvallisuus ensin', approachLearning: 'Halukas oppimaan',
      programmingEyebrow: 'Ohjelmointi', programmingTitle: 'Työkalut joita käytän ja opiskelen.', cppBasics: 'C++ perusteet', experienceEyebrow: 'Kokemus', experienceTitle: 'Käytännön roolit ja harjoittelu.', experienceMaintenanceRole: 'Kunnossapitoasentaja, ARE Oy', experienceMaintenanceCopy: 'Tuin ennakoivaa kunnossapitoa, vianhakua ja tarkastuksia sähkö- ja automaatiolaitteissa.', experienceInternRole: 'Harjoittelija, ARE Oy', experienceInternCopy: 'Avustin kunnossapitotöissä ja sain kokemusta teollisista sähköjärjestelmistä, ohjauskeskuksista ja automaation diagnostiikasta.', experienceStudentRole: 'Opiskelijaroolit', experienceStudentCopy: 'Työskentelin rakennus- ja kunnossapitotiimeissä ja opin kurinalaisia rutiineja, tiimityötä ja teknistä vastuuta.',
      educationEyebrow: 'Koulutus', educationTitle: 'Muodollinen koulutus automaatiosta ja sähköjärjestelmistä.', educationDegree: 'Sähkö- ja automaatiotekniikan insinöörikoulutus', educationSchool: 'HAMK Hämeen ammattikorkeakoulu, arvioitu valmistuminen 2025-2027.', educationCopy: 'Painotus sähköjärjestelmissä, automaatiossa, PLC-ohjelmoinnissa, mittauksissa ja käytännön insinöörityön teknisessä kehityksessä.', toolsEyebrow: 'Työkalut ja teknologia', toolsTitle: 'Ohjelmistot ja järjestelmät, joita käytän.', hvacSystems: 'LVI-järjestelmät',
      footerCopy: 'Kiitos kun vierailit portfoliossani.', footerOpportunity: 'Avoin harjoitteluille, junioritason insinöörirooleille ja teknisille mahdollisuuksille.', footerContactMe: 'Ota yhteyttä',
      privacyBanner: 'Tallennamme vain minimaaliset paikalliset asetukset ja voimme käyttää tietosuojaystävällistä analytiikkaa kokemuksen parantamiseen.', privacyDetails: 'Lisätiedot', privacyAccept: 'Hyväksy', privacyTitle: 'Tietosuojakäytäntö', privacyBodyOne: 'Tämä sivusto tallentaa vain välttämättömät paikalliset asetukset, kuten kielen ja lukutilan. Seurantaevästeitä ei käytetä ilman lupaa.', privacyBodyTwo: 'Voit muuttaa asetuksia milloin tahansa selaimessa. Kokemus on suunniteltu tietosuojaystävälliseksi ja huomaamattomaksi.'
    }
  };

  function getStored(key, fallback) { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } }
  function setStored(key, value) { try { localStorage.setItem(key, value); } catch {} }

  function applyText(language) {
    const strings = copy[language] || copy.en;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (strings[key]) node.textContent = strings[key];
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((node) => {
      const key = node.getAttribute('data-i18n-aria-label');
      if (strings[key]) node.setAttribute('aria-label', strings[key]);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
      const key = node.getAttribute('data-i18n-placeholder');
      if (strings[key]) node.setAttribute('placeholder', strings[key]);
    });
    langToggle && (langToggle.textContent = language === 'fi' ? 'EN' : 'FI');
    root.lang = language;
  }

  function applyTheme(theme) {
    const chosen = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = chosen;
    themeToggle?.setAttribute('aria-pressed', String(chosen === 'light'));
  }

  function applyReadable(isReadable) {
    root.classList.toggle('readable-mode', Boolean(isReadable));
    readableToggle?.setAttribute('aria-pressed', String(Boolean(isReadable)));
  }

  currentYear && (currentYear.textContent = String(new Date().getFullYear()));
  applyTheme(getStored(themeStorageKey, 'dark'));
  applyReadable(getStored(readableStorageKey, 'false') === 'true');
  applyText(getStored(languageStorageKey, 'en'));

  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    primaryNav?.classList.toggle('is-open', !open);
  });

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    setStored(themeStorageKey, next);
    applyTheme(next);
  });

  readableToggle?.addEventListener('click', () => {
    const next = !root.classList.contains('readable-mode');
    setStored(readableStorageKey, String(next));
    applyReadable(next);
  });

  langToggle?.addEventListener('click', () => {
    const next = getStored(languageStorageKey, 'en') === 'fi' ? 'en' : 'fi';
    setStored(languageStorageKey, next);
    applyText(next);
  });

  if (privacyBanner && getStored(privacyStorageKey, '') !== 'accepted') privacyBanner.hidden = false;
  privacyAccept?.addEventListener('click', () => { setStored(privacyStorageKey, 'accepted'); privacyBanner.hidden = true; });
  privacyDetails?.addEventListener('click', () => { if (privacyModal) { privacyModal.hidden = false; privacyModal.setAttribute('aria-hidden', 'false'); } });
  privacyClose?.addEventListener('click', () => { if (privacyModal) { privacyModal.hidden = true; privacyModal.setAttribute('aria-hidden', 'true'); } });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
  } else {
    document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'));
  }
}());
