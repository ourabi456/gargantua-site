# Gargantua: A New Home — Official Site

A cinematic, scroll-driven marketing website for the game **Gargantua: A New
Home**, built from the game's own art.

- **Next.js 14** (App Router) + **Tailwind CSS** + custom cinematic CSS
- **Lenis** smooth scroll synced to **GSAP ScrollTrigger** parallax
- **React Three Fiber / Three.js** persistent 3D starfield depth layer
- Layered 2D + 3D parallax, mouse-reactive hero, ice-wipe section
  transitions, grain / vignette / scanline / glitch FX
- Fully responsive, lazy-loaded heavy art, `prefers-reduced-motion` aware

## Sections

1. Hero / Landing — mouse + scroll parallax, game logo, glitch title
2. About — lore, the crew, "the ice that walks", spare/strike endings
3. Gameplay & Mechanics — six animated mechanic cards
4. Gameplay Video — local-MP4 **and** YouTube embed slots (placeholder)
5. Media / Socials — YouTube + Instagram slots
6. Team — 6 members (also at the dedicated `/team` route)
7. Footer

## Local setup

```bash
cd "website gargantua"
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

> `npm install` and `npm run build` need internet the first time
> (npm packages + `next/font` Google fonts).

## Where to drop future assets

| Asset | Location | Then |
|------|----------|------|
| Team portraits | `public/assets/team/member-1.png … member-6.png` | auto-detected (names/roles/bios in `lib/team.js`) |
| Gameplay trailer (MP4) | `public/assets/video/trailer.mp4` | set `USE_LOCAL_VIDEO = true` in `components/VideoShowcase.jsx` |
| YouTube video embed | — | set `YT_ID` in `components/VideoShowcase.jsx` |
| Social URLs | — | edit `SOCIALS.youtube` / `SOCIALS.instagram` in `lib/team.js` |

All in-project art already lives in `public/assets/` (`art/`, `icons/`,
`cinematic/`). Every parallax background and icon is real game art.

## Deploy to Vercel

Project name: **`gargantua-a-new-home`** (preset in `vercel.json`).

**Dashboard:** import the repo → Framework auto-detected as Next.js →
Deploy. No env vars required.

**CLI:**

```bash
npm i -g vercel
cd "website gargantua"
vercel            # first run links/creates the project
vercel --prod     # production deployment
```

Set the project name to `gargantua-a-new-home` when prompted (or rename in
the Vercel dashboard → Settings).

## Notes

- `next.config.mjs` uses `images.unoptimized` so the large game sprites are
  served straight from `/public` with no build-time image pipeline.
- The 3D starfield renders once and is fixed behind every section — it is
  the deepest parallax layer.
- Enhance section-by-section: each section is an isolated component in
  `components/`.
