# Lovable Prompt — Moja Pomoć (V1 Prototype)

> Copy-paste sledeći tekst u Lovable. Možeš ga deliti na više poruka ako je dugačak.

---

## Inicijalni prompt (paste prvi)

Build a working prototype of **"Moja Pomoć"** — a free web app that helps citizens of Serbia discover government rights, subsidies, and benefits they may not know they qualify for.

### Core concept

Users complete a 9-step wizard (or search the catalog directly). Based on their answers, the app shows them a list of state benefits they likely qualify for, with concrete instructions on where to apply, what documents to bring, and what to say at the counter.

**Critical principles — do not deviate:**

1. **No AI calls.** All content is static text in a JSON catalog. No OpenAI, no Claude, no LLM integration anywhere.
2. **No backend.** Everything runs in the browser. User profile stored in localStorage only.
3. **No personal data collection.** Never ask for name, ID number, address, IBAN. The app gives instructions, never fills forms.
4. **No ads, no affiliate links.** This is a public service, free forever.
5. **Latin script default, Cyrillic toggle.** Both stored in catalog.
6. **Bilingual search** — typing "decji" must find "Дечји додатак".

### Tech stack

- **React + Vite + TypeScript** (strict mode)
- **Tailwind CSS** for styling
- **shadcn/ui** for base components
- **lucide-react** for icons
- **React Router v6**
- **localStorage** for state persistence
- No Redux, no Zustand — Context + hooks is enough

### Design — IMPORTANT

The visual style must look like an **official Serbian government portal** (similar to euprava.gov.rs or srbija.gov.rs):

- **Primary blue:** `#0C4DA2`
- **Dark blue:** `#073B7E` (hovers)
- **Deep blue:** `#022047` (footer)
- **State red accent:** `#C8102E`
- **Light blue tint:** `#F0F5FB` (backgrounds)
- **Border:** `#DEE3EA`
- **Text:** `#1A1A1A` primary, `#555` soft, `#888` muted
- **Background:** white primary, very light gray for sections

**NOT acceptable:**
- Purple/pink/violet anywhere
- Rounded-2xl with shadows (looks like generic SaaS)
- Gradients beyond very subtle ones
- Excessive animations
- Generic AI startup feel

**Acceptable:**
- Clean rectangular borders (1-2px solid)
- Flat colors
- Sharp, institutional feel
- Inter font (already mentioned in stack)
- Bold weights for headings, regular for body
- Plenty of whitespace
- Government-portal sobriety

### Home page

Layout — minimal, three sections only:

1. **Header**: logo "Moja Pomoć" (Pomoć in blue), Latin/Cyrillic script toggle on the right. Blue 3px bottom border.

2. **Hero centered**:
   - Big heading: "Šta vam **pripada**?" (last word in blue)
   - Subtitle: "Pretražite katalog prava i pomoći Republike Srbije."
   - **Large blue button** "Pokreni vodič" with subtitle "Odgovorite na 9 pitanja i otkrijte šta vam pripada"
   - Below button, small divider "ili pretražite katalog"
   - Big search input with search icon (placeholder: "Pretražite pravo, naknadu ili pomoć…")

3. **Categories grid** (8 cards, 4 columns desktop / 2 columns mobile):
   - Hronični bolesnici (16 prava)
   - Porodica i deca (13 prava)
   - Penzioneri (10 prava)
   - Osobe sa invaliditetom (10 prava)
   - Nezaposleni (7 prava)
   - Borci i invalidi rata (7 prava)
   - Obrazovanje (5 prava)
   - Energetska zaštita (3 prava)
   - Cards: white bg, name in 600 weight, count below "16 prava" with blue "16"
   - Hover: light blue tint background
   - Grid uses 1px gap with border background (creating clean grid lines)
   - Above grid: small red uppercase label "— Pregled po kategoriji"

4. **Footer**: thin top border, gray text "© 2026 Moja Pomoć · Informativni alat" left, links right (O projektu, Podržite, GitHub).

**Do NOT add:** statistics, news section, testimonials, "How it works" with cards, hero stats sidebar, CTA bands, or anything else. The home page is intentionally minimal.

### Wizard page (`/wizard`)

Same header + script toggle.

