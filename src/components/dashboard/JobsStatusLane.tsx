import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import type { JobStatus } from "@/data/mockDashboardData";
import { cn } from "@/lib/utils";

interface JobsStatusLaneProps {
  jobs: JobStatus[];
}

const riskConfig = {
  low: {
    borderColor: "border-t-success",
    badgeClass: "bg-success/10 text-success border-success/20",
    label: "Laag",
  },
  medium: {
    borderColor: "border-t-warning",
    badgeClass: "bg-warning/10 text-warning border-warning/20",
    label: "Gemiddeld",
  },
  high: {
    borderColor: "border-t-destructive",
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
    label: "Hoog",
  },
};

export function JobsStatusLane({ jobs }: JobsStatusLaneProps) {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Status per vacature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
          {jobs.map((job) => {
            const config = riskConfig[job.riskLevel];
            
            return (
              <div
                key={job.jobId}
                className={cn(
                  "flex-shrink-0 w-[280px] p-4 rounded-lg border border-border bg-card hover:shadow-elevated transition-shadow",
                  "border-t-4",
                  config.borderColor
                )}
              >
                <h4 className="font-semibold text-foreground mb-2">
                  {job.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {job.statusLabel}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-muted-foreground">
                    ETA: <span className="text-foreground font-medium">{job.etaLabel}</span>
                  </span>
                  <Badge variant="outline" className={cn("text-xs", config.badgeClass)}>
                    {config.label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3 italic">
                  {job.nextAction}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between text-xs hover:bg-muted"
                >
                  {job.riskLevel === "high" ? "Actie nodig" : "Details"}
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
