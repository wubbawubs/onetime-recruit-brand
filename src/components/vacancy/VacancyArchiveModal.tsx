import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Archive, Users, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VacancyArchiveModalProps {
  vacancyId: string;
  vacancyTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onArchive?: () => void;
  stats?: {
    totalCandidates: number;
    hiredCount: number;
    avgTimeToHire: number;
    daysOpen: number;
  };
}

export function VacancyArchiveModal({ 
  vacancyId,
  vacancyTitle,
  open, 
  onOpenChange,
  onArchive,
  stats = { totalCandidates: 24, hiredCount: 1, avgTimeToHire: 28, daysOpen: 45 }
}: VacancyArchiveModalProps) {
  const { toast } = useToast();
  const [isArchiving, setIsArchiving] = useState(false);

  const handleArchive = async () => {
    setIsArchiving(true);
    
    // Simulate archive action
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onArchive?.();
    onOpenChange(false);
    
    toast({
      title: "Vacature gearchiveerd",
      description: `${vacancyTitle} is succesvol gearchiveerd met alle bijbehorende data.`,
    });
    
    setIsArchiving(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Vacature archiveren
          </DialogTitle>
          <DialogDescription>
            Bekijk de samenvatting en archiveer "{vacancyTitle}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* KPI Summary */}
          <Card className="border-border/50">
            <CardContent className="p-4">
              <h4 className="text-sm font-medium mb-4 text-muted-foreground">
                Resultaat samenvatting
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-xs">Totaal kandidaten</span>
                  </div>
                  <p className="text-2xl font-semibold">{stats.totalCandidates}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs">Aangenomen</span>
                  </div>
                  <p className="text-2xl font-semibold text-success">{stats.hiredCount}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs">Time to hire</span>
                  </div>
                  <p className="text-2xl font-semibold">{stats.avgTimeToHire}d</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">Dagen open</span>
                  </div>
                  <p className="text-2xl font-semibold">{stats.daysOpen}d</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground">
            Bij archivering wordt de vacature verwijderd uit actieve lijsten maar blijven alle 
            kandidaatgegevens, notities en activiteitengeschiedenis bewaard voor rapportage.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleArchive} disabled={isArchiving}>
            <Archive className="h-4 w-4 mr-2" />
            {isArchiving ? "Archiveren..." : "Archiveren"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}