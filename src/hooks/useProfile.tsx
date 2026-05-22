import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  clearProfile as clearProfileStorage,
  isProfileComplete,
  loadProfile,
  saveProfile,
} from '@/lib/profile';
import type { Profile } from '@/types';

type Ctx = {
  profile: Profile | null;
  update: <K extends keyof Profile>(field: K, value: Profile[K]) => void;
  reset: () => void;
  complete: boolean;
  /** False while the first localStorage read is pending. Use this to avoid
   *  premature redirects in guards. */
  loaded: boolean;
};

const ProfileContext = createContext<Ctx | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setLoaded(true);
  }, []);

  const update = useCallback<Ctx['update']>((field, value) => {
    setProfile((prev) => {
      const next: Profile = { ...(prev ?? {}), [field]: value };
      saveProfile(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    clearProfileStorage();
    setProfile(null);
  }, []);

  const complete = useMemo(() => isProfileComplete(profile), [profile]);

  const value = useMemo<Ctx>(
    () => ({ profile, update, reset, complete, loaded }),
    [profile, update, reset, complete, loaded],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const v = useContext(ProfileContext);
  if (!v) {
    throw new Error('useProfile must be used inside <ProfileProvider>');
  }
  return v;
}
