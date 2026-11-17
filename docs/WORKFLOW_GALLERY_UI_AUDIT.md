# Workflow Gallery UI audit

Completed on 17 November 2026 using the 21st UI Build and UI Review skills. The new **Multi-Channel AI Agent & Unified CRM System** is the first gallery item, with six visible features and an accessible expansion for the remaining eight. Its eight technology badges, three supplied screenshots, GitHub and demo links, and requested business-impact text are retained. The workflow counter is 41+.

The audit covers the Workflow Gallery, its shared controls, architecture diagrams, and screenshot lightbox. It does not establish whole-site accessibility conformance.

## Design and content

- Reused the existing dark-mode RGB variables, gradient border, glow shadows, Inter/Sora/JetBrains Mono typography, and spacing. Token sources and decisions are recorded in [the design context](../.21st/DESIGN.md).
- Kept visuals focused on architectural nodes and existing screenshots, without adding human illustrations or avatars.
- Preserved the runtime `Project`, `ArchNode`, and `ArchStage` schemas in [lib/projects.ts](../lib/projects.ts), as well as the seven older workflow records in [content/projects.json](../content/projects.json).
- The new diagram shows Website Chat, Gmail, and WhatsApp triggers merging into payload standardization, CRM identity resolution, history and knowledge-base context, Gemini with structured parsing, and an escalation decision leading to human handoff or outbound channel routing.
- Node badges describe architectural roles rather than claiming live execution status.

## Resolved findings

| Area | Final behavior |
| --- | --- |
| Screenshot/Diagram tabs | Semantic tabs and associated panels, Arrow/Home/End keyboard navigation, visible focus, and responsive transitions. |
| Feature expansion | Six features remain visible; the other eight expand smoothly with `aria-expanded` and `aria-controls`. Collapsed content leaves the keyboard sequence. |
| Diagram | Responsive branches and measured SVG connectors stay within the card. A contained vertical scroll region exposes all stages and node details. Decorative data-flow pulses can be paused. |
| Carousel and lightbox | Labeled controls have 44px targets. The native dialog contains focus, supports arrow navigation, Escape, close and backdrop dismissal, and restores focus. A full-resolution image link supports detailed inspection. |
| Image loading | Card screenshots load lazily and decode asynchronously; the lightbox loads on demand and displays its selected image eagerly. Failed images preserve navigation. |
| Badges and business impact | Existing foreground, surface, border, and accent tokens provide contrast and consistent hover feedback. |
| Grid and motion | Desktop cards align within each row. Cards remain stationary during interaction, with the existing glow providing hover feedback. Reduced-motion preferences disable decorative animation. |

## Responsive results

Measurements came from the production static export in Chrome 157.0.8103.51. Each viewport was checked with collapsed features, all 14 features expanded, the branching diagram, and the lightbox.

| Viewport | Card width | Gallery columns | Horizontal overflow | Alignment |
| --- | --- | --- | --- | --- |
| 375px | 335px | 1 | 0px | Features and diagram fit the card. |
| 768px | 704px | 1 | 0px | Features and diagram fit the card. |
| 1440px | 592px | 2 | 0px | Same-row card height difference: 0px. |

At 1440px, both featured cards measured 1397.25px high with features collapsed and 1699.25px with the new card's features expanded. Switching to the diagram preserved the expanded row alignment.

## Verification

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | Passed; zero TypeScript errors. |
| `npm run build` | Passed; Next.js 14.2.35 completed the static export without errors. |
| Local `21st review` of the five gallery components | Zero errors, warnings, or suggestions. |
| Production browser audit | 36 checks passed; zero failed. |
| Automated accessibility checks on the gallery and open lightbox | Zero violations in the audited states. |
| Reduced motion, existing light theme, and screenshot failure | Passed. |

The five reviewed components are `Projects.tsx`, `WorkflowDiagram.tsx`, `WorkflowScreenshot.tsx`, `ScreenshotLightbox.tsx`, and `Reveal.tsx`. Keyboard tabs, feature expansion, carousel navigation, modal focus containment and restoration, image loading, and runtime errors were checked at all three widths.

The minimum sampled small-text contrast was **5.69:1**. Focus contrast measured **8.71:1** in dark mode and **3.40:1** in the existing light theme. Axe marked some color-contrast checks inconclusive because of pseudo-element backgrounds; rendered CSS foreground/background calculations supplemented those results. These measurements describe the sampled gallery states.

The 21st catalog search was unavailable because the CLI was not signed in. The local deterministic review completed successfully; the implementation uses the project's existing components and adds no production dependencies.

## Evidence

- Production build ID: `kczFbSgKKjHXdUBvY0B9Z`.
- Browser audit timestamp: `2026-11-17T22:22:14.399Z`.
- Local audit URL: `http://127.0.0.1:4317` (temporary server stopped after review).
- [Raw browser report](../artifacts/ui-audit/report.json), [audit script](../artifacts/ui-audit/audit.mjs), and [static-export server](../artifacts/ui-audit/serve.mjs).

| Width | Card | Diagram | Lightbox |
| --- | --- | --- | --- |
| 375px | [Capture](../artifacts/ui-audit/375px-card.png) | [Capture](../artifacts/ui-audit/375px-diagram.png) | [Capture](../artifacts/ui-audit/375px-lightbox.png) |
| 768px | [Capture](../artifacts/ui-audit/768px-card.png) | [Capture](../artifacts/ui-audit/768px-diagram.png) | [Capture](../artifacts/ui-audit/768px-lightbox.png) |
| 1440px | [Capture](../artifacts/ui-audit/1440px-card.png) | [Capture](../artifacts/ui-audit/1440px-diagram.png) | [Capture](../artifacts/ui-audit/1440px-lightbox.png) |

The generated audit artifacts are local files ignored by Git. Navigation was hidden only for the card captures. The audit report records the final results for review before pushing.
