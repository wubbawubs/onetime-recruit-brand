export interface CandidateListItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  currentStage: string;
  currentVacancy: string;
  vacancyId: string;
  partnerId: string; // Which partner/client this candidate belongs to (via vacancy)
  score?: number;
  tags: string[];
  addedDate: string;
  lastActivityDate: string;
  daysInStage: number;
  isRejected?: boolean; // Candidate has been rejected
  rejectedDate?: string; // When the candidate was rejected
}

export const allCandidates: CandidateListItem[] = [
  {
    id: "c1",
    name: "Jan Jansen",
    email: "jan.jansen@email.nl",
    phone: "+31 6 12345678",
    source: "LinkedIn",
    currentStage: "Nieuw",
    currentVacancy: "Senior Developer",
    vacancyId: "vac_senior_developer",
    partnerId: "partner-marketingbureau",
    tags: ["Ervaren", "Tech"],
    addedDate: "2024-01-10",
    lastActivityDate: "2024-01-10",
    daysInStage: 1,
  },
  {
    id: "c2",
    name: "Maria de Vries",
    email: "maria.devries@email.nl",
    phone: "+31 6 23456789",
    source: "Website",
    currentStage: "Nieuw",
    currentVacancy: "Senior Developer",
    vacancyId: "vac_senior_developer",
    partnerId: "partner-marketingbureau",
    tags: ["Junior"],
    addedDate: "2024-01-09",
    lastActivityDate: "2024-01-09",
    daysInStage: 2,
  },
  {
    id: "c3",
    name: "Peter van den Berg",
    email: "peter.vdberg@email.nl",
    phone: "+31 6 34567890",
    source: "LinkedIn",
    currentStage: "Nieuw",
    currentVacancy: "Senior Accountmanager B2B",
    vacancyId: "vac_senior_accountmanager",
    partnerId: "partner-techbedrijf",
    tags: ["Sales", "Ervaren"],
    addedDate: "2024-01-08",
    lastActivityDate: "2024-01-10",
    daysInStage: 3,
  },
  {
    id: "c4",
    name: "Sophie Bakker",
    email: "sophie.bakker@email.nl",
    phone: "+31 6 45678901",
    source: "Referral",
    currentStage: "Nieuw",
    currentVacancy: "Office Manager",
    vacancyId: "vac_office_manager",
    partnerId: "partner-techbedrijf",
    tags: ["Admin"],
    addedDate: "2024-01-07",
    lastActivityDate: "2024-01-08",
    daysInStage: 4,
  },
  {
    id: "c5",
    name: "Thomas Visser",
    email: "thomas.visser@email.nl",
    phone: "+31 6 56789012",
    source: "Indeed",
    currentStage: "Nieuw",
    currentVacancy: "Customer Success Manager",
    vacancyId: "vac_customer_success",
    partnerId: "partner-financials",
    tags: ["Tech"],
    addedDate: "2024-01-06",
    lastActivityDate: "2024-01-06",
    daysInStage: 5,
  },
  {
    id: "c6",
    name: "Emma Mulder",
    email: "emma.mulder@email.nl",
    phone: "+31 6 67890123",
    source: "Website",
    currentStage: "Eerste gesprek",
    currentVacancy: "Senior Developer",
    vacancyId: "vac_senior_developer",
    partnerId: "partner-marketingbureau",
    score: 7.2,
    tags: ["Tech", "Ervaren"],
    addedDate: "2024-01-05",
    lastActivityDate: "2024-01-09",
    daysInStage: 3,
  },
  {
    id: "c7",
    name: "Lucas Bos",
    email: "lucas.bos@email.nl",
    phone: "+31 6 78901234",
    source: "LinkedIn",
    currentStage: "Eerste gesprek",
    currentVacancy: "Senior Accountmanager B2B",
    vacancyId: "vac_senior_accountmanager",
    partnerId: "partner-techbedrijf",
    score: 8.1,
    tags: ["Sales"],
    addedDate: "2024-01-04",
    lastActivityDate: "2024-01-08",
    daysInStage: 6,
  },
  {
    id: "c8",
    name: "Anna de Groot",
    email: "anna.degroot@email.nl",
    phone: "+31 6 89012345",
    source: "Website",
    currentStage: "Eerste gesprek",
    currentVacancy: "Office Manager",
    vacancyId: "vac_office_manager",
    partnerId: "partner-techbedrijf",
    score: 6.8,
    tags: ["Admin", "Junior"],
    addedDate: "2024-01-03",
    lastActivityDate: "2024-01-07",
    daysInStage: 4,
  },
  {
    id: "c9",
    name: "David van Dijk",
    email: "david.vandijk@email.nl",
    phone: "+31 6 90123456",
    source: "LinkedIn",
    currentStage: "Tweede gesprek",
    currentVacancy: "Senior Developer",
    vacancyId: "vac_senior_developer",
    partnerId: "partner-marketingbureau",
    score: 8.5,
    tags: ["Tech", "Ervaren"],
    addedDate: "2024-01-02",
    lastActivityDate: "2024-01-10",
    daysInStage: 4,
  },
  {
    id: "c10",
    name: "Lisa Vermeer",
    email: "lisa.vermeer@email.nl",
    phone: "+31 6 01234567",
    source: "Website",
    currentStage: "Tweede gesprek",
    currentVacancy: "Sales Representative",
    vacancyId: "vac_sales_rep",
    partnerId: "partner-financials",
    score: 7.8,
    tags: ["Sales", "Ervaren"],
    addedDate: "2024-01-01",
    lastActivityDate: "2024-01-09",
    daysInStage: 3,
  },
  {
    id: "c11",
    name: "Mark de Jong",
    email: "mark.dejong@email.nl",
    phone: "+31 6 11223344",
    source: "Referral",
    currentStage: "Aanbod",
    currentVacancy: "Senior Accountmanager B2B",
    vacancyId: "vac_senior_accountmanager",
    partnerId: "partner-techbedrijf",
    score: 9.1,
    tags: ["Tech", "Ervaren"],
    addedDate: "2023-12-28",
    lastActivityDate: "2024-01-10",
    daysInStage: 4,
  },
  {
    id: "c12",
    name: "Eva Hendriks",
    email: "eva.hendriks@email.nl",
    phone: "+31 6 22334455",
    source: "LinkedIn",
    currentStage: "In dienst",
    currentVacancy: "Marketing Manager",
    vacancyId: "vac_marketing_manager",
    partnerId: "partner-marketingbureau",
    score: 8.7,
    tags: ["Admin", "Ervaren"],
    addedDate: "2023-12-20",
    lastActivityDate: "2024-01-05",
    daysInStage: 10,
  },
  {
    id: "c13",
    name: "Daan Smit",
    email: "daan.smit@email.nl",
    phone: "+31 6 33445566",
    source: "Indeed",
    currentStage: "In dienst",
    currentVacancy: "Customer Success Manager",
    vacancyId: "vac_customer_success",
    partnerId: "partner-financials",
    score: 8.2,
    tags: ["Sales"],
    addedDate: "2023-12-15",
    lastActivityDate: "2024-01-03",
    daysInStage: 15,
  },
  {
    id: "c14",
    name: "Kim van Leeuwen",
    email: "kim.vanleeuwen@email.nl",
    phone: "+31 6 44556677",
    source: "LinkedIn",
    currentStage: "Nieuw",
    currentVacancy: "Sales Representative",
    vacancyId: "vac_sales_rep",
    partnerId: "partner-financials",
    tags: ["Sales"],
    addedDate: "2024-01-11",
    lastActivityDate: "2024-01-11",
    daysInStage: 1,
  },
  {
    id: "c15",
    name: "Sanne Kuijpers",
    email: "sanne.kuijpers@email.nl",
    phone: "+31 6 55667788",
    source: "Website",
    currentStage: "Eerste gesprek",
    currentVacancy: "Customer Success Manager",
    vacancyId: "vac_customer_success",
    partnerId: "partner-financials",
    score: 7.5,
    tags: ["Service"],
    addedDate: "2024-01-03",
    lastActivityDate: "2024-01-10",
    daysInStage: 5,
  },
];

