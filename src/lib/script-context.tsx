import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Script = 'lat' | 'cyr';
type Ctx = {
  script: Script;
  setScript: (s: Script) => void;
  t: (v: { sr_lat: string; sr_cyr: string }) => string;
};

const ScriptContext = createContext<Ctx | null>(null);

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

export function ScriptProvider({ children }: { children: ReactNode }) {
  const [script, setScriptState] = useState<Script>('lat');
  useEffect(() => {
    const v =
      (typeof window !== 'undefined' && localStorage.getItem('mp_script')) as Script | null;
    if (v === 'lat' || v === 'cyr') setScriptState(v);
  }, []);
  const setScript = (s: Script) => {
    setScriptState(s);
    if (typeof window !== 'undefined') localStorage.setItem('mp_script', s);
  };
  const t = (v: { sr_lat: string; sr_cyr: string }) => (script === 'cyr' ? v.sr_cyr : v.sr_lat);
  return (
    <ScriptContext.Provider value={{ script, setScript, t }}>{children}</ScriptContext.Provider>
  );
}

export function useScript() {
  const v = useContext(ScriptContext);
  if (!v) {
    return {
      script: 'lat' as Script,
      setScript: () => {},
      t: (x: { sr_lat: string; sr_cyr: string }) => x.sr_lat,
    };
  }
  return v;
}
