export interface AttentionItem {
  id: string;
  label: string;
  type: "stale_stage" | "pending_offer" | "no_new_candidates" | "urgent";
}

export interface JobStatus {
  jobId: string;
  title: string;
  statusLabel: string;
  etaLabel: string;
  riskLevel: "low" | "medium" | "high";
}

export interface PipelineStage {
  stageName: string;
  count: number;
}

export interface DashboardSummary {
  summaryText: string;
  todayAttention: AttentionItem[];
  jobsStatus: JobStatus[];
  pipelineSummary: {
    totalActive: number;
    perStage: PipelineStage[];
    bottleneckDescription: string;
  };
  processQuality: {
    avgResponseTimeDays: number;
    pctWithin48h: number;
    staleCandidatesCount: number;
    text: string;
  };
  last7Days: {
    newApplications: number;
    movedForward: number;
    hires: number;
    droppedOut: number;
    text: string;
  };
}

export const dashboardSummary: DashboardSummary = {
  summaryText: `Je hebt op dit moment **4 openstaande vacatures**. Voor **Accountmanager Binnendienst** loopt alles op schema: er zitten **9 kandidaten in proces** en op basis van eerdere trajecten verwachten we een vervulling **binnen ongeveer 3 weken**. Voor **Senior Developer** loopt het risico op vertraging op, omdat er **al 18 dagen niemand naar een volgende stap is gezet**.`,
  todayAttention: [
    {
      id: "1",
      label: '3 kandidaten wachten al langer dan 5 dagen op reactie in "Eerste gesprek".',
      type: "stale_stage",
    },
    {
      id: "2",
      label: "1 aanbod ligt al 4 dagen open zonder terugkoppeling.",
      type: "pending_offer",
    },
    {
      id: "3",
      label: "2 vacatures hebben afgelopen week geen nieuwe kandidaten gekregen.",
      type: "no_new_candidates",
    },
    {
      id: "4",
      label: "Vandaag staat er 1 tweede gesprek gepland om 14:00.",
      type: "urgent",
    },
  ],
  jobsStatus: [
    {
      jobId: "job_1",
      title: "Accountmanager Binnendienst",
      statusLabel: "Voldoende instroom, goede doorloop",
      etaLabel: "± 3 weken",
      riskLevel: "low",
    },
    {
      jobId: "job_2",
      title: "Senior Developer",
      statusLabel: "Weinig instroom, doorloop stagneert",
      etaLabel: "Onzeker",
      riskLevel: "high",
    },
    {
      jobId: "job_3",
      title: "Marketing Manager",
      statusLabel: "Goede instroom, afwachten gesprekken",
      etaLabel: "± 4-5 weken",
      riskLevel: "medium",
    },
    {
      jobId: "job_4",
      title: "Office Manager",
      statusLabel: "Net gestart, nog weinig data",
      etaLabel: "Nog niet te bepalen",
      riskLevel: "medium",
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
    bottleneckDescription: "De meeste vertraging zit nu in de stap Nieuw → Eerste gesprek.",
  },
  processQuality: {
    avgResponseTimeDays: 2.1,
    pctWithin48h: 78,
    staleCandidatesCount: 5,
    text: "Je reageert gemiddeld binnen **2,1 dagen** op nieuwe kandidaten. 78% krijgt binnen 48 uur een eerste actie. Wel aandachtspunt: **5 kandidaten** zitten al langer dan een week in dezelfde fase zonder update.",
  },
  last7Days: {
    newApplications: 21,
    movedForward: 13,
    hires: 2,
    droppedOut: 3,
    text: "In de afgelopen 7 dagen heb je **21 nieuwe sollicitaties** ontvangen, **13 kandidaten** doorgeschoven en **2 hires** afgerond.",
  },
};
