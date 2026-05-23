import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/lang-context';
import { usePageTitle } from '@/hooks/usePageTitle';

export function HomePage() {
  usePageTitle();
  const { t } = useLang();
  return (
    <section className="relative isolate flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src="/images/hero-img.avif"
          alt=""
          className="h-full w-full object-cover object-center"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/55 to-white/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)]/15 via-transparent to-[var(--brand-primary)]/15" />
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
        <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-[var(--brand-primary)] drop-shadow-sm sm:text-4xl md:text-5xl">
          {t('home.hero.title')}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] font-medium leading-relaxed text-[#1b1b1b] sm:text-[17px]">
          {t('home.hero.subtitle')}
        </p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="h-12 bg-[#1B3A6B] px-6 text-[15px] text-white shadow-md hover:bg-[#0F2547]"
          >
            <Link to="/wizard">{t('home.cta.primary')}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 bg-white/85 px-6 text-[15px] backdrop-blur-sm"
          >
            <Link to="/pretraga">{t('home.cta.secondary')}</Link>
          </Button>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-pretty text-[13.5px] leading-relaxed text-[#1b1b1b]/80">
          {t('home.helper')}
        </p>
      </div>
    </section>
  );
}
