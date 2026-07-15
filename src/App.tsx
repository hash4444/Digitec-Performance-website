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
import BrandServicePage from "./pages/BrandServicePage";
import BestWorkshopPage from "./pages/BestWorkshopPage";
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

// Mercedes service URLs have long-standing search history. Keep those pages as
// the single indexable destination and send newer duplicate brand sub-pages to them.
const mercedesBrandServiceRedirects: Array<[string, string]> = [
  ["oil-change", "/services/mercedes-oil-change-dubai"],
  ["brake-repair", "/services/mercedes-brake-repair-dubai"],
  ["transmission-repair", "/services/mercedes-transmission-repair-dubai"],
  ["ac-repair", "/services/mercedes-ac-repair-dubai"],
  ["suspension-repair", "/services/mercedes-suspension-repair-dubai"],
  ["engine-diagnostics", "/services/mercedes-diagnostics-dubai"],
  ["mechanical-repair", "/services/mercedes-mechanical-repair-dubai"],
  ["steering-repair", "/services/mercedes-steering-repair-dubai"],
  ["battery-replacement", "/services/mercedes-battery-replacement-dubai"],
  ["electrical-repair", "/services/mercedes-electrical-repair-dubai"],
  ["exhaust-repair", "/services/mercedes-exhaust-repair-dubai"],
  ["fuel-system-repair", "/services/mercedes-fuel-system-repair-dubai"],
  ["body-repair", "/services/mercedes-body-repair-dubai"],
  ["tire-repair", "/services/mercedes-tire-repair-dubai"],
];

