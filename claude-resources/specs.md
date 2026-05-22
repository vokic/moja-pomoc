# Moja Pomoć — Specifikacija projekta (V1 MVP)

> **Za Claude Code:** Ovaj dokument je kompletna referenca za razvoj aplikacije. Pročitaj ga ceo pre nego što počneš da kodiraš. Svaka odluka je rezultat dugog razmišljanja — ne menjaj arhitekturu bez dobrog razloga, pitaj me prvo.

---

## 1. ŠTA JE OVO

**Moja Pomoć** je besplatna web aplikacija koja građanima Srbije, na osnovu njihove životne situacije, prikazuje sva državna prava, subvencije, popuste i pomoći za koje verovatno ispunjavaju uslove — a često ne znaju da postoje.

### Problem
- Prosečno srpsko domaćinstvo propušta 3-5 državnih pomoći jer ne zna za njih
- Informacije su rasute po 10+ institucija (PIO, RFZO, NSZ, CSR, opštine...)
- Najugroženiji građani (siromašni, stari, OSI) su najlošije informisani
- Ne postoji jedinstvena tačka pristupa

### Rešenje
- **Profile-first**: korisnik opisuje situaciju kroz wizard, ne pretražuje
- **Rule-based matching**: bez AI u V1, čist deterministički engine
- **Otkriće, ne pretraga**: rezultati sortirani po "verovatno niste znali"
- **Uputstva, ne popunjavanje**: ne čuvamo lične podatke, samo dajemo vodič
- **Privatnost**: sve radi u browseru, nikakvi podaci ne idu na server

---

## 2. PRINCIPI (NE PREGOVARAJ O OVIMA)

### 2.1. Bez AI u V1
- **Nema poziva na bilo koji AI API** (Claude, GPT, Gemini, lokalni modeli)
- Sva objašnjenja, koraci, uputstva su **statički tekst u JSON katalogu**
- AI sloj dolazi u V1.5 kad budu sponzori
- Razlozi: tačnost, auditabilnost, nula troškova, instant performanse, offline rad

### 2.2. Bez prikupljanja podataka
- **Nema servera, nema baze, nema autentifikacije**
- Profil korisnika živi samo u `localStorage` (privatan, ne napušta uređaj)
- Bez Google Analytics, Facebook Pixel, ili sličnog
- Analitika samo preko Plausible (privacy-respecting, agregisana)
- GDPR-clean by design

### 2.3. Bez popunjavanja zahteva
- **MVP daje UPUTSTVA**, ne popunjava formulare
- Ne tražimo JMBG, adresu, IBAN ili druge lične podatke
- Korisnik dobija: "evo šta da poneseš, šta da kažeš na šalteru, šta da proveriš"
- Razlozi: pravna odgovornost, dokumenta se menjaju, privatnost

### 2.4. Bez reklama, bez B2B integracija
- Aplikacija je čisto javno dobro
- Monetizacija samo preko sponzora (NGO, država, donori, mali broj korporativnih CSR partnera)
- **NIKAKVA integracija sa drugim projektima** (Leavo, eNalaz, itd. — Moja Pomoć je samostalan projekat)
- Bez affiliate linkova, bez pay-per-click

### 2.5. Latin-first, Cyrillic-toggle
- Default jezik: srpska latinica (`sr_lat`)
- Toggle u headeru za ćirilicu (`sr_cyr`)
- Svi tekstovi u katalogu na oba pisma
- Izbor pisma se čuva u localStorage (`mp_script: 'lat' | 'cyr'`)

### 2.6. Mobile-first
- Velika većina korisnika je na telefonu
- PWA (installable, offline-capable, no app store)
- Touch targets ≥44px
- Forme prilagođene za palac

### 2.7. Pristupačnost
- Velike kategorije korisnika su stariji, slabovidi
- Semantički HTML, ARIA labels, keyboard navigation
- Tekst ≥16px, kontrast WCAG AA
- Screen reader friendly

---

## 3. TEHNOLOŠKI STACK

### Frontend
- **React + Vite + TypeScript** (strict mode)
- **React Router** za navigaciju
- **TanStack Query** ili plain `useState/useReducer` za state (verovatno ne treba Query u V1 jer nema servera)
- Funkcionalne komponente, hooks

### UI Library
- **shadcn/ui** kao osnova (Radix UI primitives + Tailwind)
- **Tailwind CSS** za styling
- **Lucide React** ikone (default uz shadcn, isto kao Tabler stil)
- Razlog za shadcn: brz početak sa profesionalnim komponentama, kustomizabilno (kopira komponente u repo, nije black box), Radix accessibility built-in

### Build & Deploy
- Vite build (mnogo brži od Webpack/Angular CLI)
- Output: statički fajlovi (HTML/CSS/JS)
- Hosting: **Netlify** ili **Cloudflare Pages** (oba free tier, automatski deploy iz GitHub-a)
- Domain: `mojapomoc.rs` ili `pravo.rs` (proveriti dostupnost)

### Persistencija
- `localStorage` za profil korisnika
- `IndexedDB` ako profil postane prevelik (nije verovatno u V1)
- Nema backend baze u V1

### Analitika
- **Plausible** (self-hosted ili plausible.io free tier do 10k posetilaca)
- Privacy-respecting, no cookies, GDPR-clean

### Donacije
- Patreon link
- Buy Me a Coffee link
- Direktna uplata na dinarski račun (instrukcije + QR kod)
- Bez Stripe-a u V1 (komplikovan KYC u Srbiji)

### Repo
- GitHub, public repo (open source)
- MIT licenca za kod
- CC-BY-SA za katalog prava (svako može da koristi sa atribucijom)

### Razlog za React + Vite umesto Angular
- Brži dev cycle (Vite HMR <100ms)
- shadcn/ui ekosistem najjači u React-u — gotove pristupačne komponente
- Manji bundle size za statički sajt
- Lakše za eventualne kontributore (širi pool)
- Viktor zna oba (poslovno Angular, ali React je takođe u stack-u)

