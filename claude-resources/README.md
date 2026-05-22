# Shema kataloga - Moja Pomoć

## Šta je u ovom paketu

3 fajla koji zajedno definišu strukturu kataloga za V1:

| Fajl | Šta je | Kome je namenjeno |
|------|--------|-------------------|
| `schema.ts` | TypeScript tipovi za sve entitete u katalogu | Developeru (Viktor) - import u Angular projekat |
| `predlozak_pravo.json` | Prazan JSON sa svim poljima i komentarima | Tebi (ili saradniku) - kopiraj i popunjavaj za nova prava |
| `primer_DJ01.json` | Popunjen primer (Penzije po EU sporazumima) | Referenca - kako izgleda potpuno popunjeno pravo |

## Tok rada za novo pravo

```
1. Kopiraj predlozak_pravo.json
2. Preimenuj u 'XX##_naziv.json' (npr. 'HB07_lekovi_c_lista.json')
3. Popuni sva obavezna polja (označena * u komentarima)
4. Briši sve _COMMENT_ ključeve pre commit-a
5. Verify last_verified i verified_by polja
6. Doda se u katalog (kasnije: validate skripta + merge u glavni katalog.json)
```

## Vreme po pravu

- **Sa oficijalnim izvorima na ruci:** 30 - 60 min
- **Bez izvora (počev od nule):** 1 - 2 sata
- **Sa pravnom validacijom:** + 15 min za feedback od validatora

## Strategija popunjavanja

Predlog redosleda po kategorijama (najvažnije prvo):

1. **Hronični bolesnici (HB)** - 16 prava, najveći jaz znanja
2. **Penzioneri (PN)** - 10 prava, najveća publika
3. **Porodica/deca (PD)** - 13 prava, velika publika
4. **OSI (OI)** - 10 prava, najveći iznosi
5. **Nezaposleni (NZ)** - 7 prava, brzo se popunjava
6. ... ostali po prioritetu

## Validacija prava (kasnije)

Posle V1 lansiranja, sva prava bi trebalo da prođu kroz **pravnu validaciju** od:
- Pro bono advokata (idealno preko A11/YUCOM/Praxis)
- Penzionisanog radnika CSR/PIO/RFZO
- ILI plaćenog pravnika (30-50 EUR/sat × 20-30 sati)

Polje `verified_by` se ažurira nakon validacije.

## Šta NE ide u katalog

Po MVP odluci:
- **Popunjeni zahtevi** - ne unosimo personalne podatke korisnika
- **AI generisana objašnjenja** - sve mora biti statički tekst
- **Linkovi na izvore koji se brzo menjaju** - samo stabilni linkovi

## Šta dolazi sledeće (V1.5+)

- Lokalne varijante (BG/NS/NI imaju različite opštinske programe)
- AI sloj za personalizovana objašnjenja (čita iz iste shema)
- Privatne pogodnosti (Telekom, banke, popusti uz penzionersku karticu)
- Žalbe (template za kada zahtev bude odbijen)
