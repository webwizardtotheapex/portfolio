export const recaptchaSiteKey =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  '6LeurjAuAAAAABJTK9xpKavwPEJ_6rfNxws_s-Vv';

interface RecaptchaV3 {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: RecaptchaV3;
  }
}

// This promise is created only in the browser and shared across StrictMode
// effects/remounts. Tokens are never cached: each click executes reCAPTCHA.
let scriptPromise: Promise<void> | null = null;

export function loadRecaptchaScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Call verification needs a browser.'));
  }
  if (typeof window.grecaptcha?.ready === 'function' && typeof window.grecaptcha?.execute === 'function') {
    return Promise.resolve();
  }
  if (scriptPromise) return scriptPromise;

  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(recaptchaSiteKey)}`;
  script.async = true;
  const promise = new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      reject(new Error('Call verification could not load.'));
    }, 20000);
    script.onload = () => {
      window.clearTimeout(timeout);
      // api.js can expose ready before its full SDK has installed execute.
      // The click handler waits for ready before using execute.
      if (typeof window.grecaptcha?.ready === 'function') resolve();
      else reject(new Error('Call verification is unavailable.'));
    };
    script.onerror = () => {
      window.clearTimeout(timeout);
      reject(new Error('Call verification could not load.'));
    };
    document.head.appendChild(script);
  });
  scriptPromise = promise;
  void promise.catch(() => {
    // A blocked/failed script can be retried by the next Start Call click.
    if (scriptPromise === promise) scriptPromise = null;
    script.remove();
  });
  return promise;
}

/** Bound loading/verification waits and let Cancel Call release them promptly. */
export function waitForRecaptcha<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const finish = () => {
      window.clearTimeout(timeout);
      signal.removeEventListener('abort', abort);
    };
    const abort = () => {
      finish();
      reject(new DOMException('Call cancelled.', 'AbortError'));
    };
    const timeout = window.setTimeout(() => {
      finish();
      reject(new Error('Call verification timed out.'));
    }, 20000);
    promise.then(
      (value) => { finish(); resolve(value); },
      (error: unknown) => { finish(); reject(error); },
    );
    signal.addEventListener('abort', abort, { once: true });
    if (signal.aborted) abort();
  });
}
