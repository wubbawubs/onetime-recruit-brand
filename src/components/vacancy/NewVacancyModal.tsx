import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewVacancyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewVacancyModal({ open, onOpenChange }: NewVacancyModalProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    contractType: "fulltime",
    seniority: "medior",
  });

  const handleCreate = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Titel verplicht",
        description: "Vul een titel in voor de vacature.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Vacature aangemaakt",
      description: `"${formData.title}" is succesvol aangemaakt als concept.`,
    });

    onOpenChange(false);
    // Navigate to the new vacancy (using a mock ID for now)
    navigate(`/vacatures/vac_new_${Date.now()}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Nieuwe vacature</DialogTitle>
              <DialogDescription>
                Vul de basisgegevens in om te starten.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Functietitel *</Label>
            <Input
              id="title"
              placeholder="bijv. Senior Accountmanager"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Standplaats</Label>
            <Input
              id="location"
              placeholder="bijv. Amsterdam"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Contracttype</Label>
              <Select
                value={formData.contractType}
                onValueChange={(value) => setFormData({ ...formData, contractType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fulltime">Fulltime</SelectItem>
                  <SelectItem value="parttime">Parttime</SelectItem>
                  <SelectItem value="tijdelijk">Tijdelijk</SelectItem>
                  <SelectItem value="freelance">Freelance / ZZP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Senioriteit</Label>
              <Select
                value={formData.seniority}
                onValueChange={(value) => setFormData({ ...formData, seniority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="medior">Medior</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="lead">Lead / Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleCreate}>
            Vacature aanmaken
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
