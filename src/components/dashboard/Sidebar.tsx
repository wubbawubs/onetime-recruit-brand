import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  GitBranch, 
  BarChart3, 
  Settings,
  Menu,
  X
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
          "fixed left-0 top-0 z-40 h-screen w-60 bg-card border-r border-border/40 transition-transform duration-200 lg:translate-x-0",
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
          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === "/dashboard" && location.pathname === "/");
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary font-medium shadow-sm"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("h-[18px] w-[18px]", isActive && "text-primary")} />
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className={cn(
                      "text-[10px] font-medium px-2 py-0.5 rounded-full",
                      isActive 
                        ? "bg-primary/20 text-primary" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-6 py-6 border-t border-border/40">
            <p className="text-[11px] text-muted-foreground/60">
              © 2024 Onetime Recruit
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
