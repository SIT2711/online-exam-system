// src/components/LoginForm.js
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import '../styles/LoginForm.css'; // Importing the CSS for the LoginForm

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    const res = await fetch("http://localhost/online-exam-system/auth/login.php", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();

    if (text.includes("Login successful")) {
      setErrorMessage(""); // clear errors
      // Redirect based on role
      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "teacher") navigate("/teacher-dashboard");
      else if (role === "student") navigate("/student-dashboard");
    } else {
      setErrorMessage(text); // show PHP error
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Exam System</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="admin">admin</option>
            <option value="teacher">teacher</option>
            <option value="student">student</option>
          </select>

          <button type="submit" className="btn">
            Login
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="extra-links">
            <a href="#">Forgot Password?</a> | <a href="#">Create A new Account</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;