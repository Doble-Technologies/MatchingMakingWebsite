import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@src/Auth';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // add a spinner later... too lazy to do that now.

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};