---

## 4. ARHITEKTURA

### 4.1. Folder struktura

```
src/
├── components/
│   ├── ui/                      # shadcn/ui komponente (Button, Card, Input...)
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ScriptToggle.tsx    # latinica/ćirilica
│   ├── wizard/
│   │   ├── Wizard.tsx
│   │   ├── WizardStep.tsx      # generička step komponenta
│   │   ├── ProgressBar.tsx
│   │   └── steps-config.ts     # 9 koraka kao podaci (vidi sekciju 7)
│   ├── search/
│   │   ├── SearchBar.tsx       # alternativa wizard-u
│   │   ├── SearchResults.tsx
│   │   └── search-index.ts     # mini fuzzy-search engine
│   ├── results/
│   │   ├── ResultsList.tsx
│   │   ├── ResultCard.tsx
│   │   └── ResultsSummary.tsx
│   ├── pravo-detail/
│   │   ├── PravoDetail.tsx
│   │   ├── TabOsnovno.tsx
│   │   ├── TabKoraci.tsx
│   │   ├── TabDokumenti.tsx
│   │   ├── TabInstitucije.tsx
│   │   ├── TabUputstvo.tsx
│   │   └── TabGreske.tsx
│   └── shared/
│       ├── Disclaimer.tsx
│       ├── Anketa.tsx
│       └── PdfExportButton.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── WizardPage.tsx
│   ├── SearchPage.tsx
│   ├── ResultsPage.tsx
│   ├── PravoDetailPage.tsx
│   ├── AboutPage.tsx
│   └── DonatePage.tsx
├── lib/
│   ├── matcher.ts               # rule engine (pure functions)
│   ├── catalog.ts               # učitavanje JSON kataloga
│   ├── profile.ts               # localStorage CRUD
│   ├── script.ts                # latinica/ćirilica helper
│   ├── pdf-export.ts            # generisanje PDF-a
│   ├── analytics.ts             # Plausible wrapper
│   └── utils.ts                 # shadcn cn() helper
├── types/
│   ├── pravo.ts                 # Pravo, Uslov, Korak, Dokument...
│   ├── profile.ts               # Profile, MatchResult
│   └── katalog.ts               # Katalog kontejner
├── hooks/
│   ├── useProfile.ts            # localStorage profile sa reactive update
│   ├── useCatalog.ts            # učitava i drži katalog
│   ├── useScript.ts             # latinica/ćirilica preference
│   └── useMatches.ts            # memoizovan matcher
├── assets/
│   └── catalog/
│       ├── katalog.json         # Glavni katalog (merge svih)
│       └── prava/               # Pojedinačni JSON-ovi po pravu
│           ├── DJ01_penzije_eu.json
│           ├── HB01_oslobadjanje_participacije.json
│           └── ...
├── App.tsx
├── main.tsx
└── index.css                    # Tailwind directives

scripts/
└── build-catalog.ts             # validacija + merge u katalog.json

public/
├── manifest.json                # PWA
└── icons/

tailwind.config.ts
vite.config.ts
tsconfig.json
components.json                  # shadcn config
```

### 4.2. Data flow

```
1. App startup:
   useCatalog hook učitava /assets/catalog/katalog.json
   useProfile hook čita iz localStorage (ako postoji)
   useScript hook čita preferenciju pisma (default 'lat')

2. Home page - dve opcije za ulazak:
   A) "Saznaj šta ti pripada" → /wizard (vodjena procena, 9 koraka)
   B) "Pretraži prava" → /pretraga (direktna pretraga po nazivu/kategoriji)

3a. Wizard tok:
   User klikne kroz 9 koraka
   Svaki step update-uje useProfile (auto-save u localStorage)
   Submit → /rezultati
   matcher.ts pokreće match(profile, catalog) → MatchResult[]
   Results sortiraju po: surprise prvo, onda prioritet_propusta desc

3b. Search tok:
   User kuca u SearchBar
   search-index.ts fuzzy-search po naziv + kratak_opis + kategorija
   Rezultati real-time ispod, group-ovani po kategoriji
   Klik na rezultat → /pravo/:id

4. Klik na pravo (iz wizard rezultata ILI search-a):
   Router navigira na /pravo/:id
   useCatalog.getPravo(id) iz već učitanog kataloga
   PravoDetail renderuje 6 tabova iz iste JSON strukture

5. PDF export:
   pdf-export.ts generiše PDF sa listom prava
   Bez ličnih podataka u PDF-u
```

### 4.3. Matcher (rule engine)

`lib/matcher.ts` — pure functions, bez state-a:

```typescript
import type { Profile, Pravo, Uslov, MatchResult } from '@/types';

type EvalResult = boolean | 'unknown';

function evalUslov(u: Uslov, profile: Profile): EvalResult {
  switch (u.tip) {
    case 'starost_min':
      return profile.starost ? mapToAge(profile.starost) >= u.vrednost : 'unknown';
    case 'zaposlenje':
      return profile.zaposlenje 
        ? u.vrednost.includes(profile.zaposlenje) 
        : 'unknown';
    case 'zdravlje':
      return profile.zdravlje
        ? u.vrednost.some(v => profile.zdravlje!.includes(v))
        : 'unknown';
    // ... ostali tipovi
    case 'i': {
      const results = u.uslovi.map(uu => evalUslov(uu, profile));
      if (results.some(r => r === false)) return false;
      if (results.some(r => r === 'unknown')) return 'unknown';
      return true;
    }
    case 'ili': {
      const results = u.uslovi.map(uu => evalUslov(uu, profile));
      if (results.some(r => r === true)) return true;
      if (results.some(r => r === 'unknown')) return 'unknown';
      return false;
    }
    case 'ne': {
      const r = evalUslov(u.uslov, profile);
      if (r === 'unknown') return 'unknown';
      return !r;
    }
  }
}

export function matchPravo(profile: Profile, pravo: Pravo): MatchResult | null {
  const evaluations = pravo.uslovi.map(u => evalUslov(u, profile));
  
  if (evaluations.some(e => e === false)) return null; // ne kvalifikuje se
  
  const allTrue = evaluations.every(e => e === true);
  const hasUnknown = evaluations.some(e => e === 'unknown');
  
  return {
    pravo,
    match_strength: allTrue ? 'siguran' : hasUnknown ? 'verovatan' : 'mozda',
    matched_conditions: pravo.uslovi.filter((_, i) => evaluations[i] === true),
    missing_data: extractMissingFields(pravo.uslovi, evaluations, profile),
  };
}

export function matchAll(profile: Profile, catalog: Pravo[]): MatchResult[] {
  return catalog
    .map(p => matchPravo(profile, p))
    .filter((m): m is MatchResult => m !== null)
    .sort(byTagsAndPriority);
}
```