**Progress bar** below header:
- "Korak **N** od 9" left (N is blue and bold)
- "Prekini vodič ←" right (gray link back to home)
- 9 dots/segments below — done segments in blue, current in red, todo in light gray

**Question content** (centered, max-width 720px):
- Small red uppercase label (category like "— Zdravlje i porodica")
- Big heading question (~2rem)
- Hint text below in gray

**Options** — vertical stack:
- Each option is a full-width rectangular button (2px border)
- Checkbox marker on left (square for multi-select, circle for single-select)
- White by default, light blue tint + blue border when selected
- "Exclusive" option (like "Nemam decu") — clicking it clears all others, clicking others clears it

**9 wizard steps** — implement all of these:

```typescript
const WIZARD_STEPS = [
  {
    id: 'starost',
    label: '— Osnovno',
    question: 'Koliko godina imate?',
    hint: 'Različita prava važe za različite starosne grupe',
    type: 'single',
    options: [
      { val: 'mladi', label: 'Do 30 godina' },
      { val: 'srednji', label: '30 – 50 godina' },
      { val: 'stariji', label: '50 – 65 godina' },
      { val: 'penzioner', label: 'Preko 65 godina (ili penzioner)' }
    ]
  },
  {
    id: 'pol',
    label: '— Osnovno',
    question: 'Pol',
    hint: 'Neka prava su specifična za žene (IVF, skrining, porodiljsko)',
    type: 'single',
    options: [
      { val: 'z', label: 'Žena' },
      { val: 'm', label: 'Muškarac' },
      { val: 'preskoci', label: 'Ne želim da odgovorim' }
    ]
  },
  {
    id: 'domacinstvo',
    label: '— Porodica',
    question: 'Kako biste opisali svoje domaćinstvo?',
    hint: 'Različita prava važe za različite porodične situacije',
    type: 'single',
    options: [
      { val: 'sam', label: 'Živim sam/a' },
      { val: 'partner', label: 'Sa partnerom/kom, bez dece' },
      { val: 'porodica', label: 'Sa partnerom/kom i decom' },
      { val: 'samohrani', label: 'Samohrani roditelj sa decom' },
      { val: 'sa_roditeljima', label: 'Sa roditeljima/rodbinom' },
      { val: 'mesoviti', label: 'Više generacija u domaćinstvu' }
    ]
  },
  {
    id: 'deca',
    label: '— Zdravlje i porodica',
    question: 'Imate li dece, rođene ili usvojene?',
    hint: 'Možete označiti više opcija',
    type: 'multi',
    options: [
      { val: 'nema', label: 'Nemam decu', exclusive: true },
      { val: 'beba', label: 'Bebu (do 1 godine)' },
      { val: 'predskolsko', label: 'Predškolskog uzrasta (1 – 6 godina)' },
      { val: 'osnovac', label: 'Školarca (7 – 14 godina)' },
      { val: 'srednjoskolac', label: 'Srednjoškolca (15 – 18 godina)' },
      { val: 'student', label: 'Studenta' },
      { val: 'punoletno_zdravstveno', label: 'Punoletno dete sa zdravstvenim problemima' },
      { val: 'smetnje', label: 'Dete sa smetnjama u razvoju ili invaliditetom' }
    ]
  },
  {
    id: 'zaposlenje',
    label: '— Rad i primanja',
    question: 'Vaš trenutni radni status',
    hint: 'Određuje pristup naknadama, subvencijama i programima',
    type: 'single',
    options: [
      { val: 'zaposlen', label: 'Zaposlen/a (ugovor o radu)' },
      { val: 'preduzetnik', label: 'Preduzetnik / paušalac' },
      { val: 'poljoprivrednik', label: 'Registrovani poljoprivrednik' },
      { val: 'nezaposlen', label: 'Nezaposlen/a (sa NSZ prijavom)' },
      { val: 'nezaposlen_neprijavljen', label: 'Nezaposlen/a (bez NSZ prijave)' },
      { val: 'student', label: 'Student/kinja' },
      { val: 'penzioner', label: 'Penzioner/ka' },
      { val: 'na_bolovanju', label: 'Na bolovanju ili porodiljskom' }
    ]
  },
  {
    id: 'primanja',
    label: '— Rad i primanja',
    question: 'Mesečna primanja po članu domaćinstva',
    hint: 'Sva primanja u domaćinstvu / broj članova. Procena je dovoljna.',
    type: 'single',
    options: [
      { val: 'vrlo_niska', label: 'Manje od 15.000 RSD' },
      { val: 'niska', label: '15.000 – 30.000 RSD' },
      { val: 'srednja', label: '30.000 – 50.000 RSD' },
      { val: 'visa', label: '50.000 – 100.000 RSD' },
      { val: 'visoka', label: 'Preko 100.000 RSD' },
      { val: 'preskoci', label: 'Ne želim da odgovorim' }
    ]
  },
  {
    id: 'zdravlje',
    label: '— Zdravlje',
    question: 'Da li vi ili neko u domaćinstvu ima zdravstveni izazov?',
    hint: 'Označite sve što važi. Najveći broj propušteních prava je u ovoj kategoriji.',
    type: 'multi',
    options: [
      { val: 'nista', label: 'Niko u domaćinstvu nema značajne zdravstvene probleme', exclusive: true },
      { val: 'hronicno', label: 'Hronična bolest (dijabetes, hipertenzija, KOPB, srčana)' },
      { val: 'onkologija', label: 'Onkološka bolest (aktivna ili oporavak)' },
      { val: 'dijaliza', label: 'Dijaliza ili transplantacija' },
      { val: 'mentalno', label: 'Mentalno zdravlje (anksioznost, depresija)' },
      { val: 'invaliditet', label: 'Telesno oštećenje ili invaliditet' },
      { val: 'cula', label: 'Oštećenje vida ili sluha' },
      { val: 'tudja_nega', label: 'Neko u porodici treba tuđu negu i pomoć' },
      { val: 'autoimuna', label: 'Autoimuna bolest' }
    ]
  },
  {
    id: 'situacija',
    label: '— Životne situacije',
    question: 'Da li ste se nedavno našli u nekoj od ovih situacija?',
    hint: 'Označite sve što važi. Ova prava se najviše propuštaju zbog rokova.',
    type: 'multi',
    options: [
      { val: 'nista', label: 'Ništa od navedenog', exclusive: true },
      { val: 'rodjeno_dete', label: 'Rodilo se dete (u poslednjih godinu dana)' },
      { val: 'smrt_porodice', label: 'Umro je član porodice' },
      { val: 'razvod', label: 'Razvod ili razdvajanje' },
      { val: 'izgubio_posao', label: 'Izgubio/la sam posao u poslednjih 6 meseci' },
      { val: 'nasilje', label: 'Iskusio/la sam porodično nasilje' },
      { val: 'pozar_poplava', label: 'Požar, poplava ili druga nepogoda' },
      { val: 'preselio', label: 'Preselio/la sam iz inostranstva u Srbiju' }
    ]
  },
  {
    id: 'posebne',
    label: '— Posebne kategorije',
    question: 'Da li se odnosi na vas ili nekog u domaćinstvu?',
    hint: 'Ove kategorije otključavaju posebne pakete prava',
    type: 'multi',
    options: [
      { val: 'nista', label: 'Ništa od navedenog', exclusive: true },
      { val: 'borac', label: 'Borac ili veteran (JNA, ratovi 90-ih)' },
      { val: 'porodica_palog_borca', label: 'Porodica palog borca' },
      { val: 'izbeglica', label: 'Izbeglica ili interno raseljeno lice' },
      { val: 'hraniteljska_porodica', label: 'Hraniteljska porodica (ili bi htela da postane)' },
      { val: 'parcela', label: 'Vlasništvo poljoprivredne parcele (i mala)' },
      { val: 'pcele', label: 'Posedovanje košnica (i mali pčelari)' },
      { val: 'dijaspora', label: 'Radio/la sam u inostranstvu (DE, AT, SE…)' }
    ]
  }
];
```

