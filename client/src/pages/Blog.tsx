import { Box, Typography, CardMedia, Chip } from "@mui/material";
import { Navbar } from "../components";
import { useEffect, useState } from "react";
import { getBlog } from "../services/blogs";
import { useParams } from "react-router-dom";

interface BlogProps {
  author: string;
  content: string;
  title: string;
  createdAt: string;
}

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogProps>({
    author: "",
    content: "",
    title: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await getBlog(Number(id));
      // console.log("BLog:", res)
      setBlog(res);
    };
    fetchBlog();
  }, [id]);

  return (
    <>
      <Navbar></Navbar>
      <Box
        sx={{
          minHeight: "96vh",
          marginTop: "70px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h3" textAlign="center">
          {blog.title}
        </Typography>

        <Box
          sx={{
            // border:'2px solid red',
            textAlign: "right",
            marginTop: "1rem",
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "1rem",
            borderBottom: "1px solid grey",
          }}
        >
          <CardMedia
            component="img"
            height="50px"
            image="./user1.jpg"
            sx={{
              borderRadius: "50%",
              width: "50px",
            }}
          />
          <Typography variant="body2">{blog.author} </Typography>
          <Chip label="4 min read" size="small" />
          <Typography variant="body2">
            {" "}
            {new Date(blog.createdAt).toLocaleDateString()}{" "}
          </Typography>
        </Box>
        <Box
          sx={{
            // border:'2px solid red',
            width: "60%",
            padding: "2rem",
          }}
        >
          <Typography>{blog.content}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Blog;
