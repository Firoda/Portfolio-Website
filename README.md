# Aditya Firoda — Career Atlas

An interactive portfolio with a procedural Three.js career atlas, chronological experience, hover/tap company details, and five themed project reading views. The four original long-form articles and their screenshots are retained; the fifth item is explicitly a screenshot-only archive.

## Run and build

```bash
npm install
npm run dev
npm run build
```

Open `dist/portfolio.html` directly in a browser, or serve `dist/index.html`. Both contain the complete application, Three.js, CSS, screenshots, and downloadable LinkedIn profile PDF. No network connection, external fonts, textures, or model files are needed. External social links naturally require internet access. The production artifact is about 3.9 MB; this is intentional for the single-file requirement.

The existing Vite/React source structure and GitHub Pages base path are preserved. The build creates one JS bundle, embeds all used assets, then `scripts/standalone.mjs` inlines JS and CSS. Do not edit generated files directly.

## Content

- `src/data/career.js`: career dates, roles, achievements, community work.
- `src/data/articles.js`: original HTML article extraction, embedded images, archive context.
- `src/components/CareerAtlas.jsx`: all scene geometry, lighting, camera controls and company transitions.
- `src/App.jsx`: navigation, chapters, company panels, accessible article dialogs.
- `src/styles.css`: responsive layout, themes, reduced-motion support.

Click a company to hold its details; hover to preview; leave the selector to return the model. Drag the canvas to orbit, scroll/pinch to zoom, or use keyboard-accessible controls. The articles have shareable `#article/<slug>` URLs, Escape dismissal, native modal focus trapping, and reading progress. Reduced-motion preferences and a motion toggle are supported. Rendering pauses when the atlas is off screen.

See `CONTENT_REVIEW.md` for source reconciliation and outstanding source limitations. Changes have not been published.
