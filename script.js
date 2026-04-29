(function () {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const ecosystems = window.PORTFOLIO_ECOSYSTEMS || [];

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
  const i18nTextEntries = Array.from(document.querySelectorAll("[data-i18n]"))
    .map((node) => ({ node, key: node.getAttribute("data-i18n") }))
    .filter((entry) => entry.key);
  const i18nAttrEntries = [
    ...Array.from(document.querySelectorAll("[data-i18n-placeholder]")).map((node) => ({
      node,
      attr: "placeholder",
      key: node.getAttribute("data-i18n-placeholder"),
    })),
    ...Array.from(document.querySelectorAll("[data-i18n-aria-label]")).map((node) => ({
      node,
      attr: "aria-label",
      key: node.getAttribute("data-i18n-aria-label"),
    })),
    ...Array.from(document.querySelectorAll("[data-i18n-title]")).map((node) => ({
      node,
      attr: "title",
      key: node.getAttribute("data-i18n-title"),
    })),
    ...Array.from(document.querySelectorAll("[data-i18n-alt]")).map((node) => ({
      node,
      attr: "alt",
      key: node.getAttribute("data-i18n-alt"),
    })),
  ].filter((entry) => entry.key);

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
      homeLead: "I started from practical work and moved toward engineering studies because I wanted to understand systems more deeply. Today I study Electrical & Automation Engineering and keep building skills for the future.",
      homeAboutCta: "About Me",
      homeProjectsCta: "Projects",
      homeContactCta: "Contact",
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
      contactFormNote: "Replies are typically reviewed within a few business days. Clear messages are appreciated.",
      contactSubmit: "Send message",
      contactEmailInstead: "Email instead",
      footerCopy: "Thanks for visiting my portfolio.",
      privacyBanner: "We store only minimal local preferences and may use privacy-friendly analytics to improve the experience.",
      privacyDetails: "Details",
      privacyAccept: "Accept",
      privacyTitle: "Privacy policy",
      privacyBodyOne: "This site stores only essential local preferences, such as language and readable mode. No tracking cookies are used without permission.",
      privacyBodyTwo: "You can change preferences anytime from your browser. This experience is built to be privacy-friendly and non-intrusive.",
      switchLight: "Switch to light mode",
      switchDark: "Switch to dark mode",
      readAloud: "Read aloud",
      pauseReading: "Pause reading",
      goHome: "Go to home",
      toggleNavigation: "Toggle navigation",
      primaryNavigation: "Primary navigation",
      footerNavigation: "Footer navigation",
      skipToMain: "Skip to main content",
      privacyClose: "Close privacy details",
      viewCv: "View CV",
      updatedApril2026: "Updated April 2026",
      footerOpportunity: "Open to internships, junior engineering roles, and technical opportunities.",
      footerContactMe: "Contact me",
      featuredProjectsEyebrow: "Featured projects",
      featuredProjectsTitle: "Engineering work in progress.",
      allProjects: "All Projects",
      viewProject: "View Project",
      projectSmartConveyorStatus: "IN PROGRESS",
      projectMccStatus: "BUILT",
      projectActiveBuildStatus: "ACTIVE BUILD",
      projectCaseStudyBuildStatus: "CASE STUDY BUILD",
      projectConveyorCategory: "MATERIAL HANDLING AUTOMATION",
      projectMccCategory: "ELECTRICAL POWER AND DRIVES",
      projectSmartConveyorTitle: "Smart Conveyor System",
      projectMccTitle: "Motor Control Center Study",
      projectMotorControlTitle: "Motor Control Study",
      featuredConveyorSummary: "A control logic project focused on sequence states, blocked-flow handling, jam recovery, and operator-readable diagnostics.",
      featuredMccSummary: "A practical MCC case study for start permissives, trip visibility, feedback checks, and maintenance-facing motor status.",
      selectedConveyorSummary: "A control logic project built around sensors, sequence control, fault handling, and safe machine behavior.",
      selectedMotorSummary: "A practical project focused on starters, protection, signals, and how motors are controlled in real systems.",
      skillFindingFaults: "Finding faults",
      skillMaintenanceTasks: "Maintenance tasks",
      skillPlcBasics: "PLC basics",
      skillElectricalWork: "Electrical work",
      approachReliable: "Reliable attitude",
      approachCommunication: "Clear communication",
      approachSafety: "Safety first",
      approachLearning: "Willing to learn",
      cppBasics: "C++ basics",
      experienceMaintenanceRole: "Maintenance Technician, ARE Oy",
      experienceMaintenanceCopy: "Supported preventive maintenance, troubleshooting, and inspections on electrical and automation equipment.",
      experienceInternRole: "Intern, ARE Oy",
      experienceInternCopy: "Assisted maintenance operations and gained exposure to industrial electrical systems, control panels, and automation diagnostics.",
      experienceStudentRole: "Student roles",
      experienceStudentCopy: "Worked in construction and maintenance teams while learning disciplined routines, teamwork, and technical responsibility.",
      educationDegree: "Bachelor's Degree Programme in Electrical and Automation Engineering",
      educationSchool: "HAMK University of Applied Sciences, 2025-2027 expected.",
      educationCopy: "Focused on electrical systems, automation, PLC programming, measurements, and technical development for practical engineering workflows.",
      hvacSystems: "HVAC systems",
      projectsEvolving: "This portfolio is actively evolving. More completed automation projects and technical documentation are being added over the coming days.",
      projectCaseStudy: "Project case study",
      backToProjects: "Back to Projects",
      visualPackage: "Visual package",
      projectOverview: "Overview",
      projectProblem: "Engineering problem",
      projectTechnologies: "Technologies",
      projectSkills: "Skills demonstrated",
      projectWhy: "What this proves",
      projectNextSteps: "Next steps",
      projectOutcomes: "Project outcomes",
      projectOutcomesTitle: "Evidence the case study is designed to show.",
      projectSeeDetails: "See case-study view",
      projectHideDetails: "Hide details",
      githubPublishingNext: "GitHub publishing next",
      statusLive: "Live",
      statusBuild: "Active build",
      statusRoadmap: "Roadmap",
      contactHeroTitle: "Available for Roles & Engineering Opportunities",
      contactAvailability: "Open to internships, junior engineering roles, and automation opportunities in Finland / EU.",
      contactSending: "Sending...",
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
      homeLead: "Lähtökohtani oli käytännön työ, josta siirryin insinööriopintoihin, koska halusin ymmärtää järjestelmiä syvemmin. Nyt opiskelen sähkö- ja automaatiotekniikkaa ja rakennan taitoja tulevaisuutta varten.",
      homeAboutCta: "Tietoa minusta",
      homeProjectsCta: "Projektit",
      homeContactCta: "Yhteys",
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
      contactFormNote: "Vastaukset tarkistetaan yleensä muutaman arkipäivän kuluessa. Selkeät viestit ovat arvostettuja.",
      contactSubmit: "Lähetä viesti",
      contactEmailInstead: "Lähetä sähköpostia",
      footerCopy: "Kiitos kun vierailit portfoliossani.",
      privacyBanner: "Tallennamme vain minimaaliset paikalliset asetukset ja voimme käyttää tietosuojaystävällistä analytiikkaa kokemuksen parantamiseen.",
      privacyDetails: "Lisätiedot",
      privacyAccept: "Hyväksy",
      privacyTitle: "Tietosuojakäytäntö",
      privacyBodyOne: "Tämä sivusto tallentaa vain välttämättömät paikalliset asetukset, kuten kielen ja lukutilan. Seurantaevästeitä ei käytetä ilman lupaa.",
      privacyBodyTwo: "Voit muuttaa asetuksia milloin tahansa selaimessa. Kokemus on suunniteltu tietosuojaystävälliseksi ja huomaamattomaksi.",
      switchLight: "Vaihda vaaleaan tilaan",
      switchDark: "Vaihda tummaan tilaan",
      readAloud: "Lue ääneen",
      pauseReading: "Keskeytä lukeminen",
      goHome: "Siirry etusivulle",
      toggleNavigation: "Avaa tai sulje valikko",
      primaryNavigation: "Päänavigaatio",
      footerNavigation: "Alatunnisteen navigaatio",
      skipToMain: "Siirry pääsisältöön",
      privacyClose: "Sulje tietosuojatiedot",
      viewCv: "Avaa CV",
      updatedApril2026: "Päivitetty huhtikuussa 2026",
      footerOpportunity: "Avoin harjoitteluille, junioritason insinöörirooleille ja teknisille mahdollisuuksille.",
      footerContactMe: "Ota yhteyttä",
      featuredProjectsEyebrow: "Nostetut projektit",
      featuredProjectsTitle: "Keskeneräistä insinöörityötä.",
      allProjects: "Kaikki projektit",
      viewProject: "Avaa projekti",
      projectSmartConveyorStatus: "KESKEN",
      projectMccStatus: "RAKENNETTU",
      projectActiveBuildStatus: "AKTIIVINEN RAKENNUS",
      projectCaseStudyBuildStatus: "CASE-STUDY RAKENNUS",
      projectConveyorCategory: "MATERIAALINKäSITTELYN AUTOMAATIO",
      projectMccCategory: "SäHKäTEHO JA KäYTäT",
      projectSmartConveyorTitle: "Älykäs kuljetinjärjestelmä",
      projectMccTitle: "Moottorinohjauskeskuksen tutkimus",
      projectMotorControlTitle: "Moottorinohjauksen tutkimus",
      featuredConveyorSummary: "Ohjauslogiikkaprojekti, joka keskittyy sekvenssitiloihin, tukkeutuneen virtauksen käsittelyyn, jumin palautukseen ja käyttäjälle selkeisiin diagnostiikkoihin.",
      featuredMccSummary: "Käytännän MCC-case study käynnistysehtoihin, laukaisujen näkyvyyteen, takaisinkytkentätarkistuksiin ja kunnossapidolle hyädylliseen moottoritilaan.",
      selectedConveyorSummary: "Ohjauslogiikkaprojekti antureista, sekvenssiohjauksesta, vikojen käsittelystä ja koneen turvallisesta käyttäytymisestä.",
      selectedMotorSummary: "Käytännän projekti käynnistimistä, suojauksista, signaaleista ja siitä, miten moottoreita ohjataan todellisissa järjestelmissä.",
      skillFindingFaults: "Vikojen läytäminen",
      skillMaintenanceTasks: "Kunnossapitotehtävät",
      skillPlcBasics: "PLC-perusteet",
      skillElectricalWork: "Sähkötyöt",
      approachReliable: "Luotettava asenne",
      approachCommunication: "Selkeä viestintä",
      approachSafety: "Turvallisuus ensin",
      approachLearning: "Halukas oppimaan",
      cppBasics: "C++ perusteet",
      experienceMaintenanceRole: "Kunnossapitoasentaja, ARE Oy",
      experienceMaintenanceCopy: "Tuin ennakoivaa kunnossapitoa, vianhakua ja tarkastuksia sähkö- ja automaatiolaitteissa.",
      experienceInternRole: "Harjoittelija, ARE Oy",
      experienceInternCopy: "Avustin kunnossapitotäissä ja sain kokemusta teollisista sähköjärjestelmistä, ohjauskeskuksista ja automaation diagnostiikasta.",
      experienceStudentRole: "Opiskelijaroolit",
      experienceStudentCopy: "Tyäskentelin rakennus- ja kunnossapitotiimeissä ja opin kurinalaisia rutiineja, tiimityötä ja teknistä vastuuta.",
      educationDegree: "Sähkö- ja automaatiotekniikan insinöörikoulutus",
      educationSchool: "HAMK Hämeen ammattikorkeakoulu, arvioitu valmistuminen 2025-2027.",
      educationCopy: "Painotus sähköjärjestelmissä, automaatiossa, PLC-ohjelmoinnissa, mittauksissa ja käytännön insinöörityön teknisessä kehityksessä.",
      hvacSystems: "LVI-järjestelmät",
      projectsEvolving: "Portfolio kehittyy aktiivisesti. Lisää valmiita automaatioprojekteja ja teknistä dokumentaatiota lisätään tulevina päivinä.",
      projectCaseStudy: "Projektin case study",
      backToProjects: "Takaisin projekteihin",
      visualPackage: "Visuaalinen paketti",
      projectOverview: "Yleiskuva",
      projectProblem: "Insinääriongelma",
      projectTechnologies: "Teknologiat",
      projectSkills: "Osoitetut taidot",
      projectWhy: "Mitä tämä osoittaa",
      projectNextSteps: "Seuraavat askeleet",
      projectOutcomes: "Projektin tulokset",
      projectOutcomesTitle: "Näyttä siitä, mitä case studyn on tarkoitus osoittaa.",
      projectSeeDetails: "Avaa case-study näkymä",
      projectHideDetails: "Piilota tiedot",
      githubPublishingNext: "GitHub-julkaisu tulossa",
      statusLive: "Julkaistu",
      statusBuild: "Aktiivinen rakennus",
      statusRoadmap: "Suunnitteilla",
      contactHeroTitle: "Avoin rooleille ja teknisille mahdollisuuksille",
      contactAvailability: "Avoin harjoitteluille, junioritason insinöörirooleille ja automaatiomahdollisuuksille Suomessa / EU:ssa.",
      contactSending: "Lähetetään...",
    },
  };


  const projectCopy = {
    fi: {
      "smart-conveyor": {
        title: "Älykäs kuljetinjärjestelmä",
        category: "Materiaalinkäsittelyn automaatio",
        statusLabel: "Kesken",
        summary: "Projekti siitä, miten koneet siirtävät tuotteita vaiheittain ja mitä tapahtuu, kun jokin menee vikaan.",
        intro: "Ohjausjärjestelmän case study, joka näyttää miten ajattelen sekvenssisuunnittelua, vikojen käsittelyä ja ylläpidettävää PLC-käyttäytymistä.",
        problem: "Kuljettimet vaikuttavat yksinkertaisilta, kunnes virtaus pysähtyy. Todellinen työ on tukosten, ristiriitaisten signaalien ja hallitun uudelleenkäynnistyksen käsittelyssä.",
        overview: "Projekti on rakennettu todelliseksi insinöörimäiseksi case studyksi. Painotus on käyttötiloissa, selkeissä ehdoissa, vikavasteessa ja käynnistyksessä, joka olisi ymmärrettävä käyttäjälle tai kunnossapidolle.",
        why: "Projekti auttoi ajattelemaan sekvenssejä, ehtoja ja koneiden todellista käyttäytymistä selkeämmin.",
        visual: "Sekvenssikartta, I/O-yleiskuva ja käyttäjän tilanäkymät",
        technologies: ["PLC-logiikka", "Anturit", "Lukitukset", "Moottorinohjaus", "Diagnostiikka"],
        skills: ["Sekvensointi", "Tilalogiikka", "Vianhakumieli", "Dokumentointi"],
        outcomes: ["Simuloitu jumin palautus vähensi käyttäjän resetointivaiheita viidestä kahteen.", "Vikojen näkyvyys parani erillisillä tukos-, jumi- ja resetointitiloilla.", "Antuririippuvuudet kartoitettiin niin, että sekvenssipäätäkset ovat jäljitettäviä eivätkä vain ajastukseen perustuvia."],
        nextSteps: ["Rakenna ensimmäinen TwinCAT-toteutus.", "Lisää yksinkertainen HMI-tilanäkymä.", "Julkaise projektidokumentaatio GitHubiin, kun logiikkapaketti on valmis."]
      },
      "tank-pid": {
        title: "Säiliän PID-ohjauslaboratorio",
        category: "Prosessinohjaus",
        statusLabel: "Suunnitteilla",
        summary: "Opintoprojekti prosessinohjauksesta ja siitä, miten järjestelmät reagoivat ajan kuluessa.",
        intro: "Prosessinohjauksen reitti, jossa silmukan käyttäytyminen selitetään selkeästi eikä PID:tä käsitellä pelkkänä muotisanana.",
        problem: "Ohjaus ei ole vain arvojen virittämistä. Pitää nähdä miten järjestelmä reagoi, miksi se ylittää tavoitteen ja miten asetukset muuttavat käyttäytymistä.",
        overview: "Tavoitteena on verrata viritystapoja, näyttää silmukka trendeissä ja yhdistää ohjauspäätäkset prosessin käyttäytymiseen ja käyttäjävaikutukseen.",
        why: "Tämä auttoi ymmärtämään ohjauskäyttäytymistä kaavojen mekaanisen käytän sijaan.",
        visual: "Trendinäkymät, viritysvertailu ja silmukan kommentointi",
        technologies: ["PID-ohjaus", "Analogiasignaalit", "Trendilokitus", "Simulointi"],
        skills: ["Ohjausanalyysi", "Silmukan viritys", "Testaus", "Tekninen raportointi"],
        outcomes: ["Vertaile rauhallisen ja aggressiivisen virityksen tuloksia.", "Selitä ylitys, asettumisaika ja häiriävaste näytän avulla.", "Muuta raaka käyttäytyminen luettavaksi insinöörimäiseksi case studyksi."],
        nextSteps: ["Tarkenna simuloitua prosessimallia.", "Rakenna kommentoidut trendikuvat.", "Julkaise tiivis tekninen raportti."]
      },
      "smart-hvac": {
        title: "Älykäs LVI-automaatio",
        category: "Rakennusautomaatio",
        statusLabel: "Suunnitteilla",
        summary: "LVI-ohjauskonsepti aikatauluilla, ympäristölogiikalla, hälytyksillä ja turvallisilla varatiloilla.",
        intro: "Rakennusautomaation projekti rauhallisesta ja ylläpidettävästä käyttölogiikasta.",
        problem: "LVI-järjestelmät tarvitsevat muutakin kuin lämpötilan säätöä: aikatauluja, hälytysten käsittelyä, varakäyttäytymistä ja luettavia tiloja.",
        overview: "Projekti keskittyy ilmanvaihtoon ja mukavuusohjaukseen aikataulujen, läsnäolologiikan ja poikkeavien anturitilanteiden kautta.",
        why: "Se näyttää osaanko jäsentää ohjauslogiikkaa järjestelmälle, joka käy jatkuvasti ja jonka pitää pysyä ymmärrettävänä.",
        visual: "Käyttötilat, hälytystilat ja ympäristölogiikka",
        technologies: ["LVI-ohjaus", "Aikataulutus", "Valvonta", "Hälytykset"],
        skills: ["Rakennusautomaatio", "Käyttölogiikka", "Dokumentointi", "Järjestelmän selkeys"],
        outcomes: ["Määrittele tilanvaihdot ja läsnäolokäyttäytyminen selkeästi.", "Dokumentoi poikkeavat tilanteet ja varakäyttö.", "Luo case study, joka tuntuu insinöörityöltä eikä markkinoinnilta."],
        nextSteps: ["Suunnittele tilakartta.", "Lisää käyttäjälle suunnattuja dashboard-konsepteja.", "Yhdistä projekti vahvempaan HMI-näkymään."]
      },
      "motor-control-center": {
        title: "Moottorinohjauskeskuksen tutkimus",
        category: "Sähköteho ja käytöt",
        statusLabel: "Rakennettu",
        summary: "MCC-tutkimus koordinoidusta moottorilogiikasta, ehdoista, sähköisestä ymmärryksestä ja vikastatusten käsittelystä.",
        intro: "Projektireitti, jossa sähkötekniikka ja automaatiologiikka kohtaavat teollista työtä vastaavalla tavalla.",
        problem: "Moottorijärjestelmät riippuvat selkeästä komentorakenteesta, ehdoista, laukaisuista ja palautteesta. Jos nämä ovat epäselviä, sekä käyttö että kunnossapito kärsivät.",
        overview: "Painotus on siinä, miten ohjausjärjestelmän pitäisi käsitellä valmiustiloja, käynnistysehtoja, pysäytyksiä, laukaisuja ja resetointipolkuja useille moottoritoiminnoille.",
        why: "Tällainen projekti vastaa teknistä työtä, johon haluan kasvaa: käytännön sähköjärjestelmiä vahvalla ohjauslogiikalla.",
        visual: "MCC-arkkitehtuuri, signaalimatriisi ja vikatilalogiikka",
        technologies: ["Moottorikäynnistimet", "Käyttölogiikka", "Ehdot", "Palautesignaalit", "Sähköohjaus"],
        skills: ["Sähköinen ymmärrys", "Ohjausten integrointi", "Tilasuunnittelu", "Luotettavuusajattelu"],
        outcomes: ["Rakennettu ehtomatriisi erottaa komento-, laukaisu- ja palautetilat.", "Vikojen näkyvyys parani ready-, blocked-, tripped- ja reset-tiloilla.", "Käynnistyksen estologiikka dokumentoitiin niin, että kunnossapito voi seurata signaalipolkua."],
        nextSteps: ["Lisää moottorin ehtomatriisi.", "Luo selkeämmät laitetilan visualisoinnit.", "Julkaise dokumentaatiopaketti toteutusmuistiinpanojen kanssa."]
      },
      "remote-monitoring-dashboard": {
        title: "Etävalvonnan dashboard", category: "Teollinen näkyvyys", statusLabel: "Suunnitteilla",
        summary: "SCADA-tyylinen valvontatutkimus hälytyksistä, trendeistä, kunnossapidon näkyvyydestä ja käyttäjälle luettavista tiloista.",
        intro: "Valvontakonsepti, jossa signaalien hyädyllisyys on tärkeämpää kuin visuaalinen melu.",
        problem: "Dashboardit epäonnistuvat usein, koska ne näyttävät liikaa ja selittävät liian vähän.",
        overview: "Projekti käsittelee laitoksen tilan, hälytysten ja kunnossapidon tiedon esittämistä selkeällä hierarkialla.",
        why: "Hyvä automaatio on myös hyvää viestintää. Järjestelmän pitää selittää itseään käyttäjille.",
        visual: "Hälytyshierarkia, trendiasettelu ja yhteenvetonäkymä",
        technologies: ["Dashboardit", "Trenditieto", "Hälytykset", "Etätila"], skills: ["Tietohierarkia", "HMI-ajattelu", "Käyttö-UX", "Järjestelmän selkeys"],
        outcomes: ["Priorisoi tärkeät hälytykset ja tilat.", "Erota käyttäjän ja kunnossapidon näkymät järkevästi.", "Dokumentoi miksi jokainen näytetty elementti on mukana."],
        nextSteps: ["Luo dashboard-rakenteet.", "Yhdistä valvontanäkymä automaation case studyyn.", "Lisää perustelut jokaiselle näytän osalle."]
      },
      "safety-interlock-system": {
        title: "Turvalukitusjärjestelmä", category: "Koneturvallisuus", statusLabel: "Suunnitteilla",
        summary: "Turvallisuuteen keskittyvä logiikkatutkimus ehdoista, turvallisista tiloista, hätäpysäytyksistä ja uudelleenkäynnistyksestä.",
        intro: "Tuleva reitti kurinalaisesta järjestelmäkäyttäytymisestä eikä kevyestä ohjaussuunnittelusta.",
        problem: "Lukituslogiikan on pysyttävä yksiselitteisenä. Epäselvä turvallinen tila muuttuu nopeasti käyttöriskiksi.",
        overview: "Projekti käsittelee turvallisuuteen liittyvää tilanhallintaa, restart-ehtoja ja estotiloja niiden vaatimalla vakavuudella.",
        why: "Se osoittaa kurinalaista ajattelua koneiden käyttäytymisestä ja turvallisuustietoisesta suunnittelusta.",
        visual: "Ehtokartta, turvallisten tilojen siirtymät ja restart-logiikka",
        technologies: ["Lukitukset", "Ehdot", "Hätätilat", "Restart-logiikka"], skills: ["Turvallisuustietoisuus", "Rakenteinen logiikka", "Dokumentointi", "Tilasuunnittelu"],
        outcomes: ["Määrittele estetty ja valmis tila selkeästi.", "Kuvaa restart-ehdot hätätilanteiden jälkeen.", "Rakenna teknisellä kielellä kirjoitettu case-study reitti."],
        nextSteps: ["Luonnostele turvallisuustilakaavio.", "Lisää signaali- ja resetointivaatimukset.", "Yhdistä case study realistisempaan konekonseptiin."]
      },
      "pick-place-robot-cell": {
        title: "Pick and place -robottisolu", category: "Robotiikka", statusLabel: "Suunnitteilla",
        summary: "Solutason ohjauskonsepti liikkeen koordinoinnista, sekvenssin ajoituksesta, tunnistuslogiikasta ja palautuspoluista.",
        intro: "Robotiikan case study selkeästä sekvenssimäärittelystä ja vikatietoisuudesta.",
        problem: "Robottisolut epäonnistuvat, jos liike, tunnistus ja solun tilanhallinta eivät ole tiiviisti koordinoituja.",
        overview: "Tavoitteena on määritellä solun tilat, käyttäjän toiminta ja palautuminen niin, että kokonaisuus pysyy luettavana monimutkaisuuden kasvaessa.",
        why: "Se osoittaa suunnittelukuria monivaiheiseen automaatioon, ei vain irrallisiin koodinpätkiin.",
        visual: "Solun tilasekvenssi, turva-alueet ja käyttäjävuorovaikutus",
        technologies: ["Robottisolu", "Anturit", "Tilanhallinta", "Solusekvensointi"], skills: ["Sekvenssisuunnittelu", "Koordinointi", "Palautussuunnittelu", "Automaatiorakenne"],
        outcomes: ["Jäsennä solun tilat ja siirtymät.", "Mallinna turvallinen käyttäjävuorovaikutus.", "Valmistele reitti tuleville simulointivisuaaleille."],
        nextSteps: ["Rakenna ensimmäinen tilavirta.", "Lisää vikapalautusskenaarioita.", "Valmistele simulointiin sopiva projektitarina."]
      },
      "quality-inspection-vision-station": {
        title: "Laaduntarkastuksen konenäköasema", category: "Tarkastusjärjestelmät", statusLabel: "Suunnitteilla",
        summary: "Tarkastustyönkulun konsepti, jossa yhdistyvät hyväksy/hylkää-logiikka, hylkäyskäsittely ja käyttäjäpalaute.",
        intro: "Konenään case study tarkastusvirrasta ja jäljitettävästä logiikasta.",
        problem: "Tarkastusjärjestelmät tarvitsevat muutakin kuin kuvankäsittelyä: selkeän tilanhallinnan, hylkäyslogiikan ja käyttäjäpalautteen.",
        overview: "Reitti näyttää, miten tarkastustulokset kulkevat koneen tilojen läpi ja miten hylkäykset, uusinnat ja käyttäjän toimet käsitellään.",
        why: "Se näyttää työnkulun kurinalaisuutta ja jäljitettävyyttä tuotantoympäristössä.",
        visual: "Hyväksy/hylkää-virta, hylkäysreititys ja käyttäjän vastetilat",
        technologies: ["Konenäkö", "Tarkastusvirta", "Hylkäyslogiikka", "Käyttöjäpalaute"], skills: ["Tyänkulun suunnittelu", "Laatuajattelu", "Jäljitettävyys", "Järjestelmälogiikka"],
        outcomes: ["Määrittele hyväksy-, hylkää- ja reject-ehdot selkeästi.", "Rakenna käyttäjäpalautteen tilat siististi.", "Valmistele uudelleenkäytettävä case-study malli."],
        nextSteps: ["Kartoita tarkastuksen tilavirta.", "Lisää hylkäysaseman käyttöliittymäkonsepti.", "Dokumentoi miksi jokainen tila on olemassa."]
      },
      "smart-energy-metering-system": {
        title: "Älykäs energiamittausjärjestelmä", category: "Energiajärjestelmät", statusLabel: "Suunnitteilla",
        summary: "Energiankäytän valvontatutkimus kuormakäyttäytymisestä, raportoinnista ja insinöörille luettavasta kulutustiedosta.",
        intro: "Järjestelmäkonsepti, joka tekee sähkönkäyttötiedosta hyädyllisempää toiminnan kannalta.",
        problem: "Raaka tehotieto on arvokasta vasta, kun se selittää malleja, poikkeamia ja toimintamahdollisuuksia.",
        overview: "Projekti käsittelee sähkönkulutuksen valvontaa, yhteenvetoa ja muuttamista hyädylliseksi insinööritiedoksi.",
        why: "Se yhdistää sähköisen ymmärryksen ja kyvyn muuttaa data toiminnalliseksi ymmärrykseksi.",
        visual: "Kuormayhteenveto, trendihavainnot ja raportointitilat",
        technologies: ["Mittaus", "Tehotieto", "Raportointi", "Valvonta"], skills: ["Energia-ajattelu", "Datan tulkinta", "Järjestelmäajattelu", "Dokumentointi"],
        outcomes: ["Seuraa merkityksellisiä käyttömalleja.", "Yhteenvetä järjestelmän kuorma käyttökelpoisesti.", "Muuta mittaukset toiminnaksi pelkkien numeroiden sijaan."],
        nextSteps: ["Määrittele raportointimuoto.", "Lisää trendi- ja hälytyslogiikka.", "Yhdistä projekti vahvempaan dashboard-case studyyn."]
      },
      "packaging-line-automation": {
        title: "Pakkauslinjan automaatio", category: "Tuotantojärjestelmät", statusLabel: "Suunnitteilla",
        summary: "Tuotantolinjan ohjauskonsepti synkronoinnista, seisokkien käsittelystä ja käyttäjän puuttumislogiikasta.",
        intro: "Linjaohjauksen case study monivaiheisesta koordinoinnista eikä yksittäisestä konelogiikasta.",
        problem: "Pakkausjärjestelmät muuttuvat hauraiksi, jos linjavaiheita ei synkronoida selkeästi ja seisokkitiloja ei käsitellä kunnolla.",
        overview: "Projekti käsittelee koordinoitua konekäyttäytymistä, estotiloja ja sitä, miten käyttäjän puuttuminen sopii linjasekvenssiin.",
        why: "Se osoittaa tuotantoajattelua ja miten automaatiologiikka skaalautuu yhdistettyihin vaiheisiin.",
        visual: "Linjatilojen koordinointi, seisokkipolut ja interventiologiikka",
        technologies: ["Linjaohjaus", "Synkronointi", "Seisokkitilat", "Käyttöjälogiikka"], skills: ["Tuotantoajattelu", "Koordinointi", "Vianhaku", "Dokumentointi"],
        outcomes: ["Määrittele vaiheiden riippuvuudet selkeästi.", "Mallinna seisokit ja restart-polut.", "Rakenna vahvempi monikoneinen projektitarina."],
        nextSteps: ["Lisää linjatilojen visualisoinnit.", "Luo downstream-block ja upstream-starve skenaariot.", "Muuta konsepti dokumentoiduksi case studyksi."]
      },
      "virtual-commissioning-project": {
        title: "Virtuaalinen käyttöänotto", category: "Simulointi", statusLabel: "Suunnitteilla",
        summary: "Simulointiin perustuva tutkimus sekvenssilogiikan ja vikatilanteiden validoinnista ennen käyttöänottoa.",
        intro: "Case study varmennuksesta ennen kuin laitteistoriski kasvaa.",
        problem: "Käyttöänotto on luotettavampaa, kun logiikkaa ja vikatiloja tutkitaan ennen kuin järjestelmä on käynnissä.",
        overview: "Projekti keskittyy siihen, miten simulointi ja virtuaalinen käyttöänotto voivat paljastaa vikatiloja, ajoitusongelmia ja käyttäjäongelmia aikaisin.",
        why: "Se osoittaa varmennusajattelua sen sijaan, että kaikki heikkoudet läydettäisiin vasta kentällä.",
        visual: "Simulointivirta, vikas skenaariot ja ennen käyttöänottoa tehtävä validointi",
        technologies: ["Simulointi", "Validointi", "Testaus", "Käyttöänotto"], skills: ["Varmennus", "Skenaariosuunnittelu", "Luotettavuusajattelu", "Analyysi"],
        outcomes: ["Luo kehys testaukseen ennen käyttöänottoa.", "Mallinna poikkeavat tilanteet ja odotetut vasteet.", "Käytä simulointia insinöörinäyttänä."],
        nextSteps: ["Valitse simulointiympäristö.", "Määrittele skenaariokattavuus.", "Yhdistä reitti johonkin PLC-logiikkaprojektiin."]
      },
      "predictive-maintenance-system": {
        title: "Ennakoivan kunnossapidon järjestelmä", category: "Luotettavuustekniikka", statusLabel: "Suunnitteilla",
        summary: "Kunnonvalvontakonsepti varhaisista vikailmaisimista, kunnossapidon laukaisuista ja luotettavuussuunnittelusta.",
        intro: "Projektisuunta, joka yhdistää kunnossapitotaustani dataan perustuvaan insinööripäätäksentekoon.",
        problem: "Kuntodata on hyädyllistä vasta, kun se ohjaa kunnossapitotoimia oikeaan aikaan ja oikealla varmuudella.",
        overview: "Projekti käsittelee, miten koneen kuntoindikaattorit voivat tukea kunnossapidon suunnittelua eivätkä vain koristella dashboardia.",
        why: "Se yhdistää käytännön kunnossapitoajattelun automaation ja valvonnan suunnitteluun.",
        visual: "Kuntosignaalit, kunnossapidon triggerit ja luotettavuusnäkymä",
        technologies: ["Kunnonvalvonta", "Kunnossapitotriggerit", "Analytiikka", "Luotettavuus"], skills: ["Kunnossapitoajattelu", "Valvonta", "Luotettavuus", "Dataan perustuvat päätäkset"],
        outcomes: ["Tunnista hyädylliset varhaiset varoitusindikaattorit.", "Muuta signaalit trigger-logiikaksi.", "Muotoile työ toiminnallisesti hyädylliseksi insinöörityöksi."],
        nextSteps: ["Valitse kohdekoneen indikaattorit.", "Määrittele trigger-malli.", "Yhdistä projekti valvontadashboardiin."]
      }

    }
  };

  function t(key) {
    return copy[currentLang]?.[key] || copy.en[key] || "";
  }

  function localizeProject(project) {
    if (currentLang !== "fi") return project;
    return { ...project, ...(projectCopy.fi[project.slug] || {}) };
  }

  function localizeList(items) {
    return Array.isArray(items) ? items : [];
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
      speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M18.5 5.5a9 9 0 0 1 0 13"></path></svg>',
      stop: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6.5" y="6.5" width="11" height="11" rx="1.8"></rect></svg>',
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
      themeToggle.setAttribute("aria-label", theme === "dark" ? t("switchLight") : t("switchDark"));
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
    if (readableToggle) setButtonText(readableToggle, t("dyslexic"));
    if (speakToggle) {
      setButtonText(speakToggle, speechState === "idle" ? t("read") : t("stop"));
      setButtonIcon(speakToggle, speechState === "idle" ? "speaker" : "stop");
      speakToggle.setAttribute("aria-label", speechState === "idle" ? t("readAloud") : t("stop"));
    }
    if (pauseToggle) {
      pauseToggle.hidden = speechState === "idle";
      setButtonText(pauseToggle, speechState === "paused" ? t("play") : t("pause"));
      setButtonIcon(pauseToggle, speechState === "paused" ? "play" : "pause");
      pauseToggle.setAttribute("aria-label", speechState === "paused" ? t("play") : t("pause"));
    }

    const bannerText = privacyBanner?.querySelector("p");
    if (bannerText) bannerText.textContent = t("privacyBanner");
    if (privacyDetails) privacyDetails.textContent = t("privacyDetails");
    if (privacyAccept) privacyAccept.textContent = t("privacyAccept");
    if (privacyModalTitle) privacyModalTitle.textContent = t("privacyTitle");
    if (privacyModalBody[0]) privacyModalBody[0].textContent = t("privacyBodyOne");
    if (privacyModalBody[1]) privacyModalBody[1].textContent = t("privacyBodyTwo");
    applyStaticTranslations();
    // Re-apply dynamic theme toggle label in the active language.
    const activeTheme = root.getAttribute("data-theme") || "light";
    applyTheme(activeTheme);
    updateRenderedProjects();
    populateProjectDetail();
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
      link.addEventListener("click", (event) => {
        closeMenu();

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
    if (pauseToggle) pauseToggle.setAttribute("aria-label", t("pause"));
    if (speakToggle) {
      setButtonText(speakToggle, t("read"));
      setButtonIcon(speakToggle, "speaker");
      speakToggle.setAttribute("aria-label", t("readAloud"));
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
      pauseToggle.setAttribute("aria-label", t("pause"));
    }
    if (speakToggle) {
      setButtonText(speakToggle, t("stop"));
      setButtonIcon(speakToggle, "stop");
      speakToggle.setAttribute("aria-label", t("stop"));
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

    pauseToggle.hidden = true;

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
        pauseToggle.setAttribute("aria-label", t("play"));
      } else if (speechState === "paused") {
        window.speechSynthesis.resume();
        speechState = "playing";
        setButtonText(pauseToggle, t("pause"));
        setButtonIcon(pauseToggle, "pause");
        pauseToggle.setAttribute("aria-label", t("pause"));
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
    if (status === "live") return { label: t("statusLive"), className: "status-live" };
    if (status === "build") return { label: t("statusBuild"), className: "status-build" };
    return { label: t("statusRoadmap"), className: "status-roadmap" };
  }

  function createProjectCard(project) {
    const localized = localizeProject(project);
    const status = getStatusMeta(project.status);
    const card = document.createElement("article");
    card.className = "project-card reveal";
    card.dataset.slug = project.slug;
    card.dataset.status = project.status;
    card.dataset.search = [
      localized.title,
      localized.category,
      localized.summary,
      localized.problem,
      localizeList(localized.technologies).join(" "),
      localizeList(localized.skills).join(" "),
    ].join(" ").toLowerCase();

    card.innerHTML = `
      <div class="project-card-top">
        <span class="status-badge ${status.className}" data-project-card-status>${localized.statusLabel || status.label}</span>
        <span class="project-category" data-project-card-category>${localized.category}</span>
      </div>
      <h3 data-project-card-title>${localized.title}</h3>
      <p class="project-summary" data-project-card-summary>${localized.summary}</p>
      <div class="project-problem">
        <p class="micro-label" data-i18n="projectProblem">${t("projectProblem")}</p>
        <p class="panel-copy" data-project-card-problem>${localized.problem}</p>
      </div>
      <button class="project-toggle" type="button" aria-expanded="false">${t("projectSeeDetails")}</button>
      <div class="project-details" hidden>
        <ul class="pill-list" data-project-card-technologies>${localizeList(localized.technologies).map((item) => `<li>${item}</li>`).join("")}</ul>
        <p class="project-why" data-project-card-why>${localized.why}</p>
        <div class="project-links">
          <a class="button button-primary" href="/projects/${project.slug}/">${t("projectCaseStudy")}</a>
          ${project.github ? `<a class="button button-secondary" href="${project.github}" target="_blank" rel="noopener">GitHub</a>` : `<span class="button button-tertiary">${t("githubPublishingNext")}</span>`}
        </div>
      </div>
    `;

    return card;
  }

  function updateRenderedProjects() {
    if (!projectsGrid) return;
    Array.from(projectsGrid.querySelectorAll(".project-card")).forEach((card) => {
      const project = projects.find((item) => item.slug === card.dataset.slug);
      if (!project) return;
      const localized = localizeProject(project);
      const status = getStatusMeta(project.status);
      const statusNode = card.querySelector("[data-project-card-status]");
      const categoryNode = card.querySelector("[data-project-card-category]");
      const titleNode = card.querySelector("[data-project-card-title]");
      const summaryNode = card.querySelector("[data-project-card-summary]");
      const problemNode = card.querySelector("[data-project-card-problem]");
      const techNode = card.querySelector("[data-project-card-technologies]");
      const whyNode = card.querySelector("[data-project-card-why]");
      const problemLabel = card.querySelector(".project-problem .micro-label");
      const caseLink = card.querySelector(".project-links .button-primary");
      const githubNext = card.querySelector(".project-links .button-tertiary");
      const toggle = card.querySelector(".project-toggle");
      const details = card.querySelector(".project-details");

      if (problemLabel) problemLabel.textContent = t("projectProblem");
      if (statusNode) statusNode.textContent = localized.statusLabel || status.label;
      if (categoryNode) categoryNode.textContent = localized.category;
      if (titleNode) titleNode.textContent = localized.title;
      if (summaryNode) summaryNode.textContent = localized.summary;
      if (problemNode) problemNode.textContent = localized.problem;
      if (techNode) techNode.innerHTML = localizeList(localized.technologies).map((item) => `<li>${item}</li>`).join("");
      if (whyNode) whyNode.textContent = localized.why;
      if (caseLink) caseLink.textContent = t("projectCaseStudy");
      if (githubNext) githubNext.textContent = t("githubPublishingNext");
      if (toggle) toggle.textContent = details?.hidden === false ? t("projectHideDetails") : t("projectSeeDetails");
      card.dataset.search = [
        localized.title,
        localized.category,
        localized.summary,
        localized.problem,
        localizeList(localized.technologies).join(" "),
        localizeList(localized.skills).join(" "),
      ].join(" ").toLowerCase();
    });
    applyProjectFilters();
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

    const sections = Array.from(projectsGrid.querySelectorAll(".project-ecosystem-section"));

    sections.forEach((section) => {
      const visibleCards = Array.from(section.querySelectorAll(".project-card")).filter((card) => !card.hidden);
      section.hidden = visibleCards.length === 0;
    });

    if (projectsEmpty) projectsEmpty.hidden = visibleCount !== 0;
  }

  function renderProjects() {
    if (!projectsGrid) return;

    projectsGrid.innerHTML = "";

    ecosystems.forEach((ecosystem) => {
      const ecosystemProjects = projects.filter((project) => project.ecosystem === ecosystem.id);
      if (!ecosystemProjects.length) return;

      const section = document.createElement("section");
      section.className = "project-ecosystem-section reveal";
      section.dataset.ecosystem = ecosystem.id;

      const heading = document.createElement("div");
      heading.className = "project-ecosystem-heading";
      heading.innerHTML = `
        <h2>${ecosystem.title}</h2>
        <p>${ecosystem.description || ""}</p>
      `;

      const grid = document.createElement("div");
      grid.className = "project-grid-section";

      ecosystemProjects.forEach((project) => {
        grid.appendChild(createProjectCard(project));
      });

      section.appendChild(heading);
      section.appendChild(grid);
      projectsGrid.appendChild(section);
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
      toggle.textContent = isExpanded ? t("projectSeeDetails") : t("projectHideDetails");
      details.hidden = isExpanded;
    });
  }

  function populateProjectDetail() {
    if (!detailRoot) return;

    const slug = detailRoot.getAttribute("data-project-slug");
    const project = projects.find((item) => item.slug === slug);
    if (!project) return;

    const localized = localizeProject(project);
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
    const githubPending = detailRoot.querySelector("[data-project-github-pending]");

    document.title = `${localized.title} | ${t("navProjects")} | Jibran Hussain`;

    if (title) title.textContent = localized.title;
    if (intro) intro.textContent = localized.intro;
    if (summary) summary.textContent = localized.overview;
    if (problem) problem.textContent = localized.problem;
    if (why) why.textContent = localized.why;
    if (visual) visual.textContent = localized.visual;
    if (category) category.textContent = localized.category;
    if (statusNode) {
      statusNode.textContent = localized.statusLabel || status.label;
      statusNode.classList.add(status.className);
    }
    if (technologies) technologies.innerHTML = localizeList(localized.technologies).map((item) => `<li>${item}</li>`).join("");
    if (skills) skills.innerHTML = localizeList(localized.skills).map((item) => `<li>${item}</li>`).join("");
    if (outcomes) outcomes.innerHTML = localizeList(localized.outcomes).map((item) => `<li>${item}</li>`).join("");
    if (nextSteps) nextSteps.innerHTML = localizeList(localized.nextSteps).map((item) => `<li>${item}</li>`).join("");

    if (githubPending) {
      githubPending.textContent = t("githubPublishingNext");
    } else if (githubButton && !project.github) {
      const pending = document.createElement("span");
      pending.className = "button button-tertiary";
      pending.dataset.projectGithubPending = "";
      pending.textContent = t("githubPublishingNext");
      githubButton.replaceWith(pending);
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
    contactSubmitButton.textContent = isSubmitting ? t("contactSending") : t("contactSubmit");
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
