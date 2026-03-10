import React, { useState } from "react";
import "./Login.css";


function Login({ setPage }) {
    

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("");
  const [error,setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email === "" || password === "" || role === ""){
      setError("Please fill all fields");
      return;
    }

    setError("");
    alert("Login Successful");
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1 className="title">Exam System</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option>Student</option>
            <option>Teacher</option>
            <option>Admin</option>
          </select>

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>

        </form>

        <div className="links">
          <p>Forgot Password?</p>
          <p onClick={() => setPage("register")}>
               Create A New Account
            </p>

        </div>

      </div>

    </div>
  );
}

export default Login;