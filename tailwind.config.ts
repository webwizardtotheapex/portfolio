import type { Config } from 'tailwindcss';

/**
 * Tailwind design system for the portfolio.
 * Theme-aware via CSS variables that flip on the `.dark` class. The palette
 * uses the Toyslab cyan-to-emerald identity on obsidian surfaces.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Semantic tokens driven by CSS variables (light ⇄ dark). */
        fg: 'rgb(var(--fg) / <alpha-value>)',
        'fg-muted': 'rgb(var(--fg-muted) / <alpha-value>)',
        'fg-subtle': 'rgb(var(--fg-subtle) / <alpha-value>)',
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-hover': 'rgb(var(--surface-hover) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',

        /* Theme-aware accents; fixed brand colors retain button contrast. */
        accent: {
          primary: 'rgb(var(--accent-primary) / <alpha-value>)',
          sky: 'rgb(var(--accent-sky) / <alpha-value>)',
          success: 'rgb(var(--accent-success) / <alpha-value>)',
        },
        brand: {
          cyan: 'rgb(var(--brand-cyan) / <alpha-value>)',
          emerald: 'rgb(var(--brand-emerald) / <alpha-value>)',
        },

        /* Legacy base-* tokens remapped for compat (most files use these). */
        base: {
          950: 'rgb(var(--bg) / <alpha-value>)',
          900: 'rgb(var(--surface) / <alpha-value>)',
          800: 'rgb(var(--surface-hover) / <alpha-value>)',
        },

        /* Legacy accent-* remapped. */
        'accent-cyan': 'rgb(var(--accent-primary) / <alpha-value>)',
        'accent-violet': 'rgb(var(--accent-sky) / <alpha-value>)',
        'accent-emerald': 'rgb(var(--accent-success) / <alpha-value>)',
        'accent-fuchsia': 'rgb(var(--accent-sky) / <alpha-value>)',

        /* Fixed tokens for elements on always-dark overlays (image pills,
           gradient buttons, logo chip): snow = always white, ink = always
           dark. These never flip with the theme. */
        snow: '#ffffff',
        ink: '#050811',
      },
      fontFamily: {
        sans: ['var(--font-sans, system-ui)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display, system-ui)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono, ui-monospace)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(110deg, rgb(var(--brand-cyan)), rgb(var(--brand-emerald)))',
        'grid-pattern':
          'linear-gradient(to right, rgb(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--border) / 0.4) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 4px 24px -6px rgb(var(--accent-primary) / 0.16)',
        'glow-cyan': '0 4px 24px -6px rgb(var(--accent-primary) / 0.2)',
        'glow-strong': '0 6px 30px -6px rgb(var(--accent-primary) / 0.3)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-24px) translateX(12px)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 20px) scale(0.95)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'float-card': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
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
        shimmer: 'shimmer 6s linear infinite',
        'float-card': 'float-card 6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
      /* Remap `white` utilities to the theme foreground so existing
         text-white / bg-white/x / border-white/x classes flip per mode.
         `black` is intentionally left literal — image overlays stay dark. */
      textColor: {
        white: 'rgb(var(--fg) / <alpha-value>)',
      },
      backgroundColor: {
        white: 'rgb(var(--fg) / <alpha-value>)',
      },
      borderColor: {
        white: 'rgb(var(--fg) / <alpha-value>)',
      },
      ringColor: {
        white: 'rgb(var(--fg) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};

export default config;
