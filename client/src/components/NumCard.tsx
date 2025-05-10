import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

interface ActiveUsersCardProps {
  count: number;
  heading: string;
}

const CardStyled = styled(Card)(({ theme }) => ({
  backgroundColor: "#ecf2f8",
  color: "black",
  borderRadius: "8px",
  padding: "12px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)", 
  width: "100%", 
}));


const NumCard: React.FC<ActiveUsersCardProps> = ({ count ,heading}) => {
  return (
    <CardStyled>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            {heading}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {count}
          </Typography>
        </Box>
      </CardContent>
    </CardStyled>
  );
};

export default NumCard;
