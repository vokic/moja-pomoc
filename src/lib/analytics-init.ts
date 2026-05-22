/**
 * PostHog analytics loader (snippet pattern — full lib loads async from
 * PostHog CDN, keeps our main JS bundle small).
 *
 * Privacy-friendly config:
 *   - persistence: 'memory'  -> NO cookies, NO localStorage tracking
 *   - respect_dnt: true       -> honor browser Do Not Track header
 *   - autocapture: false      -> only events we fire explicitly via track()
 *   - session recording OFF   -> can enable later from PostHog dashboard
 *
 * Activates only when VITE_POSTHOG_KEY is set at build time.
 * VITE_POSTHOG_HOST defaults to EU cloud (data stays in EU per GDPR).
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

type PostHogStub = {
  capture: (event: string, props?: Record<string, unknown>) => void;
  init: (key: string, config?: Record<string, unknown>) => void;
  [k: string]: any;
};

declare global {
  interface Window {
    posthog?: PostHogStub;
  }
}

export function initAnalytics(): void {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  const host = import.meta.env.VITE_POSTHOG_HOST ?? 'https://eu.posthog.com';

  if (!key || typeof window === 'undefined') return;

  // Official PostHog snippet — creates window.posthog stub that queues calls,
  // then loads the full library async from PostHog CDN. Adapted from
  // posthog.com/docs/libraries/js. Typed as `any` because the snippet is a
  // micro-loader that's intentionally untyped (it bootstraps the real lib).
  (function (t: any, e: any) {
    if (e.__SV) return;
    window.posthog = e;
    e._i = [];
    e.init = function (i: any, s: any, a: any) {
      function g(t: any, e: any) {
        const o = e.split('.');
        if (o.length === 2) {
          t = t[o[0]];
          e = o[1];
        }
        t[e] = function () {
          // eslint-disable-next-line prefer-rest-params
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
        };
      }
      const p = t.createElement('script');
      p.type = 'text/javascript';
      p.crossOrigin = 'anonymous';
      p.async = true;
      p.src = (s.api_host || 'https://eu.posthog.com') + '/static/array.js';
      const r = t.getElementsByTagName('script')[0];
      r.parentNode.insertBefore(p, r);
      let u: any = e;
      void 0 !== a ? (u = e[a] = []) : (a = 'posthog');
      u.people = u.people || [];
      u.toString = function (t: any) {
        let e = 'posthog';
        return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e;
      };
      u.people.toString = function () {
        return u.toString(1) + '.people (stub)';
      };
      const methods =
        'init capture register register_once unregister getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags on onFeatureFlags identify setPersonProperties group resetGroups reset get_distinct_id getGroups get_session_id alias set_config opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing'.split(
          ' ',
        );
      for (let n = 0; n < methods.length; n++) g(u, methods[n]);
      e._i.push([i, s, a]);
    };
    e.__SV = 1;
  })(document, window.posthog || []);

  window.posthog!.init(key, {
    api_host: host,
    persistence: 'memory',
    respect_dnt: true,
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true,
    disable_session_recording: true,
  });

  if (import.meta.env.DEV) {
    console.log('[analytics] PostHog init', { host, key: `${key.slice(0, 8)}…` });
  }
}
