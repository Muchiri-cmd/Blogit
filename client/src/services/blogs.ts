import axios from "axios";
const API_BASE = "https://blogit-backend-0zk3.onrender.com";
const baseUrl = `${API_BASE}/api/blogs`;



interface BlogData {
  title: string;
  synopsis: string;
  featuredImg: string;
  content: string;
}

const getAllBlogs = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const createNewBlog = async (blogData: BlogData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(baseUrl, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getBlog = async (id: number) => {
  const token = localStorage.getItem("token");
  console.log("Requesting blog from:", `${baseUrl}/${id}`);
  const res = await axios.get(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getUserBlogs = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE}/api/user/blogs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const deleteBlog = async (id: number) => {
  const token = localStorage.getItem("token");
  console.log("calling api to delete");
  const res = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const updateBlog = async (id: number, updateData: BlogData) => {
  const token = localStorage.getItem("token");
  const res = await axios.patch(`${baseUrl}/${id}`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export {
  getAllBlogs,
  createNewBlog,
  getBlog,
  getUserBlogs,
  deleteBlog,
  updateBlog,
};
