import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { JobStatus } from "@/data/mockDashboardData";
import { cn } from "@/lib/utils";

interface JobsStatusLaneProps {
  jobs: JobStatus[];
}

const riskConfig = {
  low: {
    borderColor: "border-t-success",
    badgeClass: "bg-success/10 text-success",
    label: "Laag risico",
  },
  medium: {
    borderColor: "border-t-warning",
    badgeClass: "bg-warning/10 text-warning",
    label: "Gemiddeld",
  },
  high: {
    borderColor: "border-t-destructive",
    badgeClass: "bg-destructive/10 text-destructive",
    label: "Hoog risico",
  },
};

export function JobsStatusLane({ jobs }: JobsStatusLaneProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Status per vacature</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
          {jobs.map((job) => {
            const config = riskConfig[job.riskLevel];
            
            return (
              <div
                key={job.jobId}
                className={cn(
                  "flex-shrink-0 w-[300px] p-5 rounded-xl border border-border/50 bg-card hover:shadow-md transition-all cursor-pointer group",
                  "border-t-2",
                  config.borderColor
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-foreground text-sm">
                    {job.title}
                  </h4>
                  <Badge variant="secondary" className={cn("text-xs font-normal", config.badgeClass)}>
                    {config.label}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {job.statusLabel}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    ETA: <span className="text-foreground font-medium">{job.etaLabel}</span>
                  </span>
                  <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Details →
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/30">
                  {job.nextAction}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
