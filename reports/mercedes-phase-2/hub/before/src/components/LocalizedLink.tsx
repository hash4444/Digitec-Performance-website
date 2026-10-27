import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { useLocale } from '@/i18n/use-locale';

export const LocalizedLink = React.forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => {
  const { localizedPath } = useLocale();
  const destination = typeof to === 'string' && to.startsWith('/') ? localizedPath(to) : to;
  return <Link ref={ref} to={destination} {...props} />;
});

LocalizedLink.displayName = 'LocalizedLink';
