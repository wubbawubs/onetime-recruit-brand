import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GitBranch, Target, Info, Check, Plus, Trash2 } from "lucide-react";
import { mockRecruitmentSettings } from "@/data/mockSettingsData";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const RecruitmentTab = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState(mockRecruitmentSettings);
  const [addStageOpen, setAddStageOpen] = useState(false);
  const [newStageLabel, setNewStageLabel] = useState("");
  const [newStageTarget, setNewStageTarget] = useState(3);

  const updateStage = (index: number, field: 'customLabel' | 'targetDays', value: string | number) => {
    setSettings(prev => ({
      ...prev,
      stages: prev.stages.map((stage, i) => 
        i === index ? { ...stage, [field]: value } : stage
      )
    }));
  };

  const handleAddStage = () => {
    if (!newStageLabel.trim()) return;

    const newStage = {
      id: `custom-${Date.now()}`,
      defaultLabel: newStageLabel,
      customLabel: newStageLabel,
      targetDays: newStageTarget,
      isCustom: true,
    };

    setSettings(prev => ({
      ...prev,
      stages: [...prev.stages.slice(0, -1), newStage, prev.stages[prev.stages.length - 1]], // Insert before "In dienst"
    }));

    toast({
      title: "Stage toegevoegd",
      description: `"${newStageLabel}" is toegevoegd aan de pipeline.`,
    });

    setNewStageLabel("");
    setNewStageTarget(3);
    setAddStageOpen(false);
  };

  const handleRemoveStage = (stageId: string) => {
    setSettings(prev => ({
      ...prev,
      stages: prev.stages.filter(s => s.id !== stageId),
    }));

    toast({
      title: "Stage verwijderd",
      description: "De stage is verwijderd uit de pipeline.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Pipeline Configuration Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <GitBranch className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Pipeline configuratie</CardTitle>
                <CardDescription>Pas labels en targets aan per fase.</CardDescription>
              </div>
            </div>
            <Dialog open={addStageOpen} onOpenChange={setAddStageOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Stage toevoegen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nieuwe stage toevoegen</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="stageLabel">Stage naam</Label>
                    <Input
                      id="stageLabel"
                      placeholder="Bijv. Assessment, Referentie check"
                      value={newStageLabel}
                      onChange={(e) => setNewStageLabel(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stageTarget">Target (dagen)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="stageTarget"
                        type="number"
                        min={1}
                        max={30}
                        value={newStageTarget}
                        onChange={(e) => setNewStageTarget(parseInt(e.target.value) || 3)}
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">dagen</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setAddStageOpen(false)}>
                    Annuleren
                  </Button>
                  <Button onClick={handleAddStage} disabled={!newStageLabel.trim()}>
                    Toevoegen
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground w-20"></th>
                </tr>
              </thead>
              <tbody>
                {settings.stages.map((stage, index) => (
                  <tr key={stage.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3 px-2">
                      <span className="text-sm text-muted-foreground">{stage.defaultLabel}</span>
                      {(stage as any).isCustom && (
                        <span className="ml-2 text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                          Custom
                        </span>
                      )}
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
                    <td className="py-3 px-2 text-right">
                      {(stage as any).isCustom && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveStage(stage.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <span>Je kunt custom stages toevoegen en verwijderen. Standaard stages kunnen niet worden verwijderd.</span>
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
