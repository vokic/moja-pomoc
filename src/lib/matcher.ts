import type { MatchResult, Pravo, Profile, Uslov } from '@/types';

export type EvalResult = true | false | 'unknown';

/**
 * Approximate age range for a wizard "starost" bucket.
 * Returned as [min, max] so `starost_min` / `starost_max` checks can
 * distinguish "definitely qualifies", "definitely doesn't", and "uncertain".
 */
function ageRange(starost: NonNullable<Profile['starost']>): [number, number] {
  switch (starost) {
    case 'mladi':
      return [18, 29];
    case 'srednji':
      return [30, 49];
    case 'stariji':
      return [50, 64];
    case 'penzioner':
      return [65, 120];
  }
}

/**
 * Convenience: representative age (min of bucket). Roadmap acceptance test
 * expects `mapToAge('penzioner') === 65`.
 */
export function mapToAge(starost: NonNullable<Profile['starost']>): number {
  return ageRange(starost)[0];
}

/**
 * Approximate monthly per-capita income range for a wizard "primanja" bucket
 * (in RSD). `preskoci` returns null (treat as unknown).
 */
function incomeRange(
  primanja: NonNullable<Profile['primanja']>,
): [number, number] | null {
  switch (primanja) {
    case 'vrlo_niska':
      return [0, 15000];
    case 'niska':
      return [15000, 30000];
    case 'srednja':
      return [30000, 50000];
    case 'visa':
      return [50000, 100000];
    case 'visoka':
      return [100000, Number.POSITIVE_INFINITY];
    case 'preskoci':
      return null;
  }
}

export function evalUslov(u: Uslov, profile: Profile): EvalResult {
  switch (u.tip) {
    case 'starost_min': {
      if (!profile.starost) return 'unknown';
      const [min, max] = ageRange(profile.starost);
      if (min >= u.vrednost) return true;
      if (max < u.vrednost) return false;
      return 'unknown';
    }
    case 'starost_max': {
      if (!profile.starost) return 'unknown';
      const [min, max] = ageRange(profile.starost);
      if (max <= u.vrednost) return true;
      if (min > u.vrednost) return false;
      return 'unknown';
    }
    case 'pol': {
      if (!profile.pol || profile.pol === 'preskoci') return 'unknown';
      return profile.pol === u.vrednost;
    }
    case 'ima_decu': {
      const deca = profile.deca;
      if (!deca || deca.length === 0) return 'unknown';
      if (deca.includes('nema')) return false;
      if (!u.uzrast || u.uzrast.length === 0) return true;
      return u.uzrast.some((v) => (deca as string[]).includes(v));
    }
    case 'ima_decu_smetnje': {
      const deca = profile.deca;
      if (!deca || deca.length === 0) return 'unknown';
      if (deca.includes('nema')) return !u.vrednost;
      const has = deca.includes('smetnje');
      return has === u.vrednost;
    }
    case 'samohrani_roditelj': {
      if (!profile.domacinstvo) return 'unknown';
      const isSamohrani = profile.domacinstvo === 'samohrani';
      return isSamohrani === u.vrednost;
    }
    case 'primanja_max_rsd': {
      if (!profile.primanja) return 'unknown';
      const range = incomeRange(profile.primanja);
      if (!range) return 'unknown';
      const [min, max] = range;
      if (max <= u.vrednost) return true;
      if (min > u.vrednost) return false;
      return 'unknown';
    }
    case 'zaposlenje': {
      if (!profile.zaposlenje) return 'unknown';
      return (u.vrednost as readonly string[]).includes(profile.zaposlenje);
    }
    case 'zdravlje': {
      const z = profile.zdravlje;
      if (!z || z.length === 0) return 'unknown';
      if (z.includes('nista')) return false;
      return u.vrednost.some((v) => (z as string[]).includes(v));
    }
    case 'situacija': {
      const s = profile.situacija;
      if (!s || s.length === 0) return 'unknown';
      if (s.includes('nista')) return false;
      return u.vrednost.some((v) => (s as string[]).includes(v));
    }
    case 'posebna_kategorija': {
      const p = profile.posebne;
      if (!p || p.length === 0) return 'unknown';
      if (p.includes('nista')) return false;
      return u.vrednost.some((v) => (p as string[]).includes(v));
    }
    case 'prebivaliste_srbija': {
      // Wizard doesn't collect this in V1; assume target audience = residents of RS.
      return u.vrednost ? 'unknown' : 'unknown';
    }
    case 'staz_u_inostranstvu': {
      // Wizard doesn't ask explicitly; "dijaspora" flag in profile.posebne is a hint.
      const p = profile.posebne;
      if (!p || p.length === 0) return 'unknown';
      if (p.includes('dijaspora')) return 'unknown';
      if (p.includes('nista')) return false;
      return 'unknown';
    }
    case 'i': {
      const results = u.uslovi.map((uu) => evalUslov(uu, profile));
      if (results.some((r) => r === false)) return false;
      if (results.some((r) => r === 'unknown')) return 'unknown';
      return true;
    }
    case 'ili': {
      const results = u.uslovi.map((uu) => evalUslov(uu, profile));
      if (results.some((r) => r === true)) return true;
      if (results.some((r) => r === 'unknown')) return 'unknown';
      return false;
    }
    case 'ne': {
      const r = evalUslov(u.uslov, profile);
      if (r === 'unknown') return 'unknown';
      return !r;
    }
  }
}

