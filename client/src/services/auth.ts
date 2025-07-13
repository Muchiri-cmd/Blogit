import axios from "axios";
const API_BASE= 'https://blogit-backend-0zk3.onrender.com'
const registerUrl = `${API_BASE}/api/auth/register`;
const loginUrl = `${API_BASE}api/auth/login`;

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
