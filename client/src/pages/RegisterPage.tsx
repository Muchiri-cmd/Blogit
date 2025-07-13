import {
  Box,
  Paper,
  TextField,
  Stack,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useState } from "react";
import { register } from "../services/auth";
import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: MouseEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const data = {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
    };
    try {
      console.log("data", data);
      await register(data);
      console.log("successful registration");
      navigate("/login");
    } catch (error) {
      console.error("An error occurred during registration", error);
      alert("Registration failed. Please try again.");
    }

    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
            p: 5,
            boxShadow: 6,
            width: "600px",
            borderRadius: "10px",
          }}
          elevation={0}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            Create Account
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 2,
              textAlign: "center",
              color: "text.secondary",
              fontSize: "16px",
            }}
          >
            Please fill in your details to register
          </Typography>

          <form action="">
            <Stack spacing={2}>
              <Grid container spacing={3}>
                <Grid >
                  <TextField
                    label="First Name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid >
                  <TextField
                    label="Last Name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <TextField
                label="Username"
                type="text"
                required
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
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
              <TextField
                label="Confirm Password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                onClick={handleRegister}
                fullWidth
              >
                Register
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
                  Already have an account?
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
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default RegisterPage;
