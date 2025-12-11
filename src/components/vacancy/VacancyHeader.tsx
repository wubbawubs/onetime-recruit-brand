import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Users, ChevronDown, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockVacancyList } from "@/data/mockVacancyData";
import { cn } from "@/lib/utils";

interface VacancyHeaderProps {
  id?: string;
  title: string;
  company: string;
  location: string;
  contractType: string;
  status: 'live' | 'draft' | 'paused' | 'closed' | 'filled';
  onEditClick?: () => void;
}

const statusConfig = {
  live: { label: 'Live', className: 'bg-success/10 text-success border-success/20' },
  draft: { label: 'Concept', className: 'bg-muted text-muted-foreground border-border' },
  paused: { label: 'Gepauzeerd', className: 'bg-warning/10 text-warning border-warning/20' },
  closed: { label: 'Gesloten', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  filled: { label: 'Ingevuld', className: 'bg-primary/10 text-primary border-primary/20' },
};

export function VacancyHeader({ id, title, company, location, contractType, status, onEditClick }: VacancyHeaderProps) {
  const statusStyle = statusConfig[status];
  const navigate = useNavigate();

  const handleCandidateListClick = () => {
    // Navigate to candidates page with vacancy filter
    navigate(`/kandidaten?vacancy=${id}`);
  };

  return (
    <div className="flex items-start justify-between gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80">
              {mockVacancyList.map((vacancy) => (
                <DropdownMenuItem
                  key={vacancy.id}
                  onClick={() => navigate(`/vacatures/${vacancy.id}`)}
                  className="flex items-center justify-between py-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {vacancy.id === id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                    <div className={cn(vacancy.id !== id && "ml-7")}>
                      <p className="font-medium text-sm">{vacancy.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {vacancy.candidateCount} kandidaten
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn("text-[10px]", statusConfig[vacancy.status].className)}>
                    {statusConfig[vacancy.status].label}
                  </Badge>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Badge variant="outline" className={statusStyle.className}>
            {statusStyle.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {company} · {location} · {contractType}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={handleCandidateListClick}>
          <Users className="h-4 w-4 mr-2" />
          Kandidatenlijst
        </Button>
        <Button size="sm" onClick={onEditClick}>
          <Edit className="h-4 w-4 mr-2" />
          Vacature bewerken
        </Button>
      </div>
    </div>
  );
}
