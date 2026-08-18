# Connor Koefelda — Portfolio

A single-page portfolio showcasing my software projects — from VS Code
extensions and desktop utilities to full-stack web apps. Built with
**React 19**, **TypeScript**, **Vite 6**, **Tailwind CSS 3**, and
**Framer Motion**, and deployed to GitHub Pages.

The site uses CSS Scroll Snap for a smooth, full-screen, slide-by-slide
experience: each featured project gets its own case-study slide, and a
sticky navbar tracks the section you're viewing as you scroll.

## Featured projects

- **Terminal Watch** — a VS Code extension that watches terminal output and
  delivers native desktop notifications, even from containerized
  environments. *(TypeScript, VS Code API)*
- **Flowkey** — a lightweight Windows productivity daemon for launching apps
  and toggling custom mini-apps with keyboard shortcuts. *(Go, Wails, Win32)*
- **Rush Hour** — a full-stack web app for organizing fraternity rush, with
  Supabase auth, real-time data management, and a shadcn/Tailwind UI.
  *(Next.js, Supabase, TypeScript)*

## Site sections

- **Home** — intro and quick links
- **About** — bio and resume
- **Projects** — featured case studies plus a "More projects" grid
- **Contact** — email and LinkedIn

## Tech stack

React 19 · TypeScript · Vite 6 · Tailwind CSS 3 · Framer Motion

## Running locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → ./dist
```

## Deployment

Deployed to GitHub Pages via GitHub Actions. Every push to `main` triggers
an automated build and deployment, so the live site always reflects the
latest changes. The build uses a relative base path, so the same output
works on user or project pages.
