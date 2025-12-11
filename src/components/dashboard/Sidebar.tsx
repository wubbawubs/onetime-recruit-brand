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
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-60 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-200 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-5 py-6">
            <div className="flex items-center gap-2.5">
              <img src={onetimeLogo} alt="Onetime Recruit" className="h-8 w-auto" />
              <span className="font-medium text-base text-sidebar-foreground">Onetime</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === "/dashboard" && location.pathname === "/");
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className="text-xs font-medium text-sidebar-foreground/50 bg-sidebar-border px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-foreground/40">
              © 2024 Onetime Recruit
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
