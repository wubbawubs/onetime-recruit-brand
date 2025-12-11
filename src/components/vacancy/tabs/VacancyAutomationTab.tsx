import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Zap, Mail, Clock, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function VacancyAutomationTab() {
  const { toast } = useToast();
  const [automations, setAutomations] = useState({
    confirmationEmail: true,
    reminderEmail: false,
    reminderDays: 5,
  });

  const handleToggle = (key: keyof typeof automations) => {
    setAutomations(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: automations[key] ? "Automatisering uitgeschakeld" : "Automatisering ingeschakeld",
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5 text-muted-foreground" />
          Automatisering
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Stel automatische acties in voor deze vacature.
        </p>
      </div>

      {/* Active Automations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Actieve automatiseringen</CardTitle>
          <CardDescription>Schakel automatische acties in of uit voor kandidaten.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Confirmation Email */}
          <div className="flex items-start justify-between p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <Label className="font-medium">Automatische bevestigingsmail</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Stuur automatisch een bevestiging naar kandidaten na hun sollicitatie.
                </p>
              </div>
            </div>
            <Switch
              checked={automations.confirmationEmail}
              onCheckedChange={() => handleToggle('confirmationEmail')}
            />
          </div>

          {/* Reminder Email */}
          <div className="flex items-start justify-between p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div className="space-y-2">
                <Label className="font-medium">Reminder bij geen reactie</Label>
                <p className="text-sm text-muted-foreground">
                  Stuur een herinnering naar kandidaten als er X dagen geen update is.
                </p>
                {automations.reminderEmail && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-muted-foreground">Na</span>
                    <Input
                      type="number"
                      value={automations.reminderDays}
                      onChange={(e) => setAutomations(prev => ({ ...prev, reminderDays: parseInt(e.target.value) || 5 }))}
                      className="w-16 h-8"
                      min={1}
                      max={30}
                    />
                    <span className="text-sm text-muted-foreground">dagen zonder reactie</span>
                  </div>
                )}
              </div>
            </div>
            <Switch
              checked={automations.reminderEmail}
              onCheckedChange={() => handleToggle('reminderEmail')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Coming Soon */}
      <Card className="border-dashed">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Meer automatiseringen</CardTitle>
            <Badge variant="outline" className="text-xs">Binnenkort</Badge>
          </div>
          <CardDescription>
            De volgende automatiseringen worden binnenkort beschikbaar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Bell className="h-4 w-4" />
              <span>Automatische afwijzingsmail na X dagen in fase</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Mail className="h-4 w-4" />
              <span>Automatisch doorsturen naar hiring manager bij score &gt; 8</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Clock className="h-4 w-4" />
              <span>Slack/Teams notificatie bij nieuwe sollicitatie</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
