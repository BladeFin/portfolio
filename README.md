# Portfolio

A single-page personal portfolio built with **React 19**, **Vite 6**, **TypeScript**, **Tailwind CSS 3**, and **Framer Motion**. Designed for clean, responsive, deploy-to-GitHub-Pages use.

The page uses **CSS Scroll Snap** (`scroll-snap-type: y mandatory`) — scrolling locks onto each section, TikTok/Reels style, with the sticky navbar staying pinned while sections slide underneath it. The taller "see all" grids scroll internally so every section remains a full-screen slide.

## Stack

- React 19 + TypeScript
- Vite 6 (build tool)
- Tailwind CSS 3 (styling, driven by design tokens in `src/index.css`: background, primary, primary-light, accent, muted)
- Framer Motion (subtle entrance / mobile-menu transitions)

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
```

## Production build

```bash
npm run build        # emits ./dist
npm run preview      # serves the built bundle locally
```

The build uses a **relative base path** (`./`) so the same `dist/` works
whether you publish to:

- a user/org page (`https://<user>.github.io/`), or
- a project page (`https://<user>.github.io/<repo>/`).

## Deploying to GitHub Pages

`gh-pages` is wired into the `deploy` script. From any clone:

```bash
npm run build
npm run deploy
```

This publishes `dist/` to the `gh-pages` branch. Then in your repo's
**Settings → Pages**, choose "Deploy from a branch" and pick `gh-pages` /
`/(root)`.

### Alternative: GitHub Actions

If you'd rather auto-deploy on every push to `main`, add a workflow file at
`.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  pages: write
  id-token: write
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
      - id: deployment
        uses: actions/deploy-pages@v4
```

## File layout

```
src/
├── App.tsx                 # composes every section + wires the active-section hook
├── main.tsx                # React entry
├── index.css               # Tailwind layers + global scroll behavior
├── content/
│   └── data.ts             # projects + publications (edit here, not in components)
├── hooks/
│   └── useActiveSection.ts # IntersectionObserver hook for the navbar highlight
└── components/
    ├── Section.tsx         # full-viewport centered wrapper (used by About, Projects, …)
    ├── NavBar.tsx          # sticky + hamburger-on-mobile + active-link highlight
    ├── Hero.tsx            # landing screen with CTA → #projects
    ├── About.tsx           # short bio + currently/stack/based
    ├── Projects.tsx        # maps over `projects` from data.ts
    ├── Publications.tsx    # maps over `publications` from data.ts
    └── Contact.tsx         # centered mailto CTA
```

## Customizing

- **Copy & content**: edit `src/content/data.ts`.
- **Colors**: edit the design-token block at the top of `src/index.css` — change one value there and the whole site updates.
- **Typography**: edit `tailwind.config.js` and `src/index.css`.
- **Section ordering**: edit `src/App.tsx` (the `SECTION_IDS` array must match the rendered section ids).
