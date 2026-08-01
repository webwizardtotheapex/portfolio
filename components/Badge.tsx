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
        'inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75 backdrop-blur transition-colors hover:border-white/20 hover:text-white',
        className
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />}
      {children}
    </span>
  );
}
