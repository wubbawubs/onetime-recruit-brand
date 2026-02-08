import { Building2, Sparkles } from 'lucide-react';
import { ClientBranding } from '@/data/mockClientBrandingData';

interface JobBoardHeaderProps {
  branding: ClientBranding;
  vacancyCount: number;
}

export function JobBoardHeader({ branding, vacancyCount }: JobBoardHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-border/50">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: `radial-gradient(circle, var(--client-primary) 0%, transparent 70%)` }}
        />
        <div 
          className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl"
          style={{ background: `radial-gradient(circle, var(--client-primary) 0%, transparent 70%)` }}
        />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }}
        />
      </div>
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo with subtle glow */}
          <div className="relative">
            {branding.logoUrl ? (
              <img 
                src={branding.logoUrl} 
                alt={`${branding.companyName} logo`}
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-sm"
              />
            ) : (
              <div className="relative">
                <div 
                  className="absolute inset-0 blur-xl opacity-40 scale-150"
                  style={{ background: 'var(--client-primary)' }}
                />
                <div 
                  className="relative h-20 w-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: 'var(--client-primary)' }}
                >
                  <Building2 className="h-10 w-10 text-white" />
                </div>
              </div>
            )}
          </div>
          
          {/* Company Name - Premium typography */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              {branding.companyName}
            </h1>
            
            {/* Tagline with refined styling */}
            {branding.tagline && (
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
                {branding.tagline}
              </p>
            )}
          </div>
          
          {/* Vacancy Count - Premium badge */}
          <div className="pt-2">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
              style={{ 
                backgroundColor: 'var(--client-primary)',
                boxShadow: '0 4px 14px -3px var(--client-primary)'
              }}
            >
              <Sparkles className="h-4 w-4" />
              <span>{vacancyCount} {vacancyCount === 1 ? 'openstaande vacature' : 'openstaande vacatures'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
