import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Users } from "lucide-react";

interface VacancyHeaderProps {
  title: string;
  company: string;
  location: string;
  contractType: string;
  status: 'live' | 'draft' | 'paused' | 'closed';
}

const statusConfig = {
  live: { label: 'Live', className: 'bg-success/10 text-success border-success/20' },
  draft: { label: 'Concept', className: 'bg-muted text-muted-foreground border-border' },
  paused: { label: 'Gepauzeerd', className: 'bg-warning/10 text-warning border-warning/20' },
  closed: { label: 'Gesloten', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export function VacancyHeader({ title, company, location, contractType, status }: VacancyHeaderProps) {
  const statusStyle = statusConfig[status];

  return (
    <div className="flex items-start justify-between gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <Badge variant="outline" className={statusStyle.className}>
            {statusStyle.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {company} · {location} · {contractType}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          Kandidatenlijst
        </Button>
        <Button size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Vacature bewerken
        </Button>
      </div>
    </div>
  );
}
