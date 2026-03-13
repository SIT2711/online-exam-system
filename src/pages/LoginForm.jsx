// src/pages/LoginForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      setErrorMessage("All fields are required");
      return;
    }

    console.log({ email, password, role });
    setErrorMessage("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Exam System</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Login</button>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <div className="links">
            <Link to="#">Forgot Password?</Link> |{" "}
            <Link to="/register">Create A New Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;