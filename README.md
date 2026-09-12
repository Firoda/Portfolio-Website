# Aditya Firoda — Engineering to Product

A white, scroll-led portfolio rebuilt from the approved content master and redesign plan. Six career chapters, procedural Three.js scenes, full experience panels, five new product stories and five original project archives. The site runs as a single offline HTML file and is configured for GitHub Pages.

## Develop and build

```bash
npm ci
npm run dev
npm run build
```

The final `dist/index.html` and identical `dist/portfolio.html` embed the complete runtime, styles, organization marks, original project screenshots and the previously published profile PDF. Open either directly, or host `dist/index.html` on GitHub Pages. No CDN, external fonts, models, API or internet connection is needed for core content. Social/contact links require the corresponding external service. The existing GitHub Pages workflow builds and publishes on a push to `main`; no deployment was performed during the rebuild.

## Content and source

- `docs/PORTFOLIO_CONTENT.md`: approved copy and internal claim/source register.
- `docs/PORTFOLIO_REDESIGN_PLAN.md`: research, storyboard and visual/interaction specification.
- `docs/ASSET_SOURCES.md`: genuine logo sources and provenance.
- `src/data/content.json`: visitor-facing chapters, full experience and new article copy. Internal source notes are deliberately not bundled.
- `src/data/articles.js`: original project articles and embedded archive screenshots. Original slugs remain stable.
- `src/App.jsx`: homepage, chapter navigation, native details dialog and hash-based article routes.
- `src/components/Scene.jsx`: Three.js lighting, lifecycle and camera controls.
- `src/components/worlds.js`: all procedural chapter models and story-beat variants.
- `src/components/Demo.jsx`: article-specific interactive explanations.
- `src/styles.css`: white editorial system, responsive layouts and reduced-motion styling.

The four old article source HTML files and their images remain as archival inputs, not as the primary website. Unused atlas components and old career data have been removed. The private résumé drafts and strategy documents are not downloadable assets. The retained LinkedIn export is labeled “Profile PDF”.

## Interactions

Native scroll advances the career story and changes the 3D model. Chapter logos provide quick navigation; hover previews the role and scene, while the full-experience action opens a persistent keyboard-accessible dialog. “Explore in 3D” explicitly enables drag rotation and scroll/pinch zoom; zoom/reset buttons and Escape are available. Leaving exploration returns to the story. Offscreen rendering pauses, device pixel ratio is capped, and motion respects the OS reduced-motion setting and the pause control.

Articles use `#article/<slug>` URLs, reading progress, contextual diagrams and next-story navigation. Original technical articles and source caveats are preserved. Use the Markdown claim register for any future content expansion.
