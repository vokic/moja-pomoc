# Moja Pomoć — Roadmap (task-by-task)

> **Za Claude Code:** Ovo je razloženi plan rada. Svaki task je ~2-4 sata. Radi ih redom, ne preskači. Pre svakog taska reci mi koji počinješ. Posle završenog taska, javi šta je urađeno i koje testove si pustio.

> **Pravilo:** ako naletiš na nešto što ti nije jasno iz specs.md, **pitaj me** umesto da pretpostaviš. Ako vidiš da task uzima više vremena nego što je procenjeno, **stani i javi** pre nego što potrošiš ceo dan.

> **Princip "smallest useful thing"**: svaki task treba da završi sa nečim što funkcioniše (može testirati, pokrenuti, videti). Ne ostavljaj polu-završene stvari.

---

## FAZA 0: PRIPREMA (pre Sprint 1)

Ovo je za Viktora, ne za Claude Code:

- [ ] Kreiraj GitHub repo `moja-pomoc` (public, MIT licenca)
- [ ] Kupi domen `mojapomoc.rs` (provera dostupnosti)
- [ ] Kreiraj Netlify nalog (ili Cloudflare Pages)
- [ ] Kreiraj Plausible nalog (ili odluci da li ide self-hosted)
- [ ] Pošalji 5-7 pisama (A11, CILS, Praxis, YUCOM, UNDP, Fond za otvoreno društvo, AŽC)

---

## SPRINT 1: KOSTUR (5 taskova, ~12-16h)

**Cilj sprinta:** funkcionalan project sa jednim pravom u katalogu, Home stranica sa 2 CTA-a, matcher i search rade na testovima.

### Task 1.1: Project setup (2h)

**Šta raditi:**
- Inicijalizuj Vite + React + TypeScript projekat
  ```bash
  npm create vite@latest moja-pomoc -- --template react-ts
  cd moja-pomoc && npm install
  ```
- Konfiguriši TypeScript strict mode
- Instaliraj Tailwind CSS (`pnpm dlx tailwindcss init -p`)
- Postavi `tsconfig.json` paths (`@/*` → `./src/*`)
- Konfiguriši Vite alias za `@/*`
- Inicijalizuj git, prvi commit
- Dodaj `.gitignore` (node_modules, dist, .env.local)
- Dodaj `.editorconfig` i `.prettierrc` (basic)

**Gotovo kad:**
- `npm run dev` pokreće app na localhost
- TypeScript strict ne baca greške
- Import `@/foo` radi

**NE raditi:**
- shadcn (sledeći task)
- routing (kasnije)
- bilo kakvu UI estetiku

### Task 1.2: shadcn/ui + folder struktura (2h)

**Šta raditi:**
- Pokreni `pnpm dlx shadcn@latest init` (NPM ili PNPM, jedno ili drugo — drži se istog)
- Konfiguracija: TypeScript, default style, Slate boja, `src/components/ui/`, CSS variables
- Instaliraj ključne shadcn komponente:
  ```
  pnpm dlx shadcn@latest add button card badge input progress tabs
  ```
- Kreiraj folder strukturu iz specs.md sekcija 4.1 (samo prazne foldere + `.gitkeep`)
- Dodaj Lucide React: `npm install lucide-react`

**Gotovo kad:**
- `import { Button } from '@/components/ui/button'` radi
- Sve foldere postoje (čak i ako su prazne)
- Tailwind klase rade u app (test `<div className="text-red-500">test</div>`)

**NE raditi:**
- Bilo kakve komponente unutar foldera
- Theme customization

### Task 1.3: TypeScript modeli (2h)

**Šta raditi:**
- Iz `schema.ts` (postoji u root-u), kopiraj tipove u:
  - `src/types/pravo.ts` — Pravo, Kategorija, Tag, Iznos, LegalSource, LocalizedText
  - `src/types/uslov.ts` — Uslov sve varijante
  - `src/types/profile.ts` — Profile, MatchResult
  - `src/types/katalog.ts` — Katalog, Korak, Dokument, Institucija, UputstvoZahteva, CestaGreska, SpoljniResurs
  - `src/types/index.ts` — barrel export svih

