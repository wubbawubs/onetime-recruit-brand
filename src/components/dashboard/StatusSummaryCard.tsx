import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, TrendingUp, TrendingDown, Minus, Users, Code, Headphones } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VacancyStatus {
  title: string;
  status: "on-track" | "delayed" | "at-risk";
  candidates: number;
  eta: string;
  icon: React.ElementType;
}

interface StatusSummaryCardProps {
  summaryText: string;
}

// Parse the summary text to extract key data with icons
function extractVacancyData(): VacancyStatus[] {
  return [
    { title: "Accountmanager", status: "on-track", candidates: 9, eta: "3 wkn", icon: Users },
    { title: "Sales Support", status: "delayed", candidates: 5, eta: "4-5 wkn", icon: Headphones },
    { title: "Senior Developer", status: "at-risk", candidates: 2, eta: "Onzeker", icon: Code },
    { title: "Office Manager", status: "on-track", candidates: 4, eta: "5-6 wkn", icon: Briefcase },
  ];
}

const statusConfig = {
  "on-track": { icon: TrendingUp, color: "text-success" },
  "delayed": { icon: Minus, color: "text-warning" },
  "at-risk": { icon: TrendingDown, color: "text-destructive" },
};

export function StatusSummaryCard({ summaryText }: StatusSummaryCardProps) {
  const vacancies = extractVacancyData();
  const onTrack = vacancies.filter(v => v.status === "on-track").length;
  const atRisk = vacancies.filter(v => v.status === "at-risk").length;

  return (
    <Card className="border-border/40 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Vacaturestatus</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">{vacancies.length} openstaand</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <Badge variant="secondary" className="text-[10px] font-medium bg-success/10 text-success border-0 px-2 py-0.5">
              {onTrack} op koers
            </Badge>
            {atRisk > 0 && (
              <Badge variant="secondary" className="text-[10px] font-medium bg-destructive/10 text-destructive border-0 px-2 py-0.5">
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
            const JobIcon = vacancy.icon;
            return (
              <div
                key={vacancy.title}
                className={`flex items-center justify-between py-3.5 group cursor-pointer hover:bg-muted/30 -mx-6 px-6 transition-colors ${
                  index !== vacancies.length - 1 ? "border-b border-border/30" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <JobIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{vacancy.title}</span>
                  <StatusIcon className={`h-3.5 w-3.5 ${config.color}`} />
                </div>
                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                  <span>{vacancy.candidates} kandidaten</span>
                  <span className="w-14 text-right">{vacancy.eta}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
