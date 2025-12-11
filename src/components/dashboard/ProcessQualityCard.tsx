import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface ProcessQualityCardProps {
  avgResponseTimeDays: number;
  pctWithin48h: number;
  staleCandidatesCount: number;
  text: string;
}

function parseMarkdownBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="text-foreground font-semibold">
          {part}
        </strong>
      );
    }
    return part;
  });
}

export function ProcessQualityCard({ 
  avgResponseTimeDays, 
  pctWithin48h, 
  staleCandidatesCount,
  text 
}: ProcessQualityCardProps) {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Hoe goed volg je kandidaten op?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xl font-semibold text-foreground">{avgResponseTimeDays}d</p>
              <p className="text-xs text-muted-foreground">Gem. reactietijd</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <CheckCircle className="h-5 w-5 text-success" />
            <div>
              <p className="text-xl font-semibold text-foreground">{pctWithin48h}%</p>
              <p className="text-xs text-muted-foreground">Binnen 48u</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div>
              <p className="text-xl font-semibold text-foreground">{staleCandidatesCount}</p>
              <p className="text-xs text-muted-foreground">Vastgezet</p>
            </div>
          </div>
        </div>

        {/* Text summary */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {parseMarkdownBold(text)}
        </p>
      </CardContent>
    </Card>
  );
}
