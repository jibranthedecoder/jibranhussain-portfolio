(function () {
  var languageStorageKey = 'jh-language';

  var copy = {
    brandRole: 'Sähkö- ja automaatiotekniikka',
    navHome: 'Etusivu',
    navAbout: 'Tietoa minusta',
    navProjects: 'Projektit',
    navContact: 'Yhteys',
    homeEyebrow: 'Portfolio',
    homeTagline: 'Opin, rakennan ja kehityn insinöörinä.',
    homeLead: 'Taustani on käytännön työssä. Siirryin insinööriopintoihin, koska halusin ymmärtää järjestelmiä syvemmin. Opiskelen sähkö- ja automaatiotekniikkaa ja rakennan osaamistani määrätietoisesti kohti teknisiä tehtäviä.',
    homeAboutCta: 'Tietoa minusta',
    homeProjectsCta: 'Projektit',
    homeContactCta: 'Ota yhteyttä',
    selectedWorkEyebrow: 'Valitut työt',
    selectedWorkTitle: 'Projektit, joita rakennan.',
    selectedWorkCta: 'Kaikki projektit',
    aboutEyebrow: 'Tietoa',
    aboutTitle: 'Haluan ymmärtää, miten järjestelmät toimivat.',
    aboutLead: 'Taustani on kunnossapidossa, jossa opin, että pienillä yksityiskohdilla on merkitystä ja ongelmat korjaantuvat harvoin itsestään. Nyt opiskelen sähkö- ja automaatiotekniikkaa Suomessa ja rakennan vahvaa osaamista teknistä työuraa varten.',
    backgroundEyebrow: 'Tausta',
    backgroundTitle: 'Kuka olen.',
    backgroundLead: 'Olen rauhallinen, käytännönläheinen ja pidän hyödyllisestä työstä. Haluan oppia oikeita taitoja, ratkaista todellisia ongelmia ja kehittyä askel kerrallaan.',
    backgroundCardLabel: 'Tausta',
    backgroundCardCopy: 'Lähdin liikkeelle käytännön työstä: työkaluista, vioista, korjauksista ja arjen vastuusta.',
    focusCardLabel: 'Painopiste',
    focusCardCopy: 'Automaatio, sähköjärjestelmät, ohjauslogiikka ja jatkuva kehittyminen.',
    workStyleCardLabel: 'Työtapa',
    workStyleCardCopy: 'Tulen paikalle, ajattelen selkeästi, teen työn kunnolla ja jatkan oppimista.',
    skillsEyebrow: 'Taidot',
    skillsTitle: 'Osaamisalueita.',
    coreStrengthsTitle: 'Ydinvahvuudet',
    workApproachTitle: 'Työtapa',
    programmingEyebrow: 'Ohjelmointi',
    programmingTitle: 'Työkalut, joita käytän ja opiskelen.',
    experienceEyebrow: 'Kokemus',
    experienceTitle: 'Käytännön työkokemus ja harjoittelu.',
    educationEyebrow: 'Koulutus',
    educationTitle: 'Koulutus automaation ja sähköjärjestelmien parissa.',
    toolsEyebrow: 'Työkalut ja teknologia',
    toolsTitle: 'Ohjelmistot ja järjestelmät, joita käytän.',
    projectsEyebrow: 'Projektit',
    projectsTitle: 'Projektit, joissa testaan ja opin.',
    projectsLead: 'Tänne dokumentoin, mitä rakennan ja opiskelen. Jokainen projekti on askel kohti parempaa järjestelmien ymmärtämistä — ei pelkkä tehtävän suoritus.',
    projectsSearchLabel: 'Hae projekteja',
    projectsSearchPlaceholder: 'Hae järjestelmän, taidon tai projektin nimellä',
    projectsFilterAria: 'Projektisuodattimet',
    projectsFilterAll: 'Kaikki',
    projectsFilterBuild: 'Aktiiviset projektit',
    projectsFilterRoadmap: 'Suunnitteilla',
    projectsEmpty: 'Mikään projekti ei vastaa hakua tai suodatinta.',
    contactEyebrow: 'Yhteys',
    contactLead: 'Jos sinulla on rooli, harjoittelupaikka, projekti tai muu hyvä tekninen mahdollisuus, ota rohkeasti yhteyttä. Olen avoin merkityksellisille keskusteluille ja uusille suunnille.',
    directContactEyebrow: 'Suora yhteys',
    directContactTitle: 'Yhteystiedot',
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
    contactFormSubjectPlaceholder: 'Yhteydenoton aihe',
    contactFormPlaceholder: 'Kerro roolista, projektista tai mahdollisuudesta.',
    contactFormNote: 'Viestit tarkistetaan yleensä muutaman arkipäivän kuluessa. Selkeä viesti auttaa vastaamaan paremmin.',
    contactSubmit: 'Lähetä viesti',
    contactEmailInstead: 'Lähetä sähköpostia',
    footerCopy: 'Kiitos, että vierailit portfoliossani.',
    footerOpportunity: 'Avoin harjoitteluille, junioritason insinöörirooleille ja teknisille mahdollisuuksille.',
    footerContactMe: 'Ota yhteyttä',
    privacyBanner: 'Tämä sivusto tallentaa vain paikallisia asetuksia, kuten kielen, teeman ja lukutilan. Yhteydenottolomake käyttää Cloudflare Turnstilea roskapostin estämiseen. Mainosevästeitä ei käytetä.',
    privacyDetails: 'Lisätiedot',
    privacyAccept: 'Hyväksy',
    privacyTitle: 'Tietosuoja',
    privacyBodyOne: 'Tämä sivusto tallentaa vain välttämättömiä paikallisia asetuksia, kuten kielen, teeman ja lukutilan. Yhteydenottolomake käyttää Cloudflare Turnstilea roskapostin estämiseen.',
    privacyBodyTwo: 'Mainosevästeitä ei käytetä. Voit muuttaa paikallisia asetuksia milloin tahansa selaimesi asetuksista.',
    switchLight: 'Vaihda vaaleaan teemaan',
    switchDark: 'Vaihda tummaan teemaan',
    readAloud: 'Lue ääneen',
    pauseReading: 'Keskeytä lukeminen',
    dyslexic: 'Lukutila',
    goHome: 'Siirry etusivulle',
    toggleNavigation: 'Avaa tai sulje valikko',
    primaryNavigation: 'Päänavigaatio',
    footerNavigation: 'Alatunnisteen navigaatio',
    skipToMain: 'Siirry pääsisältöön',
    privacyClose: 'Sulje tietosuojatiedot',
    viewCv: 'Avaa CV',
    updatedApril2026: 'Päivitetty huhtikuussa 2026',
    featuredProjectsEyebrow: 'Nostetut projektit',
    featuredProjectsTitle: 'Käynnissä olevaa insinöörityötä.',
    allProjects: 'Kaikki projektit',
    viewProject: 'Avaa projekti',
    projectSmartConveyorStatus: 'KESKEN',
    projectMccStatus: 'RAKENNETTU',
    projectActiveBuildStatus: 'AKTIIVINEN PROJEKTI',
    projectCaseStudyBuildStatus: 'CASE-STUDY',
    projectConveyorCategory: 'MATERIAALINKÄSITTELYN AUTOMAATIO',
    projectMccCategory: 'SÄHKÖTEHO JA KÄYTÖT',
    projectSmartConveyorTitle: 'Älykäs kuljetinjärjestelmä',
    projectMccTitle: 'Moottorinohjauskeskuksen tutkimus',
    projectMotorControlTitle: 'Moottorinohjauksen tutkimus',
    featuredConveyorSummary: 'Ohjauslogiikkaprojekti, jossa keskitytään sekvenssitiloihin, tukostilanteisiin, jumin palautukseen ja käyttäjälle selkeään diagnostiikkaan.',
    featuredMccSummary: 'Käytännön MCC-case study, jossa tarkastellaan käynnistysehtoja, laukaisujen näkyvyyttä, takaisinkytkentää ja kunnossapidolle hyödyllistä moottoritilaa.',
    selectedConveyorSummary: 'Ohjauslogiikkaprojekti, joka rakentuu antureiden, sekvenssiohjauksen, vikojen käsittelyn ja turvallisen konekäyttäytymisen ympärille.',
    selectedMotorSummary: 'Käytännön projekti käynnistimistä, suojauksista, signaaleista ja siitä, miten moottoreita ohjataan todellisissa järjestelmissä.',
    skillFindingFaults: 'Vikojen löytäminen',
    skillMaintenanceTasks: 'Kunnossapitotehtävät',
    skillPlcBasics: 'PLC-perusteet',
    skillElectricalWork: 'Sähkötyöt',
    approachReliable: 'Luotettava asenne',
    approachCommunication: 'Selkeä viestintä',
    approachSafety: 'Turvallisuus ensin',
    approachLearning: 'Halukas oppimaan',
    cppBasics: 'C++ perusteet',
    experienceMaintenanceRole: 'Kunnossapitoasentaja, ARE Oy',
    experienceMaintenanceCopy: 'Tuin ennakoivaa kunnossapitoa, vianhakua ja sähkö- sekä automaatiolaitteiden tarkastuksia.',
    experienceInternRole: 'Harjoittelija, ARE Oy',
    experienceInternCopy: 'Avustin kunnossapitotöissä ja sain kokemusta teollisista sähköjärjestelmistä, ohjauskeskuksista ja automaation diagnostiikasta.',
    experienceStudentRole: 'Opiskelijaroolit',
    experienceStudentCopy: 'Työskentelin rakennus- ja kunnossapitotiimeissä ja opin kurinalaisia rutiineja, tiimityötä ja teknistä vastuuta.',
    educationDegree: 'Sähkö- ja automaatiotekniikan insinöörikoulutus',
    educationSchool: 'HAMK Hämeen ammattikorkeakoulu, arvioitu valmistuminen 2025–2027.',
    educationCopy: 'Painopisteenä sähköjärjestelmät, automaatio, PLC-ohjelmointi, mittaukset ja käytännön insinöörityön tekninen kehittäminen.',
    hvacSystems: 'LVI-järjestelmät',
    projectsEvolving: 'Portfolio kehittyy aktiivisesti. Lisää valmiita automaatioprojekteja ja teknistä dokumentaatiota lisätään vähitellen.',
    projectCaseStudy: 'Projektin case study',
    backToProjects: 'Takaisin projekteihin',
    visualPackage: 'Visuaalinen kokonaisuus',
    projectOverview: 'Yleiskuva',
    projectProblem: 'Insinööriongelma',
    projectTechnologies: 'Teknologiat',
    projectSkills: 'Osoitetut taidot',
    projectWhy: 'Mitä tämä osoittaa',
    projectNextSteps: 'Seuraavat askeleet',
    projectOutcomes: 'Projektin tulokset',
    projectOutcomesTitle: 'Näyttö siitä, mitä case studyn on tarkoitus osoittaa.',
    projectSeeDetails: 'Avaa projektinäkymä',
    projectHideDetails: 'Piilota tiedot',
    githubPublishingNext: 'GitHub-julkaisu tulossa',
    statusLive: 'Julkaistu',
    statusBuild: 'Aktiivinen projekti',
    statusRoadmap: 'Suunnitteilla',
    contactHeroTitle: 'Avoin rooleille ja teknisille mahdollisuuksille',
    contactAvailability: 'Avoin harjoitteluille, junioritason insinöörirooleille ja automaatiomahdollisuuksille Suomessa ja EU:ssa.',
    contactSending: 'Lähetetään...'
  };

  var replacements = new Map([
    ['Aktiivinen rakennus', 'Aktiivinen projekti'],
    ['CASE-STUDY RAKENNUS', 'CASE-STUDY'],
    ['Keskeneräistä insinöörityötä.', 'Käynnissä olevaa insinöörityötä.'],
    ['Avaa case-study näkymä', 'Avaa projektinäkymä'],
    ['Avaa case-study-näkymä', 'Avaa projektinäkymä'],
    ['Tämä sivusto tallentaa vain välttämättömät paikalliset asetukset, kuten kielen ja lukutilan. Seurantaevästeitä ei käytetä ilman lupaa.', copy.privacyBodyOne],
    ['Tallennamme vain minimaaliset paikalliset asetukset ja voimme käyttää tietosuojaystävällistä analytiikkaa kokemuksen parantamiseen.', copy.privacyBanner]
  ]);

  function isFinnishActive() {
    try {
      if (window.localStorage.getItem(languageStorageKey) === 'fi') return true;
    } catch (error) {}

    var langToggle = document.getElementById('langToggle');
    if (langToggle && langToggle.textContent.trim().toUpperCase() === 'EN') return true;

    return document.documentElement.lang && document.documentElement.lang.toLowerCase().startsWith('fi');
  }

  function setText(node, value) {
    if (!node || typeof value !== 'string') return;
    if (node.textContent !== value) node.textContent = value;
  }

  function applyDataI18n() {
    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var key = node.getAttribute('data-i18n');
      if (Object.prototype.hasOwnProperty.call(copy, key)) setText(node, copy[key]);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (node) {
      var key = node.getAttribute('data-i18n-placeholder');
      if (Object.prototype.hasOwnProperty.call(copy, key)) node.setAttribute('placeholder', copy[key]);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (node) {
      var key = node.getAttribute('data-i18n-aria-label');
      if (Object.prototype.hasOwnProperty.call(copy, key)) node.setAttribute('aria-label', copy[key]);
    });
  }

  function polishVisibleText() {
    var selector = 'h1,h2,h3,p,span,button,a,label,li';
    document.querySelectorAll(selector).forEach(function (node) {
      var text = node.textContent.trim();
      if (replacements.has(text)) setText(node, replacements.get(text));
    });
  }

  function applyPolish() {
    if (!isFinnishActive()) return;
    applyDataI18n();
    polishVisibleText();
  }

  function schedulePolish() {
    window.setTimeout(applyPolish, 0);
    window.setTimeout(applyPolish, 80);
    window.setTimeout(applyPolish, 250);
  }

  schedulePolish();

  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', schedulePolish);

  var observer = new MutationObserver(function () {
    schedulePolish();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });
}());
