// src/components/LoginForm.js
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import "../styles/LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // selected role
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ If role not selected
    if (!role) {
      setErrorMessage("Please select a role");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/online-exam-system/auth/login.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            role, // ✅ send role to backend
          }),
        }
      );

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.status === "success") {
        const userRole = data.user.role?.toLowerCase();

        // ❌ Role mismatch check
        if (role !== userRole) {
          setErrorMessage("❌ Selected role is incorrect!");
          return;
        }

        // ✅ Save user (IMPORTANT: sessionStorage)
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            id: data.user.id,
            name: data.user.name,
            role: userRole,
          })
        );

        setErrorMessage("");

        // ✅ Redirect based on role
        if (userRole === "admin") navigate("/admin-dashboard");
        else if (userRole === "teacher") navigate("/teacher-dashboard");
        else if (userRole === "student") navigate("/student-dashboard");
      } else {
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Exam System</h1>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Role Dropdown */}
          <div className="form-group">
            <label>Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* Button */}
          <button type="submit" className="btn">
            Login
          </button>

          {/* Error */}
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}

          {/* Links */}
          <div className="extra-links">
            <Link to="/">Forgot Password</Link> |{" "}
            <Link to="/register">Create A New Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;