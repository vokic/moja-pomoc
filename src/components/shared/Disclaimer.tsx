type Variant = 'banner' | 'compact';

type Props = {
  variant?: Variant;
  className?: string;
};

const TEXT =
  'Moja Pomoć je informativni alat. Konačnu odluku donose nadležne institucije. ' +
  'Pre podnošenja zahteva, proverite uslove sa nadležnom institucijom. ' +
  'Aplikacija ne čuva vaše lične podatke van vašeg pretraživača.';

export function Disclaimer({ variant = 'banner', className = '' }: Props) {
  if (variant === 'compact') {
    return (
      <p className={`text-[12px] italic text-[#565c65] ${className}`}>{TEXT}</p>
    );
  }
  return (
    <aside
      role="note"
      className={`rounded-md border border-amber-200 bg-amber-50 p-4 text-[13.5px] leading-relaxed text-amber-900 ${className}`}
    >
      {TEXT}
    </aside>
  );
}
