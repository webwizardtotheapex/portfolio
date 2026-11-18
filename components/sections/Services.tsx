'use client';

import { ArrowRight } from 'lucide-react';
import { services, contact } from '@/lib/data';
import { SectionHeading } from '../SectionHeading';
import { GlassCard } from '../GlassCard';
import { Stagger, StaggerItem, Reveal } from '../Reveal';
import { GlowLink } from '../GlowButton';

/**
 * Services grid — every offering rendered as a floating glass card with an
 * icon that lifts and glows on hover.
 */
export function Services() {
  return (
    <section id="services" className="section">
      <SectionHeading
        centered={false}
        eyebrow="Services"
        title={
          <>
            Automation services that{' '}
            <span className="text-gradient">move the needle</span>
          </>
        }
        description="From a single workflow to a fully automated back office — here's how I help businesses run leaner and grow faster."
      />

      <Stagger className="mt-10 grid min-w-0 grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <StaggerItem key={service.title}>
            <GlassCard
              gradientBorder
              className="group relative h-full overflow-hidden p-6"
            >
              {/* Hover glow that blooms from the corner */}
              <div className="service-ambient pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <span className="icon-container h-12 w-12">
                  <service.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-base font-semibold leading-relaxed tracking-tight text-fg">
                  {service.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.85] text-fg-muted">
                  {service.description}
                </p>
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Inline CTA */}
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-xl border border-white/[0.08] bg-surface/40 p-5 sm:flex-row sm:items-center sm:p-6">
          <p className="text-sm leading-relaxed text-fg-muted">
            Not sure which automation you need?{' '}
            <span className="text-white">Let&apos;s figure it out together.</span>
          </p>
          <GlowLink
            href={contact.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Get a Free Automation Audit
          </GlowLink>
        </div>
      </Reveal>
    </section>
  );
}
