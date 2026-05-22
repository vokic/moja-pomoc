import { describe, expect, it } from 'vitest';
import { evalUslov, mapToAge, matchAll, matchPravo } from './matcher';
import type { Pravo, Profile, Uslov } from '@/types';

// -----------------------------------------------------------------------------
// Fixtures
// -----------------------------------------------------------------------------

function makePravo(overrides: Partial<Pravo> & { id: string; uslovi: Uslov[] }): Pravo {
  return {
    kategorija: 'porodica_deca',
    naziv: { sr_lat: 'Test pravo', sr_cyr: 'Тест право' },
    kratak_opis: { sr_lat: 'opis', sr_cyr: 'опис' },
    prioritet_propusta: 3,
    tagovi: [],
    pravni_osnov: [{ zakon: 'Test' }],
    iznos: { tip: 'opisno', vrednost_opis: '—' },
    ko_ima_pravo_opis: '—',
    zasto_se_propusta: '—',
    koraci: [],
    dokumenti: [],
    institucije: [],
    filijala_pravilo: 'jedinstvena',
    ceste_greske: [],
    last_verified: '2026-01-01',
    ...overrides,
  };
}

// -----------------------------------------------------------------------------
// mapToAge
// -----------------------------------------------------------------------------

describe('mapToAge', () => {
  it('vraća očekivane reprezentativne godine', () => {
    expect(mapToAge('mladi')).toBe(18);
    expect(mapToAge('srednji')).toBe(30);
    expect(mapToAge('stariji')).toBe(50);
    expect(mapToAge('penzioner')).toBe(65);
  });
});

// -----------------------------------------------------------------------------
// evalUslov — primitive types
// -----------------------------------------------------------------------------

describe('evalUslov: starost', () => {
  it('starost_min 65: penzioner -> true', () => {
    expect(evalUslov({ tip: 'starost_min', vrednost: 65 }, { starost: 'penzioner' })).toBe(true);
  });

  it('starost_min 65: mladi -> false', () => {
    expect(evalUslov({ tip: 'starost_min', vrednost: 65 }, { starost: 'mladi' })).toBe(false);
  });

  it('starost_min 60: stariji (50-64) -> unknown', () => {
    expect(evalUslov({ tip: 'starost_min', vrednost: 60 }, { starost: 'stariji' })).toBe('unknown');
  });

  it('starost_max 30: mladi -> true', () => {
    expect(evalUslov({ tip: 'starost_max', vrednost: 30 }, { starost: 'mladi' })).toBe(true);
  });

  it('starost_min bez profile.starost -> unknown', () => {
    expect(evalUslov({ tip: 'starost_min', vrednost: 50 }, {})).toBe('unknown');
  });
});

describe('evalUslov: pol', () => {
  it('match', () => {
    expect(evalUslov({ tip: 'pol', vrednost: 'z' }, { pol: 'z' })).toBe(true);
  });

  it('mismatch', () => {
    expect(evalUslov({ tip: 'pol', vrednost: 'z' }, { pol: 'm' })).toBe(false);
  });

  it('preskoci -> unknown', () => {
    expect(evalUslov({ tip: 'pol', vrednost: 'z' }, { pol: 'preskoci' })).toBe('unknown');
  });
});

describe('evalUslov: deca', () => {
  it('ima_decu bez filtera, ima decu -> true', () => {
    expect(evalUslov({ tip: 'ima_decu' }, { deca: ['beba'] })).toBe(true);
  });

  it('ima_decu sa uzrast filter, mora se podudariti', () => {
    expect(
      evalUslov({ tip: 'ima_decu', uzrast: ['beba'] }, { deca: ['osnovac'] }),
    ).toBe(false);
    expect(
      evalUslov({ tip: 'ima_decu', uzrast: ['beba'] }, { deca: ['beba', 'osnovac'] }),
    ).toBe(true);
  });

  it('ima_decu sa "nema" -> false', () => {
    expect(evalUslov({ tip: 'ima_decu' }, { deca: ['nema'] })).toBe(false);
  });

  it('ima_decu_smetnje true se podudara', () => {
    expect(
      evalUslov({ tip: 'ima_decu_smetnje', vrednost: true }, { deca: ['smetnje'] }),
    ).toBe(true);
  });
});

describe('evalUslov: samohrani', () => {
  it('domacinstvo samohrani -> true', () => {
    expect(
      evalUslov({ tip: 'samohrani_roditelj', vrednost: true }, { domacinstvo: 'samohrani' }),
    ).toBe(true);
  });

  it('domacinstvo porodica -> false', () => {
    expect(
      evalUslov({ tip: 'samohrani_roditelj', vrednost: true }, { domacinstvo: 'porodica' }),
    ).toBe(false);
  });
});

