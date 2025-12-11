import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { HeroInsightBar } from "@/components/dashboard/HeroInsightBar";
import { StatusSummaryCard } from "@/components/dashboard/StatusSummaryCard";
import { TodayImportantCard } from "@/components/dashboard/TodayImportantCard";
import { PipelineSummaryCard } from "@/components/dashboard/PipelineSummaryCard";
import { Last7DaysCard } from "@/components/dashboard/Last7DaysCard";
import { ProcessQualityCard } from "@/components/dashboard/ProcessQualityCard";
import { RiskMatrixCard } from "@/components/dashboard/RiskMatrixCard";
import { dashboardSummary } from "@/data/mockDashboardData";
import { useAuth } from "@/contexts/AuthContext";
import { PageTransition } from "@/components/ui/page-transition";

// Get greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Goedemorgen";
  if (hour < 18) return "Goedemiddag";
  return "Goedenavond";
};

// Get first name from full name
const getFirstName = (fullName: string) => {
  return fullName.split(" ")[0];
};

const Dashboard = () => {
  const { user } = useAuth();
  const greeting = getGreeting();
  const firstName = user ? getFirstName(user.name) : "";

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-10">
          {/* Page header with personalized greeting */}
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground">
              {greeting}, {firstName} 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Overzicht van je recruitment activiteiten
            </p>
          </div>

          {/* Hero insight with Today Focus */}
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <HeroInsightBar insight={dashboardSummary.heroInsight} />
          </div>

          {/* Main grid - 3 columns with staggered animation */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-stagger">
            {/* Left column */}
            <div className="space-y-8">
              <StatusSummaryCard summaryText={dashboardSummary.summaryText} />
              <TodayImportantCard items={dashboardSummary.todayAttention} />
            </div>
            
            {/* Middle column */}
            <div className="space-y-8">
              <PipelineSummaryCard
                totalActive={dashboardSummary.pipelineSummary.totalActive}
                perStage={dashboardSummary.pipelineSummary.perStage}
                bottleneckDescription={dashboardSummary.pipelineSummary.bottleneckDescription}
              />
              <Last7DaysCard stats={dashboardSummary.last7Days} />
            </div>

            {/* Right column */}
            <div className="space-y-8">
              <ProcessQualityCard quality={dashboardSummary.processQuality} />
            </div>
          </div>

          {/* Risk matrix - full width */}
          <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <RiskMatrixCard />
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Dashboard;
