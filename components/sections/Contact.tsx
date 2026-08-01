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
        eyebrow="Get In Touch"
        title={
          <>
            Let&apos;s automate{' '}
            <span className="text-gradient">something great</span>
          </>
        }
        description="Have a workflow in mind or a process you're tired of doing by hand? Reach out — I usually reply within a day."
      />

      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
        {/* Primary contact card */}
        <Reveal direction="right">
          <GlassCard strong className="flex h-full flex-col justify-between p-8 md:p-10">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                Start a conversation
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Tell me about your business and the tasks eating up your team&apos;s
                time. I&apos;ll show you exactly what can be automated.
              </p>

              {/* Direct methods */}
              <div className="mt-8 space-y-4">
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
        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          {socials.map((s) => (
            <StaggerItem key={s.label} className="h-full">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <GlassCard
                  gradientBorder
                  className="flex h-full flex-col justify-between p-6 transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white group-hover:shadow-glow">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-white">{s.label}</p>
                    <p className="mt-0.5 truncate text-xs text-white/50">
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
    <div className="flex items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent-cyan">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-white/40">{label}</p>
        <p className="truncate text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl transition-colors hover:bg-white/5"
    >
      {content}
    </a>
  );
}
