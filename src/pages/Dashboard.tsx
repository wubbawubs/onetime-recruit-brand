import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { HeroInsightBar } from "@/components/dashboard/HeroInsightBar";
import { StatusSummaryCard } from "@/components/dashboard/StatusSummaryCard";
import { TodayImportantCard } from "@/components/dashboard/TodayImportantCard";
import { JobsStatusLane } from "@/components/dashboard/JobsStatusLane";
import { PipelineSummaryCard } from "@/components/dashboard/PipelineSummaryCard";
import { ProcessQualityCard } from "@/components/dashboard/ProcessQualityCard";
import { Last7DaysCard } from "@/components/dashboard/Last7DaysCard";
import { dashboardSummary } from "@/data/mockDashboardData";

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 pt-12 lg:pt-0">
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
      </div>

      {/* Dashboard sections */}
      <div className="space-y-8">
        {/* Hero Insight Bar */}
        <HeroInsightBar insight={dashboardSummary.heroInsight} />

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-6">
            <StatusSummaryCard summaryText={dashboardSummary.summaryText} />
            <TodayImportantCard items={dashboardSummary.todayAttention} />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <PipelineSummaryCard 
              totalActive={dashboardSummary.pipelineSummary.totalActive}
              perStage={dashboardSummary.pipelineSummary.perStage}
              bottleneckDescription={dashboardSummary.pipelineSummary.bottleneckDescription}
            />
            <Last7DaysCard stats={dashboardSummary.last7Days} />
            <ProcessQualityCard quality={dashboardSummary.processQuality} />
          </div>
        </div>

        {/* Jobs Status Lane - full width */}
        <JobsStatusLane jobs={dashboardSummary.jobsStatus} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
