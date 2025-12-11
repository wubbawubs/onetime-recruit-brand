import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Flame, CheckCircle } from "lucide-react";

interface VacancyRisk {
  title: string;
  instroom: "goed" | "laag" | "matig";
  doorloop: "goed" | "stil" | "matig";
  reactietijd: "snel" | "traag" | "matig";
  conclusion: "stabiel" | "risico" | "let-op";
}

const riskData: VacancyRisk[] = [
  { title: "Accountmanager", instroom: "goed", doorloop: "goed", reactietijd: "snel", conclusion: "stabiel" },
  { title: "Sales Support", instroom: "matig", doorloop: "matig", reactietijd: "matig", conclusion: "let-op" },
  { title: "Senior Developer", instroom: "laag", doorloop: "stil", reactietijd: "traag", conclusion: "risico" },
  { title: "Office Manager", instroom: "goed", doorloop: "goed", reactietijd: "snel", conclusion: "stabiel" },
];

const cellColors = {
  goed: "text-success",
  snel: "text-success",
  matig: "text-warning",
  laag: "text-destructive",
  stil: "text-destructive",
  traag: "text-destructive",
};

const conclusionConfig = {
  stabiel: { icon: CheckCircle, color: "text-success", label: "Stabiel" },
  "let-op": { icon: Shield, color: "text-warning", label: "Let op" },
  risico: { icon: Flame, color: "text-destructive", label: "Risico" },
};

export function RiskMatrixCard() {
  return (
    <Card className="border-border/40 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-destructive/10 flex items-center justify-center">
            <Shield className="h-4 w-4 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Risico per vacature</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Overzicht knelpunten</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left py-2 font-medium text-muted-foreground">Vacature</th>
                <th className="text-center py-2 font-medium text-muted-foreground">Instroom</th>
                <th className="text-center py-2 font-medium text-muted-foreground">Doorloop</th>
                <th className="text-center py-2 font-medium text-muted-foreground">Reactie</th>
                <th className="text-right py-2 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {riskData.map((vacancy, index) => {
                const config = conclusionConfig[vacancy.conclusion];
                const ConclusionIcon = config.icon;
                return (
                  <tr 
                    key={vacancy.title} 
                    className={`${index !== riskData.length - 1 ? "border-b border-border/20" : ""} hover:bg-muted/20 transition-colors`}
                  >
                    <td className="py-2.5 font-medium text-foreground">{vacancy.title}</td>
                    <td className={`py-2.5 text-center ${cellColors[vacancy.instroom]}`}>{vacancy.instroom}</td>
                    <td className={`py-2.5 text-center ${cellColors[vacancy.doorloop]}`}>{vacancy.doorloop}</td>
                    <td className={`py-2.5 text-center ${cellColors[vacancy.reactietijd]}`}>{vacancy.reactietijd}</td>
                    <td className="py-2.5 text-right">
                      <div className={`inline-flex items-center gap-1 ${config.color}`}>
                        <ConclusionIcon className="h-3 w-3" />
                        <span className="font-medium">{config.label}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
