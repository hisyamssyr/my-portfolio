# hisyam-portfolio

Personal portfolio of **Hisyam Syafa Raditya** — Informatics student at ITS.
Static site built with Astro + Tailwind CSS. No backend, no database, no client framework.

## Requirements

- Node.js 22.22+
- npm

## Commands

| Command           | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Dev server at `localhost:4321`                      |
| `npm run build`   | Production build to `dist/`                         |
| `npm run preview` | Serve the production build locally                  |
| `npm run check`   | Astro + TypeScript diagnostics                      |
| `npm run og`      | Regenerate `public/og/og-default.png` (needs Chrome via `CHROME_PATH`) |

## Structure

```
src/
  components/        # small reusable components + diagrams/
  content/projects/  # one .mdx per case study
  content.config.ts  # Zod schema for the projects collection
  layouts/           # BaseLayout.astro
  pages/             # index.astro, projects/[slug].astro, 404.astro, styleguide.astro
  styles/            # tokens.css (design tokens), fonts.css, global.css
public/
  fonts/             # self-hosted variable fonts (Fontsource)
  og/                # Open Graph image
```

## Adding a project

1. Create `src/content/projects/my-project.mdx`.
2. Add frontmatter (all fields required unless marked):

```yaml
---
title: "My Project"
tagline: "One sentence that earns the click."
year: "2026"
stack: ["Python", "Docker"]
tags: ["AI", "Backend"]
order: 4 # controls position on the home page
summary: "Meta description for this page."
diagram: "agents" # optional: "six-gate" | "agents" | "numeral"
repo: "https://github.com/hisyamssyr/…" # optional — shows a TODO chip when omitted
---
```

3. Write the body with these `##` sections: `Context`, `Problem`, `Approach`,
   `What I built`, `Result / What I learned`. The page template adds the
   `Stack` section and numbers the headings automatically.
4. Never invent numbers or facts — mark missing data with
   `<span class="todo-chip">TODO: …</span>`.

## Design system

- Tokens live in `src/styles/tokens.css` (dark is the default in `:root`;
  `[data-theme="light"]` switches the palette). The theme is applied to
  `<html data-theme>` before first paint, defaults to dark (OS preference is
  ignored), and the user's choice lives in `localStorage` — it survives page
  navigations via `astro:before-swap`, no flash.
- Type: Fraunces (display), Instrument Sans (body), JetBrains Mono (metadata).
- `/styleguide` is an internal, `noindex` reference page for the design system.

## Deploy — Cloudflare (Workers static assets)

A custom domain is **not required**: the Worker serves a free
`https://my-portfolio.<your-subdomain>.workers.dev` URL with HTTPS. Build and
deploy behavior comes from `wrangler.jsonc` (static assets from `./dist`,
404 handling via `404-page`) — the Workers flow has no "framework preset",
it reads this file.

### Option A — Git integration (auto-deploy on every push)

1. Push this repo to GitHub (done in the step above).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a
   repository** → pick `my-portfolio`.
3. Keep the defaults:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
4. Add a build variable `NODE_VERSION` = `22.22.0` (Settings → Variables and
   Secrets) — or rely on the committed `.nvmrc`. Astro 7 requires Node 22.22+.
5. **Deploy** (~1–2 minutes). The site is live at
   `https://my-portfolio.<your-subdomain>.workers.dev`.
6. Point the site config at the real URL: update `site` in `astro.config.mjs`
   and the `Sitemap:` line in `public/robots.txt`, then push again —
   Cloudflare rebuilds automatically.

### Option B — Deploy from your machine

```sh
npx wrangler login     # once, opens the browser
npm run build
npx wrangler deploy    # reads name + assets directory from wrangler.jsonc
```

### Custom domain (optional, later)

Worker → **Settings** → **Domains & Routes** → **Add custom domain**. The
domain must use Cloudflare DNS (transfer it, or switch its nameservers),
then it is attached in one click.

## TODO before going live

- [ ] Set the real URL (workers.dev or custom domain) in `astro.config.mjs` (`site`) and `public/robots.txt`
- [ ] Add `public/hisyam-syafa-raditya-cv.pdf` (the "Download CV" button appears automatically)
- [ ] Add the BPMN project repo link in the `.mdx` frontmatter
- [ ] Make the Kaggle notebook public (`kaggle.com/code/hisyamsyafaraditya/adm-v2` currently 404 for visitors)
- [ ] Fill in `TODO: add results` sections in projects B and C
- [ ] Document gates 4–6 of the six-gate pipeline
- [ ] Provide Grad-CAM images for the numeral classifier
- [ ] Optional: profile photo (`TODO: owner photo`) — the monogram "HSR" is used until then
  