import { Mail, Calendar, FileText, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Candidate } from "@/data/mockVacancyData";

interface CandidateCardProps {
  candidate: Candidate;
  onDragStart?: (e: React.DragEvent, candidateId: string) => void;
  onOpenDetails?: () => void;
}

export function CandidateCard({ candidate, onDragStart, onOpenDetails }: CandidateCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, candidate.id)}
      onClick={onOpenDetails}
      className="group bg-card border border-border/60 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-border hover:shadow-sm transition-all"
    >
      {/* Main row: Avatar + Name + Quick info */}
      <div className="flex items-start gap-2.5">
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0",
          candidate.color
        )}>
          {candidate.initials}
        </div>
        
        <div className="flex-1 min-w-0">
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

        {/* Quick actions on hover */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.stopPropagation(); }}
            className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
            title="Mail"
          >
            <Mail className="h-3.5 w-3.5" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); }}
            className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
            title="Plan gesprek"
          >
            <Calendar className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
