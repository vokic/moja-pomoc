# Moja Pomoć — Design Kit

Dual-theme dizajn sistem ekstraktovan iz projekta. Sve vizuelno je u `layout.tsx` (header / footer / page shell) i prebacuje se preko `ThemeProvider` (`usa` / `srpski`) i `ScriptProvider` (`lat` / `cyr`).

## Sadržaj

```
moja-pomoc-design-kit/
├── design-tokens.json          # Strukturirani tokeni za oba teme
├── README.md                   # Ovaj fajl
└── src/
    ├── styles.css              # Tailwind v4 + shadcn osnovni tokeni (oklch)
    ├── components/
    │   └── layout.tsx          # Header / Footer / PageShell — celokupan vizuelni identitet
    └── lib/
        ├── theme-context.tsx   # usa ↔ srpski toggle (localStorage: mp_theme)
        └── script-context.tsx  # lat ↔ cyr toggle + transliteracija (mp_script)
```

## Zavisnosti

Da bi `layout.tsx` radio u novom Lovable projektu (TanStack Start):

```bash
# već dolaze sa Lovable template-om:
# @tanstack/react-router, react, tailwindcss v4
```

Plus fontovi (Google Fonts, dodaj u `<head>` ili importuj u `styles.css`):

- **USA tema:** Public Sans (400/600/700), Merriweather (700/900)
- **SR tema:** PT Sans (400/700), PT Sans Caption (400/700)

Primer (`index.html` ili root `<head>`):
```html
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700&family=Merriweather:wght@700;900&family=PT+Sans:wght@400;700&family=PT+Sans+Caption:wght@400;700&display=swap" rel="stylesheet">
```

## Upotreba

```tsx
// src/router root ili __root.tsx
import { ThemeProvider } from "@/lib/theme-context";
import { ScriptProvider } from "@/lib/script-context";
import { PageShell } from "@/components/layout";

<ThemeProvider>
  <ScriptProvider>
    <PageShell>
      <Outlet />
    </PageShell>
  </ScriptProvider>
</ThemeProvider>
```

`PageShell` automatski renderuje pravi `Header` / `Footer` i postavlja font + bg za izabrani theme.

## Teme — sažetak

### USA (Benefits.gov / USA.gov)
- Font: **Public Sans** (body), **Merriweather** (logo)
- Primarna: `#162e51` navy
- Akcent: `#00bde3` cyan (aktivni underline u navu)
- Bg: bela / `#f0f0f0` top band
- Logo: krug, inicijali "мп"

### Srpski (eUprava-style)
- Font: **PT Sans** (body), **PT Sans Caption** (display/nav)
- Primarna: `#1B3A6B` navy
- Akcent: `#C8102E` crvena (zastava)
- Bg: `#F2F4F7` siva / `#0A1A33` top band
- Nav: pun navy bar sa belim linkovima
- Logo: heksagon (`clip-path: polygon(...)`)

## Navigacija

Lista linkova je hardkodovana u `layout.tsx` (`NAV` konstanta). Promeni stavke tamo — obe teme koriste isti `NAV`.

## Skripta toggle (latinica ↔ ćirilica)

`script-context.tsx` dodaje:
- `useScript().script` — trenutno pismo
- `useScript().t({ sr_lat: "...", sr_cyr: "..." })` — helper za uslovni tekst
- `latToCyr()` / `cyrToLat()` — transliteracija (osnovna, pokriva sva srpska slova + lj/nj/dž/đ digrafe)

Trenutno se sam `layout.tsx` ne prevodi automatski — labele su statične. Ako želiš full transliteraciju, omotaj svaki tekstualni node sa `t({...})`.

## Šta nije uključeno

- Konkretan sadržaj stranica (`src/routes/*`, `src/data/*`)
- Wizard logika, katalog, matcher
- shadcn UI komponente (preuzmi po potrebi sa `bunx shadcn@latest add ...`)

Za drugi sajt sa istim look-and-feel: drop-in ova 4 fajla + dodaj fontove i imaš identičnu glavu/dno/temu.
