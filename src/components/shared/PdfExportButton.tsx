import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { track } from '@/lib/analytics';
import type { Pravo } from '@/types';

type Props = {
  prava: Pravo[];
  /** Where in the app this button was rendered — for analytics segmentation. */
  source?: string;
};

export function PdfExportButton({ prava, source = 'rezultati' }: Props) {
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    if (busy || prava.length === 0) return;
    track('pdf_export_started', { count: prava.length, source });
    setBusy(true);
    try {
      // Lazy-load jsPDF so it doesn't bloat the main bundle.
      const { exportPravaPdf } = await import('@/lib/pdf-export');
      exportPravaPdf(prava);
      track('pdf_exported', { count: prava.length, source });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={busy || prava.length === 0}
      className="gap-2"
    >
      <Download className="h-4 w-4" aria-hidden />
      {busy ? 'Generisanje…' : 'Sačuvaj kao PDF'}
    </Button>
  );
}
