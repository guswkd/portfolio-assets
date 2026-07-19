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

4. 전체 포트폴리오 마인드맵
   - `.portfolio-mindmap`: `현장` 중심의 전체 포트폴리오 지도
   - `.portfolio-map-node`의 제목과 설명을 수정하면 각 큰 노드의 문구가 바뀝니다.
   - `data-map-target`은 상세 화면에 그대로 표시할 기존 섹션 ID와 정확히 같아야 합니다.
   - 큰 노드를 누르면 별도의 복사본이 아니라 기존 포트폴리오 섹션 자체가 상세 화면으로 이동합니다. 따라서 본문의 텍스트·이미지·기능만 수정하면 마인드맵 상세에도 자동으로 동일하게 반영됩니다.
   - 상세 화면을 닫거나 `PORTFOLIO` 보기로 돌아오면 해당 섹션은 원래 문서 위치로 복원됩니다.
   - 가지 위치는 각 `.portfolio-map-branch`의 `--map-angle` 값으로 조정합니다.

5. 첫 화면 키워드
   - `<script>`의 `talentKeywords`

6. 스킬 상세 설명
   - `<script>`의 `skillCopy`
   - 스킬명은 HTML의 `data-name`과 정확히 같아야 합니다.

7. 캠페인 카드
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
