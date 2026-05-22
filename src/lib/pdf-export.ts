import { jsPDF } from 'jspdf';
import { formatIznos } from './iznos';
import { kategorijaLabel } from './labels';
import { cyrToLat } from './script-context';
import type { Pravo } from '@/types';

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 15;
const CONTENT_W = PAGE_W - 2 * MARGIN;

const DISCLAIMER =
  'Moja Pomoć je informativni alat. Konačnu odluku donose nadležne institucije. ' +
  'Pre podnošenja zahteva, proverite uslove sa nadležnom institucijom.';

/**
 * Helvetica (PDF default) podržava Latin Serbian (č/š/ž/ć/đ kroz CP1252) ali NE
 * ćirilicu. V1 generišemo PDF u latinici uvek. Ćirilični unos prevodimo
 * deterministički preko cyrToLat. Ćirilični PDF (sa Noto Sans embed-om)
 * dolazi u V1.5.
 */
function toLat(s: string): string {
  // cyrToLat lowercases; preserve original case by checking each char.
  const lower = cyrToLat(s);
  // best-effort restore: first char upper if original first char was upper-cyrillic
  if (s.length > 0 && s[0] !== s[0].toLowerCase() && lower.length > 0) {
    return lower[0].toUpperCase() + lower.slice(1);
  }
  return lower;
}

function wrap(pdf: jsPDF, text: string): string[] {
  return pdf.splitTextToSize(text, CONTENT_W) as string[];
}

function ensureSpace(pdf: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_H - 18) {
    pdf.addPage();
    return 22;
  }
  return y;
}

export function exportPravaPdf(prava: Pravo[]): void {
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const date = new Date().toLocaleDateString('sr-Latn');

  // Header
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.text('Moja Pomoć — vaša prava', MARGIN, 22);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text(`Generisano ${date} · mojapomoc.rs`, MARGIN, 28);

  // Disclaimer
  pdf.setFontSize(8);
  pdf.setTextColor(120);
  const disclaimerLines = wrap(pdf, DISCLAIMER);
  pdf.text(disclaimerLines, MARGIN, 36);
  pdf.setTextColor(0);

  let y = 36 + disclaimerLines.length * 3.5 + 6;

  // Body
  pdf.setFontSize(10);
  for (const p of prava) {
    y = ensureSpace(pdf, y, 35);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    const titleLines = wrap(pdf, toLat(p.naziv.sr_lat));
    pdf.text(titleLines, MARGIN, y);
    y += titleLines.length * 5 + 1;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(`Kategorija: ${kategorijaLabel(p.kategorija)}`, MARGIN, y);
    y += 5;
    pdf.text(`Iznos: ${toLat(formatIznos(p.iznos))}`, MARGIN, y);
    y += 5;
    if (p.institucije[0]) {
      const inst = wrap(pdf, `Institucija: ${toLat(p.institucije[0].naziv)}`);
      pdf.text(inst, MARGIN, y);
      y += inst.length * 4.5;
    }

    if (p.koraci.length > 0) {
      y = ensureSpace(pdf, y, 6);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Top koraci:', MARGIN, y);
      y += 5;
      pdf.setFont('helvetica', 'normal');
      const top = p.koraci.slice(0, 3);
      for (const k of top) {
        const lines = wrap(pdf, `${k.redni_broj}. ${toLat(k.naslov)}`);
        y = ensureSpace(pdf, y, lines.length * 4.5);
        pdf.text(lines, MARGIN + 4, y);
        y += lines.length * 4.5;
      }
    }

    if (p.rok_za_podnosenje) {
      const rokLines = wrap(pdf, `Rok: ${toLat(p.rok_za_podnosenje)}`);
      y = ensureSpace(pdf, y, rokLines.length * 4.5);
      pdf.text(rokLines, MARGIN, y);
      y += rokLines.length * 4.5;
    }

    y += 6;
    pdf.setDrawColor(220);
    pdf.line(MARGIN, y - 3, PAGE_W - MARGIN, y - 3);
  }

  // Footer on every page
  const totalPages = pdf.getNumberOfPages();
  pdf.setFontSize(8);
  pdf.setTextColor(120);
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.text(
      `mojapomoc.rs · Generisano ${date} · Strana ${i}/${totalPages}`,
      PAGE_W / 2,
      PAGE_H - 8,
      { align: 'center' },
    );
  }

  pdf.save(`moja-pomoc-prava-${date.replaceAll('.', '-').replace(/-$/, '')}.pdf`);
}
