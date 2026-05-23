import { track } from '@/lib/analytics';
import { useLang } from '@/lib/lang-context';
import type { TKey } from '@/lib/i18n';
import { usePageTitle } from '@/hooks/usePageTitle';

const PARTNER_PLACEHOLDERS: ReadonlyArray<{ initials: string; roleKey: TKey }> = [
  { initials: 'A', roleKey: 'support.partners.placeholder.role.legal' },
  { initials: 'B', roleKey: 'support.partners.placeholder.role.content' },
  { initials: 'C', roleKey: 'support.partners.placeholder.role.sponsor' },
  { initials: 'D', roleKey: 'support.partners.placeholder.role.distribution' },
];

export function SupportPage() {
  const { t } = useLang();
  usePageTitle(t('support.page_title'));

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold text-[var(--brand-primary)]">{t('support.page_title')}</h1>

      <p className="mt-4 text-[15px] leading-relaxed text-[#1b1b1b]">{t('support.intro')}</p>

      <h2 className="mt-10 text-xl font-bold text-[var(--brand-primary)]">
        {t('support.partners.title')}
      </h2>
      <p className="mt-2 text-[13.5px] italic text-[#565c65]">{t('support.partners.empty')}</p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PARTNER_PLACEHOLDERS.map((p, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-md border border-dashed border-[#dfe1e2] bg-white p-4"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] font-bold text-[#9aa3ad]">
              {p.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold uppercase tracking-wider text-[#9aa3ad]">
                {t('support.partners.title')} #{i + 1}
              </div>
              <div className="mt-0.5 text-[14px] text-[#565c65]">{t(p.roleKey)}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-bold text-[var(--brand-primary)]">
        {t('support.help.title')}
      </h2>
      <ul className="mt-3 space-y-2 text-[14.5px] leading-relaxed text-[#1b1b1b]">
        <li>· {t('support.help.propose')}</li>
        <li>· {t('support.help.code')}</li>
        <li>· {t('support.help.share')}</li>
        <li>· {t('support.help.ngo')}</li>
      </ul>

      <h2 className="mt-10 text-xl font-bold text-[var(--brand-primary)]">
        {t('support.contact.title')}
      </h2>
      <p className="mt-3 text-[14.5px] leading-relaxed text-[#1b1b1b]">{t('support.contact.body')}</p>

      <div className="mt-8">
        <button
          type="button"
          onClick={() => {
            track('share_clicked', { source: 'support' });
            if (typeof navigator !== 'undefined' && navigator.share) {
              navigator
                .share({
                  title: 'Moja Pomoć',
                  text: t('home.hero.title'),
                  url: window.location.origin,
                })
                .catch(() => {
                  /* ignore */
                });
            }
          }}
          className="rounded-md border border-[var(--brand-primary)] px-4 py-2 text-[14px] font-semibold text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
        >
          {t('support.share')}
        </button>
      </div>
    </div>
  );
}
