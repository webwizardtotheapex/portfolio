'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { navItems, contact } from '@/lib/data';
import { GlowLink } from '../GlowButton';
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
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <nav
        className={cn(
          'flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6',
          scrolled
            ? 'border-white/10 bg-base-900/70 shadow-glass backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        )}
      >
        {/* Brand / logo */}
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
            <Zap className="h-5 w-5 text-white" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold tracking-tight text-white">
              Isa Hassan
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
              AI Automation
            </span>
          </span>
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
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <GlowLink href={contact.bookingUrl} target="_blank" rel="noopener noreferrer" size="sm">
            Book a Call
          </GlowLink>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="glass flex h-10 w-10 items-center justify-center rounded-xl text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-4 top-[4.75rem] z-40 lg:hidden"
          >
            <div className="glass-strong rounded-2xl p-3 shadow-glass">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white"
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
