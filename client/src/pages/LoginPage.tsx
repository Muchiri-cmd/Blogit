import {
  Box,
  Paper,
  TextField,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import type { MouseEvent } from "react";
import { login } from "../services/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    // console.log("loggin in")
    const data = { email, password };
    try {
      const res = await login(data);
      // console.log("loggin in successful", res);
      const token = res.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error("An error occurred during login", error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Box
        sx={{
          height: "96vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            p: 5,
            boxShadow: 2,
            width: "500px",
          }}
          elevation={6}
          variant="outlined"
        >
          <Typography variant="h5" mb={3} textAlign="center">
            Login
          </Typography>
          <form action="">
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button></Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default LoginPage;