describe('evalUslov: primanja_max_rsd', () => {
  it('vrlo_niska <= 20000 -> true', () => {
    expect(
      evalUslov(
        { tip: 'primanja_max_rsd', vrednost: 20000, po_clanu: true },
        { primanja: 'vrlo_niska' },
      ),
    ).toBe(true);
  });

  it('visoka <= 20000 -> false', () => {
    expect(
      evalUslov(
        { tip: 'primanja_max_rsd', vrednost: 20000, po_clanu: true },
        { primanja: 'visoka' },
      ),
    ).toBe(false);
  });

  it('niska (15-30k) sa pragom 25000 -> unknown (preklapanje)', () => {
    expect(
      evalUslov(
        { tip: 'primanja_max_rsd', vrednost: 25000, po_clanu: true },
        { primanja: 'niska' },
      ),
    ).toBe('unknown');
  });

  it('preskoci -> unknown', () => {
    expect(
      evalUslov(
        { tip: 'primanja_max_rsd', vrednost: 30000, po_clanu: true },
        { primanja: 'preskoci' },
      ),
    ).toBe('unknown');
  });
});

describe('evalUslov: zaposlenje', () => {
  it('match', () => {
    expect(
      evalUslov(
        { tip: 'zaposlenje', vrednost: ['nezaposlen', 'student'] },
        { zaposlenje: 'nezaposlen' },
      ),
    ).toBe(true);
  });

  it('no match', () => {
    expect(
      evalUslov(
        { tip: 'zaposlenje', vrednost: ['nezaposlen'] },
        { zaposlenje: 'zaposlen' },
      ),
    ).toBe(false);
  });
});

describe('evalUslov: zdravlje', () => {
  it('match na hronicno', () => {
    expect(
      evalUslov(
        { tip: 'zdravlje', vrednost: ['hronicno', 'onkologija'] },
        { zdravlje: ['hronicno'] },
      ),
    ).toBe(true);
  });

  it('"nista" znači da nema -> false', () => {
    expect(
      evalUslov({ tip: 'zdravlje', vrednost: ['hronicno'] }, { zdravlje: ['nista'] }),
    ).toBe(false);
  });

  it('prazno -> unknown', () => {
    expect(evalUslov({ tip: 'zdravlje', vrednost: ['hronicno'] }, {})).toBe('unknown');
  });
});

describe('evalUslov: posebna_kategorija', () => {
  it('match', () => {
    expect(
      evalUslov(
        { tip: 'posebna_kategorija', vrednost: ['dijaspora'] },
        { posebne: ['dijaspora'] },
      ),
    ).toBe(true);
  });
});

// -----------------------------------------------------------------------------
// Combinators — unknown propagation
// -----------------------------------------------------------------------------

describe('evalUslov: i (AND)', () => {
  it('sve true -> true', () => {
    expect(
      evalUslov(
        {
          tip: 'i',
          uslovi: [
            { tip: 'pol', vrednost: 'z' },
            { tip: 'starost_min', vrednost: 18 },
          ],
        },
        { pol: 'z', starost: 'mladi' },
      ),
    ).toBe(true);
  });

  it('jedan false -> false', () => {
    expect(
      evalUslov(
        {
          tip: 'i',
          uslovi: [
            { tip: 'pol', vrednost: 'z' },
            { tip: 'starost_min', vrednost: 65 },
          ],
        },
        { pol: 'z', starost: 'mladi' },
      ),
    ).toBe(false);
  });

  it('true + unknown -> unknown (bez false)', () => {
    expect(
      evalUslov(
        {
          tip: 'i',
          uslovi: [
            { tip: 'pol', vrednost: 'z' },
            { tip: 'starost_min', vrednost: 65 },
          ],
        },
        { pol: 'z' },
      ),
    ).toBe('unknown');
  });

  it('false ima prioritet nad unknown', () => {
    expect(
      evalUslov(
        {
          tip: 'i',
          uslovi: [
            { tip: 'pol', vrednost: 'z' },
            { tip: 'starost_min', vrednost: 65 },
          ],
        },
        { pol: 'm' },
      ),
    ).toBe(false);
  });
});

describe('evalUslov: ili (OR)', () => {
  it('jedan true -> true', () => {
    expect(
      evalUslov(
        {
          tip: 'ili',
          uslovi: [
            { tip: 'pol', vrednost: 'z' },
            { tip: 'starost_min', vrednost: 65 },
          ],
        },
        { pol: 'z', starost: 'mladi' },
      ),
    ).toBe(true);
  });

  it('svi false -> false', () => {
    expect(
      evalUslov(
        {
          tip: 'ili',
          uslovi: [
            { tip: 'pol', vrednost: 'z' },
            { tip: 'starost_min', vrednost: 65 },
          ],
        },
        { pol: 'm', starost: 'mladi' },
      ),
    ).toBe(false);
  });

  it('false + unknown -> unknown', () => {
    expect(
      evalUslov(
        {
          tip: 'ili',
          uslovi: [
            { tip: 'pol', vrednost: 'z' },
            { tip: 'starost_min', vrednost: 65 },
          ],
        },
        { pol: 'm' },
      ),
    ).toBe('unknown');
  });
});

