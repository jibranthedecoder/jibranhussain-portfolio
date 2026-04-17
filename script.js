const root = document.documentElement;
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('primary-navigation');
const langToggle = document.getElementById('langToggle');
const pauseToggle = document.getElementById('pauseToggle');
const speakToggle = document.getElementById('speakToggle');
const readableToggle = document.getElementById('readableToggle');
const privacyBanner = document.getElementById('privacyBanner');
const privacyAccept = document.getElementById('privacyAccept');
const privacyDetails = document.getElementById('privacyDetails');
const privacyModal = document.getElementById('privacyModal');
const privacyClose = document.getElementById('privacyClose');
const i18nElements = document.querySelectorAll('[data-i18n]');
const savedLanguage = localStorage.getItem('portfolio-language');
const savedReadable = localStorage.getItem('portfolio-readable');
const savedDyslexic = localStorage.getItem('portfolio-dyslexic');
const savedTheme = localStorage.getItem('portfolio-theme');

const translations = {
  en: {
    lang: 'en',
    eyebrowBrand: 'Electrical & Automation Engineering Student',
    logoName: 'Jibran Hussain',
    navAbout: 'About',
    navSkills: 'Skills',
    navExperience: 'Experience',
    navEducation: 'Education',
    navTools: 'Tools',
    navContact: 'Contact',
    themeDark: 'Dark',
    themeLight: 'Light',
    dyslexic: 'Dyslexic',
    normal: 'Normal',
    heroEyebrow: 'Portfolio',
    heroTitle: 'Jibran Hussain',
    heroText: 'I am an Electrical & Automation Engineering student building hands-on experience in maintenance, troubleshooting, electrical systems, and reliable automation solutions. I bring a calm, analytical approach to engineering problems and a strong commitment to safe, practical outcomes.',
    profileSubtitle: 'Electrical & Automation Engineering Student',
    profileMeta: 'Finland • contact@jibranhussain.com',
    aboutLabel: 'About',
    aboutHeading: 'Focused on practical engineering and dependable systems.',
    aboutParagraph1: 'Practical and reliable professional with hands-on experience in maintenance and technical environments. Known for a calm, solution-oriented approach, strong work ethic, and willingness to learn new systems and methods. Works carefully, takes responsibility, and values doing tasks properly from the first time.',
    aboutParagraph2: 'Brings a combination of technical understanding and real workplace experience, with interest in automation, electrical systems, troubleshooting, and continuous improvement. Appreciates clear communication, cooperation, and steady progress. Aims to contribute to dependable, efficient, and future-focused engineering work.',
    skillsLabel: 'Skills',
    skillsHeading: 'What I do well.',
    coreStrengthsTitle: 'Core strengths',
    workApproachTitle: 'Work approach',
    skill1: 'Preventive maintenance',
    skill2: 'Troubleshooting',
    skill3: 'PLC programming',
    skill4: 'Electrical systems',
    skill5: 'Technical documentation',
    skill6: 'Safety awareness',
    skill7: 'Teamwork',
    skill8: 'Continuous learning',
    experienceLabel: 'Experience',
    experienceHeading: 'Hands-on roles and practical training.',
    experienceItem1Title: 'Maintenance Technician ARE Oy',
    experienceItem1Date: '2023-2025',
    experienceItem1Text: 'Supported preventive maintenance, troubleshooting, and inspections on electrical and automation equipment. I focused on reliability, safe workflows, and practical system improvements.',
    experienceItem2Title: 'Intern ARE Oy',
    experienceItem2Date: '2023',
    experienceItem2Text: 'Assisted maintenance operations with practical site tasks and gained exposure to industrial electrical systems, control panels, and automation diagnostics.',
    experienceItem3Title: 'Student roles',
    experienceItem3Date: '2020-2023',
    experienceItem3Text: 'Delivered support work on construction and maintenance teams while learning how disciplined project routines and teamwork improve technical results.',
    educationLabel: 'Education',
    educationHeading: 'Formal training in automation and electrical systems.',
    educationDegree: 'Bachelors Degree Programme in Electrical and Automation Engineering',
    educationDate: 'HAMK University of Applied Sciences 2025-2027 (Expected)',
    educationText: 'Focused on electrical systems, automation, PLC programming, measurements, and technical development for practical engineering workflows.',
    toolsLabel: 'Tools & Tech',
    toolsHeading: 'Software and systems I use.',
    contactLabel: 'Contact',
    contactHeading: 'Ready for internship and engineering opportunities.',
    contactText: 'If you are looking for a student who values practical engineering, safe systems, and steady progress, please get in touch. I am available for internship roles, maintenance support, and automation projects.',
    contactEmail: 'Email contact@jibranhussain.com',
    contactLinkedin: 'LinkedIn profile',
    footerText: '2026 Jibran Hussain.',
    privacyBannerText: 'We store only minimal local preferences and may use privacy-friendly analytics to improve the experience.',
    privacyDetails: 'Details',
    privacyAccept: 'Accept',
    privacyModalTitle: 'Privacy policy',
    privacyModalText1: 'This site stores only essential local preferences, such as language and readable mode. No tracking cookies are used without permission.',
    privacyModalText2: 'You can change preferences anytime from your browser. This experience is built to be privacy-friendly and non-intrusive.',
    readLabel: 'Read',
    reading: 'Stop',
    pause: 'Pause',
    play: 'Play',
    stop: 'Stop',
    pause: 'Pause',
    play: 'Play',
    readable: 'Readable',
    themeLabel: 'Theme',
  },
  fi: {
    lang: 'fi',
    eyebrowBrand: 'Sähkö- ja automaatiotekniikan opiskelija',
    logoName: 'Jibran Hussain',
    navAbout: 'Tietoa',
    navSkills: 'Taidot',
    navExperience: 'Kokemus',
    navEducation: 'Koulutus',
    navTools: 'Työkalut',
    navContact: 'Yhteystiedot',
    themeDark: 'Tumma',
    themeLight: 'Vaalea',
    dyslexic: 'Dysleptinen',
    normal: 'Normaali',
    heroEyebrow: 'Portfolion',
    heroTitle: 'Jibran Hussain',
    heroText: 'Olen sähkö- ja automaatiotekniikan opiskelija, jolla on käytännön kokemusta kunnossapidosta, vianetsinnästä, sähköjärjestelmistä ja luotettavista automaatioratkaisuista. Lähestyn teknisiä haasteita rauhallisesti ja analyyttisesti ja arvostan turvallisia, käytännöllisiä tuloksia.',
    profileSubtitle: 'Sähkö- ja automaatiotekniikan opiskelija',
    profileMeta: 'Suomi • contact@jibranhussain.com',
    aboutLabel: 'Tietoa',
    aboutHeading: 'Käytännönläheinen ja luotettava tekijä.',
    aboutParagraph1: 'Käytännönläheinen ja luotettava ammattilainen, jolla on kokemusta kunnossapidosta ja teknisistä työympäristöistä. Tunnetaan rauhallisesta, ratkaisukeskeisestä otteesta, vahvasta työmoraalista ja halusta oppia uusia järjestelmiä ja toimintatapoja. Tekee työt huolellisesti, ottaa vastuuta ja arvostaa tehtävien oikeaa suorittamista alusta alkaen.',
    aboutParagraph2: 'Tuon yhteen teknisen ymmärryksen ja työpaikkakokemuksen, jossa kiinnostuksen kohteina ovat automaatio, sähköjärjestelmät, vianetsintä ja jatkuva parantaminen. Arvostan selkeää viestintää, yhteistyötä ja tasaista edistymistä. Tavoitteena on tukea luotettavaa, tehokasta ja tulevaisuuteen suuntautuvaa teknistä työtä.',
    skillsLabel: 'Taidot',
    skillsHeading: 'Mitä teen hyvin.',
    coreStrengthsTitle: 'Keskeiset vahvuudet',
    workApproachTitle: 'Työskentelytapa',
    skill1: 'Ennaltaehkäisevä kunnossapito',
    skill2: 'Vianetsintä',
    skill3: 'PLC-ohjelmointi',
    skill4: 'Sähköjärjestelmät',
    skill5: 'Tekninen dokumentointi',
    skill6: 'Turvallisuustietoisuus',
    skill7: 'Tiimityö',
    skill8: 'Jatkuva oppiminen',
    experienceLabel: 'Kokemus',
    experienceHeading: 'Käytännön tehtäviä ja koulutusta.',
    experienceItem1Title: 'Kunnossapitoteknikko ARE Oy',
    experienceItem1Date: '2023-2025',
    experienceItem1Text: 'Tukivat ennaltaehkäisevää kunnossapitoa, vianetsintää ja tarkastuksia sähkö- ja automaatio­laitteissa. Keskityin luotettavuuteen, turvallisiin työtapoihin ja käytännöllisiin parannuksiin.',
    experienceItem2Title: 'Harjoittelija ARE Oy',
    experienceItem2Date: '2023',
    experienceItem2Text: 'Avustin kunnossapitotoimia käytännön työtehtävissä ja sain kokemusta teollisista sähköjärjestelmistä, ohjauskeskuksista ja automaatio­diagnostiikasta.',
    experienceItem3Title: 'Opiskelijatehtävät',
    experienceItem3Date: '2020-2023',
    experienceItem3Text: 'Toteutin tukitöitä rakennus- ja kunnossapitotiimeissä samalla kun opin, miten kurinalaiset projektirutiinit ja yhteistyö parantavat teknisiä tuloksia.',
    educationLabel: 'Koulutus',
    educationHeading: 'Koulutusta automaatio- ja sähköjärjestelmissä.',
    educationDegree: 'Sähkö- ja automaatiotekniikan kandidaattiohjelma',
    educationDate: 'HAMK Ammattikorkeakoulu 2025-2027 (odotettu)',
    educationText: 'Painotus sähköjärjestelmissä, automaatiossa, PLC-ohjelmoinnissa, mittauksissa ja teknisessä kehityksessä käytännön insinöörityöhön.',
    toolsLabel: 'Työkalut & teknologia',
    toolsHeading: 'Ohjelmistot ja järjestelmät, joita käytän.',
    contactLabel: 'Yhteystiedot',
    contactHeading: 'Valmis harjoitteluun ja tekniikkamahdollisuuksiin.',
    contactText: 'Jos etsit opiskelijaa, joka arvostaa käytännönläheistä tekniikkaa, turvallisia järjestelmiä ja vakaata edistystä, ota yhteyttä. Olen saatavilla harjoittelutehtäviin, kunnossapito­tukeen ja automaatio­projekteihin.',
    contactEmail: 'Lähetä sähköpostia contact@jibranhussain.com',
    contactLinkedin: 'LinkedIn-profiili',
    footerText: '2026 Jibran Hussain.',
    privacyBannerText: 'Tallennamme vain vähäiset paikalliset asetukset ja käytämme yksityisyyttä kunnioittavaa analytiikkaa kokemuksen parantamiseen.',
    privacyDetails: 'Lisätiedot',
    privacyAccept: 'Hyväksy',
    privacyModalTitle: 'Tietosuojakäytäntö',
    privacyModalText1: 'Tämä sivusto säilyttää vain olennaiset paikalliset valinnat, kuten kielen ja luettavuustilan. Seurantaevästeitä ei käytetä ilman lupaa.',
    privacyModalText2: 'Voit muuttaa asetuksia milloin tahansa selaimen asetuksista. Tämä kokemus on suunniteltu yksityisyyttä kunnioittavaksi ja häiritsemättömäksi.',
    pause: 'Keskeytä',
    play: 'Toista',
    readLabel: 'Lue',
    reading: 'Pysäytä',
    stop: 'Pysäytä',
    pause: 'Keskeytä',
    play: 'Toista',
    readable: 'Luettava',
    themeLabel: 'Teema',
  },
};

