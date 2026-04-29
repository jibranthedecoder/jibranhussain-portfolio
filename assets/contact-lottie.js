(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var el = document.getElementById('contactLottie');
  if (!el) return;

  function initLottie() {
    try {
      if (!window.lottie || typeof window.lottie.loadAnimation !== 'function') return;
      window.lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/contact-wave-hand.json'
      });
    } catch (e) {
      // Decorative animation only. Fail silently so the contact page remains usable.
    }
  }

  function loadPlayer() {
    if (window.lottie && typeof window.lottie.loadAnimation === 'function') {
      return Promise.resolve();
    }

    return new Promise(function (resolve) {
      var existing = document.querySelector('script[data-lottie-loader="true"]');
      if (existing) {
        existing.addEventListener('load', function () { resolve(); }, { once: true });
        existing.addEventListener('error', function () { resolve(); }, { once: true });
        return;
      }

      var script = document.createElement('script');
      script.src = '/assets/lottie-light.min.js';
      script.async = true;
      script.dataset.lottieLoader = 'true';
      script.addEventListener('load', function () { resolve(); }, { once: true });
      script.addEventListener('error', function () { resolve(); }, { once: true });
      document.head.appendChild(script);
    });
  }

  if (!('IntersectionObserver' in window)) {
    loadPlayer().then(initLottie);
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    loadPlayer().then(initLottie);
  }, { threshold: 0.1 });

  observer.observe(el);
}());
