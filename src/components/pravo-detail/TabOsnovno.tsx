import { TrackedLink } from '@/components/shared/TrackedLink';
import { formatIznos } from '@/lib/iznos';
import { kategorijaLabel } from '@/lib/labels';
import { useLang } from '@/lib/lang-context';
import type { Pravo } from '@/types';
import type { TKey } from '@/lib/i18n';

const FILIJALA_KEY: Record<string, TKey> = {
  prema_prebivalistu: 'detail.filijala.prema_prebivalistu',
  jedinstvena: 'detail.filijala.jedinstvena',
  po_izboru: 'detail.filijala.po_izboru',
  pratilac_pravnog_lica: 'detail.filijala.pratilac_pravnog_lica',
};

type Props = { pravo: Pravo };

export function TabOsnovno({ pravo }: Props) {
  const { t, lang } = useLang();
  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Row label={t('detail.field.kategorija')} value={kategorijaLabel(pravo.kategorija, lang)} />
      <Row label={t('detail.field.iznos')} value={formatIznos(pravo.iznos)} />
      <Row label={t('detail.field.ko_ima_pravo')} value={pravo.ko_ima_pravo_opis} />
      <Row label={t('detail.field.prioritet')} value={`${pravo.prioritet_propusta} / 5`} />
      <Row
        label={t('detail.field.gde_se_obratiti')}
        value={t(FILIJALA_KEY[pravo.filijala_pravilo] ?? 'detail.filijala.jedinstvena')}
      />
      {pravo.rok_za_podnosenje && (
        <Row label={t('detail.field.rok')} value={pravo.rok_za_podnosenje} />
      )}
      {pravo.prosecno_trajanje_postupka && (
        <Row label={t('detail.field.trajanje')} value={pravo.prosecno_trajanje_postupka} />
      )}
      <Row label={t('detail.field.last_verified')} value={pravo.last_verified} />

      <div className="sm:col-span-2">
        <dt className="text-[13px] font-bold uppercase tracking-wider text-[var(--brand-primary)]">
          {t('detail.field.zasto_se_propusta')}
        </dt>
        <dd className="mt-1 text-[14px] leading-relaxed text-[#1b1b1b]">
          {pravo.zasto_se_propusta}
        </dd>
      </div>

      {pravo.pravni_osnov.length > 0 && (
        <div className="sm:col-span-2">
          <dt className="text-[13px] font-bold uppercase tracking-wider text-[var(--brand-primary)]">
            {t('detail.field.pravni_osnov')}
          </dt>
          <dd className="mt-2 space-y-1.5 text-[13.5px] text-[#1b1b1b]">
            {pravo.pravni_osnov.map((ls, i) => (
              <div key={i}>
                <strong>{ls.zakon}</strong>
                {ls.clanovi && <span className="text-[#565c65]"> · čl. {ls.clanovi}</span>}
                {ls.sluzbeni_glasnik && (
                  <span className="text-[#565c65]"> · {ls.sluzbeni_glasnik}</span>
                )}
                {ls.url && (
                  <>
                    {' '}
                    <TrackedLink
                      source="pravni_osnov"
                      href={ls.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--brand-primary)] underline"
                    >
                      ↗
                    </TrackedLink>
                  </>
                )}
              </div>
            ))}
          </dd>
        </div>
      )}
    </dl>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-[var(--brand-primary)]/30 pl-3">
      <dt className="text-[12.5px] font-bold uppercase tracking-wider text-[var(--brand-primary)]">
        {label}
      </dt>
      <dd className="mt-1 text-[14.5px] leading-relaxed text-[#1b1b1b]">{value}</dd>
    </div>
  );
}
