export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-[#162e51]">O projektu</h1>

      <p className="mt-4 text-[15px] leading-relaxed text-[#1b1b1b]">
        <strong>Moja Pomoć</strong> je besplatna nezavisna platforma koja građanima
        Srbije pomaže da otkriju prava, subvencije i pomoći koje im pripadaju — a
        koje često propuste jer ne znaju da postoje.
      </p>

      <h2 className="mt-8 text-xl font-bold text-[#162e51]">Kako radi</h2>
      <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-[#1b1b1b]">
        <li>1. Popunjavate kratak vodič (~2 minuta) ili pretražujete katalog.</li>
        <li>2. Aplikacija upoređuje vaš profil sa katalogom prava.</li>
        <li>3. Dobijate listu prava sa uputstvima — gde, kako i sa čime.</li>
      </ul>

      <h2 className="mt-8 text-xl font-bold text-[#162e51]">Privatnost</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[#1b1b1b]">
        Sve podatke obrađujemo lokalno u vašem pretraživaču. Bez naloga, bez
        kolačića za praćenje, bez prikupljanja ličnih podataka.
      </p>

      <p className="mt-8 text-[13.5px] italic text-[#565c65]">
        Detaljniji sadržaj stiže pre lansiranja.
      </p>
    </div>
  );
}
