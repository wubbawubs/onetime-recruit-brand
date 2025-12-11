import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, AlertCircle, Clock, UserX, Calendar } from "lucide-react";
import type { AttentionItem } from "@/data/mockDashboardData";

interface TodayImportantCardProps {
  items: AttentionItem[];
}

const iconMap = {
  stale_stage: Clock,
  pending_offer: AlertCircle,
  no_new_candidates: UserX,
  urgent: Calendar,
};

export function TodayImportantCard({ items }: TodayImportantCardProps) {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Vandaag belangrijk</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {items.map((item) => {
          const Icon = iconMap[item.type];
          return (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-muted transition-colors group"
            >
              <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="flex-1 text-sm text-muted-foreground">
                {item.label}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
