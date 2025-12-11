import { Sidebar } from "./Sidebar";
import { SidebarProvider, useSidebarContext } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardContent({ children }: DashboardLayoutProps) {
  const { collapsed } = useSidebarContext();

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <main className={cn(
        "min-h-screen transition-all duration-300",
        collapsed ? "lg:ml-16" : "lg:ml-60"
      )}>
        <div className="p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}
