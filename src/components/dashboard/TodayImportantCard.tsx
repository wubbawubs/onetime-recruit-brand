import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AttentionItem } from "@/data/mockDashboardData";
import { cn } from "@/lib/utils";

interface TodayImportantCardProps {
  items: AttentionItem[];
}

const urgencyDot = {
  high: "bg-destructive",
  medium: "bg-warning",
  low: "bg-muted-foreground/30",
};

export function TodayImportantCard({ items }: TodayImportantCardProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Vandaag belangrijk</CardTitle>
          <span className="text-xs text-muted-foreground">{items.length} items</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-0">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "flex items-start gap-3 py-3 group cursor-pointer hover:bg-muted/30 -mx-6 px-6 transition-colors",
                index !== items.length - 1 && "border-b border-border/30"
              )}
            >
              <span className={cn("h-2 w-2 rounded-full mt-1.5 flex-shrink-0", urgencyDot[item.urgency])} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  → {item.impact}
                </p>
              </div>
              <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                {item.ctaLabel}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
