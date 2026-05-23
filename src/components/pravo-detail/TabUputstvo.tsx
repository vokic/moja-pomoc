import { TrackedLink } from '@/components/shared/TrackedLink';
import { useLang } from '@/lib/lang-context';
import type { UputstvoZahteva } from '@/types';

type Props = { uputstvo?: UputstvoZahteva };

export function TabUputstvo({ uputstvo }: Props) {
  const { t } = useLang();
  if (!uputstvo) {
    return <p className="text-[14px] text-[#565c65]">{t('detail.uputstvo.empty')}</p>;
  }

  return (
    <div className="space-y-6">
      <header>
        <h3 className="text-[16px] font-bold text-[var(--brand-primary)]">{uputstvo.naziv_zahteva}</h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[#565c65]">
          <strong className="text-[#1b1b1b]">{t('detail.uputstvo.gde_obrazac')}:</strong>{' '}
          {uputstvo.gde_dobiti_obrazac}
        </p>
        {uputstvo.obrazac_url && (
          <TrackedLink
            source="obrazac"
            href={uputstvo.obrazac_url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-[13.5px] font-semibold text-[var(--brand-primary)] underline"
          >
            {t('detail.uputstvo.pogledaj_obrazac')}
          </TrackedLink>
        )}
      </header>

      <Section title={t('detail.uputstvo.section.pre')} items={uputstvo.pre_popunjavanja} />
      <Section title={t('detail.uputstvo.section.salter')} items={uputstvo.sta_reci_na_salteru} />
      <Section title={t('detail.uputstvo.section.potpis')} items={uputstvo.sta_proveriti_pre_potpisa} />
      <Section title={t('detail.uputstvo.section.posle')} items={uputstvo.posle_predaje} />

      <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-[13px] leading-relaxed text-amber-900">
        {t('detail.uputstvo.note')}
      </p>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h4 className="text-[13px] font-bold uppercase tracking-wider text-[var(--brand-primary)]">{title}</h4>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-[#1b1b1b]">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
