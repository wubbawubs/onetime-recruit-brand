import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { User, Bell } from "lucide-react";
import { mockAccountSettings, timezoneOptions } from "@/data/mockSettingsData";

const AccountTab = () => {
  const [settings, setSettings] = useState(mockAccountSettings);

  const updateNotification = (key: keyof typeof settings.notifications, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Profiel</CardTitle>
              <CardDescription>Beheer je persoonlijke gegevens.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar placeholder */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xl font-semibold text-muted-foreground">
              {settings.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="text-sm text-muted-foreground">
              Profielfoto uploaden komt binnenkort beschikbaar.
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Naam</Label>
              <Input 
                id="name" 
                value={settings.name} 
                onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Functie</Label>
              <div className="flex items-center h-10">
                <Badge variant="secondary" className="text-sm">{settings.role}</Badge>
                <span className="ml-2 text-xs text-muted-foreground">(ingesteld door admin)</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>E-mail</Label>
              <div className="flex items-center h-10 px-3 rounded-md bg-muted/50 text-muted-foreground text-sm">
                {settings.email}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Taal</Label>
              <Select 
                value={settings.language} 
                onValueChange={(value: 'nl' | 'en') => setSettings(prev => ({ ...prev, language: value }))}
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nl">Nederlands</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="timezone">Tijdzone</Label>
              <Select 
                value={settings.timezone} 
                onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger id="timezone" className="md:w-1/2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezoneOptions.map(tz => (
                    <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Notificaties</CardTitle>
              <CardDescription>Bepaal welke meldingen je ontvangt.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Nieuwe kandidaten</Label>
              <p className="text-sm text-muted-foreground">E-mail bij nieuwe kandidaten in mijn vacatures</p>
            </div>
            <Switch 
              checked={settings.notifications.newCandidates}
              onCheckedChange={(checked) => updateNotification('newCandidates', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Geplande gesprekken</Label>
              <p className="text-sm text-muted-foreground">E-mail bij geplande gesprekken</p>
            </div>
            <Switch 
              checked={settings.notifications.scheduledMeetings}
              onCheckedChange={(checked) => updateNotification('scheduledMeetings', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dagelijkse samenvatting</Label>
              <p className="text-sm text-muted-foreground">Overzicht van taken voor vandaag</p>
            </div>
            <Switch 
              checked={settings.notifications.dailySummary}
              onCheckedChange={(checked) => updateNotification('dailySummary', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountTab;
