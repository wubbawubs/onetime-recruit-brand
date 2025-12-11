import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import type { HeroInsight } from "@/data/mockDashboardData";
import { Button } from "@/components/ui/button";

interface HeroInsightBarProps {
  insight: HeroInsight;
}

export function HeroInsightBar({ insight }: HeroInsightBarProps) {
  // Extract key numbers from insight
  const onTrack = 3;
  const total = 4;
  const bottleneckJob = "Senior Developer";
  const daysSilent = 18;

  return (
    <div className="w-full bg-card border border-border/50 rounded-xl overflow-hidden">
      <div className="flex items-stretch">
        {/* Main stat */}
        <div className="flex-1 p-6 flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
              insight.hasBottleneck ? "bg-warning/10" : "bg-success/10"
            }`}>
              {insight.hasBottleneck ? (
                <AlertTriangle className="h-6 w-6 text-warning" />
              ) : (
                <CheckCircle className="h-6 w-6 text-success" />
              )}
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-foreground">{onTrack}</span>
                <span className="text-lg text-muted-foreground">/ {total}</span>
              </div>
              <p className="text-sm text-muted-foreground">vacatures op koers</p>
            </div>
          </div>
          
          {insight.hasBottleneck && (
            <>
              <div className="h-12 w-px bg-border/50" />
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                <div>
                  <p className="text-sm font-medium text-foreground">{bottleneckJob}</p>
                  <p className="text-xs text-muted-foreground">{daysSilent} dagen stil</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* CTA */}
        {insight.hasBottleneck && (
          <div className="flex items-center px-6 bg-muted/30 border-l border-border/50">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-2">
              Bekijk details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
