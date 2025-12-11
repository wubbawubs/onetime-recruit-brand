import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VacancyHealth } from "@/data/mockVacancyData";

interface VacancyHealthCardProps {
  health: VacancyHealth;
}

const statusConfig = {
  on_track: { label: 'Op koers', icon: CheckCircle, color: 'text-success' },
  risk: { label: 'Risico', icon: AlertTriangle, color: 'text-warning' },
  critical: { label: 'Kritiek', icon: XCircle, color: 'text-destructive' },
};

export function VacancyHealthCard({ health }: VacancyHealthCardProps) {
  const statusStyle = statusConfig[health.status];
  const StatusIcon = statusStyle.icon;

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Gezondheid</CardTitle>
          </div>
          <div className={cn("flex items-center gap-1", statusStyle.color)}>
            <StatusIcon className="h-4 w-4" />
            <span className="text-xs font-medium">{statusStyle.label}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4">
        {/* Compact meters */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Instroom</span>
            <span className="font-medium">{health.inflow === 'good' ? 'Goed' : health.inflow === 'moderate' ? 'Matig' : 'Laag'}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Doorlooptijd</span>
            <span className="font-medium">{health.throughput.avgDays}d <span className="text-muted-foreground font-normal">/ {health.throughput.targetDays}d</span></span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Reactietijd</span>
            <span className="font-medium">{health.responseSpeed.avgDays}d</span>
          </div>
        </div>

        {/* Advice */}
        <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/50">
          {health.advice}
        </p>
      </CardContent>
    </Card>
  );
}
