import type { Pravo } from '@/types';

type Props = { pravo: Pravo };

export function TabGreske({ pravo }: Props) {
  if (pravo.ceste_greske.length === 0) {
    return (
      <p className="text-[14px] text-[#565c65]">
        Nema dokumentovanih čestih grešaka za ovo pravo.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {pravo.ceste_greske.map((g, i) => (
        <li
          key={i}
          className="rounded-md border-l-4 border-rose-400 bg-rose-50/50 p-4"
        >
          <p className="text-[14px] font-semibold text-rose-900">{g.greska}</p>
          {g.posledica && (
            <p className="mt-1 text-[13.5px] text-rose-800">
              <strong>Posledica:</strong> {g.posledica}
            </p>
          )}
          <p className="mt-2 text-[13.5px] leading-relaxed text-[#1b1b1b]">
            <strong className="text-[var(--brand-primary)]">Rešenje:</strong> {g.resenje}
          </p>
        </li>
      ))}
    </ul>
  );
}