**Gotovo kad:**
- Svi tipovi se kompajliraju bez grešaka
- Možeš da uradiš `import type { Pravo, Profile } from '@/types'`

**NE raditi:**
- Nikakvu logiku, samo tipove

### Task 1.4: lib/matcher.ts + Vitest setup + testovi (3h)

**Šta raditi:**
- Instaliraj Vitest: `npm install -D vitest @vitest/ui`
- Konfiguriši `vitest.config.ts`
- Dodaj script u package.json: `"test": "vitest"`
- Implementiraj `src/lib/matcher.ts`:
  - `evalUslov(u, profile)` — vraća `true | false | 'unknown'`
  - Sve varijante uslova iz schema.ts
  - `matchPravo(profile, pravo)` — vraća `MatchResult | null`
  - `matchAll(profile, catalog)` — sortira po surprise + prioritet
  - Helper `mapToAge(starost)` — npr. 'penzioner' → 65
- Napiši `src/lib/matcher.test.ts`:
  - Test za svaki tip Uslov-a (10-15 testova)
  - Test "unknown propagation" (`i`, `ili`, `ne`)
  - Test "samohrana majka sa bebom, niska primanja" → kvalifikuje za dečji dodatak
  - Test "penzioner sa najnižom" → kvalifikuje za RTV oslobađanje

**Gotovo kad:**
- `npm test` pušta sve i zelene
- Coverage na matcher.ts iznad 80%

**NE raditi:**
- Search index (sledeći task)
- Bilo kakav UI

### Task 1.5: lib/search-index.ts + testovi (2h)

**Šta raditi:**
- Implementiraj `src/lib/search-index.ts`:
  - `buildSearchIndex(catalog)` — vraća array sa pravo + normalizovan haystack
  - `search(index, query, kategorija?)` — fuzzy search
  - `normalizeText(text)` — cyrillic→latin transliteracija, lowercase, normalize NFD
  - CYR_TO_LAT mapa (cela srpska ćirilica)
- `src/lib/search-index.test.ts`:
  - Test "kuca latinicu, nalazi ćirilicu" (`"decji"` → "Дечји додатак")
  - Test "kuca ćirilicu, nalazi latinicu"
  - Test partial match (`"banj"` → "banjsko lečenje")
  - Test kategorija filter

**Gotovo kad:**
- Testovi prolaze
- Search radi na 2 testna prava (DJ01 koji već imamo + 1 dummy)

**NE raditi:**
- UI komponente (search bar dolazi u Sprint 2)

### Task 1.6: lib/catalog.ts + lib/profile.ts (2h)

**Šta raditi:**
- `src/lib/catalog.ts`:
  - `loadCatalog()` — fetch `/catalog/katalog.json`, cache, vraća promise
  - `findPravo(katalog, id)` — pure function
  - `filterByKategorija(katalog, kat)` — pure function
- `src/lib/profile.ts`:
  - `loadProfile()` — čita iz localStorage (`mp_profile` key)
  - `saveProfile(p)` — piše u localStorage
  - `clearProfile()` — briše
  - `isProfileComplete(p)` — vraća boolean (svi obavezni fields popunjeni)
- `src/lib/script.ts`:
  - `getScript()` / `setScript(s)` — čita/piše `mp_script` ('lat' | 'cyr', default 'lat')
  - `pickScript(localized, script)` — vraća `localized.sr_lat` ili `localized.sr_cyr`

**Gotovo kad:**
- Test fajlovi za sve (osnovno testiranje localStorage moguće sa mockom)
- catalog.ts radi sa primer JSON-om (DJ01)

**NE raditi:**
- React hooks (sledeći sprint, Sprint 2)
- UI

### Task 1.7: Build katalog skripta (2h)

**Šta raditi:**
- `scripts/build-catalog.ts`:
  - Čita sve `.json` iz `src/assets/catalog/prava/`
  - Validira svaki protiv sheme (osnovno: postoji li `id`, `naziv`, `uslovi`, itd.)
  - Briše sva polja koja počinju sa `_` (komentari iz predloška)
  - Konsoliduje u `public/catalog/katalog.json` (Vite servira iz `public/`)
  - Loguje status: "✓ Loaded DJ01, ✓ Loaded HB01... Total: N prava"
  - Exit code 1 ako bilo koje pravo ne validira
