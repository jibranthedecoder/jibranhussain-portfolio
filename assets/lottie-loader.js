(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lottieTargets = Array.from(document.querySelectorAll('[data-lottie-path]'));
  if (!lottieTargets.length) return;

  function initTarget(el) {
    if (!el || el.dataset.lottieLoaded === 'true') return;
    const animationPath = el.getAttribute('data-lottie-path');
    if (!animationPath || !window.lottie) return;

    el.dataset.lottieLoaded = 'true';
    try {
      window.lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationPath,
      });
    } catch (error) {
      el.dataset.lottieLoaded = 'false';
    }
  }

  function initAll() {
    lottieTargets.forEach(initTarget);
  }

  function loadPlayer() {
    if (window.lottie) {
      initAll();
      return;
    }

    const existing = document.querySelector('script[data-lottie-player="true"]');
    if (existing) {
      existing.addEventListener('load', initAll, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = '/assets/lottie-light.min.js';
    script.dataset.lottiePlayer = 'true';
    script.onload = initAll;
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPlayer, { once: true });
  } else {
    loadPlayer();
  }
})();
