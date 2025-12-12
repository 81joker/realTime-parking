import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
  import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById("root")).render(
  <div className="container mt-4">
    <App />
    <ToastContainer />
  </div>,
);
