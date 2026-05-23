import { Link } from 'react-router-dom';
import { DataFreshness } from '@/components/shared/DataFreshness';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatIznos } from '@/lib/iznos';
import { kategorijaLabel } from '@/lib/labels';
import { useLang } from '@/lib/lang-context';
import type { Pravo } from '@/types';

type Props = { pravo: Pravo };

export function ResultCard({ pravo }: Props) {
  const { t, lang, pickLocalized } = useLang();
  const isSurprise = pravo.tagovi.includes('surprise');
  const isHigh = pravo.prioritet_propusta >= 4;

  return (
    <Link
      to={`/pravo/${pravo.id}`}
      className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
    >
      <Card className="p-5 transition-shadow hover:shadow-md">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
          <h3 className="min-w-0 flex-1 text-balance text-[16px] font-semibold leading-snug text-[var(--brand-primary)]">
            {pickLocalized(pravo.naziv)}
          </h3>
          <span className="min-w-0 max-w-full break-words text-[13px] font-semibold text-emerald-700">
            {formatIznos(pravo.iznos)}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
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

        <p className="mt-3 text-pretty text-[14px] leading-relaxed text-[#565c65]">
          {pickLocalized(pravo.kratak_opis)}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-[var(--brand-primary)]">
            {t('detail.back_link').replace('← ', '')} →
          </span>
          <DataFreshness lastVerified={pravo.last_verified} />
        </div>
      </Card>
    </Link>
  );
}
