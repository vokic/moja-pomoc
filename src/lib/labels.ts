import type { Kategorija } from '@/types';

export const KATEGORIJA_LABELS: Record<Kategorija, string> = {
  hronicni_bolesnici: 'Hronični bolesnici',
  porodica_deca: 'Porodica i deca',
  penzioneri: 'Penzioneri',
  osi: 'Osobe sa invaliditetom',
  nezaposleni: 'Nezaposleni',
  borci_invalidi: 'Borci i invalidi',
  energetska: 'Energetska zaštita',
  prosveta: 'Prosveta',
  porezi: 'Porezi',
  poljoprivreda: 'Poljoprivreda',
  zrtve_nasilja: 'Žrtve nasilja',
  hraniteljstvo: 'Hraniteljstvo',
  stanovanje: 'Stanovanje',
  zdravlje_zena: 'Zdravlje žena',
  mentalno_zdravlje: 'Mentalno zdravlje',
  smrt_porodice: 'Smrt u porodici',
  razvod: 'Razvod',
  dijaspora: 'Dijaspora',
  zivotne_situacije: 'Životne situacije',
  mladi: 'Mladi',
};

export function kategorijaLabel(kat: Kategorija): string {
  return KATEGORIJA_LABELS[kat] ?? kat.replace(/_/g, ' ');
}