let currentLang = 'en';
let speechUtterance = null;
let speechState = 'idle'; // 'idle', 'playing', 'paused'
let voices = [];

function detectUserLanguage() {
  const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  return browserLang.startsWith('fi') ? 'fi' : 'en';
}

function getSavedOrDetectedLanguage() {
  if (savedLanguage) {
    return savedLanguage;
  }

  const detected = detectUserLanguage();
  localStorage.setItem('portfolio-language', detected);
  return detected;
}

function updateTextContent(language) {
  i18nElements.forEach(element => {
    const translationKey = element.dataset.i18n;
    if (translations[language] && translations[language][translationKey]) {
      element.textContent = translations[language][translationKey];
    }
  });
}

function updateLanguageToggle(language) {
  langToggle.setAttribute('aria-pressed', String(language === 'fi'));
  langToggle.textContent = language === 'en' ? 'FI' : 'EN';
  langToggle.setAttribute('aria-label', language === 'en' ? 'Switch to Finnish' : 'Switch to English');
}

function setLanguage(language, manual = false) {
  currentLang = translations[language] ? language : 'en';
  root.setAttribute('lang', currentLang);
  updateTextContent(currentLang);
  updateLanguageToggle(currentLang);
  if (manual || !savedLanguage) {
    localStorage.setItem('portfolio-language', currentLang);
  }
  updateFontToggleLabel();
  updateThemeToggleLabel();
}

