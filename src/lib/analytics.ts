/**
 * Analytics wrapper. V1: just console.log. V2 will hit Plausible (no cookies,
 * no PII). The signature is stable so call sites don't have to change.
 */

type EventProps = Record<string, string | number | boolean>;

export function track(event: string, props?: EventProps): void {
  if (import.meta.env.DEV) {
    console.log('[analytics]', event, props ?? {});
  }
  // V2: window.plausible?.(event, { props });
}
