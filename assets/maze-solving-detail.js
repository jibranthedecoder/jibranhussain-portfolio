(function () {
  const root = document.querySelector('[data-project-slug="maze-solving-robot"]');
  if (!root) return;

  const repositoryUrl = 'https://github.com/jibranthedecoder/webots-maze-solving-robot';

  const content = {
    en: {
      github: 'GitHub repository',
      intro: 'A robotics simulation project focused on maze navigation, sensor-based decisions, PID wall following, and finite-state machine control.',
      summary: 'The robot uses left, front, and right distance sensors to classify the local maze situation. While driving forward, it applies PID wall-distance correction. When a wall or opening is detected, it changes state and performs calibrated turns using wheel encoder feedback.',
      problem: 'A maze-solving robot must make movement decisions from limited local sensor data. It has to keep a stable distance from walls, detect blocked paths and open turns, handle dead ends, and stop when the maze end condition is reached.',
      evidenceEyebrow: 'Evidence package',
      evidenceTitle: 'Project files available on GitHub.',
      evidenceCopy: 'Open the controller code and simulation evidence directly from the project repository.',
      visualLabel: 'Visual evidence',
      visualCopy: 'Webots maze simulation using three distance sensors, PID wall following, encoder-based turns, and state-machine navigation.',
      repo: 'Repository',
      code: 'Python code',
      original: 'Original controller',
      video: 'Simulation video',
      technologies: ['Webots', 'Python', 'Thymio-style robot', 'Distance sensors', 'PID control', 'State machine'],
      skills: ['Maze navigation', 'Sensor logic', 'PID wall following', 'Encoder-based turning', 'Finite-state machine', 'Robot simulation'],
      outcomes: [
        'Implemented a maze controller using three distance sensors and a heading device.',
        'Used PID wall following to keep the robot stable while moving through the labyrinth.',
        'Separated navigation behavior into forward, turn, dead-end, and end states.'
      ]
    },
    fi: {
      github: 'GitHub-repository',
      intro: 'Robotiikkasimulaatioprojekti, jossa keskitytään labyrinttinavigointiin, anturipohjaisiin päätöksiin, PID-seinäseurantaan ja tilakoneohjaukseen.',
      summary: 'Robotti käyttää vasenta, etu- ja oikeaa etäisyysanturia paikallisen labyrinttitilanteen tunnistamiseen. Eteenpäin ajaessa se korjaa seinäetäisyyttä PID-säädöllä. Kun seinä tai aukko havaitaan, ohjain vaihtaa tilaa ja tekee kalibroituja käännöksiä pyöräenkooderien avulla.',
      problem: 'Labyrinttirobotin täytyy tehdä ajopäätöksiä rajallisen paikallisen anturidatan perusteella. Sen pitää pitää vakaa etäisyys seinistä, tunnistaa suljetut reitit ja avoimet käännökset, käsitellä umpikujat ja pysähtyä, kun labyrintin loppuehto saavutetaan.',
      evidenceEyebrow: 'Todisteaineisto',
      evidenceTitle: 'Projektitiedostot GitHubissa.',
      evidenceCopy: 'Avaa ohjainkoodi ja simulaationäyttö suoraan projektin GitHub-repositorysta.',
      visualLabel: 'Visuaalinen näyttö',
      visualCopy: 'Webots-labyrinttisimulaatio, jossa käytetään kolmea etäisyysanturia, PID-seinäseurantaa, enkooderipohjaisia käännöksiä ja tilakoneohjausta.',
      repo: 'Repository',
      code: 'Python-koodi',
      original: 'Alkuperäinen ohjain',
      video: 'Simulaatiovideo',
      technologies: ['Webots', 'Python', 'Thymio-tyylinen robotti', 'Etäisyysanturit', 'PID-säätö', 'Tilakone'],
      skills: ['Labyrinttinavigointi', 'Anturilogiikka', 'PID-seinäseuranta', 'Enkooderipohjainen kääntyminen', 'Tilakone', 'Robottisimulaatio'],
      outcomes: [
        'Labyrinttiohjain toteutettiin kolmella etäisyysanturilla ja suuntatiedolla.',
        'PID-seinäseuranta pitää robotin vakaampana labyrintissä liikkuessa.',
        'Navigointikäytös jaettiin eteenpäinajo-, käännös-, umpikuja- ja lopputiloihin.'
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
    setText('[data-maze-evidence-eyebrow]', t.evidenceEyebrow);
    setText('[data-maze-evidence-title]', t.evidenceTitle);
    setText('[data-maze-evidence-copy]', t.evidenceCopy);
    setText('[data-maze-visual-label]', t.visualLabel);
    setText('[data-maze-visual-copy]', t.visualCopy);
    setText('[data-maze-link="repo"]', t.repo);
    setText('[data-maze-link="code"]', t.code);
    setText('[data-maze-link="original"]', t.original);
    setText('[data-maze-link="video"]', t.video);

    setList('[data-project-technologies]', t.technologies);
    setList('[data-project-skills]', t.skills);
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
  new MutationObserver(schedule).observe(root, { childList: true, subtree: true, characterData: true });
}());
