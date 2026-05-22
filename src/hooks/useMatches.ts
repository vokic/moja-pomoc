import { useMemo } from 'react';
import { matchAll } from '@/lib/matcher';
import { useCatalog } from '@/hooks/useCatalog';
import { useProfile } from '@/hooks/useProfile';
import type { Kategorija, MatchResult } from '@/types';

export type MatchesAggregations = {
  matches: MatchResult[];
  count: number;
  surprises: number;
  categories: Kategorija[];
  highPriority: number;
};

const EMPTY: MatchesAggregations = {
  matches: [],
  count: 0,
  surprises: 0,
  categories: [],
  highPriority: 0,
};

export function useMatches(): MatchesAggregations {
  const { profile } = useProfile();
  const { katalog } = useCatalog();

  return useMemo(() => {
    if (!profile || !katalog) return EMPTY;
    const matches = matchAll(profile, katalog.prava);
    const surprises = matches.filter((m) => m.pravo.tagovi.includes('surprise')).length;
    const highPriority = matches.filter((m) => m.pravo.prioritet_propusta >= 4).length;
    const categories = Array.from(new Set(matches.map((m) => m.pravo.kategorija)));
    return {
      matches,
      count: matches.length,
      surprises,
      categories,
      highPriority,
    };
  }, [profile, katalog]);
}
