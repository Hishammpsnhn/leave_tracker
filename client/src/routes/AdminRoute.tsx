import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminProtectedRoute from "./Protected/AdminProtectedRoute";
import AdminHomePage from "../pages/AdminHomePage";
import NewEmpRegister from "../pages/NewEmpRegister";
import AdminLayout from "../layout/AdminLayout";
import DepartmentManage from "../pages/DeparmentMange";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminHomePage />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="new-employee"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <NewEmpRegister />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="department"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <DepartmentManage />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
