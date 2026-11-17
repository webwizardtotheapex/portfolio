/**
 * Icon registry — maps string icon names to real React icon components.
 *
 * Why this exists: architecture-diagram nodes (and, in future, other CMS
 * content) reference icons by a **string name** in content/*.json, because
 * JSON can't hold a React component. This module is the one place that turns
 * those names back into components.
 *
 * The pickable names + their picker groups live in content/icon-catalog.json
 * (the single source of truth shared with the local CMS). A load-time guard
 * asserts the catalog and this registry are exactly in sync, so a typo or a
 * forgotten mapping fails loudly during `next build` instead of silently
 * rendering a blank node.
 *
 * To add a NEW icon to the palette: add one entry to content/icon-catalog.json
 * AND one import + one line in `iconRegistry` below. (Day-to-day project
 * authoring only *picks* from existing icons — no code needed.)
 */
import type { IconType } from 'react-icons';
import {
  SiN8N,
  SiGmail,
  SiGoogle,
  SiGooglesheets,
  SiGooglecalendar,
  SiHubspot,
  SiTelegram,
  SiSupabase,
  SiJson,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
} from 'react-icons/si';
import { RiOpenaiFill } from 'react-icons/ri';
import { FaSlack, FaWhatsapp } from 'react-icons/fa6';
import {
  Bot,
  BrainCircuit,
  Sparkles,
  Cpu,
  MessageCircle,
  Phone,
  Database,
  Network,
  Webhook,
  Braces,
  Workflow,
  Mail,
  Users,
  Calendar,
  ClipboardList,
  Star,
  ShieldCheck,
  Bell,
  LayoutDashboard,
  Car,
  Building2,
  Zap,
  Headphones,
  type LucideIcon,
} from 'lucide-react';
import iconCatalog from '@/content/icon-catalog.json';

/** Either kind of icon component renders the same way: `<Icon className=.. />`. */
export type IconComponent = IconType | LucideIcon;

/** name → component. Keys MUST match content/icon-catalog.json exactly. */
export const iconRegistry: Record<string, IconComponent> = {
  // AI
  openai: RiOpenaiFill,
  bot: Bot,
  'brain-circuit': BrainCircuit,
  sparkles: Sparkles,
  cpu: Cpu,
  // Integrations
  n8n: SiN8N,
  gmail: SiGmail,
  google: SiGoogle,
  'google-sheets': SiGooglesheets,
  'google-calendar': SiGooglecalendar,
  hubspot: SiHubspot,
  slack: FaSlack,
  telegram: SiTelegram,
  supabase: SiSupabase,
  whatsapp: FaWhatsapp,
  'message-circle': MessageCircle,
  phone: Phone,
  // Data & Dev
  database: Database,
  json: SiJson,
  javascript: SiJavascript,
  typescript: SiTypescript,
  nodejs: SiNodedotjs,
  braces: Braces,
  network: Network,
  webhook: Webhook,
  // Generic
  workflow: Workflow,
  mail: Mail,
  users: Users,
  calendar: Calendar,
  'clipboard-list': ClipboardList,
  star: Star,
  'shield-check': ShieldCheck,
  bell: Bell,
  dashboard: LayoutDashboard,
  car: Car,
  building: Building2,
  zap: Zap,
  headphones: Headphones,
};

/** One catalog entry: a pickable icon name and the picker group it belongs to. */
export interface IconCatalogEntry {
  name: string;
  group: string;
}

export const iconCatalogEntries = iconCatalog as IconCatalogEntry[];

/* --- Drift guard: catalog names and registry keys must be identical. ------ */
const catalogNames = new Set(iconCatalogEntries.map((e) => e.name));
const registryNames = new Set(Object.keys(iconRegistry));
const missingComponent = [...catalogNames].filter((n) => !registryNames.has(n));
const missingCatalog = [...registryNames].filter((n) => !catalogNames.has(n));
if (missingComponent.length > 0 || missingCatalog.length > 0) {
  throw new Error(
    'Icon registry / catalog mismatch — fix content/icon-catalog.json and lib/icons.ts.\n' +
      (missingComponent.length
        ? `  • In catalog but no component mapped: ${missingComponent.join(', ')}\n`
        : '') +
      (missingCatalog.length
        ? `  • Mapped in registry but missing from catalog: ${missingCatalog.join(', ')}\n`
        : '')
  );
}

/** Resolve an icon name to its component, throwing a clear error if unknown. */
export function getIcon(name: string): IconComponent {
  const icon = iconRegistry[name];
  if (!icon) {
    throw new Error(
      `Unknown icon "${name}". Pick a name listed in content/icon-catalog.json ` +
        `(or add it to both that file and lib/icons.ts).`
    );
  }
  return icon;
}
