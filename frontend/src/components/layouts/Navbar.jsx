import { useSelector ,useDispatch } from "react-redux";
import { NavLink } from "react-router";
import { logoutUserApi } from "../../config/api";
import { logOut } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

export default function Navbar() {
    const {user, token} = useSelector((state) => state.user);    
    const dispatch = useDispatch();
    // Logout handler (to be implemented)
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
7    }


  return (
    <ul className="nav nav-underline  justify-content-center bg-light mb-4">
      <li className="nav-item">
        <NavLink to="/" className="nav-link active" aria-current="page">
        <i className="bi bi-house-door-fill"></i>
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink  className="nav-link">
          <i className="bi bi-person"></i> {user?.name || "Guest"}
          {/* <i className="bi bi-person"></i> {user?.name || "Guest"} */}
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
