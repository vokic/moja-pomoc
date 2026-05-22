/**
 * Analytics wrapper. V1: GoatCounter (free, no cookies, GDPR-clean,
 * open source). The track() interface is vendor-neutral — only this
 * module knows about GoatCounter.
 */

type EventProps = Record<string, string | number | boolean>;

export function track(event: string, props?: EventProps): void {
  if (typeof window !== 'undefined' && window.goatcounter?.count) {
    // GoatCounter encodes events via path="event:..." + event:true.
    // We squash props into the title for visibility in the dashboard.
    const titleParts = props
      ? Object.entries(props)
          .map(([k, v]) => `${k}=${v}`)
          .join(' ')
      : '';
    window.goatcounter.count({
      path: `event:${event}`,
      title: titleParts || event,
      event: true,
    });
    return;
  }
  if (import.meta.env.DEV) {
    console.log('[analytics]', event, props ?? {});
  }
}
