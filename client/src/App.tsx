import { HomePage, LoginPage, RegisterPage, BlogPage } from "./pages";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </>
  );
};

export default App;
