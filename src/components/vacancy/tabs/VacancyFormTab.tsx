import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  GripVertical, 
  Trash2, 
  Mail, 
  User, 
  FileUp,
  MessageSquare,
  Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'file' | 'textarea' | 'select' | 'checkbox';
  required: boolean;
  locked?: boolean;
  icon: React.ElementType;
}

export function VacancyFormTab() {
  const { toast } = useToast();
  const [fields, setFields] = useState<FormField[]>([
    { id: 'name', label: 'Naam', type: 'text', required: true, locked: true, icon: User },
    { id: 'email', label: 'E-mailadres', type: 'email', required: true, locked: true, icon: Mail },
    { id: 'cv', label: 'CV uploaden', type: 'file', required: true, locked: true, icon: FileUp },
    { id: 'motivation', label: 'Motivatie', type: 'textarea', required: false, icon: MessageSquare },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newField, setNewField] = useState({ label: '', type: 'text' as const, required: false });

  const handleAddField = () => {
    if (!newField.label.trim()) return;
    
    const field: FormField = {
      id: `custom_${Date.now()}`,
      label: newField.label,
      type: newField.type,
      required: newField.required,
      icon: MessageSquare,
    };
    
    setFields([...fields, field]);
    setNewField({ label: '', type: 'text', required: false });
    setShowAddForm(false);
    
    toast({
      title: "Vraag toegevoegd",
      description: `"${field.label}" is toegevoegd aan het formulier.`,
    });
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
    toast({
      title: "Vraag verwijderd",
      description: "De vraag is verwijderd uit het formulier.",
    });
  };

  const toggleRequired = (id: string) => {
    setFields(fields.map(f => 
      f.id === id && !f.locked ? { ...f, required: !f.required } : f
    ));
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          Formulier & vragen
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configureer welke informatie je van kandidaten vraagt.
        </p>
      </div>

      {/* Info */}
      <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
        Het standaardformulier staat klaar. Voeg extra vragen toe als je meer informatie wilt ophalen van kandidaten.
      </div>

      {/* Form Fields */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Formuliervelden</CardTitle>
          <CardDescription>Velden die kandidaten invullen bij hun sollicitatie.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {fields.map((field, index) => (
            <div 
              key={field.id}
              className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg group"
            >
              <GripVertical className="h-4 w-4 text-muted-foreground/50" />
              <div className="h-8 w-8 rounded bg-background flex items-center justify-center">
                <field.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium">{field.label}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {field.type === 'text' && 'Tekstveld'}
                  {field.type === 'email' && 'E-mail'}
                  {field.type === 'file' && 'Bestand'}
                  {field.type === 'textarea' && 'Lang tekstveld'}
                  {field.type === 'select' && 'Meerkeuze'}
                  {field.type === 'checkbox' && 'Checkbox'}
                </span>
              </div>
              
              {field.locked ? (
                <div className="flex items-center gap-2">
                  <Lock className="h-3 w-3 text-muted-foreground" />
                  <Badge variant="outline" className="text-xs">Verplicht</Badge>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`required-${field.id}`} className="text-xs text-muted-foreground">
                      Verplicht
                    </Label>
                    <Switch
                      id={`required-${field.id}`}
                      checked={field.required}
                      onCheckedChange={() => toggleRequired(field.id)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveField(field.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          ))}

          {/* Add Field Form */}
          {showAddForm ? (
            <div className="p-4 border rounded-lg space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Vraag / label</Label>
                <Input
                  placeholder="Bijv. 'Waarom wil je bij ons werken?'"
                  value={newField.label}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={newField.type}
                    onValueChange={(value) => setNewField({ ...newField, type: value as typeof newField.type })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Tekstveld (kort)</SelectItem>
                      <SelectItem value="textarea">Tekstveld (lang)</SelectItem>
                      <SelectItem value="select">Meerkeuze</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Verplicht</Label>
                  <div className="h-10 flex items-center">
                    <Switch
                      checked={newField.required}
                      onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Annuleren
                </Button>
                <Button onClick={handleAddField}>
                  Toevoegen
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Vraag toevoegen
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
