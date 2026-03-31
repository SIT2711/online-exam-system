// pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {

  const [user, setUser] = useState({
    full_name: '',
    email: '',
    phone: '',
    role: '',
    join_date: ''
  });

  const navigate = useNavigate();

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    fetch('http://localhost/online-exam-system/auth/profile.php', {
      method: "POST",   // ✅ changed to POST
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: storedUser.id
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setUser(data.user);
        } else {
          console.log(data.message);
          navigate("/login");
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  // ================= NAVIGATION =================
  const handleUpdateProfile = () => {
    navigate('/editprofile');
  };

  const handleGoBack = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const role = storedUser.role;

    if (role === "admin") navigate("/admin-dashboard");
    else if (role === "teacher") navigate("/teacher-dashboard");
    else navigate("/student-dashboard");
  };

  return (
    <div className="profile-container">

      <div className="top-section">

        <div className="card">
          <h2>PROFILE INFORMATION</h2>

          <div className="profile-info">
            <p><strong>Full Name:</strong> {user.full_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Joined Date:</strong> {user.join_date}</p>
          </div>
        </div>

        <div className="card">
          <h3>STATISTICS</h3>

          <div className="stat-card">
            <p>Total Exams Attempted: 5</p>
          </div>

          <div className="stat-card">
            <p>Completed Exams: 3</p>
          </div>

          <div className="stat-card">
            <p>Last Score: 80%</p>
          </div>
        </div>

      </div>

      <div className="profile-buttons">
        <button onClick={handleUpdateProfile}>Update Profile</button>
        <button onClick={handleGoBack}>Go Back</button>
      </div>

    </div>
  );
};

export default Profile;