**Wizard actions** at bottom:
- "← Nazad" (secondary, disabled on step 1)
- "Preskoči ovo pitanje" (small text link in middle)
- "Sledeće →" (primary blue button)

**Auto-save profile to localStorage** on every selection. On `/wizard` load, if there's existing profile, ask "Nastavi gde si stao" or "Kreni ispočetka".

After step 9, click "Pokaži šta mi pripada →" navigates to `/rezultati`.

### Results page (`/rezultati`)

Same header. Show:

1. **Summary** (3 boxes):
   - "Pronađeno prava: N"
   - "Verovatno niste znali: M"  
   - "Kategorija: K"

2. **Disclaimer** banner (light blue background): "Informativni alat. Konačnu odluku donose nadležne institucije."

3. **List of result cards** — for each matched right:
   - Title (bold)
   - Amount on right (e.g. "340.000 RSD", "besplatno", "popust 100%")
   - Tags below: "Verovatno niste znali" (amber bg), "Visok prioritet" (red bg), category name
   - Short description
   - "Pogledaj detalje →" link → navigates to `/pravo/:id`

4. **Action buttons** at bottom: "Sačuvaj kao PDF", "Krenite ispočetka", "Podržite projekat"

### Pravo detail page (`/pravo/:id`)

Same header. Show:
- "← Nazad na rezultate" link
- Title + tags
- **6 tabs** (shadcn Tabs component):
  1. **Osnovno** — key-value rows: legal basis, amount, who qualifies, processing time
  2. **Koraci postupka** — numbered list of steps with optional info/warning notes
  3. **Dokumenti** — list of required documents, where to obtain them, cost
  4. **Gde se obratiti** — institutions with contact info
  5. **Uputstvo zahteva** — 4 sections (pre_popunjavanja, sta_reci_na_salteru, sta_proveriti_pre_potpisa, posle_predaje) as bullet lists. **DO NOT include any form for the user to fill personal data — this tab gives instructions only.**
  6. **Česte greške** — list of common mistakes with consequence → solution

