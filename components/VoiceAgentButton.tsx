'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Mic, MicOff, Phone, PhoneOff, Volume2, X } from 'lucide-react';
import { RetellClient, type WebCallSession } from 'retell-client-js-sdk';
import { GlowButton } from '@/components/GlowButton';
import { loadRecaptchaScript, recaptchaSiteKey, waitForRecaptcha } from '@/lib/recaptcha';

const publicKey =
  process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY ||
  'public_key_c5ea915e80c2d5bce52f9';
const agentId =
  process.env.NEXT_PUBLIC_RETELL_AGENT_ID || 'agent_1060e1b434f8c10d88ee792574';

type CallState = 'idle' | 'connecting' | 'live';

function callErrorMessage(error: unknown): string {
  const name = error instanceof Error ? error.name : '';
  const message = error instanceof Error ? error.message : String(error);

  if (
    name === 'NotAllowedError' ||
    name === 'PermissionDeniedError' ||
    /permission denied|permission dismissed|notallowederror|microphone.*denied/i.test(message)
  ) {
    return 'Microphone access was denied. Allow it in your browser’s site settings, then try again.';
  }
  if (name === 'NotFoundError' || /requested device not found|no microphone/i.test(message)) {
    return 'No microphone was found. Connect a microphone, then try again.';
  }
  if (name === 'NotReadableError' || /could not start audio source/i.test(message)) {
    return 'Your microphone is unavailable. Close other apps using it, then try again.';
  }
  return 'The voice call could not connect. Check your connection and try again.';
}

