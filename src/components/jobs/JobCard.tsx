import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

  // Derive contract type from title/location (mock - would come from vacancy data)
  const contractType = 'Fulltime';

  return (
    <Link to={`/jobs/${subdomain}/${vacancy.id}`}>
      <Card className="group p-6 hover:shadow-lg transition-all duration-300 hover:border-[var(--client-primary)] cursor-pointer">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-3">
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-[color:var(--client-primary)] transition-colors line-clamp-2">
              {vacancy.title}
            </h3>
            
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {vacancy.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                {contractType}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {formatRelativeDate(vacancy.publishedDate)}
              </span>
            </div>
          </div>
          
          {/* Arrow indicator */}
          <div className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-muted group-hover:bg-[var(--client-primary)] transition-colors">
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
          </div>
        </div>
        
        {/* Mobile: Full-width button indicator */}
        <div className="sm:hidden mt-4 pt-4 border-t border-border">
          <span 
            className="text-sm font-medium"
            style={{ color: 'var(--client-primary)' }}
          >
            Bekijk vacature →
          </span>
        </div>
      </Card>
    </Link>
  );
}
