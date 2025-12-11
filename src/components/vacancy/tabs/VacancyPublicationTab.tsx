import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, X, Globe, ExternalLink, Link2 } from "lucide-react";

interface VacancyPublicationTabProps {
  vacancy: {
    id: string;
    title: string;
    status: 'live' | 'draft' | 'paused' | 'closed' | 'filled';
  };
}

export function VacancyPublicationTab({ vacancy }: VacancyPublicationTabProps) {
  const [publicationMethod, setPublicationMethod] = useState('onetime');

  const isLive = vacancy.status === 'live';
  const mockUrl = `jobs.onetimerooted.nl/vacature/${vacancy.id.replace('vac_', '')}`;

  const checklist = [
    { id: 'title', label: 'Titel ingevuld', completed: true },
    { id: 'description', label: 'Beschrijving ingevuld', completed: true },
    { id: 'location', label: 'Standplaats opgegeven', completed: true },
    { id: 'jobsite', label: 'Jobsite gekoppeld', completed: false },
  ];

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Globe className="h-5 w-5 text-muted-foreground" />
          Publicatie & jobsite
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Beheer hoe en waar deze vacature gepubliceerd wordt.
        </p>
      </div>

      {/* Publication Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Publicatiestatus</CardTitle>
          <CardDescription>De huidige status van deze vacature.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className={isLive 
                ? "bg-success/10 text-success border-success/20" 
                : "bg-muted text-muted-foreground"
              }
            >
              {isLive ? 'Live' : 'Niet gepubliceerd'}
            </Badge>
            {isLive && (
              <span className="text-sm text-muted-foreground">
                Zichtbaar voor kandidaten
              </span>
            )}
          </div>

          {isLive && (
            <div className="p-3 bg-muted/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Link2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-muted-foreground">{mockUrl}</span>
              </div>
              <a 
                href={`https://${mockUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm flex items-center gap-1"
              >
                Bekijken
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Publication Method */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hoe komt de vacature online?</CardTitle>
          <CardDescription>Kies waar je vacature gepubliceerd wordt.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={publicationMethod} onValueChange={setPublicationMethod} className="space-y-3">
            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="onetime" id="onetime" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="onetime" className="font-medium cursor-pointer">
                    Via OneTime jobs-pagina
                  </Label>
                  <Badge variant="outline" className="text-xs">Binnenkort</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Publiceer automatisch op jouw gepersonaliseerde vacaturesite.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="manual" id="manual" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="manual" className="font-medium cursor-pointer">
                  Via eigen website / handmatig
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Je plaatst de vacature zelf op je eigen kanalen en deelt de sollicitatielink.
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Publicatie checklist</CardTitle>
          <CardDescription>Controleer of alles klaar is voor publicatie.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checklist.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                  item.completed 
                    ? 'bg-success/10 text-success' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {item.completed ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                </div>
                <span className={`text-sm ${!item.completed && 'text-muted-foreground'}`}>
                  {item.label}
                </span>
                {!item.completed && (
                  <Badge variant="outline" className="text-xs ml-auto">Binnenkort</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
