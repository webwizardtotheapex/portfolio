'use client';

import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  /** Direction the content travels in from. */
  direction?: Direction;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Travel distance in px. */
  distance?: number;
  className?: string;
  /** Re-trigger every time it enters the viewport instead of once. */
  repeat?: boolean;
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * Scroll-triggered reveal wrapper. Fades + slides content into view when it
 * enters the viewport. Every section on the page uses this for a cohesive
 * "everything animates" feel.
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  distance = 28,
  className,
  repeat = false,
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offset(direction, distance) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Container that staggers the reveal of its children.
 * Pair with <StaggerItem> for each child.
 */
export function Stagger({
  children,
  className,
  delayChildren = 0.1,
  staggerChildren = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren, staggerChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  distance = 24,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
