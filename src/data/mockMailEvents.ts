// Mock mail events for recent invites display

export type InviteStatus = 'sent' | 'delivered' | 'failed' | 'pending';

export interface MailEvent {
  id: string;
  email: string;
  template: 'partner_invite' | 'client_invite';
  templateVersion: string;
  status: InviteStatus;
  sentAt: string;
  partnerId: string;
  firstName?: string;
  lastName?: string;
}

export const mockMailEvents: MailEvent[] = [
  {
    id: 'mail-1',
    email: 'sarah@marketingbureau.nl',
    template: 'client_invite',
    templateVersion: '1.0',
    status: 'delivered',
    sentAt: '2024-12-14T10:30:00Z',
    partnerId: 'partner-marketingbureau',
    firstName: 'Sarah',
    lastName: 'de Vries',
  },
  {
    id: 'mail-2',
    email: 'jan@techbedrijf.nl',
    template: 'client_invite',
    templateVersion: '1.0',
    status: 'pending',
    sentAt: '2024-12-13T14:15:00Z',
    partnerId: 'partner-techbedrijf',
    firstName: 'Jan',
    lastName: 'Bakker',
  },
  {
    id: 'mail-3',
    email: 'lisa@onerooted.nl',
    template: 'partner_invite',
    templateVersion: '1.0',
    status: 'delivered',
    sentAt: '2024-12-12T09:00:00Z',
    partnerId: 'partner-otr',
    firstName: 'Lisa',
    lastName: 'van den Berg',
  },
  {
    id: 'mail-4',
    email: 'tom@financialsgroup.nl',
    template: 'client_invite',
    templateVersion: '1.0',
    status: 'failed',
    sentAt: '2024-12-11T16:45:00Z',
    partnerId: 'partner-financials',
    firstName: 'Tom',
    lastName: 'Hendriks',
  },
  {
    id: 'mail-5',
    email: 'emma@techbedrijf.nl',
    template: 'client_invite',
    templateVersion: '1.0',
    status: 'delivered',
    sentAt: '2024-12-10T11:20:00Z',
    partnerId: 'partner-techbedrijf',
    firstName: 'Emma',
    lastName: 'Jansen',
  },
];

export function getRecentInvites(partnerId?: string): MailEvent[] {
  if (!partnerId) return mockMailEvents;
  return mockMailEvents.filter(e => e.partnerId === partnerId);
}

export function getPendingInvitesCount(): number {
  return mockMailEvents.filter(e => e.status === 'pending' || e.status === 'sent').length;
}
