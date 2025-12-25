import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router";
import { getLoggedInUserApi, logoutUserApi } from "../../config/api";
import { logOut, setCredentials } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Navbar() {
  // get user and token from redux store First way and this is better as Second way
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Logout handler (to be implemented)

  // get user and token from redux store Second way
  useEffect(() => {
    const getLoggInUser = async () => {
      try {
        const data = await getLoggedInUserApi(token);
        dispatch(setCredentials({ user: data.user, token }));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          dispatch(logOut());
          toast.error("Session expired. Please log in again.");
        }
        console.log(error);
      }
    };
    if (token) getLoggInUser();
  }, [dispatch, token]);

  // TODO:    Agin @Nehad review Code Redux
  const logoutUser = async () => {
    try {
      const data = await logoutUserApi(token);
      dispatch(logOut());
      toast.success(data.message);
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Something went wrong while logging out.");
    }
  };

  return (
    <ul className="nav nav-underline  justify-content-center bg-light mb-4">
      <li className="nav-item">
        <NavLink to="/" className="nav-link active" aria-current="page">
          <i className="bi bi-house-door-fill"></i>
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/profile" className="nav-link">
          <i className="bi bi-person"></i> {user?.name || "Guest"}
        </NavLink>
      </li>

      <li className="nav-item">
        <button onClick={() => logoutUser()} className="nav-link btn btn-link">
          <i className="bi bi-person-fill-down"></i> Logout
        </button>
      </li>

      <li className="nav-item">
        <NavLink to="/register" className="nav-link">
          Register
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      </li>
    </ul>
  );
}
