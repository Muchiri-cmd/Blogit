import Navbar from "./Navbar";
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getBlog, updateBlog } from "../services/blogs";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface BlogData {
  id: string;
  title: string;
  synopsis: string;
  featuredImg: string;
  content: string;
}

const UpdateBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<BlogData | null>(null);
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [featuredImg, setFeaturedImg] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await getBlog(Number(id));
        setBlog(blog);
      } catch (error) {
        console.error("Failed fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setSynopsis(blog.synopsis);
      setFeaturedImg(blog.featuredImg);
      setContent(blog.content);
    }
  }, [blog]);

  const handleUpdateBlog = async (e: FormEvent) => {
    e.preventDefault();
    const updateData = { title, synopsis, content, featuredImg };
    try {
      const res = await updateBlog(Number(id), updateData);
      console.log("Blog updated succesffuly", res);
      navigate("/blogs");
    } catch (error) {
      console.error("Error updating blog", error);
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
            Update Blog Post
          </Typography>
          <form action="" onSubmit={handleUpdateBlog}>
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
              <Button variant="contained" sx={{ mt: 2 }} type="submit">
                Update Blog
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default UpdateBlogForm;
