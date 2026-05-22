export type Uslov =
  | { tip: 'starost_min'; vrednost: number }
  | { tip: 'starost_max'; vrednost: number }
  | { tip: 'pol'; vrednost: 'z' | 'm' }
  | {
      tip: 'ima_decu';
      uzrast?: ('beba' | 'predskolsko' | 'osnovac' | 'srednjoskolac' | 'student')[];
    }
  | { tip: 'ima_decu_smetnje'; vrednost: boolean }
  | { tip: 'samohrani_roditelj'; vrednost: boolean }
  | { tip: 'primanja_max_rsd'; vrednost: number; po_clanu: boolean }
  | {
      tip: 'zaposlenje';
      vrednost: (
        | 'zaposlen'
        | 'preduzetnik'
        | 'poljoprivrednik'
        | 'nezaposlen'
        | 'nezaposlen_neprijavljen'
        | 'student'
        | 'penzioner'
        | 'na_bolovanju'
      )[];
    }
  | {
      tip: 'zdravlje';
      vrednost: (
        | 'hronicno'
        | 'onkologija'
        | 'dijaliza'
        | 'mentalno'
        | 'invaliditet'
        | 'cula'
        | 'tudja_nega'
        | 'autoimuna'
      )[];
    }
  | {
      tip: 'situacija';
      vrednost: (
        | 'rodjeno_dete'
        | 'smrt_porodice'
        | 'razvod'
        | 'izgubio_posao'
        | 'nasilje'
        | 'pozar_poplava'
        | 'preselio'
      )[];
    }
  | {
      tip: 'posebna_kategorija';
      vrednost: (
        | 'borac'
        | 'porodica_palog_borca'
        | 'izbeglica'
        | 'hraniteljska_porodica'
        | 'parcela'
        | 'pcele'
        | 'dijaspora'
      )[];
    }
  | { tip: 'prebivaliste_srbija'; vrednost: boolean }
  | { tip: 'staz_u_inostranstvu'; min_meseci?: number }
  | { tip: 'i'; uslovi: Uslov[] }
  | { tip: 'ili'; uslovi: Uslov[] }
  | { tip: 'ne'; uslov: Uslov };
