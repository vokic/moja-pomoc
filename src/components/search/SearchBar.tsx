import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLang } from '@/lib/lang-context';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder }: Props) {
  const { t } = useLang();
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#565c65]"
        aria-hidden
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? t('search.placeholder')}
        aria-label={t('search.aria_label')}
        className="h-11 pl-9"
      />
    </div>
  );
}
