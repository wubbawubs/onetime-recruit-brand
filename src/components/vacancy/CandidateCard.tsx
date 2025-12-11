import { Badge } from "@/components/ui/badge";
import { ArrowRight, Mail, Calendar, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Candidate } from "@/data/mockVacancyData";

interface CandidateCardProps {
  candidate: Candidate;
  onDragStart?: (e: React.DragEvent, candidateId: string) => void;
}

export function CandidateCard({ candidate, onDragStart }: CandidateCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, candidate.id)}
      className="group bg-card border border-border rounded-lg p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-all"
    >
      {/* Top row: Avatar + Name + Source */}
      <div className="flex items-center gap-3 mb-2">
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-white",
          candidate.color
        )}>
          {candidate.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{candidate.name}</p>
        </div>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 shrink-0">
          {candidate.source}
        </Badge>
      </div>

      {/* Second row: Time in stage */}
      <p className="text-xs text-muted-foreground mb-2">
        In deze fase sinds: {candidate.daysInStage} {candidate.daysInStage === 1 ? 'dag' : 'dagen'}
      </p>

      {/* Third row: Chips */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {candidate.score ? (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
            Score: {candidate.score}
          </Badge>
        ) : (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 text-muted-foreground">
            Nog niet beoordeeld
          </Badge>
        )}
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
          {candidate.lastAction}
        </Badge>
        {candidate.notes > 0 && (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
            {candidate.notes} notitie{candidate.notes > 1 ? 's' : ''}
          </Badge>
        )}
      </div>

      {/* Hover actions */}
      <div className="flex items-center gap-1 pt-2 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted">
          <FileText className="h-3 w-3" />
          Details
        </button>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted">
          <Mail className="h-3 w-3" />
          Mail
        </button>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted">
          <Calendar className="h-3 w-3" />
          Plan
        </button>
      </div>
    </div>
  );
}
