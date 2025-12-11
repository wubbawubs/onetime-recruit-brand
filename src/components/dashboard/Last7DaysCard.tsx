import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowRight, UserCheck, UserMinus } from "lucide-react";

interface Last7DaysCardProps {
  newApplications: number;
  movedForward: number;
  hires: number;
  droppedOut: number;
  text: string;
}

function parseMarkdownBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="text-foreground font-semibold">
          {part}
        </strong>
      );
    }
    return part;
  });
}

export function Last7DaysCard({ 
  newApplications, 
  movedForward, 
  hires, 
  droppedOut,
  text 
}: Last7DaysCardProps) {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Afgelopen 7 dagen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xl font-semibold text-foreground">{newApplications}</p>
              <p className="text-xs text-muted-foreground">Nieuwe sollicitaties</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <ArrowRight className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xl font-semibold text-foreground">{movedForward}</p>
              <p className="text-xs text-muted-foreground">Doorgeschoven</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <UserCheck className="h-5 w-5 text-success" />
            <div>
              <p className="text-xl font-semibold text-foreground">{hires}</p>
              <p className="text-xs text-muted-foreground">Hires</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <UserMinus className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xl font-semibold text-foreground">{droppedOut}</p>
              <p className="text-xs text-muted-foreground">Afgehaakt</p>
            </div>
          </div>
        </div>

        {/* Text summary */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {parseMarkdownBold(text)}
        </p>
      </CardContent>
    </Card>
  );
}
