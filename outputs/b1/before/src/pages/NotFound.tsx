import { useLocation } from "react-router-dom";
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useEffect } from "react";
import { useSeo } from "@/hooks/use-seo";
import { useLocale } from "@/i18n/use-locale";

const NotFound = () => {
  const { isArabic } = useLocale();
  const location = useLocation();

  // Mark 404s as noindex so search engines don't index them.
  useSeo({
    title: isArabic ? "الصفحة غير موجودة | مركز ديجي-تك بيرفورمانس" : "Page Not Found | DIGI-TEC Performance Center",
    description: isArabic ? "الصفحة التي تبحث عنها غير موجودة. تصفح خدماتنا أو تواصل مع مركز ديجي-تك بيرفورمانس في دبي." : "The page you are looking for does not exist. Browse our services or contact Digitec Performance Center in Dubai.",
    noindex: true,
  });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-off-white px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black mb-4 text-burnt-orange">404</h1>
        <p className="text-xl mb-6">{isArabic ? 'الصفحة غير موجودة.' : 'Page not found.'}</p>
        <p className="text-white/60 mb-8 text-sm">
          {isArabic ? 'الصفحة التي طلبتها غير موجودة. يمكنك تصفح خدماتنا أو العودة إلى الصفحة الرئيسية.' : 'The page you requested does not exist. Try our services or head back home.'}
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn-primary">
            {isArabic ? 'الرئيسية' : 'Home'}
          </Link>
          <Link to="/services" className="btn-secondary">
            {isArabic ? 'الخدمات' : 'Services'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
