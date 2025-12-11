import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users, ChevronRight, Plus, MapPin, Search, Calendar, Target } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { mockVacancyList } from "@/data/mockVacancyData";
import { NewVacancyModal } from "@/components/vacancy/NewVacancyModal";
import { EmptyState } from "@/components/ui/empty-state";
import { VacaturesListSkeleton } from "@/components/ui/loading-skeletons";
import { ErrorBanner } from "@/components/ui/error-banner";

const statusConfig = {
  live: { label: "Live", color: "bg-emerald-500", textColor: "text-emerald-700 dark:text-emerald-400", bgColor: "bg-emerald-50 dark:bg-emerald-500/10" },
  draft: { label: "Concept", color: "bg-slate-400", textColor: "text-slate-600 dark:text-slate-400", bgColor: "bg-slate-50 dark:bg-slate-500/10" },
  paused: { label: "Gepauzeerd", color: "bg-amber-500", textColor: "text-amber-700 dark:text-amber-400", bgColor: "bg-amber-50 dark:bg-amber-500/10" },
  closed: { label: "Gesloten", color: "bg-slate-500", textColor: "text-slate-600 dark:text-slate-400", bgColor: "bg-slate-50 dark:bg-slate-500/10" },
  filled: { label: "Ingevuld", color: "bg-blue-500", textColor: "text-blue-700 dark:text-blue-400", bgColor: "bg-blue-50 dark:bg-blue-500/10" },
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("nl-NL", { day: "numeric", month: "short" });
}

export default function Vacatures() {
  const [newVacancyOpen, setNewVacancyOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const filteredVacancies = useMemo(() => {
    let result = [...mockVacancyList];

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((v) => v.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(query) ||
          v.location.toLowerCase().includes(query)
      );
    }

    return result;
  }, [statusFilter, searchQuery]);

  const stats = useMemo(() => ({
    active: mockVacancyList.filter((v) => v.status === "live").length,
    paused: mockVacancyList.filter((v) => v.status === "paused").length,
    totalCandidates: mockVacancyList.reduce((sum, v) => sum + v.candidateCount, 0),
    drafts: mockVacancyList.filter((v) => v.status === "draft").length,
  }), []);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 150);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <VacaturesListSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8 page-enter page-enter-active">
        {/* Error Banner */}
        {error && (
          <ErrorBanner
            message={error}
            onRetry={handleRetry}
            onDismiss={() => setError(null)}
          />
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Vacatures</h1>
            <p className="text-muted-foreground mt-1">
              Beheer je openstaande vacatures en bekijk de voortgang.
            </p>
          </div>
          <Button className="gap-2" onClick={() => setNewVacancyOpen(true)}>
            <Plus className="h-4 w-4" />
            Nieuwe vacature
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Totaal actief</p>
            <p className="text-2xl font-semibold mt-1">{stats.active}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Gepauzeerd</p>
            <p className="text-2xl font-semibold mt-1">{stats.paused}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Totaal kandidaten</p>
            <p className="text-2xl font-semibold mt-1">{stats.totalCandidates}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Concepten</p>
            <p className="text-2xl font-semibold mt-1">{stats.drafts}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle statussen</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="draft">Concept</SelectItem>
              <SelectItem value="paused">Gepauzeerd</SelectItem>
              <SelectItem value="closed">Gesloten</SelectItem>
              <SelectItem value="filled">Ingevuld</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Zoek op titel of locatie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Vacancy list */}
        <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border/50">
            <h2 className="font-medium">
              Alle vacatures
              {filteredVacancies.length !== mockVacancyList.length && (
                <span className="text-muted-foreground font-normal ml-2">
                  ({filteredVacancies.length} van {mockVacancyList.length})
                </span>
              )}
            </h2>
          </div>

          {filteredVacancies.length === 0 ? (
            <EmptyState
              title="Geen vacatures gevonden"
              description={
                searchQuery || statusFilter !== "all"
                  ? "Pas je filters aan om vacatures te zien."
                  : "Maak je eerste vacature aan om te beginnen met werven."
              }
              actionLabel={!searchQuery && statusFilter === "all" ? "Nieuwe vacature" : undefined}
              onAction={!searchQuery && statusFilter === "all" ? () => setNewVacancyOpen(true) : undefined}
            />
          ) : (
            <div className="divide-y divide-border/50">
              {/* Header row */}
              <div className="hidden md:grid md:grid-cols-[1fr,120px,100px,80px,100px,32px] gap-4 px-5 py-3 bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span>Vacature</span>
                <span>Locatie</span>
                <span>Kandidaten</span>
                <span>Hires</span>
                <span>Gepubliceerd</span>
                <span></span>
              </div>

              {filteredVacancies.map((vacancy) => {
                const status = statusConfig[vacancy.status];

                return (
                  <Link
                    key={vacancy.id}
                    to={`/vacatures/${vacancy.id}`}
                    className="flex items-center justify-between md:grid md:grid-cols-[1fr,120px,100px,80px,100px,32px] gap-4 px-5 py-4 hover:bg-muted/30 transition-colors group"
                  >
                    {/* Title & Status */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5">
                          <p className="font-medium group-hover:text-primary transition-colors truncate">
                            {vacancy.title}
                          </p>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-[10px] font-medium px-2 py-0 h-5 shrink-0",
                              status.bgColor,
                              status.textColor
                            )}
                          >
                            <span className={cn("h-1.5 w-1.5 rounded-full mr-1.5", status.color)} />
                            {status.label}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="truncate">{vacancy.location}</span>
                    </div>

                    {/* Candidates */}
                    <div className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      <span>{vacancy.candidateCount}</span>
                    </div>

                    {/* Hires */}
                    <div className="hidden md:flex items-center gap-1.5 text-sm">
                      <Target className="h-3.5 w-3.5 text-muted-foreground" />
                      <span
                        className={cn(
                          vacancy.hires >= vacancy.hireGoal
                            ? "text-success font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {vacancy.hires}/{vacancy.hireGoal}
                      </span>
                    </div>

                    {/* Published date */}
                    <div className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(vacancy.publishedDate)}</span>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <NewVacancyModal open={newVacancyOpen} onOpenChange={setNewVacancyOpen} />
    </DashboardLayout>
  );
}
