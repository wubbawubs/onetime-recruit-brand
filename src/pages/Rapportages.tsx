import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReportsOverviewTab } from '@/components/reports/ReportsOverviewTab';
import { ReportsVacancyTab } from '@/components/reports/ReportsVacancyTab';
import { ReportsExportTab } from '@/components/reports/ReportsExportTab';
import { getReportsOverview } from '@/data/mockReportsData';

export default function Rapportages() {
  const overviewData = getReportsOverview();

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 page-enter page-enter-active">
        {/* Hero Bar */}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Rapportages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Inzicht in je doorlooptijden, hires en funnel-data.
          </p>
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
            <ReportsVacancyTab />
          </TabsContent>

          <TabsContent value="exporteer" className="mt-6">
            <ReportsExportTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
