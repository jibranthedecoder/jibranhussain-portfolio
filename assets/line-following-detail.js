(function () {
  const root = document.querySelector('[data-project-slug="line-following-robot"]');
  if (!root) return;

  const repositoryUrl = 'https://github.com/jibranthedecoder/webots-line-following-robot';

  const content = {
    en: {
      github: 'GitHub repository',
      intro: 'A Webots robotics project focused on sensor feedback, PD control, speed tuning, and measured performance.',
      summary: 'The robot was simulated in Webots using an e-puck model with three ground sensors. The controller uses the middle sensor as the process value and adjusts the left and right wheel speeds with a tuned PD controller. The final setup balances speed, stability, and driven path length.',
      problem: 'A line-following robot must react quickly to the track without becoming unstable. If the correction is too weak, the robot becomes slow. If the speed or gain is too high, the robot oscillates, saturates the motors, or loses smooth line-following behavior.',
      why: 'This project demonstrates practical feedback-control tuning, sensor interpretation, simulation testing, and the ability to document why one controller setting performs better than another.',
      evidenceEyebrow: 'Evidence package',
      evidenceTitle: 'Project files available on GitHub.',
      evidenceCopy: 'Open the controller code, report, simulation video, and result screenshot directly from the project repository.',
      visualLabel: 'Visual evidence',
      visualCopy: 'Webots e-puck simulation with three ground sensors, PD controller tuning, motor saturation, and measured final performance.',
      repo: 'Repository',
      code: 'Python code',
      report: 'PDF report',
      video: 'Simulation video',
      screenshot: 'Result screenshot',
      technologies: ['Webots', 'Python', 'e-puck robot', 'Ground sensors', 'PD control', 'Motor speed saturation'],
      skills: ['Controller tuning', 'Sensor feedback', 'Robot simulation', 'Performance testing', 'Technical reporting'],
      nextSteps: [
        'Keep the repository evidence package up to date.',
        'Add a short note comparing the final PD controller with a simpler P-only controller.',
        'Use this page structure as the template for the next Webots projects.'
      ],
      outcomes: [
        'Tuned the robot to complete the track in 33.38 seconds with a 2.61 m driven path.',
        'Selected base_speed = 5.6, Kp = 7.0, Kd = 0.85, and SP = 4.5 as the final stable tuning set.',
        'Documented the trade-off between fast movement, stable correction, and motor saturation.'
      ]
    },
    fi: {
      github: 'GitHub-repository',
      intro: 'Webots-robotiikkaprojekti, jossa keskitytään anturipalautteeseen, PD-säätöön, nopeuden virittämiseen ja mitattuun suorituskykyyn.',
      summary: 'Robotti simuloitiin Webotsissa e-puck-mallilla ja kolmella pohja-anturilla. Säädin käyttää keskimmäistä anturia mittausarvona ja säätää vasemman sekä oikean pyörän nopeutta viritetyn PD-säätimen avulla. Lopullinen ratkaisu tasapainottaa nopeuden, vakauden ja ajetun matkan.',
      problem: 'Viivanseuraajarobotin täytyy reagoida rataan nopeasti ilman, että liike muuttuu epävakaaksi. Liian heikko korjaus tekee robotista hitaan. Liian suuri nopeus tai vahvistus aiheuttaa sahaamista, moottorien saturaatiota tai epätasaista viivanseurantaa.',
      why: 'Tämä projekti osoittaa käytännön takaisinkytketyn säädön virittämistä, anturidatan tulkintaa, simulointitestausta ja kykyä perustella, miksi yksi säätöasetus toimii paremmin kuin toinen.',
      evidenceEyebrow: 'Todisteaineisto',
      evidenceTitle: 'Projektitiedostot GitHubissa.',
      evidenceCopy: 'Avaa ohjainkoodi, raportti, simulaatiovideo ja tuloskuva suoraan projektin GitHub-repositorysta.',
      visualLabel: 'Visuaalinen näyttö',
      visualCopy: 'Webots e-puck -simulaatio, jossa on kolme pohja-anturia, PD-säätimen viritys, moottorien saturaatio ja mitattu lopputulos.',
      repo: 'Repository',
      code: 'Python-koodi',
      report: 'PDF-raportti',
      video: 'Simulaatiovideo',
      screenshot: 'Tuloskuva',
      technologies: ['Webots', 'Python', 'e-puck-robotti', 'Pohja-anturit', 'PD-säätö', 'Moottorinopeuden saturaatio'],
      skills: ['Säätimen viritys', 'Anturipalaute', 'Robottisimulaatio', 'Suorituskyvyn testaus', 'Tekninen raportointi'],
      nextSteps: [
        'Pidä GitHubin todistepaketti ajan tasalla.',
        'Lisää lyhyt vertailu lopullisen PD-säätimen ja yksinkertaisemman P-säätimen välille.',
        'Käytä tätä sivurakennetta mallina seuraaville Webots-projekteille.'
      ],
      outcomes: [
        'Robotti viritettiin suorittamaan rata 33.38 sekunnissa ja 2.61 metrin ajetulla matkalla.',
        'Lopulliseksi vakaaksi viritykseksi valittiin base_speed = 5.6, Kp = 7.0, Kd = 0.85 ja SP = 4.5.',
        'Projekti dokumentoi nopean liikkeen, vakaan korjauksen ja moottorisaturaation välisen kompromissin.'
      ]
    }
  };

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
    setText('[data-line-evidence-eyebrow]', t.evidenceEyebrow);
    setText('[data-line-evidence-title]', t.evidenceTitle);
    setText('[data-line-evidence-copy]', t.evidenceCopy);
    setText('[data-line-visual-label]', t.visualLabel);
    setText('[data-line-visual-copy]', t.visualCopy);
    setText('[data-line-link="repo"]', t.repo);
    setText('[data-line-link="code"]', t.code);
    setText('[data-line-link="report"]', t.report);
    setText('[data-line-link="video"]', t.video);
    setText('[data-line-link="screenshot"]', t.screenshot);

    setList('[data-project-technologies]', t.technologies);
    setList('[data-project-skills]', t.skills);
    setList('[data-project-next-steps]', t.nextSteps);
    setList('[data-project-outcomes]', t.outcomes);
  }

  function schedule() {
    window.setTimeout(apply, 0);
    window.setTimeout(apply, 80);
    window.setTimeout(apply, 250);
  }

  schedule();

  const langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', schedule);

  const observer = new MutationObserver(schedule);
  observer.observe(root, { childList: true, subtree: true, characterData: true });
}());
