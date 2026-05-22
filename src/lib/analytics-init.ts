/**
 * GoatCounter analytics loader. Vendor-neutral analytics interface.
 *
 * GoatCounter is free up to 100k pageviews/month, GDPR-compliant by design
 * (no cookies, no fingerprinting), open source. Better fit than Google
 * Analytics for civic-tech projects per specs.md sekcija 2.2 ("Bez Google
 * Analytics... Bez cookies za tracking").
 *
 * To enable: set VITE_GOATCOUNTER_CODE env var at build time to your
 * GoatCounter site code (the subdomain part, e.g. "mojapomoc" if your
 * dashboard is at mojapomoc.goatcounter.com).
 */

declare global {
  interface Window {
    goatcounter?: {
      count?: (opts: { path?: string; title?: string; event?: boolean; referrer?: string }) => void;
      no_onload?: boolean;
    };
  }
}

export function initAnalytics(): void {
  const code = import.meta.env.VITE_GOATCOUNTER_CODE;
  if (!code || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.setAttribute('data-goatcounter', `https://${code}.goatcounter.com/count`);
  script.src = '//gc.zgo.at/count.js';
  document.head.appendChild(script);
}
