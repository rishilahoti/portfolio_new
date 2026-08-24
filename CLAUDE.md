# CLAUDE.md

Guidance for Claude Code working in this repo.

## Stack

- Next.js 14 (App Router, `src/app`), React 18, plain JS (`.js`/`.jsx`, no TypeScript in app code).
- Styling: SCSS Modules (`*.module.scss`) colocated with each component, plus one global `src/app/globals.css`.
- Animation: GSAP (with ScrollTrigger), Framer Motion, Lenis (`@studio-freight/lenis`) for smooth scroll.
- Deployed on Vercel; `@vercel/analytics` and `@vercel/speed-insights` wired into `layout.js`.

## Structure

- `src/app/` — route root: `layout.js` (metadata, fonts, Header, Analytics), `page.js` (home page composition), `data.js` (project list data).
- `src/components/<Name>/` — page sections (Header, Landing, Description, Projects, Contact, Preloader, Circuit). Each folder: `index.jsx` + `style.module.scss` (or `styles.module.scss`) + optional `animation.js` for GSAP/motion variants split out of the component.
- `src/common/<Name>/` — small reusable UI primitives (Magnetic, RoundedButton), same folder shape as components.
- `public/` — static assets (images/video referenced by `src` fields in `data.js` and elsewhere).

## Conventions

- Indentation: **tabs**, not spaces. Match existing files.
- Quotes: single quotes; semicolons on.
- Client components: files using hooks/DOM/animation start with `'use client';`.
- Animation logic that isn't trivial belongs in a sibling `animation.js` (see `Header/animation.js`, `Landing` inline vs `Description/animation.js`), not inlined into the component when the component is already large.
- New page sections follow the existing component folder shape: `index.jsx` + `style(s).module.scss`, imported and composed directly in `src/app/page.js`.
- No test framework configured — don't add one unless asked.

## Commands

- `npm run dev` — dev server (localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint (`next/babel`, `next/core-web-vitals`)

## Notes

- `projects` array in `src/app/data.js` drives the Projects section; `page.js` filters out entries missing `title` or `src`.
