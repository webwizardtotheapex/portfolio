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
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 px-6 py-16 text-center sm:px-12 md:py-24">
          {/* Animated gradient backdrop */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent-violet/25 via-base-800/40 to-accent-cyan/25" />
          <div className="absolute inset-0 -z-10 bg-grid-pattern bg-[size:36px_36px] opacity-30 mask-radial" />

          {/* Floating glow orbs */}
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-accent-violet/30 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-accent-cyan/30 blur-3xl"
          />

          <span className="eyebrow">
            <CalendarClock className="h-3.5 w-3.5" />
            Let&apos;s build together
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Ready to <span className="text-gradient">automate</span> your
            business?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Let&apos;s build intelligent workflows that save time and increase
            revenue.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
