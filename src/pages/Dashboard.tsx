import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { HeroInsightBar } from "@/components/dashboard/HeroInsightBar";
import { StatusSummaryCard } from "@/components/dashboard/StatusSummaryCard";
import { TodayImportantCard } from "@/components/dashboard/TodayImportantCard";
import { PipelineSummaryCard } from "@/components/dashboard/PipelineSummaryCard";
import { Last7DaysCard } from "@/components/dashboard/Last7DaysCard";
import { ProcessQualityCard } from "@/components/dashboard/ProcessQualityCard";
import { JobsStatusLane } from "@/components/dashboard/JobsStatusLane";
import { dashboardSummary } from "@/data/mockDashboardData";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Overzicht van je recruitment activiteiten</p>
        </div>

        {/* Hero insight */}
        <HeroInsightBar insight={dashboardSummary.heroInsight} />

        {/* Main grid - 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <StatusSummaryCard summaryText={dashboardSummary.summaryText} />
            <TodayImportantCard items={dashboardSummary.todayAttention} />
          </div>
          
          {/* Middle column */}
          <div className="space-y-6">
            <PipelineSummaryCard
              totalActive={dashboardSummary.pipelineSummary.totalActive}
              perStage={dashboardSummary.pipelineSummary.perStage}
              bottleneckDescription={dashboardSummary.pipelineSummary.bottleneckDescription}
            />
            <Last7DaysCard stats={dashboardSummary.last7Days} />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <ProcessQualityCard quality={dashboardSummary.processQuality} />
          </div>
        </div>

        {/* Jobs status lane - full width */}
        <JobsStatusLane jobs={dashboardSummary.jobsStatus} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
