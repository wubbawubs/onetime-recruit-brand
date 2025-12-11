import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
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
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Je kandidatenstroom</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div>
          <span className="text-3xl font-semibold text-foreground">{totalActive}</span>
          <span className="text-sm text-muted-foreground ml-2">actieve kandidaten</span>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {perStage.map((stage, index) => (
            <span key={stage.stageName}>
              <span className="font-medium text-foreground">{stage.count}</span>
              {" "}{stage.stageName}
              {index < perStage.length - 1 && <span className="mx-1.5 text-border">•</span>}
            </span>
          ))}
        </p>

        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <AlertTriangle className="h-3.5 w-3.5 text-warning flex-shrink-0" />
          {bottleneckDescription}
        </p>
      </CardContent>
    </Card>
  );
}
