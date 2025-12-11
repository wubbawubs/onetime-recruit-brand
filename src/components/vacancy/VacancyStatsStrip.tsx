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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 py-3 border-b border-border">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <stat.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span className="truncate">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
