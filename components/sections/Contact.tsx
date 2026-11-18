'use client';

import { Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import { contact, socials, personal } from '@/lib/data';
import { SectionHeading } from '../SectionHeading';
import { GlassCard } from '../GlassCard';
import { Reveal, Stagger, StaggerItem } from '../Reveal';
import { GlowLink } from '../GlowButton';

/**
 * Contact section — primary contact methods plus the full set of social
 * links as tappable glass cards. No backend form (static export friendly):
 * every action is a mailto / deep link that works on GitHub Pages.
 */
export function Contact() {
  return (
    <section id="contact" className="section">
      <SectionHeading
        centered={false}
        eyebrow="Get In Touch"
        title={
          <>
            Let&apos;s automate{' '}
            <span className="text-gradient">something great</span>
          </>
        }
        description="Have a workflow in mind or a process you're tired of doing by hand? Reach out — I usually reply within a day."
      />

      <div className="mt-10 grid min-w-0 grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Primary contact card */}
        <Reveal direction="right">
          <GlassCard strong className="flex h-full min-w-0 flex-col justify-between p-6 sm:p-8 lg:p-9">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-fg">
                Start a conversation
              </h3>
              <p className="mt-3 text-sm leading-[1.85] text-fg-muted">
                Tell me about your business and the tasks eating up your team&apos;s
                time. I&apos;ll show you exactly what can be automated.
              </p>

              {/* Direct methods */}
              <div className="mt-7 space-y-3">
                <ContactRow
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                />
                <ContactRow
                  icon={<MessageSquare className="h-5 w-5" />}
                  label="WhatsApp"
                  value={contact.whatsapp}
                  href={contact.whatsappLink}
                />
                <ContactRow
                  icon={<MapPin className="h-5 w-5" />}
                  label="Location"
                  value={personal.location}
                />
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <GlowLink
                href={contact.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                rightIcon={<Send className="h-4 w-4" />}
                className="w-full sm:w-auto"
              >
                Book a Call
              </GlowLink>
              <GlowLink
                href={`mailto:${contact.email}`}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Email Me
              </GlowLink>
            </div>
          </GlassCard>
        </Reveal>

        {/* Social grid */}
        <Stagger className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 lg:gap-4">
          {socials.map((s) => (
            <StaggerItem key={s.label} className="h-full">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full min-w-0 rounded-[1.25rem]"
              >
                <GlassCard
                  gradientBorder
                  className="flex h-full min-w-0 flex-col justify-between p-4 sm:p-5 lg:p-6"
                >
                  <span className="icon-container h-11 w-11 text-fg-muted">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="mt-5 min-w-0">
                    <p className="text-sm font-semibold text-white">{s.label}</p>
                    <p className="mt-1 text-[10px] leading-[1.75] text-fg-subtle [overflow-wrap:anywhere] sm:text-[11px]">
                      {s.handle}
                    </p>
                  </div>
                </GlassCard>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** A single labelled contact method row (optionally a link). */
function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex min-w-0 items-center gap-3.5 py-2">
      <span className="icon-container h-11 w-11">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">{label}</p>
        <p className="mt-1 text-sm font-medium leading-relaxed text-fg [overflow-wrap:anywhere]">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block min-h-11 rounded-xl transition-colors hover:bg-white/[0.03]"
    >
      {content}
    </a>
  );
}
