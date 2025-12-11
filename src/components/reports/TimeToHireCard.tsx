import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimeToHireData } from '@/data/mockReportsData';

interface TimeToHireCardProps {
  data: TimeToHireData;
}

export function TimeToHireCard({ data }: TimeToHireCardProps) {
  const percentageOfTarget = Math.round((data.avgDays / data.targetDays) * 100);
  const isOnTrack = data.avgDays <= data.targetDays;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Time to Hire
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-4xl font-bold tracking-tight">{data.avgDays}d</div>
          <p className="text-sm text-muted-foreground mt-1">
            ↳ {percentageOfTarget}% van target ({data.targetDays}d)
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Min: {data.minDays}d</span>
          <span className="text-border">·</span>
          <span>Max: {data.maxDays}d</span>
        </div>

        <div className="pt-2 border-t border-border/50">
          <p className="text-xs font-medium text-muted-foreground mb-2">Per bron</p>
          <div className="space-y-1.5">
            {data.bySource.slice(0, 3).map((source) => (
              <div key={source.source} className="flex items-center justify-between text-sm">
                <span>{source.source}</span>
                <span className="text-muted-foreground">
                  {source.avgDays}d · {source.hires} {source.hires === 1 ? 'hire' : 'hires'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
