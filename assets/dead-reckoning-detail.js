(function () {
  const root = document.querySelector('[data-project-slug="dead-reckoning-navigation"]');
  if (!root) return;

  const repositoryUrl = 'https://github.com/jibranthedecoder/webots-dead-reckoning-navigation';

  const content = {
    en: {
      github: 'GitHub repository',
      intro: 'A Webots robotics navigation project focused on wheel-encoder odometry, pose estimation, heading correction, and state-machine control.',
      summary: 'The robot starts at the origin, drives through green, blue, and red target squares, and returns to the origin using a semicircular path. The controller estimates robot pose from wheel encoder measurements and separates movement into clear rotate, linear, tangent, circular, and stop phases.',
      problem: 'Dead reckoning navigation accumulates error because the robot estimates position from wheel movement alone. Wheel radius error, slip, model uncertainty, and heading drift can all move the robot away from the intended path.',
      why: 'This project demonstrates practical odometry-based robot navigation, pose estimation, state-machine design, and the limitations of navigation without external position feedback.',
      evidenceEyebrow: 'Evidence package',
      evidenceTitle: 'Project files available on GitHub.',
      evidenceCopy: 'Open the controller code, report, and simulation video directly from the project repository.',
      visualLabel: 'Visual evidence',
      visualCopy: 'Webots e-puck simulation using wheel odometry, target-point navigation, heading correction, and a semicircular return path.',
      repo: 'Repository',
      code: 'Python code',
      report: 'PDF report',
      video: 'Simulation video',
      technologies: ['Webots', 'Python', 'e-puck robot', 'Wheel encoders', 'Odometry', 'State machine'],
      skills: ['Pose estimation', 'Dead reckoning', 'Heading correction', 'Path planning', 'Robot simulation', 'Technical reporting'],
      nextSteps: [
        'Keep the GitHub evidence package up to date.',
        'Add a short comparison between odometry-only navigation and sensor-corrected navigation.',
        'Use this page structure as the template for the next Webots robotics project.'
      ],
      outcomes: [
        'Navigated through green, blue, and red target points and returned near the origin.',
        'Reached the final origin position with an estimated error of about 0.0196 m.',
        'Implemented a readable state machine for rotate, linear, tangent, circular, and stop phases.'
      ]
    },
    fi: {
      github: 'GitHub-repository',
      intro: 'Webots-robotiikan navigointiprojekti, jossa keskitytään pyöräenkooderiodometriaan, sijainnin arviointiin, suuntakorjaukseen ja tilakoneohjaukseen.',
      summary: 'Robotti lähtee origosta, ajaa vihreän, sinisen ja punaisen kohdeneliön kautta ja palaa lopuksi origoon puoliympyräreittiä pitkin. Ohjain arvioi robotin sijainnin pyöräenkooderien perusteella ja jakaa liikkeen selkeisiin kääntö-, suora-, tangentti-, ympyrä- ja pysäytysvaiheisiin.',
      problem: 'Laskelmasuunnistuksessa virhe kasvaa, koska robotti arvioi sijaintinsa pelkän pyöräliikkeen perusteella. Pyörän säteen virhe, luisto, malliepätarkkuus ja suuntavirhe voivat siirtää robotin pois suunnitellulta reitiltä.',
      why: 'Tämä projekti osoittaa käytännön odometriaan perustuvaa robottinavigointia, sijainnin arviointia, tilakonesuunnittelua ja sen, miksi navigointi ilman ulkoista sijaintipalautetta on herkkä virheille.',
      evidenceEyebrow: 'Todisteaineisto',
      evidenceTitle: 'Projektitiedostot GitHubissa.',
      evidenceCopy: 'Avaa ohjainkoodi, raportti ja simulaatiovideo suoraan projektin GitHub-repositorysta.',
      visualLabel: 'Visuaalinen näyttö',
      visualCopy: 'Webots e-puck -simulaatio, jossa käytetään pyöräodometriaa, kohdepistenavigointia, suuntakorjausta ja puoliympyräpalautusta.',
      repo: 'Repository',
      code: 'Python-koodi',
      report: 'PDF-raportti',
      video: 'Simulaatiovideo',
      technologies: ['Webots', 'Python', 'e-puck-robotti', 'Pyöräenkooderit', 'Odometria', 'Tilakone'],
      skills: ['Sijainnin arviointi', 'Laskelmasuunnistus', 'Suuntakorjaus', 'Reittisuunnittelu', 'Robottisimulaatio', 'Tekninen raportointi'],
      nextSteps: [
        'Pidä GitHubin todistepaketti ajan tasalla.',
        'Lisää lyhyt vertailu odometriaan perustuvan navigoinnin ja anturikorjatun navigoinnin välille.',
        'Käytä tätä sivurakennetta mallina seuraavalle Webots-robotiikkaprojektille.'
      ],
      outcomes: [
        'Robotti navigoi vihreän, sinisen ja punaisen kohdepisteen kautta ja palasi lähelle origoa.',
        'Lopullinen etäisyys origosta oli arviolta noin 0.0196 m.',
        'Ohjaukseen toteutettiin luettava tilakone kääntö-, suora-, tangentti-, ympyrä- ja pysäytysvaiheille.'
      ]
    }
  };

  function installLayoutGuard() {
    if (document.getElementById('dead-reckoning-layout-guard')) return;

    const style = document.createElement('style');
    style.id = 'dead-reckoning-layout-guard';
    style.textContent = `
      .dead-reckoning-page .detail-visual,
      .dead-reckoning-page .line-following-visual,
      .dead-reckoning-page .webots-video-card {
        min-width: 0 !important;
        max-width: 100% !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }

      .dead-reckoning-page .webots-video-card {
        width: min(100%, 34rem) !important;
        justify-self: center !important;
        margin-inline: auto !important;
        padding: 0.6rem !important;
      }

      .dead-reckoning-page .webots-video-card video {
        display: block !important;
        width: 100% !important;
        max-width: 31rem !important;
        height: auto !important;
        max-height: 17rem !important;
        margin-inline: auto !important;
        object-fit: contain !important;
      }

      .dead-reckoning-page .metric-strip {
        max-width: 34rem !important;
        margin-inline: auto !important;
      }

      .dead-reckoning-page .visual-video-link {
        max-width: 34rem !important;
        justify-self: center !important;
      }
    `;
    document.head.appendChild(style);
  }

  function isFinnish() {
    try {
      if (window.localStorage.getItem('jh-language') === 'fi') return true;
    } catch (error) {}
    const langToggle = document.getElementById('langToggle');
    return Boolean(langToggle && langToggle.textContent.trim().toUpperCase() === 'EN');
  }

  function setText(selector, value) {
    const node = document.querySelector(selector);
    if (node && node.textContent !== value) node.textContent = value;
  }

  function setList(selector, items) {
    const node = document.querySelector(selector);
    if (!node) return;
    const next = items.map((item) => `<li>${item}</li>`).join('');
    if (node.innerHTML !== next) node.innerHTML = next;
  }

  function apply() {
    installLayoutGuard();
    const lang = isFinnish() ? 'fi' : 'en';
    const t = content[lang];

    const githubButton = document.querySelector('[data-project-github]');
    if (githubButton) {
      githubButton.href = repositoryUrl;
      githubButton.textContent = t.github;
      githubButton.removeAttribute('hidden');
      githubButton.setAttribute('target', '_blank');
      githubButton.setAttribute('rel', 'noopener');
    }

    setText('[data-project-intro]', t.intro);
    setText('[data-project-summary]', t.summary);
    setText('[data-project-problem]', t.problem);
    setText('[data-project-why]', t.why);
    setText('[data-dead-evidence-eyebrow]', t.evidenceEyebrow);
    setText('[data-dead-evidence-title]', t.evidenceTitle);
    setText('[data-dead-evidence-copy]', t.evidenceCopy);
    setText('[data-dead-visual-label]', t.visualLabel);
    setText('[data-dead-visual-copy]', t.visualCopy);
    setText('[data-dead-link="repo"]', t.repo);
    setText('[data-dead-link="code"]', t.code);
    setText('[data-dead-link="report"]', t.report);
    setText('[data-dead-link="video"]', t.video);

    setList('[data-project-technologies]', t.technologies);
    setList('[data-project-skills]', t.skills);
    setList('[data-project-next-steps]', t.nextSteps);
    setList('[data-project-outcomes]', t.outcomes);
  }

  function schedule() {
    window.setTimeout(apply, 0);
    window.setTimeout(apply, 80);
    window.setTimeout(apply, 250);
    window.setTimeout(apply, 700);
  }

  schedule();
  const langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', schedule);
  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true, characterData: true });
}());
