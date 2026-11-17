# Workflow Gallery design context

The gallery preserves the existing soldevhassan.com dark palette and shared components. The site's light-theme variables remain available through its existing theme switcher.

## Sources

- Colors, theme variables, gradient borders, and global motion: `app/globals.css`.
- Semantic token aliases, typography, and glow shadows: `tailwind.config.ts`.
- Inter, Sora, and JetBrains Mono font variables: `app/layout.tsx`.
- Project data and architecture schema: `content/projects.json` and `lib/projects.ts`.
- Reused primitives: `GlassCard`, `Badge`, and `Reveal`.

## Existing dark palette

| Token | RGB | Role |
| --- | --- | --- |
| `--bg` | 5 6 10 | Page and screenshot background |
| `--surface` | 10 11 20 | Cards and controls |
| `--surface-hover` | 15 17 29 | Hover surfaces |
| `--border` | 51 65 85 | Neutral borders |
| `--fg` | 241 245 249 | Primary text |
| `--fg-muted` | 203 213 225 | Body text |
| `--fg-subtle` | 148 163 184 | Secondary labels |
| `--accent-primary` | 43 143 230 | Brand blue |
| `--accent-sky` | 94 180 245 | Highlight and glow |
| `--accent-success` | 47 158 68 | Outcomes and output nodes |

The legacy cyan, violet, emerald, and fuchsia names map to these existing blue, sky, and green variables. They do not imply a separate palette.

## Typography and spacing

- Inter body text, Sora headings, JetBrains Mono stage indices.
- Existing section gutters: 20px, increasing to 32px at `sm`.
- Gallery gap: 32px; one column below `lg`, two columns at `lg`.
- Card body padding: 24px, increasing to 28px at `md`.
- Existing 16px card radius and 12px control/node radius.
- Interactive controls have a minimum 44px target and a token-based focus ring.
- Existing gradient-border and glow/glow-strong tokens remain the hover treatment.

## Decisions

1. Show real workflow screenshots and architectural nodes, without human illustrations or avatars.
2. Preserve the `Project`/`ArchStage` schemas and all existing workflow content.
3. Keep stages vertical within the preview. Draw connectors that merge the three triggers and split the guardrail outputs.
4. Label nodes by their architectural role. Do not imply live execution status.
5. Use a native dialog for background inertness and Escape, with explicit Tab cycling and an on-demand lightbox bundle.
6. Keep six features visible and animate the remaining features with accurate expansion semantics.
7. Make decorative pulses pausable and disable motion for reduced-motion preferences.
8. Keep interactive gallery cards stationary; the existing gradient border and glow provide hover feedback.
9. Align node role badges at the top of each branch and provide a full-resolution image link for mobile inspection.

## Verification

The browser audit uses the production static export at 375px, 768px, and 1440px. Its generated screenshots and raw report are local artifacts under `artifacts/ui-audit/`. Final results are recorded in `docs/WORKFLOW_GALLERY_UI_AUDIT.md`.

