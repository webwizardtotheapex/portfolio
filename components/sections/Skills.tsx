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
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'relative rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                filter === f
                  ? 'border-transparent text-white'
                  : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white'
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="skill-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-brand-gradient shadow-glow"
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
        className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard
                gradientBorder
                className="group flex h-full flex-col items-center gap-3 p-5 text-center transition-transform duration-300 hover:-translate-y-1.5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl text-white/80 transition-all duration-300 group-hover:text-white group-hover:shadow-glow">
                  <skill.icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-medium text-white/80 group-hover:text-white">
                  {skill.name}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Infinite marquee ticker of the whole stack */}
      <div className="relative mt-14 overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base-950 to-transparent" />

        <div className="flex w-max animate-marquee gap-3">
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={`${skill.name}-${i}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60 backdrop-blur"
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
