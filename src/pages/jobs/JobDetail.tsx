import { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Clock, Share2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ClientBrandProvider, useClientBrandingSafe } from '@/components/jobs/ClientBrandProvider';
import { JobApplicationForm } from '@/components/jobs/JobApplicationForm';
import { JobCard } from '@/components/jobs/JobCard';
import { JobBoardFooter } from '@/components/jobs/JobBoardFooter';
import { mockVacancyList, mockVacancyDetail } from '@/data/mockVacancyData';

function JobDetailContent() {
  const { subdomain, vacancyId } = useParams<{ subdomain: string; vacancyId: string }>();
  const { branding, cssVariables } = useClientBrandingSafe(subdomain || '');

  // Find the vacancy
  const vacancy = useMemo(() => {
    return mockVacancyList.find(v => v.id === vacancyId);
  }, [vacancyId]);

  // Get similar vacancies (same partner, different vacancy)
  const similarVacancies = useMemo(() => {
    return mockVacancyList
      .filter(v => v.partnerId === branding.partnerId && v.id !== vacancyId && v.status === 'live')
      .slice(0, 2);
  }, [branding.partnerId, vacancyId]);

  // Format date
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

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: vacancy?.title,
        text: `Bekijk deze vacature bij ${branding.companyName}`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      // Could show a toast here
    }
  };

  if (!vacancy) {
    return <Navigate to={`/jobs/${subdomain}`} replace />;
  }

  // Mock job description (in reality this would come from the vacancy data)
  const jobDescription = `
## Over de functie

Als ${vacancy.title} bij ${branding.companyName} krijg je de kans om een belangrijke bijdrage te leveren aan ons team. We zoeken iemand die gedreven is, initiatief toont en graag samenwerkt in een dynamische omgeving.

## Wat ga je doen?

- Je bent verantwoordelijk voor het behalen van targets en het uitbouwen van klantrelaties
- Je werkt nauw samen met collega's uit verschillende disciplines
- Je krijgt de vrijheid om eigen ideeën in te brengen en projecten te leiden
- Je draagt bij aan de verdere groei en professionalisering van onze organisatie

## Wat zoeken wij?

- Minimaal 3-5 jaar relevante werkervaring
- Uitstekende communicatieve vaardigheden in Nederlands en Engels
- Proactieve houding en sterke probleemoplossende capaciteiten
- Teamspeler met oog voor kwaliteit

## Wat bieden wij?

- Competitief salaris met goede secundaire arbeidsvoorwaarden
- Mogelijkheden voor persoonlijke ontwikkeling en groei
- Flexibele werktijden en hybride werkmogelijkheden
- Een informele werksfeer met gedreven collega's
  `;

  return (
    <div 
      className="min-h-screen bg-background"
      style={cssVariables}
    >
      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            to={`/jobs/${subdomain}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Alle vacatures
          </Link>
          
          {/* Logo */}
          {branding.logoUrl ? (
            <img 
              src={branding.logoUrl} 
              alt={branding.companyName}
              className="h-8 w-auto"
            />
          ) : (
            <span className="font-semibold text-foreground">{branding.companyName}</span>
          )}
          
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title Section */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                {vacancy.title}
              </h1>
              
              {/* Meta badges */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  {vacancy.location}
                </Badge>
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                  Fulltime
                </Badge>
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  {formatRelativeDate(vacancy.publishedDate)}
                </Badge>
              </div>
            </div>
            
            {/* Company Info Card */}
            <Card>
              <CardContent className="flex items-center gap-4 py-4">
                <div 
                  className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--client-primary)' }}
                >
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{branding.companyName}</h3>
                  <p className="text-sm text-muted-foreground">{branding.tagline}</p>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {jobDescription.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-xl font-semibold mt-8 mb-4 first:mt-0">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('- ')) {
                  return <li key={i} className="ml-4">{line.replace('- ', '')}</li>;
                }
                if (line.trim()) {
                  return <p key={i} className="text-muted-foreground leading-relaxed">{line}</p>;
                }
                return null;
              })}
            </div>

            {/* Similar Vacancies */}
            {similarVacancies.length > 0 && (
              <div className="pt-8 border-t border-border">
                <h2 className="text-xl font-semibold mb-6">Vergelijkbare vacatures</h2>
                <div className="space-y-4">
                  {similarVacancies.map((v) => (
                    <JobCard key={v.id} vacancy={v} subdomain={subdomain || ''} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Application Form (Sticky) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <JobApplicationForm 
                vacancyTitle={vacancy.title}
                companyName={branding.companyName}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <JobBoardFooter hideFooterBadge={branding.hideFooterBadge} />
    </div>
  );
}

export default function JobDetail() {
  const { subdomain } = useParams<{ subdomain: string }>();
  
  return (
    <ClientBrandProvider subdomain={subdomain || ''}>
      <JobDetailContent />
    </ClientBrandProvider>
  );
}
