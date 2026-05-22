import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/usePageTitle';

export function HomePage() {
  usePageTitle();
  return (
    <section className="relative isolate flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center overflow-hidden">
      {/* Background image + gradient overlays */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src="/images/hero-img.avif"
          alt=""
          className="h-full w-full object-cover object-center"
          decoding="async"
          fetchPriority="high"
        />
        {/* Top wash so the header band blends in */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/55 to-white/90" />
        {/* Brand tint left -> right for a subtle theme color */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)]/15 via-transparent to-[var(--brand-primary)]/15" />
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
        <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-[var(--brand-primary)] drop-shadow-sm sm:text-4xl md:text-5xl">
          Otkrijte sva državna prava koja vam pripadaju
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] font-medium leading-relaxed text-[#1b1b1b] sm:text-[17px]">
          Besplatno, anonimno, bez čuvanja podataka. Odgovorite na nekoliko pitanja —
          pokazaćemo vam sve subvencije, naknade i pomoći koje verovatno propuštate.
        </p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="h-12 bg-[#1B3A6B] px-6 text-[15px] text-white shadow-md hover:bg-[#0F2547]"
          >
            <Link to="/wizard">Saznaj šta mi pripada (~2 min)</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 bg-white/85 px-6 text-[15px] backdrop-blur-sm"
          >
            <Link to="/pretraga">Pretraži prava</Link>
          </Button>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-pretty text-[13.5px] leading-relaxed text-[#1b1b1b]/80">
          Ne znate šta da tražite? Krenite sa vodičem — postavićemo nekoliko pitanja i
          pokazaćemo sva prava koja vam mogu pripadati, čak i ona o kojima niste
          razmišljali.
        </p>
      </div>
    </section>
  );
}
