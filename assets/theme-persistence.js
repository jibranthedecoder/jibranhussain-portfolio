(function () {
  var storageKey = 'jh-theme';
  var root = document.documentElement;

  function canUseStorage() {
    try {
      var testKey = '__jh_theme_storage_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  var storageEnabled = canUseStorage();

  function getStoredTheme() {
    if (!storageEnabled) return '';
    var value = window.localStorage.getItem(storageKey);
    return value === 'dark' || value === 'light' ? value : '';
  }

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function getCurrentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function storeTheme(theme) {
    if (!storageEnabled) return;
    if (theme === 'dark' || theme === 'light') {
      window.localStorage.setItem(storageKey, theme);
    }
  }

  function applyTheme(theme) {
    var safeTheme = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', safeTheme);

    var toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    toggle.setAttribute('aria-pressed', safeTheme === 'dark' ? 'true' : 'false');
    toggle.setAttribute(
      'aria-label',
      safeTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  function applyPreferredTheme() {
    applyTheme(getStoredTheme() || getSystemTheme());
  }

  function interceptThemeToggle() {
    var toggle = document.getElementById('themeToggle');
    if (!toggle || toggle.dataset.themePersistenceBound === 'true') return;

    toggle.dataset.themePersistenceBound = 'true';
    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      var nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      storeTheme(nextTheme);
      applyTheme(nextTheme);
    }, true);
  }

  function repairAfterLanguageToggle() {
    window.setTimeout(applyPreferredTheme, 0);
    window.setTimeout(applyPreferredTheme, 80);
    window.setTimeout(applyPreferredTheme, 250);
  }

  function interceptLanguageToggle() {
    var langToggle = document.getElementById('langToggle');
    if (!langToggle || langToggle.dataset.themePersistenceBound === 'true') return;

    langToggle.dataset.themePersistenceBound = 'true';
    langToggle.addEventListener('click', repairAfterLanguageToggle, false);
  }

  function init() {
    applyPreferredTheme();
    interceptThemeToggle();
    interceptLanguageToggle();
  }

  init();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  }

  if (window.matchMedia) {
    var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    var onSystemThemeChange = function () {
      if (!getStoredTheme()) applyTheme(getSystemTheme());
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onSystemThemeChange);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(onSystemThemeChange);
    }
  }
}());
