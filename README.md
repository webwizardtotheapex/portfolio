# Isa Hassan — AI Automation Engineer Portfolio

A premium, fully static portfolio website built with Next.js 14, React, TypeScript, Tailwind CSS, and Framer Motion. Designed for GitHub Pages deployment with zero server dependencies.

## Features

- **Fully static export** — no server, no API routes; works on GitHub Pages out of the box
- **Glassmorphism dark theme** — frosted glass cards, gradient accents, animated aurora backdrops
- **Premium animations** — scroll-triggered reveals, floating cards, glowing buttons, 3D tilt effects, spotlight cursor
- **Workflow Gallery** — large screenshot placeholders, tech badges, expandable features, business-impact callouts
- **Responsive** — mobile-first design, adaptive navigation, touch-friendly interactions
- **SEO optimized** — complete metadata, Open Graph, Twitter cards, JSON-LD structured data
- **Fast loading** — optimized fonts, CSS animations (GPU-accelerated), no layout shift

## Tech Stack

- **Next.js 14** (static export)
- **React 18** + **TypeScript**
- **Tailwind CSS** — utility-first styling with custom design tokens
- **Framer Motion** — scroll animations, layout animations, gesture interactions
- **Lucide React** + **React Icons** — professional icon system

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout, fonts, SEO metadata
│   ├── page.tsx             # Main page assembly
│   ├── globals.css          # Tailwind + design system CSS
│   └── sitemap.ts           # Static sitemap
├── components/
│   ├── sections/            # Page sections (Hero, About, Projects…)
│   ├── AnimatedBackground.tsx
│   ├── AnimatedCounter.tsx
│   ├── Badge.tsx
│   ├── GlassCard.tsx
│   ├── GlowButton.tsx
│   ├── Reveal.tsx           # Scroll-triggered animation wrapper
│   ├── ScrollProgress.tsx
│   ├── SectionHeading.tsx
│   ├── SpotlightCursor.tsx
│   └── Tilt.tsx             # 3D hover tilt effect
├── lib/
│   ├── data.ts              # All content (bio, projects, skills…)
│   └── utils.ts             # cn() helper
├── public/
│   ├── .nojekyll            # GitHub Pages workaround
│   ├── favicon.svg
│   ├── og-image.svg
│   └── robots.txt
├── next.config.mjs          # Static export config
├── tailwind.config.ts       # Design tokens (colors, animations…)
└── package.json
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build static export

```bash
npm run build
```

The static site is emitted to `out/`. Serve it locally:

```bash
npm run serve
```

## GitHub Pages Deployment

### Automatic (GitHub Actions)

1. Push to the `main` branch.
2. The workflow in `.github/workflows/deploy.yml` builds and deploys automatically.
3. Enable GitHub Pages in repository settings (source: **GitHub Actions**).

The workflow auto-detects the repository name and sets `BASE_PATH` so assets resolve correctly under `https://<user>.github.io/<repo>/`.

### Manual

```bash
BASE_PATH=/your-repo npm run build
cd out
# Commit and push the `out/` directory to a `gh-pages` branch, or upload directly.
```

For a user/organization site (`<user>.github.io`), leave `BASE_PATH` empty:

```bash
npm run build
```

## Customization

### Content

Edit [`lib/data.ts`](lib/data.ts) — personal info, projects, skills, services, testimonials, social links.

### Design

- **Colors / animations**: [`tailwind.config.ts`](tailwind.config.ts)
- **Global styles**: [`app/globals.css`](app/globals.css)
- **Fonts**: [`app/layout.tsx`](app/layout.tsx) (currently Inter, Sora, JetBrains Mono)

### Add a real screenshot

Replace the emoji placeholders in the Workflow Gallery:

1. Add an image to `public/projects/` (e.g., `public/projects/real-estate-lead-ai.png`)
2. Update the project card in [`components/sections/Projects.tsx`](components/sections/Projects.tsx) to use `<Image>` (already set to `unoptimized: true` for static export)

## SEO

- **Metadata**: [`app/layout.tsx`](app/layout.tsx)
- **Sitemap**: [`app/sitemap.ts`](app/sitemap.ts)
- **Robots**: [`public/robots.txt`](public/robots.txt)
- **Open Graph image**: [`public/og-image.svg`](public/og-image.svg) (swap for a PNG if needed)

Update `NEXT_PUBLIC_SITE_URL` at build time:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run build
```

## Performance

- **Fonts**: `display: swap` to avoid FOIT
- **Animations**: CSS transforms (GPU) + `will-change` where needed
- **Images**: `unoptimized: true` (static export); swap for optimized PNGs if hosting elsewhere
- **Reduced motion**: respects `prefers-reduced-motion: reduce`

## License

MIT — free to use, modify, and distribute. Attribution appreciated but not required.

---

**Built with** Next.js · React · Tailwind CSS · Framer Motion · TypeScript
