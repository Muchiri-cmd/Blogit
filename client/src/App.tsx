import { HomePage, LoginPage, RegisterPage, BlogPage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, BlogForm } from "./components";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <BlogForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <BlogPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
