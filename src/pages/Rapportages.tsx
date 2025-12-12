import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReportsOverviewTab } from '@/components/reports/ReportsOverviewTab';
import { ReportsVacancyTab } from '@/components/reports/ReportsVacancyTab';
import { ReportsExportTab } from '@/components/reports/ReportsExportTab';
import { PartnerFilter } from '@/components/shared/PartnerFilter';
import { ErrorBanner } from '@/components/ui/error-banner';
import { getReportsOverview } from '@/data/mockReportsData';
import { useAuth } from '@/contexts/AuthContext';

export default function Rapportages() {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  
  // For clients, default to their own partner. For others, show all.
  const defaultPartnerId = user?.role === 'client' ? (user.partnerId || 'all') : 'all';
  const [selectedPartnerId, setSelectedPartnerId] = useState(defaultPartnerId);
  
  const overviewData = getReportsOverview(selectedPartnerId);

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 page-enter page-enter-active">
        {/* Error Banner */}
        {error && (
          <ErrorBanner
            message={error}
            onDismiss={() => setError(null)}
          />
        )}

        {/* Hero Bar */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Rapportages</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Inzicht in je doorlooptijden, hires en funnel-data.
            </p>
          </div>
          <PartnerFilter 
            value={selectedPartnerId} 
            onValueChange={setSelectedPartnerId}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overzicht" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overzicht">Overzicht</TabsTrigger>
            <TabsTrigger value="per-vacature">Per vacature</TabsTrigger>
            <TabsTrigger value="exporteer">Exporteer</TabsTrigger>
          </TabsList>

          <TabsContent value="overzicht" className="mt-6">
            <ReportsOverviewTab data={overviewData} />
          </TabsContent>

          <TabsContent value="per-vacature" className="mt-6">
            <ReportsVacancyTab partnerId={selectedPartnerId} />
          </TabsContent>

          <TabsContent value="exporteer" className="mt-6">
            <ReportsExportTab partnerId={selectedPartnerId} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
