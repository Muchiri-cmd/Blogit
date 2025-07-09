import axios from "axios";
const registerUrl = "http://localhost:3000/api/auth/register";
const loginUrl = "http://localhost:3000/api/auth/login";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const login = (data: LoginData) => {
  const req = axios.post(loginUrl, data);
  return req.then((res) => res.data);
};

const register = (data: RegisterData) => {
  const req = axios.post(registerUrl, data);
  return req.then((res) => res.data);
};

export { login, register };
