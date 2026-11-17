(() => {
  const hero = document.querySelector('#hero > .hero-copy');
  const heading = document.querySelector('#profile > .section-heading');
  if (!hero || !heading) return;
  const role = document.createElement('p');
  role.className = 'ae-role-label';
  role.textContent = 'Digital Marketing AE · 조현장';
  hero.append(role);
  const intro = document.createElement('div');
  intro.className = 'ae-role-intro';
  intro.innerHTML = '<p class="ae-role-title">광고주의 요청을 캠페인 계획으로 정리하고,<br>운영과 결과 보고까지 맡는 AE를 지향합니다.</p><p>미디어믹스 작성과 리포팅, 소재·카피 기획, 타깃·예산 운영과 광고주 보고를 경험했습니다. 이 경험을 바탕으로 캠페인의 목적에 맞는 매체와 실행 방향을 제안하고 싶습니다.</p>';
  heading.after(intro);
  const direction = document.createElement('section');
  direction.className = 'ae-direction';
  direction.setAttribute('aria-labelledby', 'ae-direction-title');
  direction.innerHTML = `<h3 id="ae-direction-title">지원 직무와 연결되는 경험</h3><div class="ae-direction-grid">
    <article><span class="ae-direction-number">01</span><h4>캠페인 기획</h4><p>누구에게 어떤 말을 전할지 정하고, 콘텐츠와 매체를 제안하는 일.</p></article>
    <article><span class="ae-direction-number">02</span><h4>팀 협업</h4><p>광고주 요청을 정리해 팀에 전달하고, 작업 내용과 일정을 맞추는 일.</p></article>
    <article><span class="ae-direction-number">03</span><h4>운영·보고</h4><p>집행 결과를 광고주에게 설명하고, 다음 광고에서 바꿀 점을 제안하는 일.</p></article>
  </div>`;
  intro.after(direction);
  const opportunity = document.querySelector('.swot-item[data-factor="O"] dd');
  const original = opportunity?.innerHTML;
  const defaultIntro = intro.innerHTML;
  const strength = document.querySelector('.swot-item[data-factor="S"] dd');
  const originalStrength = strength?.innerHTML;
  const otherFactors = ['W', 'T'].map(factor => { const element = document.querySelector(`.swot-item[data-factor="${factor}"] dd`); return { factor, element, original: element?.innerHTML }; });
  const experienceTags = [...document.querySelectorAll('.experience-card .exp-meta')].map(element => ({ element, original: element.innerHTML }));
  const campaignHeadings = [...document.querySelectorAll('.campaign-role h4')].map(element => ({ element, original: element.textContent }));
  const jobTitles = [...document.querySelectorAll('.exp-role')].map(element => ({ element, original: element.textContent, english: ({ '미디어플래너': 'Media Planner', '퍼포먼스 마케터': 'Performance Marketer' })[element.textContent.trim()] }));
  const sync = () => {
    const monq = document.body.dataset.portfolioVersion === 'monq';
    const goldenax = document.body.dataset.portfolioVersion === 'goldenax';
    direction.hidden = !goldenax;
    role.textContent = 'Digital Marketing AE · 조현장';
    jobTitles.forEach(({ element, original, english }) => { if (english) element.textContent = monq ? original : english; });
    intro.innerHTML = goldenax ? '<p class="ae-role-title">광고를 운영한 경험으로,<br>어떤 광고를 만들지 제안하는 AE가 되겠습니다.</p><p>소재·카피 기획, 타깃·예산 운영, 광고주 보고를 맡았습니다. 골드넥스에서는 집행 결과를 근거로 메시지와 콘텐츠를 제안하는 일을 맡고 싶습니다.</p>' : defaultIntro;
    experienceTags.forEach(({ element, original }) => {
      element.innerHTML = original;
      if (!goldenax) return;
      const tags = [...element.children];
      const planning = tags.find(tag => tag.textContent.includes('소재·카피 기획'));
      if (planning) {
        tags.forEach(tag => tag.classList.remove('role-key'));
        planning.classList.add('role-key');
        element.prepend(planning);
      }
    });
    campaignHeadings.forEach(({ element, original }) => { element.textContent = goldenax ? '기획·운영에서 맡은 일' : original; });
    if (strength) strength.innerHTML = goldenax ? '<strong>광고 운영과 광고주 보고</strong>소재·카피 기획부터 타깃·예산 운영, 성과 보고까지 맡은 경험이 있습니다. 집행 결과를 정리하고, 바꿔야 할 점을 광고주에게 설명할 수 있습니다.' : originalStrength;
    otherFactors.forEach(({ factor, element, original }) => { if (element) element.innerHTML = !goldenax ? original : factor === 'W' ? '<strong>성과 원인 분석</strong>예산·소재·행사가 함께 바뀌면 성과가 달라진 이유를 가려내기 어렵습니다. 변경 내역과 지표를 비교하는 연습이 필요합니다.' : '<strong>성과 비교의 조건</strong>행사 여부와 집계 기간이 다르면 수치만으로 비교할 수 없습니다. 광고에서 바꾼 내용과 행사·기간 차이를 나눠 설명해야 합니다.'; });
    role.hidden = intro.hidden = monq;
    if (opportunity) opportunity.innerHTML = monq ? original : '<strong>매체 운영에서 캠페인 기획으로</strong>NMG에서 미디어믹스와 리포팅을, 그로스비에서 광고 운영과 광고주 소통을 경험했습니다. 다음에는 광고주의 요청과 운영 데이터를 함께 검토해 캠페인 계획을 제안하는 역할까지 맡고 싶습니다.';
    if (goldenax && opportunity) opportunity.innerHTML = '<strong>운영 결과를 다음 기획에 활용</strong>소재·타깃별 반응은 다음 광고를 기획할 때 참고할 수 있는 자료입니다. 이 자료로 메시지와 매체를 제안하고, 캠페인·SNS 콘텐츠 기획까지 맡는 것이 목표입니다.';
  };
  window.addEventListener('portfolio-version-change', sync);
  sync();
})();
