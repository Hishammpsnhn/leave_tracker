import React from "react";
import Profile from "../components/employee/Profile";
import Attandace from "../components/employee/Attandace";
import { Box } from "@mui/material";

const EmpHome = () => {
  return (
    <div>
      <Profile />
      <Box padding={5}>
        <Attandace />
      </Box>
    </div>
  );
};

export default EmpHome;
