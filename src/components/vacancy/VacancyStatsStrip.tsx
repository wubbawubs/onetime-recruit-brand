import { Users, Calendar, Clock, Target } from "lucide-react";

interface VacancyStatsStripProps {
  totalCandidates: number;
  weeksOpen: number;
  lastUpdated: string;
  hires: number;
  hireGoal: number;
}

export function VacancyStatsStrip({ 
  totalCandidates, 
  weeksOpen, 
  lastUpdated, 
  hires, 
  hireGoal 
}: VacancyStatsStripProps) {
  const stats = [
    { icon: Users, label: `${totalCandidates} kandidaten in proces` },
    { icon: Calendar, label: `${weeksOpen} weken gepubliceerd` },
    { icon: Clock, label: `Laatst bijgewerkt: ${lastUpdated}` },
    { icon: Target, label: `${hires} hires · doel: ${hireGoal}` },
  ];

  return (
    <div className="flex items-center gap-6 py-3 border-b border-border">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
          <stat.icon className="h-4 w-4" />
          <span>{stat.label}</span>
          {index < stats.length - 1 && (
            <span className="ml-6 h-4 w-px bg-border" />
          )}
        </div>
      ))}
    </div>
  );
}
