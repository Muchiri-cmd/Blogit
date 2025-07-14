import { Box, Typography, Container, Divider, Paper } from "@mui/material";
import { UpdateUserForm, UpdatePassword, UserBlogs } from "../components";

const UserProfilePage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        marginTop: "3.5rem",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            User Profile
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 400,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Manage your account settings and blog content
          </Typography>
          <Divider
            sx={{
              marginTop: "1rem",
              backgroundColor: "#e2e8f0",
              height: "2px",
              width: "110px",
              margin: "1.5rem auto",
            }}
          />
        </Box>

        <Paper
          elevation={0}
          sx={{
            padding: "1rem",
            borderRadius: "10px",
            boxShadow: 2,
            border: "1px solid lightgrey",
            paddingBottom: "4rem",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Account Settings
          </Typography>

          <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column", 
              md: "row",    
            },
            gap: 3,
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <UpdateUserForm />
          </Box>
          <Box sx={{ flex: 1 }}>
            <UpdatePassword />
          </Box>
        </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            borderRadius: "10px",
            boxShadow: 6,
            border: "1px solid lightgrey",
            overflow: "hidden",
            marginTop: "2rem",
          }}
        >
          <Box
            sx={{
              padding: "1rem",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Content Management
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                marginTop: "0.5rem",
              }}
            >
              View, edit, and manage all your blog posts
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "0",
            }}
          >
            <UserBlogs />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserProfilePage;
