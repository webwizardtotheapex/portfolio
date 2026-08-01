# Deployment Guide — Isa Hassan Portfolio

This portfolio is production-ready and configured for GitHub Pages deployment. Follow the steps below to get it live.

---

## Quick Start (Automatic GitHub Actions)

### 1. Push to GitHub

```bash
cd C:/Users/toysl/OneDrive/Desktop/Automation/portfolio
git init
git add .
git commit -m "Initial commit: Premium AI Automation portfolio

- Next.js 14 static export
- Glassmorphism dark theme
- Framer Motion animations
- Fully responsive
- SEO optimized
- GitHub Pages ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow in `.github/workflows/deploy.yml` will automatically:
   - Detect your repository name
   - Build the static export with the correct `BASE_PATH`
   - Deploy to GitHub Pages

### 3. Access Your Site

Your portfolio will be live at:
- **Project repo**: `https://YOUR_USERNAME.github.io/YOUR_REPO/`
- **User/org site** (`YOUR_USERNAME.github.io` repo): `https://YOUR_USERNAME.github.io/`

---

## Manual Deployment (Alternative)

If you prefer manual control or want to deploy elsewhere:

### Build with the correct base path

```bash
# For a project site (e.g., github.io/portfolio)
BASE_PATH=/YOUR_REPO npm run build

# For a user/org site (e.g., github.io)
npm run build
```

The static export is in `out/`. Upload it to your host or commit `out/` to a `gh-pages` branch.

---

## Local Preview

### Development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Production build preview

```bash
npm run build
npm run serve
```

Visit [http://localhost:3000](http://localhost:3000) (served from `out/`).

---

## Customization Checklist

Before deploying, personalize the following:

### Content

- [ ] **Personal info**: Edit [`lib/data.ts`](lib/data.ts) (name, bio, contact, etc.)
- [ ] **Projects**: Update project descriptions, tech stacks, and GitHub/demo links
- [ ] **Skills**: Add/remove technologies as needed
- [ ] **Services**: Adjust service offerings
- [ ] **Testimonials**: Replace placeholder testimonials with real client feedback
- [ ] **Social links**: Verify all URLs point to your accounts

### SEO

- [ ] **Site URL**: Update `NEXT_PUBLIC_SITE_URL` in [`app/layout.tsx`](app/layout.tsx) or set as env var at build
- [ ] **Meta description**: Edit in [`app/layout.tsx`](app/layout.tsx)
- [ ] **Keywords**: Adjust for your target audience
- [ ] **Open Graph image**: Replace [`public/og-image.svg`](public/og-image.svg) with a custom PNG/JPG (1200×630px recommended)
- [ ] **Sitemap**: Update in [`app/sitemap.ts`](app/sitemap.ts) if you add routes

### Design

- [ ] **Colors**: Tweak accent gradients in [`tailwind.config.ts`](tailwind.config.ts)
- [ ] **Fonts**: Change fonts in [`app/layout.tsx`](app/layout.tsx) (currently Inter, Sora, JetBrains Mono)
- [ ] **Logo**: Replace the Zap icon in Navbar and Footer with your brand mark

### Screenshots

The Workflow Gallery currently shows emoji placeholders. To add real screenshots:

1. Add images to `public/projects/` (e.g., `public/projects/real-estate-lead-ai.png`)
2. Update [`components/sections/Projects.tsx`](components/sections/Projects.tsx) to use Next.js `<Image>` (already configured with `unoptimized: true`)

Example:

```tsx
import Image from 'next/image';

// Inside ProjectCard, replace the emoji placeholder div:
<div className="relative aspect-[16/10] overflow-hidden">
  <Image
    src={`/projects/${project.id}.png`}
    alt={project.title}
    fill
    className="object-cover"
  />
</div>
```

---

## Post-Deployment

### Monitor & optimize

- [ ] Test on mobile devices (responsive breakpoints)
- [ ] Verify all internal links work
- [ ] Check loading speed with [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Submit sitemap to Google Search Console: `https://YOUR_SITE/sitemap.xml`
- [ ] Test social share previews (Open Graph) with [OpenGraph.xyz](https://www.opengraph.xyz/)

### Analytics (optional)

Add Google Analytics or Plausible:

1. Install the package (`next-google-gtag` or `next-plausible`)
2. Add the script to [`app/layout.tsx`](app/layout.tsx)
3. Rebuild and redeploy

---

## Troubleshooting

### Assets not loading on GitHub Pages

**Symptom**: Images, CSS, or JS fail to load after deployment.

**Fix**: Rebuild with `BASE_PATH` set:

```bash
BASE_PATH=/YOUR_REPO npm run build
```

The GitHub Actions workflow does this automatically by detecting the repo name.

### Build fails with "Module not found"

**Symptom**: Build error referencing a missing component or icon.

**Fix**: All imports have been verified. If you add new components, use absolute imports:

```tsx
import { MyComponent } from '@/components/MyComponent';
```

Never use relative imports from `components/sections/` to sibling files (`./`), use `../` instead.

### Animations don't trigger

**Symptom**: Scroll-triggered animations don't play.

**Check**: 
- Framer Motion's `whileInView` requires the element to enter the viewport
- Reduce `margin` in `viewport` prop if elements are too far down
- Users with `prefers-reduced-motion: reduce` see instant content (intentional)

---

## Tech Stack Summary

| Layer              | Technology                     |
|--------------------|--------------------------------|
| Framework          | Next.js 14 (static export)     |
| UI Library         | React 18                       |
| Language           | TypeScript                     |
| Styling            | Tailwind CSS 3                 |
| Animations         | Framer Motion 11               |
| Icons              | Lucide React + React Icons     |
| Deployment         | GitHub Pages (GitHub Actions)  |

---

## File Structure Reference

```
portfolio/
├── .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages
├── app/
│   ├── layout.tsx                 # Root layout, SEO metadata, fonts
│   ├── page.tsx                   # Main page assembly
│   ├── globals.css                # Design system CSS
│   └── sitemap.ts                 # Static sitemap
├── components/
│   ├── sections/                  # Page sections (Hero, About…)
│   ├── AnimatedBackground.tsx
│   ├── AnimatedCounter.tsx
│   ├── Badge.tsx
│   ├── GlassCard.tsx
│   ├── GlowButton.tsx
│   ├── Reveal.tsx
│   ├── ScrollProgress.tsx
│   ├── SectionHeading.tsx
│   ├── SpotlightCursor.tsx
│   └── Tilt.tsx
├── lib/
│   ├── data.ts                    # All content (edit this!)
│   └── utils.ts                   # cn() helper
├── public/
│   ├── .nojekyll                  # GitHub Pages workaround
│   ├── favicon.svg
│   ├── og-image.svg
│   └── robots.txt
├── next.config.mjs                # Static export + BASE_PATH
├── tailwind.config.ts             # Design tokens
├── package.json
└── README.md
```

---

## Support

If you run into issues:

1. Check the [Next.js static export docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
2. Verify your repository has GitHub Actions enabled
3. Review build logs in the **Actions** tab on GitHub

---

**You're all set!** Push to GitHub and your premium portfolio will be live within minutes.
