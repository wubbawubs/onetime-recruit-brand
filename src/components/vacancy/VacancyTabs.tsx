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
    <div className="flex items-center gap-1 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2.5 text-sm font-medium transition-colors relative",
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
  );
}
