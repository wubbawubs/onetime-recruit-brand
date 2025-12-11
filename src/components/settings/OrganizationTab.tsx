import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Globe, Info } from "lucide-react";
import { mockOrganizationSettings } from "@/data/mockSettingsData";

const OrganizationTab = () => {
  const [settings, setSettings] = useState(mockOrganizationSettings);

  return (
    <div className="space-y-8">
      {/* Company Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Bedrijfsgegevens</CardTitle>
              <CardDescription>Instellingen voor je organisatie.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo placeholder */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-border">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-sm text-muted-foreground">
              Logo uploaden komt binnenkort beschikbaar.
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Bedrijfsnaam</Label>
              <Input 
                id="companyName" 
                value={settings.companyName} 
                onChange={(e) => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailSender">Afzendernaam e-mails</Label>
              <Input 
                id="emailSender" 
                value={settings.emailSenderName} 
                onChange={(e) => setSettings(prev => ({ ...prev, emailSenderName: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryColor">Merkkleur</Label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  id="primaryColor"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="h-10 w-14 rounded cursor-pointer border border-border"
                />
                <Input 
                  value={settings.primaryColor}
                  onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="flex-1 font-mono"
                  maxLength={7}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Site Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Vacaturesite</CardTitle>
              <CardDescription>Instellingen voor je externe vacaturepagina.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="subdomain">Subdomein</Label>
              <div className="flex items-center">
                <Input 
                  id="subdomain" 
                  value={settings.jobsSiteSubdomain} 
                  onChange={(e) => setSettings(prev => ({ ...prev, jobsSiteSubdomain: e.target.value }))}
                  className="rounded-r-none"
                />
                <span className="h-10 px-3 flex items-center bg-muted border border-l-0 border-input rounded-r-md text-sm text-muted-foreground">
                  .onetimejobs.com
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultLang">Standaard taal</Label>
              <Select 
                value={settings.defaultLanguage} 
                onValueChange={(value: 'nl' | 'en') => setSettings(prev => ({ ...prev, defaultLanguage: value }))}
              >
                <SelectTrigger id="defaultLang">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nl">Nederlands</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <span>Meer aanpassingen voor je vacaturesite komen binnenkort beschikbaar.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationTab;
