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
  const closeContact = () => {
    if (!document.body.classList.contains('monq-theme')) return;
    document.querySelector('.contact-panel')?.classList.remove('active');
    document.querySelector('.contact-toggle')?.focus();
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
