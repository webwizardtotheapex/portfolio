/**
 * Central content model for the portfolio.
 * Everything the UI renders — bio, skills, projects, services, testimonials
 * and social links — lives here so copy can be edited in one place without
 * touching component code.
 */

import type { IconType } from 'react-icons';
import {
  SiN8N,
  SiHubspot,
  SiGoogle,
  SiGooglesheets,
  SiGooglecalendar,
  SiTelegram,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiJson,
} from 'react-icons/si';
// A few brand icons were removed from simple-icons; source them elsewhere.
import { RiOpenaiFill } from 'react-icons/ri';
import {
  Bot,
  Workflow,
  Webhook,
  Users,
  Database,
  Mail,
  MessageCircle,
  Cpu,
  Building2,
  Zap,
  Phone,
  BrainCircuit,
  Network,
  Headphones,
  Calendar,
  type LucideIcon,
} from 'lucide-react';
import {
  FaLinkedinIn,
  FaGithub,
  FaTelegram,
  FaWhatsapp,
  FaXTwitter,
  FaEnvelope,
  FaSlack,
} from 'react-icons/fa6';
import { contact } from './contact';

/* -------------------------------------------------------------------------- */
/*                                Personal info                               */
/* -------------------------------------------------------------------------- */

export const personal = {
  name: 'Isa Hassan',
  role: 'AI Automation Engineer',
  headline:
    'Building AI Automations that save businesses hundreds of hours every month.',
  location: 'Available Worldwide · Remote',
  shortBio: `I'm an AI Automation Engineer specializing in intelligent workflow automation using n8n, OpenAI, HubSpot, Google Workspace, Slack, Twilio, APIs and AI Agents.`,
  bioParagraphs: [
    `I'm an AI Automation Engineer specializing in intelligent workflow automation using n8n, OpenAI, HubSpot, Google Workspace, Slack, Twilio, APIs and AI Agents.`,
    `I build automations that eliminate repetitive work, qualify leads automatically, synchronize CRMs, monitor marketplaces, and create intelligent business systems.`,
    `My goal is simple: help businesses reduce manual work while increasing revenue through AI-powered automation.`,
  ],
  goal: 'Help businesses reduce manual work while increasing revenue through AI-powered automation.',
} as const;

/* -------------------------------------------------------------------------- */
/*                              Headline metrics                              */
/* -------------------------------------------------------------------------- */

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export const stats: Stat[] = [
  { label: 'Hours Saved Monthly', value: '500', suffix: '+' },
  { label: 'Workflows Shipped', value: '41', suffix: '+' },
  { label: 'Manual Work Reduced', value: '90', suffix: '%' },
  { label: 'Integrations Mastered', value: '20', suffix: '+' },
];

/* -------------------------------------------------------------------------- */
/*                                  Contact                                   */
/* -------------------------------------------------------------------------- */

// `contact` lives in lib/contact.ts (a leaf module) so lib/projects.ts can use
// it without a circular import. Re-exported here so components keep importing
// `{ contact }` from '@/lib/data' unchanged.
export { contact };

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
  handle: string;
}

export const socials: SocialLink[] = [
  { label: 'Email', href: `mailto:${contact.email}`, icon: FaEnvelope, handle: contact.email },
  { label: 'LinkedIn', href: contact.linkedin, icon: FaLinkedinIn, handle: 'in/isa-hassan-automation' },
  { label: 'GitHub', href: contact.github, icon: FaGithub, handle: 'webwizardtotheapex' },
  { label: 'Telegram', href: contact.telegram, icon: FaTelegram, handle: '@totheapex' },
  { label: 'WhatsApp', href: contact.whatsappLink, icon: FaWhatsapp, handle: contact.whatsapp },
  { label: 'Twitter / X', href: contact.twitter, icon: FaXTwitter, handle: '@SolDevHassan' },
];

/* -------------------------------------------------------------------------- */
/*                                   Skills                                   */
/* -------------------------------------------------------------------------- */

export interface Skill {
  name: string;
  icon: IconType | LucideIcon;
  category: 'Automation' | 'AI' | 'Integrations' | 'Development' | 'Business';
}

export const skills: Skill[] = [
  { name: 'n8n', icon: SiN8N, category: 'Automation' },
  { name: 'Workflow Automation', icon: Workflow, category: 'Automation' },
  { name: 'Business Process Automation', icon: Building2, category: 'Automation' },
  { name: 'OpenAI API', icon: RiOpenaiFill, category: 'AI' },
  { name: 'AI Agents', icon: Bot, category: 'AI' },
  { name: 'Prompt Engineering', icon: BrainCircuit, category: 'AI' },
  { name: 'HubSpot', icon: SiHubspot, category: 'Integrations' },
  { name: 'Google Workspace', icon: SiGoogle, category: 'Integrations' },
  { name: 'Google Sheets', icon: SiGooglesheets, category: 'Integrations' },
  { name: 'Google Calendar', icon: SiGooglecalendar, category: 'Integrations' },
  { name: 'Slack API', icon: FaSlack, category: 'Integrations' },
  { name: 'Telegram Bots', icon: SiTelegram, category: 'Integrations' },
  { name: 'Twilio', icon: Phone, category: 'Integrations' },
  { name: 'Webhook APIs', icon: Webhook, category: 'Development' },
  { name: 'REST APIs', icon: Network, category: 'Development' },
  { name: 'JSON', icon: SiJson, category: 'Development' },
  { name: 'JavaScript', icon: SiJavascript, category: 'Development' },
  { name: 'TypeScript', icon: SiTypescript, category: 'Development' },
  { name: 'Node.js', icon: SiNodedotjs, category: 'Development' },
  { name: 'Lead Generation', icon: Users, category: 'Business' },
  { name: 'CRM Automation', icon: Database, category: 'Business' },
  { name: 'Email Automation', icon: Mail, category: 'Business' },
  { name: 'WhatsApp Automation', icon: MessageCircle, category: 'Business' },
];

