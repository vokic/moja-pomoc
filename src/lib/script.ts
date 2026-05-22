import type { LocalizedText } from '@/types';

export type Script = 'lat' | 'cyr';
export const SCRIPT_KEY = 'mp_script';
export const DEFAULT_SCRIPT: Script = 'lat';

/** Read user's script preference from localStorage. Default: 'lat'. */
export function getScript(): Script {
  if (typeof window === 'undefined') return DEFAULT_SCRIPT;
  try {
    const v = window.localStorage.getItem(SCRIPT_KEY);
    if (v === 'lat' || v === 'cyr') return v;
  } catch {
    /* ignore */
  }
  return DEFAULT_SCRIPT;
}

export function setScript(s: Script): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SCRIPT_KEY, s);
  } catch {
    /* ignore */
  }
}

/** Pick the correct variant of a LocalizedText for the current script. */
export function pickScript(localized: LocalizedText, script: Script): string {
  return script === 'cyr' ? localized.sr_cyr : localized.sr_lat;
}
