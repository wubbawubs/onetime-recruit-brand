import * as ReactDOMServer from 'react-dom/server';
import * as React from 'react';
import {
  PartnerInviteTemplate,
  ClientInviteTemplate,
  PasswordResetTemplate,
  CandidateUpdateTemplate,
  InterviewInviteTemplate,
  ApplicationReceivedTemplate,
  RejectionTemplate,
} from '@/components/email-templates';
import type {
  PartnerInviteTemplateProps,
  ClientInviteTemplateProps,
  PasswordResetTemplateProps,
  CandidateUpdateTemplateProps,
  InterviewInviteTemplateProps,
  ApplicationReceivedTemplateProps,
  RejectionTemplateProps,
} from '@/components/email-templates';

// Template registry
export const EMAIL_TEMPLATES = {
  'partner-invite': PartnerInviteTemplate,
  'client-invite': ClientInviteTemplate,
  'password-reset': PasswordResetTemplate,
  'candidate-update': CandidateUpdateTemplate,
  'interview-invite': InterviewInviteTemplate,
  'application-received': ApplicationReceivedTemplate,
  'rejection': RejectionTemplate,
} as const;

export type EmailTemplateSlug = keyof typeof EMAIL_TEMPLATES;

// Template metadata with default subjects
export const TEMPLATE_METADATA: Record<EmailTemplateSlug, {
  name: string;
  description: string;
  defaultSubject: string;
  category: 'user' | 'candidate' | 'system';
}> = {
  'partner-invite': {
    name: 'Partner Uitnodiging',
    description: 'Uitnodiging voor nieuwe partner gebruikers',
    defaultSubject: 'Je bent uitgenodigd voor One Rooted',
    category: 'user',
  },
  'client-invite': {
    name: 'Klant Uitnodiging',
    description: 'Uitnodiging voor nieuwe klant gebruikers',
    defaultSubject: 'Toegang tot One Rooted voor {{companyName}}',
    category: 'user',
  },
  'password-reset': {
    name: 'Wachtwoord Reset',
    description: 'Wachtwoord reset link voor gebruikers',
    defaultSubject: 'Wachtwoord resetten - One Rooted',
    category: 'system',
  },
  'candidate-update': {
    name: 'Kandidaat Update',
    description: 'Status update naar kandidaat over hun sollicitatie',
    defaultSubject: 'Update over je sollicitatie voor {{vacancyTitle}}',
    category: 'candidate',
  },
  'interview-invite': {
    name: 'Gesprek Uitnodiging',
    description: 'Uitnodiging voor sollicitatiegesprek',
    defaultSubject: 'Uitnodiging gesprek: {{vacancyTitle}} bij {{companyName}}',
    category: 'candidate',
  },
  'application-received': {
    name: 'Sollicitatie Ontvangen',
    description: 'Bevestiging dat sollicitatie is ontvangen',
    defaultSubject: 'Bedankt voor je sollicitatie - {{vacancyTitle}}',
    category: 'candidate',
  },
  'rejection': {
    name: 'Afwijzing',
    description: 'Afwijzingsbericht naar kandidaat',
    defaultSubject: 'Update over je sollicitatie bij {{companyName}}',
    category: 'candidate',
  },
};

// Props types mapping
export type TemplatePropsMap = {
  'partner-invite': PartnerInviteTemplateProps;
  'client-invite': ClientInviteTemplateProps;
  'password-reset': PasswordResetTemplateProps;
  'candidate-update': CandidateUpdateTemplateProps;
  'interview-invite': InterviewInviteTemplateProps;
  'application-received': ApplicationReceivedTemplateProps;
  'rejection': RejectionTemplateProps;
};

// Mock data for preview
export const TEMPLATE_MOCK_DATA: TemplatePropsMap = {
  'partner-invite': {
    firstName: 'Robin',
    inviterName: 'Juliëtte Welten',
    inviteUrl: 'https://app.onerooted.nl/invite/abc123',
    expiresIn: '7 dagen',
  },
  'client-invite': {
    firstName: 'Luuk',
    companyName: 'TechBedrijf BV',
    partnerName: 'One Rooted',
    inviteUrl: 'https://app.onerooted.nl/invite/xyz789',
  },
  'password-reset': {
    firstName: 'Juliëtte',
    resetUrl: 'https://app.onerooted.nl/reset/def456',
    expiresIn: '1 uur',
  },
  'candidate-update': {
    firstName: 'Emma',
    vacancyTitle: 'Senior Developer',
    companyName: 'TechBedrijf BV',
    newStage: 'Eerste gesprek',
    recruiterName: 'Robin van der Berg',
    recruiterEmail: 'robin@onerooted.nl',
    message: 'We zijn onder de indruk van je profiel en willen je graag uitnodigen voor een kennismakingsgesprek.',
    portalUrl: 'https://app.onerooted.nl/kandidaat/status',
  },
  'interview-invite': {
    firstName: 'Emma',
    vacancyTitle: 'Senior Developer',
    companyName: 'TechBedrijf BV',
    date: 'Donderdag 23 januari 2025',
    time: '14:00',
    duration: '45 minuten',
    locationType: 'online',
    location: 'https://meet.google.com/abc-defg-hij',
    interviewerName: 'Jan de Vries',
    interviewerRole: 'Engineering Manager',
    calendarUrl: 'https://calendar.google.com/calendar/event/abc',
    notes: 'Bereid je voor op vragen over je ervaring met React en TypeScript. Het gesprek is informeel van aard.',
  },
  'application-received': {
    firstName: 'Emma',
    vacancyTitle: 'Senior Developer',
    companyName: 'TechBedrijf BV',
    recruiterName: 'Robin van der Berg',
    recruiterEmail: 'robin@onerooted.nl',
    expectedResponseDays: 5,
    portalUrl: 'https://app.onerooted.nl/kandidaat/sollicitatie',
  },
  'rejection': {
    firstName: 'Emma',
    vacancyTitle: 'Senior Developer',
    companyName: 'TechBedrijf BV',
    recruiterName: 'Robin van der Berg',
    feedbackMessage: 'Je technische vaardigheden zijn sterk, maar we zochten iemand met meer ervaring in team leadership. We raden je aan om te kijken naar projecten waar je leiderschapservaring kunt opdoen.',
    keepInTouch: true,
  },
};

// Render template to HTML string for Resend
export function renderEmailToHtml<T extends EmailTemplateSlug>(
  templateSlug: T,
  props: TemplatePropsMap[T]
): string {
  const Template = EMAIL_TEMPLATES[templateSlug];
  const element = React.createElement(Template as React.ComponentType<TemplatePropsMap[T]>, props);
  const html = ReactDOMServer.renderToStaticMarkup(element);
  
  // Add DOCTYPE for email clients
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n${html}`;
}

// Get subject with variables replaced
export function getEmailSubject<T extends EmailTemplateSlug>(
  templateSlug: T,
  props: TemplatePropsMap[T]
): string {
  let subject = TEMPLATE_METADATA[templateSlug].defaultSubject;
  
  // Replace template variables
  Object.entries(props).forEach(([key, value]) => {
    if (typeof value === 'string') {
      subject = subject.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
  });
  
  return subject;
}

// Get all templates by category
export function getTemplatesByCategory(category: 'user' | 'candidate' | 'system') {
  return Object.entries(TEMPLATE_METADATA)
    .filter(([_, meta]) => meta.category === category)
    .map(([slug, meta]) => ({ slug: slug as EmailTemplateSlug, ...meta }));
}
