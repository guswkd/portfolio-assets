# Portfolio releases

## User-facing names and links
- v1 = 확인본. When asked to open or share a link, default to `versions/v1/index.html`.
- v2 = 회사제출본. Existing company links remain unchanged.
- Switcher labels use 확인본_THEME / 회사제출본_THEME.

- v2: `jo_hyeonjang.html` (existing public URL; active working version)
- v1: `versions/v1/index.html` (internal snapshot, accessed through the switcher)
- The redundant public `jo_hyeonjang_v1.html` has been removed.
- Theme selection remains `?version=normal|goldenax|ilgram|bat|innored|monq`.
- v1 references frozen CSS/JS assets under `versions/v1/assets`.
- Do not update v1 or its frozen assets when editing v2 unless explicitly asked.
- Original root-level project media remains shared; do not overwrite it without checking v1.
- Analytics paths: `/portfolio/v1/THEME` and `/portfolio/v2/THEME`.
- Old links remain v2. Analytics identifies the link used, not the visitor's identity.