function updateThemeToggleLabel() {
  const theme = root.getAttribute('data-theme');
  themeToggle.textContent = theme === 'dark' ? translations[currentLang].themeLight : translations[currentLang].themeDark;
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  updateThemeToggleLabel();
}

function updateFontToggleLabel() {
  const isDyslexic = root.classList.contains('dyslexic-mode');
  readableToggle.textContent = isDyslexic ? translations[currentLang].normal : translations[currentLang].dyslexic;
  readableToggle.setAttribute('aria-label', isDyslexic ? 'Switch to normal font' : 'Switch to dyslexic font');
}

function setDyslexicMode(enabled) {
  root.classList.toggle('dyslexic-mode', enabled);
  localStorage.setItem('portfolio-dyslexic', String(enabled));
  updateFontToggleLabel();
}

function setReadableMode(enabled) {
  // Legacy support: no longer used for the new dyslexic font toggle.
  body.classList.toggle('readable-mode', enabled);
  readableToggle.setAttribute('aria-pressed', String(enabled));
  localStorage.setItem('portfolio-readable', String(enabled));
}

function updateVoices() {
  voices = window.speechSynthesis.getVoices() || [];
}

function getVoice(language) {
  const languagePrefix = language === 'fi' ? 'fi' : 'en';
  return (
    voices.find(voice => voice.lang.toLowerCase().startsWith(languagePrefix)) ||
    voices.find(voice => voice.lang.toLowerCase().includes(languagePrefix)) ||
    voices[0] ||
    null
  );
}

