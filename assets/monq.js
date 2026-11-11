(() => {
  const brand = document.createElement('a');
  brand.className = 'mq-brand';
  brand.href = '#hero';
  const logo = document.createElement('img');
  logo.src = 'assets/logos/monq.png';
  logo.alt = '몽규 MONQ';
  logo.width = 44;
  logo.height = 36;
  brand.append(logo);
  brand.setAttribute('aria-label', '몽규 버전 첫 화면');
  document.querySelector('.site-header')?.append(brand);
  const symbol = document.createElement('img');
  symbol.className = 'mq-symbol';
  symbol.src = 'assets/logos/monq-symbol.png';
  symbol.alt = '';
  symbol.setAttribute('aria-hidden', 'true');
  symbol.width = 40;
  symbol.height = 40;
  document.querySelector('.site-header')?.append(symbol);
  const hero = document.getElementById('hero');
  const heroIntro = document.createElement('p');
  heroIntro.className = 'mq-hero-intro';
  heroIntro.append('6개 브랜드의 소재 기획·카피 작성부터');
  heroIntro.append(document.createElement('br'));
  heroIntro.append(' 매체 운영과 성과 분석까지 맡았습니다.');
  const workPreview = document.createElement('a');
  workPreview.className = 'mq-hero-work';
  workPreview.href = '#campaign';
  workPreview.setAttribute('aria-label', '브랜드별 광고 운영 성과와 소재 보기');
  for (const brandName of ['onska', 'ravrac', 'odeheath']) {
    const source = document.querySelector(`[data-brand="${brandName}"] .brand-creative-grid img`);
    if (!source) continue;
    const preview = document.createElement('img');
    preview.src = source.getAttribute('src');
    preview.alt = source.alt;
    preview.width = 360;
    preview.height = 450;
    workPreview.append(preview);
  }
  hero?.append(heroIntro, workPreview);
  const menu = document.querySelector('.header-menu-toggle');
  menu?.addEventListener('click', () => {
    if (document.body.classList.contains('monq-theme') && menu.getAttribute('aria-expanded') === 'true') {
      document.querySelector('.portfolio-nav a')?.focus();
    }
  });
  const closeContact = () => {
    if (!document.body.classList.contains('monq-theme')) return;
    document.querySelector('.contact-panel')?.classList.remove('active');
    menu?.focus();
  };
  document.querySelector('.ir-dismiss')?.addEventListener('click', closeContact);
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.querySelector('.contact-panel.active')) closeContact();
  });
  const input = document.querySelector('#portfolio-version-command');
  if (input) input.placeholder = 'gn / ig / bat / ir / mq / nm';
  const status = document.querySelector('.version-command [role="status"]');
  const update = () => {
    if (status) status.textContent = 'gn / ig / bat / ir / mq(몽규) / nm';
  };
  const dialog = document.querySelector('.version-command');
  if (dialog) new MutationObserver(update).observe(dialog, {attributes:true, attributeFilter:['open']});
  update();
})();
