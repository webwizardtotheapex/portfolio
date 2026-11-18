'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CalendarClock } from 'lucide-react';
import { contact } from '@/lib/data';
import { GlowLink } from '../GlowButton';
import { Reveal } from '../Reveal';

/**
 * Full-width call-to-action banner encouraging visitors to book a call.
 * Sits between testimonials and the contact section for a strong closer.
 */
export function CTA() {
  return (
    <section className="section !py-20">
      <Reveal>
        <div className="surface-reflection relative isolate overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface/70 px-6 py-14 text-center sm:px-12 md:py-20">
          {/* Animated gradient backdrop */}
          <div className="cta-ambient absolute inset-0 -z-10" />
          <div className="absolute inset-0 -z-10 bg-grid-pattern bg-[size:48px_48px] opacity-10 mask-radial" />

          {/* Floating glow orbs */}
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="cta-orb cta-orb-cyan pointer-events-none absolute -left-16 top-0 -z-10 h-64 w-64 rounded-full"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="cta-orb cta-orb-emerald pointer-events-none absolute -right-16 bottom-0 -z-10 h-64 w-64 rounded-full"
          />

          <span className="eyebrow">
            <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
            Let&apos;s build together
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl text-balance font-display text-3xl font-semibold leading-[1.2] tracking-[-0.045em] text-fg sm:text-4xl md:text-5xl">
            Ready to <span className="text-gradient">automate</span> your
            business?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-[1.85] text-fg-muted sm:text-base">
            Let&apos;s build intelligent workflows that save time and increase
            revenue.
          </p>

          <div className="mx-auto mt-8 flex max-w-md flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <GlowLink
              href={contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              Book a Call
            </GlowLink>
            <GlowLink href={`mailto:${contact.email}`} variant="secondary" size="lg">
              Send an Email
            </GlowLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