- Dodaj u package.json: `"build:catalog": "tsx scripts/build-catalog.ts"`
- Instaliraj `tsx`: `npm install -D tsx`
- Promeni `"build"` script u: `"build": "npm run build:catalog && vite build"`

**Gotovo kad:**
- `npm run build:catalog` radi i generiše `public/catalog/katalog.json`
- Ako pravo nije validno, skripta failuje sa jasnom porukom

**NE raditi:**
- Komplikovaniju validaciju (Zod, ajv) u V1 — basic provera je dovoljna

### Task 1.8: Home stranica + osnovni layout (2h)

**Šta raditi:**
- `src/components/layout/Header.tsx` — minimalan: logo "Moja Pomoć" + (placeholder za) script toggle
- `src/components/layout/Footer.tsx` — minimalan: "Otvoreni kod | github link | O projektu | Donacije"
- `src/pages/HomePage.tsx`:
  - Hero naslov: "Otkrijte sva državna prava koja vam pripadaju"
  - Subtitle: "Besplatno, anonimno, bez čuvanja podataka"
  - 2 CTA dugmeta:
    - Primary: "Saznaj šta mi pripada (~2 min)" → routes to wizard
    - Secondary: "Pretraži prava" → routes to search
  - Helper tekst ispod: "Ne znate šta da tražite? Krenite sa wizardom..."
- `src/App.tsx` — koristi router (placeholder rute za sad: home, wizard, pretraga)
- Instaliraj React Router: `npm install react-router-dom`

**Gotovo kad:**
- `npm run dev` prikazuje Home sa 2 dugmeta
- Klik na dugme vodi na `/wizard` ili `/pretraga` (mogu da budu prazne za sad)
- Footer linkovi rade (`/o-projektu`, `/donacije` mogu biti prazne stranice za sad)

**NE raditi:**
- Detaljnu wizard ili search implementaciju (Sprint 2)
- Bilo kakav komplikovan dizajn (samo neutralno, čisto)
- Animacije

---

## SPRINT 2: WIZARD + PRETRAGA (8 taskova, ~16-20h)

**Cilj sprinta:** dva ulaza u app rade end-to-end (sa dummy rezultatima ako treba).

### Task 2.1: useProfile, useCatalog, useScript hooks (2h)

**Šta raditi:**
- `src/hooks/useProfile.ts`:
  - State sa `Profile | null`
  - `update(field, value)` — partial update sa save u localStorage
  - `reset()` — clear profile
  - `complete` — boolean za "Profil je popunjen"
- `src/hooks/useCatalog.ts`:
  - Učitava katalog kroz `loadCatalog()`
  - State: `katalog`, `loading`, `error`
  - Provider pattern (Context) ako je potrebno
- `src/hooks/useScript.ts`:
  - State 'lat' | 'cyr'
  - `toggle()` funkcija
  - Sync sa localStorage

**Gotovo kad:**
- Hooks rade u test komponenti (može jednostavno)
- localStorage perzistencija radi (reload zadržava state)

### Task 2.2: Wizard struktura + ProgressBar + Steps config (2h)

**Šta raditi:**
- `src/components/wizard/steps-config.ts` — kopiraj sve 9 koraka iz specs.md sekcija 9
- `src/pages/WizardPage.tsx`:
  - State: trenutni step (0-8)
  - Učitava profil iz hooks, ako postoji nudi "Nastavi" ili "Kreni ispočetka"
  - Render: ProgressBar + WizardStep + nav dugmad
- `src/components/wizard/ProgressBar.tsx`:
  - 9 tačaka, popunjavaju se kako se napreduje
  - Highlight trenutnog

**Gotovo kad:**
- Wizard page se otvara
- Progress bar prikazuje 1/9, 2/9...

**NE raditi:**
- Pravu step logiku (sledeći task)

### Task 2.3: Generička WizardStep komponenta (3h)

