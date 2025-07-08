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

const RegisterPage = () => {
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
          }}
          elevation={6}
          variant="outlined"
        >
          <Typography variant="h5" mb={3} textAlign="center">
            Create Account
          </Typography>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid>
                <TextField label="First Name" type="text" required />
              </Grid>
              <Grid>
                <TextField label="Last Name" type="text" required />
              </Grid>
            </Grid>

            <TextField label="Username" type="text" required />
            <TextField label="Email" type="email" required />
            <TextField label="Password" type="password" required />
            <TextField label="Confirm Password" type="password" required />

            <Button variant="contained" sx={{ mt: 2 }}>
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
        </Paper>
      </Box>
    </>
  );
};

export default RegisterPage;
