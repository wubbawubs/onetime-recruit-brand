import { AlertTriangle, CheckCircle, ArrowRight, BarChart3 } from "lucide-react";
import type { HeroInsight } from "@/data/mockDashboardData";
import { Button } from "@/components/ui/button";

interface HeroInsightBarProps {
  insight: HeroInsight;
}

export function HeroInsightBar({ insight }: HeroInsightBarProps) {
  const onTrack = 3;
  const total = 4;
  const bottleneckJob = "Senior Developer";
  const daysSilent = 18;

  return (
    <div className="w-full bg-card border border-border/40 rounded-xl p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Icon */}
          <div className={`h-14 w-14 rounded-xl flex items-center justify-center ${
            insight.hasBottleneck ? "bg-warning/10" : "bg-success/10"
          }`}>
            <BarChart3 className={`h-7 w-7 ${insight.hasBottleneck ? "text-warning" : "text-success"}`} />
          </div>
          
          {/* Main stat */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Wekelijkse status</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{onTrack}</span>
              <span className="text-xl text-muted-foreground">van {total}</span>
              <span className="text-base text-muted-foreground ml-1">vacatures op koers</span>
            </div>
          </div>
          
          {/* Bottleneck */}
          {insight.hasBottleneck && (
            <>
              <div className="h-14 w-px bg-border/50" />
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-sm font-medium text-foreground">{bottleneckJob} stagneert</p>
                  <p className="text-xs text-muted-foreground">{daysSilent} dagen stil</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* CTA */}
        {insight.hasBottleneck && (
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-2">
            Bekijk details
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
