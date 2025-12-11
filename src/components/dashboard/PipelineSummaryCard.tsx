import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingDown } from "lucide-react";
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
  // Gradient colors from light to dark
  const gradientColors = [
    "bg-primary/20",
    "bg-primary/40", 
    "bg-primary/60",
    "bg-primary/80",
    "bg-primary"
  ];

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

        {/* Stage breakdown - gradient visual bar */}
        <div className="space-y-3">
          <div className="flex h-3 rounded-full overflow-hidden bg-muted/30">
            {perStage.map((stage, index) => {
              const width = (stage.count / totalActive) * 100;
              return (
                <div 
                  key={stage.stageName}
                  className={`${gradientColors[index]} transition-all`}
                  style={{ width: `${width}%` }}
                />
              );
            })}
          </div>
          
          {/* Stage labels */}
          <div className="flex justify-between text-xs text-muted-foreground">
            {perStage.map((stage, index) => (
              <div key={stage.stageName} className="text-center">
                <div 
                  className={`h-1.5 w-1.5 rounded-full mx-auto mb-1 ${gradientColors[index]}`} 
                />
                <span className="font-semibold text-foreground text-sm">{stage.count}</span>
                <p className="text-[10px] truncate max-w-[55px]">{stage.stageName}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Smart bottleneck analysis */}
        <div className="p-3 rounded-lg bg-warning/5 border border-warning/20 space-y-1.5">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-warning flex-shrink-0" />
            <p className="text-xs font-medium text-foreground">
              Doorlooptijd vertraagt door lage opvolgsnelheid in Nieuw
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground pl-6">
            Impact: +4–7 dagen vertraging deze week
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
