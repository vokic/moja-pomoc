import type { Profile } from '@/types';

export type WizardOption = {
  val: string;
  label: string;
  icon: string;
  exclusive?: boolean;
};

export type WizardStepDef = {
  id: keyof Profile;
  q: string;
  hint?: string;
  type: 'single' | 'multi';
  options: WizardOption[];
};

export const WIZARD_STEPS: WizardStepDef[] = [
  {
    id: 'starost',
    q: 'Koliko godina imate?',
    hint: 'Različita prava važe za različite starosne grupe',
    type: 'single',
    options: [
      { val: 'mladi', label: 'Do 30 godina', icon: 'user' },
      { val: 'srednji', label: '30 – 50 godina', icon: 'user' },
      { val: 'stariji', label: '50 – 65 godina', icon: 'user' },
      { val: 'penzioner', label: 'Preko 65 godina (ili penzioner)', icon: 'user-heart' },
    ],
  },
  {
    id: 'pol',
    q: 'Pol',
    hint: 'Neka prava su specifična za žene (IVF, skrining, porodiljsko)',
    type: 'single',
    options: [
      { val: 'z', label: 'Žena', icon: 'venus' },
      { val: 'm', label: 'Muškarac', icon: 'mars' },
      { val: 'preskoci', label: 'Ne želim da odgovorim', icon: 'arrow-right' },
    ],
  },
  {
    id: 'domacinstvo',
    q: 'Kako biste opisali svoje domaćinstvo?',
    hint: 'Različita prava važe za različite porodične situacije',
    type: 'single',
    options: [
      { val: 'sam', label: 'Živim sam/a', icon: 'user' },
      { val: 'partner', label: 'Sa partnerom/kom, bez dece', icon: 'users' },
      { val: 'porodica', label: 'Sa partnerom/kom i decom', icon: 'users' },
      { val: 'samohrani', label: 'Samohrani roditelj sa decom', icon: 'user-heart' },
      { val: 'sa_roditeljima', label: 'Sa roditeljima/rodbinom', icon: 'home' },
      { val: 'mesoviti', label: 'Više generacija u domaćinstvu', icon: 'home' },
    ],
  },
  {
    id: 'deca',
    q: 'Imate li dece (rođene ili usvojene)?',
    hint: 'Označite sve što važi',
    type: 'multi',
    options: [
      { val: 'nema', label: 'Nemam decu', icon: 'x', exclusive: true },
      { val: 'beba', label: 'Bebu (do 1 godine)', icon: 'baby' },
      { val: 'predskolsko', label: 'Predškolskog uzrasta (1-6 g)', icon: 'baby' },
      { val: 'osnovac', label: 'Školarca (7-14 g)', icon: 'school' },
      { val: 'srednjoskolac', label: 'Srednjoškolca (15-18 g)', icon: 'school' },
      { val: 'student', label: 'Studenta', icon: 'graduation-cap' },
      {
        val: 'punoletno_zdravstveno',
        label: 'Punoletno dete sa zdravstvenim problemima',
        icon: 'heart-pulse',
      },
      {
        val: 'smetnje',
        label: 'Dete sa smetnjama u razvoju ili invaliditetom',
        icon: 'accessibility',
      },
    ],
  },
  {
    id: 'zaposlenje',
    q: 'Vaš trenutni radni status',
    hint: 'Određuje pristup naknadama, subvencijama i programima',
    type: 'single',
    options: [
      { val: 'zaposlen', label: 'Zaposlen/a (ugovor o radu)', icon: 'briefcase' },
      { val: 'preduzetnik', label: 'Preduzetnik / paušalac', icon: 'store' },
      { val: 'poljoprivrednik', label: 'Registrovani poljoprivrednik', icon: 'sprout' },
      { val: 'nezaposlen', label: 'Nezaposlen/a (sa NSZ prijavom)', icon: 'user-search' },
      {
        val: 'nezaposlen_neprijavljen',
        label: 'Nezaposlen/a (bez NSZ prijave)',
        icon: 'user-search',
      },
      { val: 'student', label: 'Student/kinja', icon: 'graduation-cap' },
      { val: 'penzioner', label: 'Penzioner/ka', icon: 'user-heart' },
      { val: 'na_bolovanju', label: 'Na bolovanju ili porodiljskom', icon: 'cross' },
    ],
  },
  {
    id: 'primanja',
    q: 'Mesečna primanja po članu domaćinstva',
    hint: 'Sva primanja u domaćinstvu / broj članova. Procena je dovoljna.',
    type: 'single',
    options: [
      { val: 'vrlo_niska', label: 'Manje od 15.000 RSD', icon: 'coins' },
      { val: 'niska', label: '15.000 – 30.000 RSD', icon: 'coins' },
      { val: 'srednja', label: '30.000 – 50.000 RSD', icon: 'coins' },
      { val: 'visa', label: '50.000 – 100.000 RSD', icon: 'coins' },
      { val: 'visoka', label: 'Preko 100.000 RSD', icon: 'coins' },
      { val: 'preskoci', label: 'Ne želim da odgovorim', icon: 'arrow-right' },
    ],
  },
  {
    id: 'zdravlje',
    q: 'Da li vi ili neko u domaćinstvu ima zdravstveni izazov?',
    hint: 'Označite sve što važi. Najveći broj propuštenih prava je u ovoj kategoriji.',
    type: 'multi',
    options: [
      {
        val: 'nista',
        label: 'Niko u domaćinstvu nema značajne zdravstvene probleme',
        icon: 'heart',
        exclusive: true,
      },
      {
        val: 'hronicno',
        label: 'Hronična bolest (dijabetes, hipertenzija, KOPB, srčana)',
        icon: 'heart-pulse',
      },
      {
        val: 'onkologija',
        label: 'Onkološka bolest (aktivna ili oporavak)',
        icon: 'cross',
      },
      { val: 'dijaliza', label: 'Dijaliza ili transplantacija', icon: 'droplet' },
      {
        val: 'mentalno',
        label: 'Mentalno zdravlje (anksioznost, depresija, druge dijagnoze)',
        icon: 'brain',
      },
      { val: 'invaliditet', label: 'Telesno oštećenje ili invaliditet', icon: 'accessibility' },
      { val: 'cula', label: 'Oštećenje vida ili sluha', icon: 'eye' },
      {
        val: 'tudja_nega',
        label: 'Neko u porodici treba tuđu negu i pomoć',
        icon: 'hand-helping',
      },
      { val: 'autoimuna', label: 'Autoimuna bolest', icon: 'shield' },
    ],
  },
  {
    id: 'situacija',
    q: 'Da li ste se nedavno našli u nekoj od ovih situacija?',
    hint: 'Označite sve što važi. Ova prava se najviše propuštaju zbog rokova.',
    type: 'multi',
    options: [
      { val: 'nista', label: 'Ništa od navedenog', icon: 'x', exclusive: true },
      {
        val: 'rodjeno_dete',
        label: 'Rodilo se dete (u poslednjih godinu dana)',
        icon: 'baby',
      },
      { val: 'smrt_porodice', label: 'Umro je član porodice', icon: 'cross' },
      { val: 'razvod', label: 'Razvod ili razdvajanje', icon: 'heart-crack' },
      {
        val: 'izgubio_posao',
        label: 'Izgubio/la sam posao u poslednjih 6 meseci',
        icon: 'briefcase',
      },
      { val: 'nasilje', label: 'Iskusio/la sam porodično nasilje', icon: 'triangle-alert' },
      {
        val: 'pozar_poplava',
        label: 'Požar, poplava ili druga nepogoda',
        icon: 'flame',
      },
      {
        val: 'preselio',
        label: 'Preselio/la sam iz inostranstva u Srbiju',
        icon: 'plane-landing',
      },
    ],
  },
  {
    id: 'posebne',
    q: 'Da li se odnosi na vas ili nekog u domaćinstvu?',
    hint: 'Ove kategorije otključavaju posebne pakete prava',
    type: 'multi',
    options: [
      { val: 'nista', label: 'Ništa od navedenog', icon: 'x', exclusive: true },
      { val: 'borac', label: 'Borac ili veteran (JNA, ratovi 90-ih)', icon: 'medal' },
      { val: 'porodica_palog_borca', label: 'Porodica palog borca', icon: 'medal' },
      { val: 'izbeglica', label: 'Izbeglica ili interno raseljeno lice', icon: 'luggage' },
      {
        val: 'hraniteljska_porodica',
        label: 'Hraniteljska porodica (ili bi htela da postane)',
        icon: 'home',
      },
      {
        val: 'parcela',
        label: 'Vlasništvo poljoprivredne parcele (i mala)',
        icon: 'sprout',
      },
      { val: 'pcele', label: 'Posedovanje košnica (i mali pčelari)', icon: 'bug' },
      {
        val: 'dijaspora',
        label: 'Radio/la sam u inostranstvu (DE, AT, SE...)',
        icon: 'globe',
      },
    ],
  },
];

export const TOTAL_STEPS = WIZARD_STEPS.length;
