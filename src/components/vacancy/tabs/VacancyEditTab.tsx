import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Save, XCircle, CheckCircle2, Circle, Pause, FileEdit, Archive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface VacancyEditTabProps {
  vacancy: {
    id: string;
    title: string;
    location: string;
    contractType: string;
    status: 'live' | 'draft' | 'paused' | 'closed' | 'filled';
  };
}

export function VacancyEditTab({ vacancy }: VacancyEditTabProps) {
  const { toast } = useToast();
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: vacancy.title,
    location: vacancy.location,
    region: 'Utrecht en omgeving',
    contractType: vacancy.contractType.toLowerCase(),
    seniority: 'senior',
    salaryMin: '55000',
    salaryMax: '75000',
    description: `Als Senior Accountmanager B2B ben je verantwoordelijk voor het beheren en uitbouwen van een bestaande klantenportefeuille binnen de zakelijke markt.

Je taken:
• Actief acquireren van nieuwe klanten
• Onderhouden van duurzame relaties met bestaande klanten
• Adviseren over passende oplossingen
• Behalen van commerciële targets

Wat wij vragen:
• Minimaal 5 jaar ervaring in B2B sales
• Sterke communicatieve vaardigheden
• Resultaatgericht en zelfstandig`,
    status: vacancy.status,
  });

  const handleSave = () => {
    toast({
      title: "Wijzigingen opgeslagen",
      description: "De vacature is succesvol bijgewerkt.",
    });
  };

  const handleConfirmClose = () => {
    setFormData({ ...formData, status: 'closed' });
    setConfirmCloseOpen(false);
    toast({
      title: "Vacature gesloten",
      description: "De vacature is nu niet meer zichtbaar voor kandidaten.",
      variant: "destructive",
    });
  };

  const statusConfig = {
    live: { label: 'Live', color: 'bg-success text-success-foreground', icon: CheckCircle2 },
    draft: { label: 'Concept', color: 'bg-muted text-muted-foreground', icon: FileEdit },
    paused: { label: 'Gepauzeerd', color: 'bg-warning text-warning-foreground', icon: Pause },
    closed: { label: 'Gesloten', color: 'bg-muted text-muted-foreground', icon: Archive },
    filled: { label: 'Ingevuld', color: 'bg-primary text-primary-foreground', icon: CheckCircle2 },
  };

  const currentStatus = statusConfig[formData.status];
  const StatusIcon = currentStatus.icon;

  return (
    <div className="flex flex-col h-full">
      {/* Status Hero Strip */}
      <div className={cn(
        "px-8 py-4 flex items-center justify-between border-b",
        formData.status === 'live' && "bg-success/5 border-success/20",
        formData.status === 'draft' && "bg-muted/50 border-muted",
        formData.status === 'paused' && "bg-warning/5 border-warning/20",
        formData.status === 'closed' && "bg-muted/50 border-muted",
        formData.status === 'filled' && "bg-primary/5 border-primary/20"
      )}>
        <div className="flex items-center gap-3">
          <Badge className={cn("gap-1.5 px-3 py-1", currentStatus.color)}>
            <StatusIcon className="h-3.5 w-3.5" />
            {currentStatus.label}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {formData.status === 'live' && "Deze vacature is zichtbaar voor kandidaten"}
            {formData.status === 'draft' && "Deze vacature is nog niet gepubliceerd"}
            {formData.status === 'paused' && "Deze vacature is tijdelijk niet zichtbaar"}
            {formData.status === 'closed' && "Deze vacature is niet meer actief"}
            {formData.status === 'filled' && "Deze vacature is succesvol ingevuld"}
          </span>
        </div>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value as typeof formData.status })}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="draft">Concept</SelectItem>
            <SelectItem value="paused">Gepauzeerd</SelectItem>
            <SelectItem value="closed">Gesloten</SelectItem>
            <SelectItem value="filled">Ingevuld</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Basic Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Basisgegevens</CardTitle>
              <CardDescription>De belangrijkste informatie over deze vacature.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titel</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Standplaats</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="region">Regio</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractType">Contracttype</Label>
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
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="seniority">Senioriteit</Label>
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
                <div className="space-y-2">
                  <Label>Salarisrange (optioneel)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Min"
                      value={formData.salaryMin}
                      onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                      className="flex-1"
                    />
                    <span className="text-muted-foreground">—</span>
                    <Input
                      placeholder="Max"
                      value={formData.salaryMax}
                      onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                      className="flex-1"
                    />
                    <span className="text-muted-foreground text-sm whitespace-nowrap">€/jaar</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Beschrijving</CardTitle>
              <CardDescription>De volledige vacaturetekst die kandidaten te zien krijgen.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={14}
                className="resize-none"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="border-t bg-card px-8 py-4 flex items-center justify-between">
        <Button variant="outline" onClick={() => setConfirmCloseOpen(true)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
          <XCircle className="h-4 w-4 mr-2" />
          Vacature sluiten
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Wijzigingen opslaan
        </Button>
      </div>

      {/* Confirm Close Dialog */}
      <ConfirmDialog
        open={confirmCloseOpen}
        onOpenChange={setConfirmCloseOpen}
        title="Vacature sluiten?"
        description="Weet je zeker dat je deze vacature wilt sluiten? De vacature is daarna niet meer zichtbaar voor kandidaten. Je kunt de vacature later opnieuw activeren."
        confirmLabel="Ja, sluiten"
        variant="warning"
        onConfirm={handleConfirmClose}
      />
    </div>
  );
}
