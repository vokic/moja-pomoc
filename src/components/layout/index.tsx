import { Link, NavLink } from 'react-router-dom';
import { useScript } from '@/lib/script-context';
import { useTheme, type Theme } from '@/lib/theme-context';

const NAV = [
  { to: '/', label: 'Početna' },
  { to: '/wizard', label: 'Vodič za prava' },
  { to: '/pretraga', label: 'Sve pomoći i naknade' },
  { to: '/rezultati', label: 'Moji rezultati' },
  { to: '/o-projektu', label: 'O projektu' },
  { to: '/podrzite', label: 'Podržite' },
] as const;

// ============================================================
//  THEME TOKENS
//  USA  — USA.gov / Benefits.gov (Public Sans, navy #162e51, cyan #00bde3)
//  SR   — eUprava-style (PT Sans, navy #1B3A6B, red #C8102E)
// ============================================================

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-0">
      {(['usa', 'srpski'] as Theme[]).map((t, i) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`${i > 0 ? '-ml-px' : ''} border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
            theme === t
              ? 'border-current bg-current'
              : 'border-[#dfe1e2] bg-white text-[#565c65] hover:text-[#1b1b1b]'
          }`}
          style={
            theme === t
              ? {
                  color: t === 'usa' ? '#162e51' : '#1B3A6B',
                  backgroundColor: t === 'usa' ? '#162e51' : '#1B3A6B',
                }
              : undefined
          }
          aria-pressed={theme === t}
        >
          <span className={theme === t ? 'text-white' : ''}>{t === 'usa' ? 'USA' : 'SR'}</span>
        </button>
      ))}
    </div>
  );
}

function ScriptSwitch({ activeBg }: { activeBg: string }) {
  const { script, setScript } = useScript();
  return (
    <div className="flex items-center gap-0">
      <button
        onClick={() => setScript('lat')}
        className="border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
        style={
          script === 'lat'
            ? { borderColor: activeBg, backgroundColor: activeBg, color: 'white' }
            : { borderColor: '#dfe1e2', backgroundColor: 'white', color: '#565c65' }
        }
        aria-pressed={script === 'lat'}
      >
        Lat
      </button>
      <button
        onClick={() => setScript('cyr')}
        className="-ml-px border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
        style={
          script === 'cyr'
            ? { borderColor: activeBg, backgroundColor: activeBg, color: 'white' }
            : { borderColor: '#dfe1e2', backgroundColor: 'white', color: '#565c65' }
        }
        aria-pressed={script === 'cyr'}
      >
        Ћир
      </button>
    </div>
  );
}

// ============================================================
//  USA HEADER (current — Benefits.gov / USA.gov pattern)
// ============================================================

