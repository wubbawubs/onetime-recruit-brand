import { allCandidates } from './mockCandidatesData';

export interface TimeToHireData {
  avgDays: number;
  minDays: number;
  maxDays: number;
  targetDays: number;
  bySource: { source: string; avgDays: number; hires: number }[];
  byVacancy: { vacancy: string; avgDays: number; hires: number }[];
}

export interface FunnelData {
  stages: { name: string; count: number; conversionPct: number }[];
  totalIn: number;
  totalHired: number;
  overallConversion: number;
}

export interface TimeInStageData {
  stages: { name: string; avgDays: number; targetDays: number; isBottleneck: boolean }[];
  bottleneck: { stage: string; delay: number };
}

export interface SourceEffectivenessData {
  sources: {
    name: string;
    candidates: number;
    interviews: number;
    hires: number;
    conversionPct: number;
  }[];
}

export interface VacancyReportData {
  id: string;
  title: string;
  timeToFill: number;
  targetDays: number;
  status: 'op_koers' | 'risico' | 'kritiek';
  funnel: { stage: string; count: number }[];
  instroom: { total: number; period: string; bySource: { source: string; count: number }[] };
  healthScore: number;
  advice: string;
}

export interface ReportsOverview {
  timeToHire: TimeToHireData;
  funnel: FunnelData;
  timeInStage: TimeInStageData;
  sourceEffectiveness: SourceEffectivenessData;
}

// Helper function to calculate time to hire metrics
export function calculateTimeToHire(): TimeToHireData {
  // Mock data based on realistic recruitment metrics
  return {
    avgDays: 29,
    minDays: 14,
    maxDays: 52,
    targetDays: 35,
    bySource: [
      { source: 'Website', avgDays: 26, hires: 3 },
      { source: 'LinkedIn', avgDays: 32, hires: 1 },
      { source: 'Referral', avgDays: 21, hires: 2 },
      { source: 'Indeed', avgDays: 38, hires: 0 },
    ],
    byVacancy: [
      { vacancy: 'Senior Accountmanager B2B', avgDays: 32, hires: 1 },
      { vacancy: 'Office Manager', avgDays: 24, hires: 2 },
      { vacancy: 'Frontend Developer', avgDays: 28, hires: 1 },
    ],
  };
}

// Helper function to calculate funnel conversion
export function calculateFunnelConversion(): FunnelData {
  const stages = [
    { name: 'Nieuw', count: 42, conversionPct: 100 },
    { name: 'Eerste gesprek', count: 18, conversionPct: 43 },
    { name: 'Tweede gesprek', count: 8, conversionPct: 44 },
    { name: 'Aanbod', count: 5, conversionPct: 63 },
    { name: 'Hired', count: 4, conversionPct: 80 },
  ];

  return {
    stages,
    totalIn: 42,
    totalHired: 4,
    overallConversion: 9.5,
  };
}

// Helper function to calculate time in stage
export function calculateTimeInStage(): TimeInStageData {
  const stages = [
    { name: 'Nieuw', avgDays: 3.2, targetDays: 5, isBottleneck: false },
    { name: 'Eerste gesprek', avgDays: 5.8, targetDays: 4, isBottleneck: true },
    { name: 'Tweede gesprek', avgDays: 2.4, targetDays: 5, isBottleneck: false },
    { name: 'Aanbod', avgDays: 4.1, targetDays: 7, isBottleneck: false },
  ];

  return {
    stages,
    bottleneck: { stage: 'Eerste gesprek', delay: 1.8 },
  };
}

// Helper function to calculate source effectiveness
export function calculateSourceEffectiveness(): SourceEffectivenessData {
  return {
    sources: [
      { name: 'Website', candidates: 18, interviews: 8, hires: 3, conversionPct: 17 },
      { name: 'LinkedIn', candidates: 12, interviews: 5, hires: 1, conversionPct: 8 },
      { name: 'Referral', candidates: 8, interviews: 4, hires: 2, conversionPct: 25 },
      { name: 'Indeed', candidates: 4, interviews: 1, hires: 0, conversionPct: 0 },
    ],
  };
}

// Get full reports overview
export function getReportsOverview(): ReportsOverview {
  return {
    timeToHire: calculateTimeToHire(),
    funnel: calculateFunnelConversion(),
    timeInStage: calculateTimeInStage(),
    sourceEffectiveness: calculateSourceEffectiveness(),
  };
}

// Get vacancy-specific report data
export function getVacancyReport(vacancyId: string): VacancyReportData {
  const vacancyReports: Record<string, VacancyReportData> = {
    'vac-001': {
      id: 'vac-001',
      title: 'Senior Accountmanager B2B',
      timeToFill: 32,
      targetDays: 35,
      status: 'op_koers',
      funnel: [
        { stage: 'Nieuw', count: 8 },
        { stage: 'Eerste gesprek', count: 4 },
        { stage: 'Tweede gesprek', count: 2 },
        { stage: 'Aanbod', count: 1 },
        { stage: 'Hired', count: 1 },
      ],
      instroom: {
        total: 21,
        period: '14 dagen',
        bySource: [
          { source: 'Website', count: 9 },
          { source: 'LinkedIn', count: 7 },
          { source: 'Referral', count: 5 },
        ],
      },
      healthScore: 78,
      advice: 'Instroom is stabiel. Focus op snellere opvolging in eerste gesprek fase om doorlooptijd te verkorten.',
    },
    'vac-002': {
      id: 'vac-002',
      title: 'Office Manager',
      timeToFill: 24,
      targetDays: 28,
      status: 'op_koers',
      funnel: [
        { stage: 'Nieuw', count: 5 },
        { stage: 'Eerste gesprek', count: 3 },
        { stage: 'Tweede gesprek', count: 2 },
        { stage: 'Aanbod', count: 2 },
        { stage: 'Hired', count: 2 },
      ],
      instroom: {
        total: 15,
        period: '14 dagen',
        bySource: [
          { source: 'Website', count: 8 },
          { source: 'Indeed', count: 4 },
          { source: 'Referral', count: 3 },
        ],
      },
      healthScore: 85,
      advice: 'Uitstekende conversie. Proces loopt goed, houd huidige tempo aan.',
    },
    'vac-003': {
      id: 'vac-003',
      title: 'Frontend Developer',
      timeToFill: 45,
      targetDays: 35,
      status: 'risico',
      funnel: [
        { stage: 'Nieuw', count: 12 },
        { stage: 'Eerste gesprek', count: 5 },
        { stage: 'Tweede gesprek', count: 2 },
        { stage: 'Aanbod', count: 0 },
        { stage: 'Hired', count: 0 },
      ],
      instroom: {
        total: 12,
        period: '14 dagen',
        bySource: [
          { source: 'LinkedIn', count: 6 },
          { source: 'Website', count: 4 },
          { source: 'Referral', count: 2 },
        ],
      },
      healthScore: 52,
      advice: 'Doorlooptijd boven target. Bottleneck in tweede gesprek fase. Overweeg extra interviewslots.',
    },
  };

  return vacancyReports[vacancyId] || vacancyReports['vac-001'];
}

// Get all vacancies for dropdown
export function getAllVacanciesForReport(): { id: string; title: string }[] {
  return [
    { id: 'vac-001', title: 'Senior Accountmanager B2B' },
    { id: 'vac-002', title: 'Office Manager' },
    { id: 'vac-003', title: 'Frontend Developer' },
  ];
}
