import { createContext, useContext, useMemo, ReactNode } from 'react';
import { ClientBranding, getClientBranding, defaultBranding } from '@/data/mockClientBrandingData';

interface ClientBrandContextValue {
  branding: ClientBranding;
  cssVariables: React.CSSProperties;
}

const ClientBrandContext = createContext<ClientBrandContextValue | null>(null);

export function useClientBrand() {
  const context = useContext(ClientBrandContext);
  if (!context) {
    throw new Error('useClientBrand must be used within a ClientBrandProvider');
  }
  return context;
}

interface ClientBrandProviderProps {
  subdomain: string;
  children: ReactNode;
}

export function ClientBrandProvider({ subdomain, children }: ClientBrandProviderProps) {
  const branding = useMemo(() => getClientBranding(subdomain), [subdomain]);

  const cssVariables = useMemo<React.CSSProperties>(() => ({
    '--client-primary': `hsl(${branding.primaryColor})`,
    '--client-primary-hsl': branding.primaryColor,
    '--client-bg': branding.backgroundColor ? `hsl(${branding.backgroundColor})` : undefined,
  } as React.CSSProperties), [branding]);

  const value = useMemo(() => ({
    branding,
    cssVariables,
  }), [branding, cssVariables]);

  return (
    <ClientBrandContext.Provider value={value}>
      <div style={cssVariables}>
        {children}
      </div>
    </ClientBrandContext.Provider>
  );
}

// Hook to access branding without provider requirement (for standalone use)
export function useClientBrandingSafe(subdomain: string): ClientBrandContextValue {
  const branding = getClientBranding(subdomain);
  
  const cssVariables = useMemo<React.CSSProperties>(() => ({
    '--client-primary': `hsl(${branding.primaryColor})`,
    '--client-primary-hsl': branding.primaryColor,
    '--client-bg': branding.backgroundColor ? `hsl(${branding.backgroundColor})` : undefined,
  } as React.CSSProperties), [branding]);

  return { branding, cssVariables };
}
