'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  /**
   * Height utility class for the logo image (width scales automatically to
   * preserve the ~2.5:1 aspect ratio). Default suits the navbar.
   */
  heightClass?: string;
  /**
   * Wrap the logo in a light rounded "chip". The logo's wordmark uses dark
   * green + blue, which needs a light backdrop to stay legible on the dark
   * theme. Enabled by default.
   */
  chip?: boolean;
  className?: string;
  priority?: boolean;
}

/**
 * Toyslab Tech brand logo. Renders the transparent PNG (auto-cropped from the
 * source) inside an optional light chip. Reused in the navbar and footer so
 * branding stays consistent in one place.
 */
export function Logo({
  heightClass = 'h-9',
  chip = true,
  className,
  priority = false,
}: LogoProps) {
  const img = (
    <Image
      src="/logo.png"
      alt="Toyslab Tech and Innovations Ltd."
      // Intrinsic size from the processed asset; CSS controls display size.
      width={774}
      height={305}
      priority={priority}
      className={cn('w-auto object-contain', heightClass)}
    />
  );

  if (!chip) {
    return <span className={cn('inline-flex items-center', className)}>{img}</span>;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-xl bg-white/95 px-3 py-1.5 shadow-glass ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-glow',
        className
      )}
    >
      {img}
    </span>
  );
}
