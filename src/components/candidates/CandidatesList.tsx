import { ChevronRight, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CandidateListItem } from "@/data/mockCandidatesData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

interface CandidatesListProps {
  candidates: CandidateListItem[];
  onCandidateClick: (candidate: CandidateListItem) => void;
  onAssignClick?: (candidate: CandidateListItem) => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDaysAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "vandaag";
  if (diffDays === 1) return "1d";
  return `${diffDays}d`;
}

function getStageBadgeVariant(stage: string, isRejected?: boolean) {
  if (isRejected) {
    return "bg-destructive/10 text-destructive border-destructive/20";
  }
  switch (stage.toLowerCase()) {
    case "nieuw":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "eerste gesprek":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "tweede gesprek":
      return "bg-purple-500/10 text-purple-600 border-purple-500/20";
    case "aanbod":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "in dienst":
      return "bg-green-500/10 text-green-700 border-green-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function CandidatesList({ candidates, onCandidateClick, onAssignClick }: CandidatesListProps) {
  if (candidates.length === 0) {
    return (
      <EmptyState
        title="Geen kandidaten gevonden"
        description="Pas je filters aan of wacht tot er nieuwe kandidaten binnenkomen."
      />
    );
  }

  return (
    <div className="divide-y divide-border/50">
      {candidates.map((candidate, index) => (
        <button
          key={candidate.id}
          onClick={() => onCandidateClick(candidate)}
          className={cn(
            "w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4",
            "text-left",
            "transition-all duration-200",
            "hover:bg-muted/40",
            "group",
            index === 0 && "rounded-t-xl",
            index === candidates.length - 1 && "rounded-b-xl"
          )}
        >
          {/* Avatar */}
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs sm:text-sm font-medium shrink-0 transition-transform duration-200 group-hover:scale-105">
            {getInitials(candidate.name)}
          </div>

          {/* Name & Source */}
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm sm:text-base text-foreground truncate group-hover:text-primary transition-colors">
              {candidate.name}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              {candidate.source} · {formatDaysAgo(candidate.addedDate)}
            </div>
          </div>

          {/* Vacancy (hidden on mobile) */}
          <div className="hidden lg:block text-sm text-muted-foreground w-36 truncate">
            {candidate.currentVacancy}
          </div>

          {/* Assign Button */}
          {onAssignClick && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-muted-foreground hover:text-primary hidden sm:flex shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onAssignClick(candidate);
              }}
            >
              <UserPlus className="h-3.5 w-3.5 mr-1" />
              <span className="hidden lg:inline">Toewijzen</span>
            </Button>
          )}

          {/* Stage Badge */}
          <Badge
            variant="outline"
            className={cn(
              "shrink-0 font-normal text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5",
              getStageBadgeVariant(candidate.currentStage, candidate.isRejected)
            )}
          >
            {candidate.isRejected ? (
              <span>Afgewezen</span>
            ) : (
              <>
                <span className="hidden sm:inline">{candidate.currentStage}</span>
                <span className="sm:hidden">
                  {candidate.currentStage === 'Eerste gesprek' ? 'EG' : 
                   candidate.currentStage === 'Tweede gesprek' ? 'TG' : 
                   candidate.currentStage === 'In dienst' ? 'Hired' :
                   candidate.currentStage}
                </span>
              </>
            )}
          </Badge>

          {/* Score - hidden on small mobile */}
          <div className="hidden sm:block w-12 text-right shrink-0">
            {candidate.score ? (
              <span className="text-sm font-semibold text-foreground tabular-nums">
                {candidate.score.toFixed(1)}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground/50">—</span>
            )}
          </div>

          {/* Chevron */}
          <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>
      ))}
    </div>
  );
}
