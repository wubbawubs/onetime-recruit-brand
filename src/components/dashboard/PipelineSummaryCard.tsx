import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Je kandidatenstroom in het kort</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          In totaal heb je <strong className="text-foreground">{totalActive} actieve kandidaten</strong>.
        </p>
        
        {/* Stage breakdown */}
        <div className="flex flex-wrap gap-2">
          {perStage.map((stage) => (
            <div 
              key={stage.stageName}
              className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg"
            >
              <span className="text-sm text-muted-foreground">{stage.stageName}</span>
              <span className="text-sm font-semibold text-foreground">{stage.count}</span>
            </div>
          ))}
        </div>

        {/* Bottleneck */}
        <p className="text-sm text-muted-foreground border-l-2 border-warning pl-3">
          {bottleneckDescription}
        </p>
      </CardContent>
    </Card>
  );
}
