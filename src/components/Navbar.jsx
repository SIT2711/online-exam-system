import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.jpeg";

function Navbar() {
  const navigate = useNavigate();

  const user = {
    name: "Admin",
    role: "admin"
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">
        <img src={logo} alt="SIT Logo" className="logo-img" />
      </h2>

      <ul className="nav-links">

        <li>
          <NavLink to="/dashboard">
            {({ isActive }) => (
              <span className={isActive ? "active" : "link"}>
                Dashboard
              </span>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/exams">
            {({ isActive }) => (
              <span className={isActive ? "active" : "link"}>
                Exams
              </span>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/resulthistory">
            {({ isActive }) => (
              <span className={isActive ? "active" : "link"}>
                Result
              </span>
            )}
          </NavLink>
        </li>

        {/* Admin Only */}
        {user.role === "admin" && (
          <li>
            <NavLink to="/addquestion">
              {({ isActive }) => (
                <span className={isActive ? "active" : "link"}>
                  Add Question
                </span>
              )}
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/profile">
            {({ isActive }) => (
              <span className={isActive ? "active" : "link"}>
                Profile
              </span>
            )}
          </NavLink>
        </li>

        <li>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;