import { Link } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';

export function AboutPage() {
  usePageTitle('O projektu');
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold text-[#162e51]">O projektu</h1>

      <section className="mt-6 text-[15px] leading-relaxed text-[#1b1b1b]">
        <p>
          <strong>Moja Pomoć</strong> je besplatna, nezavisna i otvorena
          platforma koja građanima Srbije pomaže da otkriju prava, subvencije i
          pomoći koje im pripadaju — a koje često propuste jer ne znaju da
          postoje.
        </p>
        <p className="mt-3">
          Prosečno srpsko domaćinstvo propušta tri do pet državnih pomoći.
          Informacije su rasute po više institucija. Najugroženiji građani —
          stariji, hronični bolesnici, osobe sa invaliditetom, samohrani
          roditelji — su istovremeno i najlošije informisani. Cilj projekta je
          da ovu jaz smanjimo.
        </p>
      </section>

      <h2 className="mt-10 text-xl font-bold text-[#162e51]">Kako radi</h2>
      <ol className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-[#1b1b1b]">
        <Step
          n={1}
          title="Opišete situaciju"
          desc="Devet kratkih pitanja o starosti, porodici, zdravlju, primanjima i posebnim okolnostima. Bez ličnih podataka."
        />
        <Step
          n={2}
          title="Lokalni rule engine matchuje katalog"
          desc="Vaš profil se upoređuje sa katalogom prava. Sve se dešava u pretraživaču — bez slanja podataka."
        />
        <Step
          n={3}
          title="Dobijete listu prava sa uputstvima"
          desc="Za svako pravo: ko ima pravo, koraci postupka, dokumenti, gde se obratiti, česte greške."
        />
        <Step
          n={4}
          title="Vi predajete zahtev"
          desc="Ne popunjavamo zahteve umesto vas — to ostaje vaš čin. Mi vam dajemo uputstvo i checklistu."
        />
      </ol>

      <h2 className="mt-10 text-xl font-bold text-[#162e51]">Privatnost</h2>
      <ul className="mt-3 space-y-2 text-[14.5px] leading-relaxed text-[#1b1b1b]">
        <li>· Bez naloga, bez prijave, bez verifikacije identiteta.</li>
        <li>
          · Profil korisnika živi samo u <code>localStorage</code> vašeg
          pretraživača. Ne odlazi na server.
        </li>
        <li>· Bez kolačića za praćenje. Bez Google Analytics, bez Facebook Pixel.</li>
        <li>
          · Agregisana analitika preko Plausible (samo broj poseta i klikova,
          bez ličnih podataka). GDPR-compliant by design.
        </li>
      </ul>

      <h2 className="mt-10 text-xl font-bold text-[#162e51]">Otvoreni kod</h2>
      <p className="mt-3 text-[14.5px] leading-relaxed text-[#1b1b1b]">
        Kod je javan pod MIT licencom. Katalog prava je javan pod CC-BY-SA 4.0.
        Svako može da pregleda, prijavi grešku, predloži dodavanje prava ili
        dopune.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/podrzite"
          className="rounded-md bg-[#162e51] px-4 py-2 text-[14px] font-semibold text-white hover:bg-[#0b1f3f]"
        >
          Podržite projekat
        </Link>
        <Link
          to="/wizard"
          className="rounded-md border border-[#162e51] px-4 py-2 text-[14px] font-semibold text-[#162e51] hover:bg-[#162e51] hover:text-white"
        >
          Pokrenite vodič
        </Link>
      </div>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#162e51] text-[13px] font-bold text-white">
        {n}
      </span>
      <div className="flex-1">
        <h3 className="text-[15px] font-semibold text-[#162e51]">{title}</h3>
        <p className="mt-0.5 text-[#1b1b1b]">{desc}</p>
      </div>
    </li>
  );
}
