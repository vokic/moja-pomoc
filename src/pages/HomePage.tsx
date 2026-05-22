import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/usePageTitle';

export function HomePage() {
  usePageTitle();
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
      <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-[var(--brand-primary)] sm:text-4xl md:text-5xl">
        Otkrijte sva državna prava koja vam pripadaju
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#565c65] sm:text-[17px]">
        Besplatno, anonimno, bez čuvanja podataka. Odgovorite na nekoliko pitanja —
        pokazaćemo vam sve subvencije, naknade i pomoći koje verovatno propuštate.
      </p>

      <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <Button asChild size="lg" className="h-12 px-6 text-[15px]">
          <Link to="/wizard">Saznaj šta mi pripada (~2 min)</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-12 px-6 text-[15px]">
          <Link to="/pretraga">Pretraži prava</Link>
        </Button>
      </div>

      <p className="mx-auto mt-8 max-w-xl text-pretty text-[13.5px] leading-relaxed text-[#565c65]">
        Ne znate šta da tražite? Krenite sa vodičem — postavićemo nekoliko pitanja i
        pokazaćemo sva prava koja vam mogu pripadati, čak i ona o kojima niste
        razmišljali.
      </p>
    </div>
  );
}
