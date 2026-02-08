import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import { VacancyListItem } from '@/data/mockVacancyData';

interface JobCardProps {
  vacancy: VacancyListItem;
  subdomain: string;
}

export function JobCard({ vacancy, subdomain }: JobCardProps) {
  // Format date to relative
  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Vandaag';
    if (diffDays === 1) return 'Gisteren';
    if (diffDays < 7) return `${diffDays} dagen geleden`;
    if (diffDays < 14) return 'Vorige week';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weken geleden`;
    return `${Math.floor(diffDays / 30)} maanden geleden`;
  };

  const contractType = 'Fulltime';

  return (
    <Link to={`/jobs/${subdomain}/${vacancy.id}`} className="block group">
      <article className="relative p-6 sm:p-8 rounded-xl border border-border/60 bg-card hover:bg-accent/30 transition-all duration-300 hover:border-[color:var(--client-primary)]/40 hover:shadow-xl hover:shadow-[color:var(--client-primary)]/5">
        {/* Subtle gradient on hover */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, var(--client-primary) 0%, transparent 50%)',
            opacity: 0,
          }}
        />
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none"
          style={{ background: 'var(--client-primary)' }}
        />
        
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex-1 min-w-0 space-y-4">
            {/* Title with refined typography */}
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground group-hover:text-[color:var(--client-primary)] transition-colors duration-300 tracking-tight">
              {vacancy.title}
            </h3>
            
            {/* Meta info - Refined badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {vacancy.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 text-sm text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5" />
                {contractType}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {formatRelativeDate(vacancy.publishedDate)}
              </span>
            </div>
          </div>
          
          {/* Arrow CTA - Premium styling */}
          <div className="hidden sm:flex items-center justify-center h-12 w-12 rounded-xl bg-muted/50 group-hover:bg-[color:var(--client-primary)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            style={{ '--tw-shadow-color': 'var(--client-primary)' } as React.CSSProperties}
          >
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
        
        {/* Mobile CTA */}
        <div className="sm:hidden mt-5 pt-5 border-t border-border/50">
          <span 
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: 'var(--client-primary)' }}
          >
            Bekijk vacature
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </article>
    </Link>
  );
}
