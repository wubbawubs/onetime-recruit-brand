import { Building2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { getVisiblePartners, Partner } from '@/data/mockPartnersData';

interface PartnerFilterProps {
  value: string;
  onValueChange: (value: string) => void;
  showAllOption?: boolean;
  className?: string;
}

export function PartnerFilter({ 
  value, 
  onValueChange, 
  showAllOption = true,
  className = ''
}: PartnerFilterProps) {
  const { user } = useAuth();
  
  const visiblePartners = getVisiblePartners(
    user?.role || 'client', 
    user?.partnerId
  );

  // Don't show filter if user can only see one partner
  if (visiblePartners.length <= 1 && !showAllOption) {
    return null;
  }

  // For clients, don't show any filter - they only see their own data
  if (user?.role === 'client') {
    return null;
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={`w-full sm:w-[200px] ${className}`}>
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Selecteer partner" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {showAllOption && (
          <SelectItem value="all">Alle partners</SelectItem>
        )}
        {visiblePartners.map((partner) => (
          <SelectItem key={partner.id} value={partner.id}>
            <div className="flex items-center gap-2">
              <span>{partner.name}</span>
              {partner.type === 'client' && (
                <span className="text-xs text-muted-foreground">(Klant)</span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
