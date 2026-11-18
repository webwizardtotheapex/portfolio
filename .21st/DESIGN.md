# Toyslab portfolio design context

The portfolio uses the user-selected obsidian/cyan/emerald direction. The existing light-theme switcher, content, schemas, contact links, and interactions remain intact. All sections reuse the project's shared components.

## Sources

- Colors, theme variables, gradient borders, and global motion: `app/globals.css`.
- Semantic token aliases, typography, and glow shadows: `tailwind.config.ts`.
- Inter, Sora, and JetBrains Mono font variables: `app/layout.tsx`.
- Project data and architecture schema: `content/projects.json` and `lib/projects.ts`.
- Reused primitives: `GlassCard`, `Badge`, and `Reveal`.

## Selected dark palette

| Token | RGB | Role |
| --- | --- | --- |
| `--bg` | 5 8 17 | Obsidian page and screenshot background |
| `--surface` | 11 17 32 | Elevated cards and controls |
| `--surface-hover` | 16 24 41 | Hover surfaces |
| `--border` | 51 65 85 | Neutral borders |
| `--fg` | 241 245 249 | Primary text |
| `--fg-muted` | 170 183 204 | Body text |
| `--fg-subtle` | 148 163 184 | Secondary labels |
| `--accent-primary` | 34 211 238 | Electric cyan |
| `--accent-sky` | 103 232 249 | Highlight and focus |
| `--accent-success` | 16 185 129 | Emerald outcomes and output nodes |

Legacy accent names map to these semantic tokens. Fixed `--brand-cyan` and `--brand-emerald` values keep filled buttons readable with dark lettering in both themes. The inline neural T-node logo, SVG favicon, and 180px PNG app icon share the selected gradient.

## Typography and spacing

- Inter body text, Sora headings, JetBrains Mono stage indices.
- Existing section gutters: 20px, increasing to 32px at `sm`.
- Gallery gap: 24px on small screens, 32px at `lg`; one column below `lg`, two at `lg`.
- Card body padding: 20px, increasing to 24px at `sm` and 28px at `lg`.
- Shared 20px card radius, 24px command-center/CTA radius, and 12px control/node radius.
- Interactive controls have a minimum 44px target and a token-based focus ring.
- Surfaces use a white/8 border, subtle top reflection, and cyan/40 hover border. GlassCard surfaces avoid backdrop filters; navigation and the lightbox retain localized blur.
- Section headings use an editorial title/description grid; metrics use tabular numerals.
- Hero and gallery spotlights are static radial gradients at 8–10% opacity.

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


## Portfolio redesign verification

The November 18 visual-only redesign is documented in [the UI redesign audit](../docs/UI_REDESIGN_AUDIT.md). The final static export passed 63 browser checks, preservation checks, TypeScript, lint, and component review. Original content, action handlers, routes, and data remain intact. Clean visual captures and raw reports live under `artifacts/ui-audit/redesign/`.
