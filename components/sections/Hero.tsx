'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Workflow as WorkflowIcon } from 'lucide-react';
import { SiN8N, SiHubspot, SiGooglesheets } from 'react-icons/si';
import { RiOpenaiFill } from 'react-icons/ri';
import { FaSlack } from 'react-icons/fa6';
import { Phone } from 'lucide-react';
import { personal, contact, stats } from '@/lib/data';
import { GlowLink } from '../GlowButton';
import { AnimatedCounter } from '../AnimatedCounter';

/** Small orbiting integration logos shown in the hero visual. */
const orbitIcons = [SiN8N, RiOpenaiFill, SiHubspot, FaSlack, Phone, SiGooglesheets];

export function Hero() {
  return (
    <section
      id="home"
      className="hero-spotlight relative isolate flex min-w-0 items-center overflow-clip pb-16 pt-32 sm:pb-20 sm:pt-40 lg:min-h-screen lg:pt-44"
    >
      <div className="mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 items-center gap-x-16 gap-y-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {/* ------------------------------ Copy ------------------------------ */}
        <div className="min-w-0 text-left">
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="motion-reveal surface-reflection inline-flex max-w-full items-center gap-2.5 rounded-full border border-accent-success/20 bg-accent-success/[0.06] px-3.5 py-2.5 text-[11px] font-medium leading-relaxed text-fg-muted sm:text-xs"
          >
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-30 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
            </span>
            Available for new automation projects
          </motion.div>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="motion-reveal mt-8 flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-fg-subtle sm:text-xs"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-accent-primary" aria-hidden="true" />
            {personal.role}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="motion-reveal mt-5 max-w-3xl font-display text-[2.5rem] font-semibold leading-[1.12] tracking-[-0.055em] text-fg sm:text-[3.25rem] md:text-[3.75rem] lg:text-[3.6rem] xl:text-[4rem]"
          >
            Building{' '}
            <span className="text-gradient">AI Automations</span> that save
            businesses{' '}
            <span className="relative">
              <span className="text-gradient">hundreds of hours</span>
            </span>{' '}
            every month.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="motion-reveal mt-6 max-w-xl text-[15px] leading-[1.85] text-fg-muted sm:text-base"
          >
            I design intelligent workflow automations with n8n, OpenAI and AI
            agents — eliminating repetitive work, qualifying leads and syncing
            your entire stack so revenue grows while you sleep.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="motion-reveal mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <GlowLink
              href={contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Book a Call
            </GlowLink>
            <GlowLink href="#projects" variant="secondary" size="lg">
              View Workflows
            </GlowLink>
          </motion.div>

        </div>

        {/* ----------------------------- Visual ----------------------------- */}
        <HeroVisual />

        {/* Shared telemetry strip; all metric values and counter logic stay intact. */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="hero-metrics motion-reveal grid min-w-0 grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4 lg:col-span-2"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-left">
              <dt className="font-display text-3xl font-semibold tracking-tight text-fg tabular-nums sm:text-[2.25rem]">
                <AnimatedCounter value={Number(s.value)} suffix={s.suffix} />
              </dt>
              <dd className="mt-2 font-mono text-[10px] leading-relaxed text-fg-subtle sm:text-[11px]">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-5 left-1/2 hidden min-h-11 -translate-x-1/2 items-center gap-3 text-fg-subtle lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="scroll-cue-dot h-1.5 w-1.5 rounded-full bg-brand-gradient"
          />
        </span>
      </motion.a>
    </section>
  );
}

/**
 * Framed command-center presentation of the existing AI core, integration
 * orbit, and telemetry. This is a visual composition, not a live API feed.
 */
function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      className="hero-engine motion-reveal relative mx-auto w-full min-w-0 max-w-lg overflow-hidden rounded-[1.5rem] border border-white/10"
    >
      <div className="flex min-h-14 items-center gap-3 border-b border-white/[0.08] bg-surface/50 px-4 sm:px-5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-fg/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-fg/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-fg/10" />
        </span>
        <span className="font-mono text-xs font-medium text-fg-muted">AI Engine</span>
        <span className="ml-auto rounded-md border border-accent-success/20 bg-accent-success/[0.06] px-2 py-1 font-mono text-[10px] text-accent-emerald">● running</span>
      </div>

      <div className="relative mx-auto flex aspect-square w-full max-w-[380px] items-center justify-center">
        <div aria-hidden="true" className="hero-engine-canvas absolute inset-0" />
        <div aria-hidden="true" className="engine-ambient absolute inset-6 rounded-full" />

      {/* Rotating orbit ring with integration logos */}
      <motion.div
        className="hero-orbit absolute inset-10 sm:inset-12"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div className="relative h-full w-full rounded-full border border-white/[0.08]">
          {orbitIcons.map((Icon, i) => {
            const angle = (i / orbitIcons.length) * Math.PI * 2;
            const radius = 50; // percentage
            const left = 50 + radius * Math.cos(angle);
            const top = 50 + radius * Math.sin(angle);
            return (
              <div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
              <motion.div
                className="hero-integration flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-surface-hover text-fg-muted shadow-glass sm:h-12 sm:w-12"
                // Counter-rotate so the logos stay upright.
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Inner dashed ring */}
      <div aria-hidden="true" className="absolute inset-[5.5rem] rounded-full border border-dashed border-accent-primary/15 sm:inset-24" />

      {/* Center core card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="engine-core relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl border border-accent-primary/30 bg-surface shadow-glow sm:h-28 sm:w-28"
      >
        <WorkflowIcon className="h-10 w-10 text-accent-primary" strokeWidth={1.25} aria-hidden="true" />
      </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-px border-t border-white/[0.08] bg-white/[0.08]">
      {/* Original status values, presented as dashboard tiles. */}
      <motion.div
        className="engine-status-card min-w-0 bg-surface px-5 py-4 sm:px-6 sm:py-5"
      >
        <p className="font-mono text-[10px] text-fg-subtle">
          Leads qualified
        </p>
        <p className="mt-2 font-mono text-2xl font-medium tracking-tight text-fg tabular-nums">+1,284</p>
      </motion.div>

      <motion.div
        className="engine-status-card min-w-0 bg-surface px-5 py-4 sm:px-6 sm:py-5"
      >
        <p className="font-mono text-[10px] text-fg-subtle">
          Time saved
        </p>
        <p className="mt-2 font-mono text-2xl font-medium tracking-tight text-accent-emerald tabular-nums">
          512 hrs
        </p>
      </motion.div>
      </div>
    </motion.div>
  );
}
