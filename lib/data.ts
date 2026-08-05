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
  Braces,
  Webhook,
  Sparkles,
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
  ClipboardList,
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
  { label: 'Workflows Shipped', value: '40', suffix: '+' },
  { label: 'Manual Work Reduced', value: '90', suffix: '%' },
  { label: 'Integrations Mastered', value: '20', suffix: '+' },
];

/* -------------------------------------------------------------------------- */
/*                                  Contact                                   */
/* -------------------------------------------------------------------------- */

export const contact = {
  email: 'webwizardtotheapex@gmail.com',
  whatsapp: '08139299686',
  // E.164-ish number used for the WhatsApp deep link (Nigeria +234).
  whatsappLink: 'https://wa.me/2348139299686',
  linkedin: 'https://www.linkedin.com/in/isa-hassan-automation/',
  github: 'https://github.com/webwizardtotheapex',
  telegram: 'https://t.me/totheapex',
  twitter: 'https://x.com/SolDevHassan',
  // Primary booking call-to-action. Falls back to email if you have no
  // scheduling link yet — swap this for Calendly/Cal.com when ready.
  bookingUrl: 'https://wa.me/2348139299686?text=Hi%20Isa%2C%20I%27d%20like%20to%20book%20a%20call%20about%20AI%20automation.',
} as const;

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
 * Architecture diagram model. Each workflow is expressed as a left-to-right
 * pipeline of stages; a stage holds one or more nodes (parallel branches, e.g.
 * fan-out to multiple integrations). The <WorkflowDiagram> component renders it.
 */
export type ArchKind = 'trigger' | 'ai' | 'process' | 'output';

export interface ArchNode {
  label: string;
  icon: IconType | LucideIcon;
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
  /** Optional links — leave undefined to hide the button. */
  github?: string;
  demo?: string;
  /** Accent gradient used for the card + screenshot placeholder. */
  gradient: string;
  /** Emoji rendered inside the screenshot placeholder (fallback). */
  emoji: string;
  /**
   * One or more screenshots in /public/projects. When present, the card
   * renders the image(s) instead of the emoji placeholder. Multiple images
   * become a small carousel.
   */
  images?: string[];
  /**
   * Architecture diagram — the workflow expressed as a staged pipeline.
   * Rendered by <WorkflowDiagram> as a branded alternative to the screenshot.
   */
  arch?: ArchStage[];
}

