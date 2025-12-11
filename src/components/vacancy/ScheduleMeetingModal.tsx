import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Clock, Video, MapPin, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Candidate } from "@/data/mockVacancyData";

interface ScheduleMeetingModalProps {
  candidate: Candidate;
  trigger?: React.ReactNode;
}

export function ScheduleMeetingModal({ candidate, trigger }: ScheduleMeetingModalProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    type: "online",
    location: "",
    notes: "",
    sendEmail: true,
  });

  const handleSave = () => {
    if (!formData.date || !formData.time) {
      toast({
        title: "Datum en tijd verplicht",
        description: "Vul een datum en tijd in voor het gesprek.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Gesprek ingepland",
      description: `Gesprek met ${candidate.name} is ingepland op ${formData.date} om ${formData.time}.${formData.sendEmail ? " Uitnodiging wordt verstuurd." : ""}`,
    });
    setOpen(false);
  };

  const defaultTrigger = (
    <Button size="sm">
      <Calendar className="h-4 w-4 mr-2" />
      Plan gesprek
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Gesprek plannen met {candidate.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Datum *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Tijd *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Type gesprek</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online" className="flex items-center gap-1.5 cursor-pointer">
                  <Video className="h-4 w-4" />
                  Online
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="physical" id="physical" />
                <Label htmlFor="physical" className="flex items-center gap-1.5 cursor-pointer">
                  <MapPin className="h-4 w-4" />
                  Fysiek
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">
              {formData.type === "online" ? "Meeting link" : "Locatie"}
            </Label>
            <Input
              id="location"
              placeholder={formData.type === "online" ? "https://meet.google.com/..." : "Adres of kantoorlocatie"}
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Interne notitie (optioneel)</Label>
            <Textarea
              id="notes"
              placeholder="Voeg een notitie toe voor je team..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="sendEmail"
              checked={formData.sendEmail}
              onChange={(e) => setFormData({ ...formData, sendEmail: e.target.checked })}
              className="h-4 w-4 rounded border-input"
            />
            <Label htmlFor="sendEmail" className="text-sm cursor-pointer">
              Stuur uitnodiging naar kandidaat
            </Label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Opslaan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
