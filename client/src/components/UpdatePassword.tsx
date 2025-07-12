import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import { updatePassword } from "../services/user";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // const res =
      await updatePassword(newPassword);
      // console.log('successfully updated password', res)
      navigate("/login");
    } catch (error) {
      console.log("Error updating password", error);
    }
  };

  return (
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
          height: "480px",
        }}
        elevation={6}
        variant="outlined"
      >
        <Typography variant="h5" mb={3} textAlign="center">
          Update Password
        </Typography>
        <form action="" onSubmit={handleUpdate}>
          <Stack spacing={2}>
            <TextField
              label="Current password"
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              label="New Password"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button variant="contained" sx={{ mt: 2 }} type="submit">
              Update Password
            </Button>
            <Button></Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdatePassword;
