import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import type { JobStatus } from "@/data/mockDashboardData";
import { cn } from "@/lib/utils";

interface JobStatusCardProps {
  jobs: JobStatus[];
}

const riskStyles = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
};

const riskLabels = {
  low: "Laag",
  medium: "Gemiddeld",
  high: "Hoog",
};

export function JobStatusCard({ jobs }: JobStatusCardProps) {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Status per vacature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {jobs.map((job, index) => (
            <button
              key={job.jobId}
              className={cn(
                "w-full flex items-start gap-4 p-4 rounded-lg text-left hover:bg-muted transition-colors group",
                index !== jobs.length - 1 && "border-b border-border"
              )}
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1">
                  {job.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {job.statusLabel}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-muted-foreground">
                    ETA: <span className="text-foreground">{job.etaLabel}</span>
                  </span>
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", riskStyles[job.riskLevel])}
                  >
                    Risico: {riskLabels[job.riskLevel]}
                  </Badge>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors mt-1 flex-shrink-0" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
