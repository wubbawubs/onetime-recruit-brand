import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Plug, Info, Check, X } from "lucide-react";
import { mockIntegrationSettings } from "@/data/mockSettingsData";

const IntegrationsTab = () => {
  const settings = mockIntegrationSettings;

  return (
    <div className="space-y-8">
      {/* Email Integration Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">E-mail verzending</CardTitle>
              <CardDescription>Hoe worden e-mails verstuurd naar kandidaten?</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <div className="font-medium">Onetime Mailserver</div>
              <div className="text-sm text-muted-foreground">
                E-mails worden verzonden via de standaard Onetime mailserver.
              </div>
            </div>
            <div className="flex items-center gap-2">
              {settings.email.configured ? (
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  <Check className="h-3 w-3 mr-1" />
                  Actief
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                  <X className="h-3 w-3 mr-1" />
                  Niet actief
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <span>
              Eigen SMTP of Microsoft/Google integratie komt binnenkort beschikbaar.
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Integration Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Agenda koppeling</CardTitle>
              <CardDescription>Synchroniseer gesprekken met je kalender.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <div className="font-medium">Agenda synchronisatie</div>
              <div className="text-sm text-muted-foreground">
                Koppel je Google of Microsoft agenda.
              </div>
            </div>
            <Badge variant="outline" className="bg-muted text-muted-foreground">
              Niet verbonden
            </Badge>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <span>
              Koppeling met je agenda komt binnenkort beschikbaar. Je kunt nu al gesprekken handmatig registreren in de vacature-pipeline.
            </span>
          </div>
        </CardContent>
      </Card>

      {/* API Integration Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Plug className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">API & Webhooks</CardTitle>
              <CardDescription>Integreer met externe systemen.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="space-y-1">
              <div className="font-medium">API toegang</div>
              <div className="text-sm text-muted-foreground">
                Beschikbaar vanaf Pro-pakket
              </div>
            </div>
            <Badge variant="outline" className="bg-muted text-muted-foreground capitalize">
              {settings.api.tier} plan
            </Badge>
          </div>

          <Button variant="outline" className="w-full sm:w-auto">
            Contact opnemen voor upgrade
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsTab;
