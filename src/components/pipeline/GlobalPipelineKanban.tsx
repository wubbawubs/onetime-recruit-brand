import { useState } from "react";
import { GlobalCandidateCard } from "./GlobalCandidateCard";
import { CandidateDetailModal } from "@/components/vacancy/CandidateDetailModal";
import { cn } from "@/lib/utils";
import type { CandidateListItem, GlobalPipelineStage } from "@/data/mockCandidatesData";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface GlobalPipelineKanbanProps {
  stages: GlobalPipelineStage[];
  onStageChange?: (candidateId: string, fromStage: string, toStage: string) => void;
}

// Convert CandidateListItem to the format expected by CandidateDetailModal
function convertToModalCandidate(candidate: CandidateListItem) {
  return {
    id: candidate.id,
    name: candidate.name,
    initials: candidate.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
    source: candidate.source,
    daysInStage: candidate.daysInStage,
    score: candidate.score,
    color: "bg-primary",
    lastAction: candidate.lastActivityDate,
    notes: 0,
  };
}

export function GlobalPipelineKanban({ stages: initialStages, onStageChange }: GlobalPipelineKanbanProps) {
  const [stages, setStages] = useState(initialStages);
  const [draggedCandidate, setDraggedCandidate] = useState<{ id: string; fromStage: string } | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateListItem | null>(null);
  const [selectedStage, setSelectedStage] = useState<string>('');

  const handleDragStart = (e: React.DragEvent, candidateId: string, stageId: string) => {
    setDraggedCandidate({ id: candidateId, fromStage: stageId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, toStageId: string) => {
    e.preventDefault();
    if (!draggedCandidate || draggedCandidate.fromStage === toStageId) {
      setDraggedCandidate(null);
      return;
    }

    setStages(prevStages => {
      const newStages = prevStages.map(stage => ({
        ...stage,
        candidates: [...stage.candidates]
      }));

      const fromStage = newStages.find(s => s.id === draggedCandidate.fromStage);
      const toStage = newStages.find(s => s.id === toStageId);
      
      if (fromStage && toStage) {
        const candidateIndex = fromStage.candidates.findIndex(c => c.id === draggedCandidate.id);
        if (candidateIndex !== -1) {
          const [candidate] = fromStage.candidates.splice(candidateIndex, 1);
          // Update candidate's current stage
          toStage.candidates.push({ 
            ...candidate, 
            currentStage: toStage.name,
            daysInStage: 0 
          });
        }
      }

      return newStages;
    });

    const fromStageName = stages.find(s => s.id === draggedCandidate.fromStage)?.name || '';
    const toStageName = stages.find(s => s.id === toStageId)?.name || '';
    onStageChange?.(draggedCandidate.id, fromStageName, toStageName);
    setDraggedCandidate(null);
  };

  const handleOpenDetails = (candidate: CandidateListItem, stageName: string) => {
    setSelectedCandidate(candidate);
    setSelectedStage(stageName);
  };

  const stageColors = [
    "border-b-blue-400",
    "border-b-amber-400",
    "border-b-purple-400",
    "border-b-emerald-400",
    "border-b-green-500"
  ];

  return (
    <div className="space-y-4">
      {/* Kanban board */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className={cn(
              "flex-1 min-w-[200px] max-w-[280px] flex flex-col rounded-lg",
              "transition-all duration-200",
              "hover:bg-muted/30",
              draggedCandidate && draggedCandidate.fromStage !== stage.id && 
                "ring-2 ring-primary/30 bg-primary/5"
            )}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            {/* Column header */}
            <div className={cn(
              "px-3 py-2.5 rounded-t-lg border-b-[3px]",
              "transition-colors duration-200",
              stageColors[index] || "border-b-border"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{stage.name}</span>
                  <span className="text-[11px] text-muted-foreground bg-muted/80 px-1.5 py-0.5 rounded-md font-medium">
                    {stage.candidates.length}
                  </span>
                </div>
                {stage.avgDays > 0 && (
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <span className="text-[10px] text-muted-foreground/70 hover:text-muted-foreground transition-colors">
                        ~{stage.avgDays}d
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Gemiddeld {stage.avgDays} dagen in deze fase</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

            {/* Candidate cards */}
            <div className="flex-1 p-2 space-y-2.5 min-h-[200px]">
              {stage.candidates.map((candidate) => (
                <GlobalCandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onDragStart={(e) => handleDragStart(e, candidate.id, stage.id)}
                  onOpenDetails={() => handleOpenDetails(candidate, stage.name)}
                />
              ))}
              {stage.candidates.length === 0 && (
                <div className="h-full min-h-[120px] flex items-center justify-center text-xs text-muted-foreground border border-dashed border-border/40 rounded-lg bg-muted/20">
                  Geen kandidaten
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <CandidateDetailModal
          candidate={convertToModalCandidate(selectedCandidate)}
          currentStage={selectedStage}
          open={!!selectedCandidate}
          onOpenChange={(open) => !open && setSelectedCandidate(null)}
        />
      )}
    </div>
  );
}
