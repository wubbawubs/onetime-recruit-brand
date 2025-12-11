import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { CandidateCard } from "./CandidateCard";
import { CandidateDetailModal } from "./CandidateDetailModal";
import { cn } from "@/lib/utils";
import type { PipelineStage, Candidate } from "@/data/mockVacancyData";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface VacancyPipelineProps {
  stages: PipelineStage[];
  onStageChange?: (candidateId: string, fromStage: string, toStage: string) => void;
}

export function VacancyPipeline({ stages: initialStages, onStageChange }: VacancyPipelineProps) {
  const [viewMode, setViewMode] = useState<'pipeline' | 'list'>('pipeline');
  const [stages, setStages] = useState(initialStages);
  const [draggedCandidate, setDraggedCandidate] = useState<{ id: string; fromStage: string } | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
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
          toStage.candidates.push({ ...candidate, daysInStage: 0 });
        }
      }

      return newStages;
    });

    onStageChange?.(draggedCandidate.id, draggedCandidate.fromStage, toStageId);
    setDraggedCandidate(null);
  };

  const handleOpenDetails = (candidate: Candidate, stageName: string) => {
    setSelectedCandidate(candidate);
    setSelectedStage(stageName);
  };

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Pipeline</h2>
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          <Button
            variant={viewMode === 'pipeline' ? 'secondary' : 'ghost'}
            size="sm"
            className="h-7 px-2"
            onClick={() => setViewMode('pipeline')}
          >
            <LayoutGrid className="h-4 w-4 mr-1" />
            Pipeline
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            className="h-7 px-2"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4 mr-1" />
            Lijst
          </Button>
        </div>
      </div>

      {/* Kanban board - fluid columns */}
      <div className="flex gap-3">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className={cn(
              "flex-1 min-w-[180px] flex flex-col rounded-lg transition-all",
              draggedCandidate && draggedCandidate.fromStage !== stage.id && "ring-2 ring-primary/20 bg-primary/5"
            )}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            {/* Column header */}
            <div className={cn(
              "flex items-center justify-between px-3 py-2.5 rounded-t-lg border-b-2",
              index === 0 && "border-b-blue-400/60",
              index === 1 && "border-b-amber-400/60",
              index === 2 && "border-b-purple-400/60",
              index === 3 && "border-b-emerald-400/60",
              index === 4 && "border-b-success"
            )}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{stage.name}</span>
                <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  {stage.candidates.length}
                </span>
              </div>
              {stage.avgDays > 0 && (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <span className="text-[10px] text-muted-foreground">
                      ~{stage.avgDays}d
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Gemiddeld {stage.avgDays} dagen in deze fase</TooltipContent>
                </Tooltip>
              )}
            </div>

            {/* Candidate cards */}
            <div className="flex-1 p-2 space-y-2 min-h-[200px]">
              {stage.candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onDragStart={(e) => handleDragStart(e, candidate.id, stage.id)}
                  onOpenDetails={() => handleOpenDetails(candidate, stage.name)}
                />
              ))}
              {stage.candidates.length === 0 && (
                <div className="h-full min-h-[120px] flex items-center justify-center text-xs text-muted-foreground border border-dashed border-border/50 rounded-lg">
                  Geen kandidaten
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Detail Modal */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        currentStage={selectedStage}
        open={!!selectedCandidate}
        onOpenChange={(open) => !open && setSelectedCandidate(null)}
      />
    </div>
  );
}
