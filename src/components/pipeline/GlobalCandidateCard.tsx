import { Mail, Calendar, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CandidateListItem } from "@/data/mockCandidatesData";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface GlobalCandidateCardProps {
  candidate: CandidateListItem;
  onDragStart?: (e: React.DragEvent, candidateId: string) => void;
  onOpenDetails?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Get badge color based on vacancy type
function getVacancyBadgeColors(vacancyName: string): { bg: string; text: string; border: string; hover: string } {
  const name = vacancyName.toLowerCase();
  
  if (name.includes("developer") || name.includes("engineer") || name.includes("software")) {
    return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200/60", hover: "hover:bg-blue-100" };
  }
  if (name.includes("account") || name.includes("sales") || name.includes("commerc")) {
    return { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200/60", hover: "hover:bg-orange-100" };
  }
  if (name.includes("office") || name.includes("admin") || name.includes("assistent")) {
    return { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200/60", hover: "hover:bg-violet-100" };
  }
  if (name.includes("marketing") || name.includes("content") || name.includes("communicatie")) {
    return { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200/60", hover: "hover:bg-pink-100" };
  }
  if (name.includes("finance") || name.includes("boekhou") || name.includes("controller")) {
    return { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200/60", hover: "hover:bg-cyan-100" };
  }
  // Default: emerald
  return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200/60", hover: "hover:bg-emerald-100" };
}

export function GlobalCandidateCard({ candidate, onDragStart, onOpenDetails }: GlobalCandidateCardProps) {
  // Intelligence indicators logic
  const isAtRisk = candidate.daysInStage > 5;
  const isStrongMatch = candidate.score && candidate.score >= 8.0;
  const needsAction = !candidate.score && candidate.daysInStage > 3;
  
  // Get vacancy-specific colors
  const badgeColors = getVacancyBadgeColors(candidate.currentVacancy);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, candidate.id)}
      onClick={onOpenDetails}
      className={cn(
        "group relative bg-card border border-border/60 rounded-lg p-3",
        "cursor-grab active:cursor-grabbing",
        "transition-all duration-200",
        "hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
      )}
    >
      {/* Intelligence indicators - top right */}
      <div className="absolute top-2 right-2 flex items-center gap-1">
        {isAtRisk && (
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
            </TooltipTrigger>
            <TooltipContent>Risico op afhaken ({candidate.daysInStage}+ dagen)</TooltipContent>
          </Tooltip>
        )}
        {isStrongMatch && (
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </TooltipTrigger>
            <TooltipContent>Sterke match (score {candidate.score})</TooltipContent>
          </Tooltip>
        )}
        {needsAction && !isAtRisk && (
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <span className="h-2 w-2 rounded-full bg-amber-500" />
            </TooltipTrigger>
            <TooltipContent>Actie nodig (nog geen score)</TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Main content */}
      <div className="flex items-start gap-2.5">
        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium shrink-0">
          {getInitials(candidate.name)}
        </div>
        
        <div className="flex-1 min-w-0 pr-6">
          <p className="text-sm font-medium truncate leading-tight">{candidate.name}</p>
          
          {/* Vacancy badge - prominent, scannable, color-coded */}
          <Badge 
            variant="secondary" 
            className={cn(
              "mt-1.5 text-[10px] font-medium px-1.5 py-0 h-5 rounded inline-flex items-center gap-1 max-w-full",
              badgeColors.bg, badgeColors.text, badgeColors.border, badgeColors.hover
            )}
          >
            <Briefcase className="h-2.5 w-2.5 shrink-0" />
            <span className="truncate">{candidate.currentVacancy}</span>
          </Badge>
          
          {/* Meta info */}
          <p className="text-[10px] text-muted-foreground mt-1.5">
            {candidate.source} · {candidate.daysInStage}d
            {candidate.score && (
              <span className="ml-1.5">· Score: <span className="font-medium text-foreground/70">{candidate.score}</span></span>
            )}
          </p>
        </div>
      </div>

      {/* Quick actions on hover */}
      <div className={cn(
        "flex items-center gap-0.5 mt-2 pt-2 border-t border-border/40",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      )}>
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
          title="Mail"
        >
          <Mail className="h-3 w-3" />
          Mail
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
          title="Plan gesprek"
        >
          <Calendar className="h-3 w-3" />
          Plan
        </button>
      </div>
    </div>
  );
}