**Šta raditi:**
- `src/components/wizard/WizardStep.tsx`:
  - Props: stepConfig (iz steps-config), value (sa profila), onChange
  - Renderuje pitanje, hint, opcije
  - Single select (radio-style sa shadcn ili kustom)
  - Multi select (checkbox-style)
  - Exclusive logika: ako klikne exclusive opciju, briše ostale; ako klikne neku drugu, briše exclusive
  - Ikone iz lucide (mapping iz icon stringa u Icon komponentu)
- Integriši u WizardPage:
  - Nazad / Sledeće dugmad
  - Disable Nazad na step 0
  - Na poslednjem stepu dugme "Pokaži šta mi pripada" → routes to /rezultati

**Gotovo kad:**
- Možeš da klikneš kroz sve 9 koraka
- Multi-select sa exclusive radi
- Auto-save u localStorage radi (reload sredinom wizard-a → nastavlja gde si stao)

### Task 2.4: ResultsPage — osnova (2h)

**Šta raditi:**
- `src/pages/ResultsPage.tsx`:
  - `RequireProfile` wrapper guard
  - useCatalog + useProfile
  - Pokreni `matchAll(profile, katalog.prava)`
  - Memoize sa useMemo
  - 3 summary kartice (broj prava, broj surprise, broj kategorija)
  - Lista ResultCard-ova ispod (može biti minimalna za sad)
- `src/components/results/ResultCard.tsx` (iz specs.md sekcija 10.2)
- `src/hooks/useMatches.ts`:
  - Memoizovan matcher poziv
  - Vraća `MatchResult[]` plus aggregations (count, surprises, categories)

**Gotovo kad:**
- Posle wizard-a, vidiš listu prava sa shodno kako si odgovarao
- Surprise kartice imaju žuti tag
- Visok prioritet ima rozaa tag

### Task 2.5: SearchPage + SearchBar (3h)

**Šta raditi:**
- `src/pages/SearchPage.tsx`:
  - useCatalog
  - State: query, kategorija filter
  - useMemo za `buildSearchIndex(katalog.prava)`
  - useMemo za `search(index, query, kategorija)` sa 200ms debounce
- `src/components/search/SearchBar.tsx`:
  - shadcn Input sa Search ikonom
  - Real-time onChange
- `src/components/search/CategoryFilter.tsx`:
  - Filter chips (Sve + sve kategorije iz kataloga)
  - Multi-select toggle
- `src/components/search/SearchResults.tsx`:
  - Grupiše rezultate po kategoriji
  - Pokazuje group headers + lista prava unutar
  - Klik na pravo → `/pravo/:id`
  - Empty state ako nema rezultata: poruka + CTA "Probajte wizard"

**Gotovo kad:**
- Search radi sa real-time rezultatima
- Cross-script radi (kucam "decji" i nalazim "Дечји додатак")
- Filter chips rade

### Task 2.6: PravoDetailPage — osnova (2h)

**Šta raditi:**
- `src/pages/PravoDetailPage.tsx`:
  - useParams za id
  - findPravo iz kataloga
  - 404 handling ako ne postoji
  - Header: naziv + tagovi + kratak opis
  - shadcn Tabs sa 6 tabova (placeholder content u njima za sad)
- "Nazad na rezultate" link

**Gotovo kad:**
- Klikom na karticu u Results-u otvara se Detail
- Tabovi se mogu menjati
- Sadržaj tabova može biti samo "TODO" za sad

### Task 2.7: Implementacija svih 6 tabova (4h)

**Šta raditi:**
- `TabOsnovno.tsx` — kv pairs sa meta podacima prava
- `TabKoraci.tsx` — numerisana lista koraka iz `pravo.koraci`
- `TabDokumenti.tsx` — lista `pravo.dokumenti` sa "gde se nabavlja" i "trošak"
- `TabInstitucije.tsx` — kartice institucija sa kontaktima
- `TabUputstvo.tsx` — 4 sekcije iz `pravo.uputstvo_zahteva` (BEZ POPUNJAVANJA, samo uputstva)
- `TabGreske.tsx` — lista čestih grešaka sa "posledica → rešenje" pattern