### Catalog data

Create `src/data/catalog.json` with **5 sample rights** to make the demo functional. Use this schema for each:

```typescript
type Pravo = {
  id: string;
  kategorija: string;
  naziv: { sr_lat: string; sr_cyr: string };
  kratak_opis: { sr_lat: string; sr_cyr: string };
  prioritet_propusta: 1 | 2 | 3 | 4 | 5;
  tagovi: ('surprise' | 'high_priority' | 'time_sensitive' | 'gateway' | 'big_money')[];
  pravni_osnov: { zakon: string; clanovi?: string }[];
  iznos: { tip: string; vrednost_opis?: string; vrednost_rsd?: number };
  ko_ima_pravo_opis: string;
  uslovi: Uslov[]; // see below
  zasto_se_propusta: string;
  koraci: { redni_broj: number; naslov: string; opis: string; napomena?: string; upozorenje?: string }[];
  dokumenti: { id: string; naziv: string; obavezno: boolean; gde_se_nabavlja: string; trosak_rsd: number; vazi_meseci?: number }[];
  institucije: { naziv: string; tip: string; adresa?: string; telefon?: string; email?: string; url?: string; radno_vreme?: string }[];
  uputstvo_zahteva?: {
    naziv_zahteva: string;
    gde_dobiti_obrazac: string;
    obrazac_url?: string;
    pre_popunjavanja: string[];
    sta_reci_na_salteru: string[];
    sta_proveriti_pre_potpisa: string[];
    posle_predaje: string[];
  };
  ceste_greske: { greska: string; posledica?: string; resenje: string }[];
  rok_za_podnosenje?: string;
  prosecno_trajanje_postupka?: string;
};

type Uslov =
  | { tip: 'starost_min'; vrednost: number }
  | { tip: 'starost_max'; vrednost: number }
  | { tip: 'pol'; vrednost: 'z' | 'm' }
  | { tip: 'ima_decu'; uzrast?: string[] }
  | { tip: 'zaposlenje'; vrednost: string[] }
  | { tip: 'zdravlje'; vrednost: string[] }
  | { tip: 'situacija'; vrednost: string[] }
  | { tip: 'posebna_kategorija'; vrednost: string[] }
  | { tip: 'primanja_max'; vrednost: 'vrlo_niska' | 'niska' | 'srednja' }
  | { tip: 'i'; uslovi: Uslov[] }
  | { tip: 'ili'; uslovi: Uslov[] };
```

**Sample rights to populate** (full data for each):

