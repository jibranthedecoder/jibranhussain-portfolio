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
const contactForm = document.getElementById('contactForm');
const contactSubmitButton = document.getElementById('contactSubmitButton');
const contactFormStatus = document.getElementById('contactFormStatus');
const contactTurnstile = document.getElementById('contactTurnstile');
const turnstileScript = document.getElementById('turnstileScript');
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
    themeDark: '☾',
    themeLight: '☀',
    dyslexic: 'Aa',
    normal: 'A',
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
    programmingLabel: 'Programming',
    programmingHeading: 'Programming languages and analytics tools.',
    contactLabel: 'Contact',
    contactHeading: 'Ready for internship and engineering opportunities.',
    contactText: 'If you are looking for a student who values practical engineering, safe systems, and steady progress, please get in touch. I am available for internship roles, maintenance support, and automation projects.',
    contactFormIntro: 'Send a message directly here and it will be delivered to contact@jibranhussain.com.',
    contactNameLabel: 'Name',
    contactEmailLabel: 'Email',
    contactSubjectLabel: 'Subject',
    contactMessageLabel: 'Message',
    contactSubmit: 'Send message',
    contactChallengeLoading: 'Loading spam protection...',
    contactChallengeRequired: 'Please complete the spam protection check before sending.',
    contactChallengeError: 'Spam protection could not be loaded. Please refresh and try again.',
    contactChallengeExpired: 'Spam protection expired. Please try again.',
    contactSending: 'Sending your message...',
    contactSuccess: 'Message sent successfully. Thank you for reaching out.',
    contactError: 'Message could not be sent right now. Please try again or email contact@jibranhussain.com.',
    contactNetworkError: 'Connection failed while sending your message. Please try again or email contact@jibranhussain.com.',
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
    themeDark: '☾',
    themeLight: '☀',
    dyslexic: 'Aa',
    normal: 'A',
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
    programmingLabel: 'Ohjelmointikielet',
    programmingHeading: 'Ohjelmointikielet ja analytiikkatyökalut.',
    contactLabel: 'Yhteystiedot',
    contactHeading: 'Valmis harjoitteluun ja tekniikkamahdollisuuksiin.',
    contactText: 'Jos etsit opiskelijaa, joka arvostaa käytännönläheistä tekniikkaa, turvallisia järjestelmiä ja vakaata edistystä, ota yhteyttä. Olen saatavilla harjoittelutehtäviin, kunnossapito­tukeen ja automaatio­projekteihin.',
    contactFormIntro: 'Lähetä viesti suoraan tästä, niin se toimitetaan osoitteeseen contact@jibranhussain.com.',
    contactNameLabel: 'Nimi',
    contactEmailLabel: 'Sähköposti',
    contactSubjectLabel: 'Aihe',
    contactMessageLabel: 'Viesti',
    contactSubmit: 'Lähetä viesti',
    contactChallengeLoading: 'Roskapostisuojausta ladataan...',
    contactChallengeRequired: 'Täytä roskapostisuojaus ennen lähettämistä.',
    contactChallengeError: 'Roskapostisuojausta ei voitu ladata. Päivitä sivu ja yritä uudelleen.',
    contactChallengeExpired: 'Roskapostisuojaus vanheni. Yritä uudelleen.',
    contactSending: 'Lähetetään viestiä...',
    contactSuccess: 'Viesti lähetettiin onnistuneesti. Kiitos yhteydenotostasi.',
    contactError: 'Viestin lähetys ei onnistunut juuri nyt. Yritä uudelleen tai lähetä sähköposti osoitteeseen contact@jibranhussain.com.',
    contactNetworkError: 'Yhteys katkesi viestiä lähetettäessä. Yritä uudelleen tai lähetä sähköposti osoitteeseen contact@jibranhussain.com.',
    contactEmail: 'Lähetä sähköpostia contact@jibranhussain.com',
    contactLinkedin: 'LinkedIn-profiili',
    footerText: '2026 Jibran Hussain.',
    privacyBannerText: 'Tallennamme vain vähäiset paikalliset asetukset ja käytämme yksityisyyttä kunnioittavaa analytiikkaa kokemuksen parantamiseen.',
    privacyDetails: 'Lisätiedot',
    privacyAccept: 'Hyväksy',
    privacyModalTitle: 'Tietosuojakäytäntö',
    privacyModalText1: 'Tämä sivusto säilyttää vain olennaiset paikalliset valinnat, kuten kielen ja luettavuustilan. Seurantaevästeitä ei käytetä ilman lupaa.',
    privacyModalText2: 'Voit muuttaa asetuksia milloin tahansa selaimen asetuksista. Tämä kokemus on suunniteltu yksityisyyttä kunnioittavaksi ja häiritsemättömäksi.',
    readLabel: 'Lue',
    reading: 'Pysäytä',
    pause: 'Keskeytä',
    play: 'Toista',
    stop: 'Pysäytä',
    readable: 'Luettava',
    themeLabel: 'Teema',
  },
};

