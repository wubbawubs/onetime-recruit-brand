import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoadingScreen } from "@/components/auth/LoadingScreen";
import { ThemeProvider } from "next-themes";
import Dashboard from "./pages/Dashboard";
import BrandGuide from "./pages/BrandGuide";
import VacancyDetail from "./pages/VacancyDetail";
import Kandidaten from "./pages/Kandidaten";
import Pipeline from "./pages/Pipeline";
import Vacatures from "./pages/Vacatures";
import Rapportages from "./pages/Rapportages";
import Instellingen from "./pages/Instellingen";
import Admin from "./pages/Admin";
import EmailTemplates from "./pages/EmailTemplates";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/brand" element={<ProtectedRoute><BrandGuide /></ProtectedRoute>} />
      <Route path="/vacatures" element={<ProtectedRoute><Vacatures /></ProtectedRoute>} />
      <Route path="/vacatures/:vacatureId" element={<ProtectedRoute><VacancyDetail /></ProtectedRoute>} />
      <Route path="/kandidaten" element={<ProtectedRoute><Kandidaten /></ProtectedRoute>} />
      <Route path="/pipeline" element={<ProtectedRoute><Pipeline /></ProtectedRoute>} />
      <Route path="/rapportages" element={<ProtectedRoute><Rapportages /></ProtectedRoute>} />
      <Route path="/instellingen" element={<ProtectedRoute><Instellingen /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/admin/email-templates" element={<ProtectedRoute><EmailTemplates /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
