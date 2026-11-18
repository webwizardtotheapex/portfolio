'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems, contact } from '@/lib/data';
import { GlowLink } from '../GlowButton';
import { Logo } from '../Logo';
import { ThemeToggle } from '../ThemeToggle';
import { cn } from '@/lib/utils';

/**
 * Sticky, glassmorphic navigation bar.
 * - Becomes more opaque + compact once the user scrolls.
 * - Highlights the section currently in view using an IntersectionObserver.
 * - Collapses into an animated slide-down menu on mobile.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('home');

  // Toggle the "scrolled" style past a small threshold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: mark the nav item whose section is in view as active.
  useEffect(() => {
    const ids = navItems.map((n) => n.href.replace('#', ''));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="motion-reveal fixed inset-x-0 top-0 z-50 flex justify-center px-5 pt-3 sm:px-8 sm:pt-4"
    >
      <nav
        aria-label="Main navigation"
        className={cn(
          'flex w-full min-w-0 max-w-7xl items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-300 sm:px-5',
          scrolled
            ? 'border-white/10 bg-bg/95 shadow-glass'
            : 'border-white/[0.08] bg-surface/70'
        )}
      >
        {/* Brand / logo */}
        <a href="#home" aria-label="Toyslab Tech — home" className="group flex min-h-11 min-w-0 items-center rounded-xl">
          <Logo heightClass="h-7 sm:h-8" priority />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = active === id;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'relative inline-flex min-h-11 items-center rounded-lg px-3 text-xs font-medium transition-colors xl:px-4 xl:text-sm',
                    isActive ? 'text-fg' : 'text-fg-subtle hover:text-fg'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="motion-reveal absolute inset-x-0 inset-y-1 -z-10 rounded-lg border border-white/[0.06] bg-white/[0.04]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA + theme toggle */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <GlowLink href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" size="sm">
            Book a Call
          </GlowLink>
        </div>

        {/* Mobile: theme toggle + menu button */}
        <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-surface/80 text-fg transition-colors hover:border-accent-primary/40 hover:bg-surface-hover"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="motion-reveal absolute inset-x-5 top-[5.25rem] z-40 sm:inset-x-8 lg:hidden"
          >
            <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl border border-white/10 bg-surface/95 p-3 shadow-glass backdrop-blur-xl">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-xl px-4 py-3 text-sm font-medium text-fg-muted transition-colors hover:bg-accent-primary/[0.06] hover:text-fg"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-2 border-t border-white/10 p-2">
                <GlowLink
                  href={contact.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Book a Call
                </GlowLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
