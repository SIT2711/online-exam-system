import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Admin</h1>

        <button onClick={() => navigate("/create-exam")}>
          Create Exam
        </button>

        <button onClick={() => navigate("/")}>Logout</button>
      </div>
    </div>
  );
}

export default AdminDashboard;