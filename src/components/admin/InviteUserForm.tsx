import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getClientsForPartner } from "@/data/mockPartnersData";

type UserType = 'partner' | 'client';
type PartnerRole = 'account_admin' | 'partner_user';
type ClientRole = 'client_user';

interface FormData {
  userType: UserType;
  email: string;
  firstName: string;
  lastName: string;
  role: PartnerRole | ClientRole;
  clientId: string;
}

const ROLE_OPTIONS = {
  partner: [
    { value: 'account_admin', label: 'Account Admin' },
    { value: 'partner_user', label: 'Partner User' }
  ],
  client: [
    { value: 'client_user', label: 'Client User' }
  ]
};

const DEFAULT_ROLES: Record<UserType, PartnerRole | ClientRole> = {
  partner: 'account_admin',
  client: 'client_user'
};

export function InviteUserForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userType: 'client',
    email: '',
    firstName: '',
    lastName: '',
    role: 'client_user',
    clientId: '',
  });

  // Get available clients (mock: all clients from One Rooted partner)
  const availableClients = getClientsForPartner('partner-otr');

  const handleUserTypeChange = (value: UserType) => {
    setFormData(prev => ({
      ...prev,
      userType: value,
      role: DEFAULT_ROLES[value],
      clientId: value === 'partner' ? '' : prev.clientId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast({
        title: "Validatiefout",
        description: "Vul alle verplichte velden in.",
        variant: "destructive",
      });
      return;
    }

    if (formData.userType === 'client' && !formData.clientId) {
      toast({
        title: "Validatiefout",
        description: "Selecteer een klant voor client gebruikers.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validatiefout",
        description: "Voer een geldig e-mailadres in.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Build payload (ready for real API)
    const payload = {
      userType: formData.userType,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
      ...(formData.userType === 'client' && { clientId: formData.clientId }),
    };

    console.log('Invite payload:', payload);

    toast({
      title: "Uitnodiging verstuurd",
      description: `Uitnodiging is verstuurd naar ${formData.email}.`,
    });

    // Reset form
    setFormData({
      userType: 'client',
      email: '',
      firstName: '',
      lastName: '',
      role: 'client_user',
      clientId: '',
    });

    setIsLoading(false);
  };

  const isFormValid = formData.email && formData.firstName && formData.lastName && 
    (formData.userType === 'partner' || formData.clientId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Gebruiker Uitnodigen
        </CardTitle>
        <CardDescription>
          Nodig een nieuwe partner of klant gebruiker uit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User Type */}
          <div className="space-y-3">
            <Label>Type gebruiker</Label>
            <RadioGroup
              value={formData.userType}
              onValueChange={(v) => handleUserTypeChange(v as UserType)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partner" id="type-partner" />
                <Label htmlFor="type-partner" className="font-normal cursor-pointer">
                  Partner
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="type-client" />
                <Label htmlFor="type-client" className="font-normal cursor-pointer">
                  Klant
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Name Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Voornaam *</Label>
              <Input
                id="firstName"
                placeholder="Jan"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Achternaam *</Label>
              <Input
                id="lastName"
                placeholder="Jansen"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">E-mailadres *</Label>
            <Input
              id="email"
              type="email"
              placeholder="jan@bedrijf.nl"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              disabled={isLoading}
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label>Rol</Label>
            <Select
              value={formData.role}
              onValueChange={(v) => setFormData(prev => ({ ...prev, role: v as PartnerRole | ClientRole }))}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS[formData.userType].map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Client Selection (only for client userType) */}
          {formData.userType === 'client' && (
            <div className="space-y-2">
              <Label>Klant *</Label>
              <Select
                value={formData.clientId}
                onValueChange={(v) => setFormData(prev => ({ ...prev, clientId: v }))}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer klant..." />
                </SelectTrigger>
                <SelectContent>
                  {availableClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={!isFormValid || isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Versturen...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Uitnodiging versturen
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
