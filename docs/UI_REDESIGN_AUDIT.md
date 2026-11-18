# Toyslab portfolio UI/UX redesign audit

Implemented the selected obsidian, cyan, and emerald direction across the portfolio. **63 browser checks passed with zero failures**, using the final production static export in Chrome 157.0.8103.79. The new neural T-node identity, editorial section headers, framed AI command center, workflow bento cards, services grid, technology filters, testimonials, contact area, and footer reuse the existing project components.

## Preservation

- 13 protected files are byte-for-byte unchanged: all files in `content/`, `lib/`, and `scripts/cms/`, plus the sitemap, Next.js configuration, package manifest, and lockfile.
- Original copy, hooks, handlers, links, and content declarations remain intact across 26 checked components, including the page composition. The authorized replacement logo is audited separately.
- All 8 workflow records, 66 feature strings, 12 services, and 6 testimonials render from their original data. Workflow image files and external URLs remain unchanged.
- RC 9053103, webwizardtotheapex@gmail.com, 08139299686, social URLs, and the original booking link are retained. Contact keeps its existing email/deep-link actions.
- Screenshot/Diagram switching, keyboard tabs, carousel state, measured feature expansion, diagram inspection/pause, modal focus containment, Escape dismissal, and focus restoration remain intact.

## Responsive and accessibility evidence

| Viewport | Workflow card width | Gallery columns | Horizontal overflow | Minimum control target |
| --- | --- | --- | --- | --- |
| 375px | 335px | 1 | 0px | 44px |
| 768px | 704px | 1 | 0px | 44px |
| 1440px | 592px | 2 | 0px | 44px |

The same widths pass in the existing light theme. Desktop gallery rows align with less than 2px height difference. Long contact addresses wrap fully. Mobile navigation exposes all six original section links and the booking CTA; keyboard navigation and closing on selection pass.

Axe reported **zero violations across 19 audited states**, including the whole site in both themes, open mobile navigation, expanded features, architecture diagrams, and the native lightbox. Gradient contrast that Axe could not resolve was supplemented with computed CSS colors, including the actual fixed brand-gradient stops.

| Contrast sample | Dark theme | Light theme |
| --- | --- | --- |
| Minimum sampled small text | 6.93:1 | 4.61:1 |
| Keyboard focus ring | 12.99:1 | 6.32:1 |

Reduced-motion preferences stop decorative transforms and the marquee, disable diagram pulses, and preserve visible content. Lazy screenshot loading, asynchronous decoding, failed-image fallback, full-resolution inspection, and zero browser errors/warnings are verified. Inter, Sora, and JetBrains Mono load with matching generated font variables.

## Resolved findings

| Finding | Source | Resolution |
| --- | --- | --- |
| Mobile diagram label exceeded its node by 2px | [WorkflowDiagram.tsx](../components/WorkflowDiagram.tsx), line 147 | Constrain the full label to node width and wrap every word. |
| AI filter was slightly narrower than 44px | [Skills.tsx](../components/sections/Skills.tsx), filter controls | Set 44px minimum width and height. |
| Light-theme eyebrow contrast fell below 4.5:1 | [globals.css](../app/globals.css), light accent tokens | Use an accessible cyan shade while keeping the selected dark palette and fixed brand gradient. |
| Cursor spotlight had a large unconstrained fixed box | [SpotlightCursor.tsx](../components/SpotlightCursor.tsx) | Contain it in its own clipped viewport without changing its motion/state logic. |
| Six transition-all warnings | Navbar, Services, Skills, Contact, Footer | Explicit color, border, background, shadow, and transform transitions. |
| Stale font cache produced inconsistent HTML/CSS identifiers | Generated Next.js cache; [tailwind.config.ts](../tailwind.config.ts), font tokens | Preserve the old generated cache, rebuild cleanly, add safe font-variable fallbacks, and verify loaded font faces at runtime. |

## Checks

