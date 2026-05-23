import { Link, NavLink } from 'react-router-dom';
import { TrackedLink } from '@/components/shared/TrackedLink';
import { useLang, type Lang } from '@/lib/lang-context';
import type { TKey } from '@/lib/i18n';
import { useTheme } from '@/lib/theme-context';

const NAV: ReadonlyArray<{ to: string; key: TKey }> = [
  { to: '/', key: 'nav.home' },
  { to: '/wizard', key: 'nav.wizard' },
  { to: '/pretraga', key: 'nav.search' },
  { to: '/rezultati', key: 'nav.results' },
  { to: '/o-projektu', key: 'nav.about' },
  { to: '/podrska', key: 'nav.support' },
];

// ============================================================
//  THEME TOKENS
//  USA  - USA.gov / Benefits.gov (Nunito Sans + Merriweather logo)
//  SR   - eUprava-style (Nunito Sans body + PT Sans Caption logo)
//  ThemeSwitch UI temporarily hidden - restore from git history once we
//  decide which theme to keep long-term.
// ============================================================

function LanguageSwitch({ activeBg }: { activeBg: string }) {
  const { lang, setLang } = useLang();
  const langs: { code: Lang; label: string }[] = [
    { code: 'sr', label: 'RS' },
    { code: 'en', label: 'ENG' },
  ];
  return (
    <div className="flex items-center gap-0">
      {langs.map((l, i) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`${i > 0 ? '-ml-px' : ''} border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider`}
          style={
            lang === l.code
              ? { borderColor: activeBg, backgroundColor: activeBg, color: 'white' }
              : { borderColor: '#dfe1e2', backgroundColor: 'white', color: '#565c65' }
          }
          aria-pressed={lang === l.code}
          aria-label={l.code === 'sr' ? 'Srpski' : 'English'}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================
//  USA HEADER (Benefits.gov / USA.gov pattern)
// ============================================================

function UsaHeader() {
  const { t } = useLang();
  return (
    <header>
      <div className="border-b border-[#dfe1e2] bg-[#f0f0f0] text-[13px] text-[#1b1b1b]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-1.5">
          <div className="flex items-center gap-2">
            <span>{t('header.usa.country_label')}</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitch activeBg="#162e51" />
          </div>
        </div>
      </div>

      <div className="border-b border-[#dfe1e2] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#162e51]">
              <span
                className="text-[11px] font-black leading-none text-white"
                style={{ fontFamily: 'Merriweather, serif' }}
              >
                мп
              </span>
            </span>
            <span className="leading-tight">
              <span className="block text-[16px] font-bold text-[#162e51]">Moja Pomoć</span>
              <span className="hidden text-[11.5px] text-[#565c65] sm:block">
                {t('brand.tagline')}
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-1 overflow-x-auto">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className="px-3 py-2 text-[13.5px] font-semibold text-[#565c65] hover:text-[#162e51] [&.active]:text-[#162e51] [&.active]:underline [&.active]:underline-offset-[6px] [&.active]:decoration-[3px] [&.active]:decoration-[#00bde3]"
              >
                {t(n.key)}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function UsaFooter() {
  const { t } = useLang();
  return (
    <footer>
      <div className="bg-[#162e51] text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                  <span
                    className="text-[12px] font-black leading-none text-[#162e51]"
                    style={{ fontFamily: 'Merriweather, serif' }}
                  >
                    мп
                  </span>
                </span>
                <span className="text-lg font-bold">Moja Pomoć</span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-white/85">{t('footer.tagline.usa')}</p>
            </div>
            <div>
              <h4 className="text-[15px] font-bold">{t('footer.quick_links')}</h4>
              <ul className="mt-3 space-y-2 text-[14px] text-white/85">
                <li>
                  <Link to="/wizard" className="hover:text-white hover:underline">
                    {t('footer.link.wizard')}
                  </Link>
                </li>
                <li>
                  <Link to="/pretraga" className="hover:text-white hover:underline">
                    {t('footer.link.search')}
                  </Link>
                </li>
                <li>
                  <Link to="/rezultati" className="hover:text-white hover:underline">
                    {t('footer.link.results')}
                  </Link>
                </li>
                <li>
                  <Link to="/o-projektu" className="hover:text-white hover:underline">
                    {t('footer.link.about')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[15px] font-bold">{t('footer.institutions')}</h4>
              <ul className="mt-3 space-y-2 text-[14px] text-white/85">
                <li>
                  <TrackedLink
                    source="footer"
                    href="https://euprava.gov.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    eUprava ↗
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink
                    source="footer"
                    href="https://www.pio.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    PIO ↗
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink
                    source="footer"
                    href="https://www.rfzo.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    RFZO ↗
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink
                    source="footer"
                    href="https://www.nsz.gov.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    NSZ ↗
                  </TrackedLink>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[15px] font-bold">{t('footer.contact')}</h4>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/85">{t('footer.contact.body')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0b1f3f] text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-[12.5px] md:flex-row">
          <div>{t('footer.copyright')}</div>
          <div>{t('footer.privacy')}</div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
//  SR HEADER (eUprava-style)
// ============================================================

function SrHeader() {
  const { t } = useLang();
  return (
    <header style={{ fontFamily: '"PT Sans", system-ui, sans-serif' }}>
      <div className="bg-[#0A1A33] text-[12.5px] text-white/85">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-1.5">
          <span
            style={{ fontFamily: '"PT Sans Caption", sans-serif' }}
            className="font-bold uppercase tracking-wider"
          >
            {t('header.sr.tool_label')}
          </span>
          <div className="flex items-center gap-3">
            <LanguageSwitch activeBg="#1B3A6B" />
          </div>
        </div>
      </div>

      <div className="border-b border-[#D5DCE3] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <Link to="/" className="flex items-center gap-4">
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#1B3A6B]"
              style={{ clipPath: 'polygon(50% 0%, 100% 30%, 100% 75%, 50% 100%, 0% 75%, 0% 30%)' }}
            >
              <span
                className="text-[14px] font-bold leading-none text-white"
                style={{ fontFamily: '"PT Sans Caption", sans-serif' }}
              >
                МП
              </span>
            </span>
            <span className="leading-tight">
              <span
                className="block text-[20px] font-bold text-[#0F2547]"
                style={{ fontFamily: '"PT Sans Caption", sans-serif' }}
              >
                Moja Pomoć
              </span>
              <span className="block text-[12px] text-[#565c65]">{t('brand.tagline.short')}</span>
            </span>
          </Link>
        </div>
      </div>

      <nav className="bg-[#1B3A6B] text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-0 overflow-x-auto px-6">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className="border-r border-white/10 px-4 py-3 text-[13.5px] font-bold text-white/90 hover:bg-[#0F2547] hover:text-white [&.active]:bg-[#0F2547] [&.active]:text-white"
              style={{ fontFamily: '"PT Sans Caption", sans-serif' }}
            >
              {t(n.key)}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

function SrFooter() {
  const { t } = useLang();
  return (
    <footer style={{ fontFamily: '"PT Sans", system-ui, sans-serif' }}>
      <div className="bg-[#0A1A33] text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center bg-[#1B3A6B]"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 30%, 100% 75%, 50% 100%, 0% 75%, 0% 30%)',
                  }}
                >
                  <span
                    className="text-[12px] font-bold leading-none text-white"
                    style={{ fontFamily: '"PT Sans Caption", sans-serif' }}
                  >
                    МП
                  </span>
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: '"PT Sans Caption", sans-serif' }}
                >
                  Moja Pomoć
                </span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-white/80">
                {t('footer.tagline.sr')}
              </p>
            </div>
            <div>
              <h4
                className="text-[14px] font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: '"PT Sans Caption", sans-serif' }}
              >
                {t('footer.quick_links')}
              </h4>
              <ul className="mt-3 space-y-2 text-[14px] text-white/80">
                <li>
                  <Link to="/wizard" className="hover:text-white hover:underline">
                    {t('footer.link.wizard')}
                  </Link>
                </li>
                <li>
                  <Link to="/pretraga" className="hover:text-white hover:underline">
                    {t('footer.link.search')}
                  </Link>
                </li>
                <li>
                  <Link to="/rezultati" className="hover:text-white hover:underline">
                    {t('footer.link.results')}
                  </Link>
                </li>
                <li>
                  <Link to="/o-projektu" className="hover:text-white hover:underline">
                    {t('footer.link.about')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className="text-[14px] font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: '"PT Sans Caption", sans-serif' }}
              >
                {t('footer.institutions.sr')}
              </h4>
              <ul className="mt-3 space-y-2 text-[14px] text-white/80">
                <li>
                  <TrackedLink
                    source="footer"
                    href="https://euprava.gov.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    eUprava ↗
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink
                    source="footer"
                    href="https://www.pio.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    PIO ↗
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink
                    source="footer"
                    href="https://www.rfzo.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    RFZO ↗
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink
                    source="footer"
                    href="https://www.nsz.gov.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    NSZ ↗
                  </TrackedLink>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className="text-[14px] font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: '"PT Sans Caption", sans-serif' }}
              >
                {t('footer.contact')}
              </h4>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/80">
                {t('footer.contact.body')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black/40 text-white/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-[12.5px] md:flex-row">
          <div>{t('footer.copyright.sr')}</div>
          <div>{t('footer.privacy')}</div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
//  PUBLIC API
// ============================================================

export function Header() {
  const { theme } = useTheme();
  return theme === 'srpski' ? <SrHeader /> : <UsaHeader />;
}

export function Footer() {
  const { theme } = useTheme();
  return theme === 'srpski' ? <SrFooter /> : <UsaFooter />;
}

export function PageShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const { t } = useLang();
  const fontFamily = '"Nunito Sans", system-ui, -apple-system, "Segoe UI", sans-serif';
  const bg = theme === 'srpski' ? '#F2F4F7' : '#ffffff';
  const headerH = theme === 'srpski' ? '165px' : '95px';
  return (
    <div
      data-theme={theme}
      className="flex min-h-screen flex-col text-[#1b1b1b]"
      style={{ fontFamily, backgroundColor: bg, '--header-h': headerH } as React.CSSProperties}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-[var(--brand-primary)] focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t('skip.main')}
      </a>
      <Header />
      <main id="main" className="flex flex-1 flex-col" style={{ backgroundColor: bg }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
