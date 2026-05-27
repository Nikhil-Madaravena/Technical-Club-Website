import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GalleryPage from "./pages/Gallery";
import EventsPage from "./pages/Events";
import JoinPage from "./pages/JoinUs";
import AdminLoginPage from "./pages/AdminLogin";
import DashboardPage from "./pages/Dashboard";
import ContactPage from "./pages/Contact";
import SumshodiniPage from "./pages/Sumshodini";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/sumshodini" element={<SumshodiniPage/>} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
