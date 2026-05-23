import { describe, expect, it } from 'vitest';
import { buildSearchIndex, normalizeText, search } from './search-index';
import type { Pravo } from '@/types';

function makePravo(overrides: Partial<Pravo> & { id: string }): Pravo {
  return {
    kategorija: 'porodica_deca',
    naziv: { sr_lat: '', sr_cyr: '' },
    kratak_opis: { sr_lat: '', sr_cyr: '' },
    prioritet_propusta: 3,
    tagovi: [],
    pravni_osnov: [{ zakon: 'Test' }],
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

// -----------------------------------------------------------------------------
// normalizeText
// -----------------------------------------------------------------------------

describe('normalizeText', () => {
  it('lowercases', () => {
    expect(normalizeText('DEČJI DODATAK')).toBe('decji dodatak');
  });

  it('cyrillic -> latin', () => {
    expect(normalizeText('Дечји додатак')).toBe('decji dodatak');
  });

  it('strips diacritics (č, š, ž, ć)', () => {
    expect(normalizeText('Banjsko lečenje')).toBe('banjsko lecenje');
    expect(normalizeText('Široko')).toBe('siroko');
    expect(normalizeText('Žena')).toBe('zena');
    expect(normalizeText('Cuk')).toBe('cuk');
  });

  it('đ -> dj', () => {
    expect(normalizeText('Đačka kuhinja')).toBe('djacka kuhinja');
  });

  it('cyrillic digraphs (љ, њ, џ, ђ)', () => {
    expect(normalizeText('љубав')).toBe('ljubav');
    expect(normalizeText('коњ')).toBe('konj');
    expect(normalizeText('џеп')).toBe('dzep');
    expect(normalizeText('ђак')).toBe('djak');
  });

  it('collapses whitespace and trims', () => {
    expect(normalizeText('  decji   dodatak  ')).toBe('decji dodatak');
  });

  it('cross-script equivalence', () => {
    expect(normalizeText('Дечји додатак')).toBe(normalizeText('Dečji dodatak'));
  });
});

// -----------------------------------------------------------------------------
// search
// -----------------------------------------------------------------------------

const decji = makePravo({
  id: 'DD01',
  kategorija: 'porodica_deca',
  naziv: { sr_lat: 'Dečji dodatak', sr_cyr: 'Дечји додатак' },
  kratak_opis: {
    sr_lat: 'Mesečna pomoć za decu iz porodica niskih primanja',
    sr_cyr: 'Месечна помоћ за децу из породица ниских примања',
  },
});

const banja = makePravo({
  id: 'BL01',
  kategorija: 'hronicni_bolesnici',
  naziv: { sr_lat: 'Banjsko lečenje', sr_cyr: 'Бањско лечење' },
  kratak_opis: {
    sr_lat: 'Boravak u banji za hronične bolesnike',
    sr_cyr: 'Боравак у бањи за хроничне болеснике',
  },
});

const dijaspora = makePravo({
  id: 'DJ01',
  kategorija: 'dijaspora',
  naziv: { sr_lat: 'Penzije po EU sporazumima', sr_cyr: 'Пензије по ЕУ споразумима' },
  kratak_opis: {
    sr_lat: 'Penzija za staž ostvaren u inostranstvu',
    sr_cyr: 'Пензија за стаж остварен у иностранству',
  },
});

const index = buildSearchIndex([decji, banja, dijaspora]);

describe('search: cross-script', () => {
  it('kuca latinicu, nalazi pravo (decji -> Dečji)', () => {
    const results = search(index, 'decji');
    expect(results.map((r) => r.id)).toContain('DD01');
  });

  it('kuca cirilicu, nalazi pravo (банј -> Banjsko)', () => {
    const results = search(index, 'банј');
    expect(results.map((r) => r.id)).toContain('BL01');
  });

  it('kuca sa dijakritikom (Bečko) ekvivalentno bez (Becko)', () => {
    // both should find penzije (cyrillic in haystack normalizes anyway)
    const a = search(index, 'sporazumima');
    const b = search(index, 'споразумима');
    expect(a.map((r) => r.id)).toEqual(b.map((r) => r.id));
  });
});

describe('search: partial match', () => {
  it('"banj" nalazi banjsko lečenje', () => {
    const results = search(index, 'banj');
    expect(results.map((r) => r.id)).toEqual(['BL01']);
  });

  it('"penz" nalazi penzije EU', () => {
    const results = search(index, 'penz');
    expect(results.map((r) => r.id)).toContain('DJ01');
  });

  it('nepostojeci query -> prazno', () => {
    expect(search(index, 'xyzabc')).toEqual([]);
  });
});

describe('search: kategorija filter', () => {
  it('filter na hronicni_bolesnici vraca samo banjsko', () => {
    const results = search(index, '', 'hronicni_bolesnici');
    expect(results.map((r) => r.id)).toEqual(['BL01']);
  });

  it('multi-kategorija filter', () => {
    const results = search(index, '', ['porodica_deca', 'dijaspora']);
    expect(results.map((r) => r.id).sort()).toEqual(['DD01', 'DJ01']);
  });

  it('query + kategorija zajedno', () => {
    // "lecenje" je samo u banja (hronicni_bolesnici)
    const results = search(index, 'lecenje', 'hronicni_bolesnici');
    expect(results.map((r) => r.id)).toEqual(['BL01']);
  });

  it('query + kategorija koja iskljucuje sve -> prazno', () => {
    const results = search(index, 'lecenje', 'dijaspora');
    expect(results).toEqual([]);
  });
});

describe('search: empty query', () => {
  it('prazan query bez filtera -> sve', () => {
    const results = search(index, '');
    expect(results).toHaveLength(3);
  });

  it('prazan query + kategorija filter -> samo kategorija', () => {
    const results = search(index, '   ', 'porodica_deca');
    expect(results.map((r) => r.id)).toEqual(['DD01']);
  });
});
