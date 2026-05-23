import type { Lang } from './i18n';
import type { Kategorija } from '@/types';

export const KATEGORIJA_LABELS: Record<Kategorija, { sr: string; en: string }> = {
  hronicni_bolesnici: { sr: 'Hronični bolesnici', en: 'Chronic patients' },
  porodica_deca: { sr: 'Porodica i deca', en: 'Family & children' },
  penzioneri: { sr: 'Penzioneri', en: 'Retirees' },
  osi: { sr: 'Osobe sa invaliditetom', en: 'Persons with disability' },
  nezaposleni: { sr: 'Nezaposleni', en: 'Unemployed' },
  borci_invalidi: { sr: 'Borci i invalidi', en: 'Veterans & disabled' },
  energetska: { sr: 'Energetska zaštita', en: 'Energy protection' },
  prosveta: { sr: 'Prosveta', en: 'Education' },
  porezi: { sr: 'Porezi', en: 'Taxes' },
  poljoprivreda: { sr: 'Poljoprivreda', en: 'Agriculture' },
  zrtve_nasilja: { sr: 'Žrtve nasilja', en: 'Violence victims' },
  hraniteljstvo: { sr: 'Hraniteljstvo', en: 'Foster care' },
  stanovanje: { sr: 'Stanovanje', en: 'Housing' },
  zdravlje_zena: { sr: 'Zdravlje žena', en: "Women's health" },
  mentalno_zdravlje: { sr: 'Mentalno zdravlje', en: 'Mental health' },
  smrt_porodice: { sr: 'Smrt u porodici', en: 'Family bereavement' },
  razvod: { sr: 'Razvod', en: 'Divorce' },
  dijaspora: { sr: 'Dijaspora', en: 'Diaspora' },
  zivotne_situacije: { sr: 'Životne situacije', en: 'Life events' },
  mladi: { sr: 'Mladi', en: 'Youth' },
};

export function kategorijaLabel(kat: Kategorija, lang: Lang = 'sr'): string {
  const entry = KATEGORIJA_LABELS[kat];
  if (!entry) return kat.replace(/_/g, ' ');
  return entry[lang] ?? entry.sr;
}
