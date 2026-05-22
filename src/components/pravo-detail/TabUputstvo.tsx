import type { UputstvoZahteva } from '@/types';

type Props = { uputstvo?: UputstvoZahteva };

export function TabUputstvo({ uputstvo }: Props) {
  if (!uputstvo) {
    return (
      <p className="text-[14px] text-[#565c65]">
        Uputstvo za ovo pravo još nije pripremljeno.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h3 className="text-[16px] font-bold text-[#162e51]">{uputstvo.naziv_zahteva}</h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[#565c65]">
          <strong className="text-[#1b1b1b]">Gde dobiti obrazac:</strong>{' '}
          {uputstvo.gde_dobiti_obrazac}
        </p>
        {uputstvo.obrazac_url && (
          <a
            href={uputstvo.obrazac_url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-[13.5px] font-semibold text-[#162e51] underline"
          >
            Pogledaj službeni obrazac ↗
          </a>
        )}
      </header>

      <Section title="Pre nego što odete" items={uputstvo.pre_popunjavanja} />
      <Section title="Šta tačno reći na šalteru" items={uputstvo.sta_reci_na_salteru} />
      <Section title="Šta proveriti pre potpisa" items={uputstvo.sta_proveriti_pre_potpisa} />
      <Section title="Posle predaje zahteva" items={uputstvo.posle_predaje} />

      <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-[13px] leading-relaxed text-amber-900">
        Moja Pomoć ne popunjava obrasce za vas. Dajemo uputstvo — vi predajete zahtev.
        Pre potpisa, proverite sve podatke sami.
      </p>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#162e51]">{title}</h4>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-[#1b1b1b]">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
