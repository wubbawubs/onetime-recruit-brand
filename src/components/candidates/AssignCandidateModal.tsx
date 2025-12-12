import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Briefcase, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockVacancyList } from "@/data/mockVacancyData";
import { getPartnerById } from "@/data/mockPartnersData";
import type { CandidateListItem } from "@/data/mockCandidatesData";

interface AssignCandidateModalProps {
  candidate: CandidateListItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign?: (candidateId: string, vacancyId: string) => void;
}

export function AssignCandidateModal({ 
  candidate, 
  open, 
  onOpenChange,
  onAssign 
}: AssignCandidateModalProps) {
  const { toast } = useToast();
  const [selectedVacancy, setSelectedVacancy] = useState<string>("");

  // Get active vacancies (not filled or closed)
  const availableVacancies = mockVacancyList.filter(
    v => v.status === 'live' || v.status === 'draft'
  );

  const handleAssign = () => {
    if (!selectedVacancy) return;

    const vacancy = availableVacancies.find(v => v.id === selectedVacancy);
    
    onAssign?.(candidate.id, selectedVacancy);
    
    toast({
      title: "Kandidaat toegevoegd",
      description: `${candidate.name} is toegevoegd aan ${vacancy?.title || 'de vacature'}.`,
    });
    
    setSelectedVacancy("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Kandidaat toewijzen aan vacature
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-sm font-medium">{candidate.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Huidige vacature: {candidate.currentVacancy}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Selecteer vacature</Label>
            <Select value={selectedVacancy} onValueChange={setSelectedVacancy}>
              <SelectTrigger>
                <SelectValue placeholder="Kies een vacature..." />
              </SelectTrigger>
              <SelectContent>
                {availableVacancies.map((vacancy) => {
                  const partner = getPartnerById(vacancy.partnerId);
                  return (
                    <SelectItem key={vacancy.id} value={vacancy.id}>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{vacancy.title}</span>
                        {partner && (
                          <span className="text-xs text-muted-foreground">
                            ({partner.name})
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {availableVacancies.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Geen actieve vacatures beschikbaar.
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleAssign} disabled={!selectedVacancy}>
            <UserPlus className="h-4 w-4 mr-2" />
            Toewijzen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
