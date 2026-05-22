import {
  Accessibility,
  ArrowRight,
  Baby,
  Brain,
  Briefcase,
  Bug,
  Coins,
  Cross,
  Droplet,
  Eye,
  Flame,
  Globe,
  GraduationCap,
  HandHelping,
  Heart,
  HeartCrack,
  HeartPulse,
  Home,
  Luggage,
  Mars,
  Medal,
  PlaneLanding,
  School,
  Shield,
  Sprout,
  Store,
  TriangleAlert,
  User,
  UserRound,
  UserSearch,
  Users,
  Venus,
  X,
  type LucideIcon,
} from 'lucide-react';
import type { WizardOption, WizardStepDef } from './steps-config';

const ICONS: Record<string, LucideIcon> = {
  accessibility: Accessibility,
  'arrow-right': ArrowRight,
  baby: Baby,
  brain: Brain,
  briefcase: Briefcase,
  bug: Bug,
  coins: Coins,
  cross: Cross,
  droplet: Droplet,
  eye: Eye,
  flame: Flame,
  globe: Globe,
  'graduation-cap': GraduationCap,
  'hand-helping': HandHelping,
  heart: Heart,
  'heart-crack': HeartCrack,
  'heart-pulse': HeartPulse,
  home: Home,
  luggage: Luggage,
  mars: Mars,
  medal: Medal,
  'plane-landing': PlaneLanding,
  school: School,
  shield: Shield,
  sprout: Sprout,
  store: Store,
  'triangle-alert': TriangleAlert,
  user: User,
  'user-heart': UserRound,
  'user-search': UserSearch,
  users: Users,
  venus: Venus,
  x: X,
};

function Icon({ name }: { name: string }) {
  const Cmp = ICONS[name] ?? User;
  return <Cmp className="h-5 w-5 shrink-0" aria-hidden="true" />;
}

type Props = {
  step: WizardStepDef;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
};

export function WizardStep({ step, value, onChange }: Props) {
  if (step.type === 'single') {
    const selected = typeof value === 'string' ? value : undefined;
    return (
      <div role="radiogroup" aria-label={step.q} className="space-y-2">
        {step.options.map((opt) => (
          <OptionButton
            key={opt.val}
            opt={opt}
            selected={selected === opt.val}
            role="radio"
            onClick={() => onChange(opt.val)}
          />
        ))}
      </div>
    );
  }

  // multi
  const selected = Array.isArray(value) ? value : [];
  const toggle = (opt: WizardOption) => {
    const isOn = selected.includes(opt.val);
    let next: string[];
    if (opt.exclusive) {
      next = isOn ? [] : [opt.val];
    } else if (isOn) {
      next = selected.filter((v) => v !== opt.val);
    } else {
      // selecting non-exclusive: drop any exclusive options
      const exclusives = new Set(step.options.filter((o) => o.exclusive).map((o) => o.val));
      next = [...selected.filter((v) => !exclusives.has(v)), opt.val];
    }
    onChange(next);
  };

  return (
    <div role="group" aria-label={step.q} className="space-y-2">
      {step.options.map((opt) => (
        <OptionButton
          key={opt.val}
          opt={opt}
          selected={selected.includes(opt.val)}
          role="checkbox"
          onClick={() => toggle(opt)}
        />
      ))}
    </div>
  );
}

type OptionButtonProps = {
  opt: WizardOption;
  selected: boolean;
  role: 'radio' | 'checkbox';
  onClick: () => void;
};

function OptionButton({ opt, selected, role, onClick }: OptionButtonProps) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-[14.5px] transition-colors ${
        selected
          ? 'border-[#162e51] bg-[#162e51]/5 text-[#162e51]'
          : 'border-[#dfe1e2] bg-white text-[#1b1b1b] hover:border-[#162e51]/40 hover:bg-[#f0f0f0]'
      } ${opt.exclusive ? 'italic' : ''}`}
    >
      <Icon name={opt.icon} />
      <span className="flex-1">{opt.label}</span>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
          role === 'radio' ? 'rounded-full' : 'rounded'
        } ${selected ? 'border-[#162e51] bg-[#162e51]' : 'border-[#dfe1e2] bg-white'}`}
        aria-hidden="true"
      >
        {selected && (
          <span
            className={`h-2 w-2 ${role === 'radio' ? 'rounded-full bg-white' : 'rounded-sm bg-white'}`}
          />
        )}
      </span>
    </button>
  );
}
