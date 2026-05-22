import { Navigate } from 'react-router-dom';
import { ResultCard } from '@/components/results/ResultCard';
import { Card } from '@/components/ui/card';
import { useCatalog } from '@/hooks/useCatalog';
import { useMatches } from '@/hooks/useMatches';
import { useProfile } from '@/hooks/useProfile';

export function ResultsPage() {
  const { complete, loaded } = useProfile();
  const { loading: catalogLoading, error: catalogError } = useCatalog();
  const { matches, count, surprises, categories } = useMatches();

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

      <aside className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-[13.5px] leading-relaxed text-amber-900">
        Ovo je informativni alat. Konačnu odluku donose nadležne institucije. Pre
        podnošenja zahteva, proverite uslove sa nadležnom institucijom. Aplikacija ne
        čuva vaše lične podatke van vašeg pretraživača.
      </aside>

      <section className="mt-6 space-y-3">
        {matches.length === 0 ? (
          <p className="rounded-md border border-dashed border-[#dfe1e2] p-6 text-center text-[14px] text-[#565c65]">
            Na osnovu vaših odgovora nismo pronašli prava u trenutnom katalogu. Katalog
            se redovno proširuje — vratite se kasnije ili kontaktirajte nas sa
            predlogom prava koje treba dodati.
          </p>
        ) : (
          matches.map((m) => <ResultCard key={m.pravo.id} pravo={m.pravo} />)
        )}
      </section>
    </div>
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
