import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login_API } from "../action/AuthApi";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  console.log("login renderd")
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  console.log(isAuthenticated,user)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const res = await login_API(email, password);
      login(res.user, res?.token);
    } catch {}
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user.role;
      const redirectPath =
        role === "admin"
          ? "/admin/dashboard"
          : role === "manager"
          ? "/manager/dashboard"
          : "/emp/dashboard";

      navigate(redirectPath);
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          LoginPage
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            fullWidth
            required
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            fullWidth
            required
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            LoginPage
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