export const skillCategories = [
  'Automation',
  'AI',
  'Integrations',
  'Development',
  'Business',
] as const;

/* -------------------------------------------------------------------------- */
/*                                  Projects                                  */
/* -------------------------------------------------------------------------- */

/**
 * Projects & architecture-diagram types. The project data lives in
 * content/projects.json (authored via the local CMS — `npm run cms`) and is
 * loaded, validated and icon-mapped by lib/projects.ts. Re-exported here so
 * components keep importing `{ projects, type Project }` from '@/lib/data'.
 */
export type { Project, ArchStage, ArchNode, ArchKind } from './projects';

export { projects } from './projects';

/* -------------------------------------------------------------------------- */
/*                                  Services                                  */
/* -------------------------------------------------------------------------- */

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: 'AI Workflow Automation',
    description: 'End-to-end intelligent workflows that connect your tools and run your operations 24/7.',
    icon: Workflow,
  },
  {
    title: 'n8n Development',
    description: 'Custom n8n workflows built for reliability, scale and easy maintenance.',
    icon: SiN8N as unknown as LucideIcon,
  },
  {
    title: 'CRM Automation',
    description: 'Keep HubSpot and your CRM clean, synced and always up to date — automatically.',
    icon: Database,
  },
  {
    title: 'Lead Qualification Systems',
    description: 'AI that scores, classifies and routes leads so your team only talks to the hot ones.',
    icon: Users,
  },
  {
    title: 'WhatsApp Automation',
    description: 'Automated WhatsApp notifications, replies and lead capture via Twilio and APIs.',
    icon: MessageCircle,
  },
  {
    title: 'AI Customer Support',
    description: 'Always-on AI agents that answer, triage and resolve customer questions instantly.',
    icon: Headphones,
  },
  {
    title: 'HubSpot Automation',
    description: 'Automatic deal creation, task assignment and pipeline management inside HubSpot.',
    icon: SiHubspot as unknown as LucideIcon,
  },
  {
    title: 'Slack Automation',
    description: 'Real-time Slack alerts and internal workflows that keep your team in the loop.',
    icon: FaSlack as unknown as LucideIcon,
  },
  {
    title: 'Google Workspace Automation',
    description: 'Automate Sheets, Calendar, Gmail and Drive into a seamless back office.',
    icon: Calendar,
  },
  {
    title: 'Business Process Automation',
    description: 'Map, streamline and automate repetitive processes across your whole business.',
    icon: Building2,
  },
  {
    title: 'API Integration',
    description: 'Connect any platform with robust REST, webhook and JSON integrations.',
    icon: Webhook,
  },
  {
    title: 'Custom AI Agents',
    description: 'Bespoke AI agents that reason, decide and take action on your behalf.',
    icon: Cpu,
  },
];

/* -------------------------------------------------------------------------- */
/*                                Experience                                  */
/* -------------------------------------------------------------------------- */

export interface Experience {
  role: string;
  summary: string;
  stack: string[];
  icon: LucideIcon;
}

export const experiences: Experience[] = [
  {
    role: 'AI Automation Engineer',
    summary:
      'Building intelligent workflow automation that connects AI models with the tools businesses use every day.',
    stack: ['n8n', 'OpenAI', 'HubSpot', 'Slack', 'Twilio', 'Google Workspace', 'REST APIs'],
    icon: Zap,
  },
];

/* -------------------------------------------------------------------------- */
/*                               Testimonials                                 */
/* -------------------------------------------------------------------------- */

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
  accent: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Isa rebuilt our entire lead intake in n8n. Leads are now qualified and routed in seconds — our team stopped drowning in manual data entry overnight.',
    name: 'Marcus Bailey',
    title: 'Head of Sales',
    company: 'Northline Realty',
    initials: 'MB',
    accent: 'from-accent-cyan to-accent-violet',
  },
  {
    quote:
      'The automation Isa delivered saves us well over 100 hours a month. It paid for itself in the first two weeks. Genuinely one of the best hires we made.',
    name: 'Priya Nair',
    title: 'Operations Director',
    company: 'Scalehaus',
    initials: 'PN',
    accent: 'from-accent-violet to-accent-fuchsia',
  },
  {
    quote:
      'Our HubSpot is finally clean and always in sync. Deals and tasks create themselves. Isa understands both the AI and the business side — rare combination.',
    name: 'David Okafor',
    title: 'Founder',
    company: 'LeadForge',
    initials: 'DO',
    accent: 'from-accent-emerald to-accent-cyan',
  },
  {
    quote:
      'We went from missing follow-ups constantly to a fully automated outreach engine. Response rates doubled. Communication and delivery were flawless.',
    name: 'Sofia Almeida',
    title: 'Growth Lead',
    company: 'Outbound Labs',
    initials: 'SA',
    accent: 'from-accent-fuchsia to-accent-violet',
  },
  {
    quote:
      'Isa built an AI agent that handles our first-line support. Customers get instant answers and our team only touches the hard cases now.',
    name: 'James Whitfield',
    title: 'CX Manager',
    company: 'Helpstack',
    initials: 'JW',
    accent: 'from-accent-cyan to-accent-emerald',
  },
  {
    quote:
      'Reliable, fast and incredibly thoughtful about edge cases. The workflows just work — no babysitting required. Highly recommend for any serious automation project.',
    name: 'Elena Rossi',
    title: 'CEO',
    company: 'Momentum Digital',
    initials: 'ER',
    accent: 'from-accent-violet to-accent-cyan',
  },
];

/* -------------------------------------------------------------------------- */
/*                                Navigation                                  */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
