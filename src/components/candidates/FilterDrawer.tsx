import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { stages, sources, availableTags, vacancies } from "@/data/mockCandidatesData";

export interface FilterState {
  stages: string[];
  sources: string[];
  tags: string[];
  vacancy: string;
}

interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  onApply: () => void;
}

export function FilterDrawer({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onReset,
  onApply,
}: FilterDrawerProps) {
  const toggleArrayFilter = (
    key: "stages" | "sources" | "tags",
    value: string
  ) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[320px] sm:w-[380px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Stages */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Stage</Label>
            <div className="space-y-2">
              {stages.slice(1).map((stage) => (
                <div key={stage.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`stage-${stage.id}`}
                    checked={filters.stages.includes(stage.id)}
                    onCheckedChange={() => toggleArrayFilter("stages", stage.id)}
                  />
                  <Label
                    htmlFor={`stage-${stage.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {stage.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Bron</Label>
            <div className="space-y-2">
              {sources.map((source) => (
                <div key={source} className="flex items-center gap-2">
                  <Checkbox
                    id={`source-${source}`}
                    checked={filters.sources.includes(source)}
                    onCheckedChange={() => toggleArrayFilter("sources", source)}
                  />
                  <Label
                    htmlFor={`source-${source}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {source}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Tags</Label>
            <div className="space-y-2">
              {availableTags.map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={filters.tags.includes(tag)}
                    onCheckedChange={() => toggleArrayFilter("tags", tag)}
                  />
                  <Label
                    htmlFor={`tag-${tag}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Vacancy */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Vacature</Label>
            <Select
              value={filters.vacancy}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, vacancy: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Alle vacatures" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle vacatures</SelectItem>
                {vacancies.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onReset}>
            Reset
          </Button>
          <Button className="flex-1" onClick={onApply}>
            Toepassen
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
