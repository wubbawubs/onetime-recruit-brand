import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FunnelData } from '@/data/mockReportsData';

interface FunnelCardProps {
  data: FunnelData;
}

export function FunnelCard({ data }: FunnelCardProps) {
  const maxCount = Math.max(...data.stages.map(s => s.count));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Pipeline Funnel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Visual funnel flow */}
        <div className="flex items-center justify-between gap-1">
          {data.stages.map((stage, index) => (
            <div key={stage.name} className="flex items-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{stage.count}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[60px]">
                  {stage.name === 'Eerste gesprek' ? 'EG' : 
                   stage.name === 'Tweede gesprek' ? 'TG' : 
                   stage.name}
                </div>
              </div>
              {index < data.stages.length - 1 && (
                <span className="text-muted-foreground/50 mx-1">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Visual bar representation */}
        <div className="flex h-3 rounded-full overflow-hidden bg-muted/30">
          {data.stages.map((stage, index) => {
            const width = (stage.count / data.totalIn) * 100;
            const colors = [
              'bg-primary/20',
              'bg-primary/40',
              'bg-primary/60',
              'bg-primary/80',
              'bg-emerald-500',
            ];
            return (
              <div
                key={stage.name}
                className={`${colors[index]} transition-all`}
                style={{ width: `${width}%` }}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <span className="text-sm font-medium">Totaal conversie</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">{data.overallConversion}%</span>
            <p className="text-xs text-muted-foreground">
              {data.totalHired} van {data.totalIn} kandidaten
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
