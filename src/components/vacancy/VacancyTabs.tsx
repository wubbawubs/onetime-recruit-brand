import { cn } from "@/lib/utils";

interface VacancyTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'overview', label: 'Overzicht' },
  { id: 'edit', label: 'Bewerken' },
  { id: 'publication', label: 'Publicatie & jobsite' },
  { id: 'form', label: 'Formulier & vragen' },
  { id: 'team', label: 'Team & rechten' },
  { id: 'automation', label: 'Automatisering' },
];

export function VacancyTabs({ activeTab, onTabChange }: VacancyTabsProps) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
      <div className="flex items-center gap-1 border-b border-border min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
