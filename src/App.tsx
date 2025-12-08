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
import { ContactModalProvider } from '@/contexts/ContactModalContext';
import ContactModal from '@/components/ui/ContactModal';
import Security from "./pages/Security";
import PrivacyPolicy from "./pages/Privacy";  
import TermsOfService from "./pages/Terms";
import Mission from "./pages/Mission"; 
import Questionnaire from "./pages/Questionnaire";
import DbQuestionnaire from "./pages/DbQuestionnaire";
import Results from "./pages/Results";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Surveys from "./pages/Surveys";
import DashboardCompany from "./pages/Dashboard";
import CookieConsent from "@/components/CookieConsent";
import CookiePolicy from "./pages/CookiePolicy";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ContactModalProvider>
        <ContactModal />
        <CookieConsent />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/surveys" element={<Surveys />} />
            <Route path="/team" element={<Team />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/questionnaire/db" element={<DbQuestionnaire />} />
            <Route path="/results" element={<Results />} />
            <Route path="/security" element={<Security />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
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