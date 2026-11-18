'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LoaderCircle, Workflow } from 'lucide-react';
import { cn } from '@/lib/utils';

// Matches the section gutters, two-column gap, and max-w-7xl container.
const CARD_SIZES = '(min-width: 1280px) 592px, (min-width: 1024px) calc((100vw - 96px) / 2), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)';

export function WorkflowScreenshot({
  src,
  alt,
  sizes = CARD_SIZES,
  loading = 'lazy',
}: {
  src: string;
  alt: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imageSrc = src.startsWith('/') ? (process.env.NEXT_PUBLIC_BASE_PATH ?? '') + src : src;

  if (failed) {
    return (
      <div role="status" className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-fg-muted">
        <Workflow className="h-10 w-10 text-accent-sky" aria-hidden="true" />
        <p className="text-sm font-medium text-fg">Screenshot unavailable</p>
        <p className="text-xs">This screenshot could not be loaded.</p>
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div role="status" className="pointer-events-none absolute inset-0 flex items-center justify-center bg-bg/80">
          <LoaderCircle className="h-6 w-6 animate-spin text-accent-sky motion-reduce:animate-none" aria-hidden="true" />
          <span className="sr-only">Loading screenshot</span>
        </div>
      )}
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes={sizes}
        loading={loading}
        decoding="async"
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={cn('workflow-screenshot object-contain p-2 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none sm:p-3', loaded ? 'opacity-100' : 'opacity-0')}
      />
    </>
  );
}
