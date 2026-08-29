import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

export default function ProtectedRoute({ children, requiredRole }) {
  const { onboardingComplete, role } = useUserStore();

  if (!onboardingComplete) return <Navigate to="/" replace />;
  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === 'recruiter' ? '/recruiter' : '/candidate'} replace />;
  }
  return children;
}
