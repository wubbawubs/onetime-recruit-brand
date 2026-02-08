import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface JobFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  locationFilter: string;
  onLocationChange: (location: string) => void;
  locations: string[];
}

export function JobFilters({
  searchQuery,
  onSearchChange,
  locationFilter,
  onLocationChange,
  locations,
}: JobFiltersProps) {
  const hasFilters = searchQuery || locationFilter;

  const clearFilters = () => {
    onSearchChange('');
    onLocationChange('');
  };

  return (
    <div className="w-full space-y-4">
      {/* Search and Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Zoek op functietitel..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-11 bg-background"
          />
        </div>
        
        {/* Location Filter */}
        <Select 
          value={locationFilter || "all"} 
          onValueChange={(val) => onLocationChange(val === "all" ? "" : val)}
        >
          <SelectTrigger className="w-full sm:w-48 h-11">
            <SelectValue placeholder="Alle locaties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle locaties</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Active Filters / Clear */}
      {hasFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Actieve filters:</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="h-7 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Wis alles
          </Button>
        </div>
      )}
    </div>
  );
}
