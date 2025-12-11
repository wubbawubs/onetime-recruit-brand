import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, TrendingUp, TrendingDown, Minus, Users, Code, Headphones } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VacancyStatus {
  title: string;
  status: "on-track" | "delayed" | "at-risk";
  candidates: number;
  eta: string;
  icon: React.ElementType;
  // Heatmap indicators
  instroom: "good" | "medium" | "low";
  doorloop: "good" | "medium" | "stalled";
}

interface StatusSummaryCardProps {
  summaryText: string;
}

// Parse the summary text to extract key data with icons and heatmap data
function extractVacancyData(): VacancyStatus[] {
  return [
    { title: "Accountmanager", status: "on-track", candidates: 9, eta: "3 wkn", icon: Users, instroom: "good", doorloop: "good" },
    { title: "Sales Support", status: "delayed", candidates: 5, eta: "4-5 wkn", icon: Headphones, instroom: "medium", doorloop: "medium" },
    { title: "Senior Developer", status: "at-risk", candidates: 2, eta: "Onzeker", icon: Code, instroom: "low", doorloop: "stalled" },
    { title: "Office Manager", status: "on-track", candidates: 4, eta: "5-6 wkn", icon: Briefcase, instroom: "good", doorloop: "good" },
  ];
}

const statusConfig = {
  "on-track": { icon: TrendingUp, color: "text-success" },
  "delayed": { icon: Minus, color: "text-warning" },
  "at-risk": { icon: TrendingDown, color: "text-destructive" },
};

const heatmapColors = {
  good: "bg-success",
  medium: "bg-warning",
  low: "bg-destructive",
  stalled: "bg-destructive",
};

export function StatusSummaryCard({ summaryText }: StatusSummaryCardProps) {
  const vacancies = extractVacancyData();
  const onTrack = vacancies.filter(v => v.status === "on-track").length;
  const atRisk = vacancies.filter(v => v.status === "at-risk").length;

  return (
    <Card className="border-border/40 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Briefcase className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Vacaturestatus</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">{vacancies.length} openstaand</p>
            </div>
          </div>
          {/* Mini heatmap legend - hidden on small screens */}
          <div className="hidden sm:flex items-center gap-3 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span>Goed</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-warning" />
              <span>Traag</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-destructive" />
              <span>Risico</span>
            </div>
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
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Mini heatmap dots */}
                  <div className="flex items-center gap-1.5" title="Instroom / Doorloop">
                    <div className={`h-2 w-2 rounded-full ${heatmapColors[vacancy.instroom]}`} />
                    <div className={`h-2 w-2 rounded-full ${heatmapColors[vacancy.doorloop]}`} />
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                    <span className="whitespace-nowrap">{vacancy.candidates} kand.</span>
                    <span className="hidden xs:inline whitespace-nowrap text-right">{vacancy.eta}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
