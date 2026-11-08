# Agbor Thomas Carmelo Ayuk — Portfolio

Single-page developer portfolio. React + Vite + Tailwind CSS v4, GSAP (ScrollTrigger) animations, a lightweight Three.js hero background, and full EN/FR bilingualism with react-i18next.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run smoke      # headless smoke test (uses system Edge, no browser download)
```

## Where to edit content (the only file you need)

Everything on the page reads from **`src/data/content.js`**:

| What                      | Where in `content.js`      |
| ------------------------- | -------------------------- |
| Name, role, tagline, bio   | `profile`                  |
| "What I'm focused on"      | `profile.focus`            |
| Profile photo & CV path    | `profile.photo`, `profile.cvUrl` |
| Email / WhatsApp / LinkedIn / GitHub | `contact`          |
| Projects (6)               | `projects`                 |
| Skill groups & badges      | `skills`                   |
| Experience timeline        | `experience`               |
| Stats strip                | `stats`                    |

Conventions:

- **Bilingual text** is stored as `{ en: "...", fr: "..." }`. Write natural French, not literal translations. Arrays of bilingual sentences are supported (bio, focus, experience points) and render one paragraph/bullet per item.
- **`null` hides things.** If `contact.whatsapp` is `null`, no WhatsApp button appears anywhere (hero, contact, form). Same for email/LinkedIn/GitHub and any project `image`.
- Search the repo for `TODO` — every remaining placeholder is marked.

### How to add a project

1. Open `src/data/content.js`.
2. Copy an entry from `projects` and fill it: `id`, `name`, `url`, `image` (path under `/public/images/…`, or `null` → automatic styled placeholder), `imageAlt`, one-liner `description` (small card) **or** the four long fields `problem`, `solution`, `role`, `challenge` (featured card), plus `stack` badges.
3. Set `featured: true` to make it a large row (keep exactly 3 `featured` projects — the design and rhythm assume it), or `false` for a compact card in the grid.
4. Drop the screenshot into `public/images/` and reference it. JPG or WebP, max ~1200px wide (much nicer for visitors on mid-range phones).

### How the languages work

- UI chrome strings live in `src/i18n/en.json` and `src/i18n/fr.json` (keys like `projects.visitLive`, `hero.viewWork`).
- Content data lives in `src/data/content.js` as `{ en, fr }` objects (see above).
- The language switcher in the navbar toggles `i18next`, which re-renders everything and persists the choice in `localStorage` (key `lang`). French is auto-selected for browsers whose language starts with `fr`.
- To add a third language later: add a JSON file in `src/i18n/`, register it in `src/i18n/index.js`, and extend `{ en, fr }` objects in `content.js` to three keys.

### Animations & the 3D hero

- **GSAP**: global scroll-reveals in `src/animations/RevealAnimations.jsx` (elements with class `reveal`; card grids with class `reveal-cards`). Hero entrance lives in `Hero.jsx` via `useGSAP`. Everything respects `prefers-reduced-motion` and renders the final state instead.
- **Three.js**: `src/components/ThreeBackground.jsx`. Two draw-call particle field + wireframe icosahedron; pauses when scrolled past; static single frame under reduced motion; lower pixel-ratio and particle count on low-memory devices; fully disposed on unmount. If you'd rather ship without it, delete `<ThreeBackground … />` from `Hero.jsx` — the CSS gradient layer beneath it keeps the hero looking intentional.

## Deploy

### Vercel (recommended)

```bash
npm i -g vercel
vercel            # from the project root
vercel --prod
```

Vercel auto-detects Vite. Build command: `npm run build`, output: `dist`. No extra config needed.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --build   # first push
netlify deploy --prod    # production
```

Or via the dashboard: build command `npm run build`, publish directory `dist`. The included `netlify.toml` sets these automatically.

### After deploying (don't skip)

1. Replace `agborthomas.dev` in `index.html` (canonical + OG/Twitter image URLs), `public/robots.txt`, and `public/sitemap.xml` with your final domain.
2. Add the real CV PDF at `public/cv/Agbor-Thomas-CV.pdf` (currently a placeholder).
3. Fill `contact` details in `src/data/content.js`.

## Project structure

```
├── index.html                     # SEO/OG meta, fonts, pre-paint theme script
├── netlify.toml                   # Netlify build settings
├── public/
│   ├── cv/Agbor-Thomas-CV.pdf     # TODO: real CV
│   ├── images/                    # optimized screenshots + profile photo
│   ├── favicon.svg, og-image.jpg
│   ├── robots.txt, sitemap.xml    # TODO: real domain
└── src/
    ├── main.jsx, App.jsx
    ├── index.css                  # Tailwind v4 tokens (navy/gold, light+dark)
    ├── data/content.js            # ⬅ EDIT THIS for all content
    ├── i18n/                      # en.json / fr.json (UI strings) + setup
    ├── theme/ThemeProvider.jsx    # system-preference theme + toggle
    ├── animations/RevealAnimations.jsx
    ├── hooks/useBilingual.js
    ├── lib/gsap.js
    └── components/                # Navbar, Hero, ThreeBackground, About,
                                   # Projects, Stats, Skills, Experience,
                                   # Contact, Footer, SectionHeading
```

## Performance notes (for Lighthouse 90+)

- Fonts: two families, few weights, `display=swap`, `preconnect`.
- All screenshots: `loading="lazy"`, `decoding="async"`, sized JPEGs (~450 KB total instead of 4.5 MB).
- Three.js and GSAP are split into separate chunks so they don't inflate the main bundle; the 3D loop stops when off-screen.
- No image/icon libraries; all icons are inline SVG.
- If you swap screenshots, keep them ≤ 150 KB each (JPG q≈75–80, 1200px wide, or WebP).
