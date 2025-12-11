import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ProcessQuality } from "@/data/mockDashboardData";

interface ProcessQualityCardProps {
  quality: ProcessQuality;
}

function getStatusLabel(metric: string, value: number): { label: string; color: string } {
  if (metric === "responseTime") {
    if (value <= 2) return { label: "goed", color: "text-success" };
    if (value <= 3) return { label: "kan beter", color: "text-warning" };
    return { label: "te traag", color: "text-destructive" };
  }
  if (metric === "within48h") {
    if (value >= 80) return { label: "goed", color: "text-success" };
    if (value >= 60) return { label: "kan beter", color: "text-warning" };
    return { label: "te laag", color: "text-destructive" };
  }
  if (metric === "stale") {
    if (value === 0) return { label: "perfect", color: "text-success" };
    if (value <= 3) return { label: "aandacht", color: "text-warning" };
    return { label: "actie nodig", color: "text-destructive" };
  }
  return { label: "", color: "text-muted-foreground" };
}

export function ProcessQualityCard({ quality }: ProcessQualityCardProps) {
  const responseStatus = getStatusLabel("responseTime", quality.avgResponseTimeDays);
  const within48hStatus = getStatusLabel("within48h", quality.pctWithin48h);
  const staleStatus = getStatusLabel("stale", quality.staleCandidatesCount);

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Opvolgkwaliteit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-0">
        {/* Score */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-foreground">{quality.score}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
          <Progress value={quality.score} className="h-1.5" />
        </div>

        {/* Metrics */}
        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Reactiesnelheid</span>
            <span className="text-foreground">
              {quality.avgResponseTimeDays} dagen{" "}
              <span className={`text-xs ${responseStatus.color}`}>({responseStatus.label})</span>
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">48u-respons</span>
            <span className="text-foreground">
              {quality.pctWithin48h}%{" "}
              <span className={`text-xs ${within48hStatus.color}`}>({within48hStatus.label})</span>
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Vastlopers</span>
            <span className="text-foreground">
              {quality.staleCandidatesCount}{" "}
              <span className={`text-xs ${staleStatus.color}`}>({staleStatus.label})</span>
            </span>
          </div>
        </div>

        {/* CTA */}
        {quality.staleCandidatesCount > 0 && (
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            Vastlopers bekijken →
          </button>
        )}
      </CardContent>
    </Card>
  );
}
