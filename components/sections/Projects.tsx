'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Github, Image as ImageIcon, TrendingUp, Workflow } from 'lucide-react';
import { projects, type Project } from '@/lib/data';
import { SectionHeading } from '../SectionHeading';
import { GlassCard } from '../GlassCard';
import { Reveal } from '../Reveal';
import { Badge } from '../Badge';
import { Tilt } from '../Tilt';
import { WorkflowDiagram } from '../WorkflowDiagram';
import { cn } from '@/lib/utils';

type PreviewMode = 'shot' | 'arch';

/**
 * Workflow Gallery — the flagship section.
 * Each card shows a large screenshot placeholder, technology badges, a
 * features list, the business impact and GitHub / Live Demo buttons.
 * Cards use a 3D tilt on hover and gently float into view.
 */
export function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading
        eyebrow="Workflow Gallery"
        title={
          <>
            Automations that do{' '}
            <span className="text-gradient">real business work</span>
          </>
        }
        description="A selection of production automations — from AI lead intake to outbound engines — each built to remove manual effort and drive measurable results."
      />

      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 2) * 0.1} direction="up">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  // Long feature lists are collapsed by default and expandable.
  const [expanded, setExpanded] = useState(false);
  // Toggle between the real screenshot and the architecture diagram.
  const [mode, setMode] = useState<PreviewMode>('shot');
  const VISIBLE = 6;
  const shownFeatures = expanded
    ? project.features
    : project.features.slice(0, VISIBLE);
  const remaining = project.features.length - VISIBLE;

  return (
    <Tilt max={6} className="group h-full [transform-style:preserve-3d]">
      <GlassCard
        strong
        gradientBorder
        className="flex h-full flex-col overflow-hidden"
      >
        {/* -------------------- Preview: shot ⇄ diagram -------------------- */}
        <ProjectPreview project={project} mode={mode} onMode={setMode} />

        {/* ----------------------------- Body ----------------------------- */}
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h3 className="font-display text-xl font-bold text-white">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          {/* Features */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Key Features
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              {shownFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-emerald" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {remaining > 0 && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-3 text-xs font-medium text-accent-cyan transition-colors hover:text-white"
              >
                {expanded ? 'Show less' : `+ ${remaining} more features`}
              </button>
            )}
          </div>

          {/* Business impact */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-accent-emerald/20 bg-accent-emerald/5 p-4">
            <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-accent-emerald" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-emerald/80">
                Business Impact
              </p>
              <p className="mt-0.5 text-sm font-medium text-white">
                {project.impact}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-strong"
              >
                Live Demo
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </Tilt>
  );
}

/**
 * Preview shown at the top of each project card. Switches between two views:
 * - "shot"  — real screenshot(s) from /public/projects (carousel if multiple),
 *             with a gradient + emoji fallback if none are set or one fails.
 * - "arch"  — a branded architecture diagram generated from project.arch.
 * The segmented toggle only appears when the project defines an architecture.
 */
function ProjectPreview({
  project,
  mode,
  onMode,
}: {
  project: Project;
  mode: PreviewMode;
  onMode: (m: PreviewMode) => void;
}) {
  const images = project.images ?? [];
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const hasArch = Boolean(project.arch?.length);
  const showArch = mode === 'arch' && hasArch;
  const hasImages = images.length > 0 && !failed;
  const multiple = images.length > 1;

  const go = (dir: number) => {
    setIndex((i) => (i + dir + images.length) % images.length);
  };

  return (
    <div
      className={cn(
        'relative flex aspect-[16/10] items-center justify-center overflow-hidden',
        showArch
          ? 'bg-base-950/80 bg-grid-pattern bg-[size:28px_28px]'
          : cn('bg-gradient-to-br', project.gradient)
      )}
    >
      {/* Faux browser chrome */}
      <div className="absolute left-4 top-4 z-20 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
      </div>

      {/* View toggle: Screenshot ⇄ Diagram */}
      {hasArch && (
        <div className="absolute right-3 top-3 z-30 flex items-center gap-0.5 rounded-full border border-white/15 bg-black/45 p-0.5 backdrop-blur">
          <ToggleButton
            active={mode === 'shot'}
            onClick={() => onMode('shot')}
            icon={<ImageIcon className="h-3.5 w-3.5" />}
            label="Screenshot"
          />
          <ToggleButton
            active={mode === 'arch'}
            onClick={() => onMode('arch')}
            icon={<Workflow className="h-3.5 w-3.5" />}
            label="Diagram"
          />
        </div>
      )}

      {showArch ? (
        /* -------------------------- Architecture -------------------------- */
        <div className="absolute inset-0 pt-12">
          <WorkflowDiagram stages={project.arch!} />
        </div>
      ) : hasImages ? (
        <>
          {/* Screenshot(s) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={images[index]}
                alt={`${project.title} — screenshot ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                onError={() => setFailed(true)}
                priority={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient scrim for legibility of overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-950/80 via-transparent to-transparent" />

          {/* Tagline pill */}
          <span className="absolute bottom-3 left-4 z-20 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur">
            {project.tagline}
          </span>

          {/* Carousel controls (only when multiple images) */}
          {multiple && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/90 backdrop-blur transition-colors hover:bg-black/60"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/90 backdrop-blur transition-colors hover:bg-black/60"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-3 right-4 z-20 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to screenshot ${i + 1}`}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        /* Fallback: gradient + emoji placeholder */
        <>
          <div className="absolute inset-0 bg-grid-pattern bg-[size:28px_28px] opacity-40" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="relative flex flex-col items-center gap-3 text-center"
          >
            <span className="text-6xl drop-shadow-lg">{project.emoji}</span>
            <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
              {project.tagline}
            </span>
          </motion.div>
          <span className="absolute bottom-3 right-4 text-[10px] uppercase tracking-widest text-white/40">
            Workflow preview
          </span>
        </>
      )}
    </div>
  );
}

/** Small pill button used by the Screenshot ⇄ Diagram toggle. */
function ToggleButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={label}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all',
        active
          ? 'bg-white text-base-950 shadow-sm'
          : 'text-white/70 hover:text-white'
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