let currentLang = 'en';
let speechUtterance = null;
let speechState = 'idle'; // 'idle', 'playing', 'paused'
let voices = [];
let turnstileWidgetId = null;
let turnstileToken = '';
const turnstileSiteKey = contactTurnstile?.dataset.sitekey || '';

const icons = {
  speaker: `
    <svg viewBox="0 0 24 24" class="ui-icon" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 5 6 9H3v6h3l5 4z"></path>
      <path d="M15.5 8.5a5 5 0 0 1 0 7"></path>
      <path d="M18.5 5.5a9 9 0 0 1 0 13"></path>
    </svg>
  `,
  stop: `
    <svg viewBox="0 0 24 24" class="ui-icon" aria-hidden="true" focusable="false" fill="currentColor" stroke="none">
      <rect x="6" y="6" width="12" height="12" rx="2"></rect>
    </svg>
  `,
  pause: `
    <svg viewBox="0 0 24 24" class="ui-icon" aria-hidden="true" focusable="false" fill="currentColor" stroke="none">
      <rect x="6" y="5" width="4" height="14" rx="1.5"></rect>
      <rect x="14" y="5" width="4" height="14" rx="1.5"></rect>
    </svg>
  `,
  play: `
    <svg viewBox="0 0 24 24" class="ui-icon" aria-hidden="true" focusable="false" fill="currentColor" stroke="none">
      <path d="m8 5 11 7-11 7z"></path>
    </svg>
  `,
  moon: `
    <svg viewBox="0 0 24 24" class="ui-icon" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a7.5 7.5 0 1 0 9 9A9 9 0 1 1 12 3"></path>
    </svg>
  `,
  sun: `
    <svg viewBox="0 0 24 24" class="ui-icon" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2.5"></path>
      <path d="M12 19.5V22"></path>
      <path d="m4.93 4.93 1.77 1.77"></path>
      <path d="m17.3 17.3 1.77 1.77"></path>
      <path d="M2 12h2.5"></path>
      <path d="M19.5 12H22"></path>
      <path d="m4.93 19.07 1.77-1.77"></path>
      <path d="m17.3 6.7 1.77-1.77"></path>
    </svg>
  `,
  dyslexicOff: `
    <svg viewBox="0 0 24 24" class="ui-icon" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19 9.5 5h1L16 19"></path>
      <path d="M6.2 14h7.6"></path>
      <path d="M18.5 8v11"></path>
      <path d="M18.5 13h2.25a2.25 2.25 0 0 0 0-4.5H18.5"></path>
    </svg>
  `,
  dyslexicOn: `
    <svg viewBox="0 0 24 24" class="ui-icon" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19 9.5 5h1L16 19"></path>
      <path d="M6.2 14h7.6"></path>
      <path d="M18.5 8v11"></path>
      <path d="M18.5 13h2.25a2.25 2.25 0 0 0 0-4.5H18.5"></path>
      <path d="m5 5 14 14"></path>
    </svg>
  `,
};

function setButtonIcon(button, iconMarkup) {
  const icon = button?.querySelector('.button-icon');
  if (icon) {
    icon.innerHTML = iconMarkup.trim();
  }
}

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
  updateContactFormIdleState();
}

function updateThemeToggleLabel() {
  const theme = root.getAttribute('data-theme');
  setButtonIcon(themeToggle, theme === 'dark' ? icons.sun : icons.moon);
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  updateThemeToggleLabel();
}

