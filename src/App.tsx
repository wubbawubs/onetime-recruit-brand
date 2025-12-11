import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BrandGuide from "./pages/BrandGuide";
import VacancyDetail from "./pages/VacancyDetail";
import Kandidaten from "./pages/Kandidaten";
import Pipeline from "./pages/Pipeline";
import Vacatures from "./pages/Vacatures";
import Rapportages from "./pages/Rapportages";
import Instellingen from "./pages/Instellingen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/brand" element={<BrandGuide />} />
          {/* Vacancy routes */}
          <Route path="/vacatures" element={<Vacatures />} />
          <Route path="/vacatures/:vacatureId" element={<VacancyDetail />} />
          <Route path="/kandidaten" element={<Kandidaten />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/rapportages" element={<Rapportages />} />
          <Route path="/instellingen" element={<Instellingen />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
