'use client';

import { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Center-align the heading block. */
  centered?: boolean;
}

/**
 * Consistent section header: eyebrow chip, gradient-accented title and an
 * optional supporting description. Animates into view on scroll.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div
      className={
        centered
          ? 'mx-auto max-w-3xl text-center'
          : 'max-w-3xl text-left'
      }
    >
      <Reveal>
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
