import React from "react";
import { Route, Routes } from "react-router-dom";
import EmpProtectedRoute from "./Protected/EmpProtect";
import EmpHome from "../pages/EmpHomePage";

export const EmpRoutes = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <EmpProtectedRoute>
            <EmpHome />
          </EmpProtectedRoute>
        }
      />
    </Routes>
  );
};
