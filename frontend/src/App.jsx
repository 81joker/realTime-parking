import React from "react";
import Home from "./pages/Home";
import { BrowserRouter , Routes , Route} from "react-router";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Navbar from "./components/layouts/Navbar";

export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* <Route index element={<StepOne />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
