/* Shared, version-aware analytics. Local previews are excluded. */
(() => {
  'use strict';
  const endpoint = 'https://guswkd725.goatcounter.com/count';
  if (!endpoint || location.hostname !== 'guswkd.github.io') return;
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl) return;
  const versions = new Set(['normal', 'goldenax', 'ilgram', 'bat', 'innored', 'monq']);
  const version = () => {
    const value = document.body.dataset.portfolioVersion || 'normal';
    return versions.has(value) ? value : 'normal';
  };
  let previous;
  const count = () => {
    const current = version();
    if (current === previous || !window.goatcounter?.count) return;
    if (window.goatcounter.filter?.()) return;
    window.goatcounter.count({
      path: '/portfolio/' + current,
      title: 'Portfolio · ' + current
    });
    previous = current;
  };
  window.goatcounter = { no_onload: true, endpoint };
  const script = document.createElement('script');
  script.async = true;
  script.dataset.goatcounter = endpoint;
  script.src = 'https://gc.zgo.at/count.js';
  script.onload = () => {
    count();
    new MutationObserver(count).observe(document.body, {
      attributes: true,
      attributeFilter: ['data-portfolio-version']
    });
  };
  document.head.append(script);
})();
