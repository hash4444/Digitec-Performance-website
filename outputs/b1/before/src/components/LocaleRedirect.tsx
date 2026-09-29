import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOCALE_STORAGE_KEY } from '@/i18n/locale';

/** Applies browser-language preference only on the first visit to the English homepage. */
const LocaleRedirect = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== '/' || localStorage.getItem(LOCALE_STORAGE_KEY)) return;
    const prefersArabic = navigator.languages?.some((language) => language.toLowerCase().startsWith('ar'))
      ?? navigator.language.toLowerCase().startsWith('ar');
    if (prefersArabic) {
      localStorage.setItem(LOCALE_STORAGE_KEY, 'ar');
      navigate('/ar', { replace: true });
    }
  }, [navigate, pathname]);

  return null;
};

export default LocaleRedirect;
