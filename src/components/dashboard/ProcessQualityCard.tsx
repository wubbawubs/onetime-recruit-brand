import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, Clock, Zap, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { ProcessQuality } from "@/data/mockDashboardData";

interface ProcessQualityCardProps {
  quality: ProcessQuality;
}

export function ProcessQualityCard({ quality }: ProcessQualityCardProps) {
  const scoreColor = quality.score >= 80 ? "text-success" : quality.score >= 60 ? "text-warning" : "text-destructive";
  const scoreLabel = quality.score >= 80 ? "Goed" : quality.score >= 60 ? "Matig" : "Actie nodig";

  return (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-accent/50 flex items-center justify-center">
              <Gauge className="h-4.5 w-4.5 text-foreground" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Proceskwaliteit</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Opvolgsnelheid</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-bold ${scoreColor}`}>{quality.score}</span>
            <p className="text-xs text-muted-foreground">{scoreLabel}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {/* Progress bar */}
        <Progress value={quality.score} className="h-1.5" />

        {/* Metrics grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <Clock className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-semibold text-foreground">{quality.avgResponseTimeDays}d</p>
            <p className="text-[10px] text-muted-foreground">Gem. reactie</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <Zap className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-semibold text-foreground">{quality.pctWithin48h}%</p>
            <p className="text-[10px] text-muted-foreground">&lt;48u reactie</p>
          </div>
          
          <div className={`text-center p-3 rounded-lg ${quality.staleCandidatesCount > 0 ? "bg-destructive/5" : "bg-muted/30"}`}>
            <AlertCircle className={`h-4 w-4 mx-auto mb-1 ${quality.staleCandidatesCount > 0 ? "text-destructive" : "text-muted-foreground"}`} />
            <p className={`text-lg font-semibold ${quality.staleCandidatesCount > 0 ? "text-destructive" : "text-foreground"}`}>
              {quality.staleCandidatesCount}
            </p>
            <p className="text-[10px] text-muted-foreground">Vastgelopen</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
