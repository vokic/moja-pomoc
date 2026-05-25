import { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ResultCard } from '@/components/results/ResultCard';
import { Anketa } from '@/components/shared/Anketa';
import { Disclaimer } from '@/components/shared/Disclaimer';
import { PdfExportButton } from '@/components/shared/PdfExportButton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCatalog } from '@/hooks/useCatalog';
import { useMatches } from '@/hooks/useMatches';
import { usePageDwell } from '@/hooks/usePageDwell';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useProfile } from '@/hooks/useProfile';
import { track } from '@/lib/analytics';
import { kategorijaLabel } from '@/lib/labels';
import { useLang } from '@/lib/lang-context';
import type { Kategorija, MatchResult } from '@/types';

type Filter = 'sve' | 'surprise' | 'high';

export function ResultsPage() {
  const { t, lang } = useLang();
  usePageTitle(t('results.page_title'));
  usePageDwell('rezultati');
  const navigate = useNavigate();
  const { complete, loaded, reset } = useProfile();
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
        {t('common.loading')}
      </div>
    );
  }

  if (catalogError) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center text-rose-700">
        {t('common.error.catalog')}: {catalogError.message}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <header>
        <h1 className="text-3xl font-bold text-[var(--brand-primary)]">{t('results.page_title')}</h1>
        <p className="mt-2 text-[14px] text-[#565c65]">{t('results.subtitle')}</p>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard label={t('results.summary.found')} value={count} />
        <SummaryCard label={t('results.summary.surprise')} value={surprises} />
        <SummaryCard label={t('results.summary.categories')} value={categories.length} />
      </section>

      <Disclaimer className="mt-6" />

      {matches.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={filter === 'sve'}
              onClick={() => {
                track('results_filter_changed', { filter: 'sve' });
                setFilter('sve');
              }}
            >
              {t('results.filter.all')} ({matches.length})
            </FilterChip>
            {surprises > 0 && (
              <FilterChip
                active={filter === 'surprise'}
                onClick={() => {
                  track('results_filter_changed', { filter: 'surprise' });
                  setFilter('surprise');
                }}
              >
                {t('results.filter.surprise')} ({surprises})
              </FilterChip>
            )}
            {highPriority > 0 && (
              <FilterChip
                active={filter === 'high'}
                onClick={() => {
                  track('results_filter_changed', { filter: 'high' });
                  setFilter('high');
                }}
              >
                {t('results.filter.high')} ({highPriority})
              </FilterChip>
            )}
          </div>
          <label className="flex items-center gap-2 text-[13.5px] text-[#1b1b1b]">
            <input
              type="checkbox"
              checked={groupByCategory}
              onChange={(e) => {
                const next = e.target.checked;
                track('results_view_changed', { view: next ? 'grouped' : 'flat' });
                setGroupByCategory(next);
              }}
              className="h-4 w-4"
            />
            {t('results.view.grouped')}
          </label>
        </div>
      )}

      <section className="mt-6">
        {matches.length === 0 ? (
          <div className="rounded-md border border-[#dfe1e2] bg-white p-8 text-center">
            <h2 className="text-balance text-[18px] font-bold leading-snug text-[var(--brand-primary)]">
              {t('results.empty.no_match.title')}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-[14px] leading-relaxed text-[#1b1b1b]">
              {t('results.empty.no_match.body')}
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button
                onClick={() => {
                  reset();
                  navigate('/wizard');
                }}
              >
                {t('results.empty.cta.restart')}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/pretraga')}
              >
                {t('results.empty.cta.search')}
              </Button>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <p className="rounded-md border border-dashed border-[#dfe1e2] p-6 text-center text-[14px] text-[#565c65]">
            {t('results.empty.filtered')}
          </p>
        ) : groupByCategory ? (
          <GroupedResults results={filtered} lang={lang} />
        ) : (
          <div className="space-y-3">
            {filtered.map((m) => (
              <ResultCard key={m.pravo.id} pravo={m.pravo} />
            ))}
          </div>
        )}
      </section>

      {matches.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PdfExportButton prava={matches.map((m) => m.pravo)} />
        </div>
      )}

      {matches.length > 0 && <Anketa />}
    </div>
  );
}

function GroupedResults({ results, lang }: { results: MatchResult[]; lang: 'sr' | 'en' }) {
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
            {kategorijaLabel(kat, lang)} <span className="text-[#9aa3ad]">({items.length})</span>
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
      className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
        active
          ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white'
          : 'border-[#dfe1e2] bg-white text-[#1b1b1b] hover:border-[var(--brand-primary)]/40 hover:bg-[#f0f0f0]'
      }`}
    >
      {children}
    </button>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="p-4 text-center">
      <div className="text-[28px] font-bold leading-none text-[var(--brand-primary)]">{value}</div>
      <div className="mt-1 text-[12px] uppercase tracking-wider text-[#565c65]">
        {label}
      </div>
    </Card>
  );
}
