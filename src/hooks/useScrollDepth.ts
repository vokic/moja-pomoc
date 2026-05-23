import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';

const MILESTONES = [25, 50, 75, 100] as const;

/**
 * Fire `scroll_depth` events when the user scrolls past 25/50/75/100% of
 * the page. Each milestone fires at most once per mount (or until `key`
 * changes - pass a route/id-specific key when switching content without
 * full unmount).
 */
export function useScrollDepth(
  page: string,
  extra?: Record<string, string | number | boolean>,
  key?: string,
): void {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    fired.current = new Set();
  }, [key]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const totalScrollable = doc.scrollHeight - doc.clientHeight;
      if (totalScrollable <= 0) return;
      const pct = Math.round((doc.scrollTop / totalScrollable) * 100);
      for (const m of MILESTONES) {
        if (pct >= m && !fired.current.has(m)) {
          fired.current.add(m);
          track('scroll_depth', { page, pct: m, ...extra });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [page, extra]);
}
