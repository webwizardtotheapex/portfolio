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
        eyebrow="Services"
        title={
          <>
            Automation services that{' '}
            <span className="text-gradient">move the needle</span>
          </>
        }
        description="From a single workflow to a fully automated back office — here's how I help businesses run leaner and grow faster."
      />

      <Stagger className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <StaggerItem key={service.title}>
            <GlassCard
              gradientBorder
              className="group relative h-full overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Hover glow that blooms from the corner */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />

              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-accent-cyan transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white group-hover:shadow-glow">
                  <service.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {service.description}
                </p>
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Inline CTA */}
      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-white/60">
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
