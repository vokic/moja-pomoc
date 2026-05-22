import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder }: Props) {
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
        placeholder={placeholder ?? 'Pretražite po nazivu prava…'}
        aria-label="Pretraga prava"
        className="h-11 pl-9"
      />
    </div>
  );
}
