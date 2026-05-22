import type { Iznos } from '@/types';

const RSD = new Intl.NumberFormat('sr-RS', { maximumFractionDigits: 0 });

function rsd(n: number): string {
  return `${RSD.format(n)} RSD`;
}

export function formatIznos(iznos: Iznos): string {
  switch (iznos.tip) {
    case 'mesecno':
      return `${rsd(iznos.vrednost_rsd)} mesečno`;
    case 'mesecno_raspon':
      return `${rsd(iznos.min_rsd)} – ${rsd(iznos.max_rsd)} mesečno`;
    case 'jednokratno':
      return `${rsd(iznos.vrednost_rsd)} jednokratno`;
    case 'jednokratno_raspon':
      return `${rsd(iznos.min_rsd)} – ${rsd(iznos.max_rsd)} jednokratno`;
    case 'popust_procenat':
      return `${iznos.procenat}% popust · ${iznos.na_sta}`;
    case 'usluga_besplatna':
      return `Besplatno: ${iznos.opis}`;
    case 'refundacija':
      return iznos.max_rsd != null
        ? `Refundacija (do ${rsd(iznos.max_rsd)})`
        : `Refundacija: ${iznos.opis}`;
    case 'opisno':
      return iznos.vrednost_opis;
  }
}
