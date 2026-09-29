import { Navigate, useLocation } from 'react-router-dom';

/** Browser fallback only; the edge rule supplies the permanent HTTP response. */
export default function PreserveQueryNavigate({ to, replace }: { to: string; replace?: boolean }) {
  const { search, hash } = useLocation();
  return <Navigate to={`${to}${search}${hash}`} replace={replace} />;
}