/** Browser-only sessions; no server token exchange is needed for a public key. */
export function VoiceAgentButton() {
  const [state, setState] = useState<CallState>('idle');
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<RetellClient | null>(null);
  const sessionRef = useRef<WebCallSession | null>(null);
  const attemptRef = useRef<AbortController | null>(null);
  // A hydrated click can arrive before passive effects; allow that first click.
  const mountedRef = useRef(true);
  const widgetRef = useRef<HTMLElement | null>(null);

  function updateCallState(nextState: CallState) {
    const hadFocus = widgetRef.current?.contains(document.activeElement);
    setState(nextState);
    if (hadFocus) {
      requestAnimationFrame(() => {
        // Restore focus only when a replaced control left focus on the body.
        // Never steal it from another element the visitor has selected.
        if (mountedRef.current && document.activeElement === document.body) {
          widgetRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
        }
      });
    }
  }

  useEffect(() => {
    mountedRef.current = true;
    // Load Google's browser script early; execution stays in the click handler.
    void loadRecaptchaScript().catch(() => {});
    return () => {
      mountedRef.current = false;
      attemptRef.current?.abort();
      attemptRef.current = null;
      const session = sessionRef.current;
      sessionRef.current = null;
      // Also cancel sessions that are still waiting for permission/signaling.
      if (session) void session.end().catch(() => {});
      clientRef.current = null;
    };
  }, []);

  async function startCall() {
    // The ref closes the gap before React renders the connecting state.
    if (attemptRef.current || sessionRef.current || !mountedRef.current) return;
    setError(null);

    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setError('Voice calls need HTTPS and a browser with microphone support. Try Chrome, Safari, or Firefox.');
      return;
    }

    updateCallState('connecting');
    setMuted(false);
    const attempt = new AbortController();
    attemptRef.current = attempt;
    let verified = false;

    try {
      await waitForRecaptcha(loadRecaptchaScript(), attempt.signal);
      if (attempt.signal.aborted || !mountedRef.current) return;
      await waitForRecaptcha(
        new Promise<void>((resolve) => window.grecaptcha!.ready(resolve)),
        attempt.signal,
      );
      if (attempt.signal.aborted || !mountedRef.current) return;
      if (typeof window.grecaptcha?.execute !== 'function') {
        throw new Error('Call verification is unavailable.');
      }
      // Fresh, single-use verification immediately before this call is created.
      const recaptchaToken = await waitForRecaptcha(
        window.grecaptcha!.execute(recaptchaSiteKey, { action: 'retell_web_call' }),
        attempt.signal,
      );
      if (attempt.signal.aborted || !mountedRef.current || attemptRef.current !== attempt) return;
      if (!recaptchaToken) throw new Error('Call verification returned no token.');
      verified = true;

      // Construct only after a browser click, never during static prerendering.
      const client = clientRef.current ?? new RetellClient({ key: publicKey });
      clientRef.current = client;

      // SDK 3.x returns immediately and defers hooks to a microtask. Its
      // recaptchaToken option sends the token in the g-recaptcha-response header.
      const session = client.createWebCall({
        agent_id: agentId,
        recaptchaToken,
        hooks: {
          onStatus: (status) => {
            if (!mountedRef.current || sessionRef.current !== session) return;
            if (status === 'live') updateCallState('live');
            if (status === 'connecting') updateCallState('connecting');
          },
          onEnd: () => {
            if (!mountedRef.current || sessionRef.current !== session) return;
            sessionRef.current = null;
            updateCallState('idle');
            setMuted(false);
          },
          onError: (callError) => {
            if (!mountedRef.current || sessionRef.current !== session) return;
            sessionRef.current = null;
            setError(callErrorMessage(callError));
            updateCallState('idle');
            setMuted(false);
            // Some transport errors are nonterminal. Release the mic on error.
            void session.end().catch(() => {});
          },
        },
      });
      sessionRef.current = session;
    } catch (callError) {
      if (attempt.signal.aborted || !mountedRef.current || attemptRef.current !== attempt) return;
      updateCallState('idle');
      setError(verified
        ? callErrorMessage(callError)
        : 'Call verification could not complete. Check your connection and try again.');
    } finally {
      if (attemptRef.current === attempt) attemptRef.current = null;
    }
  }

  function endCall() {
    attemptRef.current?.abort();
    attemptRef.current = null;
    const session = sessionRef.current;
    // Invalidate old hooks before allowing a new call.
    sessionRef.current = null;
    updateCallState('idle');
    setMuted(false);
    if (!session) return;
    void session.end().catch(() => {
      session.disconnect();
      if (mountedRef.current && !sessionRef.current) {
        setError('The call disconnected. Please try again.');
      }
    });
  }

  function toggleMute() {
    const session = sessionRef.current;
    if (!session || state !== 'live') return;
    try {
      if (muted) session.unmute();
      else session.mute();
      setMuted(!muted);
    } catch (callError) {
      setError(callErrorMessage(callError));
    }
  }

  function enableAudio() {
    // A fresh user gesture recovers playback if the browser blocked autoplay.
    const session = sessionRef.current;
    if (!session) return;
    void session.startAudioPlayback().catch(() => {
      if (mountedRef.current && sessionRef.current === session) {
        setError('Speaker audio was blocked. Click Enable audio to try again.');
      }
    });
  }

  return (
    <aside
      ref={widgetRef}
      aria-label="SolDevHassan AI voice call"
      className="voice-agent-widget fixed bottom-6 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]"
    >
      <p role="status" aria-live="polite" className="sr-only">
        {state === 'connecting'
          ? 'Connecting to SolDevHassan AI.'
          : state === 'live'
            ? `Voice call active. Microphone ${muted ? 'muted' : 'on'}.`
            : 'Voice call idle.'}
      </p>

      {error && (
        <div role="alert" className="mb-3 flex items-start gap-2 rounded-xl border border-accent-primary/30 bg-surface p-3 text-xs leading-relaxed text-fg shadow-glow">
          <AlertCircle aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent-primary" />
          <p className="min-w-0 flex-1">{error}</p>
          <button
            type="button"
            aria-label="Dismiss voice call error"
            onClick={() => setError(null)}
            className="workflow-control -mr-2 -mt-2 shrink-0"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      )}

      {state === 'idle' ? (
        <GlowButton type="button" variant="secondary" size="sm" onClick={startCall} className="w-full bg-surface py-4 text-[13px] shadow-glow" leftIcon={<Phone aria-hidden="true" className="h-4 w-4 text-accent-primary" />}>
          <span className="flex items-center gap-2 text-left">
            <span>Talk to SolDevHassan AI</span>
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-accent-success" />
          </span>
        </GlowButton>
      ) : (
        <div className="rounded-2xl border border-accent-primary/25 bg-surface p-3 shadow-glow">
          <div className="flex items-center gap-3 px-1 pb-3 pt-1">
            <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-accent-success motion-reduce:animate-none" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-semibold text-fg">
                {state === 'connecting' ? 'Connecting...' : 'SolDevHassan AI'}
              </p>
              <p className="mt-0.5 text-xs text-fg-muted">
                {state === 'connecting' ? 'Preparing your voice call' : muted ? 'Your microphone is muted' : 'Voice call active'}
              </p>
            </div>
            {state === 'live' && (
              <button
                type="button"
                onClick={enableAudio}
                aria-label="Enable audio"
                title="Enable speaker audio"
                className="workflow-control shrink-0"
              >
                <Volume2 aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            {state === 'live' && (
              <GlowButton type="button" variant="secondary" size="sm" onClick={toggleMute} aria-pressed={muted} aria-label="Mute microphone" className="flex-1" leftIcon={muted ? <MicOff aria-hidden="true" className="h-4 w-4" /> : <Mic aria-hidden="true" className="h-4 w-4" />}>
                {muted ? 'Unmute' : 'Mute'}
              </GlowButton>
            )}
            <GlowButton key="end-call" type="button" variant="primary" size="sm" onClick={endCall} className="flex-1" leftIcon={<PhoneOff aria-hidden="true" className="h-4 w-4" />}>
              {state === 'connecting' ? 'Cancel Call' : 'End Call'}
            </GlowButton>
          </div>
        </div>
      )}
    </aside>
  );
}
