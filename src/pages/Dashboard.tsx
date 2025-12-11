import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatusSummaryCard } from "@/components/dashboard/StatusSummaryCard";
import { TodayImportantCard } from "@/components/dashboard/TodayImportantCard";
import { JobStatusCard } from "@/components/dashboard/JobStatusCard";
import { PipelineSummaryCard } from "@/components/dashboard/PipelineSummaryCard";
import { ProcessQualityCard } from "@/components/dashboard/ProcessQualityCard";
import { Last7DaysCard } from "@/components/dashboard/Last7DaysCard";
import { dashboardSummary } from "@/data/mockDashboardData";

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 pt-12 lg:pt-0">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overzicht van je recruitment activiteiten
        </p>
      </div>

      {/* Dashboard sections */}
      <div className="space-y-6">
        {/* Section A - Status Summary */}
        <StatusSummaryCard summaryText={dashboardSummary.summaryText} />

        {/* Two column layout for B and C on larger screens */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Section B - Today Important */}
          <TodayImportantCard items={dashboardSummary.todayAttention} />

          {/* Section D - Pipeline Summary */}
          <PipelineSummaryCard 
            totalActive={dashboardSummary.pipelineSummary.totalActive}
            perStage={dashboardSummary.pipelineSummary.perStage}
            bottleneckDescription={dashboardSummary.pipelineSummary.bottleneckDescription}
          />
        </div>

        {/* Section C - Job Status (full width) */}
        <JobStatusCard jobs={dashboardSummary.jobsStatus} />

        {/* Two column layout for E and F */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Section E - Process Quality */}
          <ProcessQualityCard 
            avgResponseTimeDays={dashboardSummary.processQuality.avgResponseTimeDays}
            pctWithin48h={dashboardSummary.processQuality.pctWithin48h}
            staleCandidatesCount={dashboardSummary.processQuality.staleCandidatesCount}
            text={dashboardSummary.processQuality.text}
          />

          {/* Section F - Last 7 Days */}
          <Last7DaysCard 
            newApplications={dashboardSummary.last7Days.newApplications}
            movedForward={dashboardSummary.last7Days.movedForward}
            hires={dashboardSummary.last7Days.hires}
            droppedOut={dashboardSummary.last7Days.droppedOut}
            text={dashboardSummary.last7Days.text}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
