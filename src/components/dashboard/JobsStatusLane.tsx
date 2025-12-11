import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, TrendingUp, TrendingDown, Minus, Clock, ArrowRight } from "lucide-react";
import type { JobStatus } from "@/data/mockDashboardData";

interface JobsStatusLaneProps {
  jobs: JobStatus[];
}

const riskConfig = {
  low: { 
    border: "border-t-success",
    icon: TrendingUp,
    iconColor: "text-success",
    label: "Op koers"
  },
  medium: { 
    border: "border-t-warning",
    icon: Minus,
    iconColor: "text-warning",
    label: "Let op"
  },
  high: { 
    border: "border-t-destructive",
    icon: TrendingDown,
    iconColor: "text-destructive",
    label: "Risico"
  },
};

export function JobsStatusLane({ jobs }: JobsStatusLaneProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
            <Briefcase className="h-4.5 w-4.5 text-muted-foreground" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Per vacature</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{jobs.length} openstaand</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
          {jobs.map((job) => {
            const config = riskConfig[job.riskLevel];
            const StatusIcon = config.icon;
            
            return (
              <div
                key={job.jobId}
                className={`flex-shrink-0 w-[260px] rounded-xl border border-border/50 border-t-2 ${config.border} bg-card hover:shadow-md transition-all cursor-pointer group`}
              >
                <div className="p-5 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate">{job.title}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <StatusIcon className={`h-3.5 w-3.5 ${config.iconColor}`} />
                        <span className={`text-xs ${config.iconColor}`}>{config.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* ETA */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>ETA: {job.etaLabel}</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border/50" />

                  {/* Next action */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground line-clamp-1 flex-1">{job.nextAction}</p>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all ml-2" />
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
