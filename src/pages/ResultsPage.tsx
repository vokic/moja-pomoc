import { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ResultCard } from '@/components/results/ResultCard';
import { Anketa } from '@/components/shared/Anketa';
import { Disclaimer } from '@/components/shared/Disclaimer';
import { Card } from '@/components/ui/card';
import { useCatalog } from '@/hooks/useCatalog';
import { useMatches } from '@/hooks/useMatches';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useProfile } from '@/hooks/useProfile';
import { kategorijaLabel } from '@/lib/labels';
import type { Kategorija, MatchResult } from '@/types';

type Filter = 'sve' | 'surprise' | 'high';

export function ResultsPage() {
  usePageTitle('Moji rezultati');
  const { complete, loaded } = useProfile();
  const { loading: catalogLoading, error: catalogError } = useCatalog();
  const { matches, count, surprises, categories, highPriority } = useMatches();

  const [filter, setFilter] = useState<Filter>('sve');
  const [groupByCategory, setGroupByCategory] = useState(false);

  const filtered = useMemo(() => {
    if (filter === 'surprise') return matches.filter((m) => m.pravo.tagovi.includes('surprise'));
    if (filter === 'high') return matches.filter((m) => m.pravo.prioritet_propusta >= 4);
    return matches;
  }, [matches, filter]);

  if (loaded && !complete) {
    return <Navigate to="/wizard" replace />;
  }

  if (!loaded || catalogLoading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center text-[#565c65]">
        Učitavanje…
      </div>
    );
  }

  if (catalogError) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center text-rose-700">
        Greška pri učitavanju kataloga: {catalogError.message}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <header>
        <h1 className="text-3xl font-bold text-[#162e51]">Moji rezultati</h1>
        <p className="mt-2 text-[14px] text-[#565c65]">
          Pretraga je obavljena lokalno u vašem pretraživaču.
        </p>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard label="Pronađeno prava" value={count} />
        <SummaryCard label="Verovatno niste znali" value={surprises} />
        <SummaryCard label="Kategorija" value={categories.length} />
      </section>

      <Disclaimer className="mt-6" />

      {matches.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <FilterChip active={filter === 'sve'} onClick={() => setFilter('sve')}>
              Sve ({matches.length})
            </FilterChip>
            {surprises > 0 && (
              <FilterChip
                active={filter === 'surprise'}
                onClick={() => setFilter('surprise')}
              >
                Verovatno niste znali ({surprises})
              </FilterChip>
            )}
            {highPriority > 0 && (
              <FilterChip active={filter === 'high'} onClick={() => setFilter('high')}>
                Visok prioritet ({highPriority})
              </FilterChip>
            )}
          </div>
          <label className="flex items-center gap-2 text-[13.5px] text-[#1b1b1b]">
            <input
              type="checkbox"
              checked={groupByCategory}
              onChange={(e) => setGroupByCategory(e.target.checked)}
              className="h-4 w-4"
            />
            Pokaži po kategorijama
          </label>
        </div>
      )}

      <section className="mt-6">
        {filtered.length === 0 ? (
          <p className="rounded-md border border-dashed border-[#dfe1e2] p-6 text-center text-[14px] text-[#565c65]">
            {matches.length === 0
              ? 'Na osnovu vaših odgovora nismo pronašli prava u trenutnom katalogu. Katalog se redovno proširuje — vratite se kasnije ili kontaktirajte nas sa predlogom prava koje treba dodati.'
              : 'Nijedno pravo ne odgovara izabranom filteru.'}
          </p>
        ) : groupByCategory ? (
          <GroupedResults results={filtered} />
        ) : (
          <div className="space-y-3">
            {filtered.map((m) => (
              <ResultCard key={m.pravo.id} pravo={m.pravo} />
            ))}
          </div>
        )}
      </section>

      {matches.length > 0 && <Anketa />}
    </div>
  );
}

function GroupedResults({ results }: { results: MatchResult[] }) {
  const groups = useMemo(() => {
    const map = new Map<Kategorija, MatchResult[]>();
    for (const m of results) {
      const list = map.get(m.pravo.kategorija) ?? [];
      list.push(m);
      map.set(m.pravo.kategorija, list);
    }
    return Array.from(map.entries());
  }, [results]);

  return (
    <div className="space-y-6">
      {groups.map(([kat, items]) => (
        <section key={kat}>
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-[#565c65]">
            {kategorijaLabel(kat)} <span className="text-[#9aa3ad]">({items.length})</span>
          </h2>
          <div className="mt-2 space-y-3">
            {items.map((m) => (
              <ResultCard key={m.pravo.id} pravo={m.pravo} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-[12.5px] font-semibold transition-colors ${
        active
          ? 'border-[#162e51] bg-[#162e51] text-white'
          : 'border-[#dfe1e2] bg-white text-[#1b1b1b] hover:border-[#162e51]/40 hover:bg-[#f0f0f0]'
      }`}
    >
      {children}
    </button>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="p-4 text-center">
      <div className="text-[28px] font-bold leading-none text-[#162e51]">{value}</div>
      <div className="mt-1 text-[12px] uppercase tracking-wider text-[#565c65]">
        {label}
      </div>
    </Card>
  );
}
