import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_LANG, getLang, setLang as setLangStorage, translate, type Lang, type TKey } from './i18n';
import type { LocalizedText } from '@/types';

export type { Lang } from './i18n';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Translate a UI string key. */
  t: (key: TKey, params?: Record<string, string>) => string;
  /** Pick the right variant of a catalog LocalizedText for the current language.
   *  Catalog has sr_cyr + sr_lat (legacy). For sr lang we use sr_lat. For en
   *  lang we fall back to en if present, otherwise sr_lat. */
  pickLocalized: (text: LocalizedText) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    setLangState(getLang());
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang: (l) => {
        setLangState(l);
        setLangStorage(l);
      },
      t: (key, params) => translate(key, lang, params),
      pickLocalized: (text) => {
        if (lang === 'en' && (text as LocalizedText & { en?: string }).en) {
          return (text as LocalizedText & { en?: string }).en!;
        }
        return text.sr_lat;
      },
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const v = useContext(LangContext);
  if (!v) {
    // Fallback for components outside provider (e.g., during HMR).
    return {
      lang: DEFAULT_LANG,
      setLang: () => {},
      t: (key: TKey, params?: Record<string, string>) => translate(key, DEFAULT_LANG, params),
      pickLocalized: (text: LocalizedText) => text.sr_lat,
    };
  }
  return v;
}
