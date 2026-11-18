'use client';

import { Cpu, Rocket, Target } from 'lucide-react';
import { personal, experiences } from '@/lib/data';
import { SectionHeading } from '../SectionHeading';
import { GlassCard } from '../GlassCard';
import { Reveal, Stagger, StaggerItem } from '../Reveal';
import { Badge } from '../Badge';
import { Logo } from '../Logo';

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
        centered={false}
        eyebrow="About Me"
        title={
          <>
            Turning manual chaos into{' '}
            <span className="text-gradient">intelligent systems</span>
          </>
        }
        description="I help businesses replace repetitive work with reliable, AI-powered automation — so operations run themselves and teams do their best work."
      />

      <div className="mt-10 grid min-w-0 grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-stretch">
        {/* Bio + goal */}
        <Reveal direction="right">
          <GlassCard strong className="h-full p-6 sm:p-8 lg:p-9">
            <div className="space-y-5">
              {personal.bioParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-[1.9] text-fg-muted"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Goal callout */}
            <div className="mt-8 flex items-start gap-3.5 rounded-xl border border-accent-primary/15 bg-accent-primary/[0.04] p-4 sm:p-5">
              <span className="icon-container mt-0.5 h-9 w-9">
                <Target className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-accent-primary">
                  My Goal
                </p>
                <p className="mt-2 text-sm font-medium leading-[1.8] text-fg">
                  {personal.goal}
                </p>
              </div>
            </div>

            {/* Company badge */}
            <div className="mt-6 flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-bg/35 p-4 xl:flex-row xl:items-center">
              <Logo heightClass="h-8" chip={false} />
              <div className="min-w-0">
                <p className="font-mono text-[10px] font-medium uppercase tracking-wide text-fg-subtle">
                  Founder
                </p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-fg">
                  Toyslab Tech and Innovations Ltd.
                </p>
                <p className="mt-1 font-mono text-[10px] text-fg-subtle">RC 9053103</p>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Highlights + experience */}
        <div className="flex min-w-0 flex-col gap-4">
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            {highlights.map((h) => (
              <StaggerItem key={h.title}>
                <GlassCard
                  gradientBorder
                  className="group flex h-full items-start gap-4 p-5 sm:p-6"
                >
                  <span className="icon-container h-11 w-11">
                    <h.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-semibold tracking-tight text-fg">
                      {h.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.8] text-fg-muted">
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
              <GlassCard strong className="p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="icon-container h-11 w-11">
                    <exp.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">
                      {exp.role}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] text-accent-emerald">
                      Currently building
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-[13px] leading-[1.8] text-fg-muted">
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
