# Slike za sajt

Stavljaj slike ovde i one će biti dostupne preko `/images/<filename>` u app-u.

## Gde se koja slika koristi

| Filename | Gde se prikazuje | Preporučena rezolucija | Format |
|---|---|---|---|
| `hero-home.png` (ili .jpg, .webp) | Home stranica - hero ilustracija pored CTA dugmadi | 1200×800 (2:3), retina-ready | webp ili png |
| `og-image.png` | Open Graph / Twitter share preview | 1200×630 | png |
| `hero-wizard.png` | Wizard intro (opciono) | 800×600 | webp |

## Kako da iskoristiš (Viktor)

1. Stavi sliku u ovaj folder pod tačnim imenom (npr. `hero-home.png`)
2. Reci mi koja je slika za koje mesto
3. Ja je ubacujem u HomePage / Wizard / OG meta

## Tehnički

- Maksimalna veličina (preporuka): 200 KB po slici → koristi tinypng.com ili squoosh.app pre uploada
- Format prioritet: **WebP** (mali) → **PNG** (lossless) → **JPG** (foto)
- Slike NE idu u `src/assets/` osim ako se uvozi kao modul (proces ne potreban) — `public/` se servira direktno

## Trenutno korišćene

- (prazno) — hero image dolazi posle dizajn sesije sa Viktorom
