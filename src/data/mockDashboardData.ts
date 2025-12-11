export interface HeroInsight {
  text: string;
  hasBottleneck: boolean;
}

export interface AttentionItem {
  id: string;
  urgency: "high" | "medium" | "low";
  label: string;
  impact: string;
  ctaLabel: string;
}

export interface JobStatus {
  jobId: string;
  title: string;
  statusLabel: string;
  etaLabel: string;
  riskLevel: "low" | "medium" | "high";
  nextAction: string;
}

export interface PipelineStage {
  stageName: string;
  count: number;
}

export interface ProcessQuality {
  score: number;
  avgResponseTimeDays: number;
  pctWithin48h: number;
  staleCandidatesCount: number;
  text: string;
}

export interface Last7Days {
  newApplications: number;
  movedForward: number;
  hires: number;
  droppedOut: number;
  text: string;
}

export interface DashboardSummary {
  heroInsight: HeroInsight;
  summaryText: string;
  todayAttention: AttentionItem[];
  jobsStatus: JobStatus[];
  pipelineSummary: {
    totalActive: number;
    perStage: PipelineStage[];
    bottleneckDescription: string;
  };
  processQuality: ProcessQuality;
  last7Days: Last7Days;
}

export const dashboardSummary: DashboardSummary = {
  heroInsight: {
    text: "Je loopt op koers voor 3 van de 4 vacatures. Senior Developer vormt de bottleneck: dit traject staat al 18 dagen stil en vraagt directe opvolging.",
    hasBottleneck: true,
  },
  summaryText: `Je hebt momenteel **4 openstaande vacatures**.

**Accountmanager Binnendienst** beweegt goed door de pipeline: **9 actieve kandidaten** en een verwachte invulling rond **week 3**.

**Sales Support** loopt iets trager, maar ligt nog binnen bereik.

**Senior Developer** vertraagt; er is de afgelopen **18 dagen** geen voortgang geboekt. Dit vraagt deze week aandacht om een groter tijdverlies te voorkomen.`,
  todayAttention: [
    {
      id: "stale_first_interview",
      urgency: "high",
      label: '3 kandidaten wachten al langer dan 5 dagen op reactie in "Eerste gesprek".',
      impact: "Opvolgen voorkomt afhakers.",
      ctaLabel: "Kandidaten bekijken",
    },
    {
      id: "pending_offer",
      urgency: "high",
      label: "1 aanbod ligt al 4 dagen open zonder terugkoppeling.",
      impact: "Dit verhoogt de kans op afwijzing.",
      ctaLabel: "Aanbod bekijken",
    },
    {
      id: "no_inflow",
      urgency: "medium",
      label: "2 vacatures hebben afgelopen week geen nieuwe kandidaten gekregen.",
      impact: "Check de zichtbaarheid en overweeg extra promotie.",
      ctaLabel: "Vacatures openen",
    },
    {
      id: "interview_today",
      urgency: "low",
      label: "Vandaag staat 1 tweede gesprek gepland om 14:00.",
      impact: "Zorg dat de interviewer voorbereid is.",
      ctaLabel: "Planning openen",
    },
  ],
  jobsStatus: [
    {
      jobId: "job_accountmanager",
      title: "Accountmanager Binnendienst",
      statusLabel: "Goede instroom, sterke doorloop. Traject ligt op koers.",
      etaLabel: "± 3 weken",
      riskLevel: "low",
      nextAction: "Blijf ritme houden in de gesprekken.",
    },
    {
      jobId: "job_sales_support",
      title: "Sales Support",
      statusLabel: "Instroom is iets trager, maar nog binnen bereik.",
      etaLabel: "± 4–5 weken",
      riskLevel: "medium",
      nextAction: "Extra zichtbaarheid of kanaal toevoegen kan helpen.",
    },
    {
      jobId: "job_senior_dev",
      title: "Senior Developer",
      statusLabel: "Zeer beperkte instroom; geen updates in 18 dagen.",
      etaLabel: "Onzeker",
      riskLevel: "high",
      nextAction: "Actie nodig: nieuwe kanalen of aangescherpte vacaturetekst.",
    },
    {
      jobId: "job_office_manager",
      title: "Office Manager",
      statusLabel: "Net gestart, eerste kandidaten in review.",
      etaLabel: "± 5–6 weken",
      riskLevel: "medium",
      nextAction: "Monitor de instroom de komende dagen.",
    },
  ],
  pipelineSummary: {
    totalActive: 32,
    perStage: [
      { stageName: "Nieuw", count: 11 },
      { stageName: "Eerste gesprek", count: 7 },
      { stageName: "Tweede gesprek", count: 2 },
      { stageName: "Aanbod", count: 4 },
      { stageName: "In dienst", count: 3 },
    ],
    bottleneckDescription: "De vertraging zit vooral in de stap Nieuw → Eerste gesprek. Een snellere eerste reactie verbetert de doorloop direct.",
  },
  processQuality: {
    score: 84,
    avgResponseTimeDays: 2.1,
    pctWithin48h: 78,
    staleCandidatesCount: 5,
    text: `Je gemiddelde reactietijd is **2,1 dagen**. Dat is acceptabel, maar nog niet optimaal.

**78%** ontvangt binnen **48 uur** een eerste actie — prima, maar er is ruimte voor verbetering.

**5 kandidaten** zitten langer dan een week in dezelfde fase; dit verhoogt de drop-off kans aanzienlijk.`,
  },
  last7Days: {
    newApplications: 21,
    movedForward: 13,
    hires: 2,
    droppedOut: 3,
    text: "Instroom is stabiel; opvolging in *Nieuw* is het belangrijkste verbeterpunt.",
  },
};
