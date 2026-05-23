import { useEffect, useState } from 'react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { track } from '@/lib/analytics';
import { useLang } from '@/lib/lang-context';

type Vote = 'up' | 'down';
type Phase = 'idle' | 'commenting' | 'done';

type Props = { pravoId: string };

const STORAGE_KEY = (id: string) => `mp_pravo_feedback_${id}`;
const MAX_COMMENT_LEN = 500;

export function PravoFeedback({ pravoId }: Props) {
  const { t } = useLang();
  const [phase, setPhase] = useState<Phase>('idle');
  const [vote, setVote] = useState<Vote | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    setPhase('idle');
    setVote(null);
    setComment('');
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY(pravoId));
      if (stored === 'up' || stored === 'down') {
        setVote(stored);
        setPhase('done');
      }
    } catch {
      /* ignore */
    }
  }, [pravoId]);

  const persistVote = (v: Vote) => {
    try {
      window.localStorage.setItem(STORAGE_KEY(pravoId), v);
    } catch {
      /* ignore */
    }
  };

  const handleUp = () => {
    if (phase !== 'idle') return;
    setVote('up');
    setPhase('done');
    persistVote('up');
    track('pravo_feedback', { pravo_id: pravoId, vote: 'up' });
  };

  const handleDown = () => {
    if (phase !== 'idle') return;
    setVote('down');
    setPhase('commenting');
  };

  const sendDownWithComment = () => {
    const c = comment.trim().slice(0, MAX_COMMENT_LEN);
    setPhase('done');
    persistVote('down');
    track('pravo_feedback', c ? { pravo_id: pravoId, vote: 'down', comment: c } : { pravo_id: pravoId, vote: 'down' });
  };

  if (phase === 'done' && vote) {
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

  if (phase === 'commenting') {
    return (
      <aside className="mt-10 rounded-md border border-rose-200 bg-rose-50/40 p-4">
        <p className="text-[14px] font-semibold text-rose-900">
          {t('pravo.feedback.comment.prompt')}
        </p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT_LEN))}
          placeholder={t('pravo.feedback.comment.placeholder')}
          rows={3}
          maxLength={MAX_COMMENT_LEN}
          className="mt-2 w-full resize-none rounded-md border border-rose-200 bg-white px-3 py-2 text-[13.5px] text-[#1b1b1b] placeholder:text-[#9aa3ad] focus:border-rose-400 focus:outline-none"
        />
        <div className="mt-2 flex justify-between text-[11.5px] text-rose-800/70">
          <span>{comment.length}/{MAX_COMMENT_LEN}</span>
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={sendDownWithComment}
            className="rounded-md border border-[#dfe1e2] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#565c65] hover:border-[#9aa3ad] hover:text-[#1b1b1b]"
          >
            {t('pravo.feedback.comment.skip')}
          </button>
          <button
            type="button"
            onClick={sendDownWithComment}
            disabled={comment.trim().length === 0}
            className="rounded-md bg-rose-600 px-3 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-300"
          >
            {t('pravo.feedback.comment.submit')}
          </button>
        </div>
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
          onClick={handleUp}
          aria-label={t('pravo.feedback.up')}
          className="inline-flex items-center gap-2 rounded-md border border-[#dfe1e2] bg-white px-4 py-2 text-[13.5px] font-semibold text-[#1b1b1b] transition-colors hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900"
        >
          <ThumbsUp className="h-4 w-4" aria-hidden />
          {t('pravo.feedback.up')}
        </button>
        <button
          type="button"
          onClick={handleDown}
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