**Važno:**
- Tri stanja umesto boolean: `true | false | 'unknown'`
- 'unknown' znači "profil ne pokriva ovaj podatak" — ne treba odmah odbaciti
- Korisnik može da ima pravo iako nije popunio sve polja
- Pure functions: jednostavno za testiranje, memoizacija preko `useMatches` hook-a

---

## 5. HOME — DVA ULAZA

Home stranica nudi **dva ravnopravna ulaza** u aplikaciju:

```
┌─────────────────────────────────────────┐
│   Moja Pomoć                            │
│   Otkrijte sva državna prava            │
│   koja vam pripadaju                    │
│                                         │
│   ┌─────────────────┐ ┌──────────────┐ │
│   │  Saznaj šta mi  │ │  Pretraži    │ │
│   │  pripada        │ │  prava       │ │
│   │  (Wizard, ~2min)│ │  (po nazivu) │ │
│   └─────────────────┘ └──────────────┘ │
│                                         │
│   "Ne znate šta da tražite? Krenite     │
│    sa wizardom — postavićemo nekoliko   │
│    pitanja i pokazaćemo vam sve što     │
│    vam pripada."                        │
└─────────────────────────────────────────┘
```

**Preporučeni put: Wizard** (zato je primarni CTA — taman dugme, levo, veće).

**Alternativa: Pretraga** (sekundarni CTA — light dugme, desno) za korisnike koji već znaju ime prava ili žele da brzo provere konkretnu stvar ("dečji dodatak", "banjsko lečenje").

---

## 6. WIZARD — DETALJI

### 6.1. Tok

```
Home → "Saznaj šta mi pripada"
  → Wizard step 1/9
  → ... step 9/9
  → Results
  → Detail (klik na pravo)
```

### 6.2. 9 koraka

Detaljne opcije svih 9 koraka su u `wizard/steps-config.ts` (videti sekciju 8).

Svaki step:
- **Pitanje** (kratko, ljudski)
- **Hint** (kontekstualno, zašto pitamo)
- **Tip**: `single_select` ili `multi_select`
- **Opcije**: lista sa `val`, `label`, `icon`, opciono `exclusive: true` (za "nemam ništa od navedenog")

### 6.3. UX pravila

- **Progress bar** gore (9 tačaka, popunjavaju se)
- **Nazad/Sledeće** dugmad dole (Nazad disabled na step 1)
- **Mogućnost preskakanja**: na step Pol i Primanja korisnik može da odbije
- **Auto-save**: svaki klik update-uje localStorage
- **Resume**: ako se vrati sutra, nudi "Nastavi gde si stao" ili "Kreni ispočetka"
- **Multi-select sa exclusive opcijom**: ako odabere "Nemam ništa", briše sve ostale; ako odabere bilo šta drugo, briše "Nemam ništa"

---

## 7. PRETRAGA — ALTERNATIVA WIZARD-U

### 7.1. Svrha

Za korisnike koji:
- Već znaju ime prava i hoće brzo da provere uslove
- Žele da pregledaju katalog po kategorijama
- Tačno znaju šta traže (npr. "subvencija za vrtić")

### 7.2. UI

```
┌──────────────────────────────────────────┐
│ ← Nazad na početak                       │
│                                          │
│ 🔍 [Pretražite po nazivu prava...]       │
│                                          │
│ Filteri:                                 │
│ [Sve] [Penzioneri] [Porodica] [OSI]...   │
│                                          │
│ ─────────────────────────────────────    │
│                                          │
│ Hronični bolesnici (6)                   │
│   • Oslobađanje participacije RFZO       │
│   • Banjsko lečenje preko RFZO           │
│   • Pomagala (glukometri, slušni...)     │
│   ...                                    │
│                                          │
│ Porodica i deca (8)                      │
│   • Refundacija PDV na bebi opremu       │
│   ...                                    │
│                                          │
│ [Krenite wizard za personalizovane       │
│  preporuke →]                            │
└──────────────────────────────────────────┘
```

### 7.3. Pretraga (search-index.ts)

Mini fuzzy-search bez eksterne biblioteke:

```typescript
// lib/search-index.ts
import type { Pravo } from '@/types';

export function buildSearchIndex(catalog: Pravo[]) {
  return catalog.map(pravo => ({
    pravo,
    haystack: normalizeText([
      pravo.naziv.sr_lat,
      pravo.naziv.sr_cyr,
      pravo.kratak_opis.sr_lat,
      pravo.kratak_opis.sr_cyr,
      pravo.kategorija,
      pravo.ko_ima_pravo_opis,
    ].join(' ')),
  }));
}

export function search(
  index: ReturnType<typeof buildSearchIndex>,
  query: string,
  kategorija?: string
): Pravo[] {
  const q = normalizeText(query);
  
  return index
    .filter(item => {
      if (kategorija && item.pravo.kategorija !== kategorija) return false;
      if (!q) return true;
      return item.haystack.includes(q);
    })
    .map(item => item.pravo);
}

// Transliterates cyrillic to latin, removes accents, lowercases
// so user can type "decji dodatak" and find "Дечји додатак"
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[а-я]/gi, char => CYR_TO_LAT[char] || char)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
```

