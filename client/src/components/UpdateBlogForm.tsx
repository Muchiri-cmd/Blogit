import Navbar from "./Navbar";
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  Card,
  LinearProgress,
  CardMedia,
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

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setFeaturedImg(data.secure_url);
    } catch (error: any) {
      console.error("Cloudinary upload failed", error);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
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
          padding: 2,
        }}
      >
        <Paper
          sx={{
            p: 5,
            boxShadow: 2,
            width: "80%",
            border: "1px solid lightgrey",
            borderRadius: 3,
          }}
          elevation={0}
          variant="outlined"
        >
          <Typography
            variant="h5"
            mb={3}
            textAlign="center"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create Blog Post
          </Typography>
          <Typography
            variant="body1"
            mb={2}
            textAlign="center"
            color="text.secondary"
          >
            Share your thoughts with the world
          </Typography>
          <form action="" onSubmit={handleUpdateBlog}>
            <Stack spacing={3}>
              <TextField
                label="Title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                helperText="Give your blog post a catchy title"
              />
              <TextField
                label="Synopsis"
                type="text"
                required
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                helperText="Write a brief summary of your blog post"
              />
              <TextField
                label="Content"
                placeholder="Write your blog post here using markdown syntax..."
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={8}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                helperText="Use markdown syntax for formatting (e.g., **bold**, *italic*, # headers)"
              />

              <Box>
                <Typography variant="h6" mb={2} sx={{ fontWeight: 600 }}>
                  Featured Image
                </Typography>

                {!featuredImg ? (
                  <Box>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />

                    <Button
                      variant="outlined"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      sx={{
                        width: "100%",
                        height: 120,
                        borderRadius: 2,
                        borderStyle: "dashed",
                        borderWidth: 2,
                        background: "rgba(102, 126, 234, 0.05)",
                        "&:hover": {
                          background: "rgba(102, 126, 234, 0.1)",
                        },
                      }}
                    >
                      <Box textAlign="center">
                        <Typography variant="body1" fontWeight={600}>
                          {isUploading
                            ? "Uploading Image..."
                            : "Choose Featured Image"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          PNG, JPG, WebP or GIF
                        </Typography>
                      </Box>
                    </Button>

                    {isUploading && (
                      <Box mt={2}>
                        <LinearProgress
                          variant="determinate"
                          value={uploadProgress}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: "rgba(102, 126, 234, 0.1)",
                            "& .MuiLinearProgress-bar": {
                              background:
                                "linear-gradient(45deg, #667eea, #764ba2)",
                            },
                          }}
                        />
                        <Typography variant="body2" textAlign="center" mt={1}>
                          {Math.round(uploadProgress)}% uploaded
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                    <Box>
                      <CardMedia
                        component="img"
                        height="250"
                        image={featuredImg}
                        alt="Featured image preview"
                      />
                    </Box> 
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setFeaturedImg("")}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: "none",
                      }}
                    >
                      Replace Image
                    </Button>
                  </Card>
                  
                )}
              </Box>
             
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
                // onClick={handleAddBlog}
                // disabled={!featuredImg}
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
