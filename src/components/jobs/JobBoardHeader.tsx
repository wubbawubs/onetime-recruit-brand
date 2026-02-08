import { Building2 } from 'lucide-react';
import { ClientBranding } from '@/data/mockClientBrandingData';

interface JobBoardHeaderProps {
  branding: ClientBranding;
  vacancyCount: number;
}

export function JobBoardHeader({ branding, vacancyCount }: JobBoardHeaderProps) {
  return (
    <header className="relative overflow-hidden">
      {/* Subtle gradient background using client color */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ 
          background: `linear-gradient(135deg, var(--client-primary) 0%, transparent 50%)` 
        }}
      />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo or Company Icon */}
          {branding.logoUrl ? (
            <img 
              src={branding.logoUrl} 
              alt={`${branding.companyName} logo`}
              className="h-14 sm:h-16 w-auto object-contain"
            />
          ) : (
            <div 
              className="h-16 w-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--client-primary)' }}
            >
              <Building2 className="h-8 w-8 text-white" />
            </div>
          )}
          
          {/* Company Name */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {branding.companyName}
          </h1>
          
          {/* Tagline */}
          {branding.tagline && (
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
              {branding.tagline}
            </p>
          )}
          
          {/* Vacancy Count Badge */}
          <div className="flex items-center gap-2 mt-4">
            <span 
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: 'var(--client-primary)' }}
            >
              {vacancyCount} {vacancyCount === 1 ? 'openstaande vacature' : 'openstaande vacatures'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
