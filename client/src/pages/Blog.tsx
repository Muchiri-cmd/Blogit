import {
  Box,
  Typography,
  CardMedia,
  Paper,
  LinearProgress,
  Container,
  Stack,
} from "@mui/material";
import { Navbar } from "../components";
import { useEffect, useState } from "react";
import { getBlog } from "../services/blogs";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { MdDateRange, MdAccessTime } from "react-icons/md";

interface BlogProps {
  content: string;
  title: string;
  createdAt: string;
  author: {
    userName: string;
    profilePic: string;
    email: string;
  };
}

const Blog = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState<BlogProps>({
    author: {
      userName: "",
      profilePic: "",
      email:''
    },
    content: "",
    title: "",
    createdAt: "",
  });
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await getBlog(Number(id));
      console.log("BLog:", res);
      setBlog(res);
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setReadingProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(" ").length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <>
      <Navbar></Navbar>
      <LinearProgress
        variant="determinate"
        value={readingProgress}
        sx={{
          position: "fixed",
          top: 72,
          left: 0,
          right: 0,
          height: 3,
          zIndex: 1000,
          backgroundColor: "rgba(102, 126, 234, 0.1)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "mediumslateblue",
          },
        }}
      />
      <Box
        sx={{
          minHeight: "100vh",
          marginTop: "100px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "flex-start",
          mt: 12,
          // border:'2px solid red',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#1a1a1a",
              mb: 2,
              letterSpacing: "-0.02em",
            }}
          >
            {blog.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              padding: "1.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
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
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  color: "#1a1a1a",
                  fontSize: "16px",
                  mb: 0.5,
                }}
              >
                {blog.author.userName}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  color: "#1a1a1a",
                  fontSize: "16px",
                  mb: 0.5,
                }}
              >
                {blog.author.email}
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                variant="body2"
                sx={{
                  color: "#64748b",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <MdDateRange size={14} />
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  backgroundColor: "#cbd5e1",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#64748b",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <MdAccessTime size={14} />
                {getReadingTime(blog.content)}
              </Typography>
            </Stack>
          </Box>

          <Paper
            elevation={0}
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              p: { xs: 3, sm: 4, md: 6 },
              mb: 6,
              border: "1px solid lightgray",
              position: "relative",
            }}
          >
            <Box
              sx={{
                "& h1, & h2, & h3, & h4, & h5, & h6": {
                  fontWeight: 700,
                  color: "#1a1a1a",
                  mb: 2,
                  mt: 3,
                  lineHeight: 1.3,
                },
                "& h1": { fontSize: "2rem" },
                "& h2": { fontSize: "1.75rem" },
                "& h3": { fontSize: "1.5rem" },
                "& p": {
                  fontSize: "18px",
                  lineHeight: 1.7,
                  color: "#374151",
                  mb: 3,
                  fontFamily: "Georgia, serif",
                },
                "& ul, & ol": {
                  pl: 3,
                  mb: 3,
                  "& li": {
                    fontSize: "18px",
                    lineHeight: 1.7,
                    color: "#374151",
                    mb: 1,
                  },
                },
                "& a": {
                  color: "#667eea",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(102, 126, 234, 0.3)",
                  "&:hover": {
                    borderBottom: "1px solid #667eea",
                  },
                },
              }}
            >
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Blog;
