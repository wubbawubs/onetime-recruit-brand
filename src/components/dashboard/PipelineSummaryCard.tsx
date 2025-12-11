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
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Je kandidatenstroom in het kort</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          In totaal heb je <span className="text-2xl font-bold text-foreground">{totalActive}</span> actieve kandidaten.
        </p>
        
        {/* Inline pipeline stages */}
        <p className="text-sm text-muted-foreground">
          {perStage.map((stage, index) => (
            <span key={stage.stageName}>
              <span className="font-medium text-foreground">{stage.count}</span>
              {" "}{stage.stageName}
              {index < perStage.length - 1 && <span className="mx-2 text-border">•</span>}
            </span>
          ))}
        </p>

        {/* Bottleneck */}
        <div className="flex items-start gap-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            {bottleneckDescription}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
