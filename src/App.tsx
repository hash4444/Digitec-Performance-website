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
import BrandPage from "./pages/BrandPage";
import NotFound from "./pages/NotFound";
import LegacyRedirectHandler from "./components/LegacyRedirectHandler";

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
        <LegacyRedirectHandler />
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
          <Route path="/brands/:slug" element={<BrandPage />} />
          <Route path="/about-us" element={<Navigate to="/about" replace />} />
          <Route path="/about-us-demo" element={<Navigate to="/about" replace />} />
          <Route path="/who-we-are" element={<Navigate to="/about" replace />} />
          <Route path="/our-story" element={<Navigate to="/about" replace />} />
          <Route path="/team" element={<Navigate to="/about" replace />} />
          <Route path="/faqs" element={<Navigate to="/faq" replace />} />
          <Route path="/faq-page" element={<Navigate to="/faq" replace />} />
          <Route path="/contact" element={<Navigate to="/about" replace />} />
          <Route path="/contact-us" element={<Navigate to="/about" replace />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/services-page" element={<Navigate to="/services" replace />} />
          <Route path="/our-services" element={<Navigate to="/services" replace />} />
          <Route path="/blogs" element={<Navigate to="/blog" replace />} />
          <Route path="/news" element={<Navigate to="/blog" replace />} />

          {/* Legacy top-level service URLs without /services/ prefix → canonical /services/* */}
          <Route path="/mechanical-repair" element={<Navigate to="/services/mechanical-repair-dubai" replace />} />
          <Route path="/mechanical-repair-dubai" element={<Navigate to="/services/mechanical-repair-dubai" replace />} />
          <Route path="/transmission-repair" element={<Navigate to="/services/transmission-repair-dubai" replace />} />
          <Route path="/transmission-services" element={<Navigate to="/services/transmission-repair-dubai" replace />} />
          <Route path="/suspension-repair" element={<Navigate to="/services/suspension-repair-dubai" replace />} />
          <Route path="/steering-repair" element={<Navigate to="/services/steering-repair-dubai" replace />} />
          <Route path="/brake-repair" element={<Navigate to="/services/brake-repair-dubai" replace />} />
          <Route path="/brake-system-repairs" element={<Navigate to="/services/brake-repair-dubai" replace />} />
          <Route path="/car-service" element={<Navigate to="/services/car-service-dubai" replace />} />
          <Route path="/routine-maintenance" element={<Navigate to="/services/car-service-dubai" replace />} />
          <Route path="/oil-change" element={<Navigate to="/services/oil-change-dubai" replace />} />
          <Route path="/oil-change-service" element={<Navigate to="/services/oil-change-dubai" replace />} />
          <Route path="/tire-repair" element={<Navigate to="/services/tire-repair-dubai" replace />} />
          <Route path="/battery-replacement" element={<Navigate to="/services/battery-replacement-dubai" replace />} />
          <Route path="/battery-changes" element={<Navigate to="/services/battery-replacement-dubai" replace />} />
          <Route path="/exhaust-repair" element={<Navigate to="/services/exhaust-repair-dubai" replace />} />
          <Route path="/car-diagnostics" element={<Navigate to="/services/car-diagnostics-dubai" replace />} />
          <Route path="/car-programming-diagnostic" element={<Navigate to="/services/car-diagnostics-dubai" replace />} />
          <Route path="/auto-electrical-repair" element={<Navigate to="/services/auto-electrical-repair-dubai" replace />} />
          <Route path="/electrical-system-repairs" element={<Navigate to="/services/auto-electrical-repair-dubai" replace />} />
          <Route path="/fuel-system-repair" element={<Navigate to="/services/fuel-system-repair-dubai" replace />} />
          <Route path="/car-ac-repair" element={<Navigate to="/services/car-ac-repair-dubai" replace />} />
          <Route path="/ac-repair-maintenance" element={<Navigate to="/services/car-ac-repair-dubai" replace />} />
          <Route path="/ac-repair" element={<Navigate to="/services/car-ac-repair-dubai" replace />} />
          <Route path="/car-body-repair" element={<Navigate to="/services/car-body-repair-dubai" replace />} />
          <Route path="/body-repair" element={<Navigate to="/services/car-body-repair-dubai" replace />} />
          <Route path="/paint-protection" element={<Navigate to="/services/paint-protection-dubai" replace />} />
          <Route path="/car-paint-protection" element={<Navigate to="/services/paint-protection-dubai" replace />} />
          <Route path="/ppf" element={<Navigate to="/services/paint-protection-dubai" replace />} />
          <Route path="/ceramic-coating" element={<Navigate to="/services/paint-protection-dubai" replace />} />

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
