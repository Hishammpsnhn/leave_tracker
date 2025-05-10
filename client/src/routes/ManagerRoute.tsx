import React from "react";
import { Route, Routes } from "react-router-dom";
import ManagerProtectedRoute from "./Protected/ManagerProtect";
import ManagerHome from "../pages/ManagerHomePage";

const ManagerRoute = () => {
  return (
    <Routes>
      <Route
        path="/manager/dashboard"
        element={
          <ManagerProtectedRoute>
            <ManagerHome />
          </ManagerProtectedRoute>
        }
      />
    </Routes>
  );
};

export default ManagerRoute;
