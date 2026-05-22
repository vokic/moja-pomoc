# Moja Pomoć — Kontekst projekta

> Sažetak svih odluka iz brainstorming sesija. Za Claude Code i bilo koji Claude da brzo uhvati kontekst.

## Šta je projekat

Besplatna web aplikacija za građane Srbije. Korisnik popuni 9-stepski vodič ili pretraži katalog → vidi sva državna prava koja mu pripadaju + uputstva kako da ih ostvari.

## Ključne odluke

**Bez AI u V1.** Sve je statički JSON katalog. AI se razmatra tek u V2 ako budu sponzori.

**Bez backenda.** Sve u browseru. localStorage za profil. Nema servera, baze, autentifikacije.

**Bez popunjavanja zahteva.** Dajemo uputstva: "ponesite ovo", "tražite ovo na šalteru". Ne tražimo JMBG, adresu, IBAN.

**Bez reklama.** Monetizacija samo kroz sponzore (UNDP, EU, Soros, NGO). Otvoreni kod.

**Latinica default**, ćirilica toggle. Pretraga radi cross-script.

**Dizajn kao eUprava** — plava (#0C4DA2), bela, crvena (#C8102E) akcent. Bez purple gradijenata, bez generic SaaS look.

**Nezavistan projekat.** Nema integracije sa Leavo, eNalaz, mojaprava.rs.

## Tech stack

React + Vite + TypeScript + Tailwind + shadcn/ui + React Router + Vitest.

## Struktura

- Home: veliki "Pokreni vodič" button, ispod search, ispod kategorije (8 kartica)
- Wizard: 9 koraka (starost, pol, domaćinstvo, deca, zaposlenje, primanja, zdravlje, situacija, posebne)
- Rezultati: kartice prava sortirane po surprise + prioritet
- Detalji prava: 6 tabova (osnovno, koraci, dokumenti, gde se obratiti, uputstvo zahteva, česte greške)

## Katalog

46 prava trenutno strukturirano (kategorije: hronični bolesnici 16, porodica 13, penzioneri 10, OSI 10, nezaposleni 7, borci 7, ostalo). Cilj V1.5: ~80 prava.

Mapirana prava su u `MojaPomoc_Istrazivanje.xlsx`. Detaljna struktura jednog popunjenog prava: `primer_DJ01.json`. Template za nova: `predlozak_pravo.json`. TypeScript tipovi: `schema.ts`.

## Sledeći koraci

1. Pošalji NGO pisma (šabloni u `MojaPomoc_Istrazivanje.xlsx`)
2. Pokreni Lovable sa `LOVABLE_PROMPT.md`
3. Push na GitHub
4. Nastavi sa Claude Code u VSCode po `roadmap.md`

## Stranice u repou

- `specs.md` — kompletna specifikacija
- `roadmap.md` — task-by-task plan
- `decisions.md` — sve odluke sa razlozima
- `CLAUDE.md` — instrukcije za Claude Code
- `LOVABLE_PROMPT.md` — prompt za Lovable
- `schema.ts`, `predlozak_pravo.json`, `primer_DJ01.json` — struktura kataloga
- `index.html`, `wizard.html` — dizajn mockup-i
- `MojaPomoc_Istrazivanje.xlsx`, `MojaPomoc_V1_Katalog.xlsx` — istraživanje

## Šta NE praviti

- AI integracije
- Backend, baze, login
- Popunjavanje zahteva (samo uputstva)
- Reklame, affiliate
- Cross-link sa drugim projektima
- Generic SaaS estetika (purple, rounded-2xl)
