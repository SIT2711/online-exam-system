import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.jpeg";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getDashboardLink = () => {
    if (user?.role === "admin") return "/admin-dashboard";
    if (user?.role === "teacher") return "/teacher-dashboard";
    return "/student-dashboard";
  };

  return (
    <nav className="navbar">
      <h2 className="logo">
        <img src={logo} alt="SIT Logo" className="logo-img" />
      </h2>

      <ul className="nav-links">

        {/* Dashboard */}
        <li>
          <NavLink to={getDashboardLink()}>
            {({ isActive }) => (
              <span className={isActive ? "active" : "link"}>
                Dashboard
              </span>
            )}
          </NavLink>
        </li>
        {/* Admin + Teacher - Exam */}
      {(user?.role === "admin" || user?.role === "teacher") && (
        <li>
          <NavLink to="/exam">
            {({ isActive }) => (
              <span className={isActive ? "active" : "link"}>
              Exam
              </span>
                )}
          </NavLink>
        </li>
        )}

        {/* Student Only */}
        {user?.role === "student" && (
          <li>
            <NavLink to="/exams">
              {({ isActive }) => (
                <span className={isActive ? "active" : "link"}>
                  Exams
                </span>
              )}
            </NavLink>
          </li>
        )}

        {/* Result (All) */}
        <li>
          <NavLink to="/resulthistory">
            {({ isActive }) => (
              <span className={isActive ? "active" : "link"}>
                Result
              </span>
            )}
          </NavLink>
        </li>

        {/* Admin + Teacher */}
        {(user?.role === "admin" || user?.role === "teacher") && (
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

        {/* Profile */}
        <li>
          <NavLink to="/profile">
            {({ isActive }) => (
              <span className={isActive ? "active" : "link"}>
                Profile
              </span>
            )}
          </NavLink>
        </li>

        {/* Logout */}
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