import type { Pravo } from '@/types';

type Props = { pravo: Pravo };

export function TabInstitucije({ pravo }: Props) {
  if (pravo.institucije.length === 0) {
    return <p className="text-[14px] text-[#565c65]">Nema definisanih institucija.</p>;
  }

  return (
    <div className="space-y-4">
      {pravo.institucije.map((i, idx) => (
        <div key={idx} className="rounded-md border border-[#dfe1e2] bg-white p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-[15px] font-semibold text-[#162e51]">{i.naziv}</h3>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#565c65]">
              {i.tip}
            </span>
          </div>
          <dl className="mt-3 grid grid-cols-1 gap-2 text-[13.5px] sm:grid-cols-2">
            {i.adresa && (
              <Row label="Adresa">
                <span>{i.adresa}</span>
              </Row>
            )}
            {i.telefon && (
              <Row label="Telefon">
                <a href={`tel:${i.telefon}`} className="text-[#162e51] underline">
                  {i.telefon}
                </a>
              </Row>
            )}
            {i.email && (
              <Row label="Email">
                <a href={`mailto:${i.email}`} className="text-[#162e51] underline">
                  {i.email}
                </a>
              </Row>
            )}
            {i.url && (
              <Row label="Web">
                <a href={i.url} target="_blank" rel="noreferrer" className="text-[#162e51] underline">
                  {i.url} ↗
                </a>
              </Row>
            )}
            {i.radno_vreme && (
              <Row label="Radno vreme">
                <span>{i.radno_vreme}</span>
              </Row>
            )}
          </dl>
          {i.napomena && (
            <p className="mt-3 text-[13px] italic text-[#565c65]">{i.napomena}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-bold uppercase tracking-wider text-[#565c65]">{label}</dt>
      <dd className="mt-0.5 text-[#1b1b1b]">{children}</dd>
    </div>
  );
}
