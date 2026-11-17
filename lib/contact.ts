/**
 * Contact + booking details.
 *
 * Kept in its own leaf module (no imports) so that BOTH lib/data.ts and
 * lib/projects.ts can use it without creating a circular import:
 *
 *   data.ts ──re-exports──▶ projects.ts ──imports──▶ contact.ts (leaf)
 *      └──────────────────imports───────────────────▶ contact.ts (leaf)
 *
 * lib/data.ts re-exports `contact` from here, so components keep importing
 * `{ contact }` from '@/lib/data' unchanged.
 */
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
  bookingUrl:
    'https://wa.me/2348139299686?text=Hi%20Isa%2C%20I%27d%20like%20to%20book%20a%20call%20about%20AI%20automation.',
} as const;
