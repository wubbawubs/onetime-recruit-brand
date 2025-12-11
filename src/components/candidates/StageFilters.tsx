import { cn } from "@/lib/utils";

interface StageFiltersProps {
  stages: { id: string; label: string }[];
  counts: Record<string, number>;
  activeStage: string;
  onStageChange: (stage: string) => void;
}

export function StageFilters({ stages, counts, activeStage, onStageChange }: StageFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {stages.map((stage) => {
        const count = counts[stage.id] || 0;
        const isActive = activeStage === stage.id;
        
        return (
          <button
            key={stage.id}
            onClick={() => onStageChange(stage.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap",
              "transition-all duration-200",
              "border",
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:bg-muted/50 hover:text-foreground"
            )}
          >
            {stage.label}
            <span
              className={cn(
                "text-xs px-1.5 py-0.5 rounded-full",
                isActive
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
