// ============================================================================
// MOJA POMOĆ - SHEMA KATALOGA PRAVA
// ============================================================================
// Ova datoteka definiše tipove (strukturu) za svako pravo u katalogu.
// Cilj: svaki novi unos prati istu šemu pa je sve auditabilno i renderuje
// se identično bez AI poziva. Rule engine čita Conditions, wizard čita Views.
//
// Verzija: 1.0
// Last update: 2026-05-18
// ============================================================================

// ----------------------------------------------------------------------------
// 1. OSNOVNI TIPOVI
// ----------------------------------------------------------------------------

/** Lokalizovan tekst - na latinici i ćirilici */
export type LocalizedText = {
  sr_cyr: string;  // ćirilica
  sr_lat: string;  // latinica
};

/** Pravni izvor */
export type LegalSource = {
  zakon: string;              // npr. "Zakon o PIO"
  clanovi?: string;           // npr. "208-220"
  sluzbeni_glasnik?: string;  // npr. "Sl. glasnik RS 34/2003"
  url?: string;               // link ka tekstu zakona ako postoji
};

/** Tagovi za sortiranje rezultata */
export type Tag =
  | 'surprise'        // verovatno niste znali
  | 'high_priority'   // visok prioritet propusta (4-5)
  | 'time_sensitive'  // imati rok
  | 'gateway'         // otvara lanac drugih prava
  | 'big_money';      // značajan iznos

// ----------------------------------------------------------------------------
// 2. IZNOS (više varijanti)
// ----------------------------------------------------------------------------

export type Iznos =
  | { tip: 'mesecno'; vrednost_rsd: number; napomena?: string }
  | { tip: 'mesecno_raspon'; min_rsd: number; max_rsd: number; napomena?: string }
  | { tip: 'jednokratno'; vrednost_rsd: number; napomena?: string }
  | { tip: 'jednokratno_raspon'; min_rsd: number; max_rsd: number; napomena?: string }
  | { tip: 'popust_procenat'; procenat: number; na_sta: string; napomena?: string }
  | { tip: 'usluga_besplatna'; opis: string }
  | { tip: 'refundacija'; opis: string; max_rsd?: number }
  | { tip: 'opisno'; vrednost_opis: string };  // za slučajeve gde je iznos složen

// ----------------------------------------------------------------------------
// 3. USLOVI (rule engine ovo evaluira)
// ----------------------------------------------------------------------------

export type Uslov =
  | { tip: 'starost_min'; vrednost: number }
  | { tip: 'starost_max'; vrednost: number }
  | { tip: 'pol'; vrednost: 'z' | 'm' }
  | { tip: 'ima_decu'; uzrast?: ('beba'|'predskolsko'|'osnovac'|'srednjoskolac'|'student')[] }
  | { tip: 'ima_decu_smetnje'; vrednost: boolean }
  | { tip: 'samohrani_roditelj'; vrednost: boolean }
  | { tip: 'primanja_max_rsd'; vrednost: number; po_clanu: boolean }
  | { tip: 'zaposlenje'; vrednost: ('zaposlen'|'preduzetnik'|'poljoprivrednik'|'nezaposlen'|'nezaposlen_neprijavljen'|'student'|'penzioner'|'na_bolovanju')[] }
  | { tip: 'zdravlje'; vrednost: ('hronicno'|'onkologija'|'dijaliza'|'mentalno'|'invaliditet'|'cula'|'tudja_nega'|'autoimuna')[] }
  | { tip: 'situacija'; vrednost: ('rodjeno_dete'|'smrt_porodice'|'razvod'|'izgubio_posao'|'nasilje'|'pozar_poplava'|'preselio')[] }
  | { tip: 'posebna_kategorija'; vrednost: ('borac'|'porodica_palog_borca'|'izbeglica'|'hraniteljska_porodica'|'parcela'|'pcele'|'dijaspora')[] }
  | { tip: 'prebivaliste_srbija'; vrednost: boolean }
  | { tip: 'staz_u_inostranstvu'; min_meseci?: number }
  | { tip: 'i'; uslovi: Uslov[] }    // AND
  | { tip: 'ili'; uslovi: Uslov[] }  // OR
  | { tip: 'ne'; uslov: Uslov };     // NOT

