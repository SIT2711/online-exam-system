import React, { useState } from "react";
import "../styles/Register.css";

function Register() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  fetch("http://localhost:8080/online-exam-api/auth/register.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phone: formData.phone
    })
  })
    .then(res => res.text())
    .then(data => {
      alert(data);
    })
    .catch(err => console.log(err));
};

  return (
    <div className="register-container">

      <div className="register-box">

        <h1>Register</h1>
        <h2>Create your account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p>
          Already have an account? Login
        </p>

      </div>

    </div>
  );
}

export default Register;