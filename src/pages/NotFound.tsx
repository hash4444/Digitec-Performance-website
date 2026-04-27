import { useLocation, Link, Navigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useSeo } from "@/hooks/use-seo";
import { services } from "@/data/services";

/**
 * Smart 404: before showing a not-found UI, try to resolve the requested path
 * against a known service slug. This catches any legacy variant we did not
 * explicitly enumerate in App.tsx (e.g. /random-old-page-mercedes), preventing
 * soft-404s and preserving link equity by redirecting to the closest live page.
 */
const NotFound = () => {
  const location = useLocation();

  // Mark 404s as noindex so search engines don't index them.
  useSeo({
    title: "Page Not Found | DIGI-TEC Performance Center",
    description: "The page you are looking for does not exist. Browse our services or contact Digitec Performance Center in Dubai.",
    noindex: true,
  });

  // Try to find the closest matching service by slug-keyword overlap.
  const smartTarget = useMemo(() => {
    const path = location.pathname.toLowerCase().replace(/^\/+|\/+$/g, "");
    if (!path) return null;
    const tokens = path.split(/[\/\-_]+/).filter(Boolean);
    if (tokens.length === 0) return null;

    let best: { slug: string; score: number } | null = null;
    for (const s of services) {
      const slugTokens = s.slug.split("-");
      const score = tokens.filter((t) => slugTokens.includes(t)).length;
      if (score >= 2 && (!best || score > best.score)) {
        best = { slug: s.slug, score };
      }
    }
    if (best) return `/services/${best.slug}`;

    // Heuristic fallbacks for common content categories
    if (/blog|article|post|news/.test(path)) return "/blog";
    if (/tuning|gad|ecu|performance/.test(path)) return "/tuning";
    if (/about|team|contact|story/.test(path)) return "/about";
    if (/faq|question/.test(path)) return "/faq";
    if (/service|repair|workshop/.test(path)) return "/services";
    return null;
  }, [location.pathname]);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  if (smartTarget) {
    return <Navigate to={smartTarget} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-off-white px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black mb-4 text-burnt-orange">404</h1>
        <p className="text-xl mb-6">Page not found.</p>
        <p className="text-white/60 mb-8 text-sm">
          The page you requested does not exist. Try our services or head back home.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition">
            Home
          </Link>
          <Link to="/services" className="px-6 py-3 rounded-full border border-white/30 hover:border-burnt-orange transition">
            Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
