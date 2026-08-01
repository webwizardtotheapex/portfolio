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
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ------------------------------ Copy ------------------------------ */}
        <div className="text-center lg:text-left">
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
            </span>
            Available for new automation projects
          </motion.div>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/50 lg:justify-start"
          >
            <Sparkles className="h-4 w-4 text-accent-violet" />
            {personal.role}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.2rem]"
          >
            Building{' '}
            <span className="text-gradient">AI Automations</span> that save
            businesses{' '}
            <span className="relative whitespace-nowrap">
              <span className="text-gradient">hundreds of hours</span>
            </span>{' '}
            every month.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg lg:mx-0"
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
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:items-start lg:justify-start"
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

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:max-w-lg"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <dt className="font-display text-2xl font-bold text-white sm:text-3xl">
                  <AnimatedCounter value={Number(s.value)} suffix={s.suffix} />
                </dt>
                <dd className="mt-1 text-xs leading-tight text-white/50">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ----------------------------- Visual ----------------------------- */}
        <HeroVisual />
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-brand-gradient"
          />
        </span>
      </motion.a>
    </section>
  );
}

/**
 * The animated "automation engine" visual: a central AI core with a live
 * workflow card and a ring of orbiting integration logos that float.
 */
function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      className="relative mx-auto hidden aspect-square w-full max-w-md items-center justify-center md:flex"
    >
      {/* Glow core */}
      <div className="absolute h-56 w-56 rounded-full bg-brand-gradient opacity-30 blur-3xl animate-pulse-glow" />

      {/* Rotating orbit ring with integration logos */}
      <motion.div
        className="absolute inset-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div className="relative h-full w-full rounded-full border border-white/10">
          {orbitIcons.map((Icon, i) => {
            const angle = (i / orbitIcons.length) * Math.PI * 2;
            const radius = 50; // percentage
            const left = 50 + radius * Math.cos(angle);
            const top = 50 + radius * Math.sin(angle);
            return (
              <motion.div
                key={i}
                className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-base-800/80 text-white shadow-glass backdrop-blur"
                style={{ left: `${left}%`, top: `${top}%` }}
                // Counter-rotate so the logos stay upright.
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              >
                <Icon className="h-6 w-6" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Inner dashed ring */}
      <div className="absolute inset-16 rounded-full border border-dashed border-white/10" />

      {/* Center core card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="glass-strong relative z-10 flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-3xl shadow-glow"
      >
        <WorkflowIcon className="h-9 w-9 text-white" />
        <span className="text-xs font-semibold text-white">AI Engine</span>
        <span className="text-[10px] text-accent-emerald">● running</span>
      </motion.div>

      {/* Floating status card — top */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="glass absolute -top-2 left-0 z-20 rounded-2xl px-4 py-3 shadow-glass"
      >
        <p className="text-[10px] uppercase tracking-wider text-white/40">
          Leads qualified
        </p>
        <p className="font-display text-lg font-bold text-white">+1,284</p>
      </motion.div>

      {/* Floating status card — bottom */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="glass absolute -bottom-2 right-0 z-20 rounded-2xl px-4 py-3 shadow-glass"
      >
        <p className="text-[10px] uppercase tracking-wider text-white/40">
          Time saved
        </p>
        <p className="font-display text-lg font-bold text-accent-emerald">
          512 hrs
        </p>
      </motion.div>
    </motion.div>
  );
}
