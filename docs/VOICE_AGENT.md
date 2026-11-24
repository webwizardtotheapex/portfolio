# SolDevHassan AI browser calls

`components/VoiceAgentButton.tsx` is mounted globally in the App Router root
layout. It uses `retell-client-js-sdk` 3.x and a domain-restricted Retell Public
Key directly in the browser. The client is constructed only when a visitor
clicks the button. Its click handler waits for Google reCAPTCHA v3 readiness,
executes the `retell_web_call` action to obtain a fresh token, then invokes
`createWebCall({ agent_id, recaptchaToken, hooks })`. There are no API routes,
server credentials, or token proxy.

The widget supports connecting, cancellation, live calls, mute/unmute, hangup,
and dismissible errors. A speaker control provides an extra user gesture to
enable audio if the browser blocks autoplay. It ends connecting or active
sessions on unmount and
ignores callbacks from previous sessions. It uses the portfolio’s existing
theme tokens, fonts, and GlowButton controls. Mobile safe-area offsets, footer
clearance, and navigation stacking keep controls reachable.

## Configuration

The component reads these public build-time variables:

```dotenv
NEXT_PUBLIC_RETELL_PUBLIC_KEY=public_key_c5ea915e80c2d5bce52f9
NEXT_PUBLIC_RETELL_AGENT_ID=agent_1060e1b434f8c10d88ee792574
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeurjAuAAAAABJTK9xpKavwPEJ_6rfNxws_s-Vv
```

They are also in the gitignored `.env.local`. The exact values above are used
as fallbacks, so CI does not need variables to deploy this agent. All three values
are intended to be present in the browser bundle. Keep private Retell API keys
out of this static site. Changing the public variables requires a new build.

The public key’s allowed domains must include the hostname visitors use, such
as `soldevhassan.com`, and `www.soldevhassan.com` if enabled. Add `localhost`
only if local real-call testing is wanted. Microphone access requires HTTPS
(or localhost), a supported browser, and the visitor’s permission. SDK hooks
surface rejected keys, denied microphone permissions, and connection errors.

The Google v3 site key must also allow the deployed hostname. The browser loads
`https://www.google.com/recaptcha/api.js?render=<SITE_KEY>` on mount and waits
for `grecaptcha.ready()` on each start. Tokens are never reused; the SDK sends
each token as `g-recaptcha-response`. Retell handles token verification for the
protected public key. Cancelling or unmounting during verification prevents a
late token from starting a call. Failed or blocked verification displays an
inline retryable error. The Google badge remains visible above the call widget.

## Verify and deploy to GitHub Pages

```powershell
npx tsc --noEmit
npm run build
npm run serve
```

The production build exports HTML and browser assets into `out/`. The existing
`.github/workflows/deploy.yml` installs locked dependencies, builds that export,
and deploys it on pushes to `main` (or a manual workflow run). Commit the
integration files, including `package.json` and `package-lock.json`, and push
to `main`. Do not commit `.env.local`. No workflow changes are needed for the
fallback credentials.

`public/CNAME` currently selects the custom domain, so the workflow uses an
empty `BASE_PATH`. For a GitHub project URL without a custom domain, the
workflow automatically uses the repository subpath. To build that case locally:

```powershell
$env:BASE_PATH = '/portfolio'
npm run build
```

After deployment, open the HTTPS site, start a call, grant microphone access,
and check that the agent speaks and hears you. Check mute/unmute and End Call.
Reload with microphone permission blocked to check the inline error and retry.

Validation completed: TypeScript and lint checks, a clean `npm run build`
static export, and 16 browser checks covering fresh verification tokens,
Google's staged initialization, cancellation, errors, mute/unmute, hangup,
audio recovery, and responsive placement. The browser checks mock Google,
Retell, and media; they do not verify real CAPTCHA scores, domain authorization,
or a spoken conversation. Local reports and screenshots are gitignored under
`artifacts/ui-audit/voice/`.