export const projects: Project[] = [
  {
    id: 'real-estate-lead-intake-ai',
    title: 'Real Estate Lead Intake AI',
    tagline: 'Enterprise lead management, fully automated',
    description:
      'An enterprise AI-powered Real Estate Lead Management System built in n8n that qualifies, scores and routes every inbound lead automatically.',
    features: [
      'AI Lead Qualification',
      'Lead Scoring',
      'Hot / Warm / Cold Classification',
      'Spam Detection',
      'AI Email Replies',
      'HubSpot CRM Integration',
      'Google Sheets Logging',
      'Google Calendar Booking',
      'Slack Notifications',
      'WhatsApp Notifications',
      'Twilio Integration',
      'Property Recommendation AI',
      'Duplicate Lead Detection',
      'Automatic Task Creation',
      'Automatic Deal Creation',
    ],
    tech: ['n8n', 'OpenAI', 'HubSpot', 'Google Sheets', 'Google Calendar', 'Slack', 'Twilio', 'WhatsApp'],
    impact: 'Reduces manual lead qualification by over 90%.',
    github: contact.github,
    demo: contact.bookingUrl,
    gradient: 'from-accent-cyan/25 via-accent-violet/20 to-accent-fuchsia/25',
    emoji: '🏡',
    images: [
      '/projects/real-estate-lead-intake-ai.png',
      '/projects/real-estate-lead-intake-ai-2.png',
    ],
    arch: [
      {
        title: 'Capture',
        nodes: [
          { label: 'Email / Form', icon: Mail, kind: 'trigger' },
          { label: 'Webhook', icon: Webhook, kind: 'trigger' },
        ],
      },
      {
        title: 'Qualify',
        nodes: [
          { label: 'AI Scoring', icon: RiOpenaiFill, kind: 'ai' },
          { label: 'Spam Filter', icon: Bot, kind: 'ai' },
          { label: 'Duplicate Check', icon: Database, kind: 'process' },
        ],
      },
      {
        title: 'Enrich',
        nodes: [
          { label: 'Property Match', icon: RiOpenaiFill, kind: 'ai' },
          { label: 'AI Reply Draft', icon: RiOpenaiFill, kind: 'ai' },
        ],
      },
      {
        title: 'Store & Route',
        nodes: [
          { label: 'HubSpot', icon: SiHubspot, kind: 'output' },
          { label: 'Google Sheets', icon: SiGooglesheets, kind: 'output' },
          { label: 'Google Calendar', icon: SiGooglecalendar, kind: 'output' },
        ],
      },
      {
        title: 'Notify',
        nodes: [
          { label: 'Slack', icon: FaSlack, kind: 'output' },
          { label: 'WhatsApp', icon: MessageCircle, kind: 'output' },
          { label: 'Twilio', icon: Phone, kind: 'output' },
        ],
      },
    ],
  },
  {
    id: 'outreachos-linkedin-outreach',
    title: 'OutreachOS — LinkedIn Outreach',
    tagline: 'Personalized outreach at scale',
    description:
      'A complete LinkedIn outreach automation platform that manages prospects, personalizes messaging with AI and keeps your CRM perfectly in sync.',
    features: [
      'Prospect Management',
      'AI Personalization',
      'Automated Follow-ups',
      'Lead Tracking',
      'CRM Sync',
      'OpenAI Integration',
      'Google Sheets Database',
    ],
    tech: ['n8n', 'OpenAI', 'Google Sheets', 'CRM'],
    impact: 'Turns cold prospecting into a hands-off, personalized pipeline.',
    github: contact.github,
    demo: contact.bookingUrl,
    gradient: 'from-accent-violet/25 via-accent-fuchsia/20 to-accent-cyan/25',
    emoji: '🔗',
    images: ['/projects/outreachos-linkedin-outreach.png'],
    arch: [
      {
        title: 'Source',
        nodes: [
          { label: 'Prospect List', icon: Users, kind: 'trigger' },
          { label: 'Google Sheets', icon: SiGooglesheets, kind: 'trigger' },
        ],
      },
      {
        title: 'Personalize',
        nodes: [
          { label: 'AI Research', icon: RiOpenaiFill, kind: 'ai' },
          { label: 'AI Message', icon: RiOpenaiFill, kind: 'ai' },
        ],
      },
      {
        title: 'Outreach',
        nodes: [
          { label: 'LinkedIn DM', icon: Network, kind: 'process' },
          { label: 'Auto Follow-up', icon: Workflow, kind: 'process' },
        ],
      },
      {
        title: 'Sync',
        nodes: [
          { label: 'CRM Update', icon: Database, kind: 'output' },
          { label: 'Lead Tracker', icon: SiGooglesheets, kind: 'output' },
        ],
      },
    ],
  },
  {
    id: 'outreachos-follow-up-system',
    title: 'OutreachOS — Follow Up System',
    tagline: 'Never miss a follow-up again',
    description:
      'Automatically follows up with prospects on a predefined schedule, tracks responses and keeps every lead warm without manual effort.',
    features: [
      'Email Follow-up',
      'Reminder System',
      'Lead Tracking',
      'Response Monitoring',
    ],
    tech: ['n8n', 'OpenAI', 'Email', 'Google Sheets'],
    impact: 'Recovers revenue lost to forgotten follow-ups.',
    github: contact.github,
    demo: contact.bookingUrl,
    gradient: 'from-accent-emerald/25 via-accent-cyan/20 to-accent-violet/25',
    emoji: '📨',
    images: ['/projects/outreachos-follow-up-system.png'],
    arch: [
      {
        title: 'Schedule',
        nodes: [
          { label: 'Cron Trigger', icon: Calendar, kind: 'trigger' },
          { label: 'Lead Queue', icon: SiGooglesheets, kind: 'trigger' },
        ],
      },
      {
        title: 'Decide',
        nodes: [
          { label: 'Response Check', icon: Workflow, kind: 'process' },
          { label: 'AI Follow-up', icon: RiOpenaiFill, kind: 'ai' },
        ],
      },
      {
        title: 'Send',
        nodes: [{ label: 'Email', icon: Mail, kind: 'output' }],
      },
      {
        title: 'Track',
        nodes: [
          { label: 'Log Status', icon: SiGooglesheets, kind: 'output' },
          { label: 'Reminder', icon: ClipboardList, kind: 'output' },
        ],
      },
    ],
  },
  {
    id: 'upwork-job-hunt-telegram-alert',
    title: 'Upwork Job Hunt with Telegram Alert',
    tagline: 'Be first to every matching job',
    description:
      'Continuously monitors Upwork jobs and instantly pushes matching opportunities to Telegram, filtered by keywords and refined with AI.',
    features: [
      'Job Monitoring',
      'Keyword Filtering',
      'Telegram Alerts',
      'AI Filtering',
    ],
    tech: ['n8n', 'OpenAI', 'Telegram', 'Webhooks'],
    impact: 'Delivers qualified job leads in real time — zero manual searching.',
    github: contact.github,
    demo: contact.bookingUrl,
    gradient: 'from-accent-cyan/25 via-accent-emerald/20 to-accent-violet/25',
    emoji: '🔔',
    images: ['/projects/upwork-job-hunt-telegram-alert.png'],
    arch: [
      {
        title: 'Monitor',
        nodes: [
          { label: 'Upwork Feed', icon: Webhook, kind: 'trigger' },
          { label: 'Polling', icon: Calendar, kind: 'trigger' },
        ],
      },
      {
        title: 'Filter',
        nodes: [
          { label: 'Keyword Match', icon: Workflow, kind: 'process' },
          { label: 'AI Relevance', icon: RiOpenaiFill, kind: 'ai' },
        ],
      },
      {
        title: 'Alert',
        nodes: [{ label: 'Telegram', icon: SiTelegram, kind: 'output' }],
      },
    ],
  },
  {
    id: 'domain-outreach-engine',
    title: 'Domain Outreach Engine',
    tagline: 'AI-powered outbound for premium domains',
    description:
      'An AI-powered outbound system that discovers premium domain buyers and automates hyper-personalized outreach end to end.',
    features: [
      'Lead Discovery',
      'Email Automation',
      'CRM Tracking',
      'AI Personalization',
    ],
    tech: ['n8n', 'OpenAI', 'Email', 'CRM'],
    impact: 'Automates prospecting and outreach for high-value domain sales.',
    github: contact.github,
    demo: contact.bookingUrl,
    gradient: 'from-accent-fuchsia/25 via-accent-violet/20 to-accent-cyan/25',
    emoji: '🌐',
    images: ['/projects/domain-outreach-engine.png'],
    arch: [
      {
        title: 'Discover',
        nodes: [
          { label: 'Domain Scan', icon: Network, kind: 'trigger' },
          { label: 'Buyer Lookup', icon: Users, kind: 'trigger' },
        ],
      },
      {
        title: 'Personalize',
        nodes: [
          { label: 'AI Research', icon: RiOpenaiFill, kind: 'ai' },
          { label: 'AI Pitch', icon: RiOpenaiFill, kind: 'ai' },
        ],
      },
      {
        title: 'Outreach',
        nodes: [{ label: 'Email Sequence', icon: Mail, kind: 'output' }],
      },
      {
        title: 'Track',
        nodes: [
          { label: 'CRM', icon: Database, kind: 'output' },
          { label: 'Pipeline Log', icon: SiGooglesheets, kind: 'output' },
        ],
      },
    ],
  },
  {
    id: 'ai-job-application-tracker',
    title: 'AI Job Application Tracker',
    tagline: 'Your job search on autopilot',
    description:
      'Tracks job applications automatically, organizes statuses and keeps interview stages up to date without any manual bookkeeping.',
    features: [
      'Job Tracker',
      'Interview Tracker',
      'Application Status',
      'Automatic Updates',
    ],
    tech: ['n8n', 'OpenAI', 'Google Sheets'],
    impact: 'Keeps every application organized and up to date automatically.',
    github: contact.github,
    demo: contact.bookingUrl,
    gradient: 'from-accent-violet/25 via-accent-cyan/20 to-accent-emerald/25',
    emoji: '🗂️',
    images: ['/projects/ai-job-application-tracker.png'],
    arch: [
      {
        title: 'Capture',
        nodes: [
          { label: 'Application Email', icon: Mail, kind: 'trigger' },
          { label: 'Form Submit', icon: Webhook, kind: 'trigger' },
        ],
      },
      {
        title: 'Classify',
        nodes: [
          { label: 'AI Parse', icon: RiOpenaiFill, kind: 'ai' },
          { label: 'Stage Detect', icon: Workflow, kind: 'process' },
        ],
      },
      {
        title: 'Organize',
        nodes: [
          { label: 'Status Update', icon: ClipboardList, kind: 'process' },
          { label: 'Interview Log', icon: Calendar, kind: 'process' },
        ],
      },
      {
        title: 'Store',
        nodes: [{ label: 'Google Sheets', icon: SiGooglesheets, kind: 'output' }],
      },
    ],
  },
];

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
