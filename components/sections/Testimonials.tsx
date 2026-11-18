'use client';

import { BadgeCheck, Quote, Star } from 'lucide-react';
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
        centered={false}
        eyebrow="Testimonials"
        title={
          <>
            Trusted by teams who{' '}
            <span className="text-gradient">ship faster</span>
          </>
        }
        description="What clients say after replacing manual busywork with intelligent automation."
      />

      <Stagger className="mt-10 grid min-w-0 grid-cols-1 gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <GlassCard
              gradientBorder
              className="group flex h-full flex-col p-6 sm:p-7"
            >
              {/* Decorative quote mark */}
              <Quote className="h-7 w-7 text-accent-primary/35 transition-colors group-hover:text-accent-primary/60" strokeWidth={1.25} aria-hidden="true" />

              {/* Rating */}
              <div role="img" aria-label="5 out of 5 stars" className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-accent-emerald text-accent-emerald"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="mt-5 flex-1 text-[15px] leading-[1.9] tracking-[-0.01em] text-fg-muted">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-7 flex items-start gap-3 border-t border-white/[0.08] pt-5">
                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-display text-xs font-bold text-ink',
                    t.accent
                  )}
                >
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-fg">{t.name}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1.5 text-[10px] leading-relaxed text-fg-subtle">
                    <span className="inline-flex items-center gap-1 rounded-md border border-accent-success/15 bg-accent-success/[0.05] px-1.5 py-1 font-medium text-fg-muted">
                      <BadgeCheck className="h-3 w-3 text-accent-success" aria-hidden="true" />
                      {t.title}
                    </span>
                    <span>· {t.company}</span>
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
