import type { Profile } from '@/types';

export type BiText = { sr: string; en: string };

export type WizardOption = {
  val: string;
  label: BiText;
  icon: string;
  exclusive?: boolean;
};

export type WizardStepDef = {
  id: keyof Profile;
  q: BiText;
  hint?: BiText;
  type: 'single' | 'multi';
  options: WizardOption[];
};

export const WIZARD_STEPS: WizardStepDef[] = [
  {
    id: 'starost',
    q: { sr: 'Koliko godina imate?', en: 'How old are you?' },
    hint: {
      sr: 'Različita prava važe za različite starosne grupe',
      en: 'Different rights apply to different age groups',
    },
    type: 'single',
    options: [
      { val: 'mladi', label: { sr: 'Do 30 godina', en: 'Up to 30 years' }, icon: 'user' },
      { val: 'srednji', label: { sr: '30 – 50 godina', en: '30 – 50 years' }, icon: 'user' },
      { val: 'stariji', label: { sr: '50 – 65 godina', en: '50 – 65 years' }, icon: 'user' },
      {
        val: 'penzioner',
        label: { sr: 'Preko 65 godina (ili penzioner)', en: 'Over 65 (or retired)' },
        icon: 'user-heart',
      },
    ],
  },
  {
    id: 'pol',
    q: { sr: 'Pol', en: 'Gender' },
    hint: {
      sr: 'Neka prava su specifična za žene (IVF, skrining, porodiljsko)',
      en: 'Some rights are women-specific (IVF, screening, maternity)',
    },
    type: 'single',
    options: [
      { val: 'z', label: { sr: 'Žena', en: 'Woman' }, icon: 'venus' },
      { val: 'm', label: { sr: 'Muškarac', en: 'Man' }, icon: 'mars' },
      {
        val: 'preskoci',
        label: { sr: 'Ne želim da odgovorim', en: 'Prefer not to answer' },
        icon: 'arrow-right',
      },
    ],
  },
  {
    id: 'domacinstvo',
    q: { sr: 'Kako biste opisali svoje domaćinstvo?', en: 'How would you describe your household?' },
    hint: {
      sr: 'Različita prava važe za različite porodične situacije',
      en: 'Different rights apply to different family situations',
    },
    type: 'single',
    options: [
      { val: 'sam', label: { sr: 'Živim sam/a', en: 'I live alone' }, icon: 'user' },
      {
        val: 'partner',
        label: { sr: 'Sa partnerom/kom, bez dece', en: 'With a partner, no children' },
        icon: 'users',
      },
      {
        val: 'porodica',
        label: { sr: 'Sa partnerom/kom i decom', en: 'With a partner and children' },
        icon: 'users',
      },
      {
        val: 'samohrani',
        label: { sr: 'Samohrani roditelj sa decom', en: 'Single parent with children' },
        icon: 'user-heart',
      },
      {
        val: 'sa_roditeljima',
        label: { sr: 'Sa roditeljima/rodbinom', en: 'With parents / relatives' },
        icon: 'home',
      },
      {
        val: 'mesoviti',
        label: { sr: 'Više generacija u domaćinstvu', en: 'Multi-generation household' },
        icon: 'home',
      },
    ],
  },
  {
    id: 'deca',
    q: {
      sr: 'Imate li dece (rođene ili usvojene)?',
      en: 'Do you have children (born or adopted)?',
    },
    hint: { sr: 'Označite sve što važi', en: 'Select all that apply' },
    type: 'multi',
    options: [
      {
        val: 'nema',
        label: { sr: 'Nemam decu', en: 'No children' },
        icon: 'x',
        exclusive: true,
      },
      {
        val: 'beba',
        label: { sr: 'Bebu (do 1 godine)', en: 'A baby (up to 1 year)' },
        icon: 'baby',
      },
      {
        val: 'predskolsko',
        label: { sr: 'Predškolskog uzrasta (1-6 g)', en: 'Preschool age (1-6 yrs)' },
        icon: 'baby',
      },
      {
        val: 'osnovac',
        label: { sr: 'Školarca (7-14 g)', en: 'School age (7-14 yrs)' },
        icon: 'school',
      },
      {
        val: 'srednjoskolac',
        label: { sr: 'Srednjoškolca (15-18 g)', en: 'High school age (15-18 yrs)' },
        icon: 'school',
      },
      {
        val: 'student',
        label: { sr: 'Studenta', en: 'A university student' },
        icon: 'graduation-cap',
      },
      {
        val: 'punoletno_zdravstveno',
        label: {
          sr: 'Punoletno dete sa zdravstvenim problemima',
          en: 'Adult child with health issues',
        },
        icon: 'heart-pulse',
      },
      {
        val: 'smetnje',
        label: {
          sr: 'Dete sa smetnjama u razvoju ili invaliditetom',
          en: 'Child with developmental disability or disability',
        },
        icon: 'accessibility',
      },
    ],
  },
  {
    id: 'zaposlenje',
    q: { sr: 'Vaš trenutni radni status', en: 'Your current employment status' },
    hint: {
      sr: 'Određuje pristup naknadama, subvencijama i programima',
      en: 'Determines access to benefits, subsidies, and programs',
    },
    type: 'single',
    options: [
      {
        val: 'zaposlen',
        label: { sr: 'Zaposlen/a (ugovor o radu)', en: 'Employed (employment contract)' },
        icon: 'briefcase',
      },
      {
        val: 'preduzetnik',
        label: { sr: 'Preduzetnik / paušalac', en: 'Entrepreneur / flat-rate' },
        icon: 'store',
      },
      {
        val: 'poljoprivrednik',
        label: { sr: 'Registrovani poljoprivrednik', en: 'Registered farmer' },
        icon: 'sprout',
      },
      {
        val: 'nezaposlen',
        label: {
          sr: 'Nezaposlen/a (sa NSZ prijavom)',
          en: 'Unemployed (registered with NES)',
        },
        icon: 'user-search',
      },
      {
        val: 'nezaposlen_neprijavljen',
        label: {
          sr: 'Nezaposlen/a (bez NSZ prijave)',
          en: 'Unemployed (not registered with NES)',
        },
        icon: 'user-search',
      },
      {
        val: 'student',
        label: { sr: 'Student/kinja', en: 'Student' },
        icon: 'graduation-cap',
      },
      { val: 'penzioner', label: { sr: 'Penzioner/ka', en: 'Retiree' }, icon: 'user-heart' },
      {
        val: 'na_bolovanju',
        label: { sr: 'Na bolovanju ili porodiljskom', en: 'On sick or maternity leave' },
        icon: 'cross',
      },
    ],
  },
  {
    id: 'primanja',
    q: {
      sr: 'Mesečna primanja po članu domaćinstva',
      en: 'Monthly income per household member',
    },
    hint: {
      sr: 'Sva primanja u domaćinstvu / broj članova. Procena je dovoljna.',
      en: 'Total household income divided by number of members. An estimate is enough.',
    },
    type: 'single',
    options: [
      {
        val: 'vrlo_niska',
        label: { sr: 'Manje od 15.000 RSD', en: 'Less than 15,000 RSD' },
        icon: 'coins',
      },
      {
        val: 'niska',
        label: { sr: '15.000 – 30.000 RSD', en: '15,000 – 30,000 RSD' },
        icon: 'coins',
      },
      {
        val: 'srednja',
        label: { sr: '30.000 – 50.000 RSD', en: '30,000 – 50,000 RSD' },
        icon: 'coins',
      },
      {
        val: 'visa',
        label: { sr: '50.000 – 100.000 RSD', en: '50,000 – 100,000 RSD' },
        icon: 'coins',
      },
      {
        val: 'visoka',
        label: { sr: 'Preko 100.000 RSD', en: 'Over 100,000 RSD' },
        icon: 'coins',
      },
      {
        val: 'preskoci',
        label: { sr: 'Ne želim da odgovorim', en: 'Prefer not to answer' },
        icon: 'arrow-right',
      },
    ],
  },
  {
    id: 'zdravlje',
    q: {
      sr: 'Da li vi ili neko u domaćinstvu ima zdravstveni izazov?',
      en: 'Do you or anyone in the household have a health challenge?',
    },
    hint: {
      sr: 'Označite sve što važi. Najveći broj propuštenih prava je u ovoj kategoriji.',
      en: 'Select all that apply. Most missed benefits fall in this category.',
    },
    type: 'multi',
    options: [
      {
        val: 'nista',
        label: {
          sr: 'Niko u domaćinstvu nema značajne zdravstvene probleme',
          en: 'Nobody in the household has significant health issues',
        },
        icon: 'heart',
        exclusive: true,
      },
      {
        val: 'hronicno',
        label: {
          sr: 'Hronična bolest (dijabetes, hipertenzija, KOPB, srčana)',
          en: 'Chronic illness (diabetes, hypertension, COPD, cardiac)',
        },
        icon: 'heart-pulse',
      },
      {
        val: 'onkologija',
        label: {
          sr: 'Onkološka bolest (aktivna ili oporavak)',
          en: 'Cancer (active or in recovery)',
        },
        icon: 'cross',
      },
      {
        val: 'dijaliza',
        label: { sr: 'Dijaliza ili transplantacija', en: 'Dialysis or transplant' },
        icon: 'droplet',
      },
      {
        val: 'mentalno',
        label: {
          sr: 'Mentalno zdravlje (anksioznost, depresija, druge dijagnoze)',
          en: 'Mental health (anxiety, depression, other diagnoses)',
        },
        icon: 'brain',
      },
      {
        val: 'invaliditet',
        label: { sr: 'Telesno oštećenje ili invaliditet', en: 'Physical impairment or disability' },
        icon: 'accessibility',
      },
      {
        val: 'cula',
        label: { sr: 'Oštećenje vida ili sluha', en: 'Vision or hearing impairment' },
        icon: 'eye',
      },
      {
        val: 'tudja_nega',
        label: {
          sr: 'Neko u porodici treba tuđu negu i pomoć',
          en: 'Someone in the family needs personal care and assistance',
        },
        icon: 'hand-helping',
      },
      {
        val: 'autoimuna',
        label: { sr: 'Autoimuna bolest', en: 'Autoimmune disease' },
        icon: 'shield',
      },
    ],
  },
  {
    id: 'situacija',
    q: {
      sr: 'Da li ste se nedavno našli u nekoj od ovih situacija?',
      en: 'Have you recently been in any of these situations?',
    },
    hint: {
      sr: 'Označite sve što važi. Ova prava se najviše propuštaju zbog rokova.',
      en: 'Select all that apply. These rights are most often missed due to deadlines.',
    },
    type: 'multi',
    options: [
      {
        val: 'nista',
        label: { sr: 'Ništa od navedenog', en: 'None of the above' },
        icon: 'x',
        exclusive: true,
      },
      {
        val: 'rodjeno_dete',
        label: {
          sr: 'Rodilo se dete (u poslednjih godinu dana)',
          en: 'A child was born (in the past year)',
        },
        icon: 'baby',
      },
      {
        val: 'smrt_porodice',
        label: { sr: 'Umro je član porodice', en: 'A family member passed away' },
        icon: 'cross',
      },
      {
        val: 'razvod',
        label: { sr: 'Razvod ili razdvajanje', en: 'Divorce or separation' },
        icon: 'heart-crack',
      },
      {
        val: 'izgubio_posao',
        label: {
          sr: 'Izgubio/la sam posao u poslednjih 6 meseci',
          en: 'I lost my job in the past 6 months',
        },
        icon: 'briefcase',
      },
      {
        val: 'nasilje',
        label: { sr: 'Iskusio/la sam porodično nasilje', en: 'I experienced domestic violence' },
        icon: 'triangle-alert',
      },
      {
        val: 'pozar_poplava',
        label: {
          sr: 'Požar, poplava ili druga nepogoda',
          en: 'Fire, flood, or other disaster',
        },
        icon: 'flame',
      },
      {
        val: 'preselio',
        label: {
          sr: 'Preselio/la sam iz inostranstva u Srbiju',
          en: 'I moved from abroad to Serbia',
        },
        icon: 'plane-landing',
      },
    ],
  },
  {
    id: 'posebne',
    q: {
      sr: 'Da li se odnosi na vas ili nekog u domaćinstvu?',
      en: 'Does any of this apply to you or someone in the household?',
    },
    hint: {
      sr: 'Ove kategorije otključavaju posebne pakete prava',
      en: 'These categories unlock special bundles of rights',
    },
    type: 'multi',
    options: [
      {
        val: 'nista',
        label: { sr: 'Ništa od navedenog', en: 'None of the above' },
        icon: 'x',
        exclusive: true,
      },
      {
        val: 'borac',
        label: {
          sr: 'Borac ili veteran (JNA, ratovi 90-ih)',
          en: 'Combatant or veteran (JNA, 1990s wars)',
        },
        icon: 'medal',
      },
      {
        val: 'porodica_palog_borca',
        label: { sr: 'Porodica palog borca', en: 'Family of a fallen combatant' },
        icon: 'medal',
      },
      {
        val: 'izbeglica',
        label: {
          sr: 'Izbeglica ili interno raseljeno lice',
          en: 'Refugee or internally displaced person',
        },
        icon: 'luggage',
      },
      {
        val: 'hraniteljska_porodica',
        label: {
          sr: 'Hraniteljska porodica (ili bi htela da postane)',
          en: 'Foster family (or applying to become one)',
        },
        icon: 'home',
      },
      {
        val: 'parcela',
        label: {
          sr: 'Vlasništvo poljoprivredne parcele (i mala)',
          en: 'Ownership of an agricultural plot (even small)',
        },
        icon: 'sprout',
      },
      {
        val: 'pcele',
        label: {
          sr: 'Posedovanje košnica (i mali pčelari)',
          en: 'Beekeeping (also small-scale)',
        },
        icon: 'bug',
      },
      {
        val: 'dijaspora',
        label: {
          sr: 'Radio/la sam u inostranstvu (DE, AT, SE...)',
          en: 'I worked abroad (DE, AT, SE...)',
        },
        icon: 'globe',
      },
    ],
  },
];

export const TOTAL_STEPS = WIZARD_STEPS.length;
