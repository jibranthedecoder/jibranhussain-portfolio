(function () {
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const readableButton = document.getElementById('readable-toggle');
  const speakButton = document.getElementById('speak-btn');
  const stopButton = document.getElementById('stop-btn');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  const savedTheme = localStorage.getItem('theme');
  const savedReadable = localStorage.getItem('readable-mode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    root.setAttribute('data-theme', 'dark');
  }

  function updateThemeLabel() {
    if (!themeButton) return;
    const isDark = root.getAttribute('data-theme') === 'dark';
    themeButton.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
  }

  function updateReadableLabel() {
    if (!readableButton) return;
    const enabled = root.classList.contains('readable-mode');
    readableButton.textContent = enabled ? '🧠 Standard text' : '🧠 Readable text';
  }

  if (readableButton) {
    if (savedReadable === 'on') {
      root.classList.add('readable-mode');
    }
    readableButton.addEventListener('click', function () {
      root.classList.toggle('readable-mode');
      const enabled = root.classList.contains('readable-mode');
      localStorage.setItem('readable-mode', enabled ? 'on' : 'off');
      updateReadableLabel();
    });
  }

  if (themeButton) {
    themeButton.addEventListener('click', function () {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      updateThemeLabel();
    });
  }

  updateThemeLabel();
  updateReadableLabel();

  if (speakButton) {
    speakButton.addEventListener('click', function () {
      const pageText = document.getElementById('page-content')?.innerText;
      if (!pageText) return;
      const utterance = new SpeechSynthesisUtterance(pageText);
      utterance.lang = document.documentElement.lang === 'fi' ? 'fi-FI' : 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    });
  }

  if (stopButton) {
    stopButton.addEventListener('click', function () {
      window.speechSynthesis.cancel();
    });
  }

  if (form && status) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      status.textContent = 'Sending message...';
      const data = new FormData(form);

      if (data.get('website')) {
        status.textContent = 'Spam prevented.';
        return;
      }

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: data,
        });

        if (response.ok) {
          status.textContent = 'Message sent successfully.';
          form.reset();
        } else {
          status.textContent = 'Unable to send message right now.';
        }
      } catch (error) {
        status.textContent = 'Network error. Please try again later.';
      }
    });
  }
})();