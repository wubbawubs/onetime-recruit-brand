import { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ClientBrandProvider, useClientBrandingSafe } from '@/components/jobs/ClientBrandProvider';
import { JobBoardHeader } from '@/components/jobs/JobBoardHeader';
import { JobFilters } from '@/components/jobs/JobFilters';
import { JobCard } from '@/components/jobs/JobCard';
import { JobBoardFooter } from '@/components/jobs/JobBoardFooter';
import { mockVacancyList } from '@/data/mockVacancyData';
import { Briefcase } from 'lucide-react';

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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <JobFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            locationFilter={locationFilter}
            onLocationChange={setLocationFilter}
            locations={locations}
          />
        </div>
        
        {/* Vacancy List */}
        {filteredVacancies.length > 0 ? (
          <div className="space-y-4">
            {filteredVacancies.map((vacancy) => (
              <JobCard 
                key={vacancy.id} 
                vacancy={vacancy} 
                subdomain={subdomain || ''} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Geen vacatures gevonden
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
