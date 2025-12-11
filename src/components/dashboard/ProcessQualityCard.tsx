import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, Clock, Zap, AlertCircle, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { ProcessQuality } from "@/data/mockDashboardData";

interface ProcessQualityCardProps {
  quality: ProcessQuality;
}

export function ProcessQualityCard({ quality }: ProcessQualityCardProps) {
  const scoreColor = quality.score >= 80 ? "text-success" : quality.score >= 60 ? "text-warning" : "text-destructive";
  const scoreLabel = quality.score >= 80 ? "Goed" : quality.score >= 60 ? "Matig" : "Actie nodig";

  // Calculate insight scores
  const speedScore = quality.avgResponseTimeDays <= 2 ? "good" : quality.avgResponseTimeDays <= 4 ? "medium" : "slow";
  const rhythmScore = quality.pctWithin48h >= 80 ? "good" : quality.pctWithin48h >= 60 ? "medium" : "inconsistent";
  const stagnationScore = quality.staleCandidatesCount <= 2 ? "good" : quality.staleCandidatesCount <= 5 ? "medium" : "high";

  const insightColors = {
    good: "bg-success",
    medium: "bg-warning", 
    slow: "bg-destructive",
    inconsistent: "bg-warning",
    high: "bg-destructive"
  };

  // Generate advisory text based on scores
  const getAdvisoryText = () => {
    if (rhythmScore === "inconsistent" && stagnationScore === "high") {
      return "Je reactietijd is inconsistent. Vastlopers zijn te hoog.";
    } else if (speedScore === "slow") {
      return "Reactietijd te traag. Dit verlengt doorlooptijd significant.";
    } else if (stagnationScore === "high") {
      return "Te veel vastgelopen kandidaten. Opruimen of activeren.";
    } else if (rhythmScore === "inconsistent") {
      return "Reactietijd prima, maar inconsistent. Ritme verbeteren.";
    }
    return "Proces loopt goed. Blijf dit tempo vasthouden.";
  };

  return (
    <Card className="border-border/40 shadow-sm hover:shadow-md transition-shadow">
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
        {/* 3-insight bar */}
        <div className="space-y-2">
          <div className="flex h-2 rounded-full overflow-hidden bg-muted/30">
            <div className={`flex-1 ${insightColors[speedScore]}`} title="Snelheid" />
            <div className={`flex-1 ${insightColors[rhythmScore]} mx-0.5`} title="Ritme" />
            <div className={`flex-1 ${insightColors[stagnationScore]}`} title="Stagnatie" />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Snelheid</span>
            <span>Ritme</span>
            <span>Stagnatie</span>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <Clock className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-semibold text-foreground">{quality.avgResponseTimeDays}d</p>
            <p className="text-[10px] text-muted-foreground">Gem. reactie</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <Activity className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-semibold text-foreground">{quality.pctWithin48h}%</p>
            <p className="text-[10px] text-muted-foreground">&lt;48u reactie</p>
          </div>
          
          <div className={`text-center p-3 rounded-lg ${quality.staleCandidatesCount > 2 ? "bg-destructive/5" : "bg-muted/30"}`}>
            <AlertCircle className={`h-4 w-4 mx-auto mb-1 ${quality.staleCandidatesCount > 2 ? "text-destructive" : "text-muted-foreground"}`} />
            <p className={`text-lg font-semibold ${quality.staleCandidatesCount > 2 ? "text-destructive" : "text-foreground"}`}>
              {quality.staleCandidatesCount}
            </p>
            <p className="text-[10px] text-muted-foreground">Vastgelopen</p>
          </div>
        </div>

        {/* Advisory text */}
        <p className="text-xs text-muted-foreground italic border-t border-border/30 pt-3">
          {getAdvisoryText()}
        </p>
      </CardContent>
    </Card>
  );
}
