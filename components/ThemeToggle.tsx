'use client';

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

/**
 * Light / dark theme toggle. Shows a sun in dark mode (tap for light) and a
 * moon in light mode (tap for dark), with a soft crossfade + rotate.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-surface/40 text-fg-muted backdrop-blur transition-colors hover:text-fg hover:border-accent-primary/50',
        className
      )}
    >
      <motion.span
        key={isDark ? 'sun' : 'moon'}
        initial={{ y: 12, opacity: 0, rotate: -30 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        className="flex items-center justify-center"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </motion.span>
    </button>
  );
}
