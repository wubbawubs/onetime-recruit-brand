import { AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlobalInsightBarProps {
  bottleneck: {
    stage: string;
    avgDays: number;
    impact: number;
  } | null;
}

export function GlobalInsightBar({ bottleneck }: GlobalInsightBarProps) {
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

  return (
    <div className={cn(
      "flex items-center gap-3 px-5 py-3.5 rounded-xl",
      "bg-amber-500/10 border border-amber-500/20"
    )}>
      <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
      <p className="text-sm text-amber-800 dark:text-amber-300">
        <span className="font-medium">Bottleneck in '{bottleneck.stage}'</span>
        {" "}— kandidaten blijven gemiddeld {bottleneck.avgDays} dagen hangen.
        {" "}Dit vertraagt je doorlooptijd met{" "}
        <span className="font-semibold">+{bottleneck.impact} dagen</span> over alle vacatures.
      </p>
    </div>
  );
}
