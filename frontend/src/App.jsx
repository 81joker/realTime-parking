import React, { lazy ,Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/middleware /PrivateRoute";
import Navbar from "./components/layouts/Navbar";
import Spinner from "./components/layouts/Spinner";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Success = lazy(() => import("./pages/payments/Success"));
const Profile = lazy(() => import("./pages/user/Profile"));

export default function App() {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <PrivateRoute>
                <Success />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
