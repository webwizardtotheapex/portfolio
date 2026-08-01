import { AnimatedBackground } from '@/components/AnimatedBackground';
import { SpotlightCursor } from '@/components/SpotlightCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { Skills } from '@/components/sections/Skills';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

/**
 * Single-page portfolio. Sections are stacked in narrative order:
 * Hero → About → Projects (Workflow Gallery) → Services → Skills →
 * Testimonials → CTA → Contact → Footer.
 */
export default function HomePage() {
  return (
    <>
      {/* Global visual layers (fixed, behind everything) */}
      <AnimatedBackground />
      <SpotlightCursor />
      <ScrollProgress />

      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <Services />
        <Skills />
        <Testimonials />
        <CTA />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