function updateFontToggleLabel() {
  const isDyslexic = root.classList.contains('dyslexic-mode');
  setButtonIcon(readableToggle, isDyslexic ? icons.dyslexicOn : icons.dyslexicOff);
  readableToggle.setAttribute('aria-label', isDyslexic ? 'Switch to normal font' : 'Switch to dyslexic font');
  readableToggle.setAttribute('title', isDyslexic ? 'Switch to normal font' : 'Switch to dyslexic font');
}

function setDyslexicMode(enabled) {
  root.classList.toggle('dyslexic-mode', enabled);
  readableToggle.setAttribute('aria-pressed', String(enabled));
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

  const visible = speechState !== 'idle';
  pauseToggle.hidden = !visible;
  pauseToggle.style.display = visible ? '' : 'none';
  pauseToggle.disabled = !visible;

  const pauseLabel = pauseToggle.querySelector('.sr-only');
  setButtonIcon(pauseToggle, isPaused ? icons.play : icons.pause);
  if (pauseLabel) {
    pauseLabel.textContent = isPaused ? translations[currentLang].play : translations[currentLang].pause;
  }
  pauseToggle.setAttribute('aria-label', isPaused ? translations[currentLang].play : translations[currentLang].pause);
  pauseToggle.setAttribute('title', isPaused ? translations[currentLang].play : translations[currentLang].pause);

  const speakLabel = speakToggle.querySelector('.sr-only');
  setButtonIcon(speakToggle, speechState === 'idle' ? icons.speaker : icons.stop);
  if (speakLabel) {
    speakLabel.textContent = speechState === 'idle' ? translations[currentLang].readLabel : translations[currentLang].stop;
  }
  speakToggle.setAttribute('aria-pressed', String(isPlaying));
  speakToggle.setAttribute('aria-label', speechState === 'idle' ? translations[currentLang].readLabel : translations[currentLang].stop);
  speakToggle.setAttribute('title', speechState === 'idle' ? translations[currentLang].readLabel : translations[currentLang].stop);
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
  pauseToggle.hidden = true;
  pauseToggle.style.display = 'none';
  pauseToggle.disabled = true;
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

  setButtonIcon(speakToggle, icons.speaker);
  setButtonIcon(pauseToggle, icons.pause);
  pauseToggle.hidden = true;
  pauseToggle.style.display = 'none';
  pauseToggle.disabled = true;

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
  privacyBanner.style.display = '';
  privacyBanner.setAttribute('aria-hidden', 'false');
}

function hidePrivacyBanner() {
  privacyBanner.hidden = true;
  privacyBanner.style.display = 'none';
  privacyBanner.setAttribute('aria-hidden', 'true');
}

function openPrivacyModal() {
  privacyModal.hidden = false;
  privacyModal.style.display = '';
  privacyModal.setAttribute('aria-hidden', 'false');
  privacyClose.focus();
}

function closePrivacyModal() {
  privacyModal.hidden = true;
  privacyModal.style.display = 'none';
  privacyModal.setAttribute('aria-hidden', 'true');
}

