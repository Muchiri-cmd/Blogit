import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getUserBlogs, deleteBlog } from "../services/blogs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";

interface Blog {
  id: number;
  title: string;
  synopsis: string;
  featuredImg: string;
  content: string;
  createdAt: string;
  author: {
    userName: string;
  };
}

const UserBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const userBlogs = await getUserBlogs();
        // console.log("UserBLogs", userBlogs);
        setBlogs(userBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      console.log(`Deleting blog ${id}`);
      await deleteBlog(Number(id));
      setBlogs((blogs) => blogs.filter((blog) => Number(blog.id) !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          padding: "2rem",
        }}
      >
        {blogs.length === 0 ? (
          <Box sx={{ display: "flex" }}>
            <Typography variant="body1">No blogs yet</Typography>
          </Box>
        ) : (
          <Grid container spacing={2} sx={{ width: "100%" }}>
            {blogs.map((blog, index) => (
              <Grid size={6} key={index}>
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
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <Tooltip title="Edit Post">
                        <IconButton
                          component={Link}
                          to={`/update-blog/${blog.id}`}
                          sx={{
                            backgroundColor: "#3498db",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#2980b9",
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete Post">
                        <IconButton
                          onClick={() => handleDelete(Number(blog.id))}
                          sx={{
                            backgroundColor: "#e74c3c",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#c0392b",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
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

export default UserBlogs;
