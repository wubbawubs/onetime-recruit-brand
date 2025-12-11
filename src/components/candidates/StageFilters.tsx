import { cn } from "@/lib/utils";

interface StageFiltersProps {
  stages: { id: string; label: string }[];
  counts: Record<string, number>;
  activeStage: string;
  onStageChange: (stage: string) => void;
}

export function StageFilters({ stages, counts, activeStage, onStageChange }: StageFiltersProps) {
  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto pb-2 pr-8">
        {stages.map((stage) => {
          const count = counts[stage.id] || 0;
          const isActive = activeStage === stage.id;
          
          return (
            <button
              key={stage.id}
              onClick={() => onStageChange(stage.id)}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap",
                "transition-all duration-200",
                "border shrink-0",
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
      {/* Scroll indicator gradient */}
      <div className="absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
}
