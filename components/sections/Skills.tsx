'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { skills, skillCategories } from '@/lib/data';
import { SectionHeading } from '../SectionHeading';
import { GlassCard } from '../GlassCard';
import { Reveal } from '../Reveal';
import { cn } from '@/lib/utils';

type Filter = 'All' | (typeof skillCategories)[number];

const filters: Filter[] = ['All', ...skillCategories];

/**
 * Skills section — a filterable grid of technology cards plus an infinite
 * marquee ticker of the full stack. Cards animate in/out as the filter
 * changes and float on hover.
 */
export function Skills() {
  const [filter, setFilter] = useState<Filter>('All');

  const visible =
    filter === 'All' ? skills : skills.filter((s) => s.category === filter);

  return (
    <section id="skills" className="section">
      <SectionHeading
        centered={false}
        eyebrow="Tech Stack"
        title={
          <>
            The tools I{' '}
            <span className="text-gradient">automate with</span>
          </>
        }
        description="A deep, hands-on toolkit spanning automation platforms, AI, integrations and development — everything needed to build reliable end-to-end systems."
      />

      {/* Category filter */}
      <Reveal>
        <div role="group" aria-label="Filter technologies by category" className="mt-10 flex flex-wrap gap-1.5 rounded-xl border border-white/[0.08] bg-surface/50 p-1.5 sm:mt-12 sm:w-fit">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                'relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors sm:px-4',
                filter === f
                  ? 'border-accent-primary/25 text-accent-primary'
                  : 'border-transparent text-fg-subtle hover:bg-white/[0.03] hover:text-fg'
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="skill-filter-pill"
                  className="motion-reveal absolute inset-0 -z-10 rounded-lg bg-accent-primary/[0.08]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Skill grid */}
      <motion.div
        layout
        className="mt-6 grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((skill) => (
            <motion.div
              key={skill.name}
              className="motion-reveal"
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard
                gradientBorder
                className="group flex h-full min-h-32 flex-col items-center justify-center gap-3 p-4 text-center sm:p-5"
              >
                <span className="icon-container h-11 w-11 text-fg-muted">
                  <skill.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 text-xs font-medium leading-relaxed text-fg-muted group-hover:text-fg sm:text-sm">
                  {skill.name}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Infinite marquee ticker of the whole stack */}
      <div aria-hidden="true" className="stack-marquee relative mt-10 overflow-hidden border-y border-white/[0.06] py-6">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-base-950 to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-base-950 to-transparent sm:w-16" />

        <div className="marquee-track flex w-max animate-marquee gap-3">
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={`${skill.name}-${i}`}
              className="inline-flex items-center gap-2.5 rounded-lg border border-white/[0.08] bg-surface/75 px-4 py-2.5 font-mono text-[11px] text-fg-muted"
            >
              <skill.icon className="h-4 w-4" />
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
