import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  clearProfile,
  isProfileComplete,
  loadProfile,
  PROFILE_KEY,
  saveProfile,
} from './profile';
import type { Profile } from '@/types';

function stubLocalStorage() {
  const store: Record<string, string> = {};
  vi.stubGlobal('window', {
    localStorage: {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => {
        store[k] = v;
      },
      removeItem: (k: string) => {
        delete store[k];
      },
      clear: () => {
        for (const k of Object.keys(store)) delete store[k];
      },
    },
  });
  return store;
}

beforeEach(() => {
  vi.unstubAllGlobals();
});

describe('saveProfile + loadProfile', () => {
  it('round-trip', () => {
    stubLocalStorage();
    const p: Profile = { starost: 'penzioner', pol: 'z' };
    saveProfile(p);
    expect(loadProfile()).toEqual(p);
  });

  it('loadProfile vraća null kad ništa nije sačuvano', () => {
    stubLocalStorage();
    expect(loadProfile()).toBeNull();
  });

  it('loadProfile vraća null za nevažeći JSON', () => {
    const store = stubLocalStorage();
    store[PROFILE_KEY] = '{not valid json';
    expect(loadProfile()).toBeNull();
  });
});

describe('clearProfile', () => {
  it('briše perzistirane podatke', () => {
    stubLocalStorage();
    saveProfile({ starost: 'mladi' });
    clearProfile();
    expect(loadProfile()).toBeNull();
  });
});

describe('isProfileComplete', () => {
  const full: Profile = {
    starost: 'penzioner',
    pol: 'preskoci',
    domacinstvo: 'sam',
    deca: ['nema'],
    zaposlenje: 'penzioner',
    primanja: 'vrlo_niska',
    zdravlje: ['nista'],
    situacija: ['nista'],
    posebne: ['nista'],
  };

  it('null -> false', () => {
    expect(isProfileComplete(null)).toBe(false);
  });

  it('undefined -> false', () => {
    expect(isProfileComplete(undefined)).toBe(false);
  });

  it('prazno -> false', () => {
    expect(isProfileComplete({})).toBe(false);
  });

  it('puno polja sa "preskoci"/"nista" -> true', () => {
    expect(isProfileComplete(full)).toBe(true);
  });

  it('fali jedno polje -> false', () => {
    const partial: Profile = { ...full };
    delete partial.primanja;
    expect(isProfileComplete(partial)).toBe(false);
  });

  it('prazna multi-select lista -> false', () => {
    const empty: Profile = { ...full, zdravlje: [] };
    expect(isProfileComplete(empty)).toBe(false);
  });
});
