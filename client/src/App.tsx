import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { EmpRoutes } from "./routes/EmpRoutes";
import ManagerRoutes from "./routes/ManagerRoute";
import AdminRoutes from "./routes/AdminRoute";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          {/* Employee Routes */}
          <Route path="/emp/*" element={<EmpRoutes />} />

          {/* Manager Routes */}
          <Route path="/manager/*" element={<ManagerRoutes />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
