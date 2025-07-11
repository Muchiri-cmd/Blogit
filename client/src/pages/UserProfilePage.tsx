import { Box, Button } from "@mui/material";
import { UpdateUserForm, UpdatePassword } from "../components";
import { Link } from "react-router-dom";

const UserProfilePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <UpdateUserForm />
        <UpdatePassword />
      </Box>
      <Button
        variant="contained"
        sx={{
          maxWidth: "200px",
        }}
        component={Link}
        to="/blogs"
      >
        My Blogs
      </Button>
    </Box>
  );
};

export default UserProfilePage;
