import {
  HomePage,
  LoginPage,
  RegisterPage,
  BlogPage,
  UserProfilePage,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, BlogForm, Blogs, UpdateBlogForm } from "./components";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-blog/:id"
          element={
            <ProtectedRoute>
              <UpdateBlogForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