function initializePrivacy() {
  const consentGiven = localStorage.getItem('portfolio-privacy-accepted') === 'true';
  if (!consentGiven) {
    showPrivacyBanner();
  }

  if (privacyAccept) {
    privacyAccept.addEventListener('click', event => {
      event.preventDefault();
      try {
        localStorage.setItem('portfolio-privacy-accepted', 'true');
      } catch (error) {
        console.warn('Could not save privacy acceptance to localStorage.', error);
      }
      hidePrivacyBanner();
      closePrivacyModal();
    });
  }

  if (privacyDetails) {
    privacyDetails.addEventListener('click', openPrivacyModal);
  }
  if (privacyClose) {
    privacyClose.addEventListener('click', closePrivacyModal);
  }

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

function setContactFormStatus(message = '', status = '') {
  if (!contactFormStatus) return;

  contactFormStatus.textContent = message;
  contactFormStatus.classList.remove('is-success', 'is-error');
  if (status === 'success') {
    contactFormStatus.classList.add('is-success');
  } else if (status === 'error') {
    contactFormStatus.classList.add('is-error');
  }
}

function updateContactFormIdleState() {
  if (!contactSubmitButton) return;
  if (!contactSubmitButton.disabled) {
    contactSubmitButton.textContent = translations[currentLang].contactSubmit;
  }
}

function setContactSubmittingState(isSubmitting) {
  if (!contactSubmitButton) return;
  contactSubmitButton.disabled = isSubmitting;
  contactSubmitButton.textContent = isSubmitting ? translations[currentLang].contactSending : translations[currentLang].contactSubmit;
}

function waitForTurnstileApi(timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();
    let pollTimer = null;

    function cleanup() {
      if (pollTimer !== null) {
        window.clearTimeout(pollTimer);
      }
      turnstileScript?.removeEventListener('error', handleScriptError);
    }

    function handleScriptError() {
      cleanup();
      reject(new Error('Turnstile script failed to load.'));
    }

    function check() {
      if (window.turnstile && typeof window.turnstile.render === 'function') {
        cleanup();
        resolve(window.turnstile);
        return;
      }

      if (turnstileScript?.dataset.loadError === 'true') {
        cleanup();
        reject(new Error('Turnstile script failed to load.'));
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        cleanup();
        reject(new Error('Turnstile API timed out.'));
        return;
      }

      pollTimer = window.setTimeout(check, 150);
    }

    if (!turnstileScript) {
      reject(new Error('Turnstile script element is missing.'));
      return;
    }

    turnstileScript.addEventListener('error', handleScriptError, { once: true });
    check();
  });
}

function resetTurnstileWidget() {
  turnstileToken = '';
  if (window.turnstile && turnstileWidgetId !== null) {
    window.turnstile.reset(turnstileWidgetId);
  }
}

async function renderContactTurnstile() {
  if (!contactTurnstile) return;

  contactTurnstile.textContent = translations[currentLang].contactChallengeLoading;

  if (!turnstileSiteKey) {
    throw new Error('Missing Turnstile site key.');
  }

  const turnstile = await waitForTurnstileApi();
  contactTurnstile.textContent = '';

  if (turnstileWidgetId !== null) {
    turnstile.remove(turnstileWidgetId);
    turnstileWidgetId = null;
  }

  turnstileWidgetId = turnstile.render(contactTurnstile, {
    sitekey: turnstileSiteKey,
    theme: 'auto',
    size: 'flexible',
    appearance: 'interaction-only',
    callback(token) {
      turnstileToken = token;
      if (contactFormStatus?.classList.contains('is-error')) {
        setContactFormStatus('', '');
      }
    },
    'expired-callback'() {
      turnstileToken = '';
      setContactFormStatus(translations[currentLang].contactChallengeExpired, 'error');
    },
    'error-callback'() {
      turnstileToken = '';
      setContactFormStatus(translations[currentLang].contactChallengeError, 'error');
    },
  });
}

function initializeContactForm() {
  if (!contactForm || !contactSubmitButton) return;

  updateContactFormIdleState();
  setContactFormStatus(translations[currentLang].contactChallengeLoading, '');

  renderContactTurnstile()
    .catch(error => {
      console.warn('Contact form setup failed.', error);
      setContactFormStatus(translations[currentLang].contactChallengeError, 'error');
      contactSubmitButton.disabled = true;
    });

  contactForm.addEventListener('submit', async event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    if (!turnstileToken) {
      setContactFormStatus(translations[currentLang].contactChallengeRequired, 'error');
      return;
    }

    setContactSubmittingState(true);
    setContactFormStatus('', '');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: contactForm.elements.name.value.trim(),
          email: contactForm.elements.email.value.trim(),
          subject: contactForm.elements.subject.value.trim(),
          message: contactForm.elements.message.value.trim(),
          turnstileToken,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.message || `Form submission failed with status ${response.status}`);
      }

      contactForm.reset();
      resetTurnstileWidget();
      setContactFormStatus(payload?.message || translations[currentLang].contactSuccess, 'success');
    } catch (error) {
      console.warn('Contact form submission failed.', error);
      resetTurnstileWidget();
      const message =
        error instanceof TypeError
          ? translations[currentLang].contactNetworkError
          : error.message || translations[currentLang].contactError;
      setContactFormStatus(message, 'error');
    } finally {
      setContactSubmittingState(false);
    }
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
  initializeContactForm();
  initializeNav();
  initializeScrollReveal();
}

document.addEventListener('DOMContentLoaded', initialize);
