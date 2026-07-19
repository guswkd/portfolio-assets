# 포트폴리오 수정 가이드

대상 파일: `포트폴리오_최종.html`

이 사이트는 배포 누락을 줄이기 위해 HTML, CSS, JavaScript를 한 파일에서 관리합니다.

## 자주 수정하는 위치

1. 색상과 테마
   - `<style>` 시작 부분의 `:root`
   - `--dark-*`, `--light-*`, `--hero-accent-*` 변수

2. 화면 문구
   - `<body>` 안의 각 `<section>`
   - 섹션 ID: `profile`, `imc`, `campaign`, `experience`, `skills`, `check`

3. 섹션 순서와 자동 테마 시간
   - `<script>` 시작 부분의 `PORTFOLIO_CONFIG`
   - `sectionOrder`, `lightModeHours`

4. IMC 전략 보기
   - `#imc` 안의 `.imc-flow`: 순차형 업무 흐름
   - `#imc` 안의 `.imc-mindmap`: `현장` 중심 마인드맵
   - `.mind-node`의 제목과 설명을 수정하면 마인드맵 문구가 바뀝니다.
   - 가지 위치는 각 `.mind-branch`의 `--branch-angle` 값으로 조정합니다.

4. 첫 화면 키워드
   - `<script>`의 `talentKeywords`

5. 스킬 상세 설명
   - `<script>`의 `skillCopy`
   - 스킬명은 HTML의 `data-name`과 정확히 같아야 합니다.

6. 캠페인 카드
   - 제목, 설명, 썸네일은 각 `.project-card` 안에서 직접 수정합니다.
   - 영상이나 PDF 원본이 준비되면 `data-asset-url=""` 안에 URL을 입력합니다.
   - URL이 비어 있으면 `영상 보기` 또는 `PDF 보기` 버튼은 자동으로 숨겨집니다.

## 수정 시 주의사항

- `id` 값은 내비게이션과 JavaScript에서 사용하므로 임의로 바꾸지 않습니다.
- `theme-swap-logo` 이미지는 `data-dark-src`, `data-light-src`를 함께 수정합니다.
- 캠페인 분류는 카드 제목과 이미지 이름을 기준으로 자동 생성됩니다.
- `EXPERIENCE` 카드 순서를 바꾸면 모바일과 데스크톱에서 날짜 정렬을 함께 확인합니다.

## 검증과 GitHub 반영

로컬 파일을 새로고침해 다크·라이트모드와 모바일 폭을 확인한 뒤 실행합니다.

```bash
./github_update.sh
```

스크립트는 최신 HTML을 `portfolio-assets` 저장소의 `jo_hyeonjang.html`로 반영합니다.
