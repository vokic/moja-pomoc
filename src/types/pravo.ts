import type { Uslov } from './uslov';
import type {
  CestaGreska,
  Dokument,
  FilijalaPravilo,
  Institucija,
  Korak,
  SpoljniResurs,
  UputstvoZahteva,
} from './katalog';

/** Lokalizovan tekst — na latinici i ćirilici */
export type LocalizedText = {
  sr_cyr: string;
  sr_lat: string;
};

/** Pravni izvor */
export type LegalSource = {
  zakon: string;
  clanovi?: string;
  sluzbeni_glasnik?: string;
  url?: string;
};

/** Tagovi za sortiranje rezultata */
export type Tag =
  | 'surprise'
  | 'high_priority'
  | 'time_sensitive'
  | 'gateway'
  | 'big_money';

export type Kategorija =
  | 'hronicni_bolesnici'
  | 'porodica_deca'
  | 'penzioneri'
  | 'osi'
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

export type Iznos =
  | { tip: 'mesecno'; vrednost_rsd: number; napomena?: string }
  | { tip: 'mesecno_raspon'; min_rsd: number; max_rsd: number; napomena?: string }
  | { tip: 'jednokratno'; vrednost_rsd: number; napomena?: string }
  | { tip: 'jednokratno_raspon'; min_rsd: number; max_rsd: number; napomena?: string }
  | { tip: 'popust_procenat'; procenat: number; na_sta: string; napomena?: string }
  | { tip: 'usluga_besplatna'; opis: string }
  | { tip: 'refundacija'; opis: string; max_rsd?: number }
  | { tip: 'opisno'; vrednost_opis: string };

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