**Gotovo kad:**
- Svi tabovi prikazuju sadržaj iz DJ01 JSON-a
- Ništa se ne lomi ako neko polje fali (`?.` everywhere)

### Task 2.8: ScriptToggle + integracija (2h)

**Šta raditi:**
- `src/components/layout/ScriptToggle.tsx`:
  - 2 buttona "Lat" | "Ћир"
  - Highlight aktivan
  - Toggle preko `useScript`
- Integriši u Header
- Update sve mesta gde se prikazuje `LocalizedText` da koriste `useScript` + `pickScript`:
  - ResultCard
  - PravoDetailPage header
  - SearchResults
  - Bilo gde drugde

**Gotovo kad:**
- Toggle radi u headeru
- Sav tekst kataloga se menja sa togle
- localStorage zapamti izbor

---

## SPRINT 3: POLISH (6 taskova, ~12-16h)

**Cilj sprinta:** app izgleda i radi profesionalno, ima sve funkcije osim PDF/PWA.

### Task 3.1: Sortiranje i filteri u Results (2h)

**Šta raditi:**
- Filter chips iznad liste: "Sve | Verovatno niste znali | Visok prioritet | Po kategorijama"
- Toggle "Pokaži po kategorijama" — group view (kao u SearchResults)
- Default: surprise prvo, onda priority desc

**Gotovo kad:**
- Sve filtere rade
- View se menja bez reload-a

### Task 3.2: Disclaimer komponenta (1h)

**Šta raditi:**
- `src/components/shared/Disclaimer.tsx`:
  - Tekst iz specs.md sekcija 19.1
  - Stilizovano kao info banner
- Ubaci u:
  - ResultsPage (gore, ispod summary)
  - PravoDetailPage (gore)
  - PDF export footer (kasnije)

**Gotovo kad:**
- Disclaimer se vidi na svim relevantnim stranicama

### Task 3.3: Anketa komponenta (2h)

**Šta raditi:**
- `src/components/shared/Anketa.tsx`:
  - Renderuje se na dnu ResultsPage
  - Pitanje "Da li ste znali za većinu ovih prava?"
  - 4 dugmeta: znao, znao ne koristim, prvi put, mix
  - Klik trackuje analytics event
  - Posle klika: zahvaljuje i nudi share / donaciju
- `src/lib/analytics.ts` (placeholder za sad — samo `console.log`)

**Gotovo kad:**
- Anketa radi
- Posle odgovora prikazuje zahvalu

### Task 3.4: About + Donate stranice (2h)

**Šta raditi:**
- `src/pages/AboutPage.tsx`:
  - "O projektu" tekst (Viktor će napisati ili reuse iz specs.md sekcija 1)
  - "Kako radi" (3-4 koraka)
  - "Privacy" sekcija (kratko)
  - GitHub link, kontakt
- `src/pages/DonatePage.tsx`:
  - Patreon link
  - Buy Me a Coffee link
  - Direktna uplata dinarski račun + QR kod (placeholder za sad)
  - Tekst "Zašto donirati"

**Gotovo kad:**
- Obe stranice imaju realan sadržaj
- Footer linkovi vode tamo

### Task 3.5: SEO + Meta tagovi (1h)

**Šta raditi:**
- Update `index.html` sa:
  - title, description (latinica)
  - Open Graph tags (og:title, og:description, og:image)
  - Twitter Card tags
  - Favicon (placeholder za sad)
  - viewport, theme-color
- Po-strana meta sa `react-helmet-async` (opciono za V1)

**Gotovo kad:**
- Share link na Facebook/Twitter prikazuje pravi preview
- Title u tab-u je smisleno

### Task 3.6: Mobile responsive QA (2-4h)

**Šta raditi:**
- Test na pravom telefonu (ili Chrome DevTools mobile view)
- Wizard: touch targets ≥44px
- ResultCard: text wrapping
- Tabs na Detail: scrollable hor. ako ne staje
- Search: input ne pokriva rezultati
- Forme prilagođene za palac
- Fix problema koje nađeš

**Gotovo kad:**
- Sve radi glatko na iPhone SE (najmanji ekran)
- Sve radi na Android tablet