function UsaHeader() {
  return (
    <header>
      <div className="border-b border-[#dfe1e2] bg-[#f0f0f0] text-[13px] text-[#1b1b1b]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-3 w-5 overflow-hidden border border-black/10" aria-hidden>
              <span className="h-full w-1/3 bg-[#C8102E]" />
              <span className="h-full w-1/3 bg-[#0C4076]" />
              <span className="h-full w-1/3 bg-white" />
            </span>
            <span>Moja Pomoć &middot; Republika Srbija</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeSwitch />
            <ScriptSwitch activeBg="#162e51" />
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
                Vodič kroz prava i naknade u Srbiji
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
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function UsaFooter() {
  return (
    <footer className="mt-16">
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
              <p className="mt-4 text-[14px] leading-relaxed text-white/85">
                Besplatan alat koji pomaže da otkrijete prava, subvencije i pomoći koje vam
                pripadaju u Srbiji.
              </p>
            </div>
            <div>
              <h4 className="text-[15px] font-bold">Brzi linkovi</h4>
              <ul className="mt-3 space-y-2 text-[14px] text-white/85">
                <li>
                  <Link to="/wizard" className="hover:text-white hover:underline">
                    Pokrenite vodič
                  </Link>
                </li>
                <li>
                  <Link to="/pretraga" className="hover:text-white hover:underline">
                    Sve pomoći i naknade
                  </Link>
                </li>
                <li>
                  <Link to="/rezultati" className="hover:text-white hover:underline">
                    Moji rezultati
                  </Link>
                </li>
                <li>
                  <Link to="/o-projektu" className="hover:text-white hover:underline">
                    O projektu
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[15px] font-bold">Zvanične institucije</h4>
              <ul className="mt-3 space-y-2 text-[14px] text-white/85">
                <li>
                  <a
                    href="https://euprava.gov.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    eUprava ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.pio.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    PIO fond ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.rfzo.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    RFZO ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nsz.gov.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    NSZ ↗
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[15px] font-bold">Kontakt</h4>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/85">
                Pitanja, predlozi i ispravke su dobrodošli.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0b1f3f] text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-[12.5px] md:flex-row">
          <div>© 2026 Moja Pomoć</div>
          <div>Bez kolačića · bez naloga · bez prikupljanja ličnih podataka</div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
//  SR HEADER (eUprava-style)
// ============================================================

function SrHeader() {
  return (
    <header style={{ fontFamily: '"PT Sans", system-ui, sans-serif' }}>
      {/* Top dark band */}
      <div className="bg-[#0A1A33] text-[12.5px] text-white/85">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-1.5">
          <span
            style={{ fontFamily: '"PT Sans Caption", sans-serif' }}
            className="font-bold uppercase tracking-wider"
          >
            Moja Pomoć — informativni alat
          </span>
          <div className="flex items-center gap-3">
            <ThemeSwitch />
            <ScriptSwitch activeBg="#1B3A6B" />
          </div>
        </div>
      </div>

      {/* Brand band */}
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
              <span className="block text-[12px] text-[#565c65]">
                Republika Srbija · vodič kroz prava i naknade
              </span>
            </span>
          </Link>
          <div className="hidden items-center gap-2 text-[12px] text-[#565c65] md:flex">
            <span className="inline-flex h-5 w-7 overflow-hidden border border-[#D5DCE3]" aria-hidden>
              <span className="h-full w-1/3 bg-[#C8102E]" />
              <span className="h-full w-1/3 bg-[#1B3A6B]" />
              <span className="h-full w-1/3 bg-white" />
            </span>
            <span>RS · SRB</span>
          </div>
        </div>
      </div>

      {/* Main nav — navy bar */}
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
              {n.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

function SrFooter() {
  return (
    <footer className="mt-16" style={{ fontFamily: '"PT Sans", system-ui, sans-serif' }}>
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
                Republika Srbija · besplatan informativni vodič kroz prava i naknade.
              </p>
            </div>
            <div>
              <h4
                className="text-[14px] font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: '"PT Sans Caption", sans-serif' }}
              >
                Brzi linkovi
              </h4>
              <ul className="mt-3 space-y-2 text-[14px] text-white/80">
                <li>
                  <Link to="/wizard" className="hover:text-white hover:underline">
                    Pokrenite vodič
                  </Link>
                </li>
                <li>
                  <Link to="/pretraga" className="hover:text-white hover:underline">
                    Sve pomoći i naknade
                  </Link>
                </li>
                <li>
                  <Link to="/rezultati" className="hover:text-white hover:underline">
                    Moji rezultati
                  </Link>
                </li>
                <li>
                  <Link to="/o-projektu" className="hover:text-white hover:underline">
                    O projektu
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className="text-[14px] font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: '"PT Sans Caption", sans-serif' }}
              >
                Institucije
              </h4>
              <ul className="mt-3 space-y-2 text-[14px] text-white/80">
                <li>
                  <a
                    href="https://euprava.gov.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    eUprava ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.pio.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    PIO fond ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.rfzo.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    RFZO ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nsz.gov.rs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    NSZ ↗
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className="text-[14px] font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: '"PT Sans Caption", sans-serif' }}
              >
                Kontakt
              </h4>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/80">
                Pitanja, predlozi i ispravke su dobrodošli.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black/40 text-white/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-[12.5px] md:flex-row">
          <div>© 2026 Moja Pomoć · Republika Srbija</div>
          <div>Bez kolačića · bez naloga · bez prikupljanja ličnih podataka</div>
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
  const fontFamily =
    theme === 'srpski'
      ? '"PT Sans", system-ui, -apple-system, sans-serif'
      : '"Public Sans", system-ui, -apple-system, "Segoe UI", sans-serif';
  const bg = theme === 'srpski' ? '#F2F4F7' : '#ffffff';
  return (
    <div
      data-theme={theme}
      className="flex min-h-screen flex-col text-[#1b1b1b]"
      style={{ fontFamily, backgroundColor: bg }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-[var(--brand-primary)] focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Preskoči na glavni sadržaj
      </a>
      <Header />
      <main id="main" className="flex-1" style={{ backgroundColor: bg }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