const mercedesLegacyServicePages: Array<[string, string]> = [
  ["mercedes-mechanical-repair-dubai", "mechanical-repair"],
  ["mercedes-transmission-repair-dubai", "transmission-repair"],
  ["mercedes-suspension-repair-dubai", "suspension-repair"],
  ["mercedes-steering-repair-dubai", "steering-repair"],
  ["mercedes-brake-repair-dubai", "brake-repair"],
  ["mercedes-tire-repair-dubai", "tire-repair"],
  ["mercedes-battery-replacement-dubai", "battery-replacement"],
  ["mercedes-exhaust-repair-dubai", "exhaust-repair"],
  ["mercedes-diagnostics-dubai", "engine-diagnostics"],
  ["mercedes-electrical-repair-dubai", "electrical-repair"],
  ["mercedes-fuel-system-repair-dubai", "fuel-system-repair"],
  ["mercedes-ac-repair-dubai", "ac-repair"],
  ["mercedes-body-repair-dubai", "body-repair"],
];

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
          <Route path="/services/mercedes-service-dubai" element={<Navigate to="/services/mercedes-repair-dubai" replace />} />
          {mercedesLegacyServicePages.map(([legacySlug, serviceSlug]) => (
            <Route
              key={legacySlug}
              path={`/services/${legacySlug}`}
              element={
                <BrandServicePage
                  brandSlugOverride="mercedes-benz-service-dubai"
                  serviceSlugOverride={serviceSlug}
                  canonicalPath={`/services/${legacySlug}`}
                />
              }
            />
          ))}
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/brands/:slug" element={<BrandPage />} />
          {mercedesBrandServiceRedirects.map(([serviceSlug, destination]) => (
            <Route
              key={serviceSlug}
              path={`/brands/mercedes-benz-service-dubai/${serviceSlug}`}
              element={<Navigate to={destination} replace />}
            />
          ))}
          <Route path="/brands/:brandSlug/:serviceSlug" element={<BrandServicePage />} />
          {/* AEO landing pages — targeted at AI assistants ("best ... in Dubai") */}
          <Route path="/best-car-workshop-dubai" element={<BestWorkshopPage />} />
          <Route path="/best-mercedes-workshop-dubai" element={<BestWorkshopPage />} />
          <Route path="/best-bmw-workshop-dubai" element={<BestWorkshopPage />} />
          <Route path="/best-porsche-workshop-dubai" element={<BestWorkshopPage />} />
          <Route path="/best-audi-workshop-dubai" element={<BestWorkshopPage />} />
          <Route path="/best-range-rover-workshop-dubai" element={<BestWorkshopPage />} />
          <Route path="/best-ferrari-workshop-dubai" element={<BestWorkshopPage />} />
          <Route path="/best-lamborghini-workshop-dubai" element={<BestWorkshopPage />} />
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
          <Route path="/services/engine-diagnostics" element={<Navigate to="/services/car-diagnostics-dubai" replace />} />
          <Route path="/services/engine-diagnostics-dubai" element={<Navigate to="/services/car-diagnostics-dubai" replace />} />
          {/* Old WordPress /services/* slugs still in Google's index → canonical new slugs */}
          <Route path="/services/performance-tuning-dubai" element={<Navigate to="/tuning" replace />} />
          <Route path="/services/performance-tuning" element={<Navigate to="/tuning" replace />} />
          <Route path="/services/mercedes-oil-change" element={<Navigate to="/services/mercedes-oil-change-dubai" replace />} />
          <Route path="/services/mercedes-ac-repair" element={<Navigate to="/services/mercedes-ac-repair-dubai" replace />} />
          <Route path="/services/mercedes-suspension-repair" element={<Navigate to="/services/mercedes-suspension-repair-dubai" replace />} />
          <Route path="/services/mercedes-brake-repair" element={<Navigate to="/services/mercedes-brake-repair-dubai" replace />} />
          <Route path="/services/mercedes-transmission-repair" element={<Navigate to="/services/mercedes-transmission-repair-dubai" replace />} />
          <Route path="/services/mercedes-body-repair" element={<Navigate to="/services/mercedes-body-repair-dubai" replace />} />
          <Route path="/services/steering-repair" element={<Navigate to="/services/steering-repair-dubai" replace />} />
          <Route path="/services/suspension-repair" element={<Navigate to="/services/suspension-repair-dubai" replace />} />
          <Route path="/services/brake-repair" element={<Navigate to="/services/brake-repair-dubai" replace />} />
          <Route path="/services/brake-system-repairs" element={<Navigate to="/services/brake-repair-dubai" replace />} />
          <Route path="/services/transmission-repair" element={<Navigate to="/services/transmission-repair-dubai" replace />} />
          <Route path="/services/transmission-services" element={<Navigate to="/services/transmission-repair-dubai" replace />} />
          <Route path="/services/routine-maintenance" element={<Navigate to="/services/car-service-dubai" replace />} />
          <Route path="/services/car-programming-diagnostic" element={<Navigate to="/services/car-diagnostics-dubai" replace />} />
          <Route path="/services/battery-changes" element={<Navigate to="/services/battery-replacement-dubai" replace />} />
          <Route path="/services/battery-replacement" element={<Navigate to="/services/battery-replacement-dubai" replace />} />
          <Route path="/services/oil-change-service" element={<Navigate to="/services/oil-change-dubai" replace />} />
          <Route path="/services/oil-change" element={<Navigate to="/services/oil-change-dubai" replace />} />
          <Route path="/services/mechanical-repair" element={<Navigate to="/services/mechanical-repair-dubai" replace />} />
          <Route path="/services/tire-repair" element={<Navigate to="/services/tire-repair-dubai" replace />} />
          <Route path="/services/exhaust-repair" element={<Navigate to="/services/exhaust-repair-dubai" replace />} />
          <Route path="/services/auto-electrical-repair" element={<Navigate to="/services/auto-electrical-repair-dubai" replace />} />
          <Route path="/services/electrical-system-repairs" element={<Navigate to="/services/auto-electrical-repair-dubai" replace />} />
          <Route path="/services/fuel-system-repair" element={<Navigate to="/services/fuel-system-repair-dubai" replace />} />
          <Route path="/services/car-ac-repair" element={<Navigate to="/services/car-ac-repair-dubai" replace />} />
          <Route path="/services/ac-repair-maintenance" element={<Navigate to="/services/car-ac-repair-dubai" replace />} />
          <Route path="/services/car-body-repair" element={<Navigate to="/services/car-body-repair-dubai" replace />} />
          <Route path="/services/body-repair" element={<Navigate to="/services/car-body-repair-dubai" replace />} />
          <Route path="/services/paint-protection" element={<Navigate to="/services/paint-protection-dubai" replace />} />
          <Route path="/services/car-paint-protection" element={<Navigate to="/services/paint-protection-dubai" replace />} />
          <Route path="/services/ppf" element={<Navigate to="/services/paint-protection-dubai" replace />} />
          <Route path="/services/ceramic-coating" element={<Navigate to="/services/paint-protection-dubai" replace />} />
          <Route path="/services/car-service" element={<Navigate to="/services/car-service-dubai" replace />} />
          <Route path="/services/car-diagnostics" element={<Navigate to="/services/car-diagnostics-dubai" replace />} />
          {/* Old WP top-level pages still in index */}
          <Route path="/sitemap" element={<Navigate to="/" replace />} />
          <Route path="/some-of-our-work" element={<Navigate to="/vrx" replace />} />
          <Route path="/privacy-policy" element={<Navigate to="/" replace />} />
          <Route path="/terms-of-service" element={<Navigate to="/" replace />} />

          {/* Legacy WordPress top-level URLs → new /services/* slugs (single hop, preserves SEO) */}
          <Route path="/mercedes" element={<Navigate to="/services/mercedes-repair-dubai" replace />} />
          <Route path="/mercedes-service" element={<Navigate to="/services/mercedes-repair-dubai" replace />} />
          <Route path="/mercedes-repair" element={<Navigate to="/services/mercedes-repair-dubai" replace />} />
          <Route path="/mercedes-repair-dubai" element={<Navigate to="/services/mercedes-repair-dubai" replace />} />
          <Route path="/mercedes-workshop" element={<Navigate to="/services/mercedes-repair-dubai" replace />} />
          <Route path="/mercedes-brake-repair" element={<Navigate to="/services/mercedes-brake-repair-dubai" replace />} />
          <Route path="/mercedes-brake-repair-dubai" element={<Navigate to="/services/mercedes-brake-repair-dubai" replace />} />
          <Route path="/mercedes-transmission-repair" element={<Navigate to="/services/mercedes-transmission-repair-dubai" replace />} />
          <Route path="/mercedes-transmission-repair-dubai" element={<Navigate to="/services/mercedes-transmission-repair-dubai" replace />} />
          <Route path="/mercedes-ac-repair" element={<Navigate to="/services/mercedes-ac-repair-dubai" replace />} />
          <Route path="/mercedes-ac-repair-dubai" element={<Navigate to="/services/mercedes-ac-repair-dubai" replace />} />
          <Route path="/mercedes-suspension-repair" element={<Navigate to="/services/mercedes-suspension-repair-dubai" replace />} />
          <Route path="/mercedes-suspension-repair-dubai" element={<Navigate to="/services/mercedes-suspension-repair-dubai" replace />} />
          <Route path="/mercedes-oil-change" element={<Navigate to="/services/mercedes-oil-change-dubai" replace />} />
          <Route path="/mercedes-oil-change-dubai" element={<Navigate to="/services/mercedes-oil-change-dubai" replace />} />
          <Route path="/mercedes-body-repair" element={<Navigate to="/services/mercedes-body-repair-dubai" replace />} />
          <Route path="/mercedes-body-repair-dubai" element={<Navigate to="/services/mercedes-body-repair-dubai" replace />} />
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
