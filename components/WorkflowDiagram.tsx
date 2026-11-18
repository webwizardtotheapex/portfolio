'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Network, Pause, Play } from 'lucide-react';
import type { ArchStage, ArchKind, ArchNode } from '@/lib/data';
import { cn } from '@/lib/utils';

const KIND_STYLES: Record<ArchKind, { surface: string; icon: string; label: string; description: string }> = {
  trigger: {
    surface: 'border-accent-primary/40 bg-accent-primary/10',
    icon: 'text-accent-sky',
    label: 'Trigger',
    description: 'Starts the workflow when a new event arrives.',
  },
  ai: {
    surface: 'border-accent-sky/40 bg-accent-sky/10',
    icon: 'text-accent-sky',
    label: 'AI',
    description: 'Reasons over the prepared context and produces an AI response.',
  },
  process: {
    surface: 'border-border bg-surface-hover/70',
    icon: 'text-fg-muted',
    label: 'Logic',
    description: 'Transforms or routes data to the next workflow step.',
  },
  output: {
    surface: 'border-accent-success/40 bg-accent-success/10',
    icon: 'text-accent-success',
    label: 'Output',
    description: 'Delivers the workflow result to its destination.',
  },
};

// These are architectural roles, not claims about live execution status.
// The project schema remains the source for every stage, label, icon, and kind.
const NODE_DETAILS: Record<string, { role: string; description: string }> = {
  'Website Chat': { role: 'Trigger', description: 'Receives website live chat messages and starts the shared pipeline.' },
  Gmail: { role: 'Trigger', description: 'Receives email messages and starts the shared pipeline.' },
  'WhatsApp (GREEN-API)': { role: 'Trigger', description: 'Receives direct WhatsApp messages through GREEN-API.' },
  'Payload Standardization': { role: 'Normalize', description: "Normalizes each channel's payload before it reaches the shared pipeline." },
  'Identity Resolution': { role: 'Identity', description: 'Matches cross-channel contact details to a single customer record.' },
  'CRM Lookup': { role: 'CRM', description: "Looks up the customer's existing record in Google Sheets CRM." },
  'Conversation History': { role: 'Memory', description: 'Retrieves stored conversation memory to preserve context across channels.' },
  'RAG Knowledge Base': { role: 'RAG', description: 'Retrieves the knowledge base used to ground the AI response.' },
  'History + KB Context Builder': { role: 'Context', description: 'Combines conversation history and knowledge base grounding for the agent.' },
  'Gemini AI Agent': { role: 'Gemini', description: 'Uses the prepared context to classify intent and draft a channel-adapted response.' },
  'Structured Parser': { role: 'JSON', description: "Parses the agent's structured JSON response before routing." },
  'Escalation Guardrail (If)': { role: 'Kill-switch', description: 'Stops automated replies when a sensitive case requires human escalation.' },
  'Yes → Human Alert': { role: 'Handoff', description: 'Sends the case and its full context to a human agent.' },
  'No → Channel Switch Router (Web / Email / WhatsApp)': { role: 'Router', description: 'Returns the response through the originating Web, Email, or WhatsApp channel.' },
};

function nodeDetails(node: ArchNode) {
  return NODE_DETAILS[node.label] ?? {
    role: KIND_STYLES[node.kind].label,
    description: KIND_STYLES[node.kind].description,
  };
}

function columns(stage: ArchStage) {
  return stage.nodes.length === 3 ? 3 : Math.min(2, Math.max(1, stage.nodes.length));
}

