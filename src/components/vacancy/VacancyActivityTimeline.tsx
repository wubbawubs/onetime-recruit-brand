import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, UserPlus, Globe, FileText, MessageSquare, Mail, ArrowRight } from "lucide-react";
import type { ActivityItem } from "@/data/mockVacancyData";

interface VacancyActivityTimelineProps {
  activities: ActivityItem[];
}

const activityIcons = {
  stage_change: ArrowRight,
  new_candidate: UserPlus,
  published: Globe,
  scorecard: FileText,
  note: MessageSquare,
  email: Mail,
};

export function VacancyActivityTimeline({ activities }: VacancyActivityTimelineProps) {
  // Group activities by relative time
  const groupedActivities = activities.reduce((acc, activity) => {
    const key = activity.relativeTime;
    if (!acc[key]) acc[key] = [];
    acc[key].push(activity);
    return acc;
  }, {} as Record<string, ActivityItem[]>);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-base">Activiteit</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
          
          <div className="space-y-4">
            {Object.entries(groupedActivities).map(([timeLabel, items]) => (
              <div key={timeLabel} className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground ml-6">{timeLabel}</p>
                {items.map((activity) => {
                  const Icon = activityIcons[activity.type];
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="relative z-10 h-4 w-4 rounded-full bg-background border border-border flex items-center justify-center">
                        <Icon className="h-2.5 w-2.5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.description}</span>
                          {activity.actor && (
                            <span className="text-muted-foreground"> · {activity.actor}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
