import { AlertTriangle, CheckCircle, ArrowRight, BarChart3, Target } from "lucide-react";
import type { HeroInsight } from "@/data/mockDashboardData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HeroInsightBarProps {
  insight: HeroInsight;
}

export function HeroInsightBar({ insight }: HeroInsightBarProps) {
  const onTrack = 3;
  const total = 4;
  const bottleneckJob = "Senior Developer";
  const daysSilent = 18;

  // Today's focus - the intelligent guidance
  const todayFocus = "Senior Developer oppakken + 3 kandidaten opvolgen voor Eerste gesprek";

  return (
    <div className="space-y-4">
      {/* Today Focus - The copilot guidance */}
      <Card className="border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Target className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wider">Vandaag</p>
            <p className="text-sm font-medium text-foreground">{todayFocus}</p>
          </div>
        </div>
      </Card>

      {/* Main hero bar */}
      <Card className="border-border/40 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 lg:gap-10">
            {/* Icon */}
            <div className={`h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-xl flex items-center justify-center shrink-0 ${
              insight.hasBottleneck ? "bg-warning/10" : "bg-success/10"
            }`}>
              {insight.hasBottleneck ? (
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-warning" />
              ) : (
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-success" />
              )}
            </div>
            
            {/* Main stat */}
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1 sm:mb-2">Wekelijkse status</p>
              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">{onTrack}</span>
                <span className="text-base sm:text-lg lg:text-xl text-muted-foreground">van {total}</span>
                <span className="text-sm sm:text-base text-muted-foreground">vacatures op koers</span>
              </div>
            </div>
            
            {/* Bottleneck */}
            {insight.hasBottleneck && (
              <>
                <div className="hidden sm:block h-12 lg:h-16 w-px bg-border/40" />
                <div className="flex items-start gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/30">
                  <div className="h-2 w-2 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{bottleneckJob} stagneert</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{daysSilent} dagen stil</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* CTA */}
          {insight.hasBottleneck && (
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-2 self-start sm:self-center">
              Bekijk details
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
