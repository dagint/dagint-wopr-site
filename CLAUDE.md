# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DaGint Computer Support website — a static site built with **Astro 5** using a WOPR-inspired retro-futuristic design. Deployed to **Cloudflare Pages** via Git-based CI/CD.

**Site:** https://dagint.com

## Commands

```bash
npm run dev          # Dev server at http://localhost:4321
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run build:preview # Build + preview combined
```

No test framework is configured. Validate changes by running `npm run build` (TypeScript strict mode + Zod content schema validation will catch errors).

## Architecture

- **Framework:** Astro 5 with static output (`output: 'static'`)
- **Styling:** Tailwind CSS 3 with `darkMode: 'class'`, `@tailwindcss/typography` for blog prose
- **Content:** MDX blog posts in `src/content/blog/` with Zod schema in `src/content/config.ts`
- **TypeScript:** Strict mode, path alias `@/*` → `./src/*`

### Key Directories

- `src/layouts/Layout.astro` — Main layout with sticky header, footer, SEO (JSON-LD, OG tags), font loading, and CSS variables
- `src/pages/` — File-based routing. Dynamic routes: `blog/[slug].astro`, `blog/page/[page].astro`
- `src/components/` — Astro components (Hero, ThemeToggle, ContactForm, BlogPreview, etc.)
- `src/content/blog/` — MDX blog posts with frontmatter schema
- `src/styles/global.css` — Tailwind directives + custom utility classes (`.page-banner`, `.card`, `.blog-post.prose`)
- `public/_headers` — Cloudflare Pages security headers (CSP, X-Frame-Options, CORS)
- `docs/` — Detailed documentation on deployment, security, performance, troubleshooting

### Blog Content Schema

Posts require: `title`, `summary`, `date`, `serviceIcon` ('support'|'security'|'cloud'). Optional: `tags`, `published` (default true), `image`, `icon`.

## Design System

WOPR-themed palette using CSS variables (`--wopr-primary: #0A2540`, `--wopr-accent: #60A5FA`, etc.) defined in Layout.astro. Tailwind config extends these as `primary`, `secondary`, `accent`, `surface` colors. Fonts: Inter (body), JetBrains Mono (mono/headers).

## External Integrations

- **Formspree** — Contact form backend
- **Cloudflare Web Analytics** — Optional, enabled via env var
- **Fonts** — Inter + JetBrains Mono (self-hosted woff2 in `public/fonts/`)

## Environment Variables

All prefixed with `PUBLIC_` (Astro requirement for client visibility). See `.env.example` for the full list. Key vars: `PUBLIC_FORMSPREE_FORM_ID`, `PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN`.

## Deployment

Push to `main` triggers production deploy on Cloudflare Pages. Feature branches get preview deployments. Build output is `dist/`. Manual deploy: `npx wrangler pages deploy dist --project-name=dagint-site`.

## Conventions

- Components use PascalCase (`.astro`), pages use kebab-case with brackets for dynamic routes
- CSS custom properties use `--wopr-*` prefix
- Contact email/phone are rendered as plaintext (consistent with JSON-LD schema on every page)
- Blog pagination is 10 posts per page
- Accessibility: skip-to-content link, focus-visible outlines, ARIA labels, semantic HTML
