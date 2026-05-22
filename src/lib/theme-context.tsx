import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'usa' | 'srpski';
type Ctx = { theme: Theme; setTheme: (t: Theme) => void };

const ThemeContext = createContext<Ctx | null>(null);
const KEY = 'mp_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('usa');

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === 'usa' || v === 'srpski') setThemeState(v);
    } catch {
      /* ignore */
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(KEY, t);
    } catch {
      /* ignore */
    }
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const v = useContext(ThemeContext);
  if (!v) return { theme: 'usa' as Theme, setTheme: () => {} };
  return v;
}
