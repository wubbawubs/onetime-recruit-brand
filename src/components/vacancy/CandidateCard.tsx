import { Mail, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Candidate } from "@/data/mockVacancyData";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SendEmailModal } from "./SendEmailModal";
import { ScheduleMeetingModal } from "./ScheduleMeetingModal";

interface CandidateCardProps {
  candidate: Candidate;
  onDragStart?: (e: React.DragEvent, candidateId: string) => void;
  onOpenDetails?: () => void;
}

export function CandidateCard({ candidate, onDragStart, onOpenDetails }: CandidateCardProps) {
  // Intelligence indicators logic
  const isAtRisk = candidate.daysInStage > 5;
  const isStrongMatch = candidate.score && candidate.score >= 8.0;
  const needsAction = !candidate.score && candidate.daysInStage > 3;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, candidate.id)}
      onClick={onOpenDetails}
      className={cn(
        "group relative bg-card border border-border/60 rounded-lg p-3",
        "cursor-grab active:cursor-grabbing",
        "transition-all duration-200",
        // Premium glow effect on hover
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

      {/* Main row: Avatar + Name + Quick info */}
      <div className="flex items-start gap-2.5">
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0",
          candidate.color
        )}>
          {candidate.initials}
        </div>
        
        <div className="flex-1 min-w-0 pr-6">
          <p className="text-sm font-medium truncate leading-tight">{candidate.name}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {candidate.source} · {candidate.daysInStage}d
          </p>
          
          {/* Score line - only if scored */}
          {candidate.score && (
            <p className="text-[11px] text-muted-foreground/80 mt-1">
              Score: <span className="font-medium text-foreground/70">{candidate.score}</span>
            </p>
          )}
        </div>
      </div>

      {/* Quick actions on hover - floating at bottom */}
      <div 
        className={cn(
          "flex items-center gap-0.5 mt-2 pt-2 border-t border-border/40",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <SendEmailModal 
          candidate={candidate} 
          trigger={
            <button 
              className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
            >
              <Mail className="h-3 w-3" />
              Mail
            </button>
          }
        />
        <ScheduleMeetingModal 
          candidate={candidate}
          trigger={
            <button 
              className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
            >
              <Calendar className="h-3 w-3" />
              Plan
            </button>
          }
        />
      </div>
    </div>
  );
}
