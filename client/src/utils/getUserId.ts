import { jwtDecode } from "jwt-decode";

interface Token {
  id: number;
}

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode<Token>(token);
    return decoded.id;
  } catch (error) {
    console.log(`Error`, error);
  }
};