---

## SPRINT 4: LAUNCH (5 taskova, ~10-12h)

**Cilj sprinta:** deploy-ovan na production, PDF radi, PWA installable, analitika beleži.

### Task 4.1: PDF Export (4h) — najteži task

**Šta raditi:**
- `src/lib/pdf-export.ts`:
  - jsPDF library: `npm install jspdf`
  - Unicode font (latinica + ćirilica). Preporuka: Noto Sans (uključi kao base64 u kodu, ili učitaj iz `/public/fonts/`)
  - Generiše A4 PDF sa:
    - Header: "Moja Pomoć — vaša prava" + datum
    - Disclaimer
    - Za svako pravo: naziv, kategorija, iznos, institucija, top 3 koraka
    - Footer: "mojapomoc.rs | Generisano DD.MM.YYYY"
  - Sve bez ličnih podataka
- `src/components/shared/PdfExportButton.tsx`:
  - Dugme "Sačuvaj kao PDF"
  - Klik → generiše PDF + trigger download

**Gotovo kad:**
- PDF se generiše i sadrži sva prava iz Results-a
- Ćirilica/latinica rade
- PDF izgleda čitljivo (ne ružno)

**Pažnja:**
- Najveća zamka su Unicode fontovi. Ako se proizvode "kvadratići" umesto slova, to je problem sa fontom — ne sa kodom.
- jsPDF ima built-in helvetica koji NE podržava ćirilicu. Mora se učitati custom font.

### Task 4.2: PWA setup (2h)

**Šta raditi:**
- Instaliraj `vite-plugin-pwa`: `npm install -D vite-plugin-pwa`
- Konfiguriši u `vite.config.ts`:
  - manifest: name, short_name, theme_color, background_color, icons
  - workbox: precache `katalog.json`, sve static assets
  - registerType: 'autoUpdate'
- Kreiraj ikone (192x192, 512x512) — placeholder za sad ako nemaš dizajn
- Test installability u Chrome DevTools

**Gotovo kad:**
- Lighthouse pokazuje PWA: installable
- Add to Home Screen radi na telefonu
- App radi offline (testiraj: load app → offline → refresh → još uvek radi)

### Task 4.3: Plausible integration (1h)

**Šta raditi:**
- Update `src/lib/analytics.ts`:
  - `track(event, props?)` funkcija
  - Šalje na Plausible API ili koristi script
- Eventi (iz specs.md sekcija 15):
  - `wizard_started`, `wizard_completed`, `pravo_viewed`, `pdf_exported`, `survey_answered`, `donation_clicked`
- Plausible script tag u index.html (sa domenom)

**Gotovo kad:**
- Plausible dashboard pokazuje pageviews
- Custom events se beleže

### Task 4.4: Deploy na Netlify (2h)

**Šta raditi:**
- Connect GitHub repo na Netlify
- `netlify.toml` u root-u (iz specs.md sekcija 16.2)
- Environment variables (ako ima):
  - `VITE_PLAUSIBLE_DOMAIN`
