import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VacancyAction } from "@/data/mockVacancyData";

interface VacancyActionsCardProps {
  actions: VacancyAction[];
}

export function VacancyActionsCard({ actions }: VacancyActionsCardProps) {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-warning" />
          <CardTitle className="text-sm font-medium">Deze week</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-2.5">
          {actions.slice(0, 3).map((action) => (
            <div key={action.id} className="flex items-start gap-2 group">
              <div className={cn(
                "h-1.5 w-1.5 rounded-full mt-1.5 shrink-0",
                action.urgency === 'high' ? 'bg-destructive' : 'bg-warning'
              )} />
              <div className="flex-1 min-w-0">
                <p className="text-xs leading-relaxed text-muted-foreground">{action.description}</p>
                <button className="flex items-center gap-0.5 text-[11px] text-primary hover:text-primary/80 transition-colors mt-0.5">
                  {action.cta}
                  <ArrowRight className="h-2.5 w-2.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
