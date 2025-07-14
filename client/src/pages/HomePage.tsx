import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "../components";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/sign-up");
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "grey.50",
        }}
      >
        <Navbar></Navbar>

        <Container maxWidth="lg">
          <Box
            sx={{
              py: 12,
              textAlign: "center",
              marginTop: "70px",
              // px: 4,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "grey.800",
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Share Your Stories
              <br />
              Build Your Audience
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "grey.600",
                mb: 6,
                fontWeight: 400,
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              The modern blogging platform for creators, businesses, and thought
              leaders. Start writing, publishing, and growing your audience
              today.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  py: 2,
                  px: 4,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "18px",
                  fontWeight: 600,
                  backgroundColor: "primary.main",
                  boxShadow: 6,
                  minWidth: "200px",
                }}
                onClick={handleGetStarted}
              >
                Start Writing
              </Button>

              <Button
                variant="outlined"
                size="large"
                sx={{
                  py: 2,
                  px: 4,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "primary.main",
                  borderColor: "primary.main",
                  minWidth: "200px",
                }}
                component={Link}
                to="/blogs"
              >
                View Recent Blogs
              </Button>
            </Stack>
          </Box>
        </Container>

        <Box
          sx={{
            py: 10,
            backgroundColor: "white",
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: 600,
                color: "grey.800",
                mb: 2,
              }}
            >
              Everything you need to succeed
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "grey.600",
                mb: 8,
                fontSize: "1.1rem",
              }}
            >
              Simple, powerful tools for modern content creators
            </Typography>

            <Grid container spacing={4}>
              <Grid>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    // border: "1px solid #f0f0f0",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "grey.800",
                      mb: 2,
                    }}
                  >
                    Write & Publish
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "grey.600",
                      lineHeight: 1.6,
                    }}
                  >
                    Create beautiful articles with our intuitive editor. Publish
                    instantly and reach your audience.
                  </Typography>
                </Paper>
              </Grid>

              <Grid>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "grey.800",
                      mb: 2,
                    }}
                  >
                    Grow Your Audience
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "grey.600",
                      lineHeight: 1.6,
                    }}
                  >
                    Build a loyal readership with powerful engagement tools and
                    social sharing features.
                  </Typography>
                </Paper>
              </Grid>

              <Grid>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "grey.800",
                      mb: 2,
                    }}
                  >
                    Track Performance
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "grey.600",
                      lineHeight: 1.6,
                    }}
                  >
                    Get insights into your content performance with detailed
                    analytics and reporting.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box
          sx={{
            py: 10,
            backgroundColor: "grey.50",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: "grey.800",
                mb: 3,
              }}
            >
              Ready to start your blogging journey?
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "grey.600",
                mb: 4,
                fontSize: "1.1rem",
              }}
            >
              Join thousands of creators already using our platform
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{
                py: 2,
                px: 6,
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "18px",
                fontWeight: 600,
                backgroundColor: "primary.main",
                boxShadow: "0 4px 12px rgba(52, 152, 219, 0.3)",
              }}
              onClick={handleGetStarted}
            >
              Get Started Free
            </Button>
          </Container>
        </Box>
        <Box
          sx={{
            py: 4,
            backgroundColor: "grey.800",
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "grey.400",
                // fontSize: "14px",
              }}
            >
              © 2025 Blogit
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
