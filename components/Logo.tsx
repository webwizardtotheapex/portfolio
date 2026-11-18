'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  /**
   * Height utility class for the logo image (width scales automatically to
   * preserve the standalone geometric emblem's aspect ratio).
   */
  heightClass?: string;
  /**
   * Give the geometric emblem a subtle, theme-aware inset surface.
   */
  chip?: boolean;
  className?: string;
  priority?: boolean;
}

/**
 * Toyslab's neural T-node emblem and responsive wordmark. The shared mark
 * keeps the navbar, founder card, footer, and application icons consistent.
 */
export function Logo({
  heightClass = 'h-9',
  chip = true,
  className,
}: LogoProps) {
  const gradientId = useId();
  const img = (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      width={64}
      height={64}
      className={cn('aspect-square w-auto shrink-0 object-contain', heightClass)}
      fill="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="10" y1="12" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop className="stop-brand-cyan" />
          <stop offset="1" className="stop-brand-emerald" />
        </linearGradient>
      </defs>
      <path d="M12 14H52M32 14V52M12 14L20 30H44L52 14M32 30L21 42M32 30L43 42" stroke={'url(#' + gradientId + ')'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g fill={'url(#' + gradientId + ')'}>
        <circle cx="12" cy="14" r="4" /><circle cx="32" cy="14" r="4" /><circle cx="52" cy="14" r="4" />
        <circle cx="32" cy="30" r="4" /><circle cx="21" cy="42" r="3" /><circle cx="43" cy="42" r="3" /><circle cx="32" cy="52" r="4" />
      </g>
    </svg>
  );

  return (
    <span
      role="img"
      aria-label="Toyslab Tech and Innovations Ltd."
      className={cn(
        'inline-flex min-w-0 items-center gap-2.5',
        className
      )}
    >
      <span className={cn('inline-flex shrink-0 items-center justify-center rounded-xl p-1', chip && 'border border-accent-primary/20 bg-accent-primary/[0.04]')}>
        {img}
      </span>
      <span aria-hidden="true" className="flex min-w-0 flex-col gap-1">
        <span className="font-display text-lg font-semibold leading-none tracking-tight text-fg sm:text-xl">Toyslab</span>
        <span className="whitespace-nowrap font-mono text-[8px] font-medium uppercase leading-none tracking-[0.08em] text-fg-muted sm:text-[9px]">Tech &amp; Innovations Ltd.</span>
      </span>
    </span>
  );
}
