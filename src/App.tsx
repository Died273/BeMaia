import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Team from "./pages/Team";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";
import Features from "./pages/Features";
import { ContactModalProvider } from '@/contexts/ContactModalContext';
import ContactModal from '@/components/ui/ContactModal';
import Security from "./pages/Security";
import PrivacyPolicy from "./pages/Privacy";  
import TermsOfService from "./pages/Terms";
import Mission from "./pages/Mission"; 
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";
import DashboardCompany from "./pages/Dashboard";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ContactModalProvider>
        <ContactModal />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/team" element={<Team />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/results" element={<Results />} />
            <Route path="/security" element={<Security />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/dashboard-company" element={<DashboardCompany />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContactModalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;