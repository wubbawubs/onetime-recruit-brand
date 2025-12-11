export interface AccountSettings {
  name: string;
  role: string;
  email: string;
  avatar?: string;
  language: 'nl' | 'en';
  timezone: string;
  notifications: {
    newCandidates: boolean;
    scheduledMeetings: boolean;
    dailySummary: boolean;
  };
}

export interface OrganizationSettings {
  companyName: string;
  logo?: string;
  primaryColor: string;
  emailSenderName: string;
  jobsSiteSubdomain: string;
  defaultLanguage: 'nl' | 'en';
}

export interface PipelineStage {
  id: string;
  defaultLabel: string;
  customLabel: string;
  targetDays: number;
}

export interface RecruitmentSettings {
  stages: PipelineStage[];
  targets: {
    timeToHireDays: number;
    responseTimeDays: number;
  };
}

export interface PrivacySettings {
  retentionPeriodMonths: number;
  consentText: string;
  deletionMode: 'delete' | 'anonymize';
}

export interface IntegrationSettings {
  email: {
    method: 'onetime' | 'smtp' | 'microsoft' | 'google';
    configured: boolean;
  };
  calendar: {
    connected: boolean;
    provider?: string;
  };
  api: {
    enabled: boolean;
    tier: 'free' | 'pro' | 'enterprise';
  };
}

// Mock data
export const mockAccountSettings: AccountSettings = {
  name: 'Juliëtte Welten',
  role: 'Recruitment Manager',
  email: 'juliette@onetimerooted.nl',
  avatar: undefined,
  language: 'nl',
  timezone: 'Europe/Amsterdam',
  notifications: {
    newCandidates: true,
    scheduledMeetings: false,
    dailySummary: true,
  },
};

export const mockOrganizationSettings: OrganizationSettings = {
  companyName: 'ABC Recruitment B.V.',
  logo: undefined,
  primaryColor: '#10b981',
  emailSenderName: 'ABC Recruitment',
  jobsSiteSubdomain: 'abc-recruitment',
  defaultLanguage: 'nl',
};

export const mockRecruitmentSettings: RecruitmentSettings = {
  stages: [
    { id: 'new', defaultLabel: 'Nieuw', customLabel: 'Nieuw', targetDays: 3 },
    { id: 'first-interview', defaultLabel: 'Eerste gesprek', customLabel: 'Telefonisch', targetDays: 4 },
    { id: 'second-interview', defaultLabel: 'Tweede gesprek', customLabel: 'Op locatie', targetDays: 5 },
    { id: 'offer', defaultLabel: 'Aanbod', customLabel: 'Aanbod', targetDays: 3 },
    { id: 'hired', defaultLabel: 'In dienst', customLabel: 'Aangenomen', targetDays: 0 },
  ],
  targets: {
    timeToHireDays: 35,
    responseTimeDays: 2,
  },
};

export const mockPrivacySettings: PrivacySettings = {
  retentionPeriodMonths: 12,
  consentText: 'Ik geef toestemming om mijn gegevens gedurende [X] maanden te bewaren voor toekomstige vacatures bij deze organisatie.',
  deletionMode: 'anonymize',
};

export const mockIntegrationSettings: IntegrationSettings = {
  email: {
    method: 'onetime',
    configured: true,
  },
  calendar: {
    connected: false,
    provider: undefined,
  },
  api: {
    enabled: false,
    tier: 'free',
  },
};

// Timezone options
export const timezoneOptions = [
  { value: 'Europe/Amsterdam', label: 'Europe/Amsterdam (CET)' },
  { value: 'Europe/London', label: 'Europe/London (GMT)' },
  { value: 'Europe/Berlin', label: 'Europe/Berlin (CET)' },
  { value: 'Europe/Paris', label: 'Europe/Paris (CET)' },
  { value: 'America/New_York', label: 'America/New York (EST)' },
];

// Retention period options
export const retentionOptions = [
  { value: 6, label: '6 maanden' },
  { value: 12, label: '12 maanden' },
  { value: 24, label: '24 maanden' },
  { value: 36, label: 'Aangepast (36 maanden)' },
];
