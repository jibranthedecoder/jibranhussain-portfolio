(function () {
  if (document.body?.dataset.page !== 'contact') return;

  const copy = {
    en: 'Thank you for reaching out. I’ll review your message and reply as soon as I can.',
    fi: 'Kiitos yhteydenotosta. Tarkistan viestisi ja vastaan mahdollisimman pian.',
  };

  function isFinnish() {
    try {
      if (window.localStorage.getItem('jh-language') === 'fi') return true;
    } catch (error) {}
    const langToggle = document.getElementById('langToggle');
    return Boolean(langToggle && langToggle.textContent.trim().toUpperCase() === 'EN');
  }

  function apply() {
    const note = document.querySelector('[data-i18n="contactFormNote"]');
    if (!note) return;
    note.textContent = isFinnish() ? copy.fi : copy.en;
  }

  function schedule() {
    window.setTimeout(apply, 0);
    window.setTimeout(apply, 80);
    window.setTimeout(apply, 250);
    window.setTimeout(apply, 700);
  }

  schedule();
  document.getElementById('langToggle')?.addEventListener('click', schedule);
}());
