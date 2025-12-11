import { CheckCircle, AlertTriangle } from "lucide-react";
import type { HeroInsight } from "@/data/mockDashboardData";

interface HeroInsightBarProps {
  insight: HeroInsight;
}

export function HeroInsightBar({ insight }: HeroInsightBarProps) {
  return (
    <div className="w-full bg-muted/60 border border-border/50 px-6 py-5 rounded-xl">
      <div className="flex items-center gap-3">
        {insight.hasBottleneck ? (
          <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0" />
        ) : (
          <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
        )}
        <p className="text-sm text-foreground leading-relaxed">
          {insight.text}
          {insight.hasBottleneck && (
            <button className="ml-2 text-primary hover:text-primary/80 font-medium transition-colors">
              Bekijk details →
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
