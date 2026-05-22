import type { Katalog, Kategorija, Pravo } from '@/types';

const CATALOG_URL = '/catalog/katalog.json';

let cachedCatalog: Katalog | null = null;
let inflight: Promise<Katalog> | null = null;

/**
 * Fetch `/catalog/katalog.json` once and cache the result. Concurrent calls
 * share a single in-flight request to avoid duplicate fetches.
 */
export async function loadCatalog(): Promise<Katalog> {
  if (cachedCatalog) return cachedCatalog;
  if (inflight) return inflight;

  inflight = fetch(CATALOG_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load catalog: ${res.status}`);
      return res.json() as Promise<Katalog>;
    })
    .then((katalog) => {
      cachedCatalog = katalog;
      inflight = null;
      return katalog;
    })
    .catch((err) => {
      inflight = null;
      throw err;
    });

  return inflight;
}

/** Test helper: reset the in-memory cache. */
export function _resetCatalogCache(): void {
  cachedCatalog = null;
  inflight = null;
}

export function findPravo(katalog: Katalog, id: string): Pravo | undefined {
  return katalog.prava.find((p) => p.id === id);
}

export function filterByKategorija(katalog: Katalog, kat: Kategorija): Pravo[] {
  return katalog.prava.filter((p) => p.kategorija === kat);
}
