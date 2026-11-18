'use client';

import { useState, type KeyboardEvent } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Github, Image as ImageIcon, Maximize2, TrendingUp, Workflow } from 'lucide-react';
import { projects, type Project } from '@/lib/data';
import { SectionHeading } from '../SectionHeading';
import { GlassCard } from '../GlassCard';
import { Reveal } from '../Reveal';
import { Badge } from '../Badge';
import { WorkflowScreenshot } from '../WorkflowScreenshot';
import { cn } from '@/lib/utils';

const WorkflowDiagram = dynamic(
  () => import('../WorkflowDiagram').then((module) => module.WorkflowDiagram),
  {
    ssr: false,
    loading: () => (
      <div role="status" className="flex h-full items-center justify-center gap-2 text-sm text-fg-muted">
        <Workflow className="h-5 w-5" aria-hidden="true" />
        Loading architecture…
      </div>
    ),
  }
);
const ScreenshotLightbox = dynamic(
  () => import('../ScreenshotLightbox').then((module) => module.ScreenshotLightbox),
  { ssr: false }
);

type PreviewMode = 'shot' | 'arch';
const VISIBLE_FEATURES = 6;

/** The gallery uses the same project model for cards, previews, and diagrams. */
export function Projects() {
  return (
    <section id="projects" className="section gallery-section">
      <SectionHeading
        centered={false}
        eyebrow="Workflow Gallery"
        title={
          <>
            Automations that do{' '}
            <span className="text-gradient">real business work</span>
          </>
        }
        description="A selection of production automations — from AI lead intake to outbound engines — each built to remove manual effort and drive measurable results."
      />
      <div className="mt-10 grid min-w-0 grid-cols-1 items-stretch gap-6 sm:mt-12 lg:grid-cols-2 lg:gap-8">
        {projects.map((project, i) => (
          <Reveal key={project.id} className="h-full min-w-0" delay={(i % 2) * 0.1} direction="up">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const [mode, setMode] = useState<PreviewMode>('shot');
  const reducedMotion = useReducedMotion();
  const remaining = project.features.length - VISIBLE_FEATURES;
  const featurePanelId = project.id + '-more-features';
  const titleId = project.id + '-title';

  return (
    <article aria-labelledby={titleId} className="h-full min-w-0">
        <GlassCard strong gradientBorder className="group flex h-full min-w-0 flex-col overflow-hidden">
          <ProjectPreview project={project} mode={mode} onMode={setMode} />
          <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6 lg:p-7">
            <h3 id={titleId} className="break-words font-display text-xl font-semibold leading-snug tracking-[-0.025em] text-fg sm:text-[1.35rem]">
              {project.title}
            </h3>
            <p className="mt-3 text-[13px] leading-[1.85] text-fg-muted sm:text-sm">
              {project.description}
            </p>

            <ul aria-label="Technology stack" className="mt-5 flex min-w-0 flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech} className="min-w-0">
                  <Badge className="max-w-full border-white/[0.08] bg-bg/35 py-1.5 text-fg-muted hover:border-accent-primary/30 hover:bg-surface-hover hover:text-fg">
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
                Key Features
              </h4>
              <FeatureList features={project.features.slice(0, VISIBLE_FEATURES)} className="mt-3" />
              {remaining > 0 && (
                <>
                  <motion.div
                    id={featurePanelId}
                    initial={false}
                    animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.24, ease: 'easeOut' }}
                    aria-hidden={!expanded}
                    className="overflow-hidden"
                  >
                    <FeatureList features={project.features.slice(VISIBLE_FEATURES)} className="pt-2" />
                  </motion.div>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={featurePanelId}
                    onClick={() => setExpanded((value) => !value)}
                    className="workflow-control mt-2 gap-2 px-2 text-xs font-medium text-accent-primary dark:text-accent-sky"
                  >
                    {expanded ? 'Show less' : '+ ' + remaining + ' more features'}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn('h-4 w-4 transition-transform duration-200 motion-reduce:transition-none', expanded && 'rotate-180')}
                    />
                  </button>
                </>
              )}
            </div>

            <div className="mt-auto pt-6">
              <div className="flex min-w-0 items-start gap-3 rounded-r-xl rounded-l-sm border border-accent-success/10 border-l-2 border-l-accent-success/70 bg-accent-success/[0.06] p-4 transition-colors duration-200 hover:bg-accent-success/10 motion-reduce:transition-none">
                <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-accent-success" aria-hidden="true" />
                <div className="min-w-0">
                  <h4 className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-accent-success">
                    Business Impact
                  </h4>
                  <p className="mt-2 text-[13px] font-medium leading-[1.8] text-fg-muted">
                    {project.impact}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="workflow-control gap-2 border border-white/[0.08] bg-bg/30 px-4 text-xs font-medium text-fg hover:border-accent-primary/40"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    GitHub
                    <span className="sr-only"> for {project.title} (opens in a new tab)</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="workflow-focus inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-gradient px-4 text-xs font-semibold text-ink shadow-glow transition-shadow duration-200 hover:shadow-glow-strong motion-reduce:transition-none"
                  >
                    Live Demo
                    <span className="sr-only"> for {project.title} (opens in a new tab)</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </GlassCard>
    </article>
  );
}

function FeatureList({ features, className }: { features: string[]; className?: string }) {
  return (
    <ul className={cn('grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2', className)}>
      {features.map((feature) => (
        <li
          key={feature}
          className="flex min-w-0 items-start gap-2 rounded-lg border border-white/[0.04] bg-bg/25 px-2.5 py-2.5 text-xs leading-[1.75] text-fg-muted transition-colors duration-200 hover:border-accent-primary/20 hover:bg-surface-hover motion-reduce:transition-none"
        >
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-success" aria-hidden="true" />
          <span className="min-w-0 break-words">{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectPreview({
  project,
  mode,
  onMode,
}: {
  project: Project;
  mode: PreviewMode;
  onMode: (mode: PreviewMode) => void;
}) {
  const images = project.images ?? [];
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const hasArch = Boolean(project.arch?.length);
  const panelId = project.id + '-preview-panel';
  const tabId = (view: PreviewMode) => project.id + '-tab-' + view;
  const go = (direction: number) => setIndex((current) => (current + direction + images.length) % images.length);

  function handleTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const next: PreviewMode = event.key === 'Home'
      ? 'shot'
      : event.key === 'End'
        ? 'arch'
        : mode === 'shot' ? 'arch' : 'shot';
    onMode(next);
    event.currentTarget.querySelector<HTMLButtonElement>('[data-mode="' + next + '"]')?.focus();
  }

  return (
    <div className="workflow-preview min-w-0 border-b border-white/[0.08] bg-bg/25 p-3 pb-0 sm:p-4 sm:pb-0">
      <div className="mb-3 flex min-w-0 items-center gap-2">
        <span aria-hidden="true" className="mr-1 hidden shrink-0 gap-1 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-fg/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-fg/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-fg/10" />
        </span>
        {hasArch ? (
          <div
            role="tablist"
            aria-label={project.title + ' preview'}
            onKeyDown={handleTabsKeyDown}
            className="relative flex min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-bg/60 p-1"
          >
            {(['shot', 'arch'] as const).map((view) => {
              const active = mode === view;
              const Icon = view === 'shot' ? ImageIcon : Workflow;
              return (
                <button
                  key={view}
                  type="button"
                  role="tab"
                  id={tabId(view)}
                  data-mode={view}
                  aria-selected={active}
                  aria-controls={panelId}
                  tabIndex={active ? 0 : -1}
                  onClick={() => onMode(view)}
                  className={cn('workflow-control relative min-w-0 flex-1 gap-2 px-2 text-[11px] font-medium sm:px-3 sm:text-xs', active ? 'text-fg' : 'text-fg-subtle')}
                >
                  {active && (
                    <motion.span
                      layoutId={reducedMotion ? undefined : project.id + '-active-preview'}
                      transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeOut' }}
                      className="surface-reflection absolute inset-0 rounded-lg border border-white/10 bg-surface-hover"
                      aria-hidden="true"
                    />
                  )}
                  <Icon className="relative h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="relative">{view === 'shot' ? 'Screenshot' : 'Diagram'}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="flex min-h-11 flex-1 items-center gap-2 text-xs font-semibold text-fg-muted">
            <ImageIcon className="h-4 w-4" aria-hidden="true" />
            Screenshot
          </p>
        )}
        <div className="w-11 shrink-0">
          {mode === 'shot' && images.length > 0 && (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={'Enlarge screenshots for ' + project.title}
              title="Enlarge screenshots"
              aria-haspopup="dialog"
              className="workflow-control"
            >
              <Maximize2 className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div
        id={panelId}
        role={hasArch ? 'tabpanel' : undefined}
        aria-labelledby={hasArch ? tabId(mode) : undefined}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey || mode !== 'shot' || images.length < 2) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            go(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
        className="workflow-focus workflow-canvas relative aspect-[1.15] min-w-0 overflow-hidden rounded-xl border border-white/[0.08] bg-bg/90 sm:aspect-[16/10]"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.18, ease: 'easeOut' }}
            className="absolute inset-0 min-w-0"
          >
            {mode === 'arch' && project.arch ? (
              <WorkflowDiagram stages={project.arch} />
            ) : images.length > 0 ? (
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={images[index]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <WorkflowScreenshot src={images[index]} alt={project.title + ' — screenshot ' + (index + 1) + ' of ' + images.length} />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-fg-muted">
                <Workflow className="h-12 w-12 text-accent-sky" aria-hidden="true" />
                <p className="text-sm">Explore the architecture to see this workflow.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex h-14 min-w-0 items-center justify-center px-1">
        {mode === 'shot' && images.length > 1 ? (
          <div role="group" aria-label="Screenshot navigation" className="flex w-full items-center justify-between gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous screenshot" className="workflow-control">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex min-w-0 items-center justify-center">
              {images.map((src, imageIndex) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(imageIndex)}
                  aria-label={'Show screenshot ' + (imageIndex + 1) + ' of ' + images.length}
                  aria-current={imageIndex === index ? 'true' : undefined}
                  className="workflow-control"
                >
                  <span
                    aria-hidden="true"
                    className={cn('h-1 w-4 rounded-full transition-colors duration-200 motion-reduce:transition-none', imageIndex === index ? 'bg-accent-primary' : 'bg-fg-subtle/30')}
                  />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Next screenshot" className="workflow-control">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="sr-only" aria-live="polite" aria-atomic="true">
              Screenshot {index + 1} of {images.length}
            </span>
          </div>
        ) : (
          <p className="font-mono text-[10px] text-fg-subtle">
            {mode === 'arch' ? 'Select a node to inspect its role' : 'Workflow screenshot'}
          </p>
        )}
      </div>
      <p className="flex min-h-16 min-w-0 items-center border-t border-white/[0.06] px-1 py-3 text-xs leading-[1.8] text-fg-subtle">
        {project.tagline}
      </p>

      {lightboxOpen && (
        <ScreenshotLightbox
          project={project}
          index={index}
          onIndex={setIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
