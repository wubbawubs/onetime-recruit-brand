import { Card, CardContent } from "@/components/ui/card";
import { Target, CheckCircle, AlertTriangle, XCircle, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VacancyHealth } from "@/data/mockVacancyData";

interface VacancyHealthCardProps {
  health: VacancyHealth;
}

const statusConfig = {
  on_track: { label: 'Op koers', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500' },
  risk: { label: 'Risico', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500' },
  critical: { label: 'Kritiek', icon: XCircle, color: 'text-destructive', bg: 'bg-destructive' },
};

const inflowLabels = {
  good: 'Goed',
  moderate: 'Matig', 
  low: 'Laag',
};

export function VacancyHealthCard({ health }: VacancyHealthCardProps) {
  const statusStyle = statusConfig[health.status];
  const StatusIcon = statusStyle.icon;
  const progressPercent = Math.min(100, Math.round((health.throughput.avgDays / health.throughput.targetDays) * 100));

  return (
    <Card className="border-border/60 overflow-hidden">
      {/* Header with icon and status */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary/10">
            <Target className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-semibold">Recruitment Intelligence</span>
        </div>
        <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", statusStyle.color, "bg-current/10")}>
          <StatusIcon className="h-3 w-3" />
          <span>{statusStyle.label}</span>
        </div>
      </div>

      <CardContent className="px-4 pb-4 space-y-4">
        {/* Big headline metric */}
        <div className="text-center py-2">
          <div className="text-3xl font-bold tracking-tight">{health.throughput.avgDays}d</div>
          <div className="text-xs text-muted-foreground mt-0.5">doorlooptijd</div>
          
          {/* Progress bar */}
          <div className="mt-3 px-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  progressPercent <= 70 ? "bg-emerald-500" : 
                  progressPercent <= 90 ? "bg-amber-500" : "bg-destructive"
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>{progressPercent}% van target</span>
              <span>doel: {health.throughput.targetDays}d</span>
            </div>
          </div>
        </div>

        {/* Two-column mini metrics */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Instroom</div>
              <div className="text-sm font-medium">{inflowLabels[health.inflow]}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Snelheid</div>
              <div className="text-sm font-medium">{health.responseSpeed.avgDays}d</div>
            </div>
          </div>
        </div>

        {/* Advice section */}
        <div className="pt-3 border-t border-border/50">
          <div className="flex items-start gap-2">
            <span className="text-base">💡</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {health.advice}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
