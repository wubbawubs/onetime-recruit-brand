import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  GitBranch, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import onetimeLogo from "@/assets/onetime-logo.webp";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, badge: null },
  { label: "Vacatures", href: "/vacatures", icon: Briefcase, badge: 4 },
  { label: "Kandidaten", href: "/kandidaten", icon: Users, badge: 3 },
  { label: "Pipeline", href: "/pipeline", icon: GitBranch, badge: null },
  { label: "Rapportages", href: "/rapportages", icon: BarChart3, badge: null },
  { label: "Instellingen", href: "/instellingen", icon: Settings, badge: null },
];

export function Sidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-60 bg-card/95 backdrop-blur-sm border-r border-border/30 transition-transform duration-200 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-8">
            <div className="flex items-center gap-3">
              <img src={onetimeLogo} alt="Onetime Recruit" className="h-9 w-auto" />
              <span className="font-semibold text-lg text-foreground tracking-tight">Onetime</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === "/dashboard" && location.pathname === "/");
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "group relative flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all duration-200",
                    isActive
                      ? "bg-primary/8 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  )}
                >
                  {/* Active indicator line */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
                  )}
                  
                  <div className="flex items-center gap-3">
                    <item.icon className={cn(
                      "h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-105", 
                      isActive && "text-primary"
                    )} />
                    <span className="transition-colors duration-200">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={cn(
                      "text-[10px] font-medium min-w-[20px] text-center px-1.5 py-0.5 rounded-full transition-colors duration-200",
                      isActive 
                        ? "bg-primary/15 text-primary" 
                        : "bg-muted/80 text-muted-foreground group-hover:bg-muted"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Pro tip section */}
          <div className="mx-3 mb-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Pro tip</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Bekijk je pipeline dagelijks voor de beste resultaten.
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 py-5 border-t border-border/30">
            <p className="text-[11px] text-muted-foreground/60">
              © 2024 Onetime Recruit
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
