'use client';

/**
 * Global animated backdrop rendered once behind the entire page.
 *
 * Layers (bottom to top):
 *   1. Base near-black gradient
 *   2. Faint, static grid pattern with a radial fade
 *   3. Local spotlights are composed within Hero and Workflow Gallery
 *   4. Vignette to keep content legible
 *
 * Static CSS backgrounds keep long gallery scrolls inexpensive.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base-950"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:64px_64px] opacity-[0.06] mask-radial" />

      {/* Top + bottom vignette for depth and legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-950/60 via-transparent to-base-950" />
    </div>
  );
}
