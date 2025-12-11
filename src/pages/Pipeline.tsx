import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { GlobalPipelineKanban } from "@/components/pipeline/GlobalPipelineKanban";
import { GlobalInsightBar } from "@/components/pipeline/GlobalInsightBar";
import { StageFilters } from "@/components/candidates/StageFilters";
import { FilterDrawer, FilterState } from "@/components/candidates/FilterDrawer";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorBanner } from "@/components/ui/error-banner";
import { 
  allCandidates, 
  stages, 
  getStageCounts, 
  getCandidatesGroupedByStage,
  getGlobalBottleneck 
} from "@/data/mockCandidatesData";

const defaultFilters: FilterState = {
  stages: [],
  sources: [],
  tags: [],
  vacancy: "all",
};

export default function Pipeline() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStage, setActiveStage] = useState("all");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters);
  const [error, setError] = useState<string | null>(null);

  // Filter candidates based on search, stage, and drawer filters
  const filteredCandidates = useMemo(() => {
    return allCandidates.filter((candidate) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          candidate.name.toLowerCase().includes(query) ||
          candidate.email.toLowerCase().includes(query) ||
          candidate.currentVacancy.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Stage chip filter
      if (activeStage !== "all") {
        const stageLabel = stages.find(s => s.id === activeStage)?.label;
        if (candidate.currentStage !== stageLabel) return false;
      }

      // Drawer filters
      if (appliedFilters.stages.length > 0) {
        const stageLabel = stages.find(s => s.id === appliedFilters.stages.find(
          sid => stages.find(st => st.id === sid)?.label === candidate.currentStage
        ))?.label;
        if (!appliedFilters.stages.some(sid => 
          stages.find(s => s.id === sid)?.label === candidate.currentStage
        )) return false;
      }

      if (appliedFilters.sources.length > 0) {
        if (!appliedFilters.sources.includes(candidate.source)) return false;
      }

      if (appliedFilters.tags.length > 0) {
        if (!appliedFilters.tags.some(tag => candidate.tags.includes(tag))) return false;
      }

      if (appliedFilters.vacancy !== "all") {
        if (candidate.vacancyId !== appliedFilters.vacancy) return false;
      }

      return true;
    });
  }, [searchQuery, activeStage, appliedFilters]);

  // Get stage counts for filter chips
  const stageCounts = useMemo(() => getStageCounts(allCandidates), []);

  // Get grouped stages for kanban
  const pipelineStages = useMemo(() => getCandidatesGroupedByStage(filteredCandidates), [filteredCandidates]);

  // Get bottleneck info
  const bottleneck = useMemo(() => getGlobalBottleneck(pipelineStages), [pipelineStages]);

  // Handle bottleneck click - filter to that stage
  const handleBottleneckClick = (stageName: string) => {
    const stage = stages.find(s => s.label === stageName);
    if (stage) {
      setActiveStage(stage.id);
    }
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setFilterDrawerOpen(false);
  };

  const handleStageChange = (candidateId: string, fromStage: string, toStage: string) => {
    // In a real app, this would update the backend
    console.log(`Moved candidate ${candidateId} from ${fromStage} to ${toStage}`);
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8 page-enter page-enter-active">
        {/* Error Banner */}
        {error && (
          <ErrorBanner
            message={error}
            onDismiss={() => setError(null)}
          />
        )}

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
              <p className="text-muted-foreground mt-1">
                Alle kandidaten over alle vacatures. Filter en beheer je volledige recruitment flow.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Zoek op naam, email, vacature..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>

              {/* Filter button */}
              <Button
                variant="outline"
                size="default"
                onClick={() => setFilterDrawerOpen(true)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Global Insight Bar - clickable to filter */}
        <GlobalInsightBar bottleneck={bottleneck} onStageClick={handleBottleneckClick} />

        {/* Stage Filters */}
        <StageFilters
          stages={stages}
          counts={stageCounts}
          activeStage={activeStage}
          onStageChange={setActiveStage}
        />

        {/* Kanban Board or Empty State */}
        {filteredCandidates.length === 0 ? (
          <EmptyState
            title="Geen kandidaten in pipeline"
            description="Er zijn geen kandidaten die aan je filters voldoen. Pas je filters aan of voeg nieuwe kandidaten toe."
          />
        ) : (
          <GlobalPipelineKanban 
            stages={pipelineStages} 
            onStageChange={handleStageChange}
          />
        )}

        {/* Filter Drawer */}
        <FilterDrawer
          open={filterDrawerOpen}
          onOpenChange={setFilterDrawerOpen}
          filters={filters}
          onFiltersChange={setFilters}
          onReset={handleResetFilters}
          onApply={handleApplyFilters}
        />
      </div>
    </DashboardLayout>
  );
}
