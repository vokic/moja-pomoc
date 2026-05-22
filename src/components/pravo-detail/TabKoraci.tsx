import type { Pravo } from '@/types';

type Props = { pravo: Pravo };

export function TabKoraci({ pravo }: Props) {
  if (pravo.koraci.length === 0) {
    return <p className="text-[14px] text-[#565c65]">Nema definisanih koraka.</p>;
  }

  return (
    <ol className="space-y-5">
      {pravo.koraci.map((k) => (
        <li key={k.redni_broj} className="flex gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#162e51] text-[13px] font-bold text-white">
            {k.redni_broj}
          </span>
          <div className="flex-1">
            <h3 className="text-[15px] font-semibold text-[#162e51]">{k.naslov}</h3>
            <p className="mt-1 text-[14px] leading-relaxed text-[#1b1b1b]">{k.opis}</p>
            {k.napomena && (
              <p className="mt-2 rounded-md bg-[#f0f0f0] px-3 py-2 text-[13px] leading-relaxed text-[#1b1b1b]">
                <strong>Napomena:</strong> {k.napomena}
              </p>
            )}
            {k.upozorenje && (
              <p className="mt-2 rounded-md border-l-4 border-amber-500 bg-amber-50 px-3 py-2 text-[13px] leading-relaxed text-amber-900">
                <strong>Pažnja:</strong> {k.upozorenje}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
