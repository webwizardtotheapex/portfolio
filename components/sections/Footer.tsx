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
    <footer className="relative mt-10 border-t border-white/10 bg-base-900/40">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <a href="#home" aria-label="Toyslab Tech — home" className="inline-flex">
            <Logo heightClass="h-11" />
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
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
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-gradient hover:text-white hover:shadow-glow"
              >
                <s.icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">
            Navigate
          </h4>
          <ul className="mt-4 space-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">
            Contact
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="break-all text-white/60 transition-colors hover:text-white"
              >
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-white"
              >
                WhatsApp · {contact.whatsapp}
              </a>
            </li>
            <li className="text-white/60">{personal.location}</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8">
          <p className="text-xs text-white/45">
            © {year} {personal.name} · Toyslab Tech and Innovations Ltd. (RC 9053103).
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 transition-all hover:border-white/25 hover:text-white"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
