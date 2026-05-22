import { useEffect } from 'react';
import { track } from '@/lib/analytics';

const MILESTONES_MS = [30_000, 60_000, 120_000] as const;

/**
 * Fire `page_dwell_<sec>` events at 30s, 60s, and 120s while the page is
 * mounted. Timers are cleared on unmount so transient navigation doesn't
 * produce false positives. GoatCounter already records overall session
 * duration; this hook adds discrete milestones for cleaner dashboard
 * comparisons across pages.
 */
export function usePageDwell(page: string): void {
  useEffect(() => {
    const timers = MILESTONES_MS.map((ms) =>
      window.setTimeout(() => {
        track(`page_dwell_${ms / 1000}s`, { page });
      }, ms),
    );
    return () => {
      for (const t of timers) window.clearTimeout(t);
    };
  }, [page]);
}
