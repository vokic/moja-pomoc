/**
 * Dynamically load the Plausible script if VITE_PLAUSIBLE_DOMAIN is set
 * at build time. We pre-declare window.plausible as a queue so events
 * fired before the script loads aren't lost.
 */

declare global {
  interface Window {
    plausible?: ((event: string, opts?: { props?: Record<string, string | number | boolean> }) => void) & {
      q?: unknown[];
    };
  }
}

export function initPlausible(): void {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
  if (!domain || typeof window === 'undefined') return;

  // Queue events that fire before the script loads.
  if (typeof window.plausible !== 'function') {
    const q: unknown[] = [];
    const stub = ((...args: unknown[]) => {
      q.push(args);
    }) as Window['plausible'];
    if (stub) {
      (stub as { q?: unknown[] }).q = q;
      window.plausible = stub;
    }
  }

  const script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-domain', domain);
  script.src = 'https://plausible.io/js/script.tagged-events.js';
  document.head.appendChild(script);
}
