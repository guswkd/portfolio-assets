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
  const trigger = document.createElement('button');
  trigger.className = 'mq-menu-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-label', '몽규 메뉴 열기');
  trigger.setAttribute('aria-controls', 'mq-menu');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.innerHTML = '<span></span><span></span>';
  document.querySelector('.site-header')?.append(trigger);
  const menu = document.createElement('dialog');
  menu.id = 'mq-menu';
  menu.className = 'mq-menu';
  menu.setAttribute('aria-label', '포트폴리오 사이드 메뉴');
  menu.innerHTML = `<div class="mq-menu-inner">
    <div class="mq-menu-top"><span lang="en" aria-label="한국어">KR</span><button class="mq-menu-close" type="button" aria-label="메뉴 닫기">×</button></div>
    <nav aria-label="포트폴리오 섹션"><a href="#profile">현재</a><a href="#experience">흔적</a><a href="#campaign">현장</a><a href="#skills">확장</a><a href="mailto:guswkd725@naver.com">Contact <span aria-hidden="true">›</span></a></nav>
    <address><a href="mailto:guswkd725@naver.com">guswkd725@naver.com</a><span>조현장</span><a href="tel:01071682504">010-7168-2504</a><a href="https://www.instagram.com/jjnowfield/">@jjnowfield</a></address>
  </div>`;
  document.body.append(menu);
  let closing;
  function finishClose() {
    clearTimeout(closing);
    menu.close();
    document.body.classList.remove('mq-menu-open');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus({preventScroll:true});
  }
  function closeMenu() {
    menu.classList.remove('is-visible');
    closing = setTimeout(finishClose, matchMedia('(prefers-reduced-motion:reduce)').matches ? 0 : 400);
  }
  trigger.addEventListener('click', () => {
    menu.classList.remove('mq-keyboard');
    clearTimeout(closing);
    menu.showModal();
    document.body.classList.add('mq-menu-open');
    trigger.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-visible')));
  });
  menu.querySelector('.mq-menu-close').addEventListener('click', closeMenu);
  menu.addEventListener('keydown', event => {if(event.key==='Tab')menu.classList.add('mq-keyboard')});
  menu.addEventListener('click', event => {if(event.target===menu && event.clientX < menu.getBoundingClientRect().left)closeMenu()});
  menu.addEventListener('cancel', event => {event.preventDefault(); closeMenu()});
  menu.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    finishClose();
    target?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
  }));
  window.addEventListener('portfolio-version-change', () => {if(menu.open)finishClose()});
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
