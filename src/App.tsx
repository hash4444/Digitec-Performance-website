import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Tuning from "./pages/Tuning";
import VRX from "./pages/VRX";
import Services from "./pages/Services";
import ServicePage from "./pages/ServicePage";
import AboutUs from "./pages/AboutUs";
import FAQPage from "./pages/FAQPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tuning" element={<Tuning />} />
          <Route path="/vrx" element={<VRX />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about-us" element={<Navigate to="/about" replace />} />
          <Route path="/who-we-are" element={<Navigate to="/about" replace />} />
          <Route path="/faqs" element={<Navigate to="/faq" replace />} />
          <Route path="/contact" element={<Navigate to="/about" replace />} />

          {/* Legacy /services/* slug redirects (one-hop to new H1-derived URLs) */}
          <Route path="/services/mercedes-body-repair-dubai" element={<Navigate to="/services/car-body-repair-dubai" replace />} />
          <Route path="/services/engine-diagnostics" element={<Navigate to="/services/car-diagnostics-dubai" replace />} />
          <Route path="/services/engine-diagnostics-dubai" element={<Navigate to="/services/car-diagnostics-dubai" replace />} />

          {/* Legacy WordPress top-level URLs → new /services/* slugs (single hop, preserves SEO) */}
          <Route path="/mercedes" element={<Navigate to="/services/mercedes-repair-dubai" replace />} />
          <Route path="/mercedes-service" element={<Navigate to="/services/mercedes-repair-dubai" replace />} />
          <Route path="/mercedes-repair" element={<Navigate to="/services/mercedes-repair-dubai" replace />} />
          <Route path="/mercedes-repair-dubai" element={<Navigate to="/services/mercedes-repair-dubai" replace />} />
          <Route path="/mercedes-workshop" element={<Navigate to="/services/mercedes-repair-dubai" replace />} />
          <Route path="/mercedes-brake-repair" element={<Navigate to="/services/brake-repair-dubai" replace />} />
          <Route path="/mercedes-brake-repair-dubai" element={<Navigate to="/services/brake-repair-dubai" replace />} />
          <Route path="/mercedes-transmission-repair" element={<Navigate to="/services/transmission-repair-dubai" replace />} />
          <Route path="/mercedes-transmission-repair-dubai" element={<Navigate to="/services/transmission-repair-dubai" replace />} />
          <Route path="/mercedes-ac-repair" element={<Navigate to="/services/car-ac-repair-dubai" replace />} />
          <Route path="/mercedes-ac-repair-dubai" element={<Navigate to="/services/car-ac-repair-dubai" replace />} />
          <Route path="/mercedes-suspension-repair" element={<Navigate to="/services/suspension-repair-dubai" replace />} />
          <Route path="/mercedes-suspension-repair-dubai" element={<Navigate to="/services/suspension-repair-dubai" replace />} />
          <Route path="/mercedes-oil-change" element={<Navigate to="/services/oil-change-dubai" replace />} />
          <Route path="/mercedes-oil-change-dubai" element={<Navigate to="/services/oil-change-dubai" replace />} />
          <Route path="/mercedes-body-repair" element={<Navigate to="/services/car-body-repair-dubai" replace />} />
          <Route path="/mercedes-body-repair-dubai" element={<Navigate to="/services/car-body-repair-dubai" replace />} />
          <Route path="/engine-diagnostics" element={<Navigate to="/services/car-diagnostics-dubai" replace />} />
          <Route path="/engine-diagnostics-dubai" element={<Navigate to="/services/car-diagnostics-dubai" replace />} />
          <Route path="/performance-tuning" element={<Navigate to="/tuning" replace />} />
          <Route path="/performance-tuning-dubai" element={<Navigate to="/tuning" replace />} />
          <Route path="/index.php" element={<Navigate to="/" replace />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
