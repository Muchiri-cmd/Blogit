import Navbar from "./Navbar";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Input,
} from "@mui/material";
import { useRef, useState } from "react";
import { createNewBlog } from "../services/blogs";
import { useNavigate } from "react-router-dom";

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [featuredImg, setFeaturedImg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setFeaturedImg(data.secure_url);
    } catch (error) {
      console.error("Cloudinary upload failed", error);
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
            Create Blog Post
          </Typography>
          <form action="">
            <Stack spacing={2}>
              <TextField
                label="Title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Synopsis"
                type="text"
                required
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
              />
              <TextField
                label="Content"
                placeholder="Write your blog post here using markdown syntax..."
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={7}
              />

              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                }}
              >
                <Input
                  type="file"
                  required
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Button
                  variant="contained"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Featured Image
                </Button>
              </Box>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
                onClick={handleAddBlog}
                disabled={!featuredImg}
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