// ----------------------------------------------------------------------------
// 4. KORACI POSTUPKA
// ----------------------------------------------------------------------------

export type Korak = {
  redni_broj: number;
  naslov: string;
  opis: string;
  napomena?: string;       // optional info bubble
  upozorenje?: string;     // optional warning bubble (žuto)
};

// ----------------------------------------------------------------------------
// 5. DOKUMENTI
// ----------------------------------------------------------------------------

export type Dokument = {
  id: string;
  naziv: string;
  obavezno: boolean;
  gde_se_nabavlja: string;
  trosak_rsd: number;          // 0 ako besplatno
  vazi_meseci?: number;         // npr. 6 meseci za uverenje o državljanstvu
  napomena?: string;
};

// ----------------------------------------------------------------------------
// 6. INSTITUCIJE (gde se obratiti)
// ----------------------------------------------------------------------------

export type Institucija = {
  naziv: string;
  tip: 'centralna' | 'filijala' | 'opstinska' | 'externa';
  adresa?: string;            // ako fiksna
  telefon?: string;
  email?: string;
  url?: string;
  radno_vreme?: string;
  napomena?: string;
};

/** Pravilo za određivanje koje filijale treba prikazati */
export type FilijalaPravilo =
  | 'prema_prebivalistu'   // wizard prikaže filijalu u korisnikovom mestu
  | 'jedinstvena'          // jedna centralna institucija
  | 'po_izboru'            // korisnik bira
  | 'pratilac_pravnog_lica'; // npr. preko poslodavca

// ----------------------------------------------------------------------------
// 7. UPUTSTVO ZA ZAHTEV (BEZ POPUNJAVANJA)
// ----------------------------------------------------------------------------
// MVP odluka: NE popunjavamo zahtev. Dajemo uputstvo + checklist.
// Naveden je opciono i "primer obrasca" kao informativni link/slika.

export type UputstvoZahteva = {
  naziv_zahteva: string;     // npr. "ZAHTEV ZA OSTVARIVANJE PRAVA NA PENZIJU PO MEĐUNARODNOM UGOVORU"
  gde_dobiti_obrazac: string; // "Na šalteru filijale PIO" ili "Online na pio.rs/obrasci"
  obrazac_url?: string;       // link ka službenom obrascu ako postoji
  
  // Ono što korisnik treba da zna pre popunjavanja
  pre_popunjavanja: string[]; // npr. ["Pripremite IBAN deviznog računa", "Imajte sve datume staža"]
  
  // Šta tačno reći/tražiti na šalteru
  sta_reci_na_salteru: string[];
  
  // Šta proveriti pre potpisivanja
  sta_proveriti_pre_potpisa: string[];
  
  // Šta uraditi posle predaje
  posle_predaje: string[];
};

// ----------------------------------------------------------------------------
// 8. ČESTE GREŠKE
// ----------------------------------------------------------------------------

export type CestaGreska = {
  greska: string;       // šta korisnik često uradi pogrešno
  posledica?: string;   // šta se desi (opciono)
  resenje: string;      // kako da je izbegne
};

// ----------------------------------------------------------------------------
// 9. SPOLJNI RESURSI (linkovi)
// ----------------------------------------------------------------------------

export type SpoljniResurs = {
  naziv: string;
  url: string;
  opis?: string;
  drzava?: string;  // ISO 2-slovni kod ako se odnosi na specifičnu zemlju
};

// ----------------------------------------------------------------------------
// 10. GLAVNI TIP - PRAVO
// ----------------------------------------------------------------------------