export const stages = [
  { id: "all", label: "Alle" },
  { id: "nieuw", label: "Nieuw" },
  { id: "eerste-gesprek", label: "Eerste gesprek" },
  { id: "tweede-gesprek", label: "Tweede gesprek" },
  { id: "aanbod", label: "Aanbod" },
  { id: "in-dienst", label: "In dienst" },
  { id: "afgewezen", label: "Afgewezen" },
];

export const sources = ["LinkedIn", "Website", "Referral", "Indeed"];

export const availableTags = ["Ervaren", "Junior", "Tech", "Sales", "Admin"];

export const vacancies = [
  { id: "v1", title: "Senior Developer" },
  { id: "v2", title: "Accountmanager" },
  { id: "v3", title: "Office Manager" },
];

export function getStageCounts(candidates: CandidateListItem[]) {
  const counts: Record<string, number> = { all: candidates.length };
  
  candidates.forEach((c) => {
    const stageKey = c.currentStage.toLowerCase().replace(" ", "-");
    counts[stageKey] = (counts[stageKey] || 0) + 1;
  });
  
  return counts;
}

export interface GlobalPipelineStage {
  id: string;
  name: string;
  candidates: CandidateListItem[];
  avgDays: number;
}

export function getCandidatesGroupedByStage(candidates: CandidateListItem[]): GlobalPipelineStage[] {
  const stageNames = ["Nieuw", "Eerste gesprek", "Tweede gesprek", "Aanbod", "In dienst"];
  
  // Filter out rejected candidates from pipeline view
  const activeCandidates = candidates.filter(c => !c.isRejected);
  
  return stageNames.map((name, index) => {
    const stageCandidates = activeCandidates.filter(c => c.currentStage === name);
    const avgDays = stageCandidates.length > 0
      ? Math.round((stageCandidates.reduce((sum, c) => sum + c.daysInStage, 0) / stageCandidates.length) * 10) / 10
      : 0;
    
    return {
      id: `stage-${index}`,
      name,
      candidates: stageCandidates,
      avgDays,
    };
  });
}

export function getGlobalBottleneck(stages: GlobalPipelineStage[]): { stage: string; avgDays: number; impact: number } | null {
  const targetDays: Record<string, number> = {
    "Nieuw": 3,
    "Eerste gesprek": 5,
    "Tweede gesprek": 4,
    "Aanbod": 3,
    "In dienst": 0,
  };

  let worstStage: { stage: string; avgDays: number; impact: number } | null = null;

  stages.forEach((stage) => {
    if (stage.name === "In dienst" || stage.candidates.length === 0) return;
    
    const target = targetDays[stage.name] || 3;
    const delay = stage.avgDays - target;
    
    if (delay > 0 && (!worstStage || delay > worstStage.impact)) {
      worstStage = {
        stage: stage.name,
        avgDays: stage.avgDays,
        impact: Math.round(delay * 1.5 * 10) / 10, // Projected total pipeline impact
      };
    }
  });

  return worstStage;
}
