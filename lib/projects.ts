/**
 * Projects — the single runtime source of the portfolio's project gallery.
 *
 * Loads content/projects.json (authored with the local CMS — `npm run cms`),
 * validates it, and maps icon-name strings to real React components via the
 * icon registry (lib/icons.ts). lib/data.ts re-exports `projects` and the
 * project/arch types from here, so components keep importing from '@/lib/data'.
 *
 * A bad hand-edit (missing field, unknown icon, invalid kind, duplicate id)
 * throws a clear error here. Because this module is evaluated during the
 * static export, that failure surfaces as a failed `next build` — the final
 * safety gate before publishing.
 */
import type { IconComponent } from './icons';
import { getIcon, iconRegistry } from './icons';
import { contact } from './contact';
import rawProjectsData from '@/content/projects.json';

/* ------------------------------- Public types ----------------------------- */

export type ArchKind = 'trigger' | 'ai' | 'process' | 'output';
const ARCH_KINDS: readonly ArchKind[] = ['trigger', 'ai', 'process', 'output'];

export interface ArchNode {
  label: string;
  icon: IconComponent;
  kind: ArchKind;
}

export interface ArchStage {
  /** Short column heading, e.g. "Capture", "Qualify", "Notify". */
  title: string;
  nodes: ArchNode[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  impact: string;
  /** Resolved links — undefined hides the button. */
  github?: string;
  demo?: string;
  /** Accent gradient used for the card + screenshot placeholder. */
  gradient: string;
  /** Emoji rendered inside the screenshot placeholder (fallback). */
  emoji: string;
  /** Screenshots in /public/projects. Multiple images become a carousel. */
  images?: string[];
  /** Architecture diagram — the workflow as a staged pipeline. */
  arch?: ArchStage[];
}

/* ------------------------- Raw JSON shapes (on disk) ----------------------- */
/* On disk, `icon` is a string name and links may be the literal "default". */

interface RawArchNode {
  label: string;
  icon: string;
  kind: string;
}
interface RawArchStage {
  title: string;
  nodes: RawArchNode[];
}
interface RawProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  impact: string;
  github?: string;
  demo?: string;
  gradient: string;
  emoji: string;
  images?: string[];
  arch?: RawArchStage[];
}

/* ------------------------------- Validation -------------------------------- */

function fail(message: string): never {
  throw new Error(`[content/projects.json] ${message}`);
}

/** "default" → the contact fallback; empty/undefined → hidden; else a URL. */
function resolveLink(value: string | undefined, fallback: string): string | undefined {
  if (!value) return undefined;
  return value === 'default' ? fallback : value;
}

const REQUIRED_TEXT = ['id', 'title', 'tagline', 'description', 'impact', 'gradient', 'emoji'] as const;

function mapProject(raw: RawProject, index: number): Project {
  const where = `project #${index + 1}${raw && raw.id ? ` ("${raw.id}")` : ''}`;
  if (!raw || typeof raw !== 'object') fail(`${where} is not an object.`);

  for (const key of REQUIRED_TEXT) {
    const value = raw[key];
    if (typeof value !== 'string' || value.trim() === '') {
      fail(`${where} is missing the required text field "${key}".`);
    }
  }
  if (!Array.isArray(raw.features) || !Array.isArray(raw.tech)) {
    fail(`${where} must include "features" and "tech" arrays.`);
  }
  if (raw.images !== undefined && !Array.isArray(raw.images)) {
    fail(`${where} "images" must be an array of paths when present.`);
  }
  if (raw.arch !== undefined && !Array.isArray(raw.arch)) {
    fail(`${where} "arch" must be an array of stages when present.`);
  }

  const arch: ArchStage[] | undefined = raw.arch?.map((stage, si) => {
    if (!stage || typeof stage.title !== 'string' || !Array.isArray(stage.nodes)) {
      fail(`${where} arch stage #${si + 1} needs a "title" and a "nodes" array.`);
    }
    return {
      title: stage.title,
      nodes: stage.nodes.map((node, ni) => {
        const nodeWhere = `${where} arch stage "${stage.title}" node #${ni + 1}`;
        if (!node || typeof node.label !== 'string' || node.label.trim() === '') {
          fail(`${nodeWhere} is missing a "label".`);
        }
        if (!ARCH_KINDS.includes(node.kind as ArchKind)) {
          fail(`${nodeWhere} ("${node.label}") has invalid kind "${node.kind}". Use: ${ARCH_KINDS.join(', ')}.`);
        }
        if (!iconRegistry[node.icon]) {
          fail(`${nodeWhere} ("${node.label}") uses unknown icon "${node.icon}". Pick one from content/icon-catalog.json.`);
        }
        return { label: node.label, icon: getIcon(node.icon), kind: node.kind as ArchKind };
      }),
    };
  });

  return {
    id: raw.id,
    title: raw.title,
    tagline: raw.tagline,
    description: raw.description,
    features: raw.features,
    tech: raw.tech,
    impact: raw.impact,
    github: resolveLink(raw.github, contact.github),
    demo: resolveLink(raw.demo, contact.bookingUrl),
    gradient: raw.gradient,
    emoji: raw.emoji,
    images: raw.images && raw.images.length > 0 ? raw.images : undefined,
    arch: arch && arch.length > 0 ? arch : undefined,
  };
}

const rawProjects = rawProjectsData as RawProject[];

if (!Array.isArray(rawProjects)) {
  fail('The file must contain a top-level array of projects.');
}

// Duplicate ids break React keys and any future per-project routing.
const seenIds = new Set<string>();
for (const raw of rawProjects) {
  if (raw && typeof raw.id === 'string') {
    if (seenIds.has(raw.id)) fail(`Duplicate project id "${raw.id}".`);
    seenIds.add(raw.id);
  }
}

export const projects: Project[] = rawProjects.map(mapProject);
