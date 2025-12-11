import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { VacancyHeader } from "@/components/vacancy/VacancyHeader";
import { VacancyStatsStrip } from "@/components/vacancy/VacancyStatsStrip";
import { VacancyTabs } from "@/components/vacancy/VacancyTabs";
import { VacancyPipeline } from "@/components/vacancy/VacancyPipeline";
import { VacancyActivityTimeline } from "@/components/vacancy/VacancyActivityTimeline";
import { VacancyHealthCard } from "@/components/vacancy/VacancyHealthCard";
import { VacancyInflowCard } from "@/components/vacancy/VacancyInflowCard";
import { VacancyActionsCard } from "@/components/vacancy/VacancyActionsCard";
import { HeroInsightBar } from "@/components/vacancy/HeroInsightBar";
import { VacancyEditTab } from "@/components/vacancy/tabs/VacancyEditTab";
import { VacancyPublicationTab } from "@/components/vacancy/tabs/VacancyPublicationTab";
import { VacancyFormTab } from "@/components/vacancy/tabs/VacancyFormTab";
import { VacancyTeamTab } from "@/components/vacancy/tabs/VacancyTeamTab";
import { VacancyAutomationTab } from "@/components/vacancy/tabs/VacancyAutomationTab";
import { mockVacancyDetail } from "@/data/mockVacancyData";
import { Button } from "@/components/ui/button";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function VacancyDetail() {
  const [activeTab, setActiveTab] = useState('overview');
  const [insightsOpen, setInsightsOpen] = useState(true);
  const vacancy = mockVacancyDetail;

  const scrollToActions = () => {
    setInsightsOpen(true);
    // Small delay to ensure panel is open before scrolling
    setTimeout(() => {
      document.getElementById('actions-card')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col page-enter page-enter-active">
        {/* Fixed header section */}
        <div className="px-8 pt-6 pb-4 space-y-4 border-b border-border/50 bg-background">
          <VacancyHeader
            id={vacancy.id}
            title={vacancy.title}
            company={vacancy.company}
            location={vacancy.location}
            contractType={vacancy.contractType}
            status={vacancy.status}
          />
          <VacancyStatsStrip
            totalCandidates={vacancy.totalCandidates}
            weeksOpen={vacancy.weeksOpen}
            lastUpdated={vacancy.lastUpdated}
            hires={vacancy.hires}
            hireGoal={vacancy.hireGoal}
          />
          
          {/* Hero Insight Bar - coaching advice */}
          {activeTab === 'overview' && vacancy.heroInsight && (
            <HeroInsightBar 
              insight={vacancy.heroInsight} 
              onActionClick={scrollToActions}
            />
          )}
          
          <div className="flex items-center justify-between">
            <VacancyTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            {activeTab === 'overview' && (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setInsightsOpen(!insightsOpen)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {insightsOpen ? (
                      <PanelRightClose className="h-4 w-4" />
                    ) : (
                      <PanelRightOpen className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {insightsOpen ? "Verberg insights" : "Toon insights"}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Main content - flexible layout */}
        {activeTab === 'overview' && (
          <div className="flex-1 flex min-h-0">
            {/* Pipeline section - takes all available space */}
            <div className="flex-1 p-6 overflow-auto">
              <div className="space-y-6">
                <VacancyPipeline stages={vacancy.pipeline} />
                <VacancyActivityTimeline activities={vacancy.activity} />
              </div>
            </div>

            {/* Insights sidebar - fixed width */}
            <div className={cn(
              "border-l border-border/50 bg-muted/30 overflow-y-auto transition-all duration-300",
              insightsOpen ? "w-80 p-5" : "w-0 p-0 opacity-0"
            )}>
              {insightsOpen && (
                <div className="space-y-5">
                  <VacancyHealthCard health={vacancy.health} />
                  <VacancyInflowCard 
                    last14Days={vacancy.inflow.last14Days} 
                    sources={vacancy.inflow.sources} 
                  />
                  <div id="actions-card">
                    <VacancyActionsCard actions={vacancy.weekActions} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit Tab */}
        {activeTab === 'edit' && (
          <div className="flex-1 overflow-auto">
            <VacancyEditTab vacancy={vacancy} />
          </div>
        )}

        {/* Publication Tab */}
        {activeTab === 'publication' && (
          <div className="flex-1 overflow-auto">
            <VacancyPublicationTab vacancy={vacancy} />
          </div>
        )}

        {/* Form Tab */}
        {activeTab === 'form' && (
          <div className="flex-1 overflow-auto">
            <VacancyFormTab />
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="flex-1 overflow-auto">
            <VacancyTeamTab />
          </div>
        )}

        {/* Automation Tab */}
        {activeTab === 'automation' && (
          <div className="flex-1 overflow-auto">
            <VacancyAutomationTab />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