export type Pravo = {
  // META PODACI
  id: string;                          // npr. "DJ01" - unique
  kategorija: Kategorija;
  naziv: LocalizedText;
  kratak_opis: LocalizedText;          // 1-2 rečenice za karticu u rezultatima
  
  // SORTIRANJE I PRIORITET
  prioritet_propusta: 1 | 2 | 3 | 4 | 5;  // 5 = skoro niko ne zna
  tagovi: Tag[];
  
  // PRAVNI OSNOV
  pravni_osnov: LegalSource[];
  
  // IZNOS
  iznos: Iznos;
  
  // KO IMA PRAVO
  ko_ima_pravo_opis: string;           // ljudski opis za karticu
  uslovi: Uslov[];                      // rule engine pravila
  
  // ZAŠTO SE PROPUŠTA
  zasto_se_propusta: string;            // koristi se za "Verovatno niste znali" objašnjenje
  
  // KORACI POSTUPKA
  koraci: Korak[];
  
  // DOKUMENTI
  dokumenti: Dokument[];
  
  // INSTITUCIJE
  institucije: Institucija[];
  filijala_pravilo: FilijalaPravilo;
  
  // UPUTSTVO ZA ZAHTEV (umesto popunjavanja)
  uputstvo_zahteva?: UputstvoZahteva;
  
  // ČESTE GREŠKE
  ceste_greske: CestaGreska[];
  
  // ROKOVI
  rok_za_podnosenje?: string;           // ljudski opis ("15 dana od rešenja")
  prosecno_trajanje_postupka?: string;  // npr. "60 dana" / "6 - 24 meseca"
  
  // SPOLJNI RESURSI
  spoljni_resursi?: SpoljniResurs[];
  
  // METADATA
  last_verified: string;                // ISO datum poslednje verifikacije
  verified_by?: string;                 // ko je verifikovao
  napomena_za_urednika?: string;        // interni komentar za buduće update-e
};

// ----------------------------------------------------------------------------
// 11. KATEGORIJE
// ----------------------------------------------------------------------------

export type Kategorija =
  | 'hronicni_bolesnici'
  | 'porodica_deca'
  | 'penzioneri'
  | 'osi'                  // osobe sa invaliditetom
  | 'nezaposleni'
  | 'borci_invalidi'
  | 'energetska'
  | 'prosveta'
  | 'porezi'
  | 'poljoprivreda'
  | 'zrtve_nasilja'
  | 'hraniteljstvo'
  | 'stanovanje'
  | 'zdravlje_zena'
  | 'mentalno_zdravlje'
  | 'smrt_porodice'
  | 'razvod'
  | 'dijaspora'
  | 'zivotne_situacije'
  | 'mladi';

// ----------------------------------------------------------------------------
// 12. KATALOG (kontejner za sva prava)
// ----------------------------------------------------------------------------

export type Katalog = {
  version: string;             // npr. "1.0.0"
  last_update: string;          // ISO datum
  total_prava: number;          // automatski iz length
  prava: Pravo[];
};

// ----------------------------------------------------------------------------
// 13. PROFILE KORISNIKA (iz wizard intake-a)
// ----------------------------------------------------------------------------

export type Profile = {
  starost?: 'mladi' | 'srednji' | 'stariji' | 'penzioner';
  pol?: 'z' | 'm' | 'preskoci';
  domacinstvo?: 'sam' | 'partner' | 'porodica' | 'samohrani' | 'sa_roditeljima' | 'mesoviti';
  deca?: ('nema'|'beba'|'predskolsko'|'osnovac'|'srednjoskolac'|'student'|'punoletno_zdravstveno'|'smetnje')[];
  zaposlenje?: 'zaposlen' | 'preduzetnik' | 'poljoprivrednik' | 'nezaposlen' | 'nezaposlen_neprijavljen' | 'student' | 'penzioner' | 'na_bolovanju';
  primanja?: 'vrlo_niska' | 'niska' | 'srednja' | 'visa' | 'visoka' | 'preskoci';
  zdravlje?: ('nista'|'hronicno'|'onkologija'|'dijaliza'|'mentalno'|'invaliditet'|'cula'|'tudja_nega'|'autoimuna')[];
  situacija?: ('nista'|'rodjeno_dete'|'smrt_porodice'|'razvod'|'izgubio_posao'|'nasilje'|'pozar_poplava'|'preselio')[];
  posebne?: ('nista'|'borac'|'porodica_palog_borca'|'izbeglica'|'hraniteljska_porodica'|'parcela'|'pcele'|'dijaspora')[];
};

// ----------------------------------------------------------------------------
// 14. REZULTAT MATCHINGA
// ----------------------------------------------------------------------------

export type MatchResult = {
  pravo: Pravo;
  match_strength: 'siguran' | 'verovatan' | 'mozda';
  matched_conditions: Uslov[];   // za "evo zašto vam pripada"
  missing_data: string[];        // ako fali neki podatak iz profila
};

export type Matches = MatchResult[];
