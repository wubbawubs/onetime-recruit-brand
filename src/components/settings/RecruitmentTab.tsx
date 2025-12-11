import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GitBranch, Target, Info, Check } from "lucide-react";
import { mockRecruitmentSettings } from "@/data/mockSettingsData";

const RecruitmentTab = () => {
  const [settings, setSettings] = useState(mockRecruitmentSettings);

  const updateStage = (index: number, field: 'customLabel' | 'targetDays', value: string | number) => {
    setSettings(prev => ({
      ...prev,
      stages: prev.stages.map((stage, i) => 
        i === index ? { ...stage, [field]: value } : stage
      )
    }));
  };

  return (
    <div className="space-y-8">
      {/* Pipeline Configuration Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <GitBranch className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Pipeline configuratie</CardTitle>
              <CardDescription>Pas labels en targets aan per fase.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Standaard</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Aangepast label</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Target (dagen)</th>
                </tr>
              </thead>
              <tbody>
                {settings.stages.map((stage, index) => (
                  <tr key={stage.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3 px-2">
                      <span className="text-sm text-muted-foreground">{stage.defaultLabel}</span>
                    </td>
                    <td className="py-3 px-2">
                      <Input 
                        value={stage.customLabel}
                        onChange={(e) => updateStage(index, 'customLabel', e.target.value)}
                        className="max-w-[200px]"
                      />
                    </td>
                    <td className="py-3 px-2">
                      {stage.id === 'hired' ? (
                        <span className="text-sm text-muted-foreground">—</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number"
                            min={1}
                            max={30}
                            value={stage.targetDays}
                            onChange={(e) => updateStage(index, 'targetDays', parseInt(e.target.value) || 1)}
                            className="w-20"
                          />
                          <span className="text-sm text-muted-foreground">dagen</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <span>Volgorde aanpassen en nieuwe stages toevoegen wordt binnenkort mogelijk.</span>
          </div>
        </CardContent>
      </Card>

      {/* Targets Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Doelstellingen</CardTitle>
              <CardDescription>Deze waarden sturen je rapportages en alerts.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tth">Time-to-hire doel</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="tth"
                  type="number"
                  min={7}
                  max={120}
                  value={settings.targets.timeToHireDays}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    targets: { ...prev.targets, timeToHireDays: parseInt(e.target.value) || 35 }
                  }))}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">dagen</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="response">Responstijd doel</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="response"
                  type="number"
                  min={1}
                  max={14}
                  value={settings.targets.responseTimeDays}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    targets: { ...prev.targets, responseTimeDays: parseInt(e.target.value) || 2 }
                  }))}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">werkdagen</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>Gebruikt voor dashboard-meldingen</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>Toont "% van target" in rapportages</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruitmentTab;
