import * as React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useAuth } from "../context/AuthContext";

export default function LeftSidebarDrawer() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const adminRoutes = React.useMemo(() => [
    { text: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
    { text: "New Employee", path: "/admin/new-employee", icon: <PersonAddIcon /> },
    { text: "Department", path: "/admin/department", icon: <ApartmentIcon /> },
  ], []);

  const managerRoutes = React.useMemo(() => [
    { text: "Dashboard", path: "/manager/dashboard", icon: <DashboardIcon /> },
    { text: "Attendance", path: "/manager/attendance", icon: <AccessTimeIcon /> },
    { text: "Leave Tracking", path: "/manager/leave", icon: <EventNoteIcon /> },
  ], []);

  const routes = user?.role === "manager" ? managerRoutes : adminRoutes;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Drawer anchor="left" open={true} variant="persistent">
      <Box
        sx={{
          width: 250,
          backgroundColor: "#19232c",
          height: "100vh",
          paddingTop: "16px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            paddingLeft: "16px",
            paddingBottom: "16px",
            fontWeight: "bold",
          }}
        >
          {user?.role === "manager" ? "Manager" : "Admin"} Dashboard
        </Typography>

        <List>
          {routes.map(({ text, path, icon }) => {
            const isSelected = location.pathname === path;
            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => handleNavigation(path)}
                  sx={{
                    backgroundColor: isSelected ? "#304252" : "transparent",
                    "&:hover": { backgroundColor: "#304252" },
                  }}
                >
                  <ListItemIcon sx={{ color: isSelected ? "white" : "blue" }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ color: "white" }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
