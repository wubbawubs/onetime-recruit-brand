import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Plus, 
  Crown,
  UserCog,
  Eye,
  Briefcase
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: 'admin' | 'recruiter' | 'hiring_manager' | 'interviewer';
  isCurrentUser?: boolean;
}

const roleConfig = {
  admin: { label: 'Admin', icon: Crown, description: 'Volledige toegang tot alle functies' },
  recruiter: { label: 'Recruiter', icon: UserCog, description: 'Kandidaten beheren en beoordelen' },
  hiring_manager: { label: 'Hiring Manager', icon: Briefcase, description: 'Beslissingen nemen over kandidaten' },
  interviewer: { label: 'Interviewer', icon: Eye, description: 'Kan scorecards invullen' },
};

export function VacancyTeamTab() {
  const { toast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Sarah van den Berg', initials: 'SB', email: 'sarah@company.nl', role: 'admin', isCurrentUser: true },
    { id: '2', name: 'Peter Jansen', initials: 'PJ', email: 'peter@company.nl', role: 'hiring_manager' },
    { id: '3', name: 'Lisa de Vries', initials: 'LV', email: 'lisa@company.nl', role: 'recruiter' },
    { id: '4', name: 'Mark Bakker', initials: 'MB', email: 'mark@company.nl', role: 'interviewer' },
  ]);

  const handleRoleChange = (memberId: string, newRole: TeamMember['role']) => {
    setMembers(members.map(m => 
      m.id === memberId ? { ...m, role: newRole } : m
    ));
    toast({
      title: "Rol bijgewerkt",
      description: "De gebruikersrol is succesvol aangepast.",
    });
  };

  const handleAddMember = () => {
    toast({
      title: "Gebruiker uitnodigen",
      description: "Functie komt binnenkort beschikbaar.",
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            Team & rechten
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Beheer wie toegang heeft tot deze vacature.
          </p>
        </div>
        <Button onClick={handleAddMember}>
          <Plus className="h-4 w-4 mr-2" />
          Gebruiker toevoegen
        </Button>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Teamleden</CardTitle>
          <CardDescription>Gebruikers die toegang hebben tot deze vacature.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {members.map((member) => {
            const role = roleConfig[member.role];
            return (
              <div 
                key={member.id}
                className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{member.name}</span>
                    {member.isCurrentUser && (
                      <Badge variant="outline" className="text-xs">Jij</Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{member.email}</span>
                </div>
                <Select
                  value={member.role}
                  onValueChange={(value) => handleRoleChange(member.id, value as TeamMember['role'])}
                  disabled={member.isCurrentUser}
                >
                  <SelectTrigger className="w-44">
                    <div className="flex items-center gap-2">
                      <role.icon className="h-4 w-4 text-muted-foreground" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <config.icon className="h-4 w-4" />
                          {config.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Role Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rollen uitleg</CardTitle>
          <CardDescription>Wat elke rol kan doen binnen deze vacature.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(roleConfig).map(([key, config]) => (
              <div key={key} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center mt-0.5">
                  <config.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="text-sm font-medium">{config.label}</span>
                  <p className="text-xs text-muted-foreground">{config.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
