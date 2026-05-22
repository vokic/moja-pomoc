/**
 * Analytics wrapper. V1: Plausible (no cookies, no PII, GDPR-clean).
 *
 * Plausible script is injected only when the env var
 *   VITE_PLAUSIBLE_DOMAIN
 * is set at build time (so dev runs and PR previews stay quiet).
 *
 * Events flow through window.plausible(name, { props }). In DEV (or when
 * Plausible is not loaded) we fall back to console.log.
 */

type EventProps = Record<string, string | number | boolean>;

export function track(event: string, props?: EventProps): void {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible(event, props ? { props } : undefined);
    return;
  }
  if (import.meta.env.DEV) {
    console.log('[analytics]', event, props ?? {});
  }
}
