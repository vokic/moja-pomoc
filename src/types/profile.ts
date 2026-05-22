import type { Pravo } from './pravo';
import type { Uslov } from './uslov';

export type Profile = {
  starost?: 'mladi' | 'srednji' | 'stariji' | 'penzioner';
  pol?: 'z' | 'm' | 'preskoci';
  domacinstvo?: 'sam' | 'partner' | 'porodica' | 'samohrani' | 'sa_roditeljima' | 'mesoviti';
  deca?: (
    | 'nema'
    | 'beba'
    | 'predskolsko'
    | 'osnovac'
    | 'srednjoskolac'
    | 'student'
    | 'punoletno_zdravstveno'
    | 'smetnje'
  )[];
  zaposlenje?:
    | 'zaposlen'
    | 'preduzetnik'
    | 'poljoprivrednik'
    | 'nezaposlen'
    | 'nezaposlen_neprijavljen'
    | 'student'
    | 'penzioner'
    | 'na_bolovanju';
  primanja?: 'vrlo_niska' | 'niska' | 'srednja' | 'visa' | 'visoka' | 'preskoci';
  zdravlje?: (
    | 'nista'
    | 'hronicno'
    | 'onkologija'
    | 'dijaliza'
    | 'mentalno'
    | 'invaliditet'
    | 'cula'
    | 'tudja_nega'
    | 'autoimuna'
  )[];
  situacija?: (
    | 'nista'
    | 'rodjeno_dete'
    | 'smrt_porodice'
    | 'razvod'
    | 'izgubio_posao'
    | 'nasilje'
    | 'pozar_poplava'
    | 'preselio'
  )[];
  posebne?: (
    | 'nista'
    | 'borac'
    | 'porodica_palog_borca'
    | 'izbeglica'
    | 'hraniteljska_porodica'
    | 'parcela'
    | 'pcele'
    | 'dijaspora'
  )[];
};

export type MatchResult = {
  pravo: Pravo;
  match_strength: 'siguran' | 'verovatan' | 'mozda';
  matched_conditions: Uslov[];
  missing_data: string[];
};

export type Matches = MatchResult[];
