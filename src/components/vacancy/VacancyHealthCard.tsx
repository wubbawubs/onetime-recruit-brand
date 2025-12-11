import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VacancyHealth } from "@/data/mockVacancyData";

interface VacancyHealthCardProps {
  health: VacancyHealth;
}

const statusConfig = {
  on_track: { label: 'Op koers', icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
  risk: { label: 'Risico', icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
  critical: { label: 'Kritiek', icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
};

const inflowConfig = {
  good: { label: 'Goed', color: 'bg-success' },
  moderate: { label: 'Matig', color: 'bg-warning' },
  low: { label: 'Laag', color: 'bg-destructive' },
};

export function VacancyHealthCard({ health }: VacancyHealthCardProps) {
  const statusStyle = statusConfig[health.status];
  const StatusIcon = statusStyle.icon;
  const inflowStyle = inflowConfig[health.inflow];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-base">Vacaturegezondheid</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">Signalen en risico's voor deze rol</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main status */}
        <div className={cn("flex items-center gap-2 px-3 py-2 rounded-lg", statusStyle.bg)}>
          <StatusIcon className={cn("h-5 w-5", statusStyle.color)} />
          <span className={cn("font-semibold", statusStyle.color)}>{statusStyle.label}</span>
        </div>

        {/* Mini meters */}
        <div className="space-y-3">
          {/* Instroom */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Instroom</span>
              <span className="font-medium">{inflowStyle.label}</span>
            </div>
            <div className="flex gap-1 h-2">
              <div className={cn("flex-1 rounded-l", health.inflow === 'low' ? 'bg-destructive' : 'bg-muted')} />
              <div className={cn("flex-1", health.inflow === 'moderate' ? 'bg-warning' : 'bg-muted')} />
              <div className={cn("flex-1 rounded-r", health.inflow === 'good' ? 'bg-success' : 'bg-muted')} />
            </div>
          </div>

          {/* Doorlooptijd */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Doorlooptijd</span>
              <span className="font-medium">
                Gem: {health.throughput.avgDays}d 
                <span className="text-muted-foreground"> · Doel: &lt;{health.throughput.targetDays}d</span>
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all",
                  health.throughput.avgDays <= health.throughput.targetDays ? 'bg-success' : 'bg-warning'
                )}
                style={{ width: `${Math.min((health.throughput.avgDays / health.throughput.targetDays) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Opvolgsnelheid */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Opvolgsnelheid</span>
              <span className="font-medium">Gem. reactie: {health.responseSpeed.avgDays}d</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all",
                  health.responseSpeed.avgDays <= 2 ? 'bg-success' : health.responseSpeed.avgDays <= 3 ? 'bg-warning' : 'bg-destructive'
                )}
                style={{ width: `${Math.max(100 - (health.responseSpeed.avgDays * 20), 20)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Advice */}
        <div className="pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {health.advice}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
