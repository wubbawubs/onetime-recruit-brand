import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import type { SourceData } from "@/data/mockVacancyData";

interface VacancyInflowCardProps {
  last14Days: number;
  sources: SourceData[];
}

export function VacancyInflowCard({ last14Days, sources }: VacancyInflowCardProps) {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Instroom</CardTitle>
          </div>
          <span className="text-lg font-semibold">{last14Days}</span>
        </div>
        <p className="text-[11px] text-muted-foreground">Laatste 14 dagen</p>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-1.5">
          {sources.slice(0, 3).map((source) => (
            <div key={source.name} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{source.name}</span>
              <span className="font-medium">{source.candidates} · {source.conversion}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
