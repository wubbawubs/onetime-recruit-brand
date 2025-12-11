import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Download } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StageFilters } from "@/components/candidates/StageFilters";
import { FilterDrawer, FilterState } from "@/components/candidates/FilterDrawer";
import { CandidatesList } from "@/components/candidates/CandidatesList";
import { CandidateDetailModal } from "@/components/vacancy/CandidateDetailModal";
import { allCandidates, stages, getStageCounts, CandidateListItem } from "@/data/mockCandidatesData";
import { Candidate } from "@/data/mockVacancyData";

const defaultFilters: FilterState = {
  stages: [],
  sources: [],
  tags: [],
  vacancy: "all",
};

export default function Kandidaten() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStage, setActiveStage] = useState("all");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateListItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    let result = [...allCandidates];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.source.toLowerCase().includes(query)
      );
    }

    // Stage filter (from sticky tabs)
    if (activeStage !== "all") {
      const stageLabel = stages.find((s) => s.id === activeStage)?.label;
      if (stageLabel) {
        result = result.filter((c) => c.currentStage === stageLabel);
      }
    }

    // Applied drawer filters
    if (appliedFilters.stages.length > 0) {
      const stageLabels = appliedFilters.stages.map(
        (id) => stages.find((s) => s.id === id)?.label
      );
      result = result.filter((c) => stageLabels.includes(c.currentStage));
    }

    if (appliedFilters.sources.length > 0) {
      result = result.filter((c) => appliedFilters.sources.includes(c.source));
    }

    if (appliedFilters.tags.length > 0) {
      result = result.filter((c) =>
        appliedFilters.tags.some((tag) => c.tags.includes(tag))
      );
    }

    if (appliedFilters.vacancy !== "all") {
      result = result.filter((c) => c.vacancyId === appliedFilters.vacancy);
    }

    return result;
  }, [searchQuery, activeStage, appliedFilters]);

  const stageCounts = useMemo(() => getStageCounts(allCandidates), []);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setFilterDrawerOpen(false);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const handleCandidateClick = (candidate: CandidateListItem) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  // Convert CandidateListItem to Candidate for modal
  const modalCandidate: Candidate | null = selectedCandidate
    ? {
        id: selectedCandidate.id,
        name: selectedCandidate.name,
        initials: selectedCandidate.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        source: selectedCandidate.source,
        daysInStage: selectedCandidate.daysInStage,
        score: selectedCandidate.score,
        color: "bg-primary/10",
        lastAction: "Toegevoegd",
        notes: 0,
      }
    : null;

  const hasActiveFilters =
    appliedFilters.stages.length > 0 ||
    appliedFilters.sources.length > 0 ||
    appliedFilters.tags.length > 0 ||
    appliedFilters.vacancy !== "all";

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-6 page-enter page-enter-active">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Kandidaten</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Overzicht van alle kandidaten, filterbaar per stage, bron en tags.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek op naam, email of bron..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filter Button */}
            <Button
              variant={hasActiveFilters ? "default" : "outline"}
              size="icon"
              onClick={() => setFilterDrawerOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>

            {/* Export */}
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sticky Stage Filters */}
        <StageFilters
          stages={stages}
          counts={stageCounts}
          activeStage={activeStage}
          onStageChange={setActiveStage}
        />

        {/* Candidates List */}
        <div className="bg-card border border-border rounded-xl">
          <CandidatesList
            candidates={filteredCandidates}
            onCandidateClick={handleCandidateClick}
          />
        </div>

        {/* Filter Drawer */}
        <FilterDrawer
          open={filterDrawerOpen}
          onOpenChange={setFilterDrawerOpen}
          filters={filters}
          onFiltersChange={setFilters}
          onReset={handleResetFilters}
          onApply={handleApplyFilters}
        />

        {/* Candidate Detail Modal */}
        {modalCandidate && (
          <CandidateDetailModal
            candidate={modalCandidate}
            currentStage={selectedCandidate?.currentStage || "Nieuw"}
            open={modalOpen}
            onOpenChange={setModalOpen}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
