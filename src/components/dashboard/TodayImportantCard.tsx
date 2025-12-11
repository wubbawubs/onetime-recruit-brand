import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, AlertTriangle, Clock, Calendar, ChevronRight } from "lucide-react";
import type { AttentionItem } from "@/data/mockDashboardData";
import { cn } from "@/lib/utils";

interface TodayImportantCardProps {
  items: AttentionItem[];
}

const urgencyConfig = {
  high: {
    icon: AlertTriangle,
    borderColor: "border-l-destructive",
    iconColor: "text-destructive",
  },
  medium: {
    icon: Clock,
    borderColor: "border-l-warning",
    iconColor: "text-warning",
  },
  low: {
    icon: Calendar,
    borderColor: "border-l-muted-foreground/30",
    iconColor: "text-muted-foreground",
  },
};

export function TodayImportantCard({ items }: TodayImportantCardProps) {
  const highUrgencyCount = items.filter(i => i.urgency === "high").length;

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Vandaag belangrijk</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {items.length}
          </Badge>
        </div>
        {highUrgencyCount > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <Flame className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Directe aandacht nodig ({highUrgencyCount})
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => {
          const config = urgencyConfig[item.urgency];
          const Icon = config.icon;
          
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border-l-4 bg-muted/50 hover:bg-muted transition-colors group",
                config.borderColor
              )}
            >
              <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", config.iconColor)} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  → {item.impact}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex-shrink-0 text-xs text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {item.ctaLabel}
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
