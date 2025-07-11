import Navbar from "./Navbar";
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  Input,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { getBlog, updateBlog } from "../services/blogs";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

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

  const fileInputRef = useRef<HTMLInputElement>(null);

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

              <TextField
                label="Content"
                type="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={7}
              />

              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                {featuredImg && (
                  <Box>
                    <Typography variant="body2" mb={1}>
                      Current Featured Img:
                    </Typography>
                    <img
                      src={featuredImg}
                      alt="Profile"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        border: "1px solid #ccc",
                      }}
                    />
                  </Box>
                )}

                <Box>
                  <Input
                    type="file"
                    inputRef={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="contained"
                    onClick={() => fileInputRef.current?.click()}
                    sx={{ mt: 1 }}
                  >
                    Upload New Picture
                  </Button>
                </Box>
              </Box>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
                disabled={!featuredImg}
              >
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
