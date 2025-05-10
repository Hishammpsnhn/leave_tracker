import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ManagerProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, user } = useAuth();
    

  return isAuthenticated && user?.role === 'manager' ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default ManagerProtectedRoute;