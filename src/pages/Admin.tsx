import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Users, 
  Building2, 
  Mail,
  Shield,
  ShieldCheck,
  User,
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { partners, type Partner, type UserRole } from "@/data/mockPartnersData";
import { Navigate } from "react-router-dom";
import { InviteUserForm } from "@/components/admin/InviteUserForm";
import { RecentInvitesTable } from "@/components/admin/RecentInvitesTable";
import { getPendingInvitesCount } from "@/data/mockMailEvents";

// Mock users for display
const mockUsers = [
  { id: '1', name: 'Juliëtte Welten', email: 'juliette@onerooted.nl', role: 'admin' as UserRole, partnerId: 'partner-otr', status: 'active' },
  { id: '2', name: 'Robin van der Berg', email: 'robin@onerooted.nl', role: 'partner' as UserRole, partnerId: 'partner-otr', status: 'active' },
  { id: '3', name: 'Dennie Kuiper', email: 'dennie@onerooted.nl', role: 'partner' as UserRole, partnerId: 'partner-otr', status: 'active' },
  { id: '4', name: 'Luuk Janssen', email: 'luuk@techbedrijf.nl', role: 'client' as UserRole, partnerId: 'partner-techbedrijf', status: 'active' },
  { id: '5', name: 'Sarah Marketing', email: 'sarah@marketingbureau.nl', role: 'client' as UserRole, partnerId: 'partner-marketingbureau', status: 'pending' },
];

function getRoleIcon(role: UserRole) {
  switch (role) {
    case 'admin':
      return <ShieldCheck className="h-4 w-4 text-primary" />;
    case 'partner':
      return <Shield className="h-4 w-4 text-blue-500" />;
    case 'client':
      return <User className="h-4 w-4 text-muted-foreground" />;
  }
}

function getRoleBadge(role: UserRole) {
  switch (role) {
    case 'admin':
      return <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">Admin</Badge>;
    case 'partner':
      return <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">Partner</Badge>;
    case 'client':
      return <Badge variant="outline">Klant</Badge>;
  }
}

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function Admin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [partnerDialogOpen, setPartnerDialogOpen] = useState(false);
  const [newPartnerName, setNewPartnerName] = useState("");
  const [newPartnerEmail, setNewPartnerEmail] = useState("");
  const [newPartnerType, setNewPartnerType] = useState<"recruitment_agency" | "client">("client");

  // Only admins can access this page
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAddPartner = () => {
    toast({
      title: "Partner toegevoegd",
      description: `${newPartnerName} is toegevoegd als ${newPartnerType === 'client' ? 'klant' : 'recruitment partner'}.`,
    });
    setNewPartnerName("");
    setNewPartnerEmail("");
    setNewPartnerType("client");
    setPartnerDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 page-enter page-enter-active">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Beheer</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gebruikers en partners beheren.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{mockUsers.length}</p>
                  <p className="text-sm text-muted-foreground">Gebruikers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Building2 className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{partners.length}</p>
                  <p className="text-sm text-muted-foreground">Partners</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Mail className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">
                    {getPendingInvitesCount()}
                  </p>
                  <p className="text-sm text-muted-foreground">Uitnodigingen</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invite User Section */}
        <InviteUserForm />

        {/* Recent Invites Section */}
        <RecentInvitesTable />

        {/* Users Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Gebruikers</CardTitle>
            <CardDescription>Beheer team en klanttoegang.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockUsers.map((u) => {
                const partner = partners.find(p => p.id === u.partnerId);
                return (
                  <div
                    key={u.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {getInitials(u.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{u.name}</p>
                          {u.status === 'pending' && (
                            <Badge variant="outline" className="text-xs bg-amber-50 text-amber-600 border-amber-200">
                              Pending
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground hidden sm:block">
                        {partner?.name}
                      </span>
                      {getRoleBadge(u.role)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast({ title: "Bewerken", description: `${u.name} bewerken wordt geopend.` })}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Bewerken
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => toast({ title: "Verwijderen", description: `${u.name} zou worden verwijderd.`, variant: "destructive" })}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Verwijderen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Partners Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Partners & Klanten</CardTitle>
              <CardDescription>Beheer organisaties en koppelingen.</CardDescription>
            </div>
            <Dialog open={partnerDialogOpen} onOpenChange={setPartnerDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Partner toevoegen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Partner toevoegen</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="partnerName">Naam</Label>
                    <Input
                      id="partnerName"
                      placeholder="Bedrijfsnaam"
                      value={newPartnerName}
                      onChange={(e) => setNewPartnerName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partnerEmail">Contact e-mail</Label>
                    <Input
                      id="partnerEmail"
                      type="email"
                      placeholder="contact@bedrijf.nl"
                      value={newPartnerEmail}
                      onChange={(e) => setNewPartnerEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select 
                      value={newPartnerType} 
                      onValueChange={(v: "recruitment_agency" | "client") => setNewPartnerType(v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recruitment_agency">Recruitment Partner</SelectItem>
                        <SelectItem value="client">Klant / Opdrachtgever</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setPartnerDialogOpen(false)}>
                    Annuleren
                  </Button>
                  <Button onClick={handleAddPartner} disabled={!newPartnerName}>
                    Toevoegen
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {partners.map((partner) => {
                const userCount = mockUsers.filter(u => u.partnerId === partner.id).length;
                return (
                  <div
                    key={partner.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{partner.name}</p>
                        <p className="text-xs text-muted-foreground">{partner.contactEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {userCount} {userCount === 1 ? 'gebruiker' : 'gebruikers'}
                      </span>
                      <Badge variant={partner.type === 'recruitment_agency' ? 'default' : 'secondary'}>
                        {partner.type === 'recruitment_agency' ? 'Recruitment' : 'Klant'}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast({ title: "Bewerken", description: `${partner.name} bewerken wordt geopend.` })}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Bewerken
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => toast({ title: "Verwijderen", description: `${partner.name} zou worden verwijderd.`, variant: "destructive" })}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Verwijderen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
