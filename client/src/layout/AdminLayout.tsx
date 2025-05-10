// src/components/AdminLayout.tsx
import React from "react";
import { Box } from "@mui/material";
import AnchorTemporaryDrawer from "../components/LeftSidebarDrawer";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AnchorTemporaryDrawer />
      <Box
        sx={{
          flexGrow: 1,
          paddingLeft: "250px",
          paddingTop: 2,
          paddingRight: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
