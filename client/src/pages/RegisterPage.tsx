import {
  Box,
  Paper,
  TextField,
  Stack,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
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
            marginTop: "25px",
          }}
          elevation={6}
          variant="outlined"
        >
          <Typography variant="h5" mb={3} textAlign="center">
            Create Account
          </Typography>
          <form action="">
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid>
                  <TextField
                    label="First Name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Last Name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
              </Grid>

              <TextField
                label="Username"
                type="text"
                required
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
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
              <TextField
                label="Confirm Password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
                onClick={handleRegister}
              >
                Register
              </Button>

              <Typography variant="body2">
                Already have an account?
                <Button
                  component={Link}
                  to="/login"
                  style={{
                    color: "blue",
                    marginLeft: ".2rem",
                    textDecoration: "underline",
                  }}
                >
                  Login
                </Button>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default RegisterPage;
