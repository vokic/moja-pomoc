import { Link, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabDokumenti } from '@/components/pravo-detail/TabDokumenti';
import { TabGreske } from '@/components/pravo-detail/TabGreske';
import { TabInstitucije } from '@/components/pravo-detail/TabInstitucije';
import { TabKoraci } from '@/components/pravo-detail/TabKoraci';
import { TabOsnovno } from '@/components/pravo-detail/TabOsnovno';
import { TabUputstvo } from '@/components/pravo-detail/TabUputstvo';
import { Disclaimer } from '@/components/shared/Disclaimer';
import { Badge } from '@/components/ui/badge';
import { useCatalog } from '@/hooks/useCatalog';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useScript } from '@/hooks/useScript';
import { findPravo } from '@/lib/catalog';
import { kategorijaLabel } from '@/lib/labels';
import { pickScript } from '@/lib/script';

export function PravoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { katalog, loading, error } = useCatalog();
  const { script } = useScript();
  const pravoForTitle = id && katalog ? findPravo(katalog, id) : undefined;
  usePageTitle(pravoForTitle ? pickScript(pravoForTitle.naziv, script) : 'Pravo');

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center text-[#565c65]">
        Učitavanje…
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

  const pravo = pravoForTitle;

  if (!pravo) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-2xl font-bold text-[var(--brand-primary)]">Pravo nije pronađeno</h1>
        <p className="mt-2 text-[14px] text-[#565c65]">
          Pravo sa identifikatorom <code>{id}</code> ne postoji u katalogu.
        </p>
        <Link
          to="/pretraga"
          className="mt-4 inline-block text-[14px] font-semibold text-[var(--brand-primary)] underline"
        >
          ← Vrati se na pretragu
        </Link>
      </div>
    );
  }

  const isSurprise = pravo.tagovi.includes('surprise');
  const isHigh = pravo.prioritet_propusta >= 4;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <Link
        to="/pretraga"
        className="text-[13px] font-semibold text-[var(--brand-primary)] hover:underline"
      >
        ← Nazad na pretragu
      </Link>

      <header className="mt-3">
        <h1 className="text-balance text-3xl font-bold leading-tight text-[var(--brand-primary)]">
          {pickScript(pravo.naziv, script)}
        </h1>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {isSurprise && (
            <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100">
              Verovatno niste znali
            </Badge>
          )}
          {isHigh && (
            <Badge className="bg-rose-100 text-rose-900 hover:bg-rose-100">
              Visok prioritet
            </Badge>
          )}
          <Badge variant="secondary">{kategorijaLabel(pravo.kategorija)}</Badge>
        </div>

        <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[#1b1b1b]">
          {pickScript(pravo.kratak_opis, script)}
        </p>
      </header>

      <Disclaimer className="mt-6" />

      <div className="mt-6">
        <Tabs defaultValue="osnovno">
          <TabsList className="w-full overflow-x-auto">
            <TabsTrigger value="osnovno">Osnovno</TabsTrigger>
            <TabsTrigger value="koraci">Koraci</TabsTrigger>
            <TabsTrigger value="dokumenti">Dokumenti</TabsTrigger>
            <TabsTrigger value="institucije">Gde se obratiti</TabsTrigger>
            <TabsTrigger value="uputstvo">Uputstvo zahteva</TabsTrigger>
            <TabsTrigger value="greske">Česte greške</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="osnovno">
              <TabOsnovno pravo={pravo} />
            </TabsContent>
            <TabsContent value="koraci">
              <TabKoraci pravo={pravo} />
            </TabsContent>
            <TabsContent value="dokumenti">
              <TabDokumenti pravo={pravo} />
            </TabsContent>
            <TabsContent value="institucije">
              <TabInstitucije pravo={pravo} />
            </TabsContent>
            <TabsContent value="uputstvo">
              <TabUputstvo uputstvo={pravo.uputstvo_zahteva} />
            </TabsContent>
            <TabsContent value="greske">
              <TabGreske pravo={pravo} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