/**
 * Map an Uslov to the profile field(s) it depends on. Used to compute
 * `missing_data` for a MatchResult.
 */
function uslovFields(u: Uslov): string[] {
  switch (u.tip) {
    case 'starost_min':
    case 'starost_max':
      return ['starost'];
    case 'pol':
      return ['pol'];
    case 'ima_decu':
    case 'ima_decu_smetnje':
      return ['deca'];
    case 'samohrani_roditelj':
      return ['domacinstvo'];
    case 'primanja_max_rsd':
      return ['primanja'];
    case 'zaposlenje':
      return ['zaposlenje'];
    case 'zdravlje':
      return ['zdravlje'];
    case 'situacija':
      return ['situacija'];
    case 'posebna_kategorija':
      return ['posebne'];
    case 'prebivaliste_srbija':
    case 'staz_u_inostranstvu':
      return [];
    case 'i':
    case 'ili':
      return u.uslovi.flatMap(uslovFields);
    case 'ne':
      return uslovFields(u.uslov);
  }
}

export function matchPravo(profile: Profile, pravo: Pravo): MatchResult | null {
  const evaluations = pravo.uslovi.map((u) => evalUslov(u, profile));

  if (evaluations.some((e) => e === false)) return null;

  const allTrue = evaluations.every((e) => e === true);
  const matchStrength: MatchResult['match_strength'] = allTrue ? 'siguran' : 'verovatan';

  const matched = pravo.uslovi.filter((_, i) => evaluations[i] === true);

  const unknownIdx = evaluations
    .map((e, i) => (e === 'unknown' ? i : -1))
    .filter((i) => i >= 0);
  const missing = [
    ...new Set(unknownIdx.flatMap((i) => uslovFields(pravo.uslovi[i]))),
  ];

  return {
    pravo,
    match_strength: matchStrength,
    matched_conditions: matched,
    missing_data: missing,
  };
}

/**
 * Sort: surprise first, then prioritet_propusta descending (5 → 1).
 */
function byTagsAndPriority(a: MatchResult, b: MatchResult): number {
  const aSurprise = a.pravo.tagovi.includes('surprise') ? 0 : 1;
  const bSurprise = b.pravo.tagovi.includes('surprise') ? 0 : 1;
  if (aSurprise !== bSurprise) return aSurprise - bSurprise;
  return b.pravo.prioritet_propusta - a.pravo.prioritet_propusta;
}

export function matchAll(profile: Profile, catalog: Pravo[]): MatchResult[] {
  return catalog
    .map((p) => matchPravo(profile, p))
    .filter((m): m is MatchResult => m !== null)
    .sort(byTagsAndPriority);
}
