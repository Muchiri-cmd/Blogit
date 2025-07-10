import { useState } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { updateUser } from "../services/user";

const UpdateUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [profilePic,setProfilePic] = useState('')

  const handleUpdate = async () => {
    try {
      const userData = { firstName, lastName, userName, email };
      await updateUser(userData);
    } catch (error) {
      console.log("error updating user", error);
    }
  };

  return (
    <>
      <Navbar />
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
            Update User
          </Typography>
          <form action="" onSubmit={handleUpdate}>
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

              <Button variant="contained" sx={{ mt: 2 }} type="submit">
                Update User
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default UpdateUserForm;
