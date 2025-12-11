import { CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroInsight } from "@/data/mockDashboardData";

interface HeroInsightBarProps {
  insight: HeroInsight;
}

export function HeroInsightBar({ insight }: HeroInsightBarProps) {
  return (
    <div className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-l-4 border-accent p-5 rounded-lg">
      <div className="flex items-start gap-4">
        {insight.hasBottleneck ? (
          <AlertTriangle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
        ) : (
          <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
        )}
        <p className="flex-1 text-lg font-medium text-foreground leading-relaxed">
          {insight.text}
        </p>
        {insight.hasBottleneck && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-shrink-0 text-accent hover:text-accent hover:bg-accent/10"
          >
            Bekijk bottleneck
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
