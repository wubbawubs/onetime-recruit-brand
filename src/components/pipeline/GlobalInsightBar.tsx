import { AlertTriangle, TrendingUp, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlobalInsightBarProps {
  bottleneck: {
    stage: string;
    avgDays: number;
    impact: number;
  } | null;
  onStageClick?: (stage: string) => void;
}

export function GlobalInsightBar({ bottleneck, onStageClick }: GlobalInsightBarProps) {
  if (!bottleneck) {
    return (
      <div className={cn(
        "flex items-center gap-3 px-5 py-3.5 rounded-xl",
        "bg-emerald-500/10 border border-emerald-500/20"
      )}>
        <TrendingUp className="h-4 w-4 text-emerald-600 shrink-0" />
        <p className="text-sm text-emerald-700 dark:text-emerald-400">
          <span className="font-medium">Pipeline loopt soepel.</span>
          {" "}Geen significante bottlenecks gedetecteerd over alle vacatures.
        </p>
      </div>
    );
  }

  const handleClick = () => {
    if (onStageClick) {
      onStageClick(bottleneck.stage);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-left",
        "bg-amber-500/10 border border-amber-500/20",
        "hover:bg-amber-500/15 hover:border-amber-500/30 transition-colors",
        "cursor-pointer group"
      )}
    >
      <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
      <p className="text-sm text-amber-800 dark:text-amber-300 flex-1">
        <span className="font-medium">Bottleneck in '{bottleneck.stage}'</span>
        {" "}— kandidaten blijven gemiddeld {bottleneck.avgDays} dagen hangen.
        {" "}Dit vertraagt je doorlooptijd met{" "}
        <span className="font-semibold">+{bottleneck.impact} dagen</span> over alle vacatures.
      </p>
      <span className="text-xs text-amber-600 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        Filter
        <ChevronRight className="h-3 w-3" />
      </span>
    </button>
  );
}
