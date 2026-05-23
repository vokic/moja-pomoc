import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabDokumenti } from '@/components/pravo-detail/TabDokumenti';
import { TabGreske } from '@/components/pravo-detail/TabGreske';
import { TabInstitucije } from '@/components/pravo-detail/TabInstitucije';
import { TabKoraci } from '@/components/pravo-detail/TabKoraci';
import { TabOsnovno } from '@/components/pravo-detail/TabOsnovno';
import { TabUputstvo } from '@/components/pravo-detail/TabUputstvo';
import { DataFreshness } from '@/components/shared/DataFreshness';
import { Disclaimer } from '@/components/shared/Disclaimer';
import { Badge } from '@/components/ui/badge';
import { useCatalog } from '@/hooks/useCatalog';
import { usePageDwell } from '@/hooks/usePageDwell';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useScrollDepth } from '@/hooks/useScrollDepth';
import { track } from '@/lib/analytics';
import { findPravo } from '@/lib/catalog';
import { kategorijaLabel } from '@/lib/labels';
import { useLang } from '@/lib/lang-context';

export function PravoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { katalog, loading, error } = useCatalog();
  const { t, lang, pickLocalized } = useLang();
  const pravoForTitle = id && katalog ? findPravo(katalog, id) : undefined;
  usePageTitle(pravoForTitle ? pickLocalized(pravoForTitle.naziv) : t('detail.not_found.title'));
  usePageDwell('pravo_detail');
  useScrollDepth(
    'pravo_detail',
    pravoForTitle ? { pravo_id: pravoForTitle.id } : undefined,
    pravoForTitle?.id,
  );

  const [activeTab, setActiveTab] = useState('osnovno');

  useEffect(() => {
    if (pravoForTitle) track('pravo_viewed', { pravo_id: pravoForTitle.id });
  }, [pravoForTitle]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center text-[#565c65]">…</div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center text-rose-700">
        {error.message}
      </div>
    );
  }

  const pravo = pravoForTitle;

  if (!pravo) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-2xl font-bold text-[var(--brand-primary)]">
          {t('detail.not_found.title')}
        </h1>
        <p className="mt-2 text-[14px] text-[#565c65]">
          {t('detail.not_found.body', { id: id ?? '?' })}
        </p>
        <Link
          to="/pretraga"
          className="mt-4 inline-block text-[14px] font-semibold text-[var(--brand-primary)] underline"
        >
          {t('detail.back_link')}
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
        {t('detail.back_to_search')}
      </Link>

      <header className="mt-3">
        <h1 className="text-balance text-3xl font-bold leading-tight text-[var(--brand-primary)]">
          {pickLocalized(pravo.naziv)}
        </h1>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {isSurprise && (
            <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100">
              {t('detail.badge.surprise')}
            </Badge>
          )}
          {isHigh && (
            <Badge className="bg-rose-100 text-rose-900 hover:bg-rose-100">
              {t('detail.badge.high')}
            </Badge>
          )}
          <Badge variant="secondary">{kategorijaLabel(pravo.kategorija, lang)}</Badge>
        </div>

        <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[#1b1b1b]">
          {pickLocalized(pravo.kratak_opis)}
        </p>
      </header>

      <DataFreshness lastVerified={pravo.last_verified} variant="banner" className="mt-5" />

      <Disclaimer className="mt-3" />

      <div className="mt-6">
        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v);
            track('pravo_tab_changed', { tab: v, pravo_id: pravo.id });
          }}
        >
          <TabsList className="w-full overflow-x-auto">
            <TabsTrigger value="osnovno">{t('detail.tab.osnovno')}</TabsTrigger>
            <TabsTrigger value="koraci">{t('detail.tab.koraci')}</TabsTrigger>
            <TabsTrigger value="dokumenti">{t('detail.tab.dokumenti')}</TabsTrigger>
            <TabsTrigger value="institucije">{t('detail.tab.institucije')}</TabsTrigger>
            <TabsTrigger value="uputstvo">{t('detail.tab.uputstvo')}</TabsTrigger>
            <TabsTrigger value="greske">{t('detail.tab.greske')}</TabsTrigger>
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
