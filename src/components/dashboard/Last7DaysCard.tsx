import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Last7Days } from "@/data/mockDashboardData";

interface Last7DaysCardProps {
  stats: Last7Days;
}

export function Last7DaysCard({ stats }: Last7DaysCardProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Afgelopen 7 dagen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{stats.newApplications}</span> sollicitaties
          <span className="mx-1.5 text-border">•</span>
          <span className="font-medium text-foreground">{stats.movedForward}</span> doorgeschoven
          <span className="mx-1.5 text-border">•</span>
          <span className="font-medium text-success">{stats.hires}</span> hires
          <span className="mx-1.5 text-border">•</span>
          <span className="font-medium text-muted-foreground">{stats.droppedOut}</span> afgehaakt
        </p>

        <p className="text-sm text-muted-foreground">
          {stats.text}
        </p>
      </CardContent>
    </Card>
  );
}