1. **DJ01** — Penzije po sporazumima sa EU/dijasporom (kategorija: dijaspora, iznos: opisno, prioritet: 5)
2. **PD01** — Refundacija PDV-a na bebi opremu (kategorija: porodica_deca, jednokratno 70.000 RSD, prioritet: 5)
3. **PD02** — Roditeljski dodatak (kategorija: porodica_deca, jednokratno 340.000 RSD za prvo dete, prioritet: 4)
4. **HB01** — Oslobađanje participacije RFZO (kategorija: hronicni_bolesnici, popust 100%, prioritet: 5)
5. **NZ01** — Subvencija za samozapošljavanje (kategorija: nezaposleni, 300.000 RSD, prioritet: 5)

For each, populate all fields with realistic Serbian content. Look up real information where needed (laws, institutions like PIO, RFZO, NSZ, real document names, real procedures).

### Rule engine (`src/lib/matcher.ts`)

Pure TypeScript functions:

```typescript
type Profile = { /* ... */ };
type MatchResult = { pravo: Pravo; strength: 'siguran' | 'verovatan'; matched: Uslov[] };

function evalUslov(u: Uslov, p: Profile): boolean | 'unknown' { ... }
function matchPravo(p: Profile, pravo: Pravo): MatchResult | null { ... }
function matchAll(p: Profile, catalog: Pravo[]): MatchResult[] { ... }
```

Three-state evaluation: `true | false | 'unknown'`. Unknown means profile doesn't cover that condition — don't reject the right, mark as "verovatan" instead of "siguran". Sort results: surprise tags first, then by prioritet_propusta descending.

### Search

`src/lib/search.ts` — fuzzy search across naziv + kratak_opis + kategorija. Must work cross-script (typing "decji" finds "Дечји додатак"). Use a CYR→LAT normalization function. No external libraries, indexOf is enough for the small catalog.

### Routing

```
/             - HomePage
/wizard       - WizardPage  
/pretraga     - SearchPage
/rezultati    - ResultsPage (requires profile in localStorage)
/pravo/:id    - PravoDetailPage
/o-projektu   - AboutPage (simple text)
/podrzite     - DonatePage (placeholder, Patreon link, dinarski racun)
```

### Final notes

- This is a **prototype** — don't worry about PWA, service workers, or PDF export yet. Focus on the wizard → results → detail flow with 5 sample rights.
- Mobile responsive is important — many users will be on phones.
- Accessibility: keyboard navigation, ARIA labels, color contrast WCAG AA.
- The script toggle in header must work — actually swap between sr_lat and sr_cyr content from catalog.

Build it step by step. Show me each page as you complete it. Start with the Home page, then Wizard, then Results, then Detail. Catalog and matcher logic can be implemented alongside.

---

## (Optional follow-up prompts if Lovable splits work)

### After Lovable scaffolds and shows home:

"Good. Now build the Wizard page with all 9 steps from the WIZARD_STEPS array. Make sure exclusive options (marked with `exclusive: true`) clear other selections when clicked, and clicking any other option clears the exclusive selection. Auto-save to localStorage on every change. Show progress dots above the question."

### After wizard works:

"Build the Results page. Run the matcher against the localStorage profile. Show matched rights as cards sorted by surprise tag first, then prioritet_propusta descending. Each card opens to /pravo/:id. Include the 3-box summary at top and disclaimer banner."

### After results work:

"Build the Pravo Detail page with 6 tabs. CRITICAL: the 'Uputstvo zahteva' tab must show only instructions (4 bullet lists), never a form for the user to fill in their data. We are not collecting personal information."

---

## Tips for using this prompt

1. **Paste in chunks** if Lovable struggles with long messages. Start with sections 1-4 ("Core concept" through "Design"), then send catalog/wizard/etc separately.

2. **If Lovable adds purple gradients or rounded shadows** — call it out immediately: "Stop. The design must look like euprava.gov.rs, not a SaaS startup. Use the color palette I specified. Sharp borders, flat colors, no shadows except subtle ones."

3. **If Lovable wants to add a backend or auth** — refuse: "No backend. No auth. Everything is localStorage and static JSON. This is intentional for privacy."

4. **If Lovable suggests adding AI** — refuse: "No AI. Static catalog only. The whole point is verifiable, auditable, free-to-run forever."

5. **Iterate on visuals** with reference to the HTML mockups (`index.html` and `wizard.html`) you already have. You can paste those into Lovable and say "match this design exactly but use React + Tailwind + shadcn."
