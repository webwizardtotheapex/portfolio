# Deployment Guide — Isa Hassan Portfolio

This portfolio supports Vercel and GitHub Pages through a Next.js static export.

---

## Vercel Deployment

1. In your [Vercel account](https://vercel.com/new), import [webwizardtotheapex/portfolio](https://github.com/webwizardtotheapex/portfolio) from GitHub.
2. Use the detected **Next.js** framework, root directory `./`, build command `npm run build`, and the default output setting. Leave `BASE_PATH` unset/empty.
3. Deploy, wait for the status to become **Ready**, and check the generated Vercel URL.
4. In the project's **Settings → Domains**, add `soldevhassan.com` and `www.soldevhassan.com`. Use the exact DNS records recommended on that project's Domains screen; Vercel's assigned values can vary.
5. Only after the deployment is **Ready** and those domain instructions are available, replace the GitHub Pages apex A records and `www` CNAME in Spaceship with the recommended Vercel records. Keep the Spaceship nameservers, DNSSEC, and other DNS records intact. Confirm both domains show **Valid Configuration** in Vercel, then test their HTTPS URLs.

---

## GitHub Pages Alternative (Automatic GitHub Actions)

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

### Custom domain: soldevhassan.com

In [repository Pages settings](https://github.com/webwizardtotheapex/portfolio/settings/pages), select **GitHub Actions**, set the custom domain to `soldevhassan.com`, and enable **Enforce HTTPS** once the certificate is available. Keep `public/CNAME` set to the same domain.

At the domain's DNS provider, use the recommended GitHub Pages records:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | webwizardtotheapex.github.io |

The custom domain serves the site at `/`, so leave `BASE_PATH` empty. The workflow already does this when `public/CNAME` exists. The four apex records follow [GitHub's DNS guidance](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site); they do not establish or resolve the cause of a particular network timeout.

---

## Manual Deployment (Alternative)

If you prefer manual control or want to deploy elsewhere:

### Build with the correct base path

```bash
# For a project site without a custom domain (e.g., github.io/portfolio)
BASE_PATH=/YOUR_REPO npm run build

# For soldevhassan.com or a user/org site, leave BASE_PATH unset/empty
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

For `soldevhassan.com`, leave `BASE_PATH` unset/empty and rebuild:

```bash
npm run build
```

Only set a repository subpath when hosting a project site without a custom domain:

```bash
BASE_PATH=/YOUR_REPO npm run build
```

The workflow chooses the root path when `public/CNAME` exists, otherwise it detects the repository subpath.

### Domain connection times out

Try the site through another internet connection and compare with an external check. If an external request retrieves the portfolio while your connection times out, the site is reachable through that external network. Check your local DNS cache, VPN/firewall, and ISP routing. An app rebuild cannot fix that connection timeout; adding the recommended DNS records alone does not demonstrate that the network problem is resolved.

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
