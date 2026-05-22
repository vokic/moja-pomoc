import { formatIznos } from '@/lib/iznos';
import { kategorijaLabel } from '@/lib/labels';
import type { Pravo } from '@/types';

const FILIJALA_LABELS = {
  prema_prebivalistu: 'Prema mestu prebivališta',
  jedinstvena: 'Jedinstvena institucija',
  po_izboru: 'Po izboru korisnika',
  pratilac_pravnog_lica: 'Preko poslodavca / pravnog lica',
} as const;

type Props = { pravo: Pravo };

export function TabOsnovno({ pravo }: Props) {
  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Row label="Kategorija" value={kategorijaLabel(pravo.kategorija)} />
      <Row label="Iznos" value={formatIznos(pravo.iznos)} />
      <Row label="Ko ima pravo" value={pravo.ko_ima_pravo_opis} />
      <Row label="Prioritet propusta" value={`${pravo.prioritet_propusta} / 5`} />
      <Row label="Gde se obratiti" value={FILIJALA_LABELS[pravo.filijala_pravilo]} />
      {pravo.rok_za_podnosenje && <Row label="Rok za podnošenje" value={pravo.rok_za_podnosenje} />}
      {pravo.prosecno_trajanje_postupka && (
        <Row label="Prosečno trajanje postupka" value={pravo.prosecno_trajanje_postupka} />
      )}
      <Row label="Poslednja provera" value={pravo.last_verified} />

      <div className="sm:col-span-2">
        <dt className="text-[12px] font-bold uppercase tracking-wider text-[#565c65]">
          Zašto se propušta
        </dt>
        <dd className="mt-1 text-[14px] leading-relaxed text-[#1b1b1b]">
          {pravo.zasto_se_propusta}
        </dd>
      </div>

      {pravo.pravni_osnov.length > 0 && (
        <div className="sm:col-span-2">
          <dt className="text-[12px] font-bold uppercase tracking-wider text-[#565c65]">
            Pravni osnov
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
                    <a
                      href={ls.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--brand-primary)] underline"
                    >
                      ↗
                    </a>
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
    <div>
      <dt className="text-[12px] font-bold uppercase tracking-wider text-[#565c65]">{label}</dt>
      <dd className="mt-1 text-[14px] leading-relaxed text-[#1b1b1b]">{value}</dd>
    </div>
  );
}
