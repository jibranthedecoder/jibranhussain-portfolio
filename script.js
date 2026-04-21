(function () {
  const projects = window.PORTFOLIO_PROJECTS || [];

  const root = document.documentElement;
  const currentYear = document.getElementById("currentYear");
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");
  const navLinks = Array.from(document.querySelectorAll(".primary-nav a"));

  const themeToggle = document.getElementById("themeToggle");
  const langToggle = document.getElementById("langToggle");
  const speakToggle = document.getElementById("speakToggle");
  const pauseToggle = document.getElementById("pauseToggle");
  const readableToggle = document.getElementById("readableToggle");

  const privacyBanner = document.getElementById("privacyBanner");
  const privacyDetails = document.getElementById("privacyDetails");
  const privacyAccept = document.getElementById("privacyAccept");
  const privacyModal = document.getElementById("privacyModal");
  const privacyModalTitle = document.getElementById("privacyModalTitle");
  const privacyClose = document.getElementById("privacyClose");
  const privacyModalBody = Array.from(document.querySelectorAll(".modal-body p"));
  const i18nNodes = Array.from(document.querySelectorAll("[data-i18n]"));
  const i18nPlaceholderNodes = Array.from(document.querySelectorAll("[data-i18n-placeholder]"));
  const i18nAriaNodes = Array.from(document.querySelectorAll("[data-i18n-aria-label]"));

  const projectsGrid = document.getElementById("projectsGrid");
  const projectSearch = document.getElementById("projectSearch");
  const filterChips = Array.from(document.querySelectorAll(".filter-chip"));
  const projectsEmpty = document.getElementById("projectsEmpty");
  const detailRoot = document.querySelector("[data-project-slug]");

  const contactForm = document.getElementById("contactForm");
  const contactSubmitButton = document.getElementById("contactSubmitButton");
  const contactFormStatus = document.getElementById("contactFormStatus");
  const contactTurnstile = document.getElementById("contactTurnstile");
  const turnstileScript = document.getElementById("turnstileScript");

  const themeStorageKey = "jh-theme";
  const readableStorageKey = "jh-readable";
  const languageStorageKey = "jh-language";
  const privacyStorageKey = "jh-privacy";

  let activeFilter = "all";
  let turnstileWidgetId = null;
  let turnstileToken = "";
  let projectSearchTimer = null;
  let currentLang = "en";
  let speechState = "idle";
  let voices = [];

  const copy = {
    en: {
      brandRole: "Electrical & Automation Engineering",
      navHome: "Home",
      navAbout: "About",
      navProjects: "Projects",
      navContact: "Contact",
      theme: "Theme",
      lang: "FI",
      read: "Read",
      stop: "Stop",
      pause: "Pause",
      play: "Resume",
      dyslexic: "Dyslexic",
      homeEyebrow: "Portfolio",
      homeTitle: "Jibran Hussain",
      homeTagline: "Learning, building, and growing in engineering.",
      homeLead: "I started from practical work and moved toward engineering studies because I wanted to understand systems more deeply. Today I study Electrical & Automation Engineering in Finland and keep building skills for the future.",
      homeAboutCta: "About Me",
      homeProjectsCta: "Projects",
      homeContactCta: "Contact",
      overviewEyebrow: "Overview",
      overviewTitle: "A simple look at what I’m doing.",
      overviewAboutTitle: "About",
      overviewAboutSummary: "A short background about where I started, how I think, and what direction I’m moving toward.",
      overviewAboutCta: "Open About",
      overviewProjectsTitle: "Projects",
      overviewProjectsSummary: "Examples of work and ideas related to automation, control systems, and technical problem-solving.",
      overviewProjectsCta: "Open Projects",
      overviewContactTitle: "Contact",
      overviewContactSummary: "If you want to connect about work, opportunities, or projects, feel free to reach out.",
      overviewContactCta: "Open Contact",
      selectedWorkEyebrow: "Selected work",
      selectedWorkTitle: "Projects I’m building.",
      selectedWorkCta: "All Projects",
      aboutEyebrow: "About",
      aboutTitle: "I like understanding how things work.",
      aboutLead: "My background is in maintenance, where I learned that small details matter and problems rarely fix themselves. Now I study Electrical & Automation Engineering in Finland and want to build a stronger future in technical work.",
      backgroundEyebrow: "Background",
      backgroundTitle: "Who I am.",
      backgroundLead: "I’m calm by nature and I like useful work. I prefer learning real skills, solving actual problems, and getting better step by step instead of talking big.",
      backgroundCardLabel: "Background",
      backgroundCardCopy: "Started from hands-on work, tools, faults, repairs, and everyday responsibility.",
      focusCardLabel: "Focus",
      focusCardCopy: "Automation, electrical systems, control logic, and becoming better every year.",
      workStyleCardLabel: "Work style",
      workStyleCardCopy: "Show up, think clearly, do the job properly, keep learning.",
      skillsEyebrow: "Skills",
      skillsTitle: "Things I’m good at.",
      coreStrengthsTitle: "Core strengths",
      workApproachTitle: "Work approach",
      programmingEyebrow: "Programming",
      programmingTitle: "Tools I use and study.",
      experienceEyebrow: "Experience",
      experienceTitle: "Hands-on roles and practical training.",
      educationEyebrow: "Education",
      educationTitle: "Formal training in automation and electrical systems.",
      toolsEyebrow: "Tools & Tech",
      toolsTitle: "Software and systems I use.",
      projectsEyebrow: "Projects",
      projectsTitle: "Projects where I test and learn.",
      projectsLead: "This is where I document what I build and study. Each project is a step toward understanding systems better, not just completing tasks.",
      projectsSearchLabel: "Search projects",
      projectsSearchPlaceholder: "Search by system, skill, or project name",
      projectsFilterAria: "Project filters",
      projectsFilterAll: "All",
      projectsFilterBuild: "Active Builds",
      projectsFilterRoadmap: "Roadmap",
      projectsEmpty: "No projects match the current search or filter.",
      contactEyebrow: "Contact",
      contactTitle: "Let’s talk.",
      contactLead: "If you have a role, internship, project, or a good technical opportunity, feel free to contact me. I’m always open to meaningful conversations and new directions.",
      directContactEyebrow: "Direct contact",
      directContactTitle: "Contact",
      contactEmailLabel: "Email",
      contactLocationLabel: "Location",
      contactLocationValue: "Finland",
      contactProfilesLabel: "Profiles",
      contactFormName: "Name",
      contactFormEmail: "Email",
      contactFormSubject: "Subject",
      contactFormMessage: "Message",
      contactFormNamePlaceholder: "Your name",
      contactFormEmailPlaceholder: "Your email",
      contactFormSubjectPlaceholder: "Reason for contact",
      contactFormPlaceholder: "Tell me about the role, project, or opportunity.",
      contactFormNote: "The form is simple on purpose. Clear communication matters more than long introductions.",
      contactSubmit: "Send message",
      contactEmailInstead: "Email instead",
      footerCopy: "Thanks for visiting my portfolio.",
      privacyBanner: "We store only minimal local preferences and may use privacy-friendly analytics to improve the experience.",
      privacyDetails: "Details",
      privacyAccept: "Accept",
      privacyTitle: "Privacy policy",
      privacyBodyOne: "This site stores only essential local preferences, such as language and readable mode. No tracking cookies are used without permission.",
      privacyBodyTwo: "You can change preferences anytime from your browser. This experience is built to be privacy-friendly and non-intrusive.",
    },
    fi: {
      brandRole: "Sähkö- ja automaatiotekniikka",
      navHome: "Etusivu",
      navAbout: "Tietoa",
      navProjects: "Projektit",
      navContact: "Yhteys",
      theme: "Teema",
      lang: "EN",
      read: "Lue",
      stop: "Lopeta",
      pause: "Tauko",
      play: "Jatka",
      dyslexic: "Lukutila",
      homeEyebrow: "Portfolio",
      homeTitle: "Jibran Hussain",
      homeTagline: "Opin, rakennan ja kehityn insinöörityössä.",
      homeLead: "Lähtökohtani oli käytännön työ, josta siirryin insinööriopintoihin, koska halusin ymmärtää järjestelmiä syvemmin. Nyt opiskelen sähkö- ja automaatiotekniikkaa Suomessa ja rakennan taitoja tulevaisuutta varten.",
      homeAboutCta: "Tietoa minusta",
      homeProjectsCta: "Projektit",
      homeContactCta: "Yhteys",
      overviewEyebrow: "Yleiskuva",
      overviewTitle: "Yksinkertainen katsaus siihen, mitä teen.",
      overviewAboutTitle: "Tietoa",
      overviewAboutSummary: "Lyhyt tausta siitä, mistä aloitin, miten ajattelen ja mihin suuntaan olen menossa.",
      overviewAboutCta: "Avaa Tietoa",
      overviewProjectsTitle: "Projektit",
      overviewProjectsSummary: "Esimerkkejä töistä ja ideoista, jotka liittyvät automaatioon, ohjausjärjestelmiin ja tekniseen ongelmanratkaisuun.",
      overviewProjectsCta: "Avaa Projektit",
      overviewContactTitle: "Yhteys",
      overviewContactSummary: "Jos haluat ottaa yhteyttä työn, mahdollisuuksien tai projektien vuoksi, lähetä viesti rohkeasti.",
      overviewContactCta: "Avaa Yhteys",
      selectedWorkEyebrow: "Valitut työt",
      selectedWorkTitle: "Projektit joita rakennan.",
      selectedWorkCta: "Kaikki projektit",
      aboutEyebrow: "Tietoa",
      aboutTitle: "Pidän siitä, että ymmärrän miten asiat toimivat.",
      aboutLead: "Taustani on kunnossapidossa, jossa opin, että pienillä yksityiskohdilla on väliä ja ongelmat eivät yleensä korjaannu itsestään. Nyt opiskelen sähkö- ja automaatiotekniikkaa Suomessa ja haluan rakentaa vahvemman tulevaisuuden teknisessä työssä.",
      backgroundEyebrow: "Tausta",
      backgroundTitle: "Kuka olen.",
      backgroundLead: "Olen luonteeltani rauhallinen ja pidän hyödyllisestä työstä. Mieluummin opin oikeita taitoja, ratkaisen todellisia ongelmia ja kehityn askel kerrallaan kuin puhun suuria.",
      backgroundCardLabel: "Tausta",
      backgroundCardCopy: "Lähdin liikkeelle käytännön työstä, työkaluista, vioista, korjauksista ja päivittäisestä vastuusta.",
      focusCardLabel: "Fokus",
      focusCardCopy: "Automaatio, sähköjärjestelmät, ohjauslogiikka ja jatkuva kehittyminen vuosi vuodelta.",
      workStyleCardLabel: "Työtapa",
      workStyleCardCopy: "Tule paikalle, ajattele selkeästi, tee työt kunnolla, jatka oppimista.",
      skillsEyebrow: "Taidot",
      skillsTitle: "Asiat joissa olen hyvä.",
      coreStrengthsTitle: "Ydinvahvuudet",
      workApproachTitle: "Työtapa",
      programmingEyebrow: "Ohjelmointi",
      programmingTitle: "Työkalut joita käytän ja opiskelen.",
      experienceEyebrow: "Kokemus",
      experienceTitle: "Käytännön roolit ja harjoittelu.",
      educationEyebrow: "Koulutus",
      educationTitle: "Muodollinen koulutus automaatiosta ja sähköjärjestelmistä.",
      toolsEyebrow: "Työkalut ja teknologia",
      toolsTitle: "Ohjelmistot ja järjestelmät, joita käytän.",
      projectsEyebrow: "Projektit",
      projectsTitle: "Projektit joissa testaan ja opin.",
      projectsLead: "Tänne dokumentoin mitä rakennan ja opiskelen. Jokainen projekti on askel kohti parempaa järjestelmien ymmärtämistä, ei vain tehtävien suorittamista.",
      projectsSearchLabel: "Hae projekteja",
      projectsSearchPlaceholder: "Hae järjestelmän, taidon tai projektin nimellä",
      projectsFilterAria: "Projektisuodattimet",
      projectsFilterAll: "Kaikki",
      projectsFilterBuild: "Aktiiviset",
      projectsFilterRoadmap: "Suunnitteilla",
      projectsEmpty: "Mikään projekti ei vastaa hakua tai suodatinta.",
      contactEyebrow: "Yhteys",
      contactTitle: "Puhutaan.",
      contactLead: "Jos sinulla on rooli, harjoittelu, projekti tai hyvä tekninen mahdollisuus, ota rohkeasti yhteyttä. Olen aina avoin merkityksellisille keskusteluille ja uusille suunnille.",
      directContactEyebrow: "Suora yhteys",
      directContactTitle: "Yhteys",
      contactEmailLabel: "Sähköposti",
      contactLocationLabel: "Sijainti",
      contactLocationValue: "Suomi",
      contactProfilesLabel: "Profiilit",
      contactFormName: "Nimi",
      contactFormEmail: "Sähköposti",
      contactFormSubject: "Aihe",
      contactFormMessage: "Viesti",
      contactFormNamePlaceholder: "Nimesi",
      contactFormEmailPlaceholder: "Sähköpostisi",
      contactFormSubjectPlaceholder: "Yhteydenoton syy",
      contactFormPlaceholder: "Kerro roolista, projektista tai mahdollisuudesta.",
      contactFormNote: "Lomake on yksinkertainen tarkoituksella. Selkeä viestintä on tärkeämpää kuin pitkät esittelyt.",
      contactSubmit: "Lähetä viesti",
      contactEmailInstead: "Lähetä sähköpostia",
      footerCopy: "Kiitos kun vierailit portfoliossani.",
      privacyBanner: "Tallennamme vain minimaaliset paikalliset asetukset ja voimme käyttää tietosuojaystävällistä analytiikkaa kokemuksen parantamiseen.",
      privacyDetails: "Lisätiedot",
      privacyAccept: "Hyväksy",
      privacyTitle: "Tietosuojakäytäntö",
      privacyBodyOne: "Tämä sivusto tallentaa vain välttämättömät paikalliset asetukset, kuten kielen ja lukutilan. Seurantaevästeitä ei käytetä ilman lupaa.",
      privacyBodyTwo: "Voit muuttaa asetuksia milloin tahansa selaimessa. Kokemus on suunniteltu tietosuojaystävälliseksi ja huomaamattomaksi.",
    },
  };

  function t(key) {
    return copy[currentLang]?.[key] || copy.en[key] || "";
  }

  function applyStaticTranslations() {
    i18nNodes.forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (!key) return;
      const value = t(key);
      if (value) node.textContent = value;
    });

    i18nPlaceholderNodes.forEach((node) => {
      const key = node.getAttribute("data-i18n-placeholder");
      if (!key) return;
      const value = t(key);
      if (value) node.setAttribute("placeholder", value);
    });

    i18nAriaNodes.forEach((node) => {
      const key = node.getAttribute("data-i18n-aria-label");
      if (!key) return;
      const value = t(key);
      if (value) node.setAttribute("aria-label", value);
    });
  }

  function setYear() {
    if (currentYear) currentYear.textContent = String(new Date().getFullYear());
  }

  function iconSvg(name) {
    const icons = {
      speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M18.5 5.5a9 9 0 0 1 0 13"></path></svg>',
      pause: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="5" width="4" height="14" rx="1.5"></rect><rect x="14" y="5" width="4" height="14" rx="1.5"></rect></svg>',
      play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.53.848l10-6.5a1 1 0 0 0 0-1.696l-10-6.5A1 1 0 0 0 8 5.5Z"></path></svg>',
      dyslexic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19V7.5A2.5 2.5 0 0 1 7.5 5H12"></path><path d="M5 14h7"></path><path d="M15 19V5"></path><path d="M15 12h4a2 2 0 0 0 0-4h-4"></path></svg>',
      sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"></circle><path d="M12 2.5v2.2"></path><path d="M12 19.3v2.2"></path><path d="m4.93 4.93 1.56 1.56"></path><path d="m17.51 17.51 1.56 1.56"></path><path d="M2.5 12h2.2"></path><path d="M19.3 12h2.2"></path><path d="m4.93 19.07 1.56-1.56"></path><path d="m17.51 6.49 1.56-1.56"></path></svg>',
      moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A7.5 7.5 0 1 1 9.5 4a6 6 0 1 0 10.5 10.5Z"></path></svg>',
    };
    return icons[name] || "";
  }

  function setButtonIcon(button, iconName) {
    const iconNode = button?.querySelector(".control-icon");
    if (iconNode) iconNode.innerHTML = iconSvg(iconName);
  }

  function setButtonText(button, text) {
    const labelNode = button?.querySelector(".control-button-text");
    if (labelNode) labelNode.textContent = text;
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(themeStorageKey, theme);
    if (themeToggle) {
      setButtonText(themeToggle, t("theme"));
      setButtonIcon(themeToggle, theme === "dark" ? "sun" : "moon");
      themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    }
  }

  function initTheme() {
    if (!themeToggle) return;
    const storedTheme = localStorage.getItem(themeStorageKey);
    applyTheme(storedTheme || "light");
    themeToggle.addEventListener("click", () => {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  function applyReadableMode(enabled) {
    root.classList.toggle("readable-mode", enabled);
    readableToggle?.setAttribute("aria-pressed", String(enabled));
    if (readableToggle) {
      setButtonText(readableToggle, t("dyslexic"));
      setButtonIcon(readableToggle, "dyslexic");
    }
    localStorage.setItem(readableStorageKey, String(enabled));
  }

  function initReadableMode() {
    if (!readableToggle) return;
    applyReadableMode(localStorage.getItem(readableStorageKey) === "true");
    readableToggle.addEventListener("click", () => {
      applyReadableMode(!root.classList.contains("readable-mode"));
    });
  }

  function applyLanguage(language) {
    currentLang = language === "fi" ? "fi" : "en";
    localStorage.setItem(languageStorageKey, currentLang);
    document.documentElement.lang = currentLang;

    if (langToggle) {
      langToggle.textContent = t("lang");
      langToggle.setAttribute("aria-pressed", String(currentLang === "fi"));
    }
    if (themeToggle) setButtonText(themeToggle, t("theme"));
    if (readableToggle) setButtonText(readableToggle, t("dyslexic"));
    if (speakToggle) {
      setButtonText(speakToggle, speechState === "idle" ? t("read") : t("stop"));
      setButtonIcon(speakToggle, "speaker");
    }
    if (pauseToggle) {
      setButtonText(pauseToggle, speechState === "paused" ? t("play") : t("pause"));
      setButtonIcon(pauseToggle, speechState === "paused" ? "play" : "pause");
    }

    const bannerText = privacyBanner?.querySelector("p");
    if (bannerText) bannerText.textContent = t("privacyBanner");
    if (privacyDetails) privacyDetails.textContent = t("privacyDetails");
    if (privacyAccept) privacyAccept.textContent = t("privacyAccept");
    if (privacyModalTitle) privacyModalTitle.textContent = t("privacyTitle");
    if (privacyModalBody[0]) privacyModalBody[0].textContent = t("privacyBodyOne");
    if (privacyModalBody[1]) privacyModalBody[1].textContent = t("privacyBodyTwo");
    applyStaticTranslations();
  }

  function initLanguage() {
    currentLang = localStorage.getItem(languageStorageKey) === "fi" ? "fi" : "en";
    applyLanguage(currentLang);
    langToggle?.addEventListener("click", () => {
      applyLanguage(currentLang === "en" ? "fi" : "en");
    });
  }

  function initNav() {
    if (!navToggle || !primaryNav) return;

    function closeMenu({ restoreFocus = false } = {}) {
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      if (restoreFocus) navToggle.focus();
    }

    function openMenu() {
      primaryNav.classList.add("is-open");
      navToggle.setAttribute("aria-expanded", "true");
    }

    function getMenuFocusableElements() {
      return [navToggle, ...Array.from(primaryNav.querySelectorAll("a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])"))]
        .filter((element) => !element.disabled && element.offsetParent !== null);
    }

    navToggle.addEventListener("click", () => {
      if (primaryNav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (!primaryNav.classList.contains("is-open")) return;
      if (primaryNav.contains(event.target) || navToggle.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (!primaryNav.classList.contains("is-open")) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getMenuFocusableElements();
      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        const headerOffset = (document.querySelector(".site-header")?.offsetHeight || 0) + 16;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "smooth",
        });
      });
    });
  }

  function initReveal() {
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
  }

  function updateVoices() {
    voices = window.speechSynthesis?.getVoices?.() || [];
  }

  function getVoice() {
    const prefix = currentLang === "fi" ? "fi" : "en";
    return voices.find((voice) => voice.lang.toLowerCase().startsWith(prefix)) || voices[0] || null;
  }

  function stopReading() {
    if (window.speechSynthesis?.speaking || window.speechSynthesis?.paused || window.speechSynthesis?.pending) {
      window.speechSynthesis.cancel();
    }
    speechState = "idle";
    if (pauseToggle) pauseToggle.hidden = true;
    if (speakToggle) {
      setButtonText(speakToggle, t("read"));
      setButtonIcon(speakToggle, "speaker");
    }
  }

  function startReading() {
    if (!("speechSynthesis" in window)) return;
    const text = document.getElementById("main")?.innerText?.replace(/\s+/g, " ").trim();
    if (!text) return;

    stopReading();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === "fi" ? "fi-FI" : "en-US";
    const voice = getVoice();
    if (voice) utterance.voice = voice;
    utterance.onend = stopReading;
    utterance.onerror = stopReading;
    speechState = "playing";
    if (pauseToggle) {
      pauseToggle.hidden = false;
      setButtonText(pauseToggle, t("pause"));
      setButtonIcon(pauseToggle, "pause");
    }
    if (speakToggle) {
      setButtonText(speakToggle, t("stop"));
      setButtonIcon(speakToggle, "speaker");
    }
    window.speechSynthesis.speak(utterance);
  }

  function initSpeech() {
    if (!speakToggle || !pauseToggle) return;
    updateVoices();

    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    } else {
      speakToggle.hidden = true;
      pauseToggle.hidden = true;
      return;
    }

    speakToggle.addEventListener("click", () => {
      if (speechState === "idle") startReading();
      else stopReading();
    });

    pauseToggle.addEventListener("click", () => {
      if (speechState === "playing") {
        window.speechSynthesis.pause();
        speechState = "paused";
        setButtonText(pauseToggle, t("play"));
        setButtonIcon(pauseToggle, "play");
      } else if (speechState === "paused") {
        window.speechSynthesis.resume();
        speechState = "playing";
        setButtonText(pauseToggle, t("pause"));
        setButtonIcon(pauseToggle, "pause");
      }
    });
  }

  function openPrivacyModal() {
    if (!privacyModal) return;
    privacyModal.hidden = false;
    privacyModal.setAttribute("aria-hidden", "false");
  }

  function closePrivacyModal() {
    if (!privacyModal) return;
    privacyModal.hidden = true;
    privacyModal.setAttribute("aria-hidden", "true");
  }

  function initPrivacy() {
    if (!privacyBanner || !privacyModal) return;
    const accepted = localStorage.getItem(privacyStorageKey) === "true";
    privacyBanner.hidden = accepted;

    privacyDetails?.addEventListener("click", openPrivacyModal);
    privacyClose?.addEventListener("click", closePrivacyModal);
    privacyAccept?.addEventListener("click", () => {
      localStorage.setItem(privacyStorageKey, "true");
      privacyBanner.hidden = true;
      closePrivacyModal();
    });

    privacyModal.addEventListener("click", (event) => {
      if (event.target === privacyModal) closePrivacyModal();
    });
  }

  function getStatusMeta(status) {
    if (status === "live") return { label: "Live", className: "status-live" };
    if (status === "build") return { label: "Active build", className: "status-build" };
    return { label: "Roadmap", className: "status-roadmap" };
  }

  function createProjectCard(project) {
    const status = getStatusMeta(project.status);
    const card = document.createElement("article");
    card.className = "project-card reveal";
    card.dataset.status = project.status;
    card.dataset.search = [
      project.title,
      project.category,
      project.summary,
      project.problem,
      project.technologies.join(" "),
      project.skills.join(" "),
    ].join(" ").toLowerCase();

    card.innerHTML = `
      <div class="project-card-top">
        <span class="status-badge ${status.className}">${project.statusLabel || status.label}</span>
        <span class="project-category">${project.category}</span>
      </div>
      <h3>${project.title}</h3>
      <p class="project-summary">${project.summary}</p>
      <div class="project-problem">
        <p class="micro-label">Engineering problem</p>
        <p class="panel-copy">${project.problem}</p>
      </div>
      <button class="project-toggle" type="button" aria-expanded="false">See case-study view</button>
      <div class="project-details" hidden>
        <ul class="pill-list">${project.technologies.map((item) => `<li>${item}</li>`).join("")}</ul>
        <p class="project-why">${project.why}</p>
        <div class="project-links">
          <a class="button button-primary" href="/projects/${project.slug}/">Open Case Study</a>
          ${project.github ? `<a class="button button-secondary" href="${project.github}" target="_blank" rel="noopener">GitHub</a>` : `<span class="button button-tertiary">GitHub publishing next</span>`}
        </div>
      </div>
    `;

    return card;
  }

  function applyProjectFilters() {
    if (!projectsGrid) return;
    const query = String(projectSearch?.value || "").trim().toLowerCase();
    const cards = Array.from(projectsGrid.querySelectorAll(".project-card"));
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesFilter = activeFilter === "all" || card.dataset.status === activeFilter;
      const matchesQuery = !query || card.dataset.search.includes(query);
      const isVisible = matchesFilter && matchesQuery;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (projectsEmpty) projectsEmpty.hidden = visibleCount !== 0;
  }

  function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = "";
    projects.forEach((project) => {
      projectsGrid.appendChild(createProjectCard(project));
    });
    initReveal();
    applyProjectFilters();
  }

  function initProjectsPage() {
    if (!projectsGrid) return;

    renderProjects();

    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        activeFilter = chip.dataset.filter || "all";
        filterChips.forEach((button) => button.classList.toggle("is-active", button === chip));
        applyProjectFilters();
      });
    });

    projectSearch?.addEventListener("input", () => {
      if (projectSearchTimer !== null) window.clearTimeout(projectSearchTimer);
      projectSearchTimer = window.setTimeout(() => {
        applyProjectFilters();
        projectSearchTimer = null;
      }, 200);
    });

    projectsGrid.addEventListener("click", (event) => {
      const toggle = event.target.closest(".project-toggle");
      if (!toggle) return;

      const card = toggle.closest(".project-card");
      const details = card?.querySelector(".project-details");
      if (!card || !details) return;

      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isExpanded));
      toggle.textContent = isExpanded ? "See case-study view" : "Hide details";
      details.hidden = isExpanded;
    });
  }

  function populateProjectDetail() {
    if (!detailRoot) return;

    const slug = detailRoot.getAttribute("data-project-slug");
    const project = projects.find((item) => item.slug === slug);
    if (!project) return;

    const status = getStatusMeta(project.status);
    const title = detailRoot.querySelector("[data-project-title]");
    const intro = detailRoot.querySelector("[data-project-intro]");
    const summary = detailRoot.querySelector("[data-project-summary]");
    const problem = detailRoot.querySelector("[data-project-problem]");
    const why = detailRoot.querySelector("[data-project-why]");
    const visual = detailRoot.querySelector("[data-project-visual]");
    const category = detailRoot.querySelector("[data-project-category]");
    const statusNode = detailRoot.querySelector("[data-project-status]");
    const technologies = detailRoot.querySelector("[data-project-technologies]");
    const skills = detailRoot.querySelector("[data-project-skills]");
    const outcomes = detailRoot.querySelector("[data-project-outcomes]");
    const nextSteps = detailRoot.querySelector("[data-project-next-steps]");
    const githubButton = detailRoot.querySelector("[data-project-github]");

    document.title = `${project.title} | Projects | Jibran Hussain`;

    if (title) title.textContent = project.title;
    if (intro) intro.textContent = project.intro;
    if (summary) summary.textContent = project.overview;
    if (problem) problem.textContent = project.problem;
    if (why) why.textContent = project.why;
    if (visual) visual.textContent = project.visual;
    if (category) category.textContent = project.category;
    if (statusNode) {
      statusNode.textContent = project.statusLabel || status.label;
      statusNode.classList.add(status.className);
    }
    if (technologies) technologies.innerHTML = project.technologies.map((item) => `<li>${item}</li>`).join("");
    if (skills) skills.innerHTML = project.skills.map((item) => `<li>${item}</li>`).join("");
    if (outcomes) outcomes.innerHTML = project.outcomes.map((item) => `<li>${item}</li>`).join("");
    if (nextSteps) nextSteps.innerHTML = project.nextSteps.map((item) => `<li>${item}</li>`).join("");

    if (githubButton && !project.github) {
      githubButton.replaceWith(Object.assign(document.createElement("span"), {
        className: "button button-tertiary",
        textContent: "GitHub publishing next",
      }));
    } else if (githubButton && project.github) {
      githubButton.href = project.github;
    }
  }

  function setFormStatus(message = "", type = "") {
    if (!contactFormStatus) return;
    contactFormStatus.textContent = message;
    contactFormStatus.classList.remove("is-success", "is-error");
    if (type === "success") contactFormStatus.classList.add("is-success");
    if (type === "error") contactFormStatus.classList.add("is-error");
  }

  function setFormSubmitting(isSubmitting) {
    if (!contactSubmitButton) return;
    contactSubmitButton.disabled = isSubmitting;
    contactSubmitButton.textContent = isSubmitting ? (currentLang === "fi" ? "Lahetetaan..." : "Sending...") : t("contactSubmit");
  }

  function waitForTurnstileApi(timeoutMs = 12000) {
    return new Promise((resolve, reject) => {
      const startedAt = Date.now();
      let pollTimer = null;

      function cleanup() {
        if (pollTimer !== null) window.clearTimeout(pollTimer);
        turnstileScript?.removeEventListener("error", onScriptError);
      }

      function onScriptError() {
        cleanup();
        reject(new Error("Spam protection could not be loaded. Please refresh and try again."));
      }

      function check() {
        if (window.turnstile && typeof window.turnstile.render === "function") {
          cleanup();
          resolve(window.turnstile);
          return;
        }

        if (Date.now() - startedAt >= timeoutMs) {
          cleanup();
          reject(new Error("Spam protection could not be loaded. Please refresh and try again."));
          return;
        }

        pollTimer = window.setTimeout(check, 150);
      }

      turnstileScript?.addEventListener("error", onScriptError, { once: true });
      check();
    });
  }

  async function renderTurnstile() {
    if (!contactTurnstile) return;
    const siteKey = contactTurnstile.dataset.sitekey;
    if (!siteKey) return;

    contactTurnstile.textContent = "";
    const turnstile = await waitForTurnstileApi();
    contactTurnstile.textContent = "";

    if (turnstileWidgetId !== null) {
      turnstile.remove(turnstileWidgetId);
      turnstileWidgetId = null;
    }

    turnstileWidgetId = turnstile.render(contactTurnstile, {
      sitekey: siteKey,
      theme: "auto",
      size: "flexible",
      appearance: "interaction-only",
      callback(token) {
        turnstileToken = token;
        if (contactFormStatus?.classList.contains("is-error")) setFormStatus("");
      },
      "expired-callback"() {
        turnstileToken = "";
        setFormStatus("Spam protection expired. Please complete the check again.", "error");
      },
      "error-callback"() {
        turnstileToken = "";
        setFormStatus("Spam protection could not be loaded. Please refresh and try again.", "error");
      },
    });
  }

  function resetTurnstileWidget() {
    turnstileToken = "";
    if (window.turnstile && turnstileWidgetId !== null) {
      window.turnstile.reset(turnstileWidgetId);
    }
  }

  async function submitContactForm(event) {
    event.preventDefault();
    if (!contactForm || !contactForm.reportValidity()) return;
    if (!turnstileToken) {
      setFormStatus("Please complete the spam protection check before sending.", "error");
      return;
    }

    setFormSubmitting(true);
    setFormStatus("");

    try {
      const formData = new FormData(contactForm);
      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim().toLowerCase(),
        subject: String(formData.get("subject") || "").trim(),
        message: String(formData.get("message") || "").trim(),
        turnstileToken,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.message || "Message could not be sent right now.");
      }

      contactForm.reset();
      resetTurnstileWidget();
      setFormStatus(data?.message || "Message sent successfully. Thank you for reaching out.", "success");
    } catch (error) {
      resetTurnstileWidget();
      setFormStatus(error instanceof Error ? error.message : "Message could not be sent right now.", "error");
    } finally {
      setFormSubmitting(false);
    }
  }

  function initContactForm() {
    if (!contactForm) return;
    renderTurnstile().catch((error) => {
      setFormStatus(error.message || "Spam protection could not be loaded. Please refresh and try again.", "error");
    });
    contactForm.addEventListener("submit", submitContactForm);
  }

  function init() {
    setYear();
    initLanguage();
    initTheme();
    initReadableMode();
    initSpeech();
    initPrivacy();
    initNav();
    initReveal();
    initProjectsPage();
    populateProjectDetail();
    initContactForm();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
