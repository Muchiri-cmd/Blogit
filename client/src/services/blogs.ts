import axios from "axios";
const baseUrl = "http://localhost:3000/api/blogs";

const token = localStorage.getItem("token");

interface BlogData {
  title: string;
  synopsis: string;
  featuredImg: string;
  content: string;
}

const getAllBlogs = async () => {
  const res = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const createNewBlog = async (blogData: BlogData) => {
  const res = await axios.post(baseUrl, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export { getAllBlogs, createNewBlog };
