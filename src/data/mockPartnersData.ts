// Multi-tenant data model for OneTimeRooted

export type UserRole = 'admin' | 'partner' | 'client';

export interface Partner {
  id: string;
  name: string;
  type: 'recruitment_agency' | 'client';
  // Voor klanten: aan welke recruitment partner gekoppeld
  parentPartnerId?: string;
  contactEmail?: string;
  logoUrl?: string;
}

export interface ExtendedUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  partnerId?: string;
  avatar?: string;
}

// Mock partners data
export const partners: Partner[] = [
  {
    id: 'partner-otr',
    name: 'OneTimeRooted',
    type: 'recruitment_agency',
    contactEmail: 'info@onetimerooted.nl',
  },
  {
    id: 'partner-techbedrijf',
    name: 'TechBedrijf BV',
    type: 'client',
    parentPartnerId: 'partner-otr',
    contactEmail: 'hr@techbedrijf.nl',
  },
  {
    id: 'partner-marketingbureau',
    name: 'Marketing Bureau',
    type: 'client',
    parentPartnerId: 'partner-otr',
    contactEmail: 'team@marketingbureau.nl',
  },
  {
    id: 'partner-financials',
    name: 'Financials Group',
    type: 'client',
    parentPartnerId: 'partner-otr',
    contactEmail: 'hr@financialsgroup.nl',
  },
];

// Helper functions
export function getPartnerById(id: string): Partner | undefined {
  return partners.find(p => p.id === id);
}

export function getPartnersByType(type: 'recruitment_agency' | 'client'): Partner[] {
  return partners.filter(p => p.type === type);
}

export function getClientsForPartner(partnerId: string): Partner[] {
  return partners.filter(p => p.parentPartnerId === partnerId);
}

export function getAllPartners(): Partner[] {
  return partners;
}

// Get partners visible to a user based on their role
export function getVisiblePartners(userRole: UserRole, userPartnerId?: string): Partner[] {
  switch (userRole) {
    case 'admin':
      // Admins see all partners
      return partners;
    case 'partner':
      // Partners see themselves and their clients
      if (!userPartnerId) return [];
      const ownPartner = partners.find(p => p.id === userPartnerId);
      const clients = partners.filter(p => p.parentPartnerId === userPartnerId);
      return ownPartner ? [ownPartner, ...clients] : clients;
    case 'client':
      // Clients only see themselves
      if (!userPartnerId) return [];
      const clientPartner = partners.find(p => p.id === userPartnerId);
      return clientPartner ? [clientPartner] : [];
    default:
      return [];
  }
}
