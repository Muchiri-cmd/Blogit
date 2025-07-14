import axios from "axios";
const API_BASE = "https://blogit-backend-0zk3.onrender.com";
const baseUrl = `${API_BASE}/api/user`;

const token = localStorage.getItem("token");

interface UserData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

const updateUser = async (userdata: UserData) => {
  const res = await axios.patch(`${baseUrl}`, userdata, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const updatePassword = async (password: string) => {
  console.log("updating password..");
  const res = await axios.patch(
    `${baseUrl}/password`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

const getUser = async () => {
  const res = await axios.get(`${baseUrl}/current-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export { updateUser, updatePassword, getUser };
