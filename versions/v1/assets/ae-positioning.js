(() => {
  const hero = document.querySelector('#hero > .hero-copy');
  const heading = document.querySelector('#profile > .section-heading');
  if (!hero || !heading) return;
  const role = document.createElement('p');
  role.className = 'ae-role-label';
  role.textContent = '디지털 마케팅 AE · 조현장';
  hero.append(role);
  const intro = document.createElement('div');
  intro.className = 'ae-role-intro';
  intro.innerHTML = '<p class="ae-role-title">광고주의 요청을 캠페인 계획으로 정리하고,<br>운영과 결과 보고까지 맡는 AE를 지향합니다.</p><p>미디어믹스 작성과 리포팅, 소재·카피 기획, 타깃·예산 운영과 광고주 보고를 경험했습니다. 이 경험을 바탕으로 캠페인의 목적에 맞는 매체와 실행 방향을 제안하고 싶습니다.</p>';
  heading.after(intro);
  const opportunity = document.querySelector('.swot-item[data-factor="O"] dd');
  const original = opportunity?.innerHTML;
  const sync = () => {
    const monq = document.body.dataset.portfolioVersion === 'monq';
    role.hidden = intro.hidden = monq;
    if (opportunity) opportunity.innerHTML = monq ? original : '<strong>매체 운영에서 캠페인 기획으로</strong>NMG에서 미디어믹스와 리포팅을, 그로스비에서 광고 운영과 광고주 소통을 경험했습니다. 다음에는 광고주의 요청과 운영 데이터를 함께 검토해 캠페인 계획을 제안하는 역할까지 맡고 싶습니다.';
  };
  window.addEventListener('portfolio-version-change', sync);
  sync();
})();
