import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { useToast } from "@/hooks/use-toast";
import { mockVacancyList } from "@/data/mockVacancyData";
import { UserPlus } from "lucide-react";

interface AddCandidateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sources = ["LinkedIn", "Website", "Referral", "Indeed", "Anders"];
const stages = ["Nieuw", "Eerste gesprek", "Tweede gesprek", "Aanbod", "In dienst"];

export function AddCandidateModal({ open, onOpenChange }: AddCandidateModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    vacancy: "",
    stage: "Nieuw",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.source || !formData.vacancy) {
      toast({
        title: "Vul alle verplichte velden in",
        description: "Naam, e-mail, bron en vacature zijn verplicht.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    toast({
      title: "Kandidaat toegevoegd",
      description: `${formData.name} is succesvol toegevoegd aan ${
        mockVacancyList.find((v) => v.id === formData.vacancy)?.title || "de vacature"
      }.`,
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      source: "",
      vacancy: "",
      stage: "Nieuw",
    });
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Kandidaat toevoegen
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Naam <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Jan Jansen"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                E-mail <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="jan@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefoon (optioneel)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+31 6 12345678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Bron <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.source}
                onValueChange={(value) => setFormData({ ...formData, source: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer bron" />
                </SelectTrigger>
                <SelectContent>
                  {sources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Stage</Label>
              <Select
                value={formData.stage}
                onValueChange={(value) => setFormData({ ...formData, stage: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Vacature <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.vacancy}
              onValueChange={(value) => setFormData({ ...formData, vacancy: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecteer vacature" />
              </SelectTrigger>
              <SelectContent>
                {mockVacancyList.map((vacancy) => (
                  <SelectItem key={vacancy.id} value={vacancy.id}>
                    {vacancy.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Annuleren
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Toevoegen..." : "Toevoegen"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
