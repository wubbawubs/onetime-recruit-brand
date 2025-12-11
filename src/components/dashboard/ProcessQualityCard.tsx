import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Circle, X, ChevronRight } from "lucide-react";
import type { ProcessQuality } from "@/data/mockDashboardData";

interface ProcessQualityCardProps {
  quality: ProcessQuality;
}

function getMetricStatus(metric: string, value: number): { icon: React.ReactNode; label: string; color: string } {
  if (metric === "responseTime") {
    if (value <= 2) return { icon: <Check className="h-4 w-4" />, label: "goed", color: "text-success" };
    if (value <= 3) return { icon: <Circle className="h-4 w-4" />, label: "kan beter", color: "text-warning" };
    return { icon: <X className="h-4 w-4" />, label: "te traag", color: "text-destructive" };
  }
  if (metric === "within48h") {
    if (value >= 80) return { icon: <Check className="h-4 w-4" />, label: "goed", color: "text-success" };
    if (value >= 60) return { icon: <Circle className="h-4 w-4" />, label: "kan beter", color: "text-warning" };
    return { icon: <X className="h-4 w-4" />, label: "te laag", color: "text-destructive" };
  }
  if (metric === "stale") {
    if (value === 0) return { icon: <Check className="h-4 w-4" />, label: "perfect", color: "text-success" };
    if (value <= 3) return { icon: <Circle className="h-4 w-4" />, label: "aandacht", color: "text-warning" };
    return { icon: <X className="h-4 w-4" />, label: "direct oplossen", color: "text-destructive" };
  }
  return { icon: <Circle className="h-4 w-4" />, label: "", color: "text-muted-foreground" };
}

export function ProcessQualityCard({ quality }: ProcessQualityCardProps) {
  const responseStatus = getMetricStatus("responseTime", quality.avgResponseTimeDays);
  const within48hStatus = getMetricStatus("within48h", quality.pctWithin48h);
  const staleStatus = getMetricStatus("stale", quality.staleCandidatesCount);

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Hoe goed volg je kandidaten op?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Score with progress bar */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-foreground">{quality.score}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
          <Progress value={quality.score} className="h-2" />
          <p className="text-xs text-muted-foreground">Procesgezondheid</p>
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={responseStatus.color}>{responseStatus.icon}</span>
              <span className="text-sm text-muted-foreground">Reactiesnelheid:</span>
              <span className="text-sm font-medium text-foreground">{quality.avgResponseTimeDays} dagen</span>
            </div>
            <span className={`text-xs ${responseStatus.color}`}>({responseStatus.label})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={within48hStatus.color}>{within48hStatus.icon}</span>
              <span className="text-sm text-muted-foreground">48u-respons:</span>
              <span className="text-sm font-medium text-foreground">{quality.pctWithin48h}%</span>
            </div>
            <span className={`text-xs ${within48hStatus.color}`}>({within48hStatus.label})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={staleStatus.color}>{staleStatus.icon}</span>
              <span className="text-sm text-muted-foreground">Vastlopers:</span>
              <span className="text-sm font-medium text-foreground">{quality.staleCandidatesCount} kandidaten</span>
            </div>
            <span className={`text-xs ${staleStatus.color}`}>({staleStatus.label})</span>
          </div>
        </div>

        {/* CTA */}
        {quality.staleCandidatesCount > 0 && (
          <Button variant="outline" size="sm" className="w-full justify-between">
            Vastlopers bekijken
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
