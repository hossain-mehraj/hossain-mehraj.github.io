# hossain-mehraj.github.io

Personal engineering portfolio, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Preview locally

Needs Node 22.23+ (installed at `~/.local/node`; add it to your PATH with
`export PATH="$HOME/.local/node/bin:$PATH"`, or put that line in `~/.zshrc`).

```bash
npm install        # first time only
npm run dev        # live-reloading dev server at http://localhost:4321
npm run build      # production build into dist/
npm run preview    # serve the production build at http://localhost:4321
```

## Add a new project

1. Put its images in `src/assets/projects/<slug>/`.
2. Create `src/content/projects/<slug>.md`. Copy an existing file as a template.

```yaml
---
title: My Project
slug: my-project                # becomes /projects/my-project/
summary: "One line shown on the home page (keep it short, quote it)."
thumbnail: ../../assets/projects/my-project/thumb.jpg  # small photo on the home page list
icon: wrench                    # fallback if there's no thumbnail: https://lucide.dev/icons
tags: [CAD, Manufacturing]      # 1–4 tags; the home page shows the first 2
role: Designer
dates: Jan 2026 – Mar 2026
featured: false                 # true = "Selected work", false = "Other projects"
order: 7                        # sort order on the home page and for next/previous links
heroImage: ../../assets/projects/my-project/hero.jpg   # optional
heroAlt: Describe the hero image
heroCaption: Optional caption under the hero.
team: 3 members                 # optional
tools: [Onshape, Lathe]         # optional
stats:                          # optional big numbers under the hero
  - { value: "49%", label: "less drag" }
links:                          # optional
  github: https://github.com/...
  live: https://...
  other: [{ label: Video, url: https://... }]
draft: false                    # true hides it from the site
---

## Overview
## Problem / Goal
## What I did
## Process
## Results / Impact
## What I learned
```

**Images in the body:** `![Alt text](../../assets/projects/my-project/photo.jpg "Caption")`

- One image on its own line becomes a captioned figure.
- Two or three images on **consecutive lines** (no blank line between them) become a gallery row.
- Every image is resized, converted to WebP and lazy-loaded automatically, and opens in a lightbox on click.
- Alt text is required. Describe what's in the photo.
- **Privacy:** never add photos that show other people's faces until they're covered.

Markdown tables turn into stacked cards on phones automatically.

> If you edit `src/lib/*.mjs` (the Markdown plugins) and don't see the change, delete the cache:
> `rm -rf .astro node_modules/.astro`.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it.
One-time setup: GitHub → repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Where things live

| Path | What |
| --- | --- |
| `src/site.ts` | Name, tagline, email, LinkedIn, GitHub, résumé path |
| `src/pages/index.astro` | Home page (bio text is here) |
| `src/pages/about.astro` | About page: bio, skills, experience |
| `src/content/projects/` | One Markdown file per project |
| `src/assets/projects/` | One image folder per project |
| `src/styles/global.css` | Colours, fonts, spacing (CSS variables at the top) |
| `src/layouts/Base.astro` | `<head>`, SEO/Open Graph tags, header, footer, page transitions |
| `src/pages/projects/[slug].astro` | Project page template |
| `public/` | Files served as-is: `favicon.svg`, `resume.pdf`, `robots.txt` |
