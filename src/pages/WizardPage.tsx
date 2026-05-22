import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/wizard/ProgressBar';
import { TOTAL_STEPS, WIZARD_STEPS } from '@/components/wizard/steps-config';
import { WizardStep } from '@/components/wizard/WizardStep';
import { useProfile } from '@/hooks/useProfile';
import { usePageTitle } from '@/hooks/usePageTitle';
import type { Profile } from '@/types';

export function WizardPage() {
  usePageTitle('Vodič za prava');
  const { profile, update, reset, complete } = useProfile();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [resumePrompt, setResumePrompt] = useState<boolean | null>(null);

  useEffect(() => {
    if (resumePrompt !== null) return;
    if (profile && !complete && Object.keys(profile).length > 0) {
      setResumePrompt(true);
    } else {
      setResumePrompt(false);
    }
  }, [profile, complete, resumePrompt]);

  if (resumePrompt === true) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-2xl font-bold text-[#162e51]">Nastavite gde ste stali?</h1>
        <p className="mt-3 text-[15px] text-[#565c65]">
          Imali smo započet vodič sačuvan u ovom pretraživaču. Možete da nastavite
          tamo gde ste stali ili krenete ispočetka.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => setResumePrompt(false)}>Nastavi</Button>
          <Button
            variant="outline"
            onClick={() => {
              reset();
              setResumePrompt(false);
              setCurrentStep(0);
            }}
          >
            Kreni ispočetka
          </Button>
        </div>
      </div>
    );
  }

  const step = WIZARD_STEPS[currentStep];
  const isLast = currentStep === TOTAL_STEPS - 1;

  const rawValue = profile?.[step.id];
  const value: string | string[] | undefined = rawValue as string | string[] | undefined;

  const handleChange = (next: string | string[]) => {
    update(step.id, next as Profile[typeof step.id]);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <ProgressBar current={currentStep} total={TOTAL_STEPS} />

      <div className="mt-8">
        <h1 className="text-2xl font-bold text-[#162e51]">{step.q}</h1>
        {step.hint && <p className="mt-2 text-[14px] text-[#565c65]">{step.hint}</p>}
      </div>

      <div className="mt-6">
        <WizardStep step={step} value={value} onChange={handleChange} />
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          variant="outline"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
        >
          Nazad
        </Button>
        {!isLast ? (
          <Button onClick={() => setCurrentStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))}>
            Sledeće
          </Button>
        ) : (
          <Button onClick={() => navigate('/rezultati')}>Pokaži šta mi pripada</Button>
        )}
      </div>
    </div>
  );
}