**Bez Fuse.js / FlexSearch u V1** — katalog je dovoljno mali (50-100 prava) da indexOf radi instant. Bibliotekе dodajemo tek ako broj prava poraste preko 500.

### 7.4. UX pravila

- **Real-time pretraga** — rezultati se ažuriraju dok korisnik kuca (sa 200ms debounce)
- **Grupisanje po kategoriji** u rezultatima
- **Bilingual** — pretraga radi nezavisno od pisma (kuca latinicom, nalazi i ćirilicom)
- **Empty state** — ako nema rezultata: "Niste pronašli pravo? Probajte wizard — postavićemo pitanja koja vam mogu otkriti prava o kojima niste razmišljali."
- **CTA na dno** — uvek prikazati "Krenite wizard →" da preusmeri ka glavnom toku

### 7.5. Filteri

Filter chips po kategoriji (multi-select):
- Sve | Hronični bolesnici | Porodica i deca | Penzioneri | OSI | Nezaposleni | Borci | itd.

Optional filteri (V1.5):
- Po instituciji (PIO, RFZO, NSZ, CSR)
- Po tipu iznosa (mesečno, jednokratno, popust, refundacija)
- "Visok prioritet" toggle (samo prioritet 4-5)

---

## 8. KATALOG — STRUKTURA I ŠTO IDE U V1

### 8.1. Shema

Glavni tipovi su definisani u `src/types/`. Pratite `schema.ts` koji je već napravljen — kopiraj definicije u `src/types/pravo.ts`, `src/types/profile.ts`, itd.

Ključni tip:

```typescript
export type Pravo = {
  id: string;
  kategorija: Kategorija;
  naziv: LocalizedText;
  kratak_opis: LocalizedText;
  prioritet_propusta: 1 | 2 | 3 | 4 | 5;
  tagovi: Tag[];
  pravni_osnov: LegalSource[];
  iznos: Iznos;
  ko_ima_pravo_opis: string;
  uslovi: Uslov[];
  zasto_se_propusta: string;
  koraci: Korak[];
  dokumenti: Dokument[];
  institucije: Institucija[];
  filijala_pravilo: FilijalaPravilo;
  uputstvo_zahteva?: UputstvoZahteva;
  ceste_greske: CestaGreska[];
  rok_za_podnosenje?: string;
  prosecno_trajanje_postupka?: string;
  spoljni_resursi?: SpoljniResurs[];
  last_verified: string;
  verified_by?: string;
  napomena_za_urednika?: string;
};
```

### 8.2. Prava u V1

V1 lansira sa **30+ prava** raspoređenih u kategorije:

**Već strukturirano (46 prava iz V1 kataloga):**
- Hronični bolesnici (6)
- Porodica/deca (8)
- Penzioneri (7)
- OSI (6)
- Nezaposleni (5)
- Borci/invalidi (3)
- Energetska zaštita (2)
- Prosveta (3)
- Poljoprivreda (2)
- Žrtve nasilja (2)
- Hraniteljstvo (1)
- Stanovanje (1)

**Za V1.5 (proširiti na 80+):**
- Zdravlje žena (5)
- Mentalno zdravlje (3)
- Smrt člana porodice (4)
- Razvod (3)
- Dijaspora (2)
- Životne situacije (5)
- Mladi (3)
- + 30+ produbljivanja postojećih kategorija

Detaljna mapa svih 102 prava je u referentnom dokumentu `MojaPomoc_Istrazivanje.xlsx` (Viktor poseduje).

### 8.3. Učitavanje kataloga

`lib/catalog.ts` — pure functions + `hooks/useCatalog.ts` za React integration:

```typescript
// lib/catalog.ts
import type { Katalog, Pravo } from '@/types';

let cachedCatalog: Katalog | null = null;

export async function loadCatalog(): Promise<Katalog> {
  if (cachedCatalog) return cachedCatalog;
  const response = await fetch('/catalog/katalog.json');
  cachedCatalog = await response.json() as Katalog;
  return cachedCatalog;
}

export function findPravo(katalog: Katalog, id: string): Pravo | undefined {
  return katalog.prava.find(p => p.id === id);
}
```

```typescript
// hooks/useCatalog.ts
import { useEffect, useState } from 'react';
import { loadCatalog } from '@/lib/catalog';
import type { Katalog } from '@/types';

export function useCatalog() {
  const [katalog, setKatalog] = useState<Katalog | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadCatalog()
      .then(setKatalog)
      .finally(() => setLoading(false));
  }, []);
  
  return { katalog, loading };
}
```

### 8.4. Generisanje katalog.json

**Skripta `scripts/build-catalog.ts`**:
- Čita sve pojedinačne JSON-ove iz `src/assets/catalog/prava/*.json`
- Validira svaki protiv sheme (sva obavezna polja, ispravni enum-i)
- Briše sva polja koja počinju sa `_` (komentari iz predloška)
- Merge u jedan `katalog.json` sa metapodacima (version, last_update, total_prava)
- Pokreće se kao `npm run build:catalog` pre svakog `npm run build`

---

## 9. WIZARD STEPS — KONKRETNE OPCIJE

Sve opcije za 9 koraka — kopiraj direktno u `wizard-steps-config.ts`:

