import { HomePage, LoginPage, RegisterPage } from "./pages";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;
