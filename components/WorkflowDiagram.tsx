'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { ArchStage, ArchKind } from '@/lib/data';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/*                          Node styling by kind                              */
/* -------------------------------------------------------------------------- */

// Each stage node is colour-coded by its role in the pipeline so the flow
// reads at a glance: what triggers it, where AI reasons, plain processing and
// the final outputs/integrations.
const KIND_STYLES: Record<ArchKind, { ring: string; icon: string; glow: string }> = {
  trigger: {
    ring: 'border-accent-cyan/40 bg-accent-cyan/10',
    icon: 'text-accent-cyan',
    glow: 'group-hover/node:shadow-[0_0_16px_-4px_rgba(34,211,238,0.6)]',
  },
  ai: {
    ring: 'border-accent-violet/40 bg-accent-violet/10',
    icon: 'text-accent-violet',
    glow: 'group-hover/node:shadow-[0_0_16px_-4px_rgba(139,92,246,0.6)]',
  },
  process: {
    ring: 'border-white/15 bg-white/[0.04]',
    icon: 'text-white/70',
    glow: 'group-hover/node:shadow-glass',
  },
  output: {
    ring: 'border-accent-emerald/40 bg-accent-emerald/10',
    icon: 'text-accent-emerald',
    glow: 'group-hover/node:shadow-[0_0_16px_-4px_rgba(52,211,153,0.6)]',
  },
};

const LEGEND: { kind: ArchKind; label: string }[] = [
  { kind: 'trigger', label: 'Trigger' },
  { kind: 'ai', label: 'AI' },
  { kind: 'process', label: 'Logic' },
  { kind: 'output', label: 'Output' },
];

/* -------------------------------------------------------------------------- */
/*                              Diagram render                                */
/* -------------------------------------------------------------------------- */

/**
 * Renders a workflow's architecture as a left-to-right staged pipeline.
 * Stages scroll horizontally on small screens and wrap into a flowing grid on
 * larger ones. Nodes fade/slide in as the diagram enters view.
 */
export function WorkflowDiagram({ stages }: { stages: ArchStage[] }) {
  return (
    <div className="flex h-full flex-col">
      {/* Scrollable flow */}
      <div className="flex-1 overflow-x-auto scrollbar-none">
        <div className="flex min-w-max items-stretch gap-2 p-4 sm:gap-3 sm:p-5">
          {stages.map((stage, si) => (
            <div key={stage.title} className="flex items-stretch gap-2 sm:gap-3">
              <Stage stage={stage} index={si} />
              {si < stages.length - 1 && <Connector index={si} />}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-white/10 bg-base-900/40 px-4 py-2.5 sm:px-5">
        {LEGEND.map((l) => (
          <span key={l.kind} className="inline-flex items-center gap-1.5">
            <span
              className={cn(
                'h-2 w-2 rounded-full border',
                KIND_STYLES[l.kind].ring
              )}
            />
            <span className="text-[10px] font-medium uppercase tracking-wide text-white/45">
              {l.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** A single vertical stage column: heading + its stacked nodes. */
function Stage({ stage, index }: { stage: ArchStage; index: number }) {
  return (
    <div className="flex w-[7.5rem] flex-col gap-2 sm:w-32">
      <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-white/40">
        {stage.title}
      </p>
      <div className="flex flex-1 flex-col justify-center gap-2">
        {stage.nodes.map((node, ni) => {
          const s = KIND_STYLES[node.kind];
          return (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: index * 0.08 + ni * 0.05 }}
              className={cn(
                'group/node flex items-center gap-2 rounded-xl border px-2.5 py-2 backdrop-blur transition-all duration-300',
                s.ring,
                s.glow
              )}
            >
              <node.icon className={cn('h-4 w-4 shrink-0', s.icon)} />
              <span className="text-[11px] font-medium leading-tight text-white/85">
                {node.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** Animated arrow linking two stages. */
function Connector({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 + 0.15 }}
      className="flex items-center"
      aria-hidden
    >
      <ChevronRight className="h-4 w-4 text-white/25" />
    </motion.div>
  );
}
