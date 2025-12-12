import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Download, UserPlus } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StageFilters } from "@/components/candidates/StageFilters";
import { FilterDrawer, FilterState } from "@/components/candidates/FilterDrawer";
import { CandidatesList } from "@/components/candidates/CandidatesList";
import { CandidateDetailModal } from "@/components/vacancy/CandidateDetailModal";
import { AddCandidateModal } from "@/components/candidates/AddCandidateModal";
import { AssignCandidateModal } from "@/components/candidates/AssignCandidateModal";
import { ErrorBanner } from "@/components/ui/error-banner";
import { PartnerFilter } from "@/components/shared/PartnerFilter";
import { allCandidates, stages, getStageCounts, CandidateListItem } from "@/data/mockCandidatesData";
import { Candidate } from "@/data/mockVacancyData";
import { useAuth } from "@/contexts/AuthContext";

const defaultFilters: FilterState = {
  stages: [],
  sources: [],
  tags: [],
  vacancy: "all",
};

export default function Kandidaten() {
  const [searchParams] = useSearchParams();
  const vacancyParam = searchParams.get("vacancy");
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStage, setActiveStage] = useState("all");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [partnerFilter, setPartnerFilter] = useState<string | null>(
    user?.role === 'client' ? (user?.partnerId || null) : null
  );
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    vacancy: vacancyParam || "all",
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    ...defaultFilters,
    vacancy: vacancyParam || "all",
  });
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateListItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addCandidateOpen, setAddCandidateOpen] = useState(false);
  const [assignCandidateOpen, setAssignCandidateOpen] = useState(false);
  const [candidateToAssign, setCandidateToAssign] = useState<CandidateListItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [localCandidates, setLocalCandidates] = useState(allCandidates);

  // Update filters when URL changes
  useEffect(() => {
    if (vacancyParam) {
      setFilters(prev => ({ ...prev, vacancy: vacancyParam }));
      setAppliedFilters(prev => ({ ...prev, vacancy: vacancyParam }));
    }
  }, [vacancyParam]);

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    let result = [...localCandidates];

    // Partner filter
    if (partnerFilter) {
      result = result.filter((c) => c.partnerId === partnerFilter);
    }

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
  }, [searchQuery, activeStage, appliedFilters, partnerFilter, localCandidates]);

  const stageCounts = useMemo(() => getStageCounts(localCandidates), [localCandidates]);

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

  const handleAssignClick = (candidate: CandidateListItem) => {
    setCandidateToAssign(candidate);
    setAssignCandidateOpen(true);
  };

  const handleRejectCandidate = (candidateId: string) => {
    setLocalCandidates(prev => 
      prev.map(c => 
        c.id === candidateId 
          ? { ...c, isRejected: true, rejectedDate: new Date().toISOString().split('T')[0] }
          : c
      )
    );
  };

  const handleAssignFromModal = () => {
    if (selectedCandidate) {
      setCandidateToAssign(selectedCandidate);
      setModalOpen(false);
      setAssignCandidateOpen(true);
    }
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
        {/* Error Banner */}
        {error && (
          <ErrorBanner
            message={error}
            onDismiss={() => setError(null)}
          />
        )}

        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Kandidaten</h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 hidden sm:block">
                  Overzicht van alle kandidaten, filterbaar per stage, bron en tags.
                </p>
              </div>
              
              {/* Partner Filter */}
              <PartnerFilter
                value={partnerFilter || "all"}
                onValueChange={(val) => setPartnerFilter(val === "all" ? null : val)}
              />
            </div>

            {/* Add Candidate - visible on mobile top right */}
            <Button onClick={() => setAddCandidateOpen(true)} className="gap-2 sm:hidden self-end" size="sm">
              <UserPlus className="h-4 w-4" />
              Toevoegen
            </Button>
          </div>

          {/* Search and filters row */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Filter Button */}
            <Button
              variant={hasActiveFilters ? "default" : "outline"}
              size="icon"
              className="h-9 w-9 sm:h-10 sm:w-10 shrink-0"
              onClick={() => setFilterDrawerOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>

            {/* Export */}
            <Button variant="outline" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 shrink-0">
              <Download className="h-4 w-4" />
            </Button>

            {/* Add Candidate - hidden on mobile */}
            <Button onClick={() => setAddCandidateOpen(true)} className="gap-2 hidden sm:flex">
              <UserPlus className="h-4 w-4" />
              <span className="hidden md:inline">Kandidaat toevoegen</span>
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
            onAssignClick={handleAssignClick}
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
            onReject={handleRejectCandidate}
            onAssign={handleAssignFromModal}
          />
        )}

        {/* Assign Candidate Modal */}
        {candidateToAssign && (
          <AssignCandidateModal
            candidate={candidateToAssign}
            open={assignCandidateOpen}
            onOpenChange={setAssignCandidateOpen}
          />
        )}

        {/* Add Candidate Modal */}
        <AddCandidateModal
          open={addCandidateOpen}
          onOpenChange={setAddCandidateOpen}
        />
      </div>
    </DashboardLayout>
  );
}
