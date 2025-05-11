import * as React from "react";
import {
  Drawer,
  Box,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useAuth } from "../context/AuthContext";

export default function LeftSidebarDrawer() {
  const { user } = useAuth();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigate = useNavigate();

  const handleListItemClick = (index: number, path: string) => {
    setSelectedIndex(index);
    navigate(path);
  };
  const adminRoute = [
    { text: "Dashboard", path: "/admin/dashboard" },
    { text: "New Employee", path: "/admin/new-employee" },
    { text: "Department", path: "/admin/department" },
    { text: "Send email", path: "/send-email" },
    { text: "Drafts", path: "/drafts" },
  ];
  const managerRoute = [
    { text: "Dashboard", path: "/manager/dashboard" },
    { text: "Attendance", path: "/manager/attendance" },
    { text: "Department", path: "/manager/department" },
  ];

  const list = () => (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#19232c",
        height: "100vh",
        paddingTop: "16px",
      }}
      role="presentation"
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
        Admin Dashboard
      </Typography>

      <List>
        {(user?.role === "manager" ? managerRoute : adminRoute).map(
          (item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index, item.path)}
                sx={{
                  backgroundColor:
                    selectedIndex === index ? "#304252" : "transparent",
                  "&:hover": {
                    backgroundColor: "#304252",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: selectedIndex === index ? "white" : "blue" }}
                >
                  {index === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={true} variant="persistent">
      {list()}
    </Drawer>
  );
}