```typescript
export const WIZARD_STEPS = [
  {
    id: 'starost',
    q: 'Koliko godina imate?',
    hint: 'Različita prava važe za različite starosne grupe',
    type: 'single',
    options: [
      { val: 'mladi', label: 'Do 30 godina', icon: 'user' },
      { val: 'srednji', label: '30 – 50 godina', icon: 'user' },
      { val: 'stariji', label: '50 – 65 godina', icon: 'user' },
      { val: 'penzioner', label: 'Preko 65 godina (ili penzioner)', icon: 'user-heart' }
    ]
  },
  {
    id: 'pol',
    q: 'Pol',
    hint: 'Neka prava su specifična za žene (IVF, skrining, porodiljsko)',
    type: 'single',
    options: [
      { val: 'z', label: 'Žena', icon: 'gender-female' },
      { val: 'm', label: 'Muškarac', icon: 'gender-male' },
      { val: 'preskoci', label: 'Ne želim da odgovorim', icon: 'arrow-right' }
    ]
  },
  {
    id: 'domacinstvo',
    q: 'Kako biste opisali svoje domaćinstvo?',
    hint: 'Različita prava važe za različite porodične situacije',
    type: 'single',
    options: [
      { val: 'sam', label: 'Živim sam/a', icon: 'user' },
      { val: 'partner', label: 'Sa partnerom/kom, bez dece', icon: 'users' },
      { val: 'porodica', label: 'Sa partnerom/kom i decom', icon: 'users' },
      { val: 'samohrani', label: 'Samohrani roditelj sa decom', icon: 'user-heart' },
      { val: 'sa_roditeljima', label: 'Sa roditeljima/rodbinom', icon: 'home-heart' },
      { val: 'mesoviti', label: 'Više generacija u domaćinstvu', icon: 'home-heart' }
    ]
  },
  {
    id: 'deca',
    q: 'Imate li dece (rođene ili usvojene)?',
    hint: 'Označite sve što važi',
    type: 'multi',
    options: [
      { val: 'nema', label: 'Nemam decu', icon: 'x', exclusive: true },
      { val: 'beba', label: 'Bebu (do 1 godine)', icon: 'baby-carriage' },
      { val: 'predskolsko', label: 'Predškolskog uzrasta (1-6 g)', icon: 'mood-kid' },
      { val: 'osnovac', label: 'Školarca (7-14 g)', icon: 'school' },
      { val: 'srednjoskolac', label: 'Srednjoškolca (15-18 g)', icon: 'school' },
      { val: 'student', label: 'Studenta', icon: 'school' },
      { val: 'punoletno_zdravstveno', label: 'Punoletno dete sa zdravstvenim problemima', icon: 'heart-rate-monitor' },
      { val: 'smetnje', label: 'Dete sa smetnjama u razvoju ili invaliditetom', icon: 'accessible' }
    ]
  },
  {
    id: 'zaposlenje',
    q: 'Vaš trenutni radni status',
    hint: 'Određuje pristup naknadama, subvencijama i programima',
    type: 'single',
    options: [
      { val: 'zaposlen', label: 'Zaposlen/a (ugovor o radu)', icon: 'briefcase' },
      { val: 'preduzetnik', label: 'Preduzetnik / paušalac', icon: 'building-store' },
      { val: 'poljoprivrednik', label: 'Registrovani poljoprivrednik', icon: 'plant' },
      { val: 'nezaposlen', label: 'Nezaposlen/a (sa NSZ prijavom)', icon: 'user-question' },
      { val: 'nezaposlen_neprijavljen', label: 'Nezaposlen/a (bez NSZ prijave)', icon: 'user-question' },
      { val: 'student', label: 'Student/kinja', icon: 'school' },
      { val: 'penzioner', label: 'Penzioner/ka', icon: 'user-heart' },
      { val: 'na_bolovanju', label: 'Na bolovanju ili porodiljskom', icon: 'medical-cross' }
    ]
  },
  {
    id: 'primanja',
    q: 'Mesečna primanja po članu domaćinstva',
    hint: 'Sva primanja u domaćinstvu / broj članova. Procena je dovoljna.',
    type: 'single',
    options: [
      { val: 'vrlo_niska', label: 'Manje od 15.000 RSD', icon: 'coin' },
      { val: 'niska', label: '15.000 – 30.000 RSD', icon: 'coin' },
      { val: 'srednja', label: '30.000 – 50.000 RSD', icon: 'coin' },
      { val: 'visa', label: '50.000 – 100.000 RSD', icon: 'coin' },
      { val: 'visoka', label: 'Preko 100.000 RSD', icon: 'coin' },
      { val: 'preskoci', label: 'Ne želim da odgovorim', icon: 'arrow-right' }
    ]
  },
  {
    id: 'zdravlje',
    q: 'Da li vi ili neko u domaćinstvu ima zdravstveni izazov?',
    hint: 'Označite sve što važi. Najveći broj propušteních prava je u ovoj kategoriji.',
    type: 'multi',
    options: [
      { val: 'nista', label: 'Niko u domaćinstvu nema značajne zdravstvene probleme', icon: 'heart', exclusive: true },
      { val: 'hronicno', label: 'Hronična bolest (dijabetes, hipertenzija, KOPB, srčana)', icon: 'heart-rate-monitor' },
      { val: 'onkologija', label: 'Onkološka bolest (aktivna ili oporavak)', icon: 'medical-cross' },
      { val: 'dijaliza', label: 'Dijaliza ili transplantacija', icon: 'droplet' },
      { val: 'mentalno', label: 'Mentalno zdravlje (anksioznost, depresija, druge dijagnoze)', icon: 'brain' },
      { val: 'invaliditet', label: 'Telesno oštećenje ili invaliditet', icon: 'accessible' },
      { val: 'cula', label: 'Oštećenje vida ili sluha', icon: 'eye' },
      { val: 'tudja_nega', label: 'Neko u porodici treba tuđu negu i pomoć', icon: 'helping-hand' },
      { val: 'autoimuna', label: 'Autoimuna bolest', icon: 'shield-half' }
    ]
  },
  {
    id: 'situacija',
    q: 'Da li ste se nedavno našli u nekoj od ovih situacija?',
    hint: 'Označite sve što važi. Ova prava se najviše propuštaju zbog rokova.',
    type: 'multi',
    options: [
      { val: 'nista', label: 'Ništa od navedenog', icon: 'x', exclusive: true },
      { val: 'rodjeno_dete', label: 'Rodilo se dete (u poslednjih godinu dana)', icon: 'baby-carriage' },
      { val: 'smrt_porodice', label: 'Umro je član porodice', icon: 'grave' },
      { val: 'razvod', label: 'Razvod ili razdvajanje', icon: 'heart-broken' },
      { val: 'izgubio_posao', label: 'Izgubio/la sam posao u poslednjih 6 meseci', icon: 'briefcase-off' },
      { val: 'nasilje', label: 'Iskusio/la sam porodično nasilje', icon: 'alert-triangle' },
      { val: 'pozar_poplava', label: 'Požar, poplava ili druga nepogoda', icon: 'flame' },
      { val: 'preselio', label: 'Preselio/la sam iz inostranstva u Srbiju', icon: 'plane-arrival' }
    ]
  },
  {
    id: 'posebne',
    q: 'Da li se odnosi na vas ili nekog u domaćinstvu?',
    hint: 'Ove kategorije otključavaju posebne pakete prava',
    type: 'multi',
    options: [
      { val: 'nista', label: 'Ništa od navedenog', icon: 'x', exclusive: true },
      { val: 'borac', label: 'Borac ili veteran (JNA, ratovi 90-ih)', icon: 'medal' },
      { val: 'porodica_palog_borca', label: 'Porodica palog borca', icon: 'medal' },
      { val: 'izbeglica', label: 'Izbeglica ili interno raseljeno lice', icon: 'luggage' },
      { val: 'hraniteljska_porodica', label: 'Hraniteljska porodica (ili bi htela da postane)', icon: 'home-heart' },
      { val: 'parcela', label: 'Vlasništvo poljoprivredne parcele (i mala)', icon: 'plant' },
      { val: 'pcele', label: 'Posedovanje košnica (i mali pčelari)', icon: 'bug' },
      { val: 'dijaspora', label: 'Radio/la sam u inostranstvu (DE, AT, SE...)', icon: 'world' }
    ]
  }
];
```

