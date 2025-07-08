import {
  Box,
  Paper,
  TextField,
  Stack,
  Typography,
  Button,
} from "@mui/material";

const LoginPage = () => {
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
          <Stack spacing={2}>
            <TextField label="Email" type="email" required />
            <TextField label="Password" type="password" required />
            <Button variant="contained" sx={{ mt: 2 }}>
              Login
            </Button>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default LoginPage;
