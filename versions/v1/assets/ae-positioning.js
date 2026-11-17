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
  const opportunity = document.querySelector('.swot-item[data-factor="O"] dd');
  const original = opportunity?.innerHTML;
  const defaultIntro = intro.innerHTML;
  const strength = document.querySelector('.swot-item[data-factor="S"] dd');
  const originalStrength = strength?.innerHTML;
  const experienceTags = [...document.querySelectorAll('.experience-card .exp-meta')].map(element => ({ element, original: element.innerHTML }));
  const campaignHeadings = [...document.querySelectorAll('.campaign-role h4')].map(element => ({ element, original: element.textContent }));
  const jobTitles = [...document.querySelectorAll('.exp-role')].map(element => ({ element, original: element.textContent, english: ({ '미디어플래너': 'Media Planner', '퍼포먼스 마케터': 'Performance Marketer' })[element.textContent.trim()] }));
  const sync = () => {
    const monq = document.body.dataset.portfolioVersion === 'monq';
    const goldenax = document.body.dataset.portfolioVersion === 'goldenax';
    role.textContent = 'Digital Marketing AE · 조현장';
    jobTitles.forEach(({ element, original, english }) => { if (english) element.textContent = monq ? original : english; });
    intro.innerHTML = goldenax ? '<p class="ae-role-title">광고주가 원하는 것과 소비자가 반응하는 것을<br>연결하는 기획을 하고 싶습니다.</p><p>소재·카피를 기획하고 광고를 운영하면서, 집행 결과를 광고주에게 보고해 왔습니다. 이제는 그 결과를 다음 광고의 메시지와 콘텐츠를 제안하는 데 쓰고 싶습니다. 골드넥스에서 브랜드 제안서를 함께 만들고, 광고주와 팀 사이에서 필요한 내용을 정리하는 AE로 일하고 싶습니다.</p><p><strong>01 기획</strong> · 제안서 구성, 미디어믹스, 소재·카피<br><strong>02 운영</strong> · 광고 세팅, 타깃 설정, 예산 관리<br><strong>03 분석·보고</strong> · 성과 리포트, 광고주 소통, 개선 방향 제안</p>' : defaultIntro;
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
    if (strength) strength.innerHTML = goldenax ? '<strong>기획 내용을 문서로, 운영 결과를 보고로</strong>캠페인 제안서 구성과 미디어믹스 작성 경험이 있습니다. 광고 운영에서는 소재·카피를 기획하고 타깃과 예산을 관리했습니다. 집행 결과를 리포트로 정리해 광고주에게 보고하고 개선 방향을 제안했습니다.' : originalStrength;
    role.hidden = intro.hidden = monq;
    if (opportunity) opportunity.innerHTML = monq ? original : '<strong>매체 운영에서 캠페인 기획으로</strong>NMG에서 미디어믹스와 리포팅을, 그로스비에서 광고 운영과 광고주 소통을 경험했습니다. 다음에는 광고주의 요청과 운영 데이터를 함께 검토해 캠페인 계획을 제안하는 역할까지 맡고 싶습니다.';
    if (goldenax && opportunity) opportunity.innerHTML = '<strong>캠페인과 SNS 콘텐츠 기획으로</strong>소재·카피 기획과 매체 운영 경험을 브랜드 캠페인과 SNS 채널 기획에 활용하고 싶습니다. 광고주의 요청을 제안서로 정리하고, 팀과 실행 방향을 맞추는 업무를 맡으며 기획 범위를 넓혀가겠습니다.';
  };
  window.addEventListener('portfolio-version-change', sync);
  sync();
})();
