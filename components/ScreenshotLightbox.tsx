'use client';

import { useEffect, useRef, type MouseEvent, type KeyboardEvent } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Project } from '@/lib/data';
import { WorkflowScreenshot } from './WorkflowScreenshot';

/** Native top-layer dialog supplies background inertness; Tab wraps within its controls. */
export function ScreenshotLightbox({
  project,
  index,
  onIndex,
  onClose,
}: {
  project: Project;
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const images = project.images ?? [];
  const originalSrc = images[index]?.startsWith('/') ? (process.env.NEXT_PUBLIC_BASE_PATH ?? '') + images[index] : images[index];
  const titleId = project.id + '-lightbox-title';
  const helpId = project.id + '-lightbox-help';
  const go = (direction: number) => onIndex((index + direction + images.length) % images.length);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === 'Tab' && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]'));
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (first && last && event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (first && last && !event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.altKey || event.ctrlKey || event.metaKey || images.length < 2 || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    go(event.key === 'ArrowLeft' ? -1 : 1);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={helpId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      className="workflow-dialog m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-6xl overflow-hidden rounded-2xl border border-border bg-surface p-0 text-fg shadow-glow"
    >
      <div className="flex max-h-[calc(100dvh_-_2rem)] min-w-0 flex-col">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border/70 p-4 sm:p-5">
          <h2 id={titleId} className="min-w-0 break-words font-display text-sm font-semibold leading-relaxed sm:text-base">{project.title}</h2>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close screenshot preview" className="workflow-control shrink-0">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <p id={helpId} className="sr-only">Use the Left and Right arrow keys to browse screenshots. Press Escape to close.</p>
        <div className="relative h-[65dvh] max-h-[42rem] min-h-0 shrink bg-bg">
          <WorkflowScreenshot
            key={images[index]}
            src={images[index]}
            alt={project.title + ' — screenshot ' + (index + 1) + ' of ' + images.length}
            sizes="(min-width: 1152px) 1152px, calc(100vw - 32px)"
            loading="eager"
          />
        </div>
        <div className="shrink-0 border-t border-border/70 p-3 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <button type="button" onClick={() => go(-1)} disabled={images.length < 2} aria-label="Previous screenshot in preview" className="workflow-control disabled:opacity-50">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="text-xs font-medium text-fg-muted" aria-live="polite" aria-atomic="true">Screenshot {index + 1} of {images.length}</p>
            <button type="button" onClick={() => go(1)} disabled={images.length < 2} aria-label="Next screenshot in preview" className="workflow-control disabled:opacity-50">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-2 flex justify-center">
            <a href={originalSrc} target="_blank" rel="noopener noreferrer" className="workflow-control gap-2 px-3 text-xs font-medium text-fg-muted">
              View full resolution
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <p className="mt-2 text-center text-xs leading-relaxed text-fg-muted">{project.tagline}</p>
        </div>
      </div>
    </dialog>
  );
}
