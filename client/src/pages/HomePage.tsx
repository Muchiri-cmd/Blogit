import { Box } from "@mui/material";
import { Navbar, Blogs } from "../components";
import { useEffect } from "react";
import { getAllBlogs } from "../services/blogs";
import { useState } from "react";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getAllBlogs();
        // console.log(blogs);
        setBlogs(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fafafa",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <Blogs blogs={blogs} />
      </Box>
    </>
  );
};

export default HomePage;
