
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('client' | 'provider')[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { session, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/auth");
    } else if (allowedRoles && role && !allowedRoles.includes(role)) {
      // Redirect clients to wallet and providers to scan
      navigate(role === 'client' ? '/wallet' : '/scan');
    }
  }, [session, role, allowedRoles, navigate]);

  if (!session || (allowedRoles && role && !allowedRoles.includes(role))) {
    return null;
  }

  return <>{children}</>;
};