---

## 10. RESULTS — STRANICA

### 10.1. Layout

```
[Header sa Latin/Cyrillic toggle (default: latinica)]

[Summary grid - 3 kartice]
  - Pronađeno prava: N
  - Verovatno niste znali: M
  - Kategorija: K

[Disclaimer]
"Ovo je informativni alat. Konačnu odluku donose nadležne institucije."

[Filter chips: Sve | Verovatno niste znali | Visok prioritet | Po kategorijama]

[Lista kartica prava]
  - Sortirano po: surprise prvo, onda prioritet_propusta desc
  - Svaka kartica: naziv, tagovi, kratak opis, iznos, [Pogledaj detalje →]

[Anketa]
"Da li ste znali za većinu ovih prava?"
[Znao/la] [Znao/la ali nisam podneo/la] [Prvi put čujem] [Mešovito]

[Akcije]
[Sačuvaj kao PDF] [Krenite ispočetka] [O projektu] [Donirajte]
```

### 10.2. Kartica prava (ResultCard)

```tsx
// components/results/ResultCard.tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScript } from '@/hooks/useScript';
import { pickScript, formatIznos } from '@/lib/script';
import type { Pravo } from '@/types';

export function ResultCard({ pravo, onClick }: { pravo: Pravo; onClick: () => void }) {
  const script = useScript();
  
  return (
    <Card className="cursor-pointer hover:shadow-md transition" onClick={onClick}>
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="font-medium">{pickScript(pravo.naziv, script)}</h3>
        <span className="text-sm text-green-700 whitespace-nowrap">
          {formatIznos(pravo.iznos)}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {pravo.tagovi.includes('surprise') && (
          <Badge variant="warning">Verovatno niste znali</Badge>
        )}
        {pravo.prioritet_propusta >= 4 && (
          <Badge variant="destructive">Visok prioritet</Badge>
        )}
        <Badge variant="secondary">{pravo.kategorija}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        {pickScript(pravo.kratak_opis, script)}
      </p>
      <button className="text-sm text-primary mt-2">
        Pogledaj detalje →
      </button>
    </Card>
  );
}
```

### 10.3. PDF Export

`lib/pdf-export.ts`:
- Koristi `jspdf` biblioteku
- Generiše čist PDF (bez personalnih podataka)
- Sadržaj: naslov "Vaša prava — Moja Pomoć", datum, lista prava, za svako: naziv, iznos, institucija, top 3 koraka
- Footer: "mojapomoc.rs | Generisano DD.MM.YYYY | Ovo je informativni alat"
- Format: A4, srpska latinica default (toggle ćirilica), Unicode font

---

## 11. PRAVO DETAIL — STRANICA

### 11.1. Layout

```
[Nazad na rezultate]

[Naslov: pravo.naziv]
[Tagovi: surprise, visok prioritet, kategorija]
[Kratak opis]

[Info banner: "Ključno pravilo: ..."]
(samo ako pravo ima specifičan napomenu)

[6 tabova]
  1. Osnovno    - meta podaci, iznos, ko ima pravo, rokovi
  2. Koraci     - postupak korak po korak
  3. Dokumenti  - lista sa "gde se nabavlja" i troškom
  4. Gde se obratiti - institucije i kontakti
  5. Uputstvo zahteva - šta tražiti, šta proveriti (BEZ POPUNJAVANJA)
  6. Česte greške - lista pogrešnih praksi

[Akcije]
[Sačuvaj kao PDF] [Pogledaj druga prava] [Donirajte]
```

### 11.2. Tab "Uputstvo zahteva"

