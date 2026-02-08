import { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ClientBrandProvider, useClientBrandingSafe } from '@/components/jobs/ClientBrandProvider';
import { JobBoardHeader } from '@/components/jobs/JobBoardHeader';
import { JobFilters } from '@/components/jobs/JobFilters';
import { JobCard } from '@/components/jobs/JobCard';
import { JobBoardFooter } from '@/components/jobs/JobBoardFooter';
import { mockVacancyList } from '@/data/mockVacancyData';
import { Briefcase, Search } from 'lucide-react';

function JobBoardContent() {
  const { subdomain } = useParams<{ subdomain: string }>();
  const { branding, cssVariables } = useClientBrandingSafe(subdomain || '');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // Get vacancies for this partner (only live ones)
  const partnerVacancies = useMemo(() => {
    return mockVacancyList.filter(
      v => v.partnerId === branding.partnerId && v.status === 'live'
    );
  }, [branding.partnerId]);

  // Get unique locations
  const locations = useMemo(() => {
    return [...new Set(partnerVacancies.map(v => v.location))].sort();
  }, [partnerVacancies]);

  // Filter vacancies
  const filteredVacancies = useMemo(() => {
    return partnerVacancies.filter(v => {
      const matchesSearch = !searchQuery || 
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = !locationFilter || v.location === locationFilter;
      return matchesSearch && matchesLocation;
    });
  }, [partnerVacancies, searchQuery, locationFilter]);

  // Redirect if no valid branding found (would mean invalid subdomain)
  if (!branding.partnerId) {
    return <Navigate to="/jobs/techbedrijf" replace />;
  }

  return (
    <div 
      className="min-h-screen bg-background"
      style={cssVariables}
    >
      {/* Header with branding */}
      <JobBoardHeader 
        branding={branding} 
        vacancyCount={partnerVacancies.length} 
      />
      
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Filters */}
        <div className="mb-10">
          <JobFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            locationFilter={locationFilter}
            onLocationChange={setLocationFilter}
            locations={locations}
          />
        </div>
        
        {/* Results count */}
        {partnerVacancies.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredVacancies.length === partnerVacancies.length 
                ? `${partnerVacancies.length} vacature${partnerVacancies.length === 1 ? '' : 's'}`
                : `${filteredVacancies.length} van ${partnerVacancies.length} vacatures`
              }
            </p>
          </div>
        )}
        
        {/* Vacancy List */}
        {filteredVacancies.length > 0 ? (
          <div className="space-y-5">
            {filteredVacancies.map((vacancy, index) => (
              <div 
                key={vacancy.id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'both' }}
              >
                <JobCard 
                  vacancy={vacancy} 
                  subdomain={subdomain || ''} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-muted rounded-full blur-xl opacity-50" />
              <div className="relative rounded-2xl bg-muted w-full h-full flex items-center justify-center">
                {searchQuery || locationFilter ? (
                  <Search className="h-8 w-8 text-muted-foreground" />
                ) : (
                  <Briefcase className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchQuery || locationFilter ? 'Geen resultaten' : 'Geen vacatures'}
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              {searchQuery || locationFilter 
                ? 'Probeer je zoekopdracht aan te passen of de filters te wissen.'
                : 'Er zijn momenteel geen openstaande vacatures. Kom later terug!'
              }
            </p>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <JobBoardFooter hideFooterBadge={branding.hideFooterBadge} />
    </div>
  );
}

export default function JobBoard() {
  const { subdomain } = useParams<{ subdomain: string }>();
  
  return (
    <ClientBrandProvider subdomain={subdomain || ''}>
      <JobBoardContent />
    </ClientBrandProvider>
  );
}
