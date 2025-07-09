import type { JSX } from "react";
import { isLoggedIn } from "../utils/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
