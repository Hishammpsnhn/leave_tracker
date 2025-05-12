import React from "react";
import { Route, Routes } from "react-router-dom";
import ManagerProtectedRoute from "./Protected/ManagerProtect";
import ManagerHome from "../pages/manager/ManagerHomePage";
import AdminLayout from "../layout/AdminLayout";
import AttendanceManagement from "../pages/manager/AttendanceManagement";
import LeaveTracking from "../pages/manager/LeaveTrackingPage";

const ManagerRoute = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <ManagerProtectedRoute>
            <AdminLayout>
              <ManagerHome />
            </AdminLayout>
          </ManagerProtectedRoute>
        }
      />
      <Route
        path="attendance"
        element={
          <ManagerProtectedRoute>
            <AdminLayout>
              <AttendanceManagement />
            </AdminLayout>
          </ManagerProtectedRoute>
        }
      />
      <Route
        path="leave"
        element={
          <ManagerProtectedRoute>
            <AdminLayout>
              <LeaveTracking />
            </AdminLayout>
          </ManagerProtectedRoute>
        }
      />
    </Routes>
  );
};

export default ManagerRoute;
