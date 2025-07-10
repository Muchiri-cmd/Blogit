import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getUserBlogs, deleteBlog } from "../services/blogs";

interface Blog {
  id: string;
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

  const handleDelete = async (id: Number) => {
    try {
      console.log(`Deleting blog ${id}`);
      // await deleteBlog(Number(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          marginTop: "70px",
          // border:'2px solid red',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            // border:'2px solid blue',
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>ALL MY POSTS</Typography>
          {blogs.map((blog, index) => (
            <Grid size={8} key={index}>
              <Card
                sx={{
                  // border:'2px solid red',
                  maxHeight: "500px",
                  width: "100%",
                  boxShadow: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5px",
                }}
              >
                <CardMedia
                  component="img"
                  image="./dollars.jpg"
                  sx={{
                    objectFit: "cover",
                    maxHeight: "280px",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/blog/${blog.id}`}
                  >
                    {blog.title}
                  </Typography>
                  <Typography variant="body2">{blog.synopsis}</Typography>

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
                    {/* <CardMedia
                      component="img"
                      height="50px"
                      image="./user1.jpg"
                      sx={{
                        borderRadius: "50%",
                        width: "50px",
                      }}
                    /> */}
                    {/* <Box>
                      <Typography variant="body2">
                        {blog.author.userName}
                      </Typography>
                      <Typography variant="body2">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box> */}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      marginTop: "1rem",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/update-blog/${blog.id}`}
                    >
                      Edit Post
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#dc3545",
                      }}
                      onClick={() => handleDelete(Number(blog.id))}
                      // component={Link}
                      // to={`/delete-blog/${blog.id}`}
                    >
                      Delete Post
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default UserBlogs;
