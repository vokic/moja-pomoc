/**
 * Basic Serbian Cyrillic ↔ Latin transliteration. Used by PDF export (lower
 * Helvetica only supports Latin) and search index (cross-script normalize).
 */

const LAT_TO_CYR: Record<string, string> = {
  a: 'а', b: 'б', v: 'в', g: 'г', d: 'д', e: 'е', z: 'з', i: 'и', j: 'ј',
  k: 'к', l: 'л', m: 'м', n: 'н', o: 'о', p: 'п', r: 'р', s: 'с', t: 'т',
  u: 'у', f: 'ф', h: 'х', c: 'ц',
};

export function latToCyr(s: string): string {
  let out = '';
  let i = 0;
  const pairs: Record<string, string> = { lj: 'љ', nj: 'њ', dž: 'џ', dj: 'ђ' };
  const lower = s.toLowerCase();
  while (i < lower.length) {
    const two = lower.slice(i, i + 2);
    if (pairs[two]) {
      out += pairs[two];
      i += 2;
      continue;
    }
    const ch = lower[i];
    const map: Record<string, string> = { š: 'ш', č: 'ч', ć: 'ћ', ž: 'ж', đ: 'ђ' };
    out += map[ch] ?? LAT_TO_CYR[ch] ?? ch;
    i++;
  }
  return out;
}

export function cyrToLat(s: string): string {
  const m: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', ђ: 'dj', е: 'e', ж: 'z', з: 'z',
    и: 'i', ј: 'j', к: 'k', л: 'l', љ: 'lj', м: 'm', н: 'n', њ: 'nj', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', ћ: 'c', у: 'u', ф: 'f', х: 'h', ц: 'c',
    ч: 'c', џ: 'dz', ш: 's',
  };
  return s
    .toLowerCase()
    .split('')
    .map((c) => m[c] ?? c)
    .join('');
}
