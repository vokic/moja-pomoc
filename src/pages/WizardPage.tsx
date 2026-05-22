import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/wizard/ProgressBar';
import { TOTAL_STEPS, WIZARD_STEPS } from '@/components/wizard/steps-config';
import { useProfile } from '@/hooks/useProfile';

export function WizardPage() {
  const { profile, reset, complete } = useProfile();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [resumePrompt, setResumePrompt] = useState(false);

  useEffect(() => {
    // Show resume prompt if a non-empty, incomplete profile exists on first mount.
    if (profile && !complete && Object.keys(profile).length > 0) {
      setResumePrompt(true);
    }
  }, [profile, complete]);

  if (resumePrompt) {
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

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <ProgressBar current={currentStep} total={TOTAL_STEPS} />

      <div className="mt-8">
        <h1 className="text-2xl font-bold text-[#162e51]">{step.q}</h1>
        {step.hint && <p className="mt-2 text-[14px] text-[#565c65]">{step.hint}</p>}
      </div>

      <div className="mt-6 rounded-lg border border-dashed border-[#dfe1e2] bg-white p-6 text-center text-[13.5px] text-[#565c65]">
        <p>
          Opcije za ovaj korak ({step.type === 'single' ? 'jedan izbor' : 'više izbora'})
          dolaze u sledećem zadatku — Sprint 2.3 (WizardStep komponenta).
        </p>
        <p className="mt-2 text-[12px]">
          Polje: <code>{step.id}</code> · {step.options.length} opcija
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
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
