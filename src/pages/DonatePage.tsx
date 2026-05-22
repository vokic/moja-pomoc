import { track } from '@/lib/analytics';

export function DonatePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold text-[#162e51]">Podržite projekat</h1>

      <p className="mt-4 text-[15px] leading-relaxed text-[#1b1b1b]">
        Moja Pomoć je besplatan alat napravljen kao javno dobro. Nema reklama,
        nema komercijalne monetizacije, nema preprodaje podataka. Ako vam je
        alat pomogao — možete pomoći da nastavi da raste i pokriva više prava.
      </p>

      <h2 className="mt-10 text-xl font-bold text-[#162e51]">Zašto donirati</h2>
      <ul className="mt-3 space-y-2 text-[14.5px] leading-relaxed text-[#1b1b1b]">
        <li>· Pravna provera kataloga (plaćeni pravnici proveravaju svako pravo)</li>
        <li>· Širenje kataloga (cilj: 80+ prava u V1.5, 200+ u V2)</li>
        <li>· Domen, hosting i email (godišnji trošak)</li>
        <li>· Vreme za pisanje uputstava i odgovaranje na pitanja korisnika</li>
      </ul>

      <h2 className="mt-10 text-xl font-bold text-[#162e51]">Načini podrške</h2>

      <div className="mt-4 space-y-3">
        <DonateMethod
          title="Patreon"
          desc="Mesečna podrška. Pridružite se kao podržavalac od 3 EUR ili više mesečno."
          status="uskoro"
        />
        <DonateMethod
          title="Buy Me a Coffee"
          desc="Jednokratna donacija putem kartice. Bez naloga."
          status="uskoro"
        />
        <DonateMethod
          title="Direktna uplata u RSD"
          desc="Uplata na dinarski račun udruženja. Detalji + QR kod za m-banking pre lansiranja."
          status="uskoro"
        />
      </div>

      <h2 className="mt-10 text-xl font-bold text-[#162e51]">Drugi načini da pomognete</h2>
      <ul className="mt-3 space-y-2 text-[14.5px] leading-relaxed text-[#1b1b1b]">
        <li>
          · <strong>Predložite pravo</strong> — javite nam koje pravo treba dodati
          ili izmeniti.
        </li>
        <li>
          · <strong>Doprinos kodu</strong> — pull requestovi i issue prijave su
          dobrodošli na GitHub-u.
        </li>
        <li>
          · <strong>Podelite</strong> — pošaljite alat onima kojima može da pomogne
          (porodica, susedi, kolege).
        </li>
        <li>
          · <strong>NGO partnerstva</strong> — ako vaša organizacija radi sa
          građanima koji propušta prava, kontaktirajte nas.
        </li>
      </ul>

      <div className="mt-10">
        <button
          type="button"
          onClick={() => {
            track('share_clicked', { source: 'donate' });
            if (typeof navigator !== 'undefined' && navigator.share) {
              navigator
                .share({
                  title: 'Moja Pomoć',
                  text: 'Otkrijte sva državna prava koja vam pripadaju.',
                  url: window.location.origin,
                })
                .catch(() => {
                  /* ignore */
                });
            }
          }}
          className="rounded-md border border-[#162e51] px-4 py-2 text-[14px] font-semibold text-[#162e51] hover:bg-[#162e51] hover:text-white"
        >
          Podeli sa drugima
        </button>
      </div>
    </div>
  );
}

function DonateMethod({
  title,
  desc,
  status,
}: {
  title: string;
  desc: string;
  status: 'aktivno' | 'uskoro';
}) {
  return (
    <div className="rounded-md border border-[#dfe1e2] bg-white p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[15px] font-semibold text-[#162e51]">{title}</h3>
        <span
          className={`rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
            status === 'aktivno'
              ? 'bg-emerald-100 text-emerald-900'
              : 'bg-slate-100 text-slate-700'
          }`}
        >
          {status}
        </span>
      </div>
      <p className="mt-1 text-[13.5px] text-[#565c65]">{desc}</p>
    </div>
  );
}
