// src/components/LoginForm.js
import React, { useState } from "react";
import "../styles/LoginForm.css"; // Import CSS

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (email.trim() === "" || password.trim() === "" || role === "") {
      setErrorMessage("All fields are required");
      return;
    }

    // Login logic
    console.log("Login Data:", { email, password, role });

    // Clear error
    setErrorMessage("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Exam System</h1>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Role */}
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
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
            <a href="#">Forgot Password?</a> |{" "}
            <a href="#">Create a New Account</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;