// src/components/LoginForm.js
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import '../styles/LoginForm.css'; // Importing the CSS for the LoginForm

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setErrorMessage("All fields are required");
    return;
  }

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    const res = await fetch(
      "http://localhost/online-exam-system/auth/login.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.status === "success") {
      console.log("Login success:", data);

      // store user (optional)
      localStorage.setItem("user", JSON.stringify(data.user));

      // redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }

    } else {
      setErrorMessage(data.message);
    }

  } catch (error) {
    console.error(error);
    setErrorMessage("Server error");
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