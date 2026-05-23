import { kategorijaLabel } from '@/lib/labels';
import { useLang } from '@/lib/lang-context';
import type { Kategorija } from '@/types';

type Props = {
  available: Kategorija[];
  selected: Kategorija[];
  onChange: (next: Kategorija[]) => void;
};

export function CategoryFilter({ available, selected, onChange }: Props) {
  const { t, lang } = useLang();
  const toggle = (k: Kategorija) => {
    onChange(selected.includes(k) ? selected.filter((x) => x !== k) : [...selected, k]);
  };

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={t('search.category_filter.label')}>
      <Chip active={selected.length === 0} onClick={() => onChange([])}>
        {t('search.filter.all')}
      </Chip>
      {available.map((k) => (
        <Chip key={k} active={selected.includes(k)} onClick={() => toggle(k)}>
          {kategorijaLabel(k, lang)}
        </Chip>
      ))}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
        active
          ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white'
          : 'border-[#dfe1e2] bg-white text-[#1b1b1b] hover:border-[var(--brand-primary)]/40 hover:bg-[#f0f0f0]'
      }`}
    >
      {children}
    </button>
  );
}
