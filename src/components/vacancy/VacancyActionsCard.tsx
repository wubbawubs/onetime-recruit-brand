import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VacancyAction } from "@/data/mockVacancyData";

interface VacancyActionsCardProps {
  actions: VacancyAction[];
}

export function VacancyActionsCard({ actions }: VacancyActionsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-warning" />
          <CardTitle className="text-base">Deze week oppakken</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => (
            <div key={action.id} className="flex items-start gap-3 group">
              <div className={cn(
                "h-2 w-2 rounded-full mt-1.5 shrink-0",
                action.urgency === 'high' ? 'bg-destructive' : 'bg-warning'
              )} />
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed">{action.description}</p>
                <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mt-1">
                  {action.cta}
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
