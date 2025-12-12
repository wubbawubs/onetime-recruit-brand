import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Users, ChevronDown, Check, Archive } from "lucide-react";
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
  onArchiveClick?: () => void;
}

const statusConfig = {
  live: { label: 'Live', className: 'bg-success/10 text-success border-success/20' },
  draft: { label: 'Concept', className: 'bg-muted text-muted-foreground border-border' },
  paused: { label: 'Gepauzeerd', className: 'bg-warning/10 text-warning border-warning/20' },
  closed: { label: 'Gesloten', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  filled: { label: 'Ingevuld', className: 'bg-primary/10 text-primary border-primary/20' },
};

export function VacancyHeader({ id, title, company, location, contractType, status, onEditClick, onArchiveClick }: VacancyHeaderProps) {
  const statusStyle = statusConfig[status];
  const navigate = useNavigate();

  const handleCandidateListClick = () => {
    // Navigate to candidates page with vacancy filter
    navigate(`/kandidaten?vacancy=${id}`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div className="space-y-2 min-w-0">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity group min-w-0">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight truncate">{title}</h1>
                <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 sm:w-80">
              {mockVacancyList.map((vacancy) => (
                <DropdownMenuItem
                  key={vacancy.id}
                  onClick={() => navigate(`/vacatures/${vacancy.id}`)}
                  className="flex items-center justify-between py-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {vacancy.id === id && (
                      <Check className="h-4 w-4 text-primary shrink-0" />
                    )}
                    <div className={cn("min-w-0", vacancy.id !== id && "ml-7")}>
                      <p className="font-medium text-sm truncate">{vacancy.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {vacancy.candidateCount} kandidaten
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn("text-[10px] shrink-0 ml-2", statusConfig[vacancy.status].className)}>
                    {statusConfig[vacancy.status].label}
                  </Badge>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Badge variant="outline" className={cn("shrink-0", statusStyle.className)}>
            {statusStyle.label}
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {company} · {location} · {contractType}
        </p>
      </div>
      
      <div className="flex items-center gap-2 shrink-0">
        <Button variant="ghost" size="sm" className="text-muted-foreground h-8 sm:h-9 px-2 sm:px-3" onClick={handleCandidateListClick}>
          <Users className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Kandidatenlijst</span>
        </Button>
        {status === 'filled' && onArchiveClick && (
          <Button variant="outline" size="sm" onClick={onArchiveClick} className="h-8 sm:h-9 px-2 sm:px-3 text-muted-foreground">
            <Archive className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Archiveren</span>
          </Button>
        )}
        <Button size="sm" onClick={onEditClick} className="h-8 sm:h-9 px-2 sm:px-3">
          <Edit className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Vacature bewerken</span>
        </Button>
      </div>
    </div>
  );
}
