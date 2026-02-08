// Client branding data for public job boards

export interface ClientBranding {
  subdomain: string;
  partnerId: string;
  companyName: string;
  logoUrl?: string;
  primaryColor: string; // HSL format: "145 55% 42%"
  backgroundColor?: string;
  heroImageUrl?: string;
  tagline?: string;
  hideFooterBadge?: boolean;
}

export const clientBrandingData: ClientBranding[] = [
  {
    subdomain: 'techbedrijf',
    partnerId: 'partner-techbedrijf',
    companyName: 'TechBedrijf BV',
    logoUrl: undefined, // Would be a real URL in production
    primaryColor: '220 90% 56%', // Blue
    backgroundColor: '220 15% 97%',
    tagline: 'Bouw mee aan de toekomst van technologie',
    hideFooterBadge: false,
  },
  {
    subdomain: 'marketingbureau',
    partnerId: 'partner-marketingbureau',
    companyName: 'Marketing Bureau',
    logoUrl: undefined,
    primaryColor: '330 80% 55%', // Pink/Magenta
    backgroundColor: '330 15% 98%',
    tagline: 'Creatieve minds gezocht',
    hideFooterBadge: false,
  },
  {
    subdomain: 'financials',
    partnerId: 'partner-financials',
    companyName: 'Financials Group',
    logoUrl: undefined,
    primaryColor: '45 90% 45%', // Gold/Amber
    backgroundColor: '45 10% 97%',
    tagline: 'Waar ambitie en expertise samenkomen',
    hideFooterBadge: true,
  },
];

// Default branding fallback (One Rooted)
export const defaultBranding: ClientBranding = {
  subdomain: '',
  partnerId: 'partner-otr',
  companyName: 'One Rooted',
  logoUrl: '/assets/onerooted-logo.png',
  primaryColor: '145 55% 42%', // Green
  backgroundColor: '140 20% 97%',
  tagline: 'Een nieuwe standaard in recruitment',
  hideFooterBadge: false,
};

export function getClientBranding(subdomain: string): ClientBranding {
  const branding = clientBrandingData.find(b => b.subdomain === subdomain);
  return branding || defaultBranding;
}

export function getClientBrandingByPartnerId(partnerId: string): ClientBranding {
  const branding = clientBrandingData.find(b => b.partnerId === partnerId);
  return branding || defaultBranding;
}