- Custom domain `mojapomoc.rs` (DNS setup)
- SSL automatski (Let's Encrypt)
- GitHub Actions sa `.github/workflows/deploy.yml` (iz specs.md sekcija 16.1)

**Gotovo kad:**
- `mojapomoc.rs` radi sa HTTPS
- Svaki push na `main` deploy-uje automatski
- Production build prolazi sve testove

### Task 4.5: Lighthouse audit + fix (1-2h)

**Šta raditi:**
- Pusti Lighthouse audit na production URL
- Cilj: 90+ na sve (Performance, Accessibility, Best Practices, SEO)
- Tipični fix-evi:
  - Image lazy loading
  - Color contrast (a11y)
  - Missing alt text
  - Manifest issues
  - Preload kritičnih resursa

**Gotovo kad:**
- Lighthouse green na sve 4 kategorije

---

## FAZA POSLE LAUNCH-A

Ovo je nakon V1 produkcije, prema feedback-u:

### Sedmica 1-2: monitoring
- [ ] Plausible dashboard svaki dan
- [ ] Reaguj na feedback (forme za kontakt? Twitter mentions?)
- [ ] Bug fixing prema realnim korisnicima

### Mesec 1-3: V1 → V1.5
- [ ] Popunjavanje preostalih 30+ prava u katalogu (mehanički rad)
- [ ] Pravna validacija (NGO odgovori, plaćeni pravnik)
- [ ] Slanje pisama sponzorima sa realnim brojevima korisnika

### Mesec 4+: V2 prema feedback-u
- [ ] AI sloj za personalizovana objašnjenja (ako sponzori dođu)
- [ ] Lokalne varijante (BG/NS/NI)
- [ ] Žalbe template
- [ ] Šta god je top zahtev iz ankete

### Dodatne TODO stavke (Viktor 2026-05-22)
- [ ] **Detaljnija analitika behavior-a**: Dwell time po pravu, scroll depth na detail
  stranicama, drop-off mesta u wizard-u (koji korak pa korisnik napušta),
  click-through na pojedine tabove u PravoDetail-u, heatmap na Results filtere.
  Plausible osnove + custom events. Cilj: identifikovati prava i mesta na kojima
  korisnici provode najviše vremena (= najvažnija) i mesta gde se gube
  (= UX problemi).
- [ ] **Iscrpno istraživanje kataloga**: Mapirati SVE državne pomoći, naknade,
  subvencije, popuste, oslobođenja koja postoje u Srbiji. Trenutni katalog ima
  ~46 prava strukturiranih + 102 mapiranih. Cilj: pokriti 200+. Izvori:
  - svaki resor (PIO, RFZO, NSZ, CSR, Ministarstvo finansija, lokalne uprave)
  - lokalne (opštinske) odluke o socijalnoj zaštiti (Beograd, Novi Sad, Niš +
    manje opštine)
  - poreske olakšice za fizička lica
  - sektorske subvencije (poljoprivreda, energetika, mali biznis)
  - jednokratne pomoći za životne situacije (smrt, rođenje, požar, nasilje)
  - dijaspora-specifična prava (35 bilateralnih sporazuma)
  - prava EU integracija (kad/ako se otvore)
  Cilj: postati referentni katalog u Srbiji.
- [ ] **Design polish u skladu sa Lovable design-kit-om**: Interior stranice
  (Home, Wizard, Results, Detail, About, Donate) trenutno koriste hardkodovan
  USA navy (#162e51). Trebalo bi da budu theme-aware (USA #162e51 + cyan accent
  vs SR #1B3A6B + crveni accent) — koristiti CSS varijable ili useBrand() hook
  koji čita useTheme(). Pun parity sa headerom/footerom.

---

## VAŽNA PRAVILA

1. **Ne preskači testove.** Sprint 1 testovi su osnova svega. Ako matcher nije pouzdan, ceo katalog je beskoristan.

2. **Ne dodaji feature-e koje nisu u specs.md/roadmap.md.** Pitaj me prvo.

3. **Ne menjaj arhitekturu** (npr. "možda bi trebalo backend"). Specs.md je jasan: no backend.

4. **Ako ti task ode preko 1.5x procene vremena, stani i javi.** Verovatno postoji nešto što ja nisam razmišljao i bolje da popričamo.

5. **Commit često, sa smislenim porukama.** Format: `[Sprint X.Y] Kratak opis`. Primer: `[Sprint 1.4] Add matcher.ts with 12 passing tests`.

6. **Posle svakog taska:**
   - Test pušten ✓
   - Commit + push ✓
   - Reci mi šta je urađeno, šta je sledeće
   - Ako si zaglavljen, sa specifičnim pitanjem

---

**Total procena vremena (realno, sa testovima i polish-om):**
- Sprint 1: 12-16h (3-4 dana po par sati)
- Sprint 2: 16-20h (4-5 dana)
- Sprint 3: 12-16h (3-4 dana)
- Sprint 4: 10-12h (2-3 dana)
- **Ukupno: 50-64h** (~6-8 nedelja od 1 vikend = 8 sati nedeljno)

To je realnije nego "4 vikenda" iz prethodne verzije. Bolje da znaš na šta računaš.
