import { useEffect, useMemo, useState } from 'react';
import { CategoryFilter } from '@/components/search/CategoryFilter';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { useCatalog } from '@/hooks/useCatalog';
import { usePageTitle } from '@/hooks/usePageTitle';
import { buildSearchIndex, search } from '@/lib/search-index';
import type { Kategorija } from '@/types';

const DEBOUNCE_MS = 200;

export function SearchPage() {
  usePageTitle('Pretraga prava');
  const { katalog, loading, error } = useCatalog();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCats, setSelectedCats] = useState<Kategorija[]>([]);

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [query]);

  const index = useMemo(() => (katalog ? buildSearchIndex(katalog.prava) : []), [katalog]);

  const results = useMemo(
    () =>
      search(
        index,
        debouncedQuery,
        selectedCats.length > 0 ? selectedCats : undefined,
      ),
    [index, debouncedQuery, selectedCats],
  );

  const availableCats = useMemo<Kategorija[]>(() => {
    if (!katalog) return [];
    const set = new Set<Kategorija>();
    for (const p of katalog.prava) set.add(p.kategorija);
    return Array.from(set).sort();
  }, [katalog]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center text-[#565c65]">
        Učitavanje kataloga…
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center text-rose-700">
        Greška: {error.message}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-[var(--brand-primary)]">Sve pomoći i naknade</h1>
      <p className="mt-2 text-[14px] text-[#565c65]">
        Pretraga radi za oba pisma — kucate "decji", pronaći ćete i "Дечји додатак".
      </p>

      <div className="mt-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {availableCats.length > 0 && (
        <div className="mt-4">
          <CategoryFilter
            available={availableCats}
            selected={selectedCats}
            onChange={setSelectedCats}
          />
        </div>
      )}

      <div className="mt-8">
        <SearchResults results={results} hasQuery={debouncedQuery.trim().length > 0} />
      </div>
    </div>
  );
}
