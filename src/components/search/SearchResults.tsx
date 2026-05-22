import { Link } from 'react-router-dom';
import { useScript } from '@/hooks/useScript';
import { pickScript } from '@/lib/script';
import { kategorijaLabel } from '@/lib/labels';
import type { Kategorija, Pravo } from '@/types';

type Props = {
  results: Pravo[];
  hasQuery: boolean;
};

export function SearchResults({ results, hasQuery }: Props) {
  const { script } = useScript();

  if (results.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-[#dfe1e2] p-8 text-center">
        <p className="text-[14px] text-[#565c65]">
          {hasQuery
            ? 'Nismo pronašli pravo koje odgovara pretrazi.'
            : 'Nema prava u izabranoj kategoriji.'}
        </p>
        <p className="mt-3 text-[13.5px] text-[#565c65]">
          Probajte{' '}
          <Link to="/wizard" className="font-semibold text-[var(--brand-primary)] underline">
            vodič
          </Link>{' '}
          — postavićemo nekoliko pitanja i pokazaćemo prava o kojima niste razmišljali.
        </p>
      </div>
    );
  }

  // Group by kategorija (preserves order of first occurrence)
  const groups = new Map<Kategorija, Pravo[]>();
  for (const p of results) {
    const list = groups.get(p.kategorija) ?? [];
    list.push(p);
    groups.set(p.kategorija, list);
  }

  return (
    <div className="space-y-6">
      {Array.from(groups.entries()).map(([kat, items]) => (
        <section key={kat}>
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-[#565c65]">
            {kategorijaLabel(kat)} <span className="text-[#9aa3ad]">({items.length})</span>
          </h2>
          <ul className="mt-2 divide-y divide-[#dfe1e2] rounded-md border border-[#dfe1e2] bg-white">
            {items.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/pravo/${p.id}`}
                  className="flex items-start justify-between gap-3 px-4 py-3 text-[14px] text-[#1b1b1b] hover:bg-[#f0f0f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                >
                  <span className="font-medium text-[var(--brand-primary)]">
                    {pickScript(p.naziv, script)}
                  </span>
                  <span className="shrink-0 text-[#565c65]">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
