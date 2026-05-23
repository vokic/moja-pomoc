import { useLang, type Lang } from '@/lib/lang-context';

type Props = {
  lastVerified: string;
  variant?: 'inline' | 'banner';
  className?: string;
};

const MONTHS = {
  sr: [
    'januar', 'februar', 'mart', 'april', 'maj', 'jun',
    'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar',
  ],
  en: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ],
} as const;

function formatMonth(iso: string, lang: Lang): string {
  const m = /^(\d{4})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const year = m[1];
  const month = Number(m[2]) - 1;
  return `${MONTHS[lang][month] ?? ''} ${year}`.trim();
}

export function DataFreshness({ lastVerified, variant = 'inline', className = '' }: Props) {
  const { t, lang } = useLang();
  const when = formatMonth(lastVerified, lang);
  if (variant === 'banner') {
    return (
      <p
        className={`rounded border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] leading-snug text-slate-700 ${className}`}
      >
        <strong>{t('data_freshness.banner_prefix')}</strong> {when}.{' '}
        {t('data_freshness.banner_suffix')}
      </p>
    );
  }
  return (
    <p className={`text-[11.5px] italic text-slate-500 ${className}`}>
      {t('data_freshness.inline', { when })}
    </p>
  );
}
