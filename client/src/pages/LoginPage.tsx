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
      alert(`Ooops. Something went wrong`)
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            p: 6,
            boxShadow: 6,
            width: "600px",
            borderRadius: "10px",
          }}
          elevation={0}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              textAlign: "center",
              color: "text.secondary",
              fontSize: "16px",
            }}
          >
            Please sign in to your account
          </Typography>

          <form action="">
            <Stack spacing={3}>
              <TextField
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                sx={{
                  py: 1.5,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 600,
                  backgroundColor: "#3498db",
                }}
                type="submit"
                onClick={handleLogin}
                fullWidth
              >
                Sign In
              </Button>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    color: "text.secondary",
                    mt: 2,
                  }}
                >
                  Don't have an account?
                </Typography>

                <Button
                  variant="text"
                  sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#3498db",
                    mt: 2,
                  }}
                  onClick={() => navigate("/sign-up")}
                >
                  Sign up
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default LoginPage;
