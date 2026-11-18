import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** Small dot on the left, e.g. for a technology badge. */
  dot?: boolean;
}

/**
 * Compact technology / feature badge — a glass chip used for tech stacks,
 * skills and feature tags throughout the site.
 */
export function Badge({ children, dot, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 font-mono text-[10px] font-medium leading-relaxed text-fg-muted transition-colors hover:border-accent-primary/30 hover:text-fg',
        className
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />}
      {children}
    </span>
  );
}