**OVO JE KRITIČNO** — ne pravimo formu za popunjavanje. Renderuje 4 sekcije iz `uputstvo_zahteva` polja:

```tsx
// components/pravo-detail/TabUputstvo.tsx
import type { UputstvoZahteva } from '@/types';

export function TabUputstvo({ uputstvo }: { uputstvo: UputstvoZahteva }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{uputstvo.naziv_zahteva}</h3>
      
      <section>
        <h4 className="font-medium mb-2">Gde dobiti obrazac</h4>
        <p className="text-sm">{uputstvo.gde_dobiti_obrazac}</p>
        {uputstvo.obrazac_url && (
          <a 
            href={uputstvo.obrazac_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary mt-1 inline-block"
          >
            Pogledaj službeni obrazac →
          </a>
        )}
      </section>
      
      <section>
        <h4 className="font-medium mb-2">Pre nego što odete</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {uputstvo.pre_popunjavanja.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
      
      <section>
        <h4 className="font-medium mb-2">Šta tačno reći na šalteru</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {uputstvo.sta_reci_na_salteru.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
      
      <section>
        <h4 className="font-medium mb-2">Šta proveriti pre potpisa</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {uputstvo.sta_proveriti_pre_potpisa.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
      
      <section>
        <h4 className="font-medium mb-2">Posle predaje zahteva</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {uputstvo.posle_predaje.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
```

---

## 12. DIZAJN

**TBD — dizajn nije finalizovan u ovoj verziji specs.md.**

**Pravac:** vizuelno treba da podseća na **zvanične državne sajtove Republike Srbije** (eUprava, pio.rs, rfzo.rs) — formalan, ozbiljan ton koji ulije poverenje, jer korisnik treba da prepozna ovo kao verodostojan izvor informacija o državnim pravima (čak i ako nije zvanično državno).

**Za Claude Code:**
- **Nemoj sam praviti dizajn-odluke** u Sprintu 1 i 2 — koristi minimalan funkcionalan stil (osnovni Tailwind, sistemski font, neutralne boje)
- Wizard i Results stranice mogu biti vizuelno "skoro prazne" dok ne dobijemo finalni dizajn
- Fokus prvih sprinta: **funkcionalnost i podaci**, ne pixel-perfect izgled
- Pre Sprint 3 dolazi posebna sesija sa Viktorom gde se finalizuju: paleta, tipografija, layout, header, footer, ikone, eUprava-inspirisan vizuelni jezik

**Privremene smernice (samo da nije ružno tokom razvoja):**
- Neutralna paleta (belo + sivo + jedna primarna boja, plava ide ka tonu Republike Srbije)
- Sistemski sans-serif font (latinica + ćirilica fontovi default sistemski)
- Max širina sadržaja 720px (mobile-first)
- Padding/spacing prema Tailwind defaults
- Bez kustom ilustracija ili grafike — pusti za posle dizajn sesije

**Inspiracija za buduću dizajn sesiju (NE praviti automatski):**
- **eUprava** (euprava.gov.rs) — državni izgled, primarna referenca
- **pio.rs, rfzo.rs, nsz.gov.rs** — institucionalni ton
- **GOV.UK** — najbolji svetski benchmark za civic tech (jednostavno, jasno, pristupačno)

**Naredna sesija:** detaljni dizajn — paleta, tipografija, komponente — biće dodati u **specs.md v1.1** posle dizajn sesije sa Viktorom.

---

## 13. ROUTING

React Router v6:

```tsx
// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wizard" element={<WizardPage />} />
        <Route path="/pretraga" element={<SearchPage />} />
        <Route path="/rezultati" element={
          <RequireProfile>
            <ResultsPage />
          </RequireProfile>
        } />
        <Route path="/pravo/:id" element={<PravoDetailPage />} />
        <Route path="/o-projektu" element={<AboutPage />} />
        <Route path="/donacije" element={<DonatePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// RequireProfile guard
function RequireProfile({ children }: { children: React.ReactNode }) {
  const profile = useProfile();
  if (!profile || !isProfileComplete(profile)) {
    return <Navigate to="/wizard" replace />;
  }
  return <>{children}</>;
}
```

**Sve rute imaju srpske putanje** (`/wizard`, `/pretraga`, `/rezultati`, `/pravo/:id`).

---

## 14. PWA

- Service Worker preko `vite-plugin-pwa` (Workbox-based)
- `manifest.json` sa ikonama, theme color, scope
- Installable na mobile (Add to Home Screen)
- Catalog se cache-uje pri prvom učitavanju

---

## 15. ANALITIKA

Plausible events:

```typescript
analytics.track('wizard_started');
analytics.track('wizard_completed', { totalResults: N, surprises: M });
analytics.track('pravo_viewed', { pravo_id: 'DJ01' });
analytics.track('pdf_exported');
analytics.track('survey_answered', { answer: 'prvi_put' });
analytics.track('donation_clicked', { method: 'patreon' });
```

**NEMA** lične podatke. Samo agregisani brojevi.

---

## 16. DEPLOYMENT

### 16.1. GitHub Actions

`.github/workflows/deploy.yml`:
```yaml
name: Build and Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build:catalog   # validira i merguje JSON
      - run: npm run build           # Vite build
      - uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './dist'
          production-branch: main
```

### 16.2. Netlify konfiguracija

`netlify.toml`:
```toml
[build]
  command = "npm run build:catalog && npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer"
    Content-Security-Policy = "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; script-src 'self'; connect-src 'self' https://plausible.io"
```

---

## 17. TESTING

### 17.1. Unit testovi (Vitest)

- **Matcher** (`lib/matcher.test.ts`): testirati svaki tip Uslov-a sa pozitivnim, negativnim i unknown slučajem
- **Search index** (`lib/search-index.test.ts`): pretraga radi cross-script (kucam latinicu, nalazim ćirilicu)
- **Script utils** (`lib/script.test.ts`): transliteracija edge cases (љ, њ, дж...)
- **Profile** (`lib/profile.test.ts`): localStorage CRUD, partial profil

