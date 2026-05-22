import { useState } from 'react';
import { Link } from 'react-router-dom';
import { track } from '@/lib/analytics';

type Answer = 'znao' | 'znao_ne_koristim' | 'prvi_put' | 'mesovito';

const ANSWERS: { value: Answer; label: string }[] = [
  { value: 'znao', label: 'Znao/la sam za većinu' },
  { value: 'znao_ne_koristim', label: 'Znao/la sam, ali ne koristim' },
  { value: 'prvi_put', label: 'Prvi put čujem' },
  { value: 'mesovito', label: 'Mešovito' },
];

export function Anketa() {
  const [answered, setAnswered] = useState<Answer | null>(null);

  const submit = (a: Answer) => {
    track('survey_answered', { answer: a });
    setAnswered(a);
  };

  if (answered) {
    return (
      <section className="mt-12 rounded-md border border-[#dfe1e2] bg-white p-6 text-center">
        <h3 className="text-[16px] font-bold text-[var(--brand-primary)]">Hvala vam!</h3>
        <p className="mx-auto mt-2 max-w-xl text-[14px] leading-relaxed text-[#565c65]">
          Vaš odgovor nam pomaže da pratimo koliko građana propušta prava — to je
          podatak koji pokušavamo da približimo donatorima i ustanovama.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              track('share_clicked');
              if (typeof navigator !== 'undefined' && navigator.share) {
                navigator
                  .share({
                    title: 'Moja Pomoć',
                    text: 'Otkrijte sva državna prava koja vam pripadaju.',
                    url: window.location.origin,
                  })
                  .catch(() => {
                    /* user cancelled */
                  });
              }
            }}
            className="rounded-md border border-[var(--brand-primary)] px-4 py-2 text-[13.5px] font-semibold text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
          >
            Podeli sa drugima
          </button>
          <Link
            to="/podrzite"
            onClick={() => track('donate_link_clicked', { source: 'anketa' })}
            className="rounded-md bg-[var(--brand-primary)] px-4 py-2 text-[13.5px] font-semibold text-white hover:bg-[var(--brand-primary-dark)]"
          >
            Podržite projekat
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12 rounded-md border border-[#dfe1e2] bg-white p-6">
      <h3 className="text-[16px] font-bold text-[var(--brand-primary)]">
        Da li ste znali za većinu ovih prava?
      </h3>
      <p className="mt-1 text-[13.5px] text-[#565c65]">
        Bez prikupljanja podataka — samo broj klikova nam pomaže da merimo impact.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {ANSWERS.map((a) => (
          <button
            key={a.value}
            type="button"
            onClick={() => submit(a.value)}
            className="rounded-md border border-[#dfe1e2] bg-white px-4 py-2.5 text-left text-[14px] font-medium text-[#1b1b1b] transition-colors hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/5"
          >
            {a.label}
          </button>
        ))}
      </div>
    </section>
  );
}
