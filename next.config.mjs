/**
 * Next.js configuration — optimized for a fully static export
 * that can be hosted on GitHub Pages (no server, no API routes).
 *
 * GitHub Pages serves a project site under a sub-path, e.g.
 *   https://<user>.github.io/<repo>/
 * To make asset URLs and routing resolve correctly there, set the
 * BASE_PATH env var to "/<repo>" at build time. For a user/organization
 * page or a custom domain served at the root, leave it empty.
 *
 *   BASE_PATH=/my-repo npm run build
 */

// Normalize the base path (must start with "/" and not end with "/").
const rawBase = process.env.BASE_PATH ?? '';
const basePath = rawBase && !rawBase.startsWith('/') ? `/${rawBase}` : rawBase;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site into the `out/` directory.
  output: 'export',

  // Add trailing slashes so each route becomes `route/index.html`,
  // which GitHub Pages serves reliably without server rewrites.
  trailingSlash: true,

  // Sub-path support for project pages.
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  // next/image optimization requires a server; disable it for static export.
  images: {
    unoptimized: true,
  },

  // Expose the base path to the client for building manual asset URLs.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  reactStrictMode: true,
};

export default nextConfig;
