import type { Pravo } from './pravo';

export type Korak = {
  redni_broj: number;
  naslov: string;
  opis: string;
  napomena?: string;
  upozorenje?: string;
};

export type Dokument = {
  id: string;
  naziv: string;
  obavezno: boolean;
  gde_se_nabavlja: string;
  trosak_rsd: number;
  vazi_meseci?: number;
  napomena?: string;
};

export type Institucija = {
  naziv: string;
  tip: 'centralna' | 'filijala' | 'opstinska' | 'externa';
  adresa?: string;
  telefon?: string;
  email?: string;
  url?: string;
  radno_vreme?: string;
  napomena?: string;
};

/** Pravilo za određivanje koje filijale treba prikazati */
export type FilijalaPravilo =
  | 'prema_prebivalistu'
  | 'jedinstvena'
  | 'po_izboru'
  | 'pratilac_pravnog_lica';

/**
 * Uputstvo za zahtev - MVP odluka: NE popunjavamo zahtev. Dajemo uputstvo + checklist.
 */
export type UputstvoZahteva = {
  naziv_zahteva: string;
  gde_dobiti_obrazac: string;
  obrazac_url?: string;

  pre_popunjavanja: string[];

  sta_reci_na_salteru: string[];

  sta_proveriti_pre_potpisa: string[];

  posle_predaje: string[];
};

export type CestaGreska = {
  greska: string;
  posledica?: string;
  resenje: string;
};

export type SpoljniResurs = {
  naziv: string;
  url: string;
  opis?: string;
  drzava?: string;
};

export type Katalog = {
  version: string;
  last_update: string;
  total_prava: number;
  prava: Pravo[];
};
