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
import { mockVacancyDetail } from "@/data/mockVacancyData";
import { Button } from "@/components/ui/button";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function VacancyDetail() {
  const [activeTab, setActiveTab] = useState('overview');
  const [insightsOpen, setInsightsOpen] = useState(true);
  const vacancy = mockVacancyDetail;

  return (
    <DashboardLayout>
      <div className={cn(
        "mx-auto px-10 py-8 space-y-6 transition-all duration-300",
        insightsOpen ? "max-w-7xl" : "max-w-none"
      )}>
        {/* Page header */}
        <VacancyHeader
          id={vacancy.id}
          title={vacancy.title}
          company={vacancy.company}
          location={vacancy.location}
          contractType={vacancy.contractType}
          status={vacancy.status}
        />

        {/* Stats strip */}
        <VacancyStatsStrip
          totalCandidates={vacancy.totalCandidates}
          weeksOpen={vacancy.weeksOpen}
          lastUpdated={vacancy.lastUpdated}
          hires={vacancy.hires}
          hireGoal={vacancy.hireGoal}
        />

        {/* Tab navigation with insights toggle */}
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

        {/* Main content grid */}
        {activeTab === 'overview' && (
          <div className={cn(
            "grid gap-6 transition-all duration-300",
            insightsOpen ? "grid-cols-1 lg:grid-cols-10" : "grid-cols-1"
          )}>
            {/* Left column - full width when insights collapsed */}
            <div className={cn(
              "space-y-6 transition-all duration-300",
              insightsOpen ? "lg:col-span-7" : "col-span-full"
            )}>
              {/* Pipeline */}
              <VacancyPipeline stages={vacancy.pipeline} fullWidth={!insightsOpen} />
              
              {/* Activity timeline */}
              <VacancyActivityTimeline activities={vacancy.activity} />
            </div>

            {/* Right column - collapsible */}
            {insightsOpen && (
              <div className="lg:col-span-3 space-y-6">
              {/* Vacancy health */}
              <VacancyHealthCard health={vacancy.health} />
              
              {/* Inflow & sources */}
              <VacancyInflowCard 
                last14Days={vacancy.inflow.last14Days} 
                sources={vacancy.inflow.sources} 
              />
              
              {/* This week actions */}
              <VacancyActionsCard actions={vacancy.weekActions} />
            </div>
            )}
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== 'overview' && (
          <div className="flex items-center justify-center h-64 bg-muted/50 rounded-xl border border-dashed border-border">
            <p className="text-muted-foreground">
              {activeTab === 'edit' && 'Bewerken — Komt binnenkort'}
              {activeTab === 'publication' && 'Publicatie & jobsite — Komt binnenkort'}
              {activeTab === 'form' && 'Formulier & vragen — Komt binnenkort'}
              {activeTab === 'team' && 'Team & rechten — Komt binnenkort'}
              {activeTab === 'automation' && 'Automatisering — Komt binnenkort'}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
