import Navbar from "./Navbar";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { createNewBlog } from "../services/blogs";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [featuredImg, setFeaturedImg] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleAddBlog = async (e: React.MouseEvent) => {
    e.preventDefault();
    const blogData = { title, synopsis, content, featuredImg };
    const res = await createNewBlog(blogData);
    console.log("Blog created successfully:", res);
    setTitle("");
    setSynopsis("");
    setContent("");
    navigate("/");
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
          minHeight: "88vh",
        }}
      >
        <Paper
          sx={{
            p: 5,
            boxShadow: 2,
            width: "80%",
          }}
          elevation={6}
          variant="outlined"
        >
          <Typography variant="h5" mb={3} textAlign="center">
            Create Blog Post
          </Typography>
          <form action="">
            <Stack spacing={2}>
              <TextField
                label="Title"
                type="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Synopsis"
                type="synopsis"
                required
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
              />
              {/* <TextField
                label="Featured Image URL"
                type="featuredImg"
                required
                value={featuredImg}
                onChange={(e) => setFeaturedImg(e.target.value)}
              /> */}
              <TextField
                label="Content"
                type="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={7}
              />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
                onClick={handleAddBlog}
              >
                Add Blog
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default BlogForm;
