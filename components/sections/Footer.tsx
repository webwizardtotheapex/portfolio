'use client';

import { ArrowUp } from 'lucide-react';
import { socials, navItems, personal, contact } from '@/lib/data';
import { Logo } from '../Logo';

/**
 * Site footer — brand blurb, quick nav, all social icons and a back-to-top
 * button. Keeps the premium feel right down to the last pixel.
 */
export function Footer() {
  const year = 2026; // Static export: avoid runtime Date for deterministic output.

  return (
    <footer className="voice-agent-clearance relative mt-6 border-t border-white/[0.08] bg-surface/45">
      <div className="mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 gap-x-16 gap-y-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,1fr)] lg:py-16">
        {/* Brand */}
        <div className="min-w-0 md:col-span-2 lg:col-span-1">
          <a href="#home" aria-label="Toyslab Tech — home" className="inline-flex min-h-11 rounded-xl">
            <Logo heightClass="h-9" />
          </a>
          <p className="mt-5 max-w-sm text-[13px] leading-[1.85] text-fg-muted">
            {personal.role} — {personal.shortBio}
          </p>

          {/* Social icons */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-bg/30 text-fg-muted transition-[color,border-color,background-color] duration-200 hover:border-accent-primary/40 hover:bg-accent-primary/[0.06] hover:text-accent-primary"
              >
                <s.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-fg-subtle">
            Navigate
          </h4>
          <ul className="mt-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 min-w-11 items-center rounded-md text-[13px] text-fg-muted transition-colors hover:text-accent-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-fg-subtle">
            Contact
          </h4>
          <ul className="mt-3 space-y-1 text-[13px]">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-11 items-center rounded-md text-fg-muted transition-colors hover:text-accent-primary [overflow-wrap:anywhere]"
              >
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-md text-fg-muted transition-colors hover:text-accent-primary"
              >
                WhatsApp · {contact.whatsapp}
              </a>
            </li>
            <li className="pt-2 text-fg-subtle">{personal.location}</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8">
          <p className="text-center font-mono text-[10px] leading-relaxed text-fg-subtle sm:text-left">
            © {year} {personal.name} · Toyslab Tech and Innovations Ltd. (RC 9053103).
          </p>
          <a
            href="#home"
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-white/[0.08] bg-bg/30 px-4 py-2 text-xs font-medium text-fg-muted transition-[color,border-color,background-color] hover:border-accent-primary/40 hover:text-fg"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
