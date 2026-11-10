(() => {
  const body = document.body;
  const hero = document.getElementById('hero');
  const layer = hero?.querySelector('.version-motion-layer');
  if (!hero || !layer) return;

  const syncMotionImage = () => {
    const source = document.querySelector('#campaign .brand-creative-grid img');
    if (source?.src) body.style.setProperty('--reference-motion-image', `url(${JSON.stringify(source.currentSrc || source.src)})`);
  };

  let heroVisible = true;
  const syncPlayback = () => {
    layer.classList.toggle('motion-paused', !heroVisible || document.hidden);
  };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      syncPlayback();
    }).observe(hero);
  }

  syncMotionImage();
  syncPlayback();
  window.addEventListener('load', syncMotionImage, {once:true});
  window.addEventListener('portfolio-version-change', syncPlayback);
  document.addEventListener('visibilitychange', syncPlayback);
})();
