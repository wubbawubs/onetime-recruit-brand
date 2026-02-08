import { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Clock, Share2, Building2, ExternalLink, Linkedin, Twitter, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ClientBrandProvider, useClientBrandingSafe } from '@/components/jobs/ClientBrandProvider';
import { JobApplicationForm } from '@/components/jobs/JobApplicationForm';
import { JobCard } from '@/components/jobs/JobCard';
import { JobBoardFooter } from '@/components/jobs/JobBoardFooter';
import { mockVacancyList } from '@/data/mockVacancyData';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

function JobDetailContent() {
  const { subdomain, vacancyId } = useParams<{ subdomain: string; vacancyId: string }>();
  const { branding, cssVariables } = useClientBrandingSafe(subdomain || '');
  const [copied, setCopied] = useState(false);

  // Find the vacancy
  const vacancy = useMemo(() => {
    return mockVacancyList.find(v => v.id === vacancyId);
  }, [vacancyId]);

  // Get similar vacancies
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
    
    if (diffDays === 0) return 'Vandaag geplaatst';
    if (diffDays === 1) return 'Gisteren geplaatst';
    if (diffDays < 7) return `${diffDays} dagen geleden geplaatst`;
    if (diffDays < 14) return 'Vorige week geplaatst';
    return `${Math.floor(diffDays / 7)} weken geleden geplaatst`;
  };

  // Handle copy link
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!vacancy) {
    return <Navigate to={`/jobs/${subdomain}`} replace />;
  }

  // Mock job description
  const jobDescription = {
    intro: `Als ${vacancy.title} bij ${branding.companyName} krijg je de kans om een belangrijke bijdrage te leveren aan ons team. We zoeken iemand die gedreven is, initiatief toont en graag samenwerkt in een dynamische omgeving.`,
    responsibilities: [
      'Je bent verantwoordelijk voor het behalen van targets en het uitbouwen van klantrelaties',
      'Je werkt nauw samen met collega\'s uit verschillende disciplines',
      'Je krijgt de vrijheid om eigen ideeën in te brengen en projecten te leiden',
      'Je draagt bij aan de verdere groei en professionalisering van onze organisatie'
    ],
    requirements: [
      'Minimaal 3-5 jaar relevante werkervaring',
      'Uitstekende communicatieve vaardigheden in Nederlands en Engels',
      'Proactieve houding en sterke probleemoplossende capaciteiten',
      'Teamspeler met oog voor kwaliteit'
    ],
    benefits: [
      'Competitief salaris met goede secundaire arbeidsvoorwaarden',
      'Mogelijkheden voor persoonlijke ontwikkeling en groei',
      'Flexibele werktijden en hybride werkmogelijkheden',
      'Een informele werksfeer met gedreven collega\'s'
    ]
  };

  return (
    <div 
      className="min-h-screen bg-background"
      style={cssVariables}
    >
      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            to={`/jobs/${subdomain}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Alle vacatures</span>
            <span className="sm:hidden">Terug</span>
          </Link>
          
          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            {branding.logoUrl ? (
              <img 
                src={branding.logoUrl} 
                alt={branding.companyName}
                className="h-8 w-auto"
              />
            ) : (
              <span className="font-semibold text-foreground">{branding.companyName}</span>
            )}
          </div>
          
          {/* Share dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Share2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
                {copied ? <Check className="h-4 w-4 mr-2 text-primary" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? 'Gekopieerd!' : 'Kopieer link'}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  Deel op LinkedIn
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Bekijk deze vacature: ${vacancy.title}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Deel op X
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Title Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
                  {vacancy.title}
                </h1>
                
                {/* Meta badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="text-sm py-1.5 px-4 rounded-lg font-normal">
                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                    {vacancy.location}
                  </Badge>
                  <Badge variant="secondary" className="text-sm py-1.5 px-4 rounded-lg font-normal">
                    <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                    Fulltime
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {formatRelativeDate(vacancy.publishedDate)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Company Info Card */}
            <Card className="border-border/60 overflow-hidden">
              <CardContent className="flex items-center gap-5 py-5">
                <div 
                  className="h-14 w-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                  style={{ 
                    backgroundColor: 'var(--client-primary)',
                    boxShadow: '0 4px 14px -3px var(--client-primary)'
                  }}
                >
                  <Building2 className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-foreground">{branding.companyName}</h3>
                  <p className="text-sm text-muted-foreground truncate">{branding.tagline}</p>
                </div>
              </CardContent>
            </Card>

            {/* Job Description - Premium formatting */}
            <div className="space-y-10">
              {/* Intro */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                {jobDescription.intro}
              </p>
              
              {/* Responsibilities */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Wat ga je doen?</h2>
                <ul className="space-y-3">
                  {jobDescription.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span 
                        className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: 'var(--client-primary)' }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              
              {/* Requirements */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Wat zoeken wij?</h2>
                <ul className="space-y-3">
                  {jobDescription.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span 
                        className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: 'var(--client-primary)' }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              
              {/* Benefits */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Wat bieden wij?</h2>
                <ul className="space-y-3">
                  {jobDescription.benefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span 
                        className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: 'var(--client-primary)' }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Similar Vacancies */}
            {similarVacancies.length > 0 && (
              <div className="pt-10 border-t border-border/50">
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
