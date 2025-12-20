import React from "react";
import Home from "./pages/Home";
import { BrowserRouter , Routes , Route} from "react-router";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Navbar from "./components/layouts/Navbar";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/middleware /PrivateRoute";

export default function App() {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
    {isLoggedIn && <Navbar /> }
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
