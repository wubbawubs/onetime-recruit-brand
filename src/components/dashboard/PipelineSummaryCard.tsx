import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, AlertTriangle } from "lucide-react";
import type { PipelineStage } from "@/data/mockDashboardData";

interface PipelineSummaryCardProps {
  totalActive: number;
  perStage: PipelineStage[];
  bottleneckDescription: string;
}

export function PipelineSummaryCard({ 
  totalActive, 
  perStage, 
  bottleneckDescription 
}: PipelineSummaryCardProps) {
  return (
    <Card className="border-border/40 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Pipeline</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Kandidatenstroom</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-5">
        {/* Big number */}
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-foreground">{totalActive}</span>
          <span className="text-sm text-muted-foreground">actief</span>
        </div>

        {/* Stage breakdown - visual bar */}
        <div className="space-y-3">
          <div className="flex h-2.5 rounded-full overflow-hidden bg-muted/50">
            {perStage.map((stage, index) => {
              const width = (stage.count / totalActive) * 100;
              const colors = [
                "bg-primary/30",
                "bg-primary/50", 
                "bg-primary/70",
                "bg-primary/90",
                "bg-success"
              ];
              return (
                <div 
                  key={stage.stageName}
                  className={`${colors[index]} transition-all`}
                  style={{ width: `${width}%` }}
                />
              );
            })}
          </div>
          
          {/* Stage labels */}
          <div className="flex justify-between text-xs text-muted-foreground">
            {perStage.map(stage => (
              <div key={stage.stageName} className="text-center">
                <span className="font-semibold text-foreground text-sm">{stage.count}</span>
                <p className="text-[10px] truncate max-w-[55px]">{stage.stageName}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottleneck warning */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-warning/5 border border-warning/20">
          <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Bottleneck:</span> Nieuw → Eerste gesprek
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
