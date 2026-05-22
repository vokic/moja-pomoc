# Istorija odluka — Moja Pomoć

> Ovaj fajl beleži **zašto** smo doneli određene odluke, ne samo šta smo odlučili. Kad Claude Code (ili budući kontributor) naleti na nešto što izgleda nelogično, prvo čita ovaj fajl.

---

## Format

```
## YYYY-MM-DD — [Naslov odluke]

**Šta:** Šta smo odlučili
**Zašto:** Razlog
**Alternative razmotrene:** Šta smo odbili i zašto
**Reverzibilno?** Da/Ne — može li se promeniti kasnije
```

---

## 2026-05 — Bez AI u V1

**Šta:** Aplikacija ne pravi pozive ka bilo kom AI API-ju (Claude, GPT, lokalni modeli). Sva objašnjenja, koraci i uputstva su statički tekst u JSON katalogu.

**Zašto:**
1. **Tačnost** — AI halucinira, čak i kad se trudi. Za pravne/birokratske podatke greška = rešenje o odbijanju za korisnika.
2. **Trošak** — donacijama-finansiran projekat ne može da snosi rizik nepredvidivih API troškova.
3. **Privatnost** — AI poziv znači slanje podataka korisnika u oblak. Ostajemo offline-first.
4. **Performanse** — instant prikaz rezultata umesto čekanja na API.
5. **Auditabilnost** — sve što vidi korisnik može da se proveri direktno u JSON-u.

**Alternative razmotrene:**
- "AI samo za personalizovana objašnjenja" — odbijeno jer i to halucinira na pravnim detaljima
- "AI sa fact-checking layer-om" — preskupo i komplikovano za V1

**Reverzibilno?** Da, V2 može da dodaje AI sloj **iznad** baze, ne umesto.

---

## 2026-05 — Bez popunjavanja zahteva

**Šta:** Ne pravimo formu gde korisnik unosi JMBG, adresu, IBAN za automatsko popunjavanje obrazaca. Dajemo **uputstva** umesto popunjavanja.

**Zašto:**
1. **Pravna odgovornost** — pogrešno popunjen obrazac može da dovede do odbijanja. Mi nismo pravnici.
2. **Dokumenta se menjaju** — državni obrasci se redovno ažuriraju, ne možemo to da pratimo.
3. **Privatnost** — JMBG, adresa, IBAN su osetljivi. Ne želimo ih ni privremeno.
4. **Korisnik mora razumeti šta potpisuje** — ako mi sve uradimo umesto njega, on potpisuje vid bez razumevanja.

**Alternative razmotrene:**
- Lokalno popunjavanje (samo u browseru, bez slanja) — i dalje rizično pravno
- "Sugestije šta upisati" — još uvek može da postoji pogrešna sugestija

**Reverzibilno?** Da, ali bilo bi kompleksno i možda nikad neće biti pametno.

---

## 2026-05 — Latinica default, ćirilica toggle

**Šta:** Aplikacija startuje sa srpskom latinicom. Ćirilica je dostupna kroz toggle u header-u. Preference se čuva u localStorage.

**Zašto:**
1. **Praktičnost** — latinica je dominantna na webu i mobilnim uređajima
2. **Diaspore** — Srbi iz inostranstva su ciljna grupa za neke kategorije (penzije po EU sporazumima), oni češće koriste latinicu
3. **Tipkanje pretrage** — bilingual normalizer omogućava da pretraga radi nezavisno od izabranog pisma
4. **Mlađi korisnici** — preferiraju latinicu

**Alternative razmotrene:**
- Ćirilica default (zvanično pismo) — odbijeno jer komplikuje za većinu korisnika
- Samo latinica — odbijeno jer isključuje deo populacije i deluje "neoficijalno"

**Reverzibilno?** Da, lako se menja default u jednoj liniji koda.

---

## 2026-05 — Bez backenda u V1

**Šta:** Aplikacija je 100% statički sajt. Profile korisnika je u localStorage. Katalog je JSON fajl. Nema servera, baze, autentifikacije.

**Zašto:**
1. **Trošak** — nema mesečnih troškova za hosting (Netlify free tier)
2. **Privatnost** — by design, nemamo pristup podacima jer ih ne primamo
3. **GDPR** — trivijalno usklađivanje jer nema obrade podataka
4. **Brzina** — statički sajt je instant
5. **Održavanje** — manje stvari da krenu naopako

**Alternative razmotrene:**
- Backend za "sačuvaj profil i nastavi sa drugog uređaja" — odbijeno jer trеba autentifikacija i toj kompleksnosti se ne isplati za V1
- Backend za analitiku — odbijeno jer Plausible to već radi

**Reverzibilno?** Da, ali bi bilo veliko menjanje arhitekture.

---

## 2026-05 — React + Vite umesto Angular

**Šta:** Stack je React 18 + Vite + TypeScript + shadcn/ui + Tailwind. Originalno se razmišljalo Angular jer ga Viktor zna profesionalno.

**Zašto:**
1. **shadcn/ui** ekosistem je najjači u React-u — najbrži put do profesionalnih komponenti
2. **Vite** je brži od Angular CLI za dev iteraciju (HMR <100ms)
3. **Manji bundle** za statički sajt
4. **Širi pool** za eventualne kontributore
5. Viktor zna oba dovoljno dobro

**Alternative razmotrene:**
- Angular — odbijeno zbog gore navedenog
- Vanilla JS — odbijeno jer trebaju komponente za wizard
- Svelte — odbijeno jer manji ekosistem

**Reverzibilno?** Tehnički da, praktično ne (preveliko menjanje).

---

## 2026-05 — Wizard + Pretraga umesto samo Wizard

**Šta:** Home stranica nudi dva ravnopravna ulaza: Wizard (preporučen, ~2min) i Pretraga (alternativa).

