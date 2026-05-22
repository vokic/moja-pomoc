import { useEffect, useState } from 'react';
import { track } from '@/lib/analytics';

const EVENTS: Array<[string, Record<string, string | number | boolean>?]> = [
  ['wizard_started', {}],
  ['wizard_step_viewed', { step: 'starost', index: 0 }],
  ['wizard_step_viewed', { step: 'pol', index: 1 }],
  ['wizard_step_viewed', { step: 'domacinstvo', index: 2 }],
  ['wizard_step_viewed', { step: 'deca', index: 3 }],
  ['wizard_step_viewed', { step: 'zaposlenje', index: 4 }],
  ['wizard_step_viewed', { step: 'primanja', index: 5 }],
  ['wizard_step_viewed', { step: 'zdravlje', index: 6 }],
  ['wizard_step_viewed', { step: 'situacija', index: 7 }],
  ['wizard_step_viewed', { step: 'posebne', index: 8 }],
  ['wizard_back', { from: 'posebne' }],
  ['wizard_completed', {}],
  ['pravo_viewed', { pravo_id: 'DEBUG' }],
  ['pravo_tab_changed', { tab: 'koraci', pravo_id: 'DEBUG' }],
  ['pravo_tab_changed', { tab: 'dokumenti', pravo_id: 'DEBUG' }],
  ['pravo_tab_changed', { tab: 'institucije', pravo_id: 'DEBUG' }],
  ['pravo_tab_changed', { tab: 'uputstvo', pravo_id: 'DEBUG' }],
  ['pravo_tab_changed', { tab: 'greske', pravo_id: 'DEBUG' }],
  ['scroll_depth', { page: 'pravo_detail', pct: 25, pravo_id: 'DEBUG' }],
  ['scroll_depth', { page: 'pravo_detail', pct: 50, pravo_id: 'DEBUG' }],
  ['scroll_depth', { page: 'pravo_detail', pct: 75, pravo_id: 'DEBUG' }],
  ['scroll_depth', { page: 'pravo_detail', pct: 100, pravo_id: 'DEBUG' }],
  ['page_dwell_30s', { page: 'wizard' }],
  ['page_dwell_60s', { page: 'wizard' }],
  ['page_dwell_120s', { page: 'wizard' }],
  ['results_filter_changed', { filter: 'sve' }],
  ['results_filter_changed', { filter: 'surprise' }],
  ['results_filter_changed', { filter: 'high' }],
  ['results_view_changed', { view: 'grouped' }],
  ['results_view_changed', { view: 'flat' }],
  ['search_query', { length: 5, has_filter: false }],
  ['search_no_results', { query: 'debug query' }],
  ['external_link_clicked', { kind: 'external', domain: 'pio.rs', source: 'institucija' }],
  ['external_link_clicked', { kind: 'external', domain: 'rfzo.rs', source: 'footer' }],
  ['external_link_clicked', { kind: 'phone', source: 'institucija' }],
  ['external_link_clicked', { kind: 'email', source: 'institucija' }],
  ['pdf_export_started', { count: 5, source: 'rezultati' }],
  ['pdf_exported', { count: 5, source: 'rezultati' }],
  ['survey_answered', { answer: 'znao' }],
  ['survey_answered', { answer: 'prvi_put' }],
  ['share_clicked', { source: 'anketa' }],
  ['donate_link_clicked', { source: 'anketa' }],
];

export function DebugEventsPage() {
  const [fired, setFired] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = window.setInterval(() => {
      if (i >= EVENTS.length) {
        window.clearInterval(interval);
        setDone(true);
        return;
      }
      const [name, props] = EVENTS[i];
      track(name, props);
      i += 1;
      setFired(i);
    }, 200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-bold text-[var(--brand-primary)]">Debug: registracija svih event-a</h1>
      <p className="mt-3 text-[14px] text-[#565c65]">
        Šalje {EVENTS.length} test event-a u PostHog tako da se pojave u dropdown-u za
        Funnel/Insights. Posle ~10 sekundi sve registrovano. Onda obriši rutu iz App.tsx.
      </p>

      <div className="mt-6">
        <div className="h-2 w-full rounded-full bg-[#dfe1e2]">
          <div
            className="h-2 rounded-full bg-[var(--brand-primary)] transition-all"
            style={{ width: `${(fired / EVENTS.length) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-[13px] text-[#565c65]">
          {fired} / {EVENTS.length} {done && '✓ gotovo'}
        </p>
      </div>

      {done && (
        <div className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-[13.5px] text-emerald-900">
          Svi eventi poslani. Otvori PostHog → Activity → Live events za potvrdu (real-time).
          Insights dropdown autocomplete će prikazati sve evente u narednih 2-5 minuta.
        </div>
      )}
    </div>
  );
}
