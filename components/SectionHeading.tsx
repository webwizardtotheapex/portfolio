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
          ? 'section-heading section-heading-centered'
          : 'section-heading'
      }
    >
      <Reveal>
        <span className="eyebrow">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="max-w-2xl text-balance font-display text-[1.9rem] font-semibold leading-[1.2] tracking-[-0.045em] text-fg sm:text-4xl lg:text-[2.65rem]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="max-w-xl text-sm leading-[1.85] text-fg-muted lg:text-[15px]">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