/** A contained, vertical pipeline: branches remain readable at every card width. */
export function WorkflowDiagram({ stages }: { stages: ArchStage[] }) {
  const id = useId();
  const flowRef = useRef<HTMLOListElement>(null);
  const [flowWidth, setFlowWidth] = useState(300);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<{ stage: number; node: number } | null>(null);
  const animateFlow = !reducedMotion && !paused;

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;
    const observer = new ResizeObserver(([entry]) => setFlowWidth(entry.contentRect.width));
    observer.observe(flow);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/[0.08] bg-surface/90 px-3 sm:px-4">
        <p className="flex min-w-0 items-center gap-2 text-xs font-semibold text-fg-muted">
          <Network className="h-4 w-4 shrink-0 text-accent-sky" aria-hidden="true" />
          Architecture
          <span className="rounded-md border border-white/10 bg-bg/50 px-2 py-1 font-mono text-[10px] text-fg-subtle tabular-nums">
            {stages.length} stages
          </span>
        </p>
        <button
          type="button"
          aria-label={paused ? 'Resume data-flow animation' : 'Pause data-flow animation'}
          title={reducedMotion ? 'Motion reduced by your device preference' : paused ? 'Resume data flow' : 'Pause data flow'}
          aria-pressed={paused || Boolean(reducedMotion)}
          disabled={Boolean(reducedMotion)}
          onClick={() => setPaused((value) => !value)}
          className="workflow-control shrink-0 disabled:cursor-default disabled:opacity-60"
        >
          {paused || reducedMotion ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>

      <div
        role="region"
        aria-label="Workflow architecture stages"
        tabIndex={0}
        className="workflow-focus min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain p-4"
      >
        <ol ref={flowRef} className="min-w-0">
          {stages.map((stage, stageIndex) => {
            const columnCount = columns(stage);
            const activeNode = selected?.stage === stageIndex ? stage.nodes[selected.node] : undefined;
            const detailId = id + '-stage-' + stageIndex;
            return (
              <li key={stage.title} className="min-w-0">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-mono text-[10px] text-fg-muted dark:text-accent-sky">{String(stageIndex + 1).padStart(2, '0')}</span>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">{stage.title}</p>
                </div>
                <div className={cn('grid min-w-0 items-stretch gap-2', columnCount === 3 ? 'grid-cols-3' : columnCount === 2 ? 'grid-cols-2' : 'grid-cols-1')}>
                  {stage.nodes.map((node, nodeIndex) => {
                    const styles = KIND_STYLES[node.kind];
                    const details = nodeDetails(node);
                    const active = selected?.stage === stageIndex && selected.node === nodeIndex;
                    return (
                      <button
                        key={node.label}
                        type="button"
                        aria-label={node.label + ', ' + details.role + ', ' + stage.title}
                        aria-expanded={active}
                        aria-controls={detailId}
                        onClick={() => setSelected(active ? null : { stage: stageIndex, node: nodeIndex })}
                        className={cn(
                          'workflow-focus surface-reflection group/node flex min-h-20 min-w-0 flex-col items-start justify-start gap-2 rounded-xl border p-2.5 text-left transition-[border-color,background-color,box-shadow] duration-200 hover:border-accent-primary/40 hover:shadow-glow motion-reduce:transition-none',
                          styles.surface,
                          active && 'border-accent-sky bg-accent-sky/15 shadow-glow'
                        )}
                      >
                        <span className="flex w-full min-w-0 flex-wrap items-center gap-1.5">
                          <node.icon className={cn('h-4 w-4 shrink-0', styles.icon)} aria-hidden="true" />
                          <span className="rounded-md border border-white/[0.08] bg-bg/50 px-1.5 py-1 font-mono text-[9px] font-medium leading-none text-fg-muted">{details.role}</span>
                        </span>
                        <span className="w-full min-w-0 break-words text-xs font-medium leading-relaxed text-fg">{node.label}</span>
                      </button>
                    );
                  })}
                </div>
                <motion.div
                  id={detailId}
                  initial={false}
                  animate={{ height: activeNode ? 'auto' : 0, opacity: activeNode ? 1 : 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeOut' }}
                  aria-hidden={!activeNode}
                  className="overflow-hidden"
                >
                  {activeNode && (
                    <div className="mt-2 rounded-xl border border-accent-sky/30 bg-surface/95 px-3 py-2.5 text-xs leading-relaxed text-fg-muted" aria-live="polite">
                      <p className="font-semibold text-fg">{activeNode.label}</p>
                      <p className="mt-1">{nodeDetails(activeNode).description}</p>
                    </div>
                  )}
                </motion.div>
                {stageIndex < stages.length - 1 && (
                  <Connector from={columnCount} to={columns(stages[stageIndex + 1])} width={flowWidth} index={stageIndex} animate={animateFlow} />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-center gap-x-4 gap-y-1.5 border-t border-white/[0.08] bg-surface/90 px-3 py-2.5">
        {(Object.keys(KIND_STYLES) as ArchKind[]).map((kind) => (
          <span key={kind} className="inline-flex items-center gap-1.5 text-[10px] font-medium text-fg-muted">
            <span className={cn('h-2 w-2 rounded-full border', KIND_STYLES[kind].surface)} aria-hidden="true" />
            {KIND_STYLES[kind].label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Branches merge and split at the exact column centers; pulses are decorative. */
function Connector({ from, to, width, index, animate }: { from: number; to: number; width: number; index: number; animate: boolean }) {
  const center = width / 2;
  const centers = (count: number) => Array.from({ length: count }, (_, column) => ((width - 8 * (count - 1)) / count) * (column + 0.5) + 8 * column);
  const start = centers(from);
  const end = centers(to);
  const path = [
    ...start.map((x) => 'M' + x + ' 0 V12 H' + center),
    ...end.map((x) => 'M' + center + ' 12 V28 H' + x + ' V38 M' + (x - 3) + ' 34 L' + x + ' 38 L' + (x + 3) + ' 34'),
  ].join(' ');

  return (
    <div className="relative h-10 w-full" aria-hidden="true">
      <svg viewBox={'0 0 ' + width + ' 40'} preserveAspectRatio="none" className="h-full w-full text-accent-sky/45" fill="none">
        <path d={path} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
      {animate && (
        <span className="workflow-flow-pulse absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-accent-sky" style={{ animationDelay: index * 0.15 + 's' }} />
      )}
    </div>
  );
}
