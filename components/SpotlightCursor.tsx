'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A soft gradient "spotlight" that follows the cursor, adding a premium
 * interactive glow to the whole page. Disabled on touch devices and for
 * users who prefer reduced motion.
 */
export function SpotlightCursor() {
  const [enabled, setEnabled] = useState(false);

  // Raw pointer position, smoothed with a spring for a fluid trailing feel.
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });

  useEffect(() => {
    // Only enable on fine pointers (mouse) without reduced-motion preference.
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="cursor-spotlight absolute left-0 top-0 rounded-full opacity-20"
        style={{ x: springX, y: springY }}
      />
    </div>
  );
}
