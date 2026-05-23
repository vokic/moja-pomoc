/**
 * Lightweight i18n for UI strings. Two languages: Serbian (default) and
 * English. Pravo catalog content stays Serbian (institutions and legal text
 * are Serbian-only in real life).
 *
 * Usage in components:
 *   const { t } = useLang();
 *   <h1>{t('home.hero.title')}</h1>
 */

export type Lang = 'sr' | 'en';

export const LANG_KEY = 'mp_lang';
export const DEFAULT_LANG: Lang = 'sr';

export const TRANSLATIONS = {
  sr: {
    // Navigation
    'nav.home': 'Početna',
    'nav.wizard': 'Vodič za prava',
    'nav.search': 'Sve pomoći i naknade',
    'nav.results': 'Moji rezultati',
    'nav.about': 'O projektu',
    'nav.support': 'Podrška',

    // Skip link
    'skip.main': 'Preskoči na glavni sadržaj',

    // Brand
    'brand.tagline': 'Vodič kroz prava i naknade u Srbiji',
    'brand.tagline.short': 'Republika Srbija · vodič kroz prava i naknade',
    'brand.country': 'Republika Srbija',

    // Header
    'header.usa.country_label': 'Moja Pomoć · Republika Srbija',
    'header.sr.tool_label': 'Moja Pomoć — informativni alat',

    // Home hero
    'home.hero.title': 'Otkrijte sva državna prava koja vam pripadaju',
    'home.hero.subtitle':
      'Besplatno, anonimno, bez čuvanja podataka. Odgovorite na nekoliko pitanja — pokazaćemo vam sve subvencije, naknade i pomoći koje verovatno propuštate.',
    'home.cta.primary': 'Saznaj šta mi pripada (~2 min)',
    'home.cta.secondary': 'Pretraži prava',
    'home.helper':
      'Ne znate šta da tražite? Krenite sa vodičem — postavićemo nekoliko pitanja i pokazaćemo sva prava koja vam mogu pripadati, čak i ona o kojima niste razmišljali.',

    // Wizard
    'wizard.page_title': 'Vodič za prava',
    'wizard.resume.title': 'Nastavite gde ste stali?',
    'wizard.resume.body':
      'Imali smo započet vodič sačuvan u ovom pretraživaču. Možete da nastavite tamo gde ste stali ili krenete ispočetka.',
    'wizard.resume.continue': 'Nastavi',
    'wizard.resume.restart': 'Kreni ispočetka',
    'wizard.nav.back': 'Nazad',
    'wizard.nav.next': 'Sledeće',
    'wizard.nav.finish': 'Pokaži šta mi pripada',
    'wizard.progress': 'Korak',

    // Results
    'results.page_title': 'Moji rezultati',
    'results.subtitle': 'Pretraga je obavljena lokalno u vašem pretraživaču.',
    'results.summary.found': 'Pronađeno prava',
    'results.summary.surprise': 'Verovatno niste znali',
    'results.summary.categories': 'Kategorija',
    'results.filter.all': 'Sve',
    'results.filter.surprise': 'Verovatno niste znali',
    'results.filter.high': 'Visok prioritet',
    'results.view.grouped': 'Pokaži po kategorijama',
    'results.empty.no_match':
      'Na osnovu vaših odgovora nismo pronašli prava u trenutnom katalogu. Katalog se redovno proširuje — vratite se kasnije ili kontaktirajte nas sa predlogom prava koje treba dodati.',
    'results.empty.filtered': 'Nijedno pravo ne odgovara izabranom filteru.',
    'results.pdf': 'Sačuvaj kao PDF',
    'results.pdf.busy': 'Generisanje…',

    // Pravo detail — tab labels (UI), values stay Serbian (catalog data)
    'detail.field.kategorija': 'Kategorija',
    'detail.field.iznos': 'Iznos',
    'detail.field.ko_ima_pravo': 'Ko ima pravo',
    'detail.field.prioritet': 'Prioritet propusta',
    'detail.field.gde_se_obratiti': 'Gde se obratiti',
    'detail.field.rok': 'Rok za podnošenje',
    'detail.field.trajanje': 'Prosečno trajanje postupka',
    'detail.field.last_verified': 'Poslednja provera',
    'detail.field.zasto_se_propusta': 'Zašto se propušta',
    'detail.field.pravni_osnov': 'Pravni osnov',
    'detail.filijala.prema_prebivalistu': 'Prema mestu prebivališta',
    'detail.filijala.jedinstvena': 'Jedinstvena institucija',
    'detail.filijala.po_izboru': 'Po izboru korisnika',
    'detail.filijala.pratilac_pravnog_lica': 'Preko poslodavca / pravnog lica',
    'detail.koraci.empty': 'Nema definisanih koraka.',
    'detail.koraci.napomena': 'Napomena',
    'detail.koraci.upozorenje': 'Pažnja',
    'detail.dokumenti.empty': 'Nema definisanih dokumenata.',
    'detail.dokumenti.obavezno': 'Obavezno',
    'detail.dokumenti.opcionalno': 'Opcionalno',
    'detail.dokumenti.gde': 'Gde',
    'detail.dokumenti.besplatno': 'Besplatno',
    'detail.dokumenti.vazi_mesec': 'mesec',
    'detail.dokumenti.vazi_meseci': 'meseci',
    'detail.dokumenti.vazi': 'Važi',
    'detail.institucije.empty': 'Nema definisanih institucija.',
    'detail.institucije.adresa': 'Adresa',
    'detail.institucije.telefon': 'Telefon',
    'detail.institucije.email': 'Email',
    'detail.institucije.web': 'Web',
    'detail.institucije.radno_vreme': 'Radno vreme',
    'detail.uputstvo.empty': 'Uputstvo za ovo pravo još nije pripremljeno.',
    'detail.uputstvo.gde_obrazac': 'Gde dobiti obrazac',
    'detail.uputstvo.pogledaj_obrazac': 'Pogledaj službeni obrazac ↗',
    'detail.uputstvo.section.pre': 'Pre nego što odete',
    'detail.uputstvo.section.salter': 'Šta tačno reći na šalteru',
    'detail.uputstvo.section.potpis': 'Šta proveriti pre potpisa',
    'detail.uputstvo.section.posle': 'Posle predaje zahteva',
    'detail.uputstvo.note':
      'Moja Pomoć ne popunjava obrasce za vas. Dajemo uputstvo — vi predajete zahtev. Pre potpisa, proverite sve podatke sami.',
    'detail.greske.empty': 'Nema dokumentovanih čestih grešaka za ovo pravo.',
    'detail.greske.posledica': 'Posledica',
    'detail.greske.resenje': 'Rešenje',

    // Pravo detail
    'detail.back_to_search': '← Nazad na pretragu',
    'detail.not_found.title': 'Pravo nije pronađeno',
    'detail.not_found.body': 'Pravo sa identifikatorom {id} ne postoji u katalogu.',
    'detail.back_link': '← Vrati se na pretragu',
    'detail.tab.osnovno': 'Osnovno',
    'detail.tab.koraci': 'Koraci',
    'detail.tab.dokumenti': 'Dokumenti',
    'detail.tab.institucije': 'Gde se obratiti',
    'detail.tab.uputstvo': 'Uputstvo zahteva',
    'detail.tab.greske': 'Česte greške',
    'detail.badge.surprise': 'Verovatno niste znali',
    'detail.badge.high': 'Visok prioritet',

    // Search
    'search.page_title': 'Sve pomoći i naknade',
    'search.intro':
      'Pretraga radi za oba pisma — kucate "decji", pronaći ćete i "Дечји додатак".',
    'search.placeholder': 'Pretražite po nazivu prava…',
    'search.aria_label': 'Pretraga prava',
    'search.empty.with_query': 'Nismo pronašli pravo koje odgovara pretrazi.',
    'search.empty.no_query': 'Nema prava u izabranoj kategoriji.',
    'search.empty.cta':
      'Probajte vodič — postavićemo nekoliko pitanja i pokazaćemo prava o kojima niste razmišljali.',
    'search.filter.all': 'Sve',
    'search.category_filter.label': 'Filter po kategoriji',

    // Common
    'common.loading': 'Učitavanje…',
    'common.error_prefix': 'Greška',
    'common.error.catalog': 'Greška pri učitavanju kataloga',
    'common.view_details': 'Pogledaj detalje',

    // Disclaimer
    'disclaimer.text':
      'Moja Pomoć je informativni alat. Konačnu odluku donose nadležne institucije. Pre podnošenja zahteva, proverite uslove sa nadležnom institucijom. Aplikacija ne čuva vaše lične podatke van vašeg pretraživača.',
    'data_freshness.inline': 'Ažurirano {when} · verifikujte na zvaničnom sajtu pre podnošenja',
    'data_freshness.banner_prefix': 'Informacije ažurirane:',
    'data_freshness.banner_suffix':
      'Pre podnošenja zahteva, proverite uslove i iznose na zvaničnom sajtu institucije.',

    // Anketa
    'anketa.question': 'Da li ste znali za većinu ovih prava?',
    'anketa.subtitle':
      'Bez prikupljanja podataka — samo broj klikova nam pomaže da merimo impact.',
    'anketa.answer.znao': 'Znao/la sam za većinu',
    'anketa.answer.znao_ne_koristim': 'Znao/la sam, ali ne koristim',
    'anketa.answer.prvi_put': 'Prvi put čujem',
    'anketa.answer.mesovito': 'Mešovito',
    'anketa.thanks.title': 'Hvala vam!',
    'anketa.thanks.body':
      'Vaš odgovor nam pomaže da pratimo koliko građana propušta prava — to je podatak koji pokušavamo da približimo donatorima i ustanovama.',
    'anketa.thanks.share': 'Podeli sa drugima',
    'anketa.thanks.support': 'Podrška projektu',

    // About page
    'about.page_title': 'O projektu',
    'about.lead_p1':
      '<strong>Moja Pomoć</strong> je besplatna, nezavisna i otvorena platforma koja građanima Srbije pomaže da otkriju prava, subvencije i pomoći koje im pripadaju — a koje često propuste jer ne znaju da postoje.',
    'about.lead_p2':
      'Prosečno srpsko domaćinstvo propušta tri do pet državnih pomoći. Informacije su rasute po više institucija. Najugroženiji građani — stariji, hronični bolesnici, osobe sa invaliditetom, samohrani roditelji — su istovremeno i najlošije informisani. Cilj projekta je da ovu jaz smanjimo.',
    'about.howitworks': 'Kako radi',
    'about.step1.title': 'Opišete situaciju',
    'about.step1.body':
      'Devet kratkih pitanja o starosti, porodici, zdravlju, primanjima i posebnim okolnostima. Bez ličnih podataka.',
    'about.step2.title': 'Lokalni rule engine matchuje katalog',
    'about.step2.body':
      'Vaš profil se upoređuje sa katalogom prava. Sve se dešava u pretraživaču — bez slanja podataka.',
    'about.step3.title': 'Dobijete listu prava sa uputstvima',
    'about.step3.body':
      'Za svako pravo: ko ima pravo, koraci postupka, dokumenti, gde se obratiti, česte greške.',
    'about.step4.title': 'Vi predajete zahtev',
    'about.step4.body':
      'Ne popunjavamo zahteve umesto vas — to ostaje vaš čin. Mi vam dajemo uputstvo i checklistu.',
    'about.privacy': 'Privatnost',
    'about.opensource': 'Otvoreni kod',
    'about.opensource.body':
      'Kod je javan pod MIT licencom. Katalog prava je javan pod CC-BY-SA 4.0. Svako može da pregleda, prijavi grešku, predloži dodavanje prava ili dopune.',
    'about.cta.support': 'Podrška projektu',
    'about.cta.wizard': 'Pokrenite vodič',
    'about.plan.title': 'Plan razvoja',
    'about.plan.intro':
      'Projekat se gradi u fazama. Trenutno smo u V1. Naredni koraci zavise i od podrške sponzora i NGO partnera.',
    'about.plan.v1.title': 'V1 — sada (maj 2026)',
    'about.plan.v1.1': '16 prava u katalogu (porodica, penzioneri, hronični bolesnici, OSI, nezaposleni, dijaspora)',
    'about.plan.v1.2': '9-koračni vodič + cross-script pretraga (latinica/ćirilica)',
    'about.plan.v1.3': 'PDF export, PWA (instalabilan), bez kolačića',
    'about.plan.v1.4': 'PostHog analitika za pain-point analizu',
    'about.plan.v15.title': 'V1.5 — sledeća 3 meseca',
    'about.plan.v15.1': 'Proširenje kataloga na 80+ prava (sledeći prioriteti: zdravlje žena, mentalno zdravlje, smrt u porodici, razvod, mladi)',
    'about.plan.v15.2': 'Pravna validacija svih prava (NGO partneri i/ili plaćeni pravnici)',
    'about.plan.v15.3': 'Lokalne opštinske varijante (Beograd, Novi Sad, Niš — različiti iznosi i procedure)',
    'about.plan.v15.4': 'Šabloni za žalbe i prigovore (PIO, RFZO, CSR)',
    'about.plan.v15.5': 'AI sloj za personalizovana objašnjenja (samo ako budu sponzori)',
    'about.plan.v2.title': 'V2 — kad budu sponzori',
    'about.plan.v2.1': 'Konkursni feed (automatsko crawlanje javnih poziva sa privreda.gov.rs, NSZ, RAS)',
    'about.plan.v2.2': 'Privatne pogodnosti (Telekom popusti, bankarski paketi, popusti za penzionere)',
    'about.plan.v2.3': 'Prevodi na romski, mađarski, albanski (manjinske zajednice)',
    'about.plan.v2.4': 'Native mobile app (Android prvi, iOS posle)',
    'about.plan.cont.title': 'Stalno (paralelno)',
    'about.plan.cont.1': 'Detaljnija analitika ponašanja (heatmap, dwell, drop-off po koraku)',
    'about.plan.cont.2': 'Iscrpno mapiranje svih državnih prava (cilj: 200+ u V2)',
    'about.plan.cont.3': 'Design polish, mobilna optimizacija, lighthouse 90+',
    'about.plan.cont.4': 'NGO partnerstva (Praxis, YUCOM, A11, CILS) za content i distribuciju',
    'about.plan.never.title': 'Šta NIKAD nećemo raditi',
    'about.plan.never.1': 'Reklame, affiliate linkovi, pay-to-promote',
    'about.plan.never.2': 'Prikupljanje ličnih podataka (JMBG, adresa, IBAN)',
    'about.plan.never.3': 'B2B preprodaja podataka',
    'about.plan.never.4': 'Popunjavanje zahteva umesto korisnika (pravna odgovornost)',

    // Support / Podrška page
    'support.page_title': 'Podrška',
    'support.intro':
      'Moja Pomoć je nezavisan civic-tech projekat. Kvalitet kataloga, pravnu validaciju i kontinuirani rad omogućavaju organizacije i pojedinci koji veruju u misiju.',
    'support.partners.title': 'Sajt podržali',
    'support.partners.empty':
      'Trenutno tražimo prve partnere. Lista organizacija će biti objavljena ovde.',
    'support.partners.placeholder.role.legal': 'Pravni partner',
    'support.partners.placeholder.role.content': 'Sadržajni partner',
    'support.partners.placeholder.role.sponsor': 'Sponzor',
    'support.partners.placeholder.role.distribution': 'Distribucija',
    'support.help.title': 'Drugi načini da pomognete',
    'support.help.propose': 'Predložite pravo — javite nam koje pravo treba dodati ili izmeniti.',
    'support.help.code': 'Doprinos kodu — pull requestovi i issue prijave na GitHub-u.',
    'support.help.share': 'Podelite — pošaljite alat onima kojima može da pomogne.',
    'support.help.ngo':
      'NGO partnerstva — ako vaša organizacija radi sa građanima koji propušta prava, kontaktirajte nas.',
    'support.contact.title': 'Postanite partner',
    'support.contact.body':
      'Vaša organizacija aktivna u pravnoj pomoći, socijalnoj zaštiti, ili civic-tech-u? Kontaktirajte nas i razgovaramo o partnerstvu.',
    'support.share': 'Podeli sa drugima',

    // Footer
    'footer.quick_links': 'Brzi linkovi',
    'footer.institutions': 'Zvanične institucije',
    'footer.institutions.sr': 'Institucije',
    'footer.contact': 'Kontakt',
    'footer.contact.body': 'Pitanja, predlozi i ispravke su dobrodošli.',
    'footer.tagline.usa':
      'Besplatan alat koji pomaže da otkrijete prava, subvencije i pomoći koje vam pripadaju u Srbiji.',
    'footer.tagline.sr':
      'Republika Srbija · besplatan informativni vodič kroz prava i naknade.',
    'footer.copyright': '© 2026 Moja Pomoć',
    'footer.copyright.sr': '© 2026 Moja Pomoć · Republika Srbija',
    'footer.privacy': 'Bez kolačića · bez naloga · bez prikupljanja ličnih podataka',
    'footer.link.wizard': 'Pokrenite vodič',
    'footer.link.search': 'Sve pomoći i naknade',
    'footer.link.results': 'Moji rezultati',
    'footer.link.about': 'O projektu',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.wizard': 'Rights guide',
    'nav.search': 'All benefits',
    'nav.results': 'My results',
    'nav.about': 'About',
    'nav.support': 'Supporters',

    'skip.main': 'Skip to main content',

    'brand.tagline': 'Guide to rights and benefits in Serbia',
    'brand.tagline.short': 'Republic of Serbia · guide to rights and benefits',
    'brand.country': 'Republic of Serbia',

    'header.usa.country_label': 'Moja Pomoć · Republic of Serbia',
    'header.sr.tool_label': 'Moja Pomoć — information tool',

    // Home
    'home.hero.title': 'Discover all state benefits you are entitled to',
    'home.hero.subtitle':
      'Free, anonymous, no data stored. Answer a few questions — we will show you all subsidies, benefits, and aids you likely miss.',
    'home.cta.primary': 'Find out what I qualify for (~2 min)',
    'home.cta.secondary': 'Browse benefits',
    'home.helper':
      "Don't know what to look for? Start with the guide — we will ask a few questions and show you all the rights that may apply to you, even those you have not thought about.",

    // Wizard
    'wizard.page_title': 'Rights guide',
    'wizard.resume.title': 'Resume where you left off?',
    'wizard.resume.body':
      'We found a guide in progress saved in this browser. You can resume where you stopped or start over.',
    'wizard.resume.continue': 'Resume',
    'wizard.resume.restart': 'Start over',
    'wizard.nav.back': 'Back',
    'wizard.nav.next': 'Next',
    'wizard.nav.finish': 'Show what I qualify for',
    'wizard.progress': 'Step',

    // Results
    'results.page_title': 'My results',
    'results.subtitle': 'Search ran locally in your browser.',
    'results.summary.found': 'Rights found',
    'results.summary.surprise': 'You probably did not know',
    'results.summary.categories': 'Categories',
    'results.filter.all': 'All',
    'results.filter.surprise': 'You probably did not know',
    'results.filter.high': 'High priority',
    'results.view.grouped': 'Group by category',
    'results.empty.no_match':
      'Based on your answers we did not find any rights in the current catalog. The catalog grows continuously — come back later or contact us to suggest a right to add.',
    'results.empty.filtered': 'No right matches the selected filter.',
    'results.pdf': 'Save as PDF',
    'results.pdf.busy': 'Generating…',

    // Pravo detail — tab labels
    'detail.field.kategorija': 'Category',
    'detail.field.iznos': 'Amount',
    'detail.field.ko_ima_pravo': 'Who qualifies',
    'detail.field.prioritet': 'Awareness gap',
    'detail.field.gde_se_obratiti': 'Where to apply',
    'detail.field.rok': 'Deadline',
    'detail.field.trajanje': 'Average processing time',
    'detail.field.last_verified': 'Last verified',
    'detail.field.zasto_se_propusta': 'Why people miss it',
    'detail.field.pravni_osnov': 'Legal basis',
    'detail.filijala.prema_prebivalistu': 'By place of residence',
    'detail.filijala.jedinstvena': 'Single central institution',
    'detail.filijala.po_izboru': "User's choice",
    'detail.filijala.pratilac_pravnog_lica': 'Through employer / legal entity',
    'detail.koraci.empty': 'No steps defined.',
    'detail.koraci.napomena': 'Note',
    'detail.koraci.upozorenje': 'Attention',
    'detail.dokumenti.empty': 'No documents defined.',
    'detail.dokumenti.obavezno': 'Required',
    'detail.dokumenti.opcionalno': 'Optional',
    'detail.dokumenti.gde': 'Where',
    'detail.dokumenti.besplatno': 'Free',
    'detail.dokumenti.vazi_mesec': 'month',
    'detail.dokumenti.vazi_meseci': 'months',
    'detail.dokumenti.vazi': 'Valid',
    'detail.institucije.empty': 'No institutions defined.',
    'detail.institucije.adresa': 'Address',
    'detail.institucije.telefon': 'Phone',
    'detail.institucije.email': 'Email',
    'detail.institucije.web': 'Web',
    'detail.institucije.radno_vreme': 'Working hours',
    'detail.uputstvo.empty': 'Request guide is not yet prepared for this right.',
    'detail.uputstvo.gde_obrazac': 'Where to get the form',
    'detail.uputstvo.pogledaj_obrazac': 'View official form ↗',
    'detail.uputstvo.section.pre': 'Before you go',
    'detail.uputstvo.section.salter': 'What to say at the counter',
    'detail.uputstvo.section.potpis': 'What to check before signing',
    'detail.uputstvo.section.posle': 'After submitting',
    'detail.uputstvo.note':
      'Moja Pomoć does not fill out forms for you. We give you the guide — you submit the request. Verify all data before signing.',
    'detail.greske.empty': 'No documented common mistakes for this right yet.',
    'detail.greske.posledica': 'Consequence',
    'detail.greske.resenje': 'Solution',

    // Pravo detail
    'detail.back_to_search': '← Back to search',
    'detail.not_found.title': 'Right not found',
    'detail.not_found.body': 'Right with id {id} does not exist in the catalog.',
    'detail.back_link': '← Back to search',
    'detail.tab.osnovno': 'Overview',
    'detail.tab.koraci': 'Steps',
    'detail.tab.dokumenti': 'Documents',
    'detail.tab.institucije': 'Where to apply',
    'detail.tab.uputstvo': 'Request guide',
    'detail.tab.greske': 'Common mistakes',
    'detail.badge.surprise': 'You probably did not know',
    'detail.badge.high': 'High priority',

    // Search
    'search.page_title': 'All benefits and allowances',
    'search.intro':
      'Search works in both scripts — type "decji" and you will also find "Дечји додатак".',
    'search.placeholder': 'Search by right name…',
    'search.aria_label': 'Search rights',
    'search.empty.with_query': 'No right matches your search.',
    'search.empty.no_query': 'No rights in the selected category.',
    'search.empty.cta':
      'Try the guide — we will ask a few questions and show rights you have not thought about.',
    'search.filter.all': 'All',
    'search.category_filter.label': 'Filter by category',

    'common.loading': 'Loading…',
    'common.error_prefix': 'Error',
    'common.error.catalog': 'Catalog load error',
    'common.view_details': 'View details',

    // Disclaimer
    'disclaimer.text':
      'Moja Pomoć is an informational tool. Final decisions are made by the relevant institutions. Before submitting any request, verify conditions with the relevant institution. The app does not store your personal data outside your browser.',
    'data_freshness.inline': 'Updated {when} · verify on the official site before submitting',
    'data_freshness.banner_prefix': 'Information updated:',
    'data_freshness.banner_suffix':
      'Before submitting any request, verify conditions and amounts on the official institution website.',

    // Anketa
    'anketa.question': 'Did you know about most of these rights?',
    'anketa.subtitle':
      'No data collection — just click counts help us measure impact.',
    'anketa.answer.znao': 'I knew about most',
    'anketa.answer.znao_ne_koristim': 'I knew but did not apply',
    'anketa.answer.prvi_put': 'First time hearing',
    'anketa.answer.mesovito': 'Mixed',
    'anketa.thanks.title': 'Thank you!',
    'anketa.thanks.body':
      'Your answer helps us track how many citizens miss benefits — a data point we are trying to bring to donors and institutions.',
    'anketa.thanks.share': 'Share with others',
    'anketa.thanks.support': 'Supporters',

    // About
    'about.page_title': 'About',
    'about.lead_p1':
      '<strong>Moja Pomoć</strong> is a free, independent, open platform that helps citizens of Serbia discover rights, subsidies, and benefits they are entitled to — but often miss because they do not know they exist.',
    'about.lead_p2':
      'On average a Serbian household misses three to five state benefits. The information is scattered across multiple institutions. The most vulnerable citizens — the elderly, chronic patients, people with disabilities, single parents — are also the least informed. The project aims to close that gap.',
    'about.howitworks': 'How it works',
    'about.step1.title': 'Describe your situation',
    'about.step1.body':
      'Nine short questions about age, family, health, income, and special circumstances. No personal data.',
    'about.step2.title': 'Local rule engine matches the catalog',
    'about.step2.body':
      'Your profile is compared with the rights catalog. Everything happens in your browser — no data is sent anywhere.',
    'about.step3.title': 'You get a list of rights with instructions',
    'about.step3.body':
      'For each right: who qualifies, procedure steps, documents, where to apply, common mistakes.',
    'about.step4.title': 'You submit the request',
    'about.step4.body':
      'We do not fill in forms for you — that remains your action. We give you the guide and the checklist.',
    'about.privacy': 'Privacy',
    'about.opensource': 'Open source',
    'about.opensource.body':
      'Code is public under MIT license. Rights catalog is public under CC-BY-SA 4.0. Anyone can review, report errors, propose new rights or improvements.',
    'about.cta.support': 'Supporters',
    'about.cta.wizard': 'Start the guide',
    'about.plan.title': 'Development roadmap',
    'about.plan.intro':
      'The project is built in phases. We are currently in V1. Next steps depend on sponsor and NGO partner support.',
    'about.plan.v1.title': 'V1 — now (May 2026)',
    'about.plan.v1.1': '16 rights in the catalog (family, retirees, chronic patients, disability, unemployed, diaspora)',
    'about.plan.v1.2': '9-step guide + cross-script search (Latin/Cyrillic)',
    'about.plan.v1.3': 'PDF export, PWA (installable), no cookies',
    'about.plan.v1.4': 'PostHog analytics for pain-point analysis',
    'about.plan.v15.title': 'V1.5 — next 3 months',
    'about.plan.v15.1': 'Catalog expansion to 80+ rights (next priorities: women health, mental health, family bereavement, divorce, youth)',
    'about.plan.v15.2': 'Legal validation of all rights (NGO partners and/or paid lawyers)',
    'about.plan.v15.3': 'Local municipality variants (Belgrade, Novi Sad, Niš — different amounts and procedures)',
    'about.plan.v15.4': 'Templates for appeals and objections (PIO, RFZO, CSR)',
    'about.plan.v15.5': 'AI layer for personalized explanations (only if sponsors arrive)',
    'about.plan.v2.title': 'V2 — when sponsors arrive',
    'about.plan.v2.1': 'Public calls feed (auto-crawl from privreda.gov.rs, NSZ, RAS)',
    'about.plan.v2.2': 'Private benefits (Telekom discounts, bank packages, retiree discounts)',
    'about.plan.v2.3': 'Translations to Romani, Hungarian, Albanian (minority communities)',
    'about.plan.v2.4': 'Native mobile app (Android first, iOS later)',
    'about.plan.cont.title': 'Continuous (in parallel)',
    'about.plan.cont.1': 'Deeper behavior analytics (heatmap, dwell, drop-off per step)',
    'about.plan.cont.2': 'Exhaustive mapping of all state benefits (target: 200+ in V2)',
    'about.plan.cont.3': 'Design polish, mobile optimization, Lighthouse 90+',
    'about.plan.cont.4': 'NGO partnerships (Praxis, YUCOM, A11, CILS) for content and distribution',
    'about.plan.never.title': 'What we will NEVER do',
    'about.plan.never.1': 'Ads, affiliate links, pay-to-promote',
    'about.plan.never.2': 'Collecting personal data (national ID, address, IBAN)',
    'about.plan.never.3': 'B2B data resale',
    'about.plan.never.4': 'Filling out requests on behalf of users (legal liability)',

    // Support
    'support.page_title': 'Supporters',
    'support.intro':
      'Moja Pomoć is an independent civic-tech project. Catalog quality, legal validation, and continuous work are made possible by organizations and individuals who believe in the mission.',
    'support.partners.title': 'Site supporters',
    'support.partners.empty':
      'We are currently looking for first partners. The list of organizations will be published here.',
    'support.partners.placeholder.role.legal': 'Legal partner',
    'support.partners.placeholder.role.content': 'Content partner',
    'support.partners.placeholder.role.sponsor': 'Sponsor',
    'support.partners.placeholder.role.distribution': 'Distribution',
    'support.help.title': 'Other ways to help',
    'support.help.propose': 'Propose a right — tell us which right to add or correct.',
    'support.help.code': 'Code contribution — pull requests and issues on GitHub.',
    'support.help.share': 'Share — send the tool to those who could benefit.',
    'support.help.ngo':
      'NGO partnerships — if your organization works with citizens who miss benefits, contact us.',
    'support.contact.title': 'Become a partner',
    'support.contact.body':
      'Is your organization active in legal aid, social protection, or civic-tech? Contact us and let’s talk partnership.',
    'support.share': 'Share with others',

    // Footer
    'footer.quick_links': 'Quick links',
    'footer.institutions': 'Official institutions',
    'footer.institutions.sr': 'Institutions',
    'footer.contact': 'Contact',
    'footer.contact.body': 'Questions, suggestions, and corrections are welcome.',
    'footer.tagline.usa':
      'A free tool that helps you discover rights, subsidies, and benefits you are entitled to in Serbia.',
    'footer.tagline.sr':
      'Republic of Serbia · free information guide to rights and benefits.',
    'footer.copyright': '© 2026 Moja Pomoć',
    'footer.copyright.sr': '© 2026 Moja Pomoć · Republic of Serbia',
    'footer.privacy': 'No cookies · no accounts · no personal data collection',
    'footer.link.wizard': 'Start the guide',
    'footer.link.search': 'All benefits',
    'footer.link.results': 'My results',
    'footer.link.about': 'About',
  },
} as const;

export type TKey = keyof (typeof TRANSLATIONS)['sr'];

export function getLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  try {
    const v = window.localStorage.getItem(LANG_KEY);
    if (v === 'sr' || v === 'en') return v;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

export function setLang(lang: Lang): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* ignore */
  }
}

export function translate(key: TKey, lang: Lang, params?: Record<string, string>): string {
  const dict = TRANSLATIONS[lang] ?? TRANSLATIONS[DEFAULT_LANG];
  let str: string = (dict as Record<string, string>)[key] ?? TRANSLATIONS[DEFAULT_LANG][key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replaceAll(`{${k}}`, v);
    }
  }
  return str;
}
