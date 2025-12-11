import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, UserPlus, UserCheck, UserMinus } from "lucide-react";
import type { Last7Days } from "@/data/mockDashboardData";

interface Last7DaysCardProps {
  stats: Last7Days;
}

export function Last7DaysCard({ stats }: Last7DaysCardProps) {
  return (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
            <Calendar className="h-4.5 w-4.5 text-muted-foreground" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Afgelopen 7 dagen</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Activiteit</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-3 rounded-lg bg-primary/5">
            <UserPlus className="h-4 w-4 mx-auto text-primary mb-1" />
            <p className="text-xl font-bold text-foreground">{stats.newApplications}</p>
            <p className="text-[10px] text-muted-foreground">Nieuw</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <TrendingUp className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <p className="text-xl font-bold text-foreground">{stats.movedForward}</p>
            <p className="text-[10px] text-muted-foreground">Verder</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-success/5">
            <UserCheck className="h-4 w-4 mx-auto text-success mb-1" />
            <p className="text-xl font-bold text-success">{stats.hires}</p>
            <p className="text-[10px] text-muted-foreground">Hired</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <UserMinus className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <p className="text-xl font-bold text-muted-foreground">{stats.droppedOut}</p>
            <p className="text-[10px] text-muted-foreground">Uit</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