function createReadText() {
  const main = document.getElementById('main');
  return main ? main.innerText.replace(/\s+/g, ' ').trim() : '';
}

function updateSpeechControlState() {
  const isPlaying = speechState === 'playing';
  const isPaused = speechState === 'paused';

  const synthActive = window.speechSynthesis.speaking || window.speechSynthesis.paused || window.speechSynthesis.pending;
  const shouldShowPause = (isPlaying || isPaused) && synthActive;

  if (!synthActive && speechState !== 'idle') {
    speechState = 'idle';
  }

  pauseToggle.hidden = !shouldShowPause;
  pauseToggle.textContent = isPaused ? translations[currentLang].play : translations[currentLang].pause;
  pauseToggle.setAttribute('aria-label', isPaused ? 'Resume reading' : 'Pause reading');

  speakToggle.setAttribute('aria-pressed', String(isPlaying));
  speakToggle.textContent = speechState === 'idle' ? translations[currentLang].readLabel : translations[currentLang].stop;
}

function startReading() {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis is not supported in this browser.');
    return;
  }

  const text = createReadText();
  if (!text) return;

  if (window.speechSynthesis.speaking || window.speechSynthesis.paused || window.speechSynthesis.pending) {
    window.speechSynthesis.cancel();
  }

  speechUtterance = new SpeechSynthesisUtterance(text);
  const voice = getVoice(currentLang);
  if (voice) {
    speechUtterance.voice = voice;
  }
  speechUtterance.lang = currentLang === 'fi' ? 'fi-FI' : 'en-US';

  speechUtterance.onend = () => {
    speechState = 'idle';
    updateSpeechControlState();
  };
  speechUtterance.onerror = () => {
    speechState = 'idle';
    updateSpeechControlState();
  };

  speechState = 'playing';
  window.speechSynthesis.speak(speechUtterance);
  updateSpeechControlState();
}

