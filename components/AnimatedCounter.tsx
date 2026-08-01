'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  /** Target number to count up to. */
  value: number;
  /** Duration of the count animation in ms. */
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

/**
 * Counts up from 0 to `value` the first time it scrolls into view.
 * Used for the headline impact metrics (hours saved, workflows shipped…).
 */
export function AnimatedCounter({
  value,
  duration = 1800,
  suffix = '',
  prefix = '',
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let raf = 0;
    let start: number | null = null;

    // Ease-out cubic for a natural deceleration.
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.round(easeOut(progress) * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
