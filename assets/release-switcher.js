(() => {
  const dialog = document.querySelector('.version-command');
  if (!dialog) return;
  const input = dialog.querySelector('input');
  const select = document.createElement('select');
  select.id = input.id;
  select.setAttribute('aria-label', '포트폴리오 버전 선택');
  select.style.cssText = 'width:100%;padding:12px;font:inherit;color:inherit;background:transparent;border:1px solid currentColor;border-radius:8px';
  const themes = {normal:'노멀',goldenax:'골드넥스',ilgram:'일그램',bat:'BAT',innored:'이노레드',monq:'몽규'};
  for (const release of ['v1', 'v2']) {
    for (const [theme, label] of Object.entries(themes)) {
      const option = document.createElement('option');
      option.value = release + '_' + theme;
      option.textContent = (release === 'v1' ? '확인본' : '회사제출본') + '_' + label;
      select.append(option);
    }
  }
  input.removeAttribute('id');
  input.hidden = true;
  input.after(select);
  const release = /\/versions\/v1\//.test(location.pathname) ? 'v1' : 'v2';
  new MutationObserver(() => {
    if (!dialog.open) return;
    select.value = release + '_' + (document.body.dataset.portfolioVersion || 'normal');
    dialog.querySelector('[role="status"]').textContent = '확인할 버전과 회사 테마를 선택하세요.';
    select.focus();
  }).observe(dialog, {attributes:true, attributeFilter:['open']});
  dialog.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const [nextRelease, theme] = select.value.split('_');
    if (nextRelease === release) {
      setPortfolioVersion(theme, true);
      dialog.close();
      return;
    }
    const url = new URL(location.href);
    const root = new URL('.', document.baseURI);
    url.pathname = root.pathname + (nextRelease === 'v1' ? 'versions/v1/index.html' : 'jo_hyeonjang.html');
    url.searchParams.set('version', theme);
    url.hash = '';
    location.assign(url.href);
  }, true);
})();
