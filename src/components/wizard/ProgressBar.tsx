type Props = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: Props) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[12px] text-[#565c65]">
        <span className="font-semibold uppercase tracking-wider">
          Korak {current + 1} od {total}
        </span>
        <span>{Math.round(((current + 1) / total) * 100)}%</span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => {
          const filled = i <= current;
          const active = i === current;
          return (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                filled ? 'bg-[#162e51]' : 'bg-[#dfe1e2]'
              } ${active ? 'ring-2 ring-[#00bde3]/40 ring-offset-1' : ''}`}
              aria-hidden="true"
            />
          );
        })}
      </div>
    </div>
  );
}
