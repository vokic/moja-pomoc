import { useEffect } from 'react';

const BASE = 'Moja Pomoć';

/**
 * Set document.title for the duration of the page. Restores the base title
 * on unmount so back navigation feels right.
 */
export function usePageTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : `${BASE} — vodič kroz državna prava u Srbiji`;
    return () => {
      document.title = `${BASE} — vodič kroz državna prava u Srbiji`;
    };
  }, [title]);
}
