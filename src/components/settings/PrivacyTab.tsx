import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Shield, FileText, Info } from "lucide-react";
import { mockPrivacySettings, retentionOptions } from "@/data/mockSettingsData";

const PrivacyTab = () => {
  const [settings, setSettings] = useState(mockPrivacySettings);

  return (
    <div className="space-y-8">
      {/* Retention Period Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Bewaartermijn kandidaten</CardTitle>
              <CardDescription>
                Dit bepaalt hoelang we kandidaatdata bewaren voordat deze automatisch wordt verwerkt.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="retention">Bewaartermijn</Label>
              <Select 
                value={settings.retentionPeriodMonths.toString()} 
                onValueChange={(value) => setSettings(prev => ({ ...prev, retentionPeriodMonths: parseInt(value) }))}
              >
                <SelectTrigger id="retention">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {retentionOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Na afloop van de bewaartermijn</Label>
            <RadioGroup 
              value={settings.deletionMode}
              onValueChange={(value: 'delete' | 'anonymize') => setSettings(prev => ({ ...prev, deletionMode: value }))}
              className="space-y-3"
            >
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <RadioGroupItem value="delete" id="delete" className="mt-0.5" />
                <div className="space-y-1">
                  <Label htmlFor="delete" className="font-medium cursor-pointer">Volledig verwijderen</Label>
                  <p className="text-sm text-muted-foreground">
                    Alle kandidaatgegevens worden permanent verwijderd.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <RadioGroupItem value="anonymize" id="anonymize" className="mt-0.5" />
                <div className="space-y-1">
                  <Label htmlFor="anonymize" className="font-medium cursor-pointer">Anonimiseren</Label>
                  <p className="text-sm text-muted-foreground">
                    Naam en contactgegevens worden verwijderd, data blijft bewaard voor statistieken.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Consent Text Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Standaard toestemmingstekst</CardTitle>
              <CardDescription>
                Deze tekst wordt getoond op sollicitatieformulieren.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            value={settings.consentText}
            onChange={(e) => setSettings(prev => ({ ...prev, consentText: e.target.value }))}
            rows={4}
            className="resize-none"
          />

          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <span>
              [X] wordt automatisch vervangen door je gekozen bewaartermijn ({settings.retentionPeriodMonths} maanden).
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyTab;
