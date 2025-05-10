import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const EmpProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();

  return isAuthenticated && user?.role === "emp" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default EmpProtectedRoute;
