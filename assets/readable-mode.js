(function () {
  var storageKey = 'jh-readable';
  var root = document.documentElement;
  var toggle = document.getElementById('readableToggle');

  function storageAvailable() {
    try {
      var testKey = '__jh_readable_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  var canStore = storageAvailable();

  function getStoredValue() {
    if (!canStore) return false;
    return window.localStorage.getItem(storageKey) === 'true';
  }

  function setStoredValue(enabled) {
    if (!canStore) return;
    window.localStorage.setItem(storageKey, enabled ? 'true' : 'false');
  }

  function applyReadableMode(enabled) {
    root.classList.toggle('readable-mode', enabled);

    if (!toggle) return;
    toggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    toggle.classList.toggle('is-active', enabled);
  }

  applyReadableMode(getStoredValue());

  if (!toggle) return;

  toggle.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    var enabled = !root.classList.contains('readable-mode');
    setStoredValue(enabled);
    applyReadableMode(enabled);
  }, true);
}());
