import { describe, expect, it } from 'vitest';
import { filterByKategorija, findPravo } from './catalog';
import type { Katalog, Pravo } from '@/types';

function makePravo(overrides: Partial<Pravo> & { id: string }): Pravo {
  return {
    kategorija: 'porodica_deca',
    naziv: { sr_lat: 'X', sr_cyr: 'X' },
    kratak_opis: { sr_lat: '', sr_cyr: '' },
    prioritet_propusta: 3,
    tagovi: [],
    pravni_osnov: [{ zakon: 'Z' }],
    iznos: { tip: 'opisno', vrednost_opis: '-' },
    ko_ima_pravo_opis: '-',
    uslovi: [],
    zasto_se_propusta: '-',
    koraci: [],
    dokumenti: [],
    institucije: [],
    filijala_pravilo: 'jedinstvena',
    ceste_greske: [],
    last_verified: '2026-01-01',
    ...overrides,
  };
}

const katalog: Katalog = {
  version: '1.0.0',
  last_update: '2026-05-22',
  total_prava: 3,
  prava: [
    makePravo({ id: 'A1', kategorija: 'porodica_deca' }),
    makePravo({ id: 'B1', kategorija: 'penzioneri' }),
    makePravo({ id: 'B2', kategorija: 'penzioneri' }),
  ],
};

describe('findPravo', () => {
  it('vraća pravo po id', () => {
    expect(findPravo(katalog, 'A1')?.id).toBe('A1');
  });

  it('undefined ako ne postoji', () => {
    expect(findPravo(katalog, 'NEMA')).toBeUndefined();
  });
});

describe('filterByKategorija', () => {
  it('vraća sva prava u kategoriji', () => {
    const res = filterByKategorija(katalog, 'penzioneri');
    expect(res.map((p) => p.id)).toEqual(['B1', 'B2']);
  });

  it('prazan niz ako nema prava u kategoriji', () => {
    expect(filterByKategorija(katalog, 'dijaspora')).toEqual([]);
  });
});
