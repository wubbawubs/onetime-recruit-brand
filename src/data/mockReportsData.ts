import { allCandidates } from './mockCandidatesData';
import { mockVacancyList } from './mockVacancyData';
import { getPartnerById } from './mockPartnersData';

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
  partnerId: string;
  partnerName: string;
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
export function calculateTimeToHire(partnerId?: string): TimeToHireData {
  // Filter based on partner if provided
  const filteredVacancies = partnerId && partnerId !== 'all'
    ? mockVacancyList.filter(v => v.partnerId === partnerId)
    : mockVacancyList;

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
    byVacancy: filteredVacancies.map(v => ({
      vacancy: v.title,
      avgDays: Math.floor(Math.random() * 20) + 20,
      hires: v.hires,
    })),
  };
}

// Helper function to calculate funnel conversion
export function calculateFunnelConversion(partnerId?: string): FunnelData {
  const filteredCandidates = partnerId && partnerId !== 'all'
    ? allCandidates.filter(c => c.partnerId === partnerId)
    : allCandidates;

  const stageNames = ['Nieuw', 'Eerste gesprek', 'Tweede gesprek', 'Aanbod', 'In dienst'];
  const stages = stageNames.map((name, index) => {
    const count = filteredCandidates.filter(c => c.currentStage === name).length;
    return {
      name,
      count,
      conversionPct: index === 0 ? 100 : 0,
    };
  });

  // Calculate conversions
  for (let i = 1; i < stages.length; i++) {
    if (stages[i - 1].count > 0) {
      stages[i].conversionPct = Math.round((stages[i].count / stages[i - 1].count) * 100);
    }
  }

  const totalIn = stages[0].count;
  const totalHired = stages[stages.length - 1].count;

  return {
    stages,
    totalIn,
    totalHired,
    overallConversion: totalIn > 0 ? Math.round((totalHired / totalIn) * 100 * 10) / 10 : 0,
  };
}

// Helper function to calculate time in stage
export function calculateTimeInStage(partnerId?: string): TimeInStageData {
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
export function calculateSourceEffectiveness(partnerId?: string): SourceEffectivenessData {
  const filteredCandidates = partnerId && partnerId !== 'all'
    ? allCandidates.filter(c => c.partnerId === partnerId)
    : allCandidates;

  const sources = ['Website', 'LinkedIn', 'Referral', 'Indeed'];
  
  return {
    sources: sources.map(sourceName => {
      const candidates = filteredCandidates.filter(c => c.source === sourceName);
      const interviews = candidates.filter(c => ['Eerste gesprek', 'Tweede gesprek', 'Aanbod', 'In dienst'].includes(c.currentStage));
      const hires = candidates.filter(c => c.currentStage === 'In dienst');
      
      return {
        name: sourceName,
        candidates: candidates.length,
        interviews: interviews.length,
        hires: hires.length,
        conversionPct: candidates.length > 0 ? Math.round((hires.length / candidates.length) * 100) : 0,
      };
    }),
  };
}

// Get full reports overview
export function getReportsOverview(partnerId?: string): ReportsOverview {
  return {
    timeToHire: calculateTimeToHire(partnerId),
    funnel: calculateFunnelConversion(partnerId),
    timeInStage: calculateTimeInStage(partnerId),
    sourceEffectiveness: calculateSourceEffectiveness(partnerId),
  };
}

// Get vacancy-specific report data
export function getVacancyReport(vacancyId: string): VacancyReportData {
  const vacancy = mockVacancyList.find(v => v.id === vacancyId);
  const partner = vacancy ? getPartnerById(vacancy.partnerId) : undefined;
  const candidates = allCandidates.filter(c => c.vacancyId === vacancyId);

  const stageNames = ['Nieuw', 'Eerste gesprek', 'Tweede gesprek', 'Aanbod', 'In dienst'];
  const funnel = stageNames.map(stage => ({
    stage,
    count: candidates.filter(c => c.currentStage === stage).length,
  }));

  const sources = [...new Set(candidates.map(c => c.source))];
  const bySource = sources.map(source => ({
    source,
    count: candidates.filter(c => c.source === source).length,
  }));

  const timeToFill = Math.floor(Math.random() * 20) + 20;
  const targetDays = 35;

  return {
    id: vacancyId,
    title: vacancy?.title || 'Onbekende vacature',
    partnerId: vacancy?.partnerId || '',
    partnerName: partner?.name || 'Onbekend',
    timeToFill,
    targetDays,
    status: timeToFill <= targetDays ? 'op_koers' : timeToFill <= targetDays * 1.2 ? 'risico' : 'kritiek',
    funnel,
    instroom: {
      total: candidates.length,
      period: '14 dagen',
      bySource,
    },
    healthScore: Math.floor(Math.random() * 30) + 60,
    advice: vacancy?.status === 'filled' 
      ? 'Deze vacature is succesvol ingevuld.' 
      : 'Instroom is stabiel. Focus op snellere opvolging in eerste gesprek fase om doorlooptijd te verkorten.',
  };
}

// Get all vacancies for dropdown, optionally filtered by partner
export function getAllVacanciesForReport(partnerId?: string): { id: string; title: string; partnerId: string; partnerName: string }[] {
  const filteredVacancies = partnerId && partnerId !== 'all'
    ? mockVacancyList.filter(v => v.partnerId === partnerId)
    : mockVacancyList;

  return filteredVacancies.map(v => {
    const partner = getPartnerById(v.partnerId);
    return {
      id: v.id,
      title: v.title,
      partnerId: v.partnerId,
      partnerName: partner?.name || 'Onbekend',
    };
  });
}
