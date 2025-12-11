import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  GitBranch, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import onetimeLogo from "@/assets/onetime-logo.webp";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { collapsed, toggleCollapsed } = useSidebarContext();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

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
          "fixed left-0 top-0 z-40 h-screen bg-card/95 backdrop-blur-sm border-r border-border/30 transition-all duration-300 lg:translate-x-0",
          collapsed ? "w-16" : "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo + Collapse button */}
          <div className={cn("flex items-center justify-between py-6", collapsed ? "px-3" : "px-6")}>
            <div className="flex items-center gap-3 overflow-hidden">
              <img src={onetimeLogo} alt="OneTime Rooted" className="h-9 w-9 flex-shrink-0" />
              {!collapsed && (
                <span className="font-semibold text-lg text-foreground tracking-tight whitespace-nowrap">
                  Rooted
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn("hidden lg:flex h-8 w-8 flex-shrink-0", collapsed && "mx-auto")}
              onClick={toggleCollapsed}
            >
              {collapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className={cn("flex-1 space-y-1", collapsed ? "px-2" : "px-3")}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === "/dashboard" && location.pathname === "/") ||
                (item.href === "/vacatures" && location.pathname.startsWith("/vacatures"));
              
              const linkContent = (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "group relative flex items-center justify-between rounded-lg text-sm transition-all duration-200",
                    collapsed ? "px-3 py-3 justify-center" : "px-4 py-3",
                    isActive
                      ? "bg-primary/8 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  )}
                >
                  {/* Active indicator line */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
                  )}
                  
                  <div className={cn("flex items-center", collapsed ? "gap-0" : "gap-3")}>
                    <item.icon className={cn(
                      "h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-105 flex-shrink-0", 
                      isActive && "text-primary"
                    )} />
                    {!collapsed && (
                      <span className="transition-colors duration-200">{item.label}</span>
                    )}
                  </div>
                  {!collapsed && item.badge && (
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

              if (collapsed) {
                return (
                  <Tooltip key={item.href} delayDuration={0}>
                    <TooltipTrigger asChild>
                      {linkContent}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.label}
                      {item.badge && <span className="ml-2 text-muted-foreground">({item.badge})</span>}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return linkContent;
            })}
          </nav>

          {/* User profile section */}
          <div className={cn("border-t border-border/30", collapsed ? "px-2 py-3" : "px-3 py-4")}>
            {user && (
              <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{user.role}</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Logout button */}
            {collapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-full mt-2 h-9 text-muted-foreground hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Uitloggen</TooltipContent>
              </Tooltip>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Uitloggen
              </Button>
            )}
          </div>

          {/* Footer */}
          <div className={cn("py-4 border-t border-border/30", collapsed ? "px-2" : "px-6")}>
            {!collapsed && (
              <p className="text-[11px] text-muted-foreground/60">
                © 2025 Onetime Rooted
              </p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
