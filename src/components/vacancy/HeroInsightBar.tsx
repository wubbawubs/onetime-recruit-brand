import { Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroInsight {
  bottleneckStage: string;
  avgDelay: number;
  impactDays: string;
  recommendation: string;
}

interface HeroInsightBarProps {
  insight: HeroInsight;
  onActionClick?: () => void;
}

export function HeroInsightBar({ insight, onActionClick }: HeroInsightBarProps) {
  return (
    <div className={cn(
      "flex items-center justify-between gap-4 px-4 py-3 rounded-lg",
      "bg-primary/5 border border-primary/10",
      "animate-in fade-in slide-in-from-top-2 duration-500"
    )}>
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 shrink-0">
          <Lightbulb className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-foreground">
            <span className="font-medium">Kandidaten blijven gemiddeld {insight.avgDelay} dagen</span>
            {" "}hangen in '{insight.bottleneckStage}'.{" "}
            <span className="text-muted-foreground">
              Impact: +{insight.impactDays} vertraging.
            </span>
          </p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="shrink-0 text-primary hover:text-primary hover:bg-primary/10"
        onClick={onActionClick}
      >
        Bekijk acties
        <ArrowRight className="h-3.5 w-3.5 ml-1" />
      </Button>
    </div>
  );
}
