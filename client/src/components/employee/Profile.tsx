import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
  CardHeader,
  CardActions,
  IconButton,
  CardMedia,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <Box sx={{ display: "flex" }}>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          avatar={
            <Avatar sx={{}} aria-label="recipe">
              R
            </Avatar>
          }
          action={<IconButton aria-label="settings">c</IconButton>}
          title={`Hi ${user?.firstName} 👋`}
          subheader="Software Engineer"
          titleTypographyProps={{ variant: "h5" }} 
        />
      </Card>
    </Box>
  );
};

export default Profile;
