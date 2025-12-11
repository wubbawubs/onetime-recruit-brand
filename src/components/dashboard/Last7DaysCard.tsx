import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Last7Days } from "@/data/mockDashboardData";

interface Last7DaysCardProps {
  stats: Last7Days;
}

export function Last7DaysCard({ stats }: Last7DaysCardProps) {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Afgelopen 7 dagen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Inline stats */}
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{stats.newApplications}</span> sollicitaties
          <span className="mx-2 text-border">•</span>
          <span className="font-semibold text-foreground">{stats.movedForward}</span> doorgeschoven
          <span className="mx-2 text-border">•</span>
          <span className="font-semibold text-success">{stats.hires}</span> hires
          <span className="mx-2 text-border">•</span>
          <span className="font-semibold text-muted-foreground">{stats.droppedOut}</span> afgehaakt
        </p>

        {/* Summary text */}
        <p className="text-sm text-muted-foreground">
          {stats.text}
        </p>
      </CardContent>
    </Card>
  );
}
