import { Link } from 'react-router-dom';
import { useLang } from '@/lib/lang-context';
import { usePageTitle } from '@/hooks/usePageTitle';

export function AboutPage() {
  const { t, lang } = useLang();
  usePageTitle(t('about.page_title'));

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold text-[var(--brand-primary)]">{t('about.page_title')}</h1>

      <section className="mt-6 text-[15px] leading-relaxed text-[#1b1b1b]">
        <p dangerouslySetInnerHTML={{ __html: t('about.lead_p1') }} />
        <p className="mt-3">{t('about.lead_p2')}</p>
      </section>

      <h2 className="mt-10 text-xl font-bold text-[var(--brand-primary)]">
        {t('about.howitworks')}
      </h2>
      <ol className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-[#1b1b1b]">
        <Step n={1} title={t('about.step1.title')} desc={t('about.step1.body')} />
        <Step n={2} title={t('about.step2.title')} desc={t('about.step2.body')} />
        <Step n={3} title={t('about.step3.title')} desc={t('about.step3.body')} />
        <Step n={4} title={t('about.step4.title')} desc={t('about.step4.body')} />
      </ol>

      <h2 className="mt-10 text-xl font-bold text-[var(--brand-primary)]">{t('about.privacy')}</h2>
      <ul className="mt-3 space-y-2 text-[14.5px] leading-relaxed text-[#1b1b1b]">
        <li>
          · {lang === 'en'
            ? 'No accounts, no signup, no identity verification.'
            : 'Bez naloga, bez prijave, bez verifikacije identiteta.'}
        </li>
        <li>
          · {lang === 'en' ? (
            <>
              User profile lives only in browser <code>localStorage</code>. Nothing goes to a server.
            </>
          ) : (
            <>
              Profil korisnika živi samo u <code>localStorage</code> vašeg pretraživača. Ne odlazi na
              server.
            </>
          )}
        </li>
        <li>
          · {lang === 'en'
            ? 'No tracking cookies. No Google Analytics, no Facebook Pixel.'
            : 'Bez kolačića za praćenje. Bez Google Analytics, bez Facebook Pixel.'}
        </li>
        <li>
          · {lang === 'en'
            ? 'Aggregate analytics via PostHog (page count + click count, no personal data). GDPR-compliant by design.'
            : 'Agregisana analitika preko PostHog-a (samo broj poseta i klikova, bez ličnih podataka). GDPR-compliant by design.'}
        </li>
      </ul>

      <h2 className="mt-10 text-xl font-bold text-[var(--brand-primary)]">
        {t('about.opensource')}
      </h2>
      <p className="mt-3 text-[14.5px] leading-relaxed text-[#1b1b1b]">{t('about.opensource.body')}</p>

      {/* Plan razvoja */}
      <h2 className="mt-12 text-xl font-bold text-[var(--brand-primary)]">{t('about.plan.title')}</h2>
      <p className="mt-2 text-[14.5px] leading-relaxed text-[#1b1b1b]">{t('about.plan.intro')}</p>

      <PlanSection title={t('about.plan.v1.title')} items={[
        t('about.plan.v1.1'),
        t('about.plan.v1.2'),
        t('about.plan.v1.3'),
        t('about.plan.v1.4'),
      ]} badge="✓" badgeColor="bg-emerald-100 text-emerald-900" />

      <PlanSection title={t('about.plan.v15.title')} items={[
        t('about.plan.v15.1'),
        t('about.plan.v15.2'),
        t('about.plan.v15.3'),
        t('about.plan.v15.4'),
        t('about.plan.v15.5'),
      ]} badge="◷" badgeColor="bg-amber-100 text-amber-900" />

      <PlanSection title={t('about.plan.v2.title')} items={[
        t('about.plan.v2.1'),
        t('about.plan.v2.2'),
        t('about.plan.v2.3'),
        t('about.plan.v2.4'),
      ]} badge="◷" badgeColor="bg-slate-100 text-slate-700" />

      <PlanSection title={t('about.plan.cont.title')} items={[
        t('about.plan.cont.1'),
        t('about.plan.cont.2'),
        t('about.plan.cont.3'),
        t('about.plan.cont.4'),
      ]} badge="∞" badgeColor="bg-slate-100 text-slate-700" />

      <PlanSection title={t('about.plan.never.title')} items={[
        t('about.plan.never.1'),
        t('about.plan.never.2'),
        t('about.plan.never.3'),
        t('about.plan.never.4'),
      ]} badge="✕" badgeColor="bg-rose-100 text-rose-900" />

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/podrska"
          className="rounded-md bg-[var(--brand-primary)] px-4 py-2 text-[14px] font-semibold text-white hover:bg-[var(--brand-primary-dark)]"
        >
          {t('about.cta.support')}
        </Link>
        <Link
          to="/wizard"
          className="rounded-md border border-[var(--brand-primary)] px-4 py-2 text-[14px] font-semibold text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
        >
          {t('about.cta.wizard')}
        </Link>
      </div>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-[13px] font-bold text-white">
        {n}
      </span>
      <div className="flex-1">
        <h3 className="text-[15px] font-semibold text-[var(--brand-primary)]">{title}</h3>
        <p className="mt-0.5 text-[#1b1b1b]">{desc}</p>
      </div>
    </li>
  );
}

function PlanSection({
  title,
  items,
  badge,
  badgeColor,
}: {
  title: string;
  items: string[];
  badge: string;
  badgeColor: string;
}) {
  return (
    <div className="mt-6 rounded-md border border-[#dfe1e2] bg-white p-4">
      <div className="flex items-center gap-2">
        <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[14px] font-bold ${badgeColor}`}>
          {badge}
        </span>
        <h3 className="text-[15px] font-bold text-[var(--brand-primary)]">{title}</h3>
      </div>
      <ul className="mt-3 ml-9 space-y-1.5 text-[14px] leading-relaxed text-[#1b1b1b]">
        {items.map((item, i) => (
          <li key={i}>· {item}</li>
        ))}
      </ul>
    </div>
  );
}
