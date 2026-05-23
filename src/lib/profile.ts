import type { Profile } from '@/types';

export const PROFILE_KEY = 'mp_profile';

/** Read profile from localStorage, or `null` if not set / invalid. */
export function loadProfile(): Profile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

export function saveProfile(profile: Profile): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    /* quota / privacy mode - drop silently */
  }
}

export function clearProfile(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(PROFILE_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * A profile is considered complete when every wizard step has an answer.
 * Multi-select steps must have at least one value (incl. exclusive options
 * like "nema" or "nista" - those count as deliberate answers).
 */
export function isProfileComplete(p: Profile | null | undefined): boolean {
  if (!p) return false;
  return (
    !!p.starost &&
    !!p.pol &&
    !!p.domacinstvo &&
    Array.isArray(p.deca) &&
    p.deca.length > 0 &&
    !!p.zaposlenje &&
    !!p.primanja &&
    Array.isArray(p.zdravlje) &&
    p.zdravlje.length > 0 &&
    Array.isArray(p.situacija) &&
    p.situacija.length > 0 &&
    Array.isArray(p.posebne) &&
    p.posebne.length > 0
  );
}
