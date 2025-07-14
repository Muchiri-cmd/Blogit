import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getAllBlogs } from "../services/blogs";

import Navbar from "./Navbar";

import { Link } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  synopsis: string;
  featuredImg: string;
  content: string;
  createdAt: string;
  author: {
    userName: string;
    profilePic: string;
  };
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const blogs = await getAllBlogs();
        // console.log(blogs);
        setBlogs(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const [loading, setLoading] = useState(true);

  // console.log(blogs);
  return (
    <>
      <Navbar></Navbar>
      <Box
        sx={{
          marginTop: "70px",
          backgroundColor: "#fafafa",
          pt: 2,
          pb: 8,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#1a1a1a",
            mb: 2,
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          Latest Insights
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{
              padding: "1.5rem",
            }}
          >
            {blogs.map((blog, index) => (
              <Grid size={4} key={index}>
                <Card
                  sx={{
                    // border:'2px solid red',
                    height: "500px",
                    width: "100%",
                    boxShadow: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "5px",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={blog.featuredImg}
                    sx={{
                      objectFit: "cover",
                      height: 250,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                  <CardContent
                    sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                  >
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/blog/${blog.id}`}
                      sx={{
                        textDecoration: "none",
                        fontWeight: 700,
                        lineHeight: 1.2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        color: "black",
                        "&:hover": {
                          color: "mediumslateblue",
                          transition: "color 0.2s ease",
                        },
                      }}
                    >
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.4,
                        flex: 1,
                        mb: 1,
                        mt: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {blog.synopsis}
                    </Typography>

                    <Box
                      sx={{
                        // border:'2px solid red',
                        textAlign: "right",
                        marginTop: "1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="60px"
                        image={
                          blog.author.profilePic
                            ? blog.author.profilePic
                            : "/profile-picture.png"
                        }
                        sx={{
                          borderRadius: "50%",
                          width: "60px",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 750,
                            fontSize: "18px",
                          }}
                        >
                          {blog.author.userName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#64748b",
                            fontSize: "15px",
                          }}
                        >
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </Typography>
                      </Box>
                    </Box>
                    <Stack
                      direction="row"
                      sx={{
                        // border:'2px solid red',
                        display: "flex",
                        justifyContent: "end",
                        mt: 0.5,
                      }}
                    >
                      <IconButton
                        size="large"
                        sx={{
                          "&:hover": {
                            color: "mediumslateblue",
                          },
                        }}
                        component={Link}
                        to={`/blog/${blog.id}`}
                      >
                        <FaExternalLinkAlt size={15} />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Blogs;
