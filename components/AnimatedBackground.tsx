'use client';

/**
 * Global animated backdrop rendered once behind the entire page.
 *
 * Layers (bottom to top):
 *   1. Base near-black gradient
 *   2. Faint grid pattern, radially masked so it fades at the edges
 *   3. Three drifting "aurora" gradient orbs (blurred, blend-screen)
 *   4. Vignette to keep content legible
 *
 * Everything is pure CSS animation (GPU-friendly transforms/opacity) so it
 * stays smooth and adds zero JS work on the main thread.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base-950"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:44px_44px] opacity-[0.35] mask-radial" />

      {/* Aurora orbs */}
      <div className="absolute -left-40 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-accent-violet/20 blur-[120px] animate-aurora" />
      <div
        className="absolute -right-40 top-[10%] h-[38rem] w-[38rem] rounded-full bg-accent-cyan/20 blur-[120px] animate-aurora"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-[-15%] left-1/3 h-[40rem] w-[40rem] rounded-full bg-accent-fuchsia/15 blur-[130px] animate-aurora"
        style={{ animationDelay: '-12s' }}
      />

      {/* Top + bottom vignette for depth and legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-950/60 via-transparent to-base-950" />
    </div>
  );
}
