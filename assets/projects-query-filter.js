(function () {
  if (document.body?.dataset.page !== 'projects') return;

  function currentQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || params.get('search') || params.get('ecosystem') || '';
  }

  function applyQuery() {
    const query = currentQuery().trim();
    if (!query) return;

    const input = document.getElementById('projectSearch');
    if (!input) return;

    if (input.value !== query) {
      input.value = query;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    document.querySelector('[data-filter="all"]')?.click();
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function schedule() {
    window.setTimeout(applyQuery, 0);
    window.setTimeout(applyQuery, 120);
    window.setTimeout(applyQuery, 500);
    window.setTimeout(applyQuery, 1000);
  }

  schedule();
}());