**Zašto:**
1. **Različite namene** — wizard je za otkrivanje nepoznatog, pretraga je za proveravanje poznatog
2. **Mojaprava.rs ima sličan pattern** (Kalkulator + Provera prava + Dokumenta) i radi
3. **Cyrillic-Latin search** je naša prednost — niko nema (ti kucaš "decji" i nalaziš "Дечји")

**Alternative razmotrene:**
- Samo wizard — odbijeno jer ne svi žele kviz
- Samo pretraga — odbijeno jer nije discovery alat

**Reverzibilno?** Da.

---

## 2026-05 — Monetizacija: sponzori, nikad reklame

**Šta:** Aplikacija je besplatna. Monetizacija samo kroz: NGO grantove, sponzore (UNDP, EU, Soros, državni partneri), donacije. Bez reklama, affiliate linkova, premium feature-a.

**Zašto:**
1. **Misija** — alat za one koji ne mogu da plate. Reklame na alat za siromašne = predator.
2. **Poverenje** — državni alat-feeling ne sme da bude narušen prodajom pažnje
3. **Cilna grupa** — siromašni, stari, OSI — preplavljeni reklamama na sve strane

**Alternative razmotrene:**
- "Donate to unlock" — odbijeno, suprotno misiji
- Affiliate sa advokatima (kao mojaprava.rs) — odbijeno, sukob interesa
- Premium feature za "praćenje statusa zahteva" — možda V3, ali ne kompromituje besplatnu V1

**Reverzibilno?** Da, ali bi narušilo poverenje stečeno u V1.

---

## 2026-05 — Otvoreni kod, CC-BY-SA katalog

**Šta:** Sav kod je MIT licenca, katalog prava je CC-BY-SA 4.0. Repo public na GitHub-u od dana 1.

**Zašto:**
1. **Transparentnost** — pokazuje da nema skrivenog tracking-a
2. **Kontributori** — drugi mogu da dodaju prava, prevode, popravke
3. **Vlada / NGO mogu da koriste** — niko ne može da zaključa katalog
4. **Sponzorski argument** — javno dobro je lakše finansirati

**Alternative razmotrene:**
- Closed source — odbijeno, ne fituje misiji
- AGPL — odbijeno jer ograničava komercijalnu upotrebu (mi želimo da iko može da koristi)

**Reverzibilno?** Ne, jednom otvoreno ostaje otvoreno.

---

## 2026-05 — eUprava-inspirisan dizajn (TBD)

**Šta:** Vizuelno aplikacija treba da podseća na zvanične državne sajtove RS (eUprava, pio.rs, rfzo.rs). Formalan, ozbiljan ton.

**Zašto:**
1. **Poverenje** — korisnici treba da prepoznaju kao verodostojan izvor
2. **Diferencijacija** — drugi alati izgledaju kao startup-i; mi izgledamo kao public service
3. **Cilna grupa** — stariji korisnici prepoznaju državnu estetiku

**Alternative razmotrene:**
- Moderan startup look (kao mojaprava.rs) — odbijeno jer ne deluje zvanično
- Brutalist / "fancy" — odbijeno, neprikladno za ovu publiku

**Reverzibilno?** Da, ali rebrand je ozbiljan posao.

**Status:** TBD — finalna paleta i komponente posle posebne dizajn sesije sa Viktorom.

---

## 2026-05 — Bez integracije sa drugim Viktor-ovim projektima

**Šta:** Moja Pomoć je nezavisan projekat. Nikakvi cross-linkovi, shared kod, shared brand sa Leavo, eNalaz, ili drugim projektima.

**Zašto:**
1. **Različite cilne grupe** — siromašni građani vs HR menadžeri vs medicinski profesionalci
2. **Razli��iti business modeli** — javno dobro vs SaaS vs konsumer alat
3. **Reputacioni rizik** — ako jedan projekat ima problem, drugi ne sme da bude pogođen
4. **Sponzorska čistoća** — donori za civic tech ne žele da finansiraju paralelne SaaS biznise

**Alternative razmotrene:**
- Shared brand "Viktor-ovi alati" — odbijeno
- Cross-linkovi u footer-u — odbijeno

**Reverzibilno?** Da, ali nije preporučljivo.

---

## 2026-05 — mojaprava.rs (Desymphony) — ignorišemo, gradimo širi proizvod

**Šta:** Postoji aktivan sajt mojaprava.rs (autor: Desymphony) koji pokriva **samo prava nezaposlenih** (NSZ, kalkulator naknade, otpremnina, otkaz). Naša odluka: **ignorišemo ih**, ne kontaktiramo, ne uzimamo kao referencu, ne pravimo cross-link.

**Zašto:**
1. **Različiti scope** — oni pokrivaju 1 kategoriju (nezaposleni). Mi gradimo agregator za 20+ kategorija. Nismo na istoj utakmici.
2. **Različiti pristup** — oni imaju affiliate sa advokatima i komercijalan look. Mi smo non-profit, javno dobro, državna estetika.
3. **Bez ometanja** — ne razmišljati o njima tokom razvoja. Fokus na našu misiju.
4. **Ako budu konkurencija u budućnosti** — ne planiramo to. Naš proizvod je 10x širi po nameni.

**Šta NE radimo:**
- Ne kontaktiramo Desymphony
- Ne kopiramo njihov dizajn
- Ne pravimo cross-linkove
- Ne razmišljamo o njima kao benchmarku

**Šta MOŽDA jednog dana, ako:**
- Oni nas kontaktiraju za saradnju
- ILI postanu mejnstrim i bude prirodno da neko od nas predloži cross-link

Do tada — ne postoje za nas.

**Reverzibilno?** Trivijalno. Možemo kontaktirati u bilo kom trenutku.
