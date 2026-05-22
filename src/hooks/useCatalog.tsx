import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { loadCatalog } from '@/lib/catalog';
import type { Katalog } from '@/types';

type Ctx = {
  katalog: Katalog | null;
  loading: boolean;
  error: Error | null;
};

const CatalogContext = createContext<Ctx | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [katalog, setKatalog] = useState<Katalog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadCatalog()
      .then((k) => {
        if (!cancelled) {
          setKatalog(k);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<Ctx>(() => ({ katalog, loading, error }), [katalog, loading, error]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const v = useContext(CatalogContext);
  if (!v) {
    throw new Error('useCatalog must be used inside <CatalogProvider>');
  }
  return v;
}
