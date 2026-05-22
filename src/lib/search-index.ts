import type { Kategorija, Pravo } from '@/types';

/**
 * Serbian Cyrillic → Latin transliteration map (single-codepoint coverage).
 * Digraphs (љ, њ, џ) and ђ expand to 2 chars to stay consistent with how
 * users typically type Latin Serbian.
 */
export const CYR_TO_LAT: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', ђ: 'dj', е: 'e', ж: 'z', з: 'z',
  и: 'i', ј: 'j', к: 'k', л: 'l', љ: 'lj', м: 'm', н: 'n', њ: 'nj', о: 'o',
  п: 'p', р: 'r', с: 's', т: 't', ћ: 'c', у: 'u', ф: 'f', х: 'h', ц: 'c',
  ч: 'c', џ: 'dz', ш: 's',
};

/**
 * Normalize for cross-script search:
 *   1. lowercase
 *   2. cyrillic → latin (CYR_TO_LAT)
 *   3. đ → dj (single-codepoint, NFD doesn't decompose it)
 *   4. NFD + strip combining diacritics (č→c, š→s, ž→z, ć→c, ...)
 *   5. collapse whitespace
 */
export function normalizeText(text: string): string {
  let s = text.toLowerCase();
  s = s.replace(/[Ѐ-ӿ]/g, (c) => CYR_TO_LAT[c] ?? c);
  s = s.replace(/đ/g, 'dj');
  s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

export type SearchIndexEntry = { pravo: Pravo; haystack: string };
export type SearchIndex = SearchIndexEntry[];

export function buildSearchIndex(catalog: Pravo[]): SearchIndex {
  return catalog.map((pravo) => ({
    pravo,
    haystack: normalizeText(
      [
        pravo.naziv.sr_lat,
        pravo.naziv.sr_cyr,
        pravo.kratak_opis.sr_lat,
        pravo.kratak_opis.sr_cyr,
        pravo.kategorija,
        pravo.ko_ima_pravo_opis,
      ].join(' '),
    ),
  }));
}

/**
 * Filter the index by an optional query string and optional category (single
 * value or array). Empty query → returns all (respecting kategorija filter).
 */
export function search(
  index: SearchIndex,
  query: string,
  kategorija?: Kategorija | Kategorija[],
): Pravo[] {
  const q = normalizeText(query);
  const allowed = kategorija
    ? new Set(Array.isArray(kategorija) ? kategorija : [kategorija])
    : null;

  return index
    .filter((item) => {
      if (allowed && !allowed.has(item.pravo.kategorija)) return false;
      if (!q) return true;
      return item.haystack.includes(q);
    })
    .map((item) => item.pravo);
}