function stopReading() {
  if (window.speechSynthesis.speaking || window.speechSynthesis.pending || window.speechSynthesis.paused) {
    window.speechSynthesis.cancel();
  }
  speechState = 'idle';
  updateSpeechControlState();
}

function toggleSpeechPause() {
  if (speechState === 'playing') {
    window.speechSynthesis.pause();
    speechState = 'paused';
  } else if (speechState === 'paused') {
    window.speechSynthesis.resume();
    speechState = 'playing';
  }
  updateSpeechControlState();
}

function initializeSpeakControls() {
  updateVoices();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = updateVoices;
  } else {
    speakToggle.disabled = true;
    pauseToggle.disabled = true;
  }

  speakToggle.textContent = translations[currentLang].readLabel;
  pauseToggle.textContent = translations[currentLang].pause;
  pauseToggle.hidden = true;

  speakToggle.addEventListener('click', () => {
    if (speechState !== 'idle') {
      stopReading();
      return;
    }
    startReading();
  });

  pauseToggle.addEventListener('click', () => {
    toggleSpeechPause();
  });
}

function showPrivacyBanner() {
  privacyBanner.hidden = false;
  privacyBanner.setAttribute('aria-hidden', 'false');
}

function hidePrivacyBanner() {
  privacyBanner.hidden = true;
  privacyBanner.setAttribute('aria-hidden', 'true');
}

function openPrivacyModal() {
  privacyModal.hidden = false;
  privacyModal.setAttribute('aria-hidden', 'false');
  privacyClose.focus();
}

function closePrivacyModal() {
  privacyModal.hidden = true;
  privacyModal.setAttribute('aria-hidden', 'true');
}

function initializePrivacy() {
  const consentGiven = localStorage.getItem('portfolio-privacy-accepted') === 'true';
  if (!consentGiven) {
    showPrivacyBanner();
  }

  privacyAccept.addEventListener('click', () => {
    localStorage.setItem('portfolio-privacy-accepted', 'true');
    hidePrivacyBanner();
  });

  privacyDetails.addEventListener('click', openPrivacyModal);
  privacyClose.addEventListener('click', closePrivacyModal);

  privacyModal.addEventListener('click', event => {
    if (event.target === privacyModal) {
      closePrivacyModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !privacyModal.hidden) {
      closePrivacyModal();
    }
  });
}

function initializeTheme() {
  const theme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(theme);

  themeToggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

function initializeLanguage() {
  const language = getSavedOrDetectedLanguage();
  setLanguage(language);

  langToggle.addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'fi' : 'en', true);
  });
}

function initializeReadableMode() {
  const enabled = savedDyslexic === 'true';
  setDyslexicMode(enabled);

  readableToggle.addEventListener('click', () => {
    const wasEnabled = root.classList.contains('dyslexic-mode');
    setDyslexicMode(!wasEnabled);
  });
}

function initializeNav() {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initializeScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach(element => observer.observe(element));
}

function initialize() {
  initializeTheme();
  initializeLanguage();
  initializeReadableMode();
  initializeSpeakControls();
  initializePrivacy();
  initializeNav();
  initializeScrollReveal();
}

document.addEventListener('DOMContentLoaded', initialize);
