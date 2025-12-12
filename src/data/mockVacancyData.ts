export interface Candidate {
  id: string;
  name: string;
  initials: string;
  color: string;
  source: string;
  daysInStage: number;
  score?: number;
  lastAction: string;
  notes: number;
}

export interface PipelineStage {
  id: string;
  name: string;
  candidates: Candidate[];
  avgDays: number;
}

export interface ActivityItem {
  id: string;
  type: 'stage_change' | 'new_candidate' | 'published' | 'scorecard' | 'note' | 'email';
  description: string;
  actor?: string;
  timestamp: string;
  relativeTime: string;
}

export interface SourceData {
  name: string;
  candidates: number;
  hires: number;
  conversion: number;
}

export interface VacancyHealth {
  status: 'on_track' | 'risk' | 'critical';
  inflow: 'good' | 'moderate' | 'low';
  throughput: { avgDays: number; targetDays: number };
  responseSpeed: { avgDays: number };
  advice: string;
}

export interface VacancyAction {
  id: string;
  urgency: 'high' | 'medium';
  description: string;
  cta: string;
}

export interface VacancyListItem {
  id: string;
  title: string;
  location: string;
  candidateCount: number;
  hires: number;
  hireGoal: number;
  publishedDate: string;
  status: 'live' | 'draft' | 'paused' | 'closed' | 'filled';
  partnerId: string; // Which partner/client this vacancy belongs to
}

export interface HeroInsight {
  bottleneckStage: string;
  avgDelay: number;
  impactDays: string;
  recommendation: string;
}

export interface VacancyDetail {
  id: string;
  title: string;
  company: string;
  location: string;
  contractType: string;
  status: 'live' | 'draft' | 'paused' | 'closed' | 'filled';
  totalCandidates: number;
  weeksOpen: number;
  lastUpdated: string;
  hires: number;
  hireGoal: number;
  pipeline: PipelineStage[];
  activity: ActivityItem[];
  health: VacancyHealth;
  inflow: {
    last14Days: number;
    sources: SourceData[];
  };
  weekActions: VacancyAction[];
  heroInsight?: HeroInsight;
}

// List of all vacancies for the switcher dropdown
export const mockVacancyList: VacancyListItem[] = [
  { id: 'vac_senior_accountmanager', title: 'Senior Accountmanager B2B', location: 'Utrecht', candidateCount: 32, hires: 2, hireGoal: 3, publishedDate: '2024-12-15', status: 'live', partnerId: 'partner-techbedrijf' },
  { id: 'vac_office_manager', title: 'Office Manager', location: 'Amsterdam', candidateCount: 8, hires: 0, hireGoal: 1, publishedDate: '2024-12-28', status: 'live', partnerId: 'partner-techbedrijf' },
  { id: 'vac_senior_developer', title: 'Senior Developer', location: 'Remote', candidateCount: 14, hires: 1, hireGoal: 2, publishedDate: '2024-11-20', status: 'paused', partnerId: 'partner-marketingbureau' },
  { id: 'vac_customer_success', title: 'Customer Success Manager', location: 'Rotterdam', candidateCount: 21, hires: 0, hireGoal: 2, publishedDate: '2024-12-01', status: 'live', partnerId: 'partner-financials' },
  { id: 'vac_marketing_manager', title: 'Marketing Manager', location: 'Den Haag', candidateCount: 15, hires: 1, hireGoal: 1, publishedDate: '2024-11-10', status: 'filled', partnerId: 'partner-marketingbureau' },
  { id: 'vac_sales_rep', title: 'Sales Representative', location: 'Eindhoven', candidateCount: 28, hires: 0, hireGoal: 3, publishedDate: '2024-12-05', status: 'live', partnerId: 'partner-financials' },
];

