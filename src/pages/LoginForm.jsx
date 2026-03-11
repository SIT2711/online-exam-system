// src/components/LoginForm.js
import React, { useState } from 'react';
import '../styles/LoginForm.css'; // Importing the CSS for the LoginForm

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      setErrorMessage('All fields are required');
    } else {
      // Handle login logic here (e.g., make an API call)
      console.log({ email, password, role });
      setErrorMessage('');
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
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
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