Cilj: 80%+ coverage na `lib/`.

### 17.2. E2E (Playwright)

4 ključna toka:
1. **Wizard tok**: završi kao "samohrana majka sa novorođenčetom, niska primanja" → očekuj Dečji dodatak, Roditeljski dodatak, Refundacija PDV
2. **Wizard tok**: kao "penzioner sa najnižom penzijom" → očekuj penzijska prava, RTV oslobođenje
3. **Search tok**: kuca "dečji dodatak" → klik na rezultat → vidi detail sa 6 tabova
4. **PDF export**: izvezi PDF iz rezultata, proveri da nema ličnih podataka

---

## 18. KAKO RAZVIJATI — REDOSLED

### Sprint 1 (Weekend 1) — KOSTUR
1. Vite + React + TypeScript project setup
2. Tailwind + shadcn/ui init (`pnpm dlx shadcn-ui@latest init`)
3. TypeScript modeli iz `schema.ts` u `src/types/`
4. `lib/matcher.ts` + `lib/search-index.ts` (sa Vitest testovima)
5. `lib/catalog.ts` i `lib/profile.ts`
6. Učitaj 2 testna JSON-a u `src/assets/catalog/prava/` (DJ01 + HB01)
7. Build skripta `scripts/build-catalog.ts` (validacija + merge)
8. Home stranica (minimum: naslov + 2 CTA dugmeta — Wizard i Pretraga)

### Sprint 2 (Weekend 2) — WIZARD + PRETRAGA
1. React Router setup
2. `WizardPage` + `Wizard` komponenta
3. `ProgressBar` (shadcn Progress)
4. `WizardStep` generička komponenta (radi single i multi select)
5. Sve 9 koraka iz `wizard/steps-config.ts`
6. `useProfile` hook sa localStorage
7. `SearchPage` + `SearchBar` + grupisani rezultati
8. Filter chips po kategoriji
9. Routing iz Home na oba toka

### Sprint 3 (Weekend 3) — RESULTS + DETAIL
1. `ResultsPage` sa karticama
2. Sortiranje i filter chips
3. `ScriptToggle` komponenta (latinica/ćirilica), default latinica
4. `PravoDetailPage` sa 6 tabova (shadcn Tabs)
5. `Disclaimer` komponenta
6. `Anketa` komponenta sa Plausible event-om

### Sprint 4 (Weekend 4) — FINISH
1. PDF export (`react-pdf` ili `jspdf`)
2. PWA setup (vite-plugin-pwa)
3. Plausible integration
4. About + Donate stranice
5. Meta tags, SEO, OG image
6. Deploy na Netlify
7. Lighthouse audit (cilj: 90+ na sve)

---

## 19. PRAVNI/COMPLIANCE

### 19.1. Disclaimer (mora biti na svakoj stranici sa rezultatima)

> **"Moja Pomoć je informativni alat. Konačnu odluku donose nadležne institucije. Pre podnošenja zahteva, proverite uslove sa nadležnom institucijom. Aplikacija ne čuva vaše lične podatke."**

### 19.2. Privacy Policy

Glavna poruka:
- Ne čuvamo vaše podatke
- Sve radi u vašem browseru (localStorage)
- Plausible analitika je agregisana i anonimna
- Nema cookies za tracking
- GDPR-compliant by design

### 19.3. Licenca

- **Kod**: MIT
- **Katalog prava (JSON)**: CC-BY-SA 4.0 (svako može da koristi sa atribucijom)
- Footer link na GitHub repo

---

## 20. ŠTA NE PRAVITI U V1

- AI chatbot
- Personalizovane email notifikacije
- Authentication / user accounts
- Backend / database
- Mobile native app (iOS/Android)
- Reklame / oglašavanje
- Affiliate linkove
- Lokalne (opštinske) varijante prava
- Žalbe na rešenja (template-i)
- Lekarska / pravna konsultacija
- Chat sa drugim korisnicima
- B2B integracije

Sve ovo dolazi u V1.5, V2, ili nikad — zavisno od sponzora i feedback-a.

---

## 21. KONTAKT (Viktor)

Za pitanja i odluke koje nisu pokrivene ovim specs.md:

- **Bez improvizacije na pravnim pitanjima** — uvek pitaj
- **Bez integracije sa drugim projektima** — Moja Pomoć je samostalna
- **Bez dodavanja eksternih sevisa** koji nisu u stack-u (Auth0, Firebase, itd.) — pitaj prvo
- **Sve odluke u dizajnu su otvorene** — slobodno predloži alternative ako misliš da je bolje

---

## 22. SLEDEĆI KORACI POSLE V1

### V1.5 (3 meseca posle launch-a)
- Proširi katalog na 80+ prava
- AI sloj za personalizovana objašnjenja (opciono — dolazi na klik)
- Žalbe template-i
- Lokalne varijante za BG, NS, NI

### V2 (kad budu sponzori)
- Konkursni feed (automatsko crawlanje javnih poziva sa privreda.gov.rs, NSZ, RAS)
- Privatne pogodnosti (Telekom popusti, bankarski paketi)
- Prevod na romski, mađarski, albanski
- Native mobile app (možda)

### Nikad
- Reklame
- Prikupljanje ličnih podataka
- B2B preprodaja podataka
- Integracija sa drugim Viktor-ovim projektima

---

**Kraj specs.md** — verzija 1.0, datum 2026-05-18.

**Za Claude Code:** kad budeš počinjao razvoj, prvo potvrdi da si pročitao ovaj fajl. Sve odluke u njemu su rezultat dugog razmišljanja sa Viktor-om. Ako nešto nije jasno, pitaj pre nego što izmeniš arhitekturu.
