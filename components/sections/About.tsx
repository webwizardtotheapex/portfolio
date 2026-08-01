'use client';

import { Cpu, Rocket, Target } from 'lucide-react';
import { personal, experiences } from '@/lib/data';
import { SectionHeading } from '../SectionHeading';
import { GlassCard } from '../GlassCard';
import { Reveal, Stagger, StaggerItem } from '../Reveal';
import { Badge } from '../Badge';

/** Highlight cards summarizing what Isa does. */
const highlights = [
  {
    icon: Cpu,
    title: 'Intelligent Systems',
    text: 'AI agents and workflows that reason, decide and take action across your tools.',
  },
  {
    icon: Rocket,
    title: 'Revenue Focused',
    text: 'Automations built to qualify leads, recover follow-ups and grow revenue.',
  },
  {
    icon: Target,
    title: 'Zero Busywork',
    text: 'Eliminate repetitive manual tasks so your team focuses on high-value work.',
  },
];

export function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        eyebrow="About Me"
        title={
          <>
            Turning manual chaos into{' '}
            <span className="text-gradient">intelligent systems</span>
          </>
        }
        description="I help businesses replace repetitive work with reliable, AI-powered automation — so operations run themselves and teams do their best work."
      />

      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {/* Bio + goal */}
        <Reveal direction="right">
          <GlassCard strong className="h-full p-8 md:p-10">
            <div className="space-y-5">
              {personal.bioParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-white/70 md:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Goal callout */}
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-accent-violet/20 bg-accent-violet/5 p-5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
                <Target className="h-5 w-5 text-white" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
                  My Goal
                </p>
                <p className="mt-1 text-base font-medium text-white">
                  {personal.goal}
                </p>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Highlights + experience */}
        <div className="flex flex-col gap-6">
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            {highlights.map((h) => (
              <StaggerItem key={h.title}>
                <GlassCard
                  gradientBorder
                  className="group flex items-start gap-4 p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent-cyan transition-colors group-hover:text-white">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-white">
                      {h.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">
                      {h.text}
                    </p>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Experience card */}
          {experiences.map((exp) => (
            <Reveal key={exp.role} delay={0.1}>
              <GlassCard strong className="p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
                    <exp.icon className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-xs text-accent-emerald">
                      Currently building
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  {exp.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.stack.map((t) => (
                    <Badge key={t} dot>
                      {t}
                    </Badge>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
