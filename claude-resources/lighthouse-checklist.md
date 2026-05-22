# Lighthouse audit checklist (post-deploy)

> Cilj: 90+ na sve 4 kategorije. Lighthouse se pokreće tek nakon deploy-a na
> `https://mojapomoc.rs/` (lokalni `npm run preview` daje gruba performance
> brojeve ali ne pravi mreža + CDN slika).

## Pre audit-a

1. Deploy je live na Netlify-u (production branch `main`)
2. PWA service worker registrovan (proveri u DevTools → Application → Service Workers)
3. Catalog se učitava (`/catalog/katalog.json` vraća 200)
4. `VITE_PLAUSIBLE_DOMAIN` env var postavljen → script se učitava
5. Custom domain (mojapomoc.rs) + SSL aktivni

## Audit

Chrome DevTools → Lighthouse → Categories: All → Mode: Navigation →
Device: Mobile → Analyze. Ponoviti za Desktop.

## Kategorije i očekivani rezultati

### Performance (cilj 90+)
- **Largest Contentful Paint** ≤ 2.5s — Geist Google Fonts su preconnected,
  glavni JS chunk je code-splitovan (PDF + html2canvas u zasebnim chunkovima).
  Ako LCP probija prag, razmotri:
  - Inline kritični CSS
  - Optimizovati hero text rendering
- **Cumulative Layout Shift** ≤ 0.1 — Fontovi su font-display: swap. Provera:
  da li hero/heading skače pri swap-u (probably ne)
- **Total Blocking Time** ≤ 300ms — JS bundle je ~357 kB (110 kB gzip). React
  19 + Radix može da bude težak na sporijim uređajima. Razmotri:
  - Dalje code-split (ResultsPage, PravoDetailPage kao lazy routes)
  - Skinuti tw-animate-css ako se ne koristi

### Accessibility (cilj 90+)
- Lang attr: `<html lang="sr-Latn">` ✓
- Skip-to-main link: ✓ (PageShell)
- Color contrast: glavna paleta navy `#162e51` i `#1B3A6B` na beloj >7:1 ✓.
  Muted gray `#565c65` na beloj je 4.7:1 (AA pass). Proveri "verovatno niste
  znali" badge (amber-900 na amber-100 — borderline)
- Touch targets: bumped na 44px-ish u Sprint 3.6
- Aria labels: SearchBar ima aria-label, ScriptSwitch ima aria-pressed,
  WizardStep options imaju role="radio"/role="checkbox"
- Tabs su Radix (built-in keyboard nav)

### Best Practices (cilj 90+)
- HTTPS: ✓ (Netlify auto-SSL)
- No console errors expected
- CSP header u netlify.toml ✓
- No mixed content (sve preko HTTPS)

### SEO (cilj 90+)
- Title, description, OG, Twitter Card — ✓ Sprint 3.5
- robots.txt — TODO (dodati ako Netlify ne dozvoljava indexing po default-u)
- sitemap.xml — TODO (manualno ili preko build skripte)
- Canonical: ✓ index.html
- Per-page title via usePageTitle: ✓

### PWA (zaseban audit u Lighthouse)
- Installable: ✓ (manifest + icons + start_url + display:standalone)
- Service Worker: ✓ (vite-plugin-pwa generateSW)
- Offline-capable: katalog je StaleWhileRevalidate cache-ovan; precache JS/CSS

## Tipični fix-evi nakon audit-a

- **Image lazy loading** — nemamo slike u V1 (samo SVG ikone, inline + bundled)
- **Color contrast fail** — povisi tamninu na muted-foreground
- **Missing alt text** — provera; lucide ikone su aria-hidden ali nemaju alt;
  to je u redu kad su dekorativne
- **Manifest issues** — provera u Console + Application tab
- **Preload kritičnih resursa** — već: fonts preconnect + Vite injektuje
  modulepreload za main chunk
- **Render-blocking resources** — Google Fonts su render-blocking; Vite
  preconnect ublažava ali ako Lighthouse vrišti razmotri self-host fontova

## TODO za dodavanje (van V1 launch-a)

- robots.txt + sitemap.xml u public/
- OG slika `/og-image.png` (1200×630, sa logom + sloganom)
- favicon.ico fallback (uz favicon.svg) za starije browsere
