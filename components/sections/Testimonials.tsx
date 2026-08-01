'use client';

import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { SectionHeading } from '../SectionHeading';
import { GlassCard } from '../GlassCard';
import { Stagger, StaggerItem } from '../Reveal';
import { cn } from '@/lib/utils';

/**
 * Testimonials — a masonry-style grid of glass cards. Content is placeholder
 * social proof; swap names/quotes for real client testimonials when ready.
 */
export function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <SectionHeading
        eyebrow="Testimonials"
        title={
          <>
            Trusted by teams who{' '}
            <span className="text-gradient">ship faster</span>
          </>
        }
        description="What clients say after replacing manual busywork with intelligent automation."
      />

      <Stagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <GlassCard
              gradientBorder
              className="group flex h-full flex-col p-7 transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Decorative quote mark */}
              <Quote className="h-8 w-8 text-white/15 transition-colors group-hover:text-accent-violet/40" />

              {/* Rating */}
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent-emerald text-accent-emerald"
                  />
                ))}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/70">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <span
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br font-display text-sm font-bold text-white shadow-glow',
                    t.accent
                  )}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/50">
                    {t.title} · {t.company}
                  </p>
                </div>
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
