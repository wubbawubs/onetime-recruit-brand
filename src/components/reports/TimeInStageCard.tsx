import { Timer, AlertTriangle, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimeInStageData } from '@/data/mockReportsData';

interface TimeInStageCardProps {
  data: TimeInStageData;
}

export function TimeInStageCard({ data }: TimeInStageCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Timer className="h-4 w-4 text-muted-foreground" />
          Doorlooptijd per fase
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.stages.map((stage) => {
            const isOverTarget = stage.avgDays > stage.targetDays;
            return (
              <div key={stage.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isOverTarget ? (
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Check className="h-4 w-4 text-emerald-500" />
                  )}
                  <span className={`text-sm ${stage.isBottleneck ? 'font-medium' : ''}`}>
                    {stage.name}
                  </span>
                  {stage.isBottleneck && (
                    <span className="text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">
                      bottleneck
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`font-medium ${isOverTarget ? 'text-amber-600' : 'text-foreground'}`}>
                    {stage.avgDays}d
                  </span>
                  <span className="text-muted-foreground text-xs">/ {stage.targetDays}d</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-border/50 bg-amber-500/5 -mx-6 -mb-6 px-6 py-3 rounded-b-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{data.bottleneck.stage}</span> is de langste bottleneck met +{data.bottleneck.delay}d boven target.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
