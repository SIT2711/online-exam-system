import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Student</h1>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default StudentDashboard;