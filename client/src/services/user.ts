import axios from "axios";
const baseUrl = "http://localhost:3000/api/user";

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

export { updateUser, updatePassword };