| Check | Result |
| --- | --- |
| `npm run build` | Passed; static export, zero build warnings/errors. |
| `npx tsc --noEmit --incremental false` | Passed; zero TypeScript errors. |
| `npm run lint -- --max-warnings 0` | Passed; zero ESLint warnings/errors. |
| `21st review components` and JSON review | 26 files; zero errors, warnings, or suggestions. |
| `21st review app/globals.css --json` | Zero errors/warnings. Informational notices about palette declarations, token-based RGB expressions, and mask colors were checked against the selected design system. |
| Whole-site browser audit | 27 passed. |
| Detailed gallery regression audit | 36 passed. |
| Content/handler preservation | Passed. |

The 21st catalog search was unavailable because the CLI was not signed in. The local 21st reviews ran successfully. The implementation reuses GlassCard, Badge, Reveal, SectionHeading, GlowLink, ThemeToggle, the vertical diagram, WorkflowScreenshot, and the native ScreenshotLightbox; no production dependencies were added.

## Changed visual files

- Shared tokens/effects: `app/globals.css`, `tailwind.config.ts`, AnimatedBackground, SpotlightCursor, Reveal, Tilt, GlassCard, Badge, GlowButton, SectionHeading, ThemeToggle.
- Brand assets: `components/Logo.tsx`, `public/favicon.svg`, `public/toyslab-emblem.svg`, `public/toyslab-icon.png`; `app/layout.tsx` changes only app-icon metadata and the browser theme color.
- Section presentation: Navbar, Hero, About, Projects, Services, Skills, Testimonials, CTA, Contact, and Footer.
- Gallery presentation: WorkflowScreenshot, WorkflowDiagram, and ScreenshotLightbox.
- Durable design decisions and verification: `.21st/design.json`, `.21st/DESIGN.md`, and this audit.

## Captures and raw reports

| Width | Hero | Workflow | Diagram | Services | Tech stack | Testimonials | Contact |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 375px | [View](../artifacts/ui-audit/redesign/375px-hero.png) | [View](../artifacts/ui-audit/redesign/375px-workflow.png) | [View](../artifacts/ui-audit/redesign/375px-workflow-diagram.png) | [View](../artifacts/ui-audit/redesign/375px-services.png) | [View](../artifacts/ui-audit/redesign/375px-skills.png) | [View](../artifacts/ui-audit/redesign/375px-testimonials.png) | [View](../artifacts/ui-audit/redesign/375px-contact.png) |
| 768px | [View](../artifacts/ui-audit/redesign/768px-hero.png) | [View](../artifacts/ui-audit/redesign/768px-workflow.png) | [View](../artifacts/ui-audit/redesign/768px-workflow-diagram.png) | [View](../artifacts/ui-audit/redesign/768px-services.png) | [View](../artifacts/ui-audit/redesign/768px-skills.png) | [View](../artifacts/ui-audit/redesign/768px-testimonials.png) | [View](../artifacts/ui-audit/redesign/768px-contact.png) |
| 1440px | [View](../artifacts/ui-audit/redesign/1440px-hero.png) | [View](../artifacts/ui-audit/redesign/1440px-workflow.png) | [View](../artifacts/ui-audit/redesign/1440px-workflow-diagram.png) | [View](../artifacts/ui-audit/redesign/1440px-services.png) | [View](../artifacts/ui-audit/redesign/1440px-skills.png) | [View](../artifacts/ui-audit/redesign/1440px-testimonials.png) | [View](../artifacts/ui-audit/redesign/1440px-contact.png) |

- [Whole-site report](../artifacts/ui-audit/redesign/site-report.json), [gallery report](../artifacts/ui-audit/redesign/gallery/report.json), and [preservation report](../artifacts/ui-audit/redesign/preservation-report.json).
- [Site audit script](../artifacts/ui-audit/redesign/site-audit.mjs), [gallery audit script](../artifacts/ui-audit/redesign/gallery-regression.mjs), and [capture script](../artifacts/ui-audit/redesign/captures.mjs).
- Build ID: `ihRdo_wFacPr_JPBO5suv`. Browser audit timestamp: `2026-11-18T18:29:42.401Z`.
- Local static preview: http://127.0.0.1:4317. Captures/reports are local artifacts ignored by Git; fixed navigation/progress layers are hidden only for unobstructed section captures.