export const mockVacancyDetail: VacancyDetail = {
  id: 'vac_senior_accountmanager',
  title: 'Senior Accountmanager B2B',
  company: 'OneTime Rooted',
  location: 'Utrecht',
  contractType: 'Fulltime',
  status: 'live',
  totalCandidates: 32,
  weeksOpen: 4,
  lastUpdated: '2 dagen geleden',
  hires: 2,
  hireGoal: 3,
  pipeline: [
    {
      id: 'new',
      name: 'Nieuw',
      avgDays: 2.3,
      candidates: [
        { id: 'c1', name: 'Jan Jansen', initials: 'JJ', color: 'bg-blue-500', source: 'LinkedIn', daysInStage: 1, score: undefined, lastAction: 'Gisteren', notes: 0 },
        { id: 'c2', name: 'Maria de Vries', initials: 'MV', color: 'bg-purple-500', source: 'Website', daysInStage: 2, score: undefined, lastAction: '2 dagen', notes: 1 },
        { id: 'c3', name: 'Pieter Bakker', initials: 'PB', color: 'bg-green-500', source: 'Referral', daysInStage: 3, score: undefined, lastAction: '3 dagen', notes: 0 },
        { id: 'c4', name: 'Sophie Visser', initials: 'SV', color: 'bg-orange-500', source: 'Indeed', daysInStage: 5, score: undefined, lastAction: '5 dagen', notes: 2 },
        { id: 'c5', name: 'Thomas Smit', initials: 'TS', color: 'bg-teal-500', source: 'LinkedIn', daysInStage: 1, score: undefined, lastAction: 'Vandaag', notes: 0 },
      ],
    },
    {
      id: 'first_interview',
      name: 'Eerste gesprek',
      avgDays: 4.1,
      candidates: [
        { id: 'c6', name: 'Emma Mulder', initials: 'EM', color: 'bg-pink-500', source: 'Website', daysInStage: 3, score: 7.2, lastAction: '3 dagen', notes: 2 },
        { id: 'c7', name: 'Lucas Bos', initials: 'LB', color: 'bg-indigo-500', source: 'LinkedIn', daysInStage: 6, score: 8.1, lastAction: '6 dagen', notes: 1 },
        { id: 'c8', name: 'Anna de Groot', initials: 'AG', color: 'bg-cyan-500', source: 'Referral', daysInStage: 2, score: undefined, lastAction: '2 dagen', notes: 0 },
      ],
    },
    {
      id: 'second_interview',
      name: 'Tweede gesprek',
      avgDays: 3.5,
      candidates: [
        { id: 'c9', name: 'David van Dijk', initials: 'DD', color: 'bg-amber-500', source: 'LinkedIn', daysInStage: 4, score: 8.5, lastAction: '4 dagen', notes: 3 },
        { id: 'c10', name: 'Lisa Vermeer', initials: 'LV', color: 'bg-rose-500', source: 'Website', daysInStage: 1, score: 7.8, lastAction: 'Gisteren', notes: 1 },
      ],
    },
    {
      id: 'offer',
      name: 'Aanbod',
      avgDays: 5.2,
      candidates: [
        { id: 'c11', name: 'Mark de Jong', initials: 'MJ', color: 'bg-emerald-500', source: 'Referral', daysInStage: 4, score: 9.1, lastAction: '4 dagen', notes: 2 },
      ],
    },
    {
      id: 'hired',
      name: 'In dienst',
      avgDays: 0,
      candidates: [
        { id: 'c12', name: 'Kim Peters', initials: 'KP', color: 'bg-sky-500', source: 'LinkedIn', daysInStage: 0, score: 8.7, lastAction: 'Vorige week', notes: 4 },
        { id: 'c13', name: 'Ruben Hendriks', initials: 'RH', color: 'bg-violet-500', source: 'Website', daysInStage: 0, score: 8.9, lastAction: '2 weken', notes: 3 },
      ],
    },
  ],
  activity: [
    { id: 'a1', type: 'stage_change', description: 'Jan Jansen verplaatst naar Nieuw', timestamp: '2024-01-15T10:30:00', relativeTime: 'Vandaag' },
    { id: 'a2', type: 'new_candidate', description: '2 nieuwe sollicitaties ontvangen', timestamp: '2024-01-14T14:00:00', relativeTime: 'Gisteren' },
    { id: 'a3', type: 'stage_change', description: 'Lisa Vermeer verplaatst naar Tweede gesprek', timestamp: '2024-01-14T09:15:00', relativeTime: 'Gisteren' },
    { id: 'a4', type: 'scorecard', description: 'Scorecard ingevuld voor David van Dijk', actor: 'Peter Admin', timestamp: '2024-01-13T16:45:00', relativeTime: 'Maandag' },
    { id: 'a5', type: 'published', description: 'Vacature gepubliceerd op Indeed', timestamp: '2024-01-10T11:00:00', relativeTime: 'Vorige week' },
    { id: 'a6', type: 'note', description: 'Notitie toegevoegd bij Mark de Jong', actor: 'Sarah HR', timestamp: '2024-01-09T13:20:00', relativeTime: 'Vorige week' },
  ],
  health: {
    status: 'on_track',
    inflow: 'good',
    throughput: { avgDays: 29, targetDays: 35 },
    responseSpeed: { avgDays: 2.1 },
    advice: 'De instroom is stabiel, maar kandidaten blijven relatief lang in Nieuw hangen. Snellere eerste reacties verkleinen je risico op afhakers.',
  },
  inflow: {
    last14Days: 21,
    sources: [
      { name: 'Website', candidates: 9, hires: 2, conversion: 22 },
      { name: 'LinkedIn', candidates: 7, hires: 0, conversion: 0 },
      { name: 'Referral', candidates: 5, hires: 1, conversion: 20 },
    ],
  },
  weekActions: [
    { id: 'wa1', urgency: 'high', description: '2 kandidaten wachten al 5+ dagen in Eerste gesprek', cta: 'Naar kandidaten' },
    { id: 'wa2', urgency: 'high', description: '1 scorecard ontbreekt bij kandidaten in Tweede gesprek', cta: 'Scorecards bekijken' },
    { id: 'wa3', urgency: 'medium', description: 'Instroom via jobsite daalde 40%', cta: 'Vacaturetekst checken' },
  ],
  heroInsight: {
    bottleneckStage: 'Nieuw',
    avgDelay: 5,
    impactDays: '4-7 dagen',
    recommendation: 'Snellere opvolging in de Nieuw fase verkort de doorlooptijd significant.',
  },
};
