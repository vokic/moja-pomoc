import { useEffect, useState } from 'react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { track } from '@/lib/analytics';
import { useLang } from '@/lib/lang-context';

type Vote = 'up' | 'down';

type Props = { pravoId: string };

const STORAGE_KEY = (id: string) => `mp_pravo_feedback_${id}`;

export function PravoFeedback({ pravoId }: Props) {
  const { t } = useLang();
  const [vote, setVote] = useState<Vote | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY(pravoId));
      if (stored === 'up' || stored === 'down') setVote(stored);
      else setVote(null);
    } catch {
      /* ignore */
    }
  }, [pravoId]);

  const submit = (v: Vote) => {
    if (vote) return;
    setVote(v);
    try {
      window.localStorage.setItem(STORAGE_KEY(pravoId), v);
    } catch {
      /* ignore */
    }
    track('pravo_feedback', { pravo_id: pravoId, vote: v });
  };

  if (vote) {
    return (
      <aside
        className="mt-10 rounded-md border border-emerald-200 bg-emerald-50/60 p-4 text-center"
        role="status"
      >
        <p className="text-[14px] font-semibold text-emerald-900">{t('pravo.feedback.thanks')}</p>
        <p className="mt-1 text-[12.5px] text-emerald-800">
          {vote === 'down' ? t('pravo.feedback.thanks.down') : t('pravo.feedback.thanks.up')}
        </p>
      </aside>
    );
  }

  return (
    <aside className="mt-10 rounded-md border border-[#dfe1e2] bg-white p-4 text-center">
      <p className="text-[14px] font-semibold text-[var(--brand-primary)]">
        {t('pravo.feedback.question')}
      </p>
      <p className="mt-1 text-[12.5px] text-[#565c65]">{t('pravo.feedback.subtitle')}</p>
      <div className="mt-3 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => submit('up')}
          aria-label={t('pravo.feedback.up')}
          className="inline-flex items-center gap-2 rounded-md border border-[#dfe1e2] bg-white px-4 py-2 text-[13.5px] font-semibold text-[#1b1b1b] transition-colors hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900"
        >
          <ThumbsUp className="h-4 w-4" aria-hidden />
          {t('pravo.feedback.up')}
        </button>
        <button
          type="button"
          onClick={() => submit('down')}
          aria-label={t('pravo.feedback.down')}
          className="inline-flex items-center gap-2 rounded-md border border-[#dfe1e2] bg-white px-4 py-2 text-[13.5px] font-semibold text-[#1b1b1b] transition-colors hover:border-rose-400 hover:bg-rose-50 hover:text-rose-900"
        >
          <ThumbsDown className="h-4 w-4" aria-hidden />
          {t('pravo.feedback.down')}
        </button>
      </div>
    </aside>
  );
}
