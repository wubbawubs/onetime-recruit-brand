import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Save, XCircle, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VacancyEditTabProps {
  vacancy: {
    id: string;
    title: string;
    location: string;
    contractType: string;
    status: 'live' | 'draft' | 'paused' | 'closed';
  };
}

export function VacancyEditTab({ vacancy }: VacancyEditTabProps) {
  const { toast } = useToast();
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

  const handleClose = () => {
    toast({
      title: "Vacature gesloten",
      description: "De vacature is nu niet meer zichtbaar voor kandidaten.",
      variant: "destructive",
    });
  };

  const statusConfig = {
    live: { label: 'Live', color: 'bg-success/10 text-success border-success/20' },
    draft: { label: 'Concept', color: 'bg-muted text-muted-foreground border-muted' },
    paused: { label: 'Gepauzeerd', color: 'bg-warning/10 text-warning border-warning/20' },
    closed: { label: 'Gesloten', color: 'bg-destructive/10 text-destructive border-destructive/20' },
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Pencil className="h-5 w-5 text-muted-foreground" />
            Vacature bewerken
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Pas de details van deze vacature aan.
          </p>
        </div>
        <Badge variant="outline" className={statusConfig[formData.status].color}>
          {statusConfig[formData.status].label}
        </Badge>
      </div>

      {/* Basic Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basisgegevens</CardTitle>
          <CardDescription>De belangrijkste informatie over deze vacature.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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

          <div className="grid grid-cols-2 gap-4">
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

          <div className="grid grid-cols-2 gap-4">
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
                <span className="text-muted-foreground text-sm">€/jaar</span>
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
            rows={12}
            className="resize-none"
          />
        </CardContent>
      </Card>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Status</CardTitle>
          <CardDescription>Bepaal of de vacature zichtbaar is voor kandidaten.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as typeof formData.status })}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="draft">Concept</SelectItem>
              <SelectItem value="paused">Gepauzeerd</SelectItem>
              <SelectItem value="closed">Gesloten</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button variant="destructive" onClick={handleClose}>
          <XCircle className="h-4 w-4 mr-2" />
          Vacature sluiten
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Opslaan
        </Button>
      </div>
    </div>
  );
}
