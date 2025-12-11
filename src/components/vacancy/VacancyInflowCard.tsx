import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowRight } from "lucide-react";
import type { SourceData } from "@/data/mockVacancyData";

interface VacancyInflowCardProps {
  last14Days: number;
  sources: SourceData[];
}

export function VacancyInflowCard({ last14Days, sources }: VacancyInflowCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-base">Instroom & bronnen</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Big number */}
        <div>
          <p className="text-3xl font-bold">{last14Days}</p>
          <p className="text-sm text-muted-foreground">Nieuwe kandidaten · laatste 14 dagen</p>
        </div>

        {/* Sources list */}
        <div className="space-y-2 pt-2 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Topbronnen</p>
          <div className="space-y-2">
            {sources.map((source) => (
              <div key={source.name} className="flex items-center justify-between text-sm">
                <span className="font-medium">{source.name}</span>
                <span className="text-muted-foreground">
                  {source.candidates} kand. · {source.hires} hires · {source.conversion}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors group">
          Alle bronnen bekijken
          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </CardContent>
    </Card>
  );
}
