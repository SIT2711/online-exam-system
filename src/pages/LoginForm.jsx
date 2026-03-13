import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/loginForm.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      setError("Please fill all fields");
      return;
    }

    if (email === "janhavi@123" && password === "1234") {
      alert("Login Successful ✅");
      setError("");
    } else {
      setError("Invalid email or password ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Exam System</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <select onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option>Teacher</option>
            <option>Student</option>
            <option>Admin</option>
          </select>

          <button type="submit">Login</button>

          {error && <p className="error">{error}</p>}

          <div className="links">
            <Link to="#">Forgot Password?</Link> |{" "}
            <Link to="/register">Create A New Account</Link>
          </div>

        </form>

      </div>
    </div>
  );
}

export default Login;