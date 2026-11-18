'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Use the stronger glass variant with more opacity + backdrop blur.
   * Useful for hero cards or primary focal points.
   */
  strong?: boolean;
  /**
   * Add the animated gradient border on hover.
   */
  gradientBorder?: boolean;
}

/**
 * Glassmorphism card component — frosted translucent surface with a
 * subtle border and optional gradient hover effect.
 *
 * Usage:
 *   <GlassCard>Content</GlassCard>
 *   <GlassCard strong gradientBorder>Hero card</GlassCard>
 */
export function GlassCard({
  className,
  strong,
  gradientBorder,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'min-w-0 rounded-[1.25rem]',
        strong ? 'glass-strong' : 'glass',
        gradientBorder && 'gradient-border',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
