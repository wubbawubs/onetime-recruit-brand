import { ChevronRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { CandidateListItem } from "@/data/mockCandidatesData";
import { Badge } from "@/components/ui/badge";

interface CandidatesListProps {
  candidates: CandidateListItem[];
  onCandidateClick: (candidate: CandidateListItem) => void;
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

function getStageBadgeVariant(stage: string) {
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

export function CandidatesList({ candidates, onCandidateClick }: CandidatesListProps) {
  if (candidates.length === 0) {
    return (
      <div className="text-center py-16">
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Geen kandidaten gevonden</h3>
        <p className="text-sm text-muted-foreground">
          Pas je filters aan of wacht tot er nieuwe kandidaten binnenkomen.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {candidates.map((candidate) => (
        <button
          key={candidate.id}
          onClick={() => onCandidateClick(candidate)}
          className={cn(
            "w-full flex items-center gap-4 p-4 rounded-lg",
            "text-left",
            "transition-all duration-200",
            "hover:bg-muted/50",
            "group"
          )}
        >
          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium shrink-0">
            {getInitials(candidate.name)}
          </div>

          {/* Name & Source */}
          <div className="flex-1 min-w-0">
            <div className="font-medium text-foreground truncate">
              {candidate.name}
            </div>
            <div className="text-sm text-muted-foreground">
              {candidate.source} · {formatDaysAgo(candidate.addedDate)}
            </div>
          </div>

          {/* Vacancy (hidden on mobile) */}
          <div className="hidden md:block text-sm text-muted-foreground w-32 truncate">
            {candidate.currentVacancy}
          </div>

          {/* Stage Badge */}
          <Badge
            variant="outline"
            className={cn(
              "shrink-0 font-normal",
              getStageBadgeVariant(candidate.currentStage)
            )}
          >
            {candidate.currentStage}
          </Badge>

          {/* Score */}
          <div className="w-12 text-right shrink-0">
            {candidate.score ? (
              <span className="text-sm font-medium text-foreground">
                {candidate.score.toFixed(1)}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">—</span>
            )}
          </div>

          {/* Chevron */}
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </button>
      ))}
    </div>
  );
}
