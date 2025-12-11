import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { CandidateCard } from "./CandidateCard";
import { CandidateDetailModal } from "./CandidateDetailModal";
import { cn } from "@/lib/utils";
import type { PipelineStage, Candidate } from "@/data/mockVacancyData";

interface VacancyPipelineProps {
  stages: PipelineStage[];
  fullWidth?: boolean;
  onStageChange?: (candidateId: string, fromStage: string, toStage: string) => void;
}

export function VacancyPipeline({ stages: initialStages, fullWidth = false, onStageChange }: VacancyPipelineProps) {
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
        <div>
          <h2 className="text-lg font-semibold">Pipeline</h2>
          <p className="text-sm text-muted-foreground">Kandidaten per fase</p>
        </div>
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

      {/* Kanban board */}
      <div className={cn(
        "flex gap-4 overflow-x-auto pb-4",
        fullWidth && "justify-start"
      )}>
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={cn(
              "flex-shrink-0 bg-muted/50 rounded-xl p-3 transition-colors",
              fullWidth ? "w-[calc((100%-64px)/5)] min-w-[220px]" : "w-64",
              draggedCandidate && draggedCandidate.fromStage !== stage.id && "ring-2 ring-primary/20"
            )}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">{stage.name}</h3>
                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                  {stage.candidates.length}
                </Badge>
              </div>
            </div>
            
            {stage.avgDays > 0 && (
              <p className="text-xs text-muted-foreground mb-3">
                Gem: {stage.avgDays} dagen
              </p>
            )}

            {/* Candidate cards */}
            <div className="space-y-2">
              {stage.candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onDragStart={(e) => handleDragStart(e, candidate.id, stage.id)}
                  onOpenDetails={() => handleOpenDetails(candidate, stage.name)}
                />
              ))}
              {stage.candidates.length === 0 && (
                <div className="py-8 text-center text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg">
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
