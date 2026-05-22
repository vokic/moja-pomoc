import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_SCRIPT, getScript, pickScript, SCRIPT_KEY, setScript } from './script';
import type { LocalizedText } from '@/types';

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

describe('pickScript', () => {
  const text: LocalizedText = { sr_lat: 'Penzije', sr_cyr: 'Пензије' };

  it('lat -> sr_lat', () => {
    expect(pickScript(text, 'lat')).toBe('Penzije');
  });

  it('cyr -> sr_cyr', () => {
    expect(pickScript(text, 'cyr')).toBe('Пензије');
  });
});

describe('getScript / setScript', () => {
  it('default je "lat" kad localStorage prazan', () => {
    stubLocalStorage();
    expect(getScript()).toBe(DEFAULT_SCRIPT);
    expect(DEFAULT_SCRIPT).toBe('lat');
  });

  it('round-trip cyr', () => {
    stubLocalStorage();
    setScript('cyr');
    expect(getScript()).toBe('cyr');
  });

  it('round-trip lat', () => {
    stubLocalStorage();
    setScript('cyr');
    setScript('lat');
    expect(getScript()).toBe('lat');
  });

  it('nevažeća vrednost u localStorage -> default', () => {
    const store = stubLocalStorage();
    store[SCRIPT_KEY] = 'bogus';
    expect(getScript()).toBe(DEFAULT_SCRIPT);
  });
});
