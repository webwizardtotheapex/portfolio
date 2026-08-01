import type { Config } from 'tailwindcss';

/**
 * Tailwind design system for the portfolio.
 * Centralizes the brand palette, typography, animations and glow effects
 * so every component pulls from a single source of truth.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep, near-black backgrounds with subtle blue undertone.
        base: {
          950: '#05060a',
          900: '#0a0b14',
          800: '#0f111d',
          700: '#151827',
        },
        // Signature accent gradient stops.
        accent: {
          cyan: '#22d3ee',
          violet: '#8b5cf6',
          fuchsia: '#d946ef',
          emerald: '#34d399',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(120deg, #22d3ee 0%, #8b5cf6 50%, #d946ef 100%)',
        'grid-pattern':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(139, 92, 246, 0.5)',
        'glow-cyan': '0 0 40px -8px rgba(34, 211, 238, 0.55)',
        'glow-strong': '0 0 60px -5px rgba(139, 92, 246, 0.65)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      keyframes: {
        // Slow drifting background orbs.
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-24px) translateX(12px)' },
        },
        // Aurora blob movement.
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 20px) scale(0.95)' },
        },
        // Moving gradient for animated text/borders.
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        // Subtle vertical bob for floating cards.
        'float-card': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Marquee for the skills ticker.
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        aurora: 'aurora 18s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'float-card': 'float-card 6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
