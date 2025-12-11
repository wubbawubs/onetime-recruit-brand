import { Link } from "react-router-dom";
import { Briefcase, Users, ChevronRight, Plus, Pause, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mockVacancyList } from "@/data/mockVacancyData";

const statusConfig = {
  live: { label: "Live", color: "bg-emerald-500", textColor: "text-emerald-700", bgColor: "bg-emerald-50" },
  draft: { label: "Concept", color: "bg-slate-400", textColor: "text-slate-600", bgColor: "bg-slate-50" },
  paused: { label: "Gepauzeerd", color: "bg-amber-500", textColor: "text-amber-700", bgColor: "bg-amber-50" },
  closed: { label: "Gesloten", color: "bg-slate-500", textColor: "text-slate-600", bgColor: "bg-slate-50" },
};

export default function Vacatures() {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Vacatures</h1>
            <p className="text-muted-foreground mt-1">
              Beheer je openstaande vacatures en bekijk de voortgang.
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nieuwe vacature
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Totaal actief</p>
            <p className="text-2xl font-semibold mt-1">
              {mockVacancyList.filter(v => v.status === 'live').length}
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Gepauzeerd</p>
            <p className="text-2xl font-semibold mt-1">
              {mockVacancyList.filter(v => v.status === 'paused').length}
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Totaal kandidaten</p>
            <p className="text-2xl font-semibold mt-1">
              {mockVacancyList.reduce((sum, v) => sum + v.candidateCount, 0)}
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Concepten</p>
            <p className="text-2xl font-semibold mt-1">
              {mockVacancyList.filter(v => v.status === 'draft').length}
            </p>
          </div>
        </div>

        {/* Vacancy list */}
        <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border/50">
            <h2 className="font-medium">Alle vacatures</h2>
          </div>
          
          <div className="divide-y divide-border/50">
            {mockVacancyList.map((vacancy) => {
              const status = statusConfig[vacancy.status];
              
              return (
                <Link
                  key={vacancy.id}
                  to={`/vacatures/${vacancy.id}`}
                  className="flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {vacancy.title}
                        </p>
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "text-[10px] font-medium px-2 py-0 h-5",
                            status.bgColor, status.textColor
                          )}
                        >
                          <span className={cn("h-1.5 w-1.5 rounded-full mr-1.5", status.color)} />
                          {status.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {vacancy.candidateCount} kandidaten
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
