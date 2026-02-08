import { Search, X, SlidersHorizontal } from 'lucide-react';
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
    <div className="w-full">
      {/* Search and Filters Card */}
      <div className="p-4 sm:p-5 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input - Premium styling */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Zoek op functietitel of trefwoord..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-11 h-12 bg-background border-border/60 rounded-xl text-base placeholder:text-muted-foreground/60 focus-visible:ring-[color:var(--client-primary)] focus-visible:border-[color:var(--client-primary)]"
            />
          </div>
          
          {/* Location Filter - Premium styling */}
          <Select 
            value={locationFilter || "all"} 
            onValueChange={(val) => onLocationChange(val === "all" ? "" : val)}
          >
            <SelectTrigger className="w-full sm:w-52 h-12 rounded-xl border-border/60 bg-background">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Alle locaties" />
              </div>
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
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/40">
            <span className="text-sm text-muted-foreground">Actieve filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-sm">
                "{searchQuery}"
                <button 
                  onClick={() => onSearchChange('')}
                  className="hover:text-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {locationFilter && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-sm">
                {locationFilter}
                <button 
                  onClick={() => onLocationChange('')}
                  className="hover:text-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-foreground ml-auto"
            >
              Wis alles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
