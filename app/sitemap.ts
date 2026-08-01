import type { MetadataRoute } from 'next';

// Statically generated sitemap. With `output: 'export'` Next.js writes this
// out to /sitemap.xml at build time (no server required).
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://soldevhassan.com';
  return [
    {
      url: base,
      lastModified: new Date('2026-07-31'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
