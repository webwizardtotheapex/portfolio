import type { Metadata, Viewport } from 'next';
import { Inter, Sora, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

/* -------------------------------------------------------------------------- */
/*                                   Fonts                                     */
/* -------------------------------------------------------------------------- */

// Body font.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Display font for headings.
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Monospace for code-like accents.
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

/* -------------------------------------------------------------------------- */
/*                                    SEO                                      */
/* -------------------------------------------------------------------------- */

// Public site URL — override with NEXT_PUBLIC_SITE_URL at build time.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soldevhassan.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'Isa Hassan — AI Automation Engineer | n8n Expert & OpenAI Developer',
    template: '%s | Isa Hassan',
  },
  description:
    'Isa Hassan is an AI Automation Engineer and n8n expert building intelligent workflow automation with OpenAI, HubSpot, Slack, Twilio and Google Workspace. Save hundreds of hours a month with AI-powered automations.',
  keywords: [
    'AI Automation Engineer',
    'n8n Expert',
    'Workflow Automation',
    'OpenAI Developer',
    'HubSpot Automation',
    'AI Consultant',
    'AI Agents',
    'CRM Automation',
    'Lead Generation Automation',
    'Business Process Automation',
    'Isa Hassan',
  ],
  authors: [{ name: 'Isa Hassan' }],
  creator: 'Isa Hassan',
  publisher: 'Isa Hassan',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Isa Hassan — AI Automation Engineer',
    title: 'Isa Hassan — AI Automation Engineer | n8n & OpenAI Expert',
    description:
      'Building AI automations that save businesses hundreds of hours every month. n8n, OpenAI, HubSpot, Slack, Twilio & AI Agents.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Isa Hassan — AI Automation Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Isa Hassan — AI Automation Engineer',
    description:
      'Building AI automations that save businesses hundreds of hours every month with n8n, OpenAI & AI Agents.',
    creator: '@SolDevHassan',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/toyslab-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#050811',
  width: 'device-width',
  initialScale: 1,
};

/* -------------------------------------------------------------------------- */
/*                             Structured data                                */
/* -------------------------------------------------------------------------- */

// JSON-LD Person schema improves how search engines understand the site.
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Isa Hassan',
  jobTitle: 'AI Automation Engineer',
  description:
    'AI Automation Engineer specializing in n8n, OpenAI, HubSpot and intelligent workflow automation.',
  url: siteUrl,
  knowsAbout: [
    'AI Automation',
    'n8n',
    'OpenAI API',
    'Workflow Automation',
    'HubSpot Automation',
    'AI Agents',
    'CRM Automation',
  ],
  sameAs: [
    'https://www.linkedin.com/in/isa-hassan-automation/',
    'https://github.com/webwizardtotheapex',
    'https://x.com/SolDevHassan',
    'https://t.me/totheapex',
  ],
};

// Runs before hydration to set the theme class, avoiding a flash of the wrong
// theme. Dark is the default; a stored choice ('light'/'dark') overrides it.
const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${sora.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        {/* SEO structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
