import { useEffect } from 'react';
import { useLang } from '@/lib/lang-context';

const BASE = 'Moja Pomoć';

/**
 * Set document.title for the duration of the page. Restores the base title
 * on unmount so back navigation feels right.
 */
export function usePageTitle(title?: string): void {
  const { t } = useLang();
  const suffix = t('page_title.default_suffix');
  useEffect(() => {
    const full = title ? `${title} · ${BASE}` : `${BASE} - ${suffix}`;
    document.title = full;
    return () => {
      document.title = `${BASE} - ${suffix}`;
    };
  }, [title, suffix]);
}
