type Props = {
  lastVerified: string;
  variant?: 'inline' | 'banner';
  className?: string;
};

const MONTHS_SR = [
  'januar', 'februar', 'mart', 'april', 'maj', 'jun',
  'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar',
];

function formatMonth(iso: string): string {
  // iso: "YYYY-MM-DD" — keep deterministic, avoid locale surprises.
  const m = /^(\d{4})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const year = m[1];
  const month = Number(m[2]) - 1;
  return `${MONTHS_SR[month] ?? ''} ${year}`.trim();
}

/**
 * Small, visible "informacije ažurirane / proverite na zvaničnom sajtu"
 * disclaimer. Goes on every ResultCard (inline, subtle) and on every
 * PravoDetail header (banner, more prominent).
 */
export function DataFreshness({ lastVerified, variant = 'inline', className = '' }: Props) {
  const when = formatMonth(lastVerified);
  if (variant === 'banner') {
    return (
      <p
        className={`rounded border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] leading-snug text-slate-700 ${className}`}
      >
        <strong>Informacije ažurirane:</strong> {when}. Pre podnošenja zahteva,
        proverite uslove i iznose na zvaničnom sajtu institucije.
      </p>
    );
  }
  return (
    <p className={`text-[11.5px] italic text-slate-500 ${className}`}>
      Ažurirano {when} · verifikujte na zvaničnom sajtu pre podnošenja
    </p>
  );
}
