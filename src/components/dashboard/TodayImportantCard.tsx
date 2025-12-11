import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ArrowRight } from "lucide-react";
import type { AttentionItem } from "@/data/mockDashboardData";
import { cn } from "@/lib/utils";

interface TodayImportantCardProps {
  items: AttentionItem[];
}

const urgencyConfig = {
  high: { dot: "bg-destructive" },
  medium: { dot: "bg-warning" },
  low: { dot: "bg-muted-foreground/40" },
};

// Shorten labels for scannability
function shortenLabel(label: string): { main: string; detail: string } {
  if (label.includes("kandidaten wachten")) {
    return { main: "3 kandidaten wachten >5 dagen", detail: "Eerste gesprek" };
  }
  if (label.includes("aanbod")) {
    return { main: "1 aanbod open", detail: "4 dagen zonder reactie" };
  }
  if (label.includes("vacatures hebben afgelopen week")) {
    return { main: "2 vacatures zonder instroom", detail: "Afgelopen week" };
  }
  if (label.includes("tweede gesprek")) {
    return { main: "1 gesprek vandaag", detail: "14:00" };
  }
  return { main: label.slice(0, 40), detail: "" };
}

export function TodayImportantCard({ items }: TodayImportantCardProps) {
  const highPriority = items.filter(i => i.urgency === "high").length;

  return (
    <Card className="border-border/40 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-warning/10 flex items-center justify-center">
            <Zap className="h-4 w-4 text-warning" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Vandaag belangrijk</CardTitle>
              {highPriority > 0 && (
                <span className="text-xs font-semibold text-destructive bg-destructive/15 px-3 py-1 rounded-full border border-destructive/20">
                  {highPriority} urgent
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{items.length} actiepunten</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-0">
          {items.map((item, index) => {
            const config = urgencyConfig[item.urgency];
            const { main, detail } = shortenLabel(item.label);
            
            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-center justify-between py-3.5 group cursor-pointer hover:bg-muted/30 -mx-6 px-6 transition-colors",
                  index !== items.length - 1 && "border-b border-border/30"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn("h-2 w-2 rounded-full flex-shrink-0", config.dot)} />
                  <div>
                    <p className="text-sm text-foreground">{main}</p>
                    {detail && (
                      <p className="text-xs text-muted-foreground">{detail}</p>
                    )}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
