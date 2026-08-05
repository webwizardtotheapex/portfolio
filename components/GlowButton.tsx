'use client';

import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  /** Render an icon before the label. */
  leftIcon?: ReactNode;
  /** Render an icon after the label. */
  rightIcon?: ReactNode;
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const variantStyles: Record<Variant, string> = {
  // Filled gradient button with animated glow halo. Text stays white in both
  // themes since it sits on the coloured brand gradient.
  primary:
    'text-snow bg-brand-gradient shadow-glow hover:shadow-glow-strong',
  // Glass outline button — adapts to the theme foreground.
  secondary:
    'text-fg/90 glass-strong hover:bg-surface-hover hover:text-fg',
  // Minimal text button.
  ghost: 'text-fg-muted hover:text-fg hover:bg-surface/60',
};

/** Shared inner content: label + optional icons + glow layer. */
function Inner({
  variant,
  leftIcon,
  rightIcon,
  children,
}: Pick<BaseProps, 'variant' | 'leftIcon' | 'rightIcon' | 'children'>) {
  return (
    <>
      {/* Animated glow that pulses behind primary buttons. */}
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full bg-brand-gradient opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-90"
        />
      )}
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
          {rightIcon}
        </span>
      )}
    </>
  );
}

const baseClasses =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-base-950 active:scale-[0.98]';

/* --------------------------- Button element --------------------------- */

interface GlowButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {}

/**
 * Premium call-to-action button with a glowing gradient halo, hover lift
 * and press feedback. Buttons "glow" per the design brief.
 */
export function GlowButton({
  variant = 'primary',
  size = 'md',
  className,
  leftIcon,
  rightIcon,
  children,
  ...props
}: GlowButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className={cn(baseClasses, sizeStyles[size], variantStyles[variant], className)}
      {...(props as any)}
    >
      <Inner variant={variant} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Inner>
    </motion.button>
  );
}

/* ----------------------------- Link variant ----------------------------- */

interface GlowLinkProps
  extends BaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> {}

/** Anchor-styled twin of GlowButton for external links / navigation. */
export function GlowLink({
  variant = 'primary',
  size = 'md',
  className,
  leftIcon,
  rightIcon,
  children,
  ...props
}: GlowLinkProps) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className={cn(baseClasses, sizeStyles[size], variantStyles[variant], className)}
      {...(props as any)}
    >
      <Inner variant={variant} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Inner>
    </motion.a>
  );
}
