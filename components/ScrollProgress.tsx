'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin gradient progress bar fixed to the top of the viewport that fills as
 * the user scrolls the page — a subtle premium touch.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand-gradient"
    />
  );
}
