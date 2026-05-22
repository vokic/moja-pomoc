/**
 * Analytics wrapper. V1: PostHog (cookieless, EU-hosted, GDPR-clean).
 * The track() interface is vendor-neutral — only this module + analytics-init
 * know about PostHog.
 *
 * PostHog snippet creates window.posthog stub before init that queues calls,
 * so track() is safe to call at any point.
 */

type EventProps = Record<string, string | number | boolean>;

export function track(event: string, props?: EventProps): void {
  if (typeof window !== 'undefined' && window.posthog?.capture) {
    window.posthog.capture(event, props);
  }
  if (import.meta.env.DEV) {
    console.log('[analytics]', event, props ?? {});
  }
}