describe('evalUslov: ne (NOT)', () => {
  it('inverzija true -> false', () => {
    expect(
      evalUslov({ tip: 'ne', uslov: { tip: 'pol', vrednost: 'z' } }, { pol: 'z' }),
    ).toBe(false);
  });

  it('inverzija false -> true', () => {
    expect(
      evalUslov({ tip: 'ne', uslov: { tip: 'pol', vrednost: 'z' } }, { pol: 'm' }),
    ).toBe(true);
  });

  it('unknown ostaje unknown', () => {
    expect(evalUslov({ tip: 'ne', uslov: { tip: 'pol', vrednost: 'z' } }, {})).toBe(
      'unknown',
    );
  });
});

// -----------------------------------------------------------------------------
// matchPravo + matchAll
// -----------------------------------------------------------------------------

describe('matchPravo', () => {
  it('vraća null ako bilo koji uslov je false', () => {
    const p = makePravo({
      id: 'X',
      uslovi: [{ tip: 'pol', vrednost: 'z' }],
    });
    expect(matchPravo({ pol: 'm' }, p)).toBeNull();
  });

  it('vraća siguran kad su svi true', () => {
    const p = makePravo({
      id: 'X',
      uslovi: [{ tip: 'pol', vrednost: 'z' }],
    });
    const m = matchPravo({ pol: 'z' }, p);
    expect(m?.match_strength).toBe('siguran');
  });

  it('vraća verovatan kad ima unknown ali nema false', () => {
    const p = makePravo({
      id: 'X',
      uslovi: [
        { tip: 'pol', vrednost: 'z' },
        { tip: 'starost_min', vrednost: 65 },
      ],
    });
    const m = matchPravo({ pol: 'z' }, p);
    expect(m?.match_strength).toBe('verovatan');
    expect(m?.missing_data).toContain('starost');
  });
});

describe('matchAll sortiranje', () => {
  const profile: Profile = { pol: 'z' };
  const surprise = makePravo({
    id: 'S',
    uslovi: [{ tip: 'pol', vrednost: 'z' }],
    tagovi: ['surprise'],
    prioritet_propusta: 1,
  });
  const highPriority = makePravo({
    id: 'HP',
    uslovi: [{ tip: 'pol', vrednost: 'z' }],
    prioritet_propusta: 5,
  });
  const normal = makePravo({
    id: 'N',
    uslovi: [{ tip: 'pol', vrednost: 'z' }],
    prioritet_propusta: 3,
  });

  it('surprise prvo, pa po prioritet desc', () => {
    const sorted = matchAll(profile, [normal, highPriority, surprise]);
    expect(sorted.map((m) => m.pravo.id)).toEqual(['S', 'HP', 'N']);
  });
});

// -----------------------------------------------------------------------------
// Scenarios (per roadmap)
// -----------------------------------------------------------------------------

describe('scenario: samohrana majka sa bebom, niska primanja', () => {
  const decjiDodatak = makePravo({
    id: 'DD01',
    kategorija: 'porodica_deca',
    uslovi: [
      { tip: 'ima_decu' },
      { tip: 'samohrani_roditelj', vrednost: true },
      { tip: 'primanja_max_rsd', vrednost: 20000, po_clanu: true },
    ],
  });

  it('kvalifikuje se kao siguran', () => {
    const profile: Profile = {
      pol: 'z',
      deca: ['beba'],
      domacinstvo: 'samohrani',
      primanja: 'vrlo_niska',
    };
    const m = matchPravo(profile, decjiDodatak);
    expect(m).not.toBeNull();
    expect(m?.match_strength).toBe('siguran');
  });

  it('ne kvalifikuje se ako prima visoko', () => {
    const profile: Profile = {
      pol: 'z',
      deca: ['beba'],
      domacinstvo: 'samohrani',
      primanja: 'visoka',
    };
    expect(matchPravo(profile, decjiDodatak)).toBeNull();
  });
});

describe('scenario: penzioner sa najnižom -> RTV oslobađanje', () => {
  const rtvOslobadjanje = makePravo({
    id: 'RTV01',
    kategorija: 'penzioneri',
    uslovi: [
      { tip: 'starost_min', vrednost: 65 },
      { tip: 'primanja_max_rsd', vrednost: 20000, po_clanu: true },
    ],
  });

  it('penzioner sa vrlo_niska -> siguran', () => {
    const profile: Profile = {
      starost: 'penzioner',
      zaposlenje: 'penzioner',
      primanja: 'vrlo_niska',
    };
    const m = matchPravo(profile, rtvOslobadjanje);
    expect(m).not.toBeNull();
    expect(m?.match_strength).toBe('siguran');
  });

  it('penzioner sa visoka -> null', () => {
    const profile: Profile = {
      starost: 'penzioner',
      primanja: 'visoka',
    };
    expect(matchPravo(profile, rtvOslobadjanje)).toBeNull();
  });
});
