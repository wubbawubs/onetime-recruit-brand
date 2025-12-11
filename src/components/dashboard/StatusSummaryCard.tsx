import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VacancyStatus {
  title: string;
  status: "on-track" | "delayed" | "at-risk";
  candidates: number;
  eta: string;
}

interface StatusSummaryCardProps {
  summaryText: string;
}

// Parse the summary text to extract key data
function extractVacancyData(): VacancyStatus[] {
  return [
    { title: "Accountmanager", status: "on-track", candidates: 9, eta: "3 wkn" },
    { title: "Sales Support", status: "delayed", candidates: 5, eta: "4-5 wkn" },
    { title: "Senior Developer", status: "at-risk", candidates: 2, eta: "Onzeker" },
    { title: "Office Manager", status: "on-track", candidates: 4, eta: "5-6 wkn" },
  ];
}

const statusConfig = {
  "on-track": { icon: TrendingUp, color: "text-success", label: "Op koers" },
  "delayed": { icon: Minus, color: "text-warning", label: "Vertraagd" },
  "at-risk": { icon: TrendingDown, color: "text-destructive", label: "Risico" },
};

export function StatusSummaryCard({ summaryText }: StatusSummaryCardProps) {
  const vacancies = extractVacancyData();
  const onTrack = vacancies.filter(v => v.status === "on-track").length;
  const atRisk = vacancies.filter(v => v.status === "at-risk").length;

  return (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-4.5 w-4.5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Vacaturestatus</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">{vacancies.length} openstaand</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs font-medium bg-success/10 text-success border-0">
              {onTrack} op koers
            </Badge>
            {atRisk > 0 && (
              <Badge variant="secondary" className="text-xs font-medium bg-destructive/10 text-destructive border-0">
                {atRisk} risico
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-0">
          {vacancies.map((vacancy, index) => {
            const config = statusConfig[vacancy.status];
            const StatusIcon = config.icon;
            return (
              <div
                key={vacancy.title}
                className={`flex items-center justify-between py-3 group cursor-pointer hover:bg-muted/30 -mx-6 px-6 transition-colors ${
                  index !== vacancies.length - 1 ? "border-b border-border/30" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <StatusIcon className={`h-4 w-4 ${config.color}`} />
                  <span className="text-sm font-medium text-foreground">{vacancy.title}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">{vacancy.candidates} kandidaten</span>
                  <span className="text-xs text-muted-foreground w-16 text-right">{vacancy.eta}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
