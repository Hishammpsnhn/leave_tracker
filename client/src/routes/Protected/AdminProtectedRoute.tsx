import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  console.log(isAuthenticated,user)
  return isAuthenticated && user?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminProtectedRoute;
