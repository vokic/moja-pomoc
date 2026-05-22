import type { Pravo } from '@/types';

type Props = { pravo: Pravo };

const RSD = new Intl.NumberFormat('sr-RS', { maximumFractionDigits: 0 });

export function TabDokumenti({ pravo }: Props) {
  if (pravo.dokumenti.length === 0) {
    return <p className="text-[14px] text-[#565c65]">Nema definisanih dokumenata.</p>;
  }

  return (
    <ul className="space-y-3">
      {pravo.dokumenti.map((d) => (
        <li key={d.id} className="rounded-md border border-[#dfe1e2] bg-white p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-[15px] font-semibold text-[#162e51]">
              {d.naziv}
              {d.obavezno ? (
                <span className="ml-2 rounded bg-rose-100 px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-rose-900">
                  Obavezno
                </span>
              ) : (
                <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Opcionalno
                </span>
              )}
            </h3>
            <span className="text-[13px] font-semibold text-[#1b1b1b]">
              {d.trosak_rsd === 0 ? 'Besplatno' : `${RSD.format(d.trosak_rsd)} RSD`}
            </span>
          </div>
          <p className="mt-1 text-[13.5px] leading-relaxed text-[#565c65]">
            <strong>Gde:</strong> {d.gde_se_nabavlja}
          </p>
          {d.vazi_meseci != null && (
            <p className="mt-1 text-[13px] text-[#565c65]">
              Važi {d.vazi_meseci} {d.vazi_meseci === 1 ? 'mesec' : 'meseci'}
            </p>
          )}
          {d.napomena && (
            <p className="mt-2 text-[13px] italic text-[#565c65]">{d.napomena}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
