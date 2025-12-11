import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SourceEffectivenessData } from '@/data/mockReportsData';

interface SourcesCardProps {
  data: SourceEffectivenessData;
}

export function SourcesCard({ data }: SourcesCardProps) {
  const sortedSources = [...data.sources].sort((a, b) => b.conversionPct - a.conversionPct);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Target className="h-4 w-4 text-muted-foreground" />
          Bronnen Effectiviteit
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedSources.map((source) => (
            <div key={source.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`h-2 w-2 rounded-full ${
                    source.conversionPct >= 20
                      ? 'bg-emerald-500'
                      : source.conversionPct >= 10
                      ? 'bg-amber-500'
                      : 'bg-muted-foreground/30'
                  }`}
                />
                <span className="text-sm font-medium">{source.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{source.candidates}</span>
                <span className="text-border">·</span>
                <span>
                  {source.hires} {source.hires === 1 ? 'hire' : 'hires'}
                </span>
                <span className="text-border">·</span>
                <span className="font-medium text-foreground">{source.conversionPct}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Beste bron: <span className="font-medium text-foreground">{sortedSources[0]?.name}</span> met {sortedSources[0]?.conversionPct}% conversie
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
