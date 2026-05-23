import { useLang } from '@/lib/lang-context';

type Variant = 'banner' | 'compact';

type Props = {
  variant?: Variant;
  className?: string;
};

export function Disclaimer({ variant = 'banner', className = '' }: Props) {
  const { t } = useLang();
  const text = t('disclaimer.text');
  if (variant === 'compact') {
    return <p className={`text-[12px] italic text-[#565c65] ${className}`}>{text}</p>;
  }
  return (
    <aside
      role="note"
      className={`rounded-md border border-amber-200 bg-amber-50 p-4 text-[13.5px] leading-relaxed text-amber-900 ${className}`}
    >
      {text}
    </aside>
  );